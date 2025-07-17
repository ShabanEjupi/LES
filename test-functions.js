// Development Database Initialization Test
// This script can be used to manually test the database initialization

async function testDbInit() {
  console.log('Testing Database Initialization...');
  
  try {
    const response = await fetch('/.netlify/functions/db-init', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const data = await response.json();
    console.log('DB Init Response:', data);
    
    if (data.success) {
      console.log('✅ Database initialized successfully!');
      return true;
    } else {
      console.log('❌ Database initialization failed:', data.message);
      return false;
    }
  } catch (error) {
    console.error('❌ Error testing database init:', error);
    return false;
  }
}

async function testLogin() {
  console.log('Testing Login Function...');
  
  try {
    const response = await fetch('/.netlify/functions/auth-login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'admin',
        password: 'admin123'
      }),
    });
    
    const data = await response.json();
    console.log('Login Response:', data);
    
    if (data.success) {
      console.log('✅ Login successful!');
      return true;
    } else {
      console.log('❌ Login failed:', data.message);
      return false;
    }
  } catch (error) {
    console.error('❌ Error testing login:', error);
    return false;
  }
}

// Test functions
async function runTests() {
  console.log('🚀 Starting LES System Tests...\n');
  
  const dbResult = await testDbInit();
  console.log('\n');
  
  if (dbResult) {
    await testLogin();
  } else {
    console.log('⚠️ Skipping login test due to database initialization failure');
  }
  
  console.log('\n🏁 Tests completed!');
}

// Export for use in browser console
if (typeof window !== 'undefined') {
  window.testDbInit = testDbInit;
  window.testLogin = testLogin;
  window.runTests = runTests;
}
