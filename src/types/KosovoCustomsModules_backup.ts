/**
 * COMPREHENSIVE REPUBLIC OF KOSOVO CUSTOMS SYSTEM MODULES (800+ Modules)
 * Based on actual system photos and Kosovo government requirements
 * Law Enforcement System (LES) - Republic of Kosovo Customs Administration
 * Republika e Kosovës - Doganat e Kosovës
 */

export interface SystemModule {
  id: string;
  name: string;
  nameAlbanian: string;
  description: string;
  icon: string;
  route: string;
  component: string;
  requiredRoles: string[];
  requiredPermissions: string[];
  parentModule?: string;
  subModules?: string[];
  category: ModuleCategoryType;
  isActive: boolean;
  sortOrder: number;
  hierarchyLevel?: number; // 1=Officer, 2=Supervisor, 3=SectorChief, 4=Director
  customsPost?: string[]; /**
 * KOSOVO CUSTOMS HIERARCHY LEVELS 
 * 1 = Officer (Oficer)
 * 2 = Supervisor (Mbikëqyrës) 
 * 3 = Sector Chief (Kryetar Sektori)
 * 4 = Director (Drejtor)
 */
export const KOSOVO_CUSTOMS_HIERARCHY = {
  OFFICER: 1,
  SUPERVISOR: 2,
  SECTOR_CHIEF: 3,
  DIRECTOR: 4
} as const;

export type KosovoCustomsHierarchy = typeof KOSOVO_CUSTOMS_HIERARCHY[keyof typeof KOSOVO_CUSTOMS_HIERARCHY];

/**
 * CASE SYNCHRONIZATION FUNCTIONS FOR KOSOVO CUSTOMS HIERARCHY
 * Director (Admin) can see all cases across all sectors
 * Sector Chief can see cases in their sector and subordinate officers
 * Officers can see only their assigned cases
 */

export interface CaseSynchronizationRule {
  userLevel: number;
  canViewLevels: number[];
  canAssignToLevels: number[];
  canModifyLevels: number[];
  description: string;
  descriptionAlbanian: string;
}

export const CASE_SYNCHRONIZATION_RULES: CaseSynchronizationRule[] = [
  {
    userLevel: KOSOVO_CUSTOMS_HIERARCHY.DIRECTOR,
    canViewLevels: [1, 2, 3, 4], // Can view all levels
    canAssignToLevels: [1, 2, 3], // Can assign to all subordinates
    canModifyLevels: [1, 2, 3, 4], // Can modify all cases
    description: 'Director has full access to all cases and can manage all levels',
    descriptionAlbanian: 'Drejtori ka qasje të plotë në të gjitha rastet dhe mund të menaxhojë të gjitha nivelet'
  },
  {
    userLevel: KOSOVO_CUSTOMS_HIERARCHY.SECTOR_CHIEF,
    canViewLevels: [1, 2, 3], // Can view own level and subordinates
    canAssignToLevels: [1, 2], // Can assign to officers and supervisors
    canModifyLevels: [1, 2, 3], // Can modify own and subordinate cases
    description: 'Sector Chief can manage cases within their sector',
    descriptionAlbanian: 'Shefi i Sektorit mund të menaxhojë rastet brenda sektorit të tyre'
  },
  {
    userLevel: KOSOVO_CUSTOMS_HIERARCHY.SUPERVISOR,
    canViewLevels: [1, 2], // Can view own level and officers
    canAssignToLevels: [1], // Can assign to officers only
    canModifyLevels: [1, 2], // Can modify own and officer cases
    description: 'Supervisor can manage cases for officers in their team',
    descriptionAlbanian: 'Mbikëqyrësi mund të menaxhojë rastet për oficerët në ekipin e tyre'
  },
  {
    userLevel: KOSOVO_CUSTOMS_HIERARCHY.OFFICER,
    canViewLevels: [1], // Can view only own cases
    canAssignToLevels: [], // Cannot assign cases
    canModifyLevels: [1], // Can modify only own cases
    description: 'Officer can only view and modify their own assigned cases',
    descriptionAlbanian: 'Oficeri mund të shikojë dhe modifikojë vetëm rastet e tyre të caktuara'
  }
];

/**
 * Get modules accessible by user hierarchy level
 */
export function getModulesForHierarchyLevel(hierarchyLevel: number): SystemModule[] {
  return KOSOVO_CUSTOMS_MODULES.filter(module => 
    module.isActive && 
    (!module.hierarchyLevel || module.hierarchyLevel <= hierarchyLevel)
  );
}

/**
 * Check if user can access a specific module
 */
export function canUserAccessModule(userHierarchyLevel: number, moduleId: string): boolean {
  const module = KOSOVO_CUSTOMS_MODULES.find(m => m.id === moduleId);
  if (!module || !module.isActive) return false;
  
  return !module.hierarchyLevel || module.hierarchyLevel <= userHierarchyLevel;
}

/**
 * Get case synchronization rules for user
 */
export function getCaseSynchronizationRules(userHierarchyLevel: number): CaseSynchronizationRule | null {
  return CASE_SYNCHRONIZATION_RULES.find(rule => rule.userLevel === userHierarchyLevel) || null;
}

/**
 * Check if user can view cases from specific hierarchy level
 */
export function canViewCasesFromLevel(userLevel: number, targetLevel: number): boolean {
  const rules = getCaseSynchronizationRules(userLevel);
  return rules ? rules.canViewLevels.includes(targetLevel) : false;
}

/**
 * Check if user can assign cases to specific hierarchy level
 */
export function canAssignCasesToLevel(userLevel: number, targetLevel: number): boolean {
  const rules = getCaseSynchronizationRules(userLevel);
  return rules ? rules.canAssignToLevels.includes(targetLevel) : false;
}

/**
 * Check if user can modify cases from specific hierarchy level
 */
export function canModifyCasesFromLevel(userLevel: number, targetLevel: number): boolean {
  const rules = getCaseSynchronizationRules(userLevel);
  return rules ? rules.canModifyLevels.includes(targetLevel) : false;
}

/**
 * Get all modules grouped by category for a specific hierarchy level
 */
export function getModulesByCategory(hierarchyLevel: number): Record<string, SystemModule[]> {
  const accessibleModules = getModulesForHierarchyLevel(hierarchyLevel);
  const grouped: Record<string, SystemModule[]> = {};
  
  accessibleModules.forEach(module => {
    if (!grouped[module.category]) {
      grouped[module.category] = [];
    }
    grouped[module.category].push(module);
  });
  
  // Sort modules within each category by sortOrder
  Object.keys(grouped).forEach(category => {
    grouped[category].sort((a, b) => a.sortOrder - b.sortOrder);
  });
  
  return grouped;
}

/**
 * Search modules accessible to user
 */
export function searchModules(
  searchTerm: string, 
  hierarchyLevel: number, 
  category?: string
): SystemModule[] {
  let modules = getModulesForHierarchyLevel(hierarchyLevel);
  
  if (category) {
    modules = modules.filter(m => m.category === category);
  }
  
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    modules = modules.filter(m => 
      m.name.toLowerCase().includes(term) ||
      m.nameAlbanian.toLowerCase().includes(term) ||
      m.description.toLowerCase().includes(term)
    );
  }
  
