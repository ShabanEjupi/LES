import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/useAuth';
import { getModulesWithCaseSynchronization, ModuleCategory, KOSOVO_CUSTOMS_HIERARCHY } from '../../types/KosovoCustomsModules';
import type { SystemModule } from '../../types/KosovoCustomsModules';
import './MainLayout.css';

interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { state, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  if (!state.user) {
    return null;
  }

  // Get user hierarchy level based on role
  const getUserHierarchy = (roleName: string): number => {
    switch (roleName.toLowerCase()) {
      case 'officer': return KOSOVO_CUSTOMS_HIERARCHY.OFFICER;
      case 'supervisor': return KOSOVO_CUSTOMS_HIERARCHY.SUPERVISOR;
      case 'sectorchief': return KOSOVO_CUSTOMS_HIERARCHY.SECTOR_CHIEF;
      case 'director': return KOSOVO_CUSTOMS_HIERARCHY.DIRECTOR;
      default: return KOSOVO_CUSTOMS_HIERARCHY.OFFICER;
    }
  };

  const userHierarchy = getUserHierarchy(state.user.role.name);
  const userModules = getModulesWithCaseSynchronization(
    state.user.role.name,
    userHierarchy,
    state.user.customsPost
  );

  // Group modules by category
  const modulesByCategory = userModules.reduce((acc: Record<string, SystemModule[]>, module: SystemModule) => {
    const category = module.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(module);
    return acc;
  }, {} as Record<string, SystemModule[]>);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleModuleClick = (moduleRoute: string) => {
    navigate(moduleRoute);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case ModuleCategory.DASHBOARD: return '🏠';
      case ModuleCategory.VIOLATIONS: return '⚠️';
      case ModuleCategory.CASE_MANAGEMENT: return '📋';
      case ModuleCategory.ACTIVITIES: return '📝';
      case ModuleCategory.TASKS: return '📬';
      case ModuleCategory.DOCUMENTS: return '📁';
      case ModuleCategory.TRANSPORT: return '🚛';
      case ModuleCategory.FINES: return '💰';
      case ModuleCategory.AUDIT: return '📓';
      case ModuleCategory.SEARCH: return '�';
      case ModuleCategory.REPORTS: return '📊';
      case ModuleCategory.NOTIFICATIONS: return '🔔';
      case ModuleCategory.REGISTRY: return '📚';
      case ModuleCategory.ADMINISTRATION: return '⚙️';
      case ModuleCategory.USER_MANAGEMENT: return '👥';
      case ModuleCategory.SETTINGS: return '⚙️';
      default: return '📂';
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case ModuleCategory.DASHBOARD: return 'Faqja Kryesore';
      case ModuleCategory.VIOLATIONS: return 'Kundërvajtjet';
      case ModuleCategory.CASE_MANAGEMENT: return 'Menaxhimi i Rasteve';
      case ModuleCategory.ACTIVITIES: return 'Aktivitetet';
      case ModuleCategory.TASKS: return 'Detyrat';
      case ModuleCategory.DOCUMENTS: return 'Dokumentet';
      case ModuleCategory.TRANSPORT: return 'Transporti';
      case ModuleCategory.FINES: return 'Gjobat Administrative';
      case ModuleCategory.AUDIT: return 'Auditimi';
      case ModuleCategory.SEARCH: return 'Kërkimi';
      case ModuleCategory.REPORTS: return 'Raportet';
      case ModuleCategory.NOTIFICATIONS: return 'Njoftimet';
      case ModuleCategory.REGISTRY: return 'Regjistrat';
      case ModuleCategory.ADMINISTRATION: return 'Administrata';
      case ModuleCategory.USER_MANAGEMENT: return 'Menaxhimi i Përdoruesve';
      case ModuleCategory.SETTINGS: return 'Cilësimet';
      default: return category;
    }
  };

  return (
    <div className="main-layout">
      {/* Republic of Kosovo Header */}
      <header className="main-header">
        <div className="header-left">
          <div className="kosovo-coat-of-arms">
            <div className="coat-background">🇽🇰</div>
          </div>
          <div className="system-title">
            <div className="republic-name">REPUBLIKA E KOSOVËS</div>
            <div className="ministry-name">Doganat e Kosovës</div>
            <div className="system-name">LES - Law Enforcement System</div>
          </div>
        </div>
        
        <div className="header-center">
          <div className="current-time" id="current-time">
            {new Date().toLocaleString('sq-AL', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>

        <div className="header-right">
          <div className="user-info">
            <div className="user-details">
              <span className="user-name">{state.user.fullName}</span>
              <span className="user-role">{state.user.role.name}</span>
              <span className="user-department">{state.user.department}</span>
              {state.user.customsPost && (
                <span className="customs-post">{state.user.customsPost}</span>
              )}
            </div>
            <div className="user-actions">
              <button className="classic-button classic-button-small" onClick={() => navigate('/profile')}>
                👤 Profili
              </button>
              <button className="classic-button classic-button-small" onClick={handleLogout}>
                🚪 Dil
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Sidebar Navigation */}
        <aside className={`main-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
          <div className="sidebar-header">
            <button 
              className="sidebar-toggle"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              {sidebarCollapsed ? '▶️' : '◀️'}
            </button>
            {!sidebarCollapsed && <span>Modulet e Sistemit</span>}
          </div>

          <div className="sidebar-content">
            {Object.entries(modulesByCategory).map(([category, modules]: [string, SystemModule[]]) => (
              <div key={category} className="module-category">
                <div 
                  className={`category-header ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(selectedCategory === category ? '' : category)}
                >
                  <span className="category-icon">{getCategoryIcon(category)}</span>
                  {!sidebarCollapsed && (
                    <>
                      <span className="category-name">{getCategoryName(category)}</span>
                      <span className="category-count">({modules.length})</span>
                      <span className="expand-icon">{selectedCategory === category ? '▼' : '▶'}</span>
                    </>
                  )}
                </div>
                
                {!sidebarCollapsed && selectedCategory === category && (
                  <div className="module-list">
                    {modules.map((module: SystemModule) => (
                      <div
                        key={module.id}
                        className={`module-item ${location.pathname === module.route ? 'active' : ''}`}
                        onClick={() => handleModuleClick(module.route)}
                        title={module.description}
                      >
                        <span className="module-icon">{module.icon}</span>
                        <span className="module-name">{module.nameAlbanian}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Stats */}
          {!sidebarCollapsed && (
            <div className="sidebar-footer">
              <div className="quick-stats">
                <div className="stat-item">
                  <span className="stat-label">Rastet Aktive:</span>
                  <span className="stat-value">12</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Detyrat:</span>
                  <span className="stat-value">5</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Njoftimet:</span>
                  <span className="stat-value">3</span>
                </div>
              </div>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className="content-area">
          {/* Breadcrumb Navigation */}
          <nav className="breadcrumb">
            <span className="breadcrumb-item">🏠 Kryesore</span>
            <span className="breadcrumb-separator">›</span>
            <span className="breadcrumb-item active">
              {userModules.find((m: SystemModule) => m.route === location.pathname)?.nameAlbanian || 'Dashboard'}
            </span>
          </nav>

          {/* Page Content */}
          <div className="page-content">
            {children || <Outlet />}
          </div>
        </main>
      </div>

      {/* Status Bar */}
      <footer className="status-bar">
        <div className="status-left">
          <span className="system-status">🟢 Sistemi Aktiv</span>
          <span className="connection-status">🔗 E lidhur</span>
          <span className="data-access">📊 Qasje: {state.user.dataAccessLevel}</span>
        </div>
        <div className="status-center">
          <span className="case-count">Rastet e Hapura: 12</span>
          <span className="active-users">Përdorues Aktiv: 24</span>
        </div>
        <div className="status-right">
          <span className="server-time">Ora Server: {new Date().toLocaleTimeString('sq-AL')}</span>
          <span className="version">LES v1.0</span>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
