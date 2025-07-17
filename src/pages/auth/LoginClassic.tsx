import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTime, setLockTime] = useState(0);
  
  const { state, login } = useAuth();
  const location = useLocation();
  
  // Get redirect path from location state or default to dashboard
  const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || '/dashboard';

  // Handle account lockout
  useEffect(() => {
    if (isLocked && lockTime > 0) {
      const timer = setInterval(() => {
        setLockTime(prev => {
          if (prev <= 1) {
            setIsLocked(false);
            setAttempts(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isLocked, lockTime]);

  // Redirect if already authenticated
  if (state.isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLocked) {
      setError(`Llogaria është bllokuar. Pritni ${lockTime} sekonda.`);
      return;
    }

    if (!username.trim() || !password.trim()) {
      setError('Ju lutem plotësoni të gjitha fushat.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      await login(username, password);
      setAttempts(0);
    } catch (err) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      if (newAttempts >= 3) {
        setIsLocked(true);
        setLockTime(300); // 5 minutes lockout
        setError('Shumë tentativa të dështuara. Llogaria është bllokuar për 5 minuta.');
      } else {
        setError(`Përdoruesi ose fjalëkalimi i gabuar. Tentativat e mbetura: ${3 - newAttempts}`);
      }
      
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  // Demo credentials info
  const demoCredentials = [
    { role: 'Administrator', username: 'admin', password: 'admin123' },
    { role: 'Oficer Doganor', username: 'oficer', password: 'oficer123' },
    { role: 'Supervisor', username: 'supervisor', password: 'super123' },
    { role: 'Përdorues', username: 'user', password: 'user123' }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #003d82 0%, #1e3a8a 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'var(--system-font)'
    }}>
      <div className="classic-window" style={{ 
        width: '100%', 
        maxWidth: '450px',
        boxShadow: '4px 4px 12px rgba(0, 0, 0, 0.3)'
      }}>
        {/* Albanian Government Header */}
        <div style={{
          background: 'linear-gradient(135deg, #003d82 0%, #1e3a8a 100%)',
          color: 'white',
          padding: '16px',
          textAlign: 'center',
          borderBottom: '3px solid #e41e20'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: '#e41e20',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '16px'
            }}>
              🦅
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 'bold', lineHeight: '1.2' }}>
                REPUBLIKA E SHQIPËRISË
              </div>
              <div style={{ fontSize: '12px', lineHeight: '1.2' }}>
                Drejtoria e Përgjithshme e Doganave
              </div>
            </div>
          </div>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffd700' }}>
            Sistemi LES
          </div>
          <div style={{ fontSize: '12px', opacity: 0.9 }}>
            Law Enforcement System
          </div>
        </div>

        <div className="classic-window-header">
          🔐 Identifikimi në Sistem
        </div>

        <div className="classic-window-content">
          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{
                background: '#ffe6e6',
                border: '1px solid #ffcccc',
                color: '#d8000c',
                padding: '8px 12px',
                marginBottom: '16px',
                fontSize: '11px',
                borderRadius: '2px'
              }}>
                ⚠️ {error}
              </div>
            )}

            {isLocked && (
              <div style={{
                background: '#fff3cd',
                border: '1px solid #ffeaa7',
                color: '#856404',
                padding: '8px 12px',
                marginBottom: '16px',
                fontSize: '11px',
                borderRadius: '2px',
                textAlign: 'center'
              }}>
                🔒 Llogaria e bllokuar për: {formatTime(lockTime)}
              </div>
            )}

            <div className="classic-form-row">
              <label className="classic-label">👤 Përdoruesi:</label>
              <input
                type="text"
                className="classic-textbox"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Emri i përdoruesit"
                disabled={isLoading || isLocked}
                maxLength={50}
                style={{ fontSize: '12px' }}
              />
            </div>

            <div className="classic-form-row">
              <label className="classic-label">🔑 Fjalëkalimi:</label>
              <input
                type="password"
                className="classic-textbox"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Fjalëkalimi"
                disabled={isLoading || isLocked}
                maxLength={100}
                style={{ fontSize: '12px' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
              <button 
                type="submit" 
                className="classic-button classic-button-primary"
                disabled={isLoading || isLocked || !username.trim() || !password.trim()}
                style={{ flex: 1 }}
              >
                {isLoading ? '🔄 Duke u identifikuar...' : '🚪 Hyr në Sistem'}
              </button>
              <button 
                type="button" 
                className="classic-button"
                onClick={() => {
                  setUsername('');
                  setPassword('');
                  setError('');
                }}
                disabled={isLoading}
              >
                🗑️ Pastro
              </button>
            </div>
          </form>

          {/* Security Notice */}
          <div style={{
            marginTop: '20px',
            padding: '12px',
            background: '#f8f9fa',
            border: '1px inset #c0c0c0',
            fontSize: '10px',
            color: '#666'
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>ℹ️ Njoftim Sigurie:</div>
            <ul style={{ margin: 0, paddingLeft: '16px' }}>
              <li>Sistemi regjistron të gjitha tentatvat e qasjes</li>
              <li>Pas 3 tentativave të dështuara, llogaria bllokhet për 5 minuta</li>
              <li>Përdorni vetëm kredenciale të autorizuara</li>
              <li>Mos ndani informacionet tuaja të qasjes</li>
            </ul>
          </div>

          {/* Demo Credentials */}
          <div style={{
            marginTop: '16px',
            padding: '12px',
            background: '#e8f4fd',
            border: '1px inset #c0c0c0',
            fontSize: '10px'
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>🧪 Kredenciale Demo:</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
              {demoCredentials.map((cred, index) => (
                <div key={index} style={{ cursor: 'pointer', padding: '4px', background: 'white', border: '1px solid #ddd' }}
                     onClick={() => {
                       setUsername(cred.username);
                       setPassword(cred.password);
                     }}>
                  <strong>{cred.role}</strong><br/>
                  {cred.username} / {cred.password}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          background: '#f0f0f0',
          padding: '8px',
          textAlign: 'center',
          fontSize: '9px',
          color: '#666',
          borderTop: '1px solid #c0c0c0'
        }}>
          LES v1.0 © 2024 Drejtoria e Përgjithshme e Doganave | Sistemi i Zbatimit të Ligjit
        </div>
      </div>
    </div>
  );
};

export default Login;
