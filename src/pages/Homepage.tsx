import React from 'react';

const Homepage: React.FC = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#003d82', textAlign: 'center' }}>
        🇽🇰 Republika e Kosovës - Doganat e Kosovës
      </h1>
      <h2 style={{ textAlign: 'center', color: '#666' }}>
        LES - Law Enforcement System
      </h2>
      
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ backgroundColor: '#f5f5f5', padding: '20px', marginBottom: '20px', border: '1px solid #ccc' }}>
          <h3>System Status ✅</h3>
          <p><strong>Deployment:</strong> Working</p>
          <p><strong>Routes:</strong> Fixed</p>
          <p><strong>Admin Access:</strong> Available</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px', marginTop: '20px' }}>
          <a href="/admin/modules" style={{ 
            display: 'block', 
            padding: '15px', 
            backgroundColor: '#003d82', 
            color: 'white', 
            textDecoration: 'none',
            borderRadius: '5px'
          }}>
            📊 Module Dashboard
          </a>
          
          <a href="/admin/navigation" style={{ 
            display: 'block', 
            padding: '15px', 
            backgroundColor: '#1e3a8a', 
            color: 'white', 
            textDecoration: 'none',
            borderRadius: '5px'
          }}>
            🧭 Navigation Helper
          </a>
          
          <a href="/create" style={{ 
            display: 'block', 
            padding: '15px', 
            backgroundColor: '#e41e20', 
            color: 'white', 
            textDecoration: 'none',
            borderRadius: '5px'
          }}>
            ⚠️ Create Violation
          </a>
          
          <a href="/dashboard" style={{ 
            display: 'block', 
            padding: '15px', 
            backgroundColor: '#008000', 
            color: 'white', 
            textDecoration: 'none',
            borderRadius: '5px'
          }}>
            🏠 Main Dashboard
          </a>
        </div>

        <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#fff3cd', border: '1px solid #ffeaa7' }}>
          <h4>Development Status</h4>
          <p><strong>Total Modules:</strong> 622 planned</p>
          <p><strong>Implemented:</strong> 8 basic modules (1.3%)</p>
          <p><strong>Status:</strong> Active development phase</p>
          <p><strong>Priority:</strong> Core violation management workflow</p>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
