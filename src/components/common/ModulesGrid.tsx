import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts';
import { COMPLETE_KOSOVO_CUSTOMS_MODULES } from '../../data/Complete800ModulesSystem';
import type { SystemModule } from '../../types/KosovoCustomsModules';
import { ClassicButton } from './ClassicButton';
import './ModulesGrid.css';

interface ModulesGridProps {
  onModuleSelect?: (module: SystemModule) => void;
  categoryFilter?: string;
  showInactive?: boolean;
}

// Extended module interface for display
interface ExtendedModule extends SystemModule {
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  department: string;
}

const ModulesGrid: React.FC<ModulesGridProps> = ({ 
  onModuleSelect, 
  categoryFilter, 
  showInactive = false 
}) => {
  const { state } = useAuth();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [sortBy, setSortBy] = useState<'name' | 'category' | 'priority'>('category');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredModules, setFilteredModules] = useState<ExtendedModule[]>([]);

  // Get all modules
  const allModules = useMemo(() => COMPLETE_KOSOVO_CUSTOMS_MODULES, []);

  const getPriorityFromCategory = useCallback((category: string): 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' => {
    const priorityMap: { [key: string]: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' } = {
      'VIOLATIONS': 'HIGH',
      'CASE_MANAGEMENT': 'HIGH',
      'AUDIT': 'HIGH',
      'SECURITY': 'CRITICAL',
      'TASKS': 'MEDIUM',
      'ACTIVITIES': 'MEDIUM',
      'DOCUMENTS': 'MEDIUM',
      'REPORTS': 'LOW',
      'ADMINISTRATION': 'LOW'
    };
    return priorityMap[category] || 'MEDIUM';
  }, []);

  const getDepartmentFromCategory = useCallback((category: string): string => {
    const departmentMap: { [key: string]: string } = {
      'VIOLATIONS': 'CUSTOMS_CONTROL',
      'CASE_MANAGEMENT': 'INVESTIGATION', 
      'AUDIT': 'INTERNAL_AUDIT',
      'TASKS': 'OPERATIONS',
      'ACTIVITIES': 'OPERATIONS',
      'DOCUMENTS': 'ADMINISTRATION',
      'TRANSPORT': 'CUSTOMS_CONTROL',
      'REPORTS': 'ADMINISTRATION',
      'NOTIFICATIONS': 'INFORMATION_SYSTEMS',
      'USER_MANAGEMENT': 'HUMAN_RESOURCES',
      'ADMINISTRATION': 'ADMINISTRATION'
    };
    return departmentMap[category] || 'OPERATIONS';
  }, []);

  // Extend modules with priority and department for display
  const getExtendedModules = useCallback((): ExtendedModule[] => {
    return allModules.map(module => ({
      ...module,
      priority: getPriorityFromCategory(module.category),
      department: getDepartmentFromCategory(module.category)
    }));
  }, [allModules, getPriorityFromCategory, getDepartmentFromCategory]);

  useEffect(() => {
    let modules = getExtendedModules().filter(module => module.isActive || showInactive);

    // Filter by user role
    if (state.user?.role) {
      const userRoleString = typeof state.user.role === 'string' 
        ? state.user.role 
        : state.user.role.name || 'OFFICER';
      const userRole = userRoleString.toUpperCase();
      modules = modules.filter(module => {
        const requiredRole = module.requiredRoles?.[0] || 'OFFICER';
        // Role hierarchy: OFFICER < SECTOR_CHIEF < ADMIN < DIRECTOR
        const roleHierarchy = {
          'OFFICER': 1,
          'SECTOR_CHIEF': 2,
          'ADMIN': 3,
          'DIRECTOR': 4
        };
        
        const userLevel = roleHierarchy[userRole as keyof typeof roleHierarchy] || 1;
        const requiredLevel = roleHierarchy[requiredRole as keyof typeof roleHierarchy] || 1;
        
        return userLevel >= requiredLevel;
      });
    }

    // Filter by category
    if (categoryFilter) {
      modules = modules.filter(module => module.category === categoryFilter);
    }

    // Filter by search term
    if (searchTerm) {
      modules = modules.filter(module => 
        module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        module.nameAlbanian.toLowerCase().includes(searchTerm.toLowerCase()) ||
        module.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort modules
    modules.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.nameAlbanian.localeCompare(b.nameAlbanian);
        case 'category':
          return a.category.localeCompare(b.category);
        case 'priority': {
          const priorityOrder = { 'CRITICAL': 4, 'HIGH': 3, 'MEDIUM': 2, 'LOW': 1 };
          return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
        }
        default:
          return a.sortOrder - b.sortOrder;
      }
    });

    setFilteredModules(modules);
  }, [getExtendedModules, state.user, categoryFilter, searchTerm, sortBy, showInactive]);

  const handleModuleClick = (module: SystemModule) => {
    if (onModuleSelect) {
      onModuleSelect(module);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'CRITICAL': return '#dc3545';
      case 'HIGH': return '#fd7e14';
      case 'MEDIUM': return '#ffc107';
      case 'LOW': return '#28a745';
      default: return '#6c757d';
    }
  };

  const getCategoryIcon = (category: string) => {
    const categoryIcons: { [key: string]: string } = {
      'DASHBOARD': '🏠',
      'VIOLATIONS': '⚠️',
      'CASE_MANAGEMENT': '📋',
      'ACTIVITIES': '📝',
      'TASKS': '📬',
      'TRANSPORT': '🚛',
      'DOCUMENTS': '📄',
      'NOTIFICATIONS': '🔔',
      'ADMINISTRATION': '⚙️',
      'REPORTS': '📊',
      'USER_MANAGEMENT': '👥',
      'AUDIT': '🔍',
      'SECURITY': '🔒',
      'SYSTEM': '💻'
    };
    return categoryIcons[category] || '📌';
  };

  if (viewMode === 'list') {
    return (
      <div className="modules-grid">
        <div className="modules-controls">
          <div className="search-controls">
            <input
              type="text"
              placeholder="Kërkoni module..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="classic-textbox"
              style={{ width: '200px', fontSize: '11px' }}
            />
          </div>

          <div className="view-controls">
            <ClassicButton
              variant="primary"
              onClick={() => setViewMode('grid')}
              size="small"
            >
              Grid View
            </ClassicButton>
            <ClassicButton
              variant="default"
              onClick={() => setViewMode('list')}
              size="small"
            >
              List View
            </ClassicButton>
          </div>
          
          <div className="sort-controls">
            <label style={{ fontSize: '11px' }}>Sort by:</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value as 'name' | 'category' | 'priority')}
              className="classic-dropdown"
              style={{ fontSize: '11px' }}
            >
              <option value="category">Category</option>
              <option value="name">Name</option>
              <option value="priority">Priority</option>
            </select>
          </div>
        </div>

        <div className="modules-stats" style={{ 
          padding: '8px', 
          background: '#f0f0f0', 
          border: '1px inset #c0c0c0',
          fontSize: '11px',
          marginBottom: '8px'
        }}>
          <span>📊 Modulet Aktive: <strong>{filteredModules.filter(m => m.isActive).length}</strong></span>
          <span style={{ marginLeft: '20px' }}>🔧 Total në Sistem: <strong>{allModules.length}</strong></span>
          <span style={{ marginLeft: '20px' }}>👤 Qasje për: <strong>{state.user?.role?.name || 'N/A'}</strong></span>
        </div>

        <div style={{ 
          border: '1px inset #c0c0c0', 
          background: 'white',
          maxHeight: '600px',
          overflow: 'auto'
        }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            fontSize: '11px'
          }}>
            <thead style={{ 
              background: '#c0c0c0', 
              position: 'sticky', 
              top: 0 
            }}>
              <tr>
                <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'left' }}>Module</th>
                <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'left' }}>Category</th>
                <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'left' }}>Priority</th>
                <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'left' }}>Department</th>
                <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'left' }}>Required Role</th>
                <th style={{ padding: '8px', border: '1px solid #808080', textAlign: 'left' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredModules.map((module, index) => (
                <tr 
                  key={module.id}
                  style={{ 
                    backgroundColor: index % 2 === 0 ? 'white' : '#f8f8f8',
                    cursor: 'pointer'
                  }}
                  onDoubleClick={() => handleModuleClick(module)}
                >
                  <td style={{ padding: '8px', border: '1px solid #c0c0c0' }}>
                    <div style={{ fontWeight: 'bold' }}>
                      {getCategoryIcon(module.category)} {module.nameAlbanian}
                    </div>
                    <div style={{ fontSize: '10px', color: '#666', marginTop: '2px' }}>
                      {module.name}
                    </div>
                    <div style={{ fontSize: '9px', color: '#999', marginTop: '2px' }}>
                      {module.description.substring(0, 60)}...
                    </div>
                  </td>
                  <td style={{ padding: '8px', border: '1px solid #c0c0c0' }}>
                    {module.category}
                  </td>
                  <td style={{ padding: '8px', border: '1px solid #c0c0c0' }}>
                    <span style={{ 
                      padding: '2px 6px', 
                      borderRadius: '3px',
                      backgroundColor: getPriorityColor(module.priority),
                      color: 'white',
                      fontSize: '10px'
                    }}>
                      {module.priority}
                    </span>
                  </td>
                  <td style={{ padding: '8px', border: '1px solid #c0c0c0' }}>
                    {module.department}
                  </td>
                  <td style={{ padding: '8px', border: '1px solid #c0c0c0' }}>
                    {module.requiredRoles?.[0] || 'OFFICER'}
                  </td>
                  <td style={{ padding: '8px', border: '1px solid #c0c0c0' }}>
                    <ClassicButton
                      variant="primary"
                      size="small"
                      onClick={() => handleModuleClick(module)}
                    >
                      Open
                    </ClassicButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="modules-grid">
      <div className="modules-controls">
        <div className="view-controls">
          <ClassicButton
            variant="primary"
            onClick={() => setViewMode('grid')}
            size="small"
          >
            Grid View
          </ClassicButton>
          <ClassicButton
            variant="default"
            onClick={() => setViewMode('list')}
            size="small"
          >
            List View
          </ClassicButton>
        </div>
        
        <div className="sort-controls">
          <label>Sort by:</label>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value as 'name' | 'category' | 'priority')}
          >
            <option value="category">Category</option>
            <option value="name">Name</option>
            <option value="priority">Priority</option>
          </select>
        </div>
      </div>

      <div className="modules-grid-container">
        {filteredModules.map((module) => (
          <div 
            key={module.id} 
            className="module-card"
            onClick={() => handleModuleClick(module)}
          >
            <div className="module-icon">{getCategoryIcon(module.category)}</div>
            <div className="module-title">{module.nameAlbanian}</div>
            <div className="module-description">{module.description}</div>
            <div className="module-priority" style={{ 
              backgroundColor: getPriorityColor(module.priority) 
            }}>
              {module.priority}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModulesGrid;
