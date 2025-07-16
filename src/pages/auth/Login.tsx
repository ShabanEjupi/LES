import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  IconButton,
  InputAdornment,
  Divider,
  Container,
  Paper,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Security,
  AccountBalance,
} from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';
import { useNotifications } from '../../hooks/useNotifications';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { state, login, clearError } = useAuth();
  const { showError } = useNotifications();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already authenticated
  useEffect(() => {
    if (state.isAuthenticated) {
      const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [state.isAuthenticated, navigate, location]);

  // Clear errors when component unmounts
  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      showError('Please enter both username and password');
      return;
    }

    setIsLoading(true);
    try {
      await login(username.trim(), password);
      // Navigation will be handled by the useEffect above
    } catch (error) {
      console.error('Login failed:', error);
      // Error will be shown by the auth context
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 50%, #e3f2fd 100%)',
        padding: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={24}
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {/* Header */}
          <Box
            sx={{
              background: 'linear-gradient(135deg, #1976d2, #1565c0)',
              color: 'white',
              p: 4,
              textAlign: 'center',
            }}
          >
            <AccountBalance sx={{ fontSize: 48, mb: 2 }} />
            <Typography variant="h4" fontWeight={600} gutterBottom>
              Customs Administration
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              Document Management System
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
              Sistema e Menaxhimit të Dokumenteve Doganore
            </Typography>
          </Box>

          <CardContent sx={{ p: 4 }}>
            {/* Error Alert */}
            {state.error && (
              <Alert 
                severity="error" 
                sx={{ mb: 3 }}
                onClose={clearError}
              >
                {state.error}
              </Alert>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit}>
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Username / Emri i përdoruesit"
                  variant="outlined"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                  autoComplete="username"
                  autoFocus
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Password / Fjalëkalimi"
                  type={showPassword ? 'text' : 'password'}
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  autoComplete="current-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleTogglePassword}
                          edge="end"
                          disabled={isLoading}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isLoading}
                startIcon={<Security />}
                sx={{
                  mt: 2,
                  mb: 3,
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #1976d2, #1565c0)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #1565c0, #0d47a1)',
                  },
                }}
              >
                {isLoading ? 'Signing In...' : 'Sign In / Hyr'}
              </Button>
            </form>

            <Divider sx={{ my: 3 }} />

            {/* System Information */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Secure Customs Administration Portal
              </Typography>
              <Typography variant="caption" color="textSecondary">
                v1.0.0 - Developed for Albanian Customs Authority
              </Typography>
            </Box>

            {/* Demo Credentials (remove in production) */}
            {import.meta.env.DEV && (
              <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                <Typography variant="caption" color="textSecondary" display="block" gutterBottom>
                  Demo Credentials:
                </Typography>
                <Typography variant="caption" display="block">
                  Admin: admin / admin123
                </Typography>
                <Typography variant="caption" display="block">
                  Inspector: inspector / inspector123
                </Typography>
                <Typography variant="caption" display="block">
                  Clerk: clerk / clerk123
                </Typography>
              </Box>
            )}
          </CardContent>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
