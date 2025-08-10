// Module Registry - Central management for all LES modules
// This file manages the 80+ modules that need to be implemented

export interface ModuleDefinition {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  category: 'ACTIVITIES' | 'ADMINISTRATION' | 'BORDER_CONTROL' | 'CASES' | 'DOCUMENTS' | 'FINES' | 'REPORTS' | 'VEHICLES' | 'NOTIFICATIONS' | 'AUDIT' | 'SEARCH' | 'REGISTRY' | 'TASKS' | 'VIOLATIONS' | 'USERS';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'NOT_IMPLEMENTED' | 'IN_PROGRESS' | 'IMPLEMENTED' | 'TESTED';
  route: string;
  component?: string;
  requiredRoles?: string[];
  dependencies?: string[];
  estimatedHours?: number;
}

export const moduleRegistry: ModuleDefinition[] = [
  // ACTIVITIES - MEDIUM Priority
  {
    id: 'activity-created',
    name: 'Aktiviteti i Krijuar Kundërvajtes',
    nameEn: 'Activity Created',
    description: 'Konfirmimi i krijimit të aktivitetit...',
    category: 'ACTIVITIES',
    priority: 'MEDIUM',
    status: 'NOT_IMPLEMENTED',
    route: '/activities/created',
    component: 'ActivityCreated',
    requiredRoles: ['Officer', 'Supervisor'],
    estimatedHours: 8
  },
  {
    id: 'activities-tasks-in-case',
    name: 'Detyrat dhe Aktivitetet e Krijuara në Rast',
    nameEn: 'Activities and Tasks in Case',
    description: 'Lista e aktiviteteve dhe detyrave në rast...',
    category: 'ACTIVITIES',
    priority: 'MEDIUM',
    status: 'NOT_IMPLEMENTED',
    route: '/activities/case-activities',
    component: 'CaseActivities',
    requiredRoles: ['Officer', 'Supervisor'],
    estimatedHours: 12
  },

  // BORDER CONTROL - LOW Priority (48 modules)
  ...Array.from({ length: 48 }, (_, i) => ({
    id: `border-control-${i + 1}`,
    name: `Moduli i BORDER CONTROL ${i + 1}`,
    nameEn: `BORDER CONTROL Module ${i + 1}`,
    description: `BORDER CONTROL operation module ${i + 1}...`,
    category: 'BORDER_CONTROL' as const,
    priority: 'LOW' as const,
    status: 'NOT_IMPLEMENTED' as const,
    route: `/border-control/module-${i + 1}`,
    component: `BorderControlModule${i + 1}`,
    requiredRoles: ['Border Officer', 'Supervisor', 'Administrator'],
    estimatedHours: 6
  })),

  // CASES - HIGH Priority
  {
    id: 'case-assignment',
    name: 'Caktimi i Rastit',
    nameEn: 'Case Assignment',
    description: 'Caktimi i rasteve te oficerëve...',
    category: 'CASES',
    priority: 'HIGH',
    status: 'IMPLEMENTED',
    route: '/cases/assignment',
    component: 'CaseAssignment',
    requiredRoles: ['Supervisor', 'Administrator'],
    estimatedHours: 16
  },

  // DOCUMENTS - HIGH Priority
  {
    id: 'document-templates',
    name: 'Shabllonet e Dokumenteve',
    nameEn: 'Document Templates',
    description: 'Menaxhimi i shablloneve të dokumenteve...',
    category: 'DOCUMENTS',
    priority: 'HIGH',
    status: 'NOT_IMPLEMENTED',
    route: '/documents/templates',
    component: 'DocumentTemplates',
    requiredRoles: ['Officer', 'Supervisor'],
    estimatedHours: 20
  },

  // FINES - HIGH Priority
  {
    id: 'fine-calculation',
    name: 'Kalkulimi Automatik i Gjobave',
    nameEn: 'Automatic Fine Calculation',
    description: 'Sistemi i kalkulimit automatik të gjobave...',
    category: 'FINES',
    priority: 'HIGH',
    status: 'NOT_IMPLEMENTED',
    route: '/fines/calculation',
    component: 'FineCalculation',
    requiredRoles: ['Officer', 'Supervisor'],
    estimatedHours: 24
  },

  // VEHICLES - MEDIUM Priority
  {
    id: 'vehicle-inspection',
    name: 'Inspektimi i Mjeteve',
    nameEn: 'Vehicle Inspection',
    description: 'Sistemi i inspektimit të mjeteve...',
    category: 'VEHICLES',
    priority: 'MEDIUM',
    status: 'NOT_IMPLEMENTED',
    route: '/vehicles/inspection',
    component: 'VehicleInspection',
    requiredRoles: ['Officer', 'Inspector'],
    estimatedHours: 18
  },

  // NOTIFICATIONS - HIGH Priority
  {
    id: 'automated-notifications',
    name: 'Njoftimet e Automatizuara',
    nameEn: 'Automated Notifications',
    description: 'Sistemi i njoftimeve automatike...',
    category: 'NOTIFICATIONS',
    priority: 'HIGH',
    status: 'IMPLEMENTED',
    route: '/notifications/automated',
    component: 'AutomatedNotifications',
    requiredRoles: ['Officer', 'Supervisor'],
    estimatedHours: 14
  },

  // REPORTS - HIGH Priority
  {
    id: 'violation-reports',
    name: 'Raportet e Kundërvajtjeve',
    nameEn: 'Violation Reports',
    description: 'Gjenerimi i raporteve të kundërvajtjeve...',
    category: 'REPORTS',
    priority: 'HIGH',
    status: 'NOT_IMPLEMENTED',
    route: '/reports/violations',
    component: 'ViolationReports',
    requiredRoles: ['Supervisor', 'Administrator'],
    estimatedHours: 22
  },

  // AUDIT - MEDIUM Priority
  {
    id: 'audit-compliance',
    name: 'Auditimi i Përputhshmërisë',
    nameEn: 'Compliance Audit',
    description: 'Sistemi i auditimit të përputhshmërisë...',
    category: 'AUDIT',
    priority: 'MEDIUM',
    status: 'NOT_IMPLEMENTED',
    route: '/audit/compliance',
    component: 'ComplianceAudit',
    requiredRoles: ['Auditor', 'Administrator'],
    estimatedHours: 16
  },

  // SEARCH - HIGH Priority
  {
    id: 'intelligent-search',
    name: 'Kërkimi Inteligjent',
    nameEn: 'Intelligent Search',
    description: 'Sistemi i kërkimit inteligjent...',
    category: 'SEARCH',
    priority: 'HIGH',
    status: 'NOT_IMPLEMENTED',
    route: '/search/intelligent',
    component: 'IntelligentSearch',
    requiredRoles: ['Officer', 'Supervisor'],
    estimatedHours: 20
  },

  // REGISTRY - MEDIUM Priority
  {
    id: 'protocol-registry',
    name: 'Regjistri i Protokollit',
    nameEn: 'Protocol Registry',
    description: 'Menaxhimi i regjistrit të protokollit...',
    category: 'REGISTRY',
    priority: 'MEDIUM',
    status: 'NOT_IMPLEMENTED',
    route: '/registry/protocol',
    component: 'ProtocolRegistry',
    requiredRoles: ['Officer', 'Administrator'],
    estimatedHours: 18
  }
];

