import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  CircularProgress,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  CheckCircle,
  Error,
  Warning,
  ExpandMore,
  Build,
  Storage,
  Security,
  Link,
} from '@mui/icons-material';

interface DiagnosticResult {
  name: string;
  status: 'success' | 'warning' | 'error';
  message: string;
  details?: string;
}

const SystemDiagnostics: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<DiagnosticResult[]>([]);

  const getErrorMessage = (error: unknown): string => {
    if (error && typeof error === 'object' && 'message' in error) {
      return String(error.message);
    }
    return String(error);
  };

  const runDiagnostics = async () => {
    setIsRunning(true);
    setResults([]);
    const diagnostics: DiagnosticResult[] = [];

    // Test 1: Check if we can reach the site
    try {
      const response = await fetch(window.location.origin);
      if (response.ok) {
        diagnostics.push({
          name: 'Website Connectivity',
          status: 'success',
          message: 'Site is accessible',
        });
      } else {
        diagnostics.push({
          name: 'Website Connectivity',
          status: 'error',
          message: `Site returned ${response.status}`,
        });
      }
    } catch (error) {
      diagnostics.push({
        name: 'Website Connectivity',
        status: 'error',
        message: 'Cannot reach the website',
        details: getErrorMessage(error),
      });
    }

    // Test 2: Check database initialization function
    try {
      const response = await fetch('/.netlify/functions/db-init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 404) {
        diagnostics.push({
          name: 'Database Init Function',
          status: 'error',
          message: 'Function not found (404)',
          details: 'Netlify functions may not be deployed. Check deployment logs.',
        });
      } else if (response.ok) {
        const data = await response.json();
        if (data.success) {
          diagnostics.push({
            name: 'Database Init Function',
            status: 'success',
            message: 'Database initialized successfully',
          });
        } else {
          diagnostics.push({
            name: 'Database Init Function',
            status: 'warning',
            message: 'Function responds but database init failed',
            details: data.message,
          });
        }
      } else {
        const text = await response.text();
        diagnostics.push({
          name: 'Database Init Function',
          status: 'error',
          message: `Function error (${response.status})`,
          details: text.substring(0, 200),
        });
      }
    } catch (error) {
      diagnostics.push({
        name: 'Database Init Function',
        status: 'error',
        message: 'Cannot connect to function',
        details: getErrorMessage(error),
      });
    }

    // Test 3: Check login function
    try {
      const response = await fetch('/.netlify/functions/auth-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'test', password: 'test' }),
      });

      if (response.status === 404) {
        diagnostics.push({
          name: 'Auth Login Function',
          status: 'error',
          message: 'Function not found (404)',
          details: 'Netlify functions may not be deployed.',
        });
      } else if (response.status === 400 || response.status === 401) {
        diagnostics.push({
          name: 'Auth Login Function',
          status: 'success',
          message: 'Function is working (expected auth failure)',
          details: 'Function responds correctly to invalid credentials',
        });
      } else {
        const text = await response.text();
        diagnostics.push({
          name: 'Auth Login Function',
          status: 'warning',
          message: `Unexpected response (${response.status})`,
          details: text.substring(0, 200),
        });
      }
    } catch (error) {
      diagnostics.push({
        name: 'Auth Login Function',
        status: 'error',
        message: 'Cannot connect to function',
        details: getErrorMessage(error),
      });
    }

    // Test 4: Test with admin credentials if database is initialized
    try {
      const response = await fetch('/.netlify/functions/auth-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'admin', password: 'admin123' }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          diagnostics.push({
            name: 'Admin Login Test',
            status: 'success',
            message: 'Admin login successful',
            details: 'Database is properly initialized and login works',
          });
        } else {
          diagnostics.push({
            name: 'Admin Login Test',
            status: 'warning',
            message: 'Admin login failed',
            details: data.message || 'Check if database is initialized',
          });
        }
      } else {
        diagnostics.push({
          name: 'Admin Login Test',
          status: 'error',
          message: `Login failed (${response.status})`,
        });
      }
    } catch (error) {
      diagnostics.push({
        name: 'Admin Login Test',
        status: 'error',
        message: 'Cannot test admin login',
        details: getErrorMessage(error),
      });
    }

    setResults(diagnostics);
    setIsRunning(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle color="success" />;
      case 'warning':
        return <Warning color="warning" />;
      case 'error':
        return <Error color="error" />;
      default:
        return <Error />;
    }
  };

  const getStatusColor = (status: string): 'success' | 'warning' | 'error' => {
    return status as 'success' | 'warning' | 'error';
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
      <Container maxWidth="lg">
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
            <Build sx={{ fontSize: 48, mb: 2 }} />
            <Typography variant="h4" fontWeight={600} gutterBottom>
              System Diagnostics
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              LES Database and Authentication Testing
            </Typography>
          </Box>

          <CardContent sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom>
              Diagnostic Tests
            </Typography>
            
            <Typography variant="body1" paragraph>
              Run these tests to identify issues with the database and authentication system.
            </Typography>

            <Box textAlign="center" mb={3}>
              <Button
                variant="contained"
                size="large"
                onClick={runDiagnostics}
                disabled={isRunning}
                startIcon={isRunning ? <CircularProgress size={20} /> : <Build />}
                sx={{ px: 4, py: 1.5 }}
              >
                {isRunning ? 'Running Diagnostics...' : 'Run System Diagnostics'}
              </Button>
            </Box>

            {/* Results */}
            {results.length > 0 && (
              <Box>
                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                  Test Results
                </Typography>

                <List>
                  {results.map((result, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon>
                        {getStatusIcon(result.status)}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box display="flex" alignItems="center" gap={1}>
                            <Typography variant="subtitle1">
                              {result.name}
                            </Typography>
                            <Chip
                              label={result.status.toUpperCase()}
                              color={getStatusColor(result.status)}
                              size="small"
                            />
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {result.message}
                            </Typography>
                            {result.details && (
                              <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                                {result.details}
                              </Typography>
                            )}
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}

            {/* Setup Instructions */}
            <Accordion sx={{ mt: 3 }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h6">
                  <Storage sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Setup Instructions
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" paragraph>
                  If you're seeing errors, follow these steps:
                </Typography>
                <Typography variant="body2" component="div">
                  <strong>1. Environment Variables:</strong><br />
                  Set up DATABASE_URL, NEON_DATABASE_URL, and JWT_SECRET in Netlify<br /><br />
                  
                  <strong>2. Deployment Branch:</strong><br />
                  Make sure Netlify is deploying from the 'main' branch<br /><br />
                  
                  <strong>3. Neon Database:</strong><br />
                  Ensure your Neon database is active and accessible<br /><br />
                  
                  <strong>4. Functions Deployment:</strong><br />
                  Check that Netlify functions are deployed successfully
                </Typography>
              </AccordionDetails>
            </Accordion>

            {/* Quick Actions */}
            <Box sx={{ mt: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="outlined"
                startIcon={<Link />}
                href="/admin/database-init"
              >
                Database Init
              </Button>
              <Button
                variant="outlined"
                startIcon={<Security />}
                href="/login"
              >
                Login Page
              </Button>
            </Box>
          </CardContent>
        </Paper>
      </Container>
    </Box>
  );
};

export default SystemDiagnostics;
