const { sql } = require('./db-config.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// JWT secret - in production, this should be a secure environment variable
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ 
        success: false, 
        message: 'Method not allowed' 
      })
    };
  }

  try {
    const { username, password } = JSON.parse(event.body);

    // Validate input
    if (!username || !password) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Username and password are required'
        })
      };
    }

    // Find user in database
    const userResult = await sql`
      SELECT 
        u.id, u.username, u.email, u.full_name, u.password_hash,
        u.is_active, u.failed_login_attempts, u.account_locked_until,
        u.department, u.customs_post, u.officer_badge_number, u.data_access_level,
        r.name as role_name, r.description as role_description
      FROM users u
      LEFT JOIN user_roles r ON u.role_id = r.id
      WHERE u.username = ${username} OR u.email = ${username}
    `;

    if (userResult.length === 0) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Invalid username or password'
        })
      };
    }

    const user = userResult[0];

    // Check if account is active
    if (!user.is_active) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Account is deactivated'
        })
      };
    }

    // Check if account is locked
    if (user.account_locked_until && new Date() < new Date(user.account_locked_until)) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Account is temporarily locked due to failed login attempts'
        })
      };
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      // Increment failed login attempts
      await sql`
        UPDATE users 
        SET failed_login_attempts = failed_login_attempts + 1,
            account_locked_until = CASE 
              WHEN failed_login_attempts >= 4 THEN NOW() + INTERVAL '30 minutes'
              ELSE account_locked_until
            END
        WHERE id = ${user.id}
      `;

      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Invalid username or password'
        })
      };
    }

    // Get user permissions
    const permissionsResult = await sql`
      SELECT DISTINCT p.resource, p.action
      FROM permissions p
      WHERE p.id IN (
        SELECT rp.permission_id FROM role_permissions rp 
        JOIN user_roles r ON rp.role_id = r.id
        JOIN users u ON u.role_id = r.id
        WHERE u.id = ${user.id}
        
        UNION
        
        SELECT up.permission_id FROM user_permissions up
        WHERE up.user_id = ${user.id}
      )
    `;

    // Reset failed login attempts and update last login
    await sql`
      UPDATE users 
      SET failed_login_attempts = 0,
          account_locked_until = NULL,
          last_login = NOW()
      WHERE id = ${user.id}
    `;

    // Create JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        username: user.username,
        role: user.role_name 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Prepare user object (without password hash)
    const userResponse = {
      id: user.id,
      username: user.username,
      email: user.email,
      fullName: user.full_name,
      role: {
        name: user.role_name,
        description: user.role_description
      },
      department: user.department,
      customsPost: user.customs_post,
      officerBadgeNumber: user.officer_badge_number,
      dataAccessLevel: user.data_access_level,
      permissions: permissionsResult.map(p => ({
        resource: p.resource,
        action: p.action
      })),
      isActive: user.is_active,
      lastLogin: user.last_login
    };

    // Log successful login
    await sql`
      INSERT INTO audit_logs (user_id, action, resource, details, ip_address)
      VALUES (
        ${user.id}, 
        'login', 
        'auth', 
        ${JSON.stringify({ success: true })},
        ${event.headers['x-forwarded-for'] || event.headers['x-real-ip'] || 'unknown'}
      )
    `;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        user: userResponse,
        token: token,
        message: 'Login successful'
      })
    };

  } catch (error) {
    console.error('Login error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Internal server error'
      })
    };
  }
};