// Helper functions for module management
export const getModulesByCategory = (category: ModuleDefinition['category']) => {
  return moduleRegistry.filter(module => module.category === category);
};

export const getModulesByPriority = (priority: ModuleDefinition['priority']) => {
  return moduleRegistry.filter(module => module.priority === priority);
};

export const getModulesByStatus = (status: ModuleDefinition['status']) => {
  return moduleRegistry.filter(module => module.status === status);
};

export const getHighPriorityModules = () => {
  return moduleRegistry.filter(module => module.priority === 'HIGH');
};

export const getTotalEstimatedHours = () => {
  return moduleRegistry.reduce((total, module) => total + (module.estimatedHours || 0), 0);
};

export const getModuleById = (id: string) => {
  return moduleRegistry.find(module => module.id === id);
};

// Development phases based on priority
export const developmentPhases = {
  phase1: 'Foundation Fixes & Core Infrastructure',
  phase2: 'High Priority Modules (Core Business Logic)',
  phase3: 'Medium Priority Modules (Enhanced Features)',
  phase4: 'Low Priority Modules (Administrative & Border Control)',
  phase5: 'Testing, Integration & Deployment'
};

export const getPhaseModules = (phase: number): ModuleDefinition[] => {
  switch (phase) {
    case 2:
      return getModulesByPriority('HIGH');
    case 3:
      return getModulesByPriority('MEDIUM');
    case 4:
      return getModulesByPriority('LOW');
    default:
      return [];
  }
};
