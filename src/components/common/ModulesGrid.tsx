import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/auth/AuthContext';
import { ClassicCard } from '../common/ClassicCard';
import { ClassicButton } from '../common/ClassicButton';
import { allKosovoModules, moduleCategories } from '../../data/kosovoCostomeModules';
import { allExtendedModules } from '../../data/extendedKosovoModules';
import type { KosovoModule } from '../../data/kosovoCostomeModules';
import '../../styles/classic-theme.css';

interface ModulesGridProps {
  searchTerm?: string;
  categoryFilter?: string;
  onModuleSelect: (module: KosovoModule) => void;
}

const ModulesGrid: React.FC<ModulesGridProps> = ({ 
  searchTerm = '', 
  categoryFilter = '', 
  onModuleSelect 
}) => {
  const { state } = useAuth();
  const [filteredModules, setFilteredModules] = useState<KosovoModule[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryFilter);
  const [sortBy, setSortBy] = useState<'name' | 'priority' | 'category'>('category');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const allModules = [...allKosovoModules, ...allExtendedModules];

  useEffect(() => {
    let modules = allModules.filter(module => module.active);

    // Filter by user role
    if (state.user?.role) {
      const userRoleString = typeof state.user.role === 'string' 
        ? state.user.role 
        : state.user.role.name || 'OFFICER';
      const userRole = userRoleString.toUpperCase();
      modules = modules.filter(module => {
        const requiredRole = module.requiredRole;
        // Role hierarchy: OFFICER < SECTOR_CHIEF < ADMIN < DIRECTOR
        const roleHierarchy = {
          'OFFICER': 1,
          'SECTOR_CHIEF': 2,
          'ADMIN': 3,
          'DIRECTOR': 4
        };
        
        const userLevel = roleHierarchy[userRole as keyof typeof roleHierarchy] || 1;
        const requiredLevel = roleHierarchy[requiredRole] || 1;
        
        return userLevel >= requiredLevel;
      });
    }

    // Filter by search term
    if (searchTerm) {
      modules = modules.filter(module =>
        module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        module.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
        module.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      modules = modules.filter(module => module.category === selectedCategory);
    }

    // Sort modules
    modules.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'priority': {
          const priorityOrder = { 'CRITICAL': 4, 'HIGH': 3, 'MEDIUM': 2, 'LOW': 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

    setFilteredModules(modules);
  }, [searchTerm, selectedCategory, sortBy, state.user]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'CRITICAL': return '#dc3545';
      case 'HIGH': return '#fd7e14';
      case 'MEDIUM': return '#ffc107';
      case 'LOW': return '#28a745';
      default: return '#6c757d';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      violations: '#dc3545',
      cases: '#007bff',
      activities: '#28a745',
      vehicles: '#fd7e14',
      goods: '#6f42c1',
      penalties: '#e83e8c',
      administration: '#20c997',
      audit: '#6c757d',
      search: '#17a2b8',
      notifications: '#ffc107',
      documents: '#795548',
      personnel: '#9c27b0',
      training: '#ff5722',
      risk: '#f44336',
      technology: '#607d8b',
      border: '#4caf50',
      clearance: '#2196f3',
      intelligence: '#9e9e9e',
      laboratory: '#ff9800'
    };
    return colors[category as keyof typeof colors] || '#6c757d';
  };

  const handleModuleClick = (module: KosovoModule) => {
    onModuleSelect(module);
  };

  const groupedModules = filteredModules.reduce((groups, module) => {
    const category = module.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(module);
    return groups;
  }, {} as Record<string, KosovoModule[]>);

  if (viewMode === 'list') {
    return (
      <div className="modules-list">
        <div className="modules-controls">
          <div className="view-controls">
            <ClassicButton
              variant={viewMode === 'grid' ? 'primary' : 'default'}
              onClick={() => setViewMode('grid')}
              size="small"
            >
              Grid View
            </ClassicButton>
            <ClassicButton
              variant={viewMode === 'list' ? 'primary' : 'default'}
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
              onChange={(e) => setSortBy(e.target.value as 'name' | 'priority' | 'category')}
              className="classic-select"
            >
              <option value="category">Category</option>
              <option value="name">Name</option>
              <option value="priority">Priority</option>
            </select>
          </div>

          <div className="category-filter">
            <label>Category:</label>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="classic-select"
            >
              <option value="">All Categories</option>
              {Object.entries(moduleCategories).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="modules-table">
          <table className="classic-table">
            <thead>
              <tr>
                <th>Module</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Department</th>
                <th>Required Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredModules.map((module) => (
                <tr key={module.id}>
                  <td>
                    <div className="module-info">
                      <span className="module-icon">{module.icon}</span>
                      <div>
                        <div className="module-name">{module.name}</div>
                        <div className="module-name-en">{module.nameEn}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span 
                      className="category-badge"
                      style={{ backgroundColor: getCategoryColor(module.category) }}
                    >
                      {moduleCategories[module.category as keyof typeof moduleCategories] || module.category}
                    </span>
                  </td>
                  <td>
                    <span 
                      className="priority-badge"
                      style={{ backgroundColor: getPriorityColor(module.priority) }}
                    >
                      {module.priority}
                    </span>
                  </td>
                  <td>{module.department}</td>
                  <td>{module.requiredRole}</td>
                  <td>
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
            variant={viewMode === 'grid' ? 'primary' : 'default'}
            onClick={() => setViewMode('grid')}
            size="small"
          >
            Grid View
          </ClassicButton>
          <ClassicButton
            variant={viewMode === 'list' ? 'primary' : 'default'}
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
            onChange={(e) => setSortBy(e.target.value as 'name' | 'priority' | 'category')}
            className="classic-select"
          >
            <option value="category">Category</option>
            <option value="name">Name</option>
            <option value="priority">Priority</option>
          </select>
        </div>

        <div className="category-filter">
          <label>Category:</label>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="classic-select"
          >
            <option value="">All Categories</option>
            {Object.entries(moduleCategories).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="modules-stats">
        <div className="stat-item">
          <span className="stat-label">Total Modules:</span>
          <span className="stat-value">{allModules.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Available to You:</span>
          <span className="stat-value">{filteredModules.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Categories:</span>
          <span className="stat-value">{Object.keys(groupedModules).length}</span>
        </div>
      </div>

      {Object.keys(groupedModules).length === 0 ? (
        <div className="no-modules">
          <p>No modules found matching your criteria.</p>
        </div>
      ) : (
        Object.entries(groupedModules).map(([category, modules]) => (
          <div key={category} className="category-section">
            <h3 
              className="category-title"
              style={{ borderLeftColor: getCategoryColor(category) }}
            >
              {moduleCategories[category as keyof typeof moduleCategories] || category}
              <span className="module-count">({modules.length})</span>
            </h3>
            
            <div className="modules-grid-container">
              {modules.map((module) => (
                <ClassicCard 
                  key={module.id}
                  className="module-card"
                  onClick={() => handleModuleClick(module)}
                >
                  <div className="module-header">
                    <span className="module-icon">{module.icon}</span>
                    <div className="module-badges">
                      <span 
                        className="priority-badge"
                        style={{ backgroundColor: getPriorityColor(module.priority) }}
                      >
                        {module.priority}
                      </span>
                    </div>
                  </div>
                  
                  <div className="module-content">
                    <h4 className="module-name">{module.name}</h4>
                    <p className="module-name-en">{module.nameEn}</p>
                    <p className="module-description">{module.description}</p>
                    
                    <div className="module-meta">
                      <div className="meta-item">
                        <strong>Department:</strong> {module.department}
                      </div>
                      <div className="meta-item">
                        <strong>Required Role:</strong> {module.requiredRole}
                      </div>
                      {module.fields && (
                        <div className="meta-item">
                          <strong>Fields:</strong> {module.fields.length}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="module-footer">
                    <ClassicButton 
                      variant="primary" 
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleModuleClick(module);
                      }}
                    >
                      Open Module
                    </ClassicButton>
                  </div>
                </ClassicCard>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ModulesGrid;
