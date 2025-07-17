// Simple test to verify the auth function works
async function testAuth() {
  try {
    const response = await fetch('/.netlify/functions/auth-login-mock', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'admin',
        password: 'admin123'
      })
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    const data = await response.json();
    console.log('Response data:', data);
    
    if (data.success) {
      console.log('✅ Login successful!');
      console.log('User:', data.user.fullName);
      console.log('Token:', data.token ? '[TOKEN PRESENT]' : '[NO TOKEN]');
    } else {
      console.log('❌ Login failed:', data.message);
    }
  } catch (error) {
    console.error('❌ Test error:', error);
  }
}

// Run test if this is run directly in browser console
if (typeof window !== 'undefined') {
  console.log('Run testAuth() in the console to test authentication');
  window.testAuth = testAuth;
}
