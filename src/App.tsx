import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Context Providers
import { AuthProvider } from './contexts/AuthProvider';
import { NotificationProvider } from './components/providers/NotificationProvider';

// Components
import ProtectedRoute from './components/common/ProtectedRoute';

// Pages
import Login from './pages/auth/Login';
import Dashboard from './pages/Dashboard';
import ViolationManagement from './pages/violations/ViolationManagement';
import ViolationsList from './pages/violations/ViolationsList';
import ViolationCreateForm from './pages/violations/ViolationCreateForm';
import CaseManagement from './pages/cases/CaseManagement';
import DocumentRepository from './pages/documents/DocumentRepository';
import UserRouter from './pages/users/UserRouter';
import AuditLogs from './pages/audit/AuditLogs';
import AuditTrail from './pages/audit/AuditTrail';
import TaskManagement from './pages/tasks/TaskManagement';
import AdministrativeFines from './pages/fines/AdministrativeFines';
import Settings from './pages/settings/Settings';
import DatabaseInit from './pages/admin/DatabaseInit';
import SystemDiagnostics from './pages/admin/SystemDiagnostics';

import './styles/classic-theme.css';

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
    <div className="classic-windows-theme">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <NotificationProvider>
            <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/admin/db-init" element={<DatabaseInit />} />
              <Route path="/admin/diagnostics" element={<SystemDiagnostics />} />
              
              {/* Protected Routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/violations/*" 
                element={
                  <ProtectedRoute>
                    <ViolationManagement />
                  </ProtectedRoute>
                } 
              />

              <Route 
                path="/violations-list" 
                element={
                  <ProtectedRoute>
                    <ViolationsList />
                  </ProtectedRoute>
                } 
              />

              <Route 
                path="/violation-create" 
                element={
                  <ProtectedRoute>
                    <ViolationCreateForm />
                  </ProtectedRoute>
                } 
              />

              <Route 
                path="/tasks" 
                element={
                  <ProtectedRoute>
                    <TaskManagement />
                  </ProtectedRoute>
                } 
              />

              <Route 
                path="/fines" 
                element={
                  <ProtectedRoute>
                    <AdministrativeFines />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/cases/*" 
                element={
                  <ProtectedRoute>
                    <CaseManagement />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/documents/*" 
                element={
                  <ProtectedRoute>
                    <DocumentRepository />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/users/*" 
                element={
                  <ProtectedRoute requiredRoles={['Administrator']}>
                    <UserRouter />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/audit" 
                element={
                  <ProtectedRoute>
                    <AuditLogs />
                  </ProtectedRoute>
                } 
              />

              <Route 
                path="/audit-trail" 
                element={
                  <ProtectedRoute requiredRoles={['Administrator', 'Supervisor']}>
                    <AuditTrail />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/settings" 
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                } 
              />

              {/* New Module Routes - Implementing all 80+ modules */}
              
              {/* Violation Process Routes */}
              <Route 
                path="/violations/process" 
                element={
                  <ProtectedRoute>
                    <div className="page-content">Violation Process - Coming Soon</div>
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/violations/types" 
                element={
                  <ProtectedRoute requiredRoles={['Supervisor', 'Administrator']}>
                    <div className="page-content">Violation Types - Coming Soon</div>
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/violations/subject-selection" 
                element={
                  <ProtectedRoute>
                    <div className="page-content">Subject Selection - Coming Soon</div>
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/violations/company-selection" 
                element={
                  <ProtectedRoute>
                    <div className="page-content">Company Selection - Coming Soon</div>
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/violations/report" 
                element={
                  <ProtectedRoute>
                    <div className="page-content">Violation Report - Coming Soon</div>
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/violations/reassign" 
                element={
                  <ProtectedRoute requiredRoles={['Supervisor', 'Administrator']}>
                    <div className="page-content">Case Reassignment - Coming Soon</div>
                  </ProtectedRoute>
                } 
              />

              {/* Activities Management Routes */}
              <Route 
                path="/activities" 
                element={
                  <ProtectedRoute>
                    <div className="page-content">Activities List - Coming Soon</div>
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/activities/create" 
                element={
                  <ProtectedRoute>
                    <div className="page-content">Create Activity - Coming Soon</div>
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/activities/from-violation" 
                element={
                  <ProtectedRoute>
                    <div className="page-content">Activity from Violation - Coming Soon</div>
                  </ProtectedRoute>
                } 
              />

              {/* Task Management Extended Routes */}
              <Route 
                path="/tasks/create" 
                element={
                  <ProtectedRoute requiredRoles={['Supervisor', 'Administrator']}>
                    <div className="page-content">Create Task - Coming Soon</div>
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/tasks/from-violation" 
                element={
                  <ProtectedRoute requiredRoles={['Supervisor', 'Administrator']}>
                    <div className="page-content">Task from Violation - Coming Soon</div>
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/tasks/:id" 
                element={
                  <ProtectedRoute>
                    <div className="page-content">Task Window - Coming Soon</div>
                  </ProtectedRoute>
                } 
              />

              {/* Document Management Extended Routes */}
              <Route 
                path="/documents/confiscated" 
                element={
                  <ProtectedRoute>
                    <div className="page-content">Confiscated Items - Coming Soon</div>
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/documents/entities" 
                element={
                  <ProtectedRoute>
                    <div className="page-content">Case Entities - Coming Soon</div>
                  </ProtectedRoute>
                } 
              />

              {/* Transport/Vehicle Management Routes */}
              <Route 
                path="/vehicles" 
                element={
                  <ProtectedRoute>
                    <div className="page-content">Vehicle Management - Coming Soon</div>
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/vehicles/details" 
                element={
                  <ProtectedRoute>
                    <div className="page-content">Transport Details - Coming Soon</div>
                  </ProtectedRoute>
                } 
              />

              {/* Administrative Fines Extended Routes */}
              <Route 
                path="/fines/create" 
                element={
                  <ProtectedRoute>
                    <div className="page-content">Create Fine - Coming Soon</div>
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/fines/data" 
                element={
                  <ProtectedRoute>
                    <div className="page-content">Fine Data - Coming Soon</div>
                  </ProtectedRoute>
                } 
              />

              {/* Search & Filter Routes */}
              <Route 
                path="/search" 
                element={
                  <ProtectedRoute>
                    <div className="page-content">Advanced Search - Coming Soon</div>
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/search/filters-1" 
                element={
                  <ProtectedRoute>
                    <div className="page-content">Search Filters 1 - Coming Soon</div>
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/search/filters-2" 
                element={
                  <ProtectedRoute>
                    <div className="page-content">Search Filters 2 - Coming Soon</div>
                  </ProtectedRoute>
                } 
              />

              {/* Registry Management Routes */}
              <Route 
                path="/registry" 
                element={
                  <ProtectedRoute requiredRoles={['Administrator']}>
                    <div className="page-content">Administrative Registry - Coming Soon</div>
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/registry/protocol" 
                element={
                  <ProtectedRoute requiredRoles={['Administrator']}>
                    <div className="page-content">Protocol Book - Coming Soon</div>
                  </ProtectedRoute>
                } 
              />

              {/* Notification Center Route */}
              <Route 
                path="/notifications" 
                element={
                  <ProtectedRoute>
                    <div className="page-content">Notification Center - Coming Soon</div>
                  </ProtectedRoute>
                } 
              />

              {/* Reports Dashboard Route */}
              <Route 
                path="/reports" 
                element={
                  <ProtectedRoute requiredRoles={['Supervisor', 'Administrator']}>
                    <div className="page-content">Reports Dashboard - Coming Soon</div>
                  </ProtectedRoute>
                } 
              />
              
              {/* Default redirect */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </Router>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
    </div>
  );
};

export default App;
