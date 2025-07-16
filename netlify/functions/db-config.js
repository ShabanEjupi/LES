// Database configuration for Neon PostgreSQL
const { neon } = require('@neondatabase/serverless');

// Get database URL from environment variables
const getDatabaseUrl = () => {
  const dbUrl = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL;
  
  if (!dbUrl) {
    throw new Error('DATABASE_URL or NEON_DATABASE_URL environment variable is required');
  }
  
  return dbUrl;
};

// Create database connection
const sql = neon(getDatabaseUrl());

// Test database connection
const testConnection = async () => {
  try {
    const result = await sql`SELECT NOW() as current_time`;
    console.log('Database connected successfully:', result[0].current_time);
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
};

// Initialize database schema
const initializeSchema = async () => {
  try {
    // Create Users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role_id UUID REFERENCES user_roles(id),
        department VARCHAR(50) NOT NULL,
        customs_post VARCHAR(100),
        officer_badge_number VARCHAR(50),
        is_active BOOLEAN DEFAULT true,
        last_login TIMESTAMP WITH TIME ZONE,
        failed_login_attempts INTEGER DEFAULT 0,
        account_locked_until TIMESTAMP WITH TIME ZONE,
        data_access_level VARCHAR(20) DEFAULT 'INTERNAL',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;

    // Create User Roles table
    await sql`
      CREATE TABLE IF NOT EXISTS user_roles (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(50) UNIQUE NOT NULL,
        description TEXT,
        is_system_role BOOLEAN DEFAULT false,
        kosovo_legal_basis TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;

    // Create Permissions table
    await sql`
      CREATE TABLE IF NOT EXISTS permissions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        resource VARCHAR(100) NOT NULL,
        action VARCHAR(50) NOT NULL,
        description TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        UNIQUE(resource, action)
      )
    `;

    // Create Role Permissions junction table
    await sql`
      CREATE TABLE IF NOT EXISTS role_permissions (
        role_id UUID REFERENCES user_roles(id) ON DELETE CASCADE,
        permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
        PRIMARY KEY (role_id, permission_id)
      )
    `;

    // Create User Permissions junction table (for individual permissions)
    await sql`
      CREATE TABLE IF NOT EXISTS user_permissions (
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
        granted_by UUID REFERENCES users(id),
        granted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        PRIMARY KEY (user_id, permission_id)
      )
    `;

    // Create Cases table
    await sql`
      CREATE TABLE IF NOT EXISTS cases (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        case_number VARCHAR(50) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        case_type VARCHAR(50) NOT NULL,
        status VARCHAR(50) DEFAULT 'DRAFT',
        priority VARCHAR(20) DEFAULT 'MEDIUM',
        violation_type VARCHAR(50),
        assigned_officer_id UUID REFERENCES users(id),
        created_by_id UUID REFERENCES users(id) NOT NULL,
        customs_declaration_number VARCHAR(100),
        importer_exporter_name VARCHAR(255),
        goods_description TEXT,
        estimated_value DECIMAL(15,2),
        potential_duty_loss DECIMAL(15,2),
        violation_date DATE,
        discovery_date DATE DEFAULT CURRENT_DATE,
        location VARCHAR(255),
        customs_post VARCHAR(100),
        legal_basis TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        closed_at TIMESTAMP WITH TIME ZONE
      )
    `;

    // Create Documents table
    await sql`
      CREATE TABLE IF NOT EXISTS documents (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        case_id UUID REFERENCES cases(id) ON DELETE CASCADE,
        filename VARCHAR(255) NOT NULL,
        original_filename VARCHAR(255) NOT NULL,
        file_path VARCHAR(500) NOT NULL,
        file_size BIGINT NOT NULL,
        mime_type VARCHAR(100) NOT NULL,
        document_type VARCHAR(50) NOT NULL,
        classification_level VARCHAR(20) DEFAULT 'INTERNAL',
        hash_sha256 VARCHAR(64) NOT NULL,
        version INTEGER DEFAULT 1,
        is_encrypted BOOLEAN DEFAULT false,
        uploaded_by_id UUID REFERENCES users(id) NOT NULL,
        metadata JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;

    // Create Audit Logs table
    await sql`
      CREATE TABLE IF NOT EXISTS audit_logs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id),
        action VARCHAR(100) NOT NULL,
        resource VARCHAR(100) NOT NULL,
        resource_id UUID,
        details JSONB,
        ip_address INET,
        user_agent TEXT,
        session_id VARCHAR(255),
        timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;

    console.log('Database schema initialized successfully');
    return true;
  } catch (error) {
    console.error('Failed to initialize database schema:', error);
    throw error;
  }
};

// Seed initial data
const seedInitialData = async () => {
  try {
    // Insert default roles
    const adminRoleResult = await sql`
      INSERT INTO user_roles (name, description, is_system_role, kosovo_legal_basis)
      VALUES ('admin', 'System Administrator', true, 'Kosovo Customs Code Article 15')
      ON CONFLICT (name) DO UPDATE SET description = EXCLUDED.description
      RETURNING id
    `;

    const officerRoleResult = await sql`
      INSERT INTO user_roles (name, description, is_system_role, kosovo_legal_basis)
      VALUES ('customs_officer', 'Customs Officer', true, 'Kosovo Customs Code Article 272')
      ON CONFLICT (name) DO UPDATE SET description = EXCLUDED.description
      RETURNING id
    `;

    const investigatorRoleResult = await sql`
      INSERT INTO user_roles (name, description, is_system_role, kosovo_legal_basis)
      VALUES ('investigator', 'Customs Investigator', true, 'Kosovo Customs Code Article 273')
      ON CONFLICT (name) DO UPDATE SET description = EXCLUDED.description
      RETURNING id
    `;

    // Insert default permissions
    const permissions = [
      { resource: 'cases', action: 'create', description: 'Create new cases' },
      { resource: 'cases', action: 'read', description: 'View cases' },
      { resource: 'cases', action: 'update', description: 'Update cases' },
      { resource: 'cases', action: 'delete', description: 'Delete cases' },
      { resource: 'documents', action: 'create', description: 'Upload documents' },
      { resource: 'documents', action: 'read', description: 'View documents' },
      { resource: 'documents', action: 'update', description: 'Update documents' },
      { resource: 'documents', action: 'delete', description: 'Delete documents' },
      { resource: 'users', action: 'create', description: 'Create users' },
      { resource: 'users', action: 'read', description: 'View users' },
      { resource: 'users', action: 'update', description: 'Update users' },
      { resource: 'users', action: 'delete', description: 'Delete users' },
      { resource: 'reports', action: 'read', description: 'View reports' },
      { resource: 'audit', action: 'read', description: 'View audit logs' },
      { resource: 'settings', action: 'update', description: 'Modify system settings' }
    ];

    for (const permission of permissions) {
      await sql`
        INSERT INTO permissions (resource, action, description)
        VALUES (${permission.resource}, ${permission.action}, ${permission.description})
        ON CONFLICT (resource, action) DO NOTHING
      `;
    }

    // Create default admin user (password: admin123)
    const bcrypt = require('bcryptjs');
    const adminPasswordHash = await bcrypt.hash('admin123', 12);
    
    await sql`
      INSERT INTO users (
        username, email, full_name, password_hash, role_id, 
        department, data_access_level
      )
      VALUES (
        'admin', 
        'admin@customs.gov.xk', 
        'System Administrator', 
        ${adminPasswordHash},
        ${adminRoleResult[0].id},
        'IT_DEPARTMENT',
        'TOP_SECRET'
      )
      ON CONFLICT (username) DO NOTHING
    `;

    console.log('Initial data seeded successfully');
    return true;
  } catch (error) {
    console.error('Failed to seed initial data:', error);
    throw error;
  }
};

module.exports = {
  sql,
  testConnection,
  initializeSchema,
  seedInitialData
};
