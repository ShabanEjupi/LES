import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';

const AuthTest: React.FC = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [message, setMessage] = useState('');
  const { state, login, logout } = useAuth();

  const handleLogin = async () => {
    try {
      setMessage('Attempting login...');
      await login(username, password);
      setMessage('Login successful!');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setMessage(`Login failed: ${errorMessage}`);
    }
  };

  const handleLogout = () => {
    logout();
    setMessage('Logged out');
  };

  const clearStorage = () => {
    localStorage.clear();
    setMessage('Storage cleared');
    window.location.reload();
  };

  return (
    <Box sx={{ p: 4, maxWidth: 600, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>
        Auth Test Page
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">Current Auth State:</Typography>
        <Typography>Authenticated: {state.isAuthenticated ? 'Yes' : 'No'}</Typography>
        <Typography>Loading: {state.isLoading ? 'Yes' : 'No'}</Typography>
        <Typography>User: {state.user ? state.user.username : 'None'}</Typography>
        <Typography>Error: {state.error || 'None'}</Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">LocalStorage Data:</Typography>
        <Typography>Token: {localStorage.getItem('authToken') ? 'Present' : 'None'}</Typography>
        <Typography>User Data: {localStorage.getItem('user') ? 'Present' : 'None'}</Typography>
      </Box>

      {message && (
        <Alert severity="info" sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}

      <Box sx={{ mb: 2 }}>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ mr: 2, mb: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>
        <Button variant="outlined" onClick={handleLogout}>
          Logout
        </Button>
        <Button variant="outlined" color="warning" onClick={clearStorage}>
          Clear Storage
        </Button>
      </Box>
    </Box>
  );
};

export default AuthTest;
