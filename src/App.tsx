import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Context Providers
import { AuthProvider } from './contexts/AuthProvider';
import { NotificationProvider } from './components/providers/NotificationProvider';

// Components
import ProtectedRoute from './components/common/ProtectedRoute';

// Pages
import Login from './pages/auth/Login';
import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';
import ViolationManagement from './pages/violations/ViolationManagement';
import ViolationsList from './pages/violations/ViolationsList';
import SimpleViolationForm from './pages/violations/SimpleViolationForm';
import ViolationTypeChange from './pages/violations/ViolationTypeChange';
import ViolationProcess from './pages/violations/ViolationProcess';
import SubjectSelection from './pages/violations/SubjectSelection';
import CaseManagement from './pages/cases/CaseManagement';
import DocumentRepository from './pages/documents/DocumentRepository';
import UserRouter from './pages/users/UserRouter';
import AuditLogs from './pages/audit/AuditLogs';
import AuditTrail from './pages/audit/AuditTrail';
import TaskManagement from './pages/tasks/TaskManagement';
import AdministrativeFines from './pages/fines/AdministrativeFines';
import FineCreation from './pages/fines/FineCreation';
import FineCalculationEngine from './pages/fines/FineCalculationEngine';
import FineCalculationRules from './pages/fines/FineCalculationRules';
import FineCalculationHistory from './pages/fines/FineCalculationHistory';
import Settings from './pages/settings/Settings';
import DatabaseInit from './pages/admin/DatabaseInit';
import SystemDiagnostics from './pages/admin/SystemDiagnostics';
import ModuleDevelopmentDashboard from './pages/admin/ModuleDevelopmentDashboard';
import ModuleNavigationHelper from './components/navigation/ModuleNavigationHelper';
import ComprehensiveDataEntry from './components/forms/ComprehensiveDataEntry';

// Activity Management
import ActivityCreation from './pages/activities/ActivityCreation';
import ActivityFromViolation from './pages/activities/ActivityFromViolation';
import ActivityList from './pages/activities/ActivityList';

// Task Management
import TaskCreation from './pages/tasks/TaskCreation';

// Vehicle Management
import VehicleManagement from './pages/vehicles/VehicleManagement';
import VehicleDetails from './pages/vehicles/VehicleDetails';

// Search
import AdvancedSearch from './pages/search/AdvancedSearch';

// Documents
import DocumentUpload from './pages/documents/DocumentUpload';
import DocumentTemplates from './pages/documents/DocumentTemplates';

import './styles/classic-theme.css';

const App: React.FC = () => {
  return (
    <div className="classic-windows-theme">
      <AuthProvider>
        <NotificationProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin/db-init" element={<DatabaseInit />} />
              <Route path="/admin/diagnostics" element={<SystemDiagnostics />} />
              <Route path="/admin/modules" element={<ModuleDevelopmentDashboard />} />
              <Route path="/admin/navigation" element={<ModuleNavigationHelper />} />
              
              {/* Temporary public access for testing */}
              <Route path="/create" element={<SimpleViolationForm />} />
              <Route path="/violations/create" element={<SimpleViolationForm />} />
              <Route path="/activities/create" element={<ActivityCreation />} />
              <Route path="/violations" element={<ViolationsList />} />
              <Route path="/activities" element={<ActivityList />} />
              
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
                path="/data-entry" 
                element={
                  <ProtectedRoute>
                    <ComprehensiveDataEntry />
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
                path="/documents/templates" 
                element={
                  <ProtectedRoute>
                    <DocumentTemplates />
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
                    <ViolationProcess />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/violations/types" 
                element={
                  <ProtectedRoute requiredRoles={['Supervisor', 'Administrator']}>
                    <ViolationTypeChange />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/violations/subject-selection" 
                element={
                  <ProtectedRoute>
                    <SubjectSelection />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/violations/company-selection" 
                element={
                  <ProtectedRoute>
                    <SubjectSelection />
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
                    <ActivityList />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/activities/create" 
                element={
                  <ProtectedRoute>
                    <ActivityCreation />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/activities/from-violation" 
                element={
                  <ProtectedRoute>
                    <ActivityFromViolation />
                  </ProtectedRoute>
                } 
              />

              {/* Task Management Extended Routes */}
              <Route 
                path="/tasks/create" 
                element={
                  <ProtectedRoute requiredRoles={['Supervisor', 'Administrator']}>
                    <TaskCreation />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/tasks/from-violation" 
                element={
                  <ProtectedRoute requiredRoles={['Supervisor', 'Administrator']}>
                    <ActivityFromViolation />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/tasks/:id" 
                element={
                  <ProtectedRoute>
                    <TaskManagement />
                  </ProtectedRoute>
                } 
              />

              {/* Activity Management Routes */}
              <Route 
                path="/activities/create" 
                element={
                  <ProtectedRoute requiredRoles={['Supervisor', 'Administrator']}>
                    <ActivityCreation />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/activities/from-violation" 
                element={
                  <ProtectedRoute requiredRoles={['Supervisor', 'Administrator']}>
                    <ActivityFromViolation />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/activities" 
                element={
                  <ProtectedRoute>
                    <ActivityList />
                  </ProtectedRoute>
                } 
              />

              {/* Document Management Extended Routes */}
              <Route 
                path="/documents/confiscated" 
                element={
                  <ProtectedRoute>
                    <DocumentUpload />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/documents/entities" 
                element={
                  <ProtectedRoute>
                    <DocumentRepository />
                  </ProtectedRoute>
                } 
              />

              {/* Transport/Vehicle Management Routes */}
              <Route 
                path="/vehicles" 
                element={
                  <ProtectedRoute>
                    <VehicleManagement />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/vehicles/details" 
                element={
                  <ProtectedRoute>
                    <VehicleDetails />
                  </ProtectedRoute>
                } 
              />

              {/* Administrative Fines Extended Routes */}
              <Route 
                path="/fines/create" 
                element={
                  <ProtectedRoute>
                    <FineCreation />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/fines/calculation-engine" 
                element={
                  <ProtectedRoute>
                    <FineCalculationEngine />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/fines/calculation-rules" 
                element={
                  <ProtectedRoute requiredRoles={['Supervisor', 'SectorChief', 'Director', 'Administrator']}>
                    <FineCalculationRules />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/fines/calculation-history" 
                element={
                  <ProtectedRoute>
                    <FineCalculationHistory />
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
                    <AdvancedSearch />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/search/filters-1" 
                element={
                  <ProtectedRoute>
                    <AdvancedSearch />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/search/filters-2" 
                element={
                  <ProtectedRoute>
                    <AdvancedSearch />
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
    </div>
  );
};

export default App;
