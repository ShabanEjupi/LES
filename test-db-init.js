// Test script to initialize the database
async function testDatabaseInit() {
  try {
    console.log('Testing database initialization...');
    
    const response = await fetch('https://kundervajtje.netlify.app/.netlify/functions/db-init', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    const text = await response.text();
    console.log('Raw response:', text);
    
    let data;
    try {
      data = JSON.parse(text);
      console.log('Parsed response:', data);
    } catch (e) {
      console.log('Failed to parse JSON, raw response:', text.substring(0, 500));
      return;
    }
    
    if (data.success) {
      console.log('✅ Database initialized successfully!');
      console.log('Default admin credentials:');
      console.log('Username: admin');
      console.log('Password: admin123');
    } else {
      console.log('❌ Database initialization failed:', data.message);
    }
  } catch (error) {
    console.error('❌ Error testing database initialization:', error);
  }
}

// Test login after initialization
async function testLogin() {
  try {
    console.log('\nTesting login with default credentials...');
    
    const response = await fetch('https://kundervajtje.netlify.app/.netlify/functions/auth-login', {
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
    console.log('Login response:', data);
    
    if (data.success) {
      console.log('✅ Login successful!');
    } else {
      console.log('❌ Login failed:', data.message);
    }
  } catch (error) {
    console.error('❌ Error testing login:', error);
  }
}

// Run tests
testDatabaseInit().then(() => {
  setTimeout(testLogin, 2000); // Wait 2 seconds before testing login
});
