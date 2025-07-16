import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './components/providers/NotificationProvider';
import ProtectedRoute from './components/common/ProtectedRoute';
import Login from './pages/auth/Login';
import Dashboard from './pages/Dashboard';
import CaseManagement from './pages/cases/CaseManagement';
import DocumentRepository from './pages/documents/DocumentRepository';
import UserManagement from './pages/users/UserManagement';
import Reports from './pages/reports/Reports';
import Settings from './pages/settings/Settings';
import AuditLogs from './pages/audit/AuditLogs';
import DatabaseInit from './pages/admin/DatabaseInit';
import SystemDiagnostics from './pages/admin/SystemDiagnostics';
import './App.css';

// Create custom theme for customs administration
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Professional blue
      dark: '#115293',
      light: '#42a5f5',
    },
    secondary: {
      main: '#dc004e', // Albanian flag red accent
      dark: '#9a0036',
      light: '#ff5983',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    error: {
      main: '#d32f2f',
    },
    warning: {
      main: '#ff9800',
    },
    success: {
      main: '#2e7d32',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1976d2',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#fafafa',
          borderRight: '1px solid #e0e0e0',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderRadius: '8px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <NotificationProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/admin/init" element={<DatabaseInit />} />
              <Route path="/admin/database-init" element={<DatabaseInit />} />
              <Route path="/admin/diagnostics" element={<SystemDiagnostics />} />
              
              {/* Protected Routes */}
              <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/cases/*" element={<ProtectedRoute><CaseManagement /></ProtectedRoute>} />
              <Route path="/documents/*" element={<ProtectedRoute><DocumentRepository /></ProtectedRoute>} />
              <Route path="/users" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
              <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
              <Route path="/audit" element={<ProtectedRoute><AuditLogs /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              
              {/* Redirect unknown routes to dashboard */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </Router>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
