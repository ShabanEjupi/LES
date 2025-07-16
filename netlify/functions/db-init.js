const { initializeSchema, seedInitialData, testConnection } = require('./db-config.js');

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
    console.log('Starting database initialization...');

    // Test database connection
    const connectionTest = await testConnection();
    if (!connectionTest) {
      throw new Error('Database connection failed');
    }

    // Initialize schema
    await initializeSchema();
    console.log('Database schema initialized');

    // Seed initial data
    await seedInitialData();
    console.log('Initial data seeded');

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Database initialized successfully. Default admin user created (username: admin, password: admin123)'
      })
    };

  } catch (error) {
    console.error('Database initialization error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: `Database initialization failed: ${error.message}`
      })
    };
  }
};
