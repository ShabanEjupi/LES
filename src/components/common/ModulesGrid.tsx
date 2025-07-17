import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { SYSTEM_MODULES, getModulesForUser, ModuleCategory } from '../../types/SystemModules';
import type { SystemModule } from '../../types/SystemModules';
import './ModulesGrid.css';

interface ModulesGridProps {
  onModuleClick?: (moduleId: string) => void;
}

const ModulesGrid: React.FC<ModulesGridProps> = ({ onModuleClick }) => {
  const { state } = useAuth();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  if (!state.user) return null;

  const userModules = getModulesForUser(state.user.role.name);
  
  // Group modules by category
  const modulesByCategory = userModules.reduce((acc, module) => {
    const category = module.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(module);
    return acc;
  }, {} as Record<string, typeof userModules>);

  const handleModuleClick = (module: SystemModule) => {
    if (onModuleClick) {
      onModuleClick(module.id);
    } else {
      navigate(module.route);
    }
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
      case ModuleCategory.SEARCH: return '🔍';
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

  const filteredCategories = selectedCategory 
    ? [selectedCategory]
    : Object.keys(modulesByCategory);

  return (
    <div className="modules-grid-container">
      <div className="modules-header">
        <h2>Sistema e Zbatimit të Ligjit - LES</h2>
        <p>Drejtoria e Përgjithshme e Doganave - Republika e Kosovës</p>
        <div className="user-info">
          <span>Përdoruesi: <strong>{state.user.username}</strong></span>
          <span>Roli: <strong>{state.user.role.name}</strong></span>
          <span>Modula të disponueshme: <strong>{userModules.length}</strong></span>
        </div>
      </div>

      <div className="category-filters">
        <button 
          className={selectedCategory === '' ? 'active' : ''}
          onClick={() => setSelectedCategory('')}
        >
          🏢 Të gjitha ({userModules.length})
        </button>
        {Object.keys(modulesByCategory).map(category => (
          <button
            key={category}
            className={selectedCategory === category ? 'active' : ''}
            onClick={() => setSelectedCategory(category)}
          >
            {getCategoryIcon(category)} {getCategoryName(category)} ({modulesByCategory[category].length})
          </button>
        ))}
      </div>

      <div className="modules-grid">
        {filteredCategories.map(category => (
          <div key={category} className="module-category">
            <h3 className="category-header">
              <span className="category-icon">{getCategoryIcon(category)}</span>
              {getCategoryName(category)}
              <span className="module-count">({modulesByCategory[category].length})</span>
            </h3>
            
            <div className="modules-row">
              {modulesByCategory[category].map(module => (
                <div
                  key={module.id}
                  className="module-card"
                  onClick={() => handleModuleClick(module)}
                  title={`${module.nameAlbanian} - ${module.description}`}
                >
                  <div className="module-icon">{module.icon}</div>
                  <div className="module-name">{module.nameAlbanian}</div>
                  <div className="module-description">{module.description}</div>
                  <div className="module-permissions">
                    {module.requiredRoles.map(role => (
                      <span key={role} className={`role-badge ${role.toLowerCase()}`}>
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="modules-summary">
        <div className="summary-stats">
          <div className="stat-card">
            <div className="stat-number">{userModules.length}</div>
            <div className="stat-label">Modula të Disponueshme</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{Object.keys(modulesByCategory).length}</div>
            <div className="stat-label">Kategori</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{SYSTEM_MODULES.length}</div>
            <div className="stat-label">Gjithsej Modula në Sistem</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModulesGrid;