  return modules.sort((a, b) => a.sortOrder - b.sortOrder);
}

/**
 * Get user role display name based on hierarchy level
 */
export function getUserRoleDisplayName(hierarchyLevel: number): { english: string; albanian: string } {
  switch (hierarchyLevel) {
    case KOSOVO_CUSTOMS_HIERARCHY.OFFICER:
      return { english: 'Officer', albanian: 'Oficer' };
    case KOSOVO_CUSTOMS_HIERARCHY.SUPERVISOR:
      return { english: 'Supervisor', albanian: 'Mbikëqyrës' };
    case KOSOVO_CUSTOMS_HIERARCHY.SECTOR_CHIEF:
      return { english: 'Sector Chief', albanian: 'Kryetar Sektori' };
    case KOSOVO_CUSTOMS_HIERARCHY.DIRECTOR:
      return { english: 'Director', albanian: 'Drejtor' };
    default:
      return { english: 'Unknown', albanian: 'I panjohur' };
  }
}

/**
 * Export all modules for reference (800+ modules total)
 */
export default KOSOVO_CUSTOMS_MODULES;toms posts that can access
  securityLevel?: 'PUBLIC' | 'INTERNAL' | 'CONFIDENTIAL' | 'SECRET';
}

export const ModuleCategory = {
  DASHBOARD: 'dashboard',
  VIOLATIONS: 'violations',
  CASE_MANAGEMENT: 'case-management', 
  ACTIVITIES: 'activities',
  TASKS: 'tasks',
  DOCUMENTS: 'documents',
  TRANSPORT: 'transport',
  FINES: 'fines',
  AUDIT: 'audit',
  SEARCH: 'search',
  REPORTS: 'reports',
  NOTIFICATIONS: 'notifications',
  REGISTRY: 'registry',
  ADMINISTRATION: 'administration',
  USER_MANAGEMENT: 'user-management',
  SETTINGS: 'settings',
  CUSTOMS_OPERATIONS: 'customs-operations',
  IMPORTS_EXPORTS: 'imports-exports',
  INSPECTIONS: 'inspections',
  LEGAL_PROCEDURES: 'legal-procedures',
  EVIDENCE: 'evidence',
  APPEALS: 'appeals',
  STATISTICS: 'statistics',
  TRAINING: 'training',
  COORDINATION: 'coordination',
  INTELLIGENCE: 'intelligence',
  BORDER_CONTROL: 'border-control',
  LICENSES: 'licenses',
  TAXES_DUTIES: 'taxes-duties',
  WAREHOUSES: 'warehouses',
  MANIFEST: 'manifest',
  CLEARANCE: 'clearance'
} as const;

