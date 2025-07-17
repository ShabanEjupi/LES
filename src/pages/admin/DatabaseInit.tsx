import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Divider,
  Chip
} from '@mui/material';
import { Storage, Build, CheckCircle, Error } from '@mui/icons-material';

const DatabaseInit: React.FC = () => {
  const [isInitializing, setIsInitializing] = useState(false);
  const [initResult, setInitResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const getErrorMessage = (error: unknown): string => {
    if (error && typeof error === 'object' && 'message' in error) {
      return String(error.message);
    }
    return String(error);
  };

  const handleInitializeDatabase = async () => {
    setIsInitializing(true);
    setInitResult(null);

    try {
      const response = await fetch('/.netlify/functions/db-init', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      setInitResult(data);
    } catch (error) {
      console.error('Database initialization error:', error);
      setInitResult({
        success: false,
        message: getErrorMessage(error)
      });
    } finally {
      setIsInitializing(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 50%, #e3f2fd 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Container maxWidth="md">
        <Paper elevation={24} sx={{ borderRadius: 3, overflow: 'hidden' }}>
          {/* Header */}
          <Box
            sx={{
              background: 'linear-gradient(135deg, #1976d2, #1565c0)',
              color: 'white',
              p: 4,
              textAlign: 'center',
            }}
          >
            <Storage sx={{ fontSize: 48, mb: 2 }} />
            <Typography variant="h4" fontWeight={600} gutterBottom>
              Database Initialization
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              Kosovo Customs Administration System
            </Typography>
          </Box>

          <CardContent sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom>
              Setup Instructions
            </Typography>
            
            <Typography variant="body1" paragraph>
              Before using the system, you need to initialize the database schema and create the default admin user.
            </Typography>

            <Card variant="outlined" sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  <Build sx={{ mr: 1, verticalAlign: 'middle' }} />
                  What this will do:
                </Typography>
                <Typography variant="body2" component="div">
                  • Create all required database tables<br />
                  • Set up user roles and permissions<br />
                  • Create default admin user<br />
                  • Initialize system settings
                </Typography>
              </CardContent>
            </Card>

            <Divider sx={{ my: 3 }} />

            {/* Default Credentials Info */}
            <Alert severity="info" sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Default Admin Credentials:
              </Typography>
              <Typography variant="body2">
                <strong>Username:</strong> admin<br />
                <strong>Password:</strong> admin123
              </Typography>
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                Please change these credentials after first login for security.
              </Typography>
            </Alert>

            {/* Initialize Button */}
            <Box textAlign="center" mb={3}>
              <Button
                variant="contained"
                size="large"
                onClick={handleInitializeDatabase}
                disabled={isInitializing}
                startIcon={isInitializing ? <CircularProgress size={20} /> : <Build />}
                sx={{ px: 4, py: 1.5 }}
              >
                {isInitializing ? 'Initializing Database...' : 'Initialize Database'}
              </Button>
            </Box>

            {/* Result */}
            {initResult && (
              <Box>
                <Alert 
                  severity={initResult.success ? 'success' : 'error'}
                  icon={initResult.success ? <CheckCircle /> : <Error />}
                  sx={{ mb: 2 }}
                >
                  <Typography variant="subtitle2" gutterBottom>
                    {initResult.success ? 'Database Initialized Successfully!' : 'Initialization Failed'}
                  </Typography>
                  <Typography variant="body2">
                    {initResult.message}
                  </Typography>
                </Alert>

                {initResult.success && (
                  <Box textAlign="center">
                    <Button
                      variant="outlined"
                      color="primary"
                      href="/login"
                      sx={{ mt: 2 }}
                    >
                      Go to Login
                    </Button>
                  </Box>
                )}
              </Box>
            )}

            <Divider sx={{ my: 3 }} />

            {/* Environment Variables Notice */}
            <Alert severity="warning">
              <Typography variant="subtitle2" gutterBottom>
                Environment Setup Required:
              </Typography>
              <Typography variant="body2">
                Make sure to set up the following environment variables in Netlify:
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Chip label="DATABASE_URL" size="small" sx={{ mr: 1, mb: 1 }} />
                <Chip label="JWT_SECRET" size="small" sx={{ mr: 1, mb: 1 }} />
              </Box>
            </Alert>
          </CardContent>
        </Paper>
      </Container>
    </Box>
  );
};

export default DatabaseInit;