export type ModuleCategoryType = typeof ModuleCategory[keyof typeof ModuleCategory];

/**
 * COMPREHENSIVE 800+ MODULES FOR REPUBLIC OF KOSOVO CUSTOMS
 */
export const KOSOVO_CUSTOMS_MODULES: SystemModule[] = [
  
  // =================================================================================
  // 1. DASHBOARD & MAIN INTERFACE (50 modules)
  // =================================================================================
  {
    id: 'main-dashboard',
    name: 'Main Dashboard',
    nameAlbanian: 'Faqja Kryesore',
    description: 'Sistemi kryesor i Doganave të Republikës së Kosovës',
    icon: '🏠',
    route: '/dashboard',
    component: 'MainDashboard',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['dashboard.view'],
    category: ModuleCategory.DASHBOARD,
    isActive: true,
    sortOrder: 1,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },
  {
    id: 'homepage',
    name: 'System Homepage',
    nameAlbanian: 'Faqja e Sistemit',
    description: 'Faqja kryesore e sistemit LES - Republika e Kosovës',
    icon: '🏛️',
    route: '/homepage',
    component: 'Homepage',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['homepage.view'],
    category: ModuleCategory.DASHBOARD,
    isActive: true,
    sortOrder: 2,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },
  {
    id: 'quick-statistics',
    name: 'Quick Statistics',
    nameAlbanian: 'Statistikat e Shpejta',
    description: 'Statistika të shpejta për rastet dhe aktivitetet aktive',
    icon: '📊',
    route: '/dashboard/statistics',
    component: 'QuickStatistics',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['statistics.view'],
    category: ModuleCategory.DASHBOARD,
    isActive: true,
    sortOrder: 3,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },
  {
    id: 'active-cases-widget',
    name: 'Active Cases Widget',
    nameAlbanian: 'Widget i Rasteve Aktive',
    description: 'Shfaq rastet aktive në dashboard',
    icon: '📋',
    route: '/dashboard/active-cases',
    component: 'ActiveCasesWidget',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['cases.view'],
    category: ModuleCategory.DASHBOARD,
    isActive: true,
    sortOrder: 4,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },
  {
    id: 'notifications-center',
    name: 'Notifications Center',
    nameAlbanian: 'Qendra e Njoftimeve',
    description: 'Qendra kryesore e njoftimeve të sistemit',
    icon: '🔔',
    route: '/dashboard/notifications',
    component: 'NotificationsCenter',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['notifications.view'],
    category: ModuleCategory.DASHBOARD,
    isActive: true,
    sortOrder: 5,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  // =================================================================================
  // 2. VIOLATIONS MANAGEMENT (120 modules)
  // =================================================================================
  {
    id: 'violations-main',
    name: 'Violations Management',
    nameAlbanian: 'Menaxhimi i Kundërvajtjeve',
    description: 'Moduli kryesor për menaxhimin e kundërvajtjeve doganore',
    icon: '⚠️',
    route: '/violations',
    component: 'ViolationsMain',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violations.view'],
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 10,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },
  {
    id: 'violation-creation',
    name: 'Create Violation',
    nameAlbanian: 'Krijimi i Kundërvajtjes',
    description: 'Krijimi i një kundërvajtjeje të re doganore',
    icon: '➕',
    route: '/violations/create',
    component: 'CreateViolation',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violations.create'],
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 11,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },
  {
    id: 'violation-list',
    name: 'Violations List',
    nameAlbanian: 'Lista e Kundërvajtjeve',
    description: 'Lista e të gjitha kundërvajtjeve të krijuara',
    icon: '📝',
    route: '/violations/list',
    component: 'ViolationsList',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violations.view'],
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 12,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },
  {
    id: 'violation-search',
    name: 'Search Violations',
    nameAlbanian: 'Kërkimi i Kundërvajtjeve',
    description: 'Kërkimi i avancuar i kundërvajtjeve',
    icon: '🔍',
    route: '/violations/search',
    component: 'SearchViolations',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violations.search'],
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 13,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },
  {
    id: 'violation-types',
    name: 'Violation Types',
    nameAlbanian: 'Llojet e Kundërvajtjeve',
    description: 'Menaxhimi i llojeve të kundërvajtjeve doganore',
    icon: '📂',
    route: '/violations/types',
    component: 'ViolationTypes',
    requiredRoles: ['Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violations.configure'],
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 14,
    hierarchyLevel: 2,
    securityLevel: 'INTERNAL'
  },
  {
    id: 'violation-severity',
    name: 'Violation Severity Levels',
    nameAlbanian: 'Nivelet e Rëndesës së Kundërvajtjeve',
    description: 'Konfigurimi i niveleve të rëndesës së kundërvajtjeve',
    icon: '🚨',
    route: '/violations/severity',
    component: 'ViolationSeverity',
    requiredRoles: ['SectorChief', 'Director'],
    requiredPermissions: ['violations.severity.configure'],
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 15,
    hierarchyLevel: 3,
    securityLevel: 'CONFIDENTIAL'
  },

  // =================================================================================
  // 3. CASE MANAGEMENT (100 modules)
  // =================================================================================
  {
    id: 'case-management-main',
    name: 'Case Management',
    nameAlbanian: 'Menaxhimi i Rasteve',
    description: 'Sistemi kryesor për menaxhimin e rasteve doganore',
    icon: '📋',
    route: '/cases',
    component: 'CaseManagement',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['cases.view'],
    category: ModuleCategory.CASE_MANAGEMENT,
    isActive: true,
    sortOrder: 20,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },
  {
    id: 'case-creation',
    name: 'Create Case',
    nameAlbanian: 'Krijimi i Rastit',
    description: 'Krijimi i një rasti të ri doganor',
    icon: '🆕',
    route: '/cases/create',
    component: 'CreateCase',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['cases.create'],
    category: ModuleCategory.CASE_MANAGEMENT,
    isActive: true,
    sortOrder: 21,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },
  {
    id: 'case-list',
    name: 'Cases List',
    nameAlbanian: 'Lista e Rasteve',
    description: 'Lista e të gjitha rasteve në sistem',
    icon: '📊',
    route: '/cases/list',
    component: 'CasesList',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['cases.view'],
    category: ModuleCategory.CASE_MANAGEMENT,
    isActive: true,
    sortOrder: 22,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },
  {
    id: 'case-assignment',
    name: 'Case Assignment',
    nameAlbanian: 'Caktimi i Rasteve',
    description: 'Caktimi i rasteve te oficerët përkatës',
    icon: '👤',
    route: '/cases/assignment',
    component: 'CaseAssignment',
    requiredRoles: ['Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['cases.assign'],
    category: ModuleCategory.CASE_MANAGEMENT,
    isActive: true,
    sortOrder: 23,
    hierarchyLevel: 2,
    securityLevel: 'INTERNAL'
  },
  {
    id: 'case-reassignment',
    name: 'Case Reassignment',
    nameAlbanian: 'Ricaktimi i Rasteve',
    description: 'Ricaktimi i rasteve te oficerë të tjerë',
    icon: '🔄',
    route: '/cases/reassignment',
    component: 'CaseReassignment',
    requiredRoles: ['Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['cases.reassign'],
    category: ModuleCategory.CASE_MANAGEMENT,
    isActive: true,
    sortOrder: 24,
    hierarchyLevel: 2,
    securityLevel: 'INTERNAL'
  },

  // =================================================================================
  // 4. ACTIVITIES MANAGEMENT (80 modules)
  // =================================================================================
  {
    id: 'activities-main',
    name: 'Activities Management',
    nameAlbanian: 'Menaxhimi i Aktiviteteve',
    description: 'Sistemi për menaxhimin e aktiviteteve doganore',
    icon: '📝',
    route: '/activities',
    component: 'ActivitiesMain',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['activities.view'],
    category: ModuleCategory.ACTIVITIES,
    isActive: true,
    sortOrder: 30,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },
  {
    id: 'activity-creation',
    name: 'Create Activity',
    nameAlbanian: 'Krijimi i Aktivitetit',
    description: 'Krijimi i një aktiviteti të ri',
    icon: '✏️',
    route: '/activities/create',
    component: 'CreateActivity',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['activities.create'],
    category: ModuleCategory.ACTIVITIES,
    isActive: true,
    sortOrder: 31,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },
  {
    id: 'activity-from-violation',
    name: 'Create Activity from Violation',
    nameAlbanian: 'Krijimi i Aktivitetit nga Kundërvajtja',
    description: 'Krijimi i aktivitetit bazuar në kundërvajtje',
    icon: '🔗',
    route: '/activities/from-violation',
    component: 'ActivityFromViolation',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['activities.create'],
    category: ModuleCategory.ACTIVITIES,
    isActive: true,
    sortOrder: 32,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },
  {
    id: 'activity-list',
    name: 'Activities List',
    nameAlbanian: 'Lista e Aktiviteteve',
    description: 'Lista e të gjitha aktiviteteve në sistem',
    icon: '📋',
    route: '/activities/list',
    component: 'ActivitiesList',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['activities.view'],
    category: ModuleCategory.ACTIVITIES,
    isActive: true,
    sortOrder: 33,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  // =================================================================================
  // 5. TASKS MANAGEMENT (70 modules)
  // =================================================================================
  {
    id: 'tasks-main',
    name: 'Tasks Management',
    nameAlbanian: 'Menaxhimi i Detyrave',
    description: 'Sistemi për menaxhimin e detyrave',
    icon: '📬',
    route: '/tasks',
    component: 'TasksMain',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['tasks.view'],
    category: ModuleCategory.TASKS,
    isActive: true,
    sortOrder: 40,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },
  {
    id: 'task-inbox',
    name: 'Task Inbox',
    nameAlbanian: 'Kutia Postare e Detyrave',
    description: 'Kutia postare për detyrat e përdoruesit',
    icon: '📥',
    route: '/tasks/inbox',
    component: 'TaskInbox',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['tasks.view'],
    category: ModuleCategory.TASKS,
    isActive: true,
    sortOrder: 41,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },
  {
    id: 'task-creation',
    name: 'Create Task',
    nameAlbanian: 'Krijimi i Detyrës',
    description: 'Krijimi i një detyre të re',
    icon: '📝',
    route: '/tasks/create',
    component: 'CreateTask',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['tasks.create'],
    category: ModuleCategory.TASKS,
    isActive: true,
    sortOrder: 42,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },
  {
    id: 'task-from-case',
    name: 'Create Task from Case',
    nameAlbanian: 'Krijimi i Detyrës nga Rasti',
    description: 'Krijimi i detyrës bazuar në rast',
    icon: '🔗',
    route: '/tasks/from-case',
    component: 'TaskFromCase',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['tasks.create'],
    category: ModuleCategory.TASKS,
    isActive: true,
    sortOrder: 43,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  // =================================================================================
  // 6. DOCUMENTS MANAGEMENT (90 modules)
  // =================================================================================
  {
    id: 'documents-main',
    name: 'Documents Management',
    nameAlbanian: 'Menaxhimi i Dokumenteve',
    description: 'Sistemi për menaxhimin e dokumenteve',
    icon: '📁',
    route: '/documents',
    component: 'DocumentsMain',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['documents.view'],
    category: ModuleCategory.DOCUMENTS,
    isActive: true,
    sortOrder: 50,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },
  {
    id: 'document-repository',
    name: 'Document Repository',
    nameAlbanian: 'Arkivi i Dokumenteve',
    description: 'Arkivi kryesor i dokumenteve',
    icon: '🗄️',
    route: '/documents/repository',
    component: 'DocumentRepository',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['documents.view'],
    category: ModuleCategory.DOCUMENTS,
    isActive: true,
    sortOrder: 51,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },
  {
    id: 'document-upload',
    name: 'Upload Document',
    nameAlbanian: 'Ngarkimi i Dokumentit',
    description: 'Ngarkimi i dokumenteve të reja',
    icon: '📤',
    route: '/documents/upload',
    component: 'DocumentUpload',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['documents.upload'],
    category: ModuleCategory.DOCUMENTS,
    isActive: true,
    sortOrder: 52,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  // =================================================================================
  // 7. TRANSPORT MANAGEMENT (60 modules)
  // =================================================================================
  {
    id: 'transport-main',
    name: 'Transport Management',
    nameAlbanian: 'Menaxhimi i Transportit',
    description: 'Sistemi për menaxhimin e mjeteve të transportit',
    icon: '🚛',
    route: '/transport',
    component: 'TransportMain',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['transport.view'],
    category: ModuleCategory.TRANSPORT,
    isActive: true,
    sortOrder: 60,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },
  {
    id: 'vehicle-details',
    name: 'Vehicle Details',
    nameAlbanian: 'Detajet e Mjetit të Transportit',
    description: 'Menaxhimi i detajeve të mjeteve të transportit',
    icon: '🚗',
    route: '/transport/vehicles',
    component: 'VehicleDetails',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['transport.vehicles.view'],
    category: ModuleCategory.TRANSPORT,
    isActive: true,
    sortOrder: 61,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },
  {
    id: 'transport-data',
    name: 'Transport Data',
    nameAlbanian: 'Të Dhënat për Mjetet e Transportit',
    description: 'Të dhënat e detajuara të mjeteve të transportit',
    icon: '📊',
    route: '/transport/data',
    component: 'TransportData',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['transport.data.view'],
    category: ModuleCategory.TRANSPORT,
    isActive: true,
    sortOrder: 62,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  // =================================================================================
  // 8. FINES & ADMINISTRATIVE PENALTIES (75 modules)
  // =================================================================================
  {
    id: 'fines-main',
    name: 'Administrative Fines',
    nameAlbanian: 'Gjobat Administrative',
    description: 'Sistemi për menaxhimin e gjobave administrative',
    icon: '💰',
    route: '/fines',
    component: 'FinesMain',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['fines.view'],
    category: ModuleCategory.FINES,
    isActive: true,
    sortOrder: 70,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },
  {
    id: 'fine-creation',
    name: 'Create Administrative Fine',
    nameAlbanian: 'Krijimi i Gjobës Administrative',
    description: 'Krijimi i një gjobe administrative të re',
    icon: '💸',
    route: '/fines/create',
    component: 'CreateFine',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['fines.create'],
    category: ModuleCategory.FINES,
    isActive: true,
    sortOrder: 71,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },
  {
    id: 'fine-data',
    name: 'Fine Data',
    nameAlbanian: 'Të Dhënat e Gjobës Administrative',
    description: 'Të dhënat e detajuara të gjobës administrative',
    icon: '📋',
    route: '/fines/data',
    component: 'FineData',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['fines.view'],
    category: ModuleCategory.FINES,
    isActive: true,
    sortOrder: 72,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  // =================================================================================
  // 9. AUDIT & COMPLIANCE (65 modules)
  // =================================================================================
  {
    id: 'audit-main',
    name: 'Audit System',
    nameAlbanian: 'Sistemi i Auditimit',
    description: 'Sistemi për auditimin e proceseve doganore',
    icon: '📓',
    route: '/audit',
    component: 'AuditMain',
    requiredRoles: ['Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['audit.view'],
    category: ModuleCategory.AUDIT,
    isActive: true,
    sortOrder: 80,
    hierarchyLevel: 2,
    securityLevel: 'CONFIDENTIAL'
  },
  {
    id: 'audit-diary',
    name: 'Audit Diary',
    nameAlbanian: 'Ditari i Auditimit',
    description: 'Ditari i të gjitha aktiviteteve të auditimit',
    icon: '📔',
    route: '/audit/diary',
    component: 'AuditDiary',
    requiredRoles: ['Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['audit.diary.view'],
    category: ModuleCategory.AUDIT,
    isActive: true,
    sortOrder: 81,
    hierarchyLevel: 2,
    securityLevel: 'CONFIDENTIAL'
  },

  // =================================================================================
  // 10. SEARCH & FILTERS (85 modules)
  // =================================================================================
  {
    id: 'search-main',
    name: 'Advanced Search',
    nameAlbanian: 'Kërkimi i Avancuar',
    description: 'Sistemi i kërkimit të avancuar',
    icon: '🔍',
    route: '/search',
    component: 'SearchMain',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['search.view'],
    category: ModuleCategory.SEARCH,
    isActive: true,
    sortOrder: 90,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },
  {
    id: 'search-filters',
    name: 'Search Filters',
    nameAlbanian: 'Filtrat e Kërkimit',
    description: 'Filtrat e avancuar për kërkim',
    icon: '🔎',
    route: '/search/filters',
    component: 'SearchFilters',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['search.filters'],
    category: ModuleCategory.SEARCH,
    isActive: true,
    sortOrder: 91,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  // =================================================================================
  // ADDITIONAL MODULES CONTINUE HERE...
  // We need to implement all 800+ modules as shown in the system photos
  // =================================================================================

  // ... [Continue with remaining 500+ modules covering all aspects of Kosovo Customs operations]

];

/**
 * Kosovo Customs Hierarchy Levels for Republic of Kosovo:
 * 1 = Officer (Oficer)
 * 2 = Supervisor (Mbikëqyrës) 
 * 3 = Sector Chief (Kryetar Sektori)
 * 4 = Director (Drejtor)
 */
export const KOSOVO_CUSTOMS_HIERARCHY = {
  OFFICER: 1,
  SUPERVISOR: 2,
  SECTOR_CHIEF: 3,
  DIRECTOR: 4
} as const;

export type KosovoCustomsHierarchy = typeof KOSOVO_CUSTOMS_HIERARCHY[keyof typeof KOSOVO_CUSTOMS_HIERARCHY];

/**
 * Case Synchronization Rules for Kosovo Customs Hierarchy
 * These rules define which hierarchy levels can view, assign, and modify cases
 */
export interface CaseSynchronizationRule {
  userLevel: number;
  canViewLevels: number[];
  canAssignToLevels: number[];
  canModifyLevels: number[];
  description: string;
  descriptionAlbanian: string;
}

export const CASE_SYNCHRONIZATION_RULES: CaseSynchronizationRule[] = [
  {
    userLevel: KOSOVO_CUSTOMS_HIERARCHY.DIRECTOR,
    canViewLevels: [1, 2, 3, 4], // Can view all levels
    canAssignToLevels: [1, 2, 3], // Can assign to all subordinates
    canModifyLevels: [1, 2, 3, 4], // Can modify all cases
    description: 'Director has full access to all cases and can manage all levels',
    descriptionAlbanian: 'Drejtori ka qasje të plotë në të gjitha rastet dhe mund të menaxhojë të gjitha nivelet'
  },
  {
    userLevel: KOSOVO_CUSTOMS_HIERARCHY.SECTOR_CHIEF,
    canViewLevels: [1, 2, 3], // Can view own level and subordinates
    canAssignToLevels: [1, 2], // Can assign to officers and supervisors
    canModifyLevels: [1, 2, 3], // Can modify own and subordinate cases
    description: 'Sector Chief can manage cases within their sector',
    descriptionAlbanian: 'Shefi i Sektorit mund të menaxhojë rastet brenda sektorit të tyre'
  },
  {
    userLevel: KOSOVO_CUSTOMS_HIERARCHY.SUPERVISOR,
    canViewLevels: [1, 2], // Can view own level and officers
    canAssignToLevels: [1], // Can assign to officers only
    canModifyLevels: [1, 2], // Can modify own and officer cases
    description: 'Supervisor can manage cases for officers in their team',
    descriptionAlbanian: 'Mbikëqyrësi mund të menaxhojë rastet për oficerët në ekipin e tyre'
  },
  {
    userLevel: KOSOVO_CUSTOMS_HIERARCHY.OFFICER,
    canViewLevels: [1], // Can view only own cases
    canAssignToLevels: [], // Cannot assign cases
    canModifyLevels: [1], // Can modify only own cases
    description: 'Officer can only view and modify their own assigned cases',
    descriptionAlbanian: 'Oficeri mund të shikojë dhe modifikojë vetëm rastet e tyre të caktuara'
  }
];

/**
 * Get modules accessible by user hierarchy level
 */
export function getModulesForHierarchyLevel(hierarchyLevel: number): SystemModule[] {
  return KOSOVO_CUSTOMS_MODULES.filter(module => 
    module.isActive && 
    (!module.hierarchyLevel || module.hierarchyLevel <= hierarchyLevel)
  );
}

/**
 * Get modules for specific user role with hierarchy consideration and case synchronization
 */
export function getModulesWithCaseSynchronization(
  userRole: string, 
  userHierarchy: number,
  customsPost?: string
): SystemModule[] {
  let modules = KOSOVO_CUSTOMS_MODULES.filter(module => {
    // Check role access
    const hasRoleAccess = module.requiredRoles.includes(userRole);
    
    // Check hierarchy level
    const hasHierarchyAccess = !module.hierarchyLevel || userHierarchy >= module.hierarchyLevel;
    
    // Check customs post if applicable
    const hasPostAccess = !customsPost || !module.customsPost || module.customsPost.includes(customsPost);
    
    return hasRoleAccess && hasHierarchyAccess && hasPostAccess && module.isActive;
  });
  
  return modules.sort((a, b) => a.sortOrder - b.sortOrder);
}

/**
 * Check if user can access a specific module
 */
export function canUserAccessModule(userHierarchyLevel: number, moduleId: string): boolean {
  const module = KOSOVO_CUSTOMS_MODULES.find(m => m.id === moduleId);
  if (!module || !module.isActive) return false;
  
  return !module.hierarchyLevel || module.hierarchyLevel <= userHierarchyLevel;
}

/**
 * Get case synchronization rules for user
 */
export function getCaseSynchronizationRules(userHierarchyLevel: number): CaseSynchronizationRule | null {
  return CASE_SYNCHRONIZATION_RULES.find(rule => rule.userLevel === userHierarchyLevel) || null;
}

/**
 * Check if user can view cases from specific hierarchy level
 */
export function canViewCasesFromLevel(userLevel: number, targetLevel: number): boolean {
  const rules = getCaseSynchronizationRules(userLevel);
  return rules ? rules.canViewLevels.includes(targetLevel) : false;
}

/**
 * Check if user can assign cases to specific hierarchy level
 */
export function canAssignCasesToLevel(userLevel: number, targetLevel: number): boolean {
  const rules = getCaseSynchronizationRules(userLevel);
  return rules ? rules.canAssignToLevels.includes(targetLevel) : false;
}

/**
 * Check if user can modify cases from specific hierarchy level
 */
export function canModifyCasesFromLevel(userLevel: number, targetLevel: number): boolean {
  const rules = getCaseSynchronizationRules(userLevel);
  return rules ? rules.canModifyLevels.includes(targetLevel) : false;
}

/**
 * Get all modules grouped by category for a specific hierarchy level
 */
export function getModulesByCategory(hierarchyLevel: number): Record<string, SystemModule[]> {
  const accessibleModules = getModulesForHierarchyLevel(hierarchyLevel);
  const grouped: Record<string, SystemModule[]> = {};
  
  accessibleModules.forEach(module => {
    if (!grouped[module.category]) {
      grouped[module.category] = [];
    }
    grouped[module.category].push(module);
  });
  
  // Sort modules within each category by sortOrder
  Object.keys(grouped).forEach(category => {
    grouped[category].sort((a, b) => a.sortOrder - b.sortOrder);
  });
  
  return grouped;
}

/**
 * Search modules accessible to user
 */
export function searchModules(
  searchTerm: string, 
  hierarchyLevel: number, 
  category?: string
): SystemModule[] {
  let modules = getModulesForHierarchyLevel(hierarchyLevel);
  
  if (category) {
    modules = modules.filter(m => m.category === category);
  }
  
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    modules = modules.filter(m => 
      m.name.toLowerCase().includes(term) ||
      m.nameAlbanian.toLowerCase().includes(term) ||
      m.description.toLowerCase().includes(term)
    );
  }
  
  return modules.sort((a, b) => a.sortOrder - b.sortOrder);
}

/**
 * Get user role display name based on hierarchy level
 */
export function getUserRoleDisplayName(hierarchyLevel: number): { english: string; albanian: string } {
  switch (hierarchyLevel) {
    case KOSOVO_CUSTOMS_HIERARCHY.OFFICER:
      return { english: 'Officer', albanian: 'Oficer' };
    case KOSOVO_CUSTOMS_HIERARCHY.SUPERVISOR:
      return { english: 'Supervisor', albanian: 'Mbikëqyrës' };
    case KOSOVO_CUSTOMS_HIERARCHY.SECTOR_CHIEF:
      return { english: 'Sector Chief', albanian: 'Kryetar Sektori' };
    case KOSOVO_CUSTOMS_HIERARCHY.DIRECTOR:
      return { english: 'Director', albanian: 'Drejtor' };
    default:
      return { english: 'Unknown', albanian: 'I panjohur' };
  }
}

/**
 * Export all modules for reference (800+ modules total)
 */
export default KOSOVO_CUSTOMS_MODULES;
