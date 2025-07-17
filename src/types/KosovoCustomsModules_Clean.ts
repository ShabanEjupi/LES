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
  customsPost?: string[]; // Specific customs posts that can access
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

  // =================================================================================
  // 2. CASE MANAGEMENT SYSTEM (100+ modules)
  // =================================================================================
  {
    id: 'case-create',
    name: 'Create Case',
    nameAlbanian: 'Krijimi i Rastit',
    description: 'Krijimi i një rasti të ri të kundërvajtjes doganore',
    icon: '📋',
    route: '/cases/create',
    component: 'CaseCreate',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['case.create'],
    category: ModuleCategory.CASE_MANAGEMENT,
    isActive: true,
    sortOrder: 10,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },
  {
    id: 'case-list',
    name: 'Case List',
    nameAlbanian: 'Lista e Rasteve',
    description: 'Lista e të gjitha rasteve të kundërvajtjeve doganore',
    icon: '📑',
    route: '/cases',
    component: 'CaseList',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['case.view'],
    category: ModuleCategory.CASE_MANAGEMENT,
    isActive: true,
    sortOrder: 11,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },
  {
    id: 'case-assignment',
    name: 'Case Assignment',
    nameAlbanian: 'Caktimi i Rastit',
    description: 'Caktimi i rasteve tek oficerët përgjegjës',
    icon: '👤',
    route: '/cases/assign',
    component: 'CaseAssignment',
    requiredRoles: ['Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['case.assign'],
    category: ModuleCategory.CASE_MANAGEMENT,
    isActive: true,
    sortOrder: 12,
    hierarchyLevel: 2,
    securityLevel: 'INTERNAL'
  },

  // =================================================================================
  // 3. VIOLATION MANAGEMENT (80+ modules)
  // =================================================================================
  {
    id: 'violation-register',
    name: 'Register Violation',
    nameAlbanian: 'Regjistrimi i Kundërvajtjes',
    description: 'Regjistrimi i kundërvajtjeve doganore',
    icon: '⚠️',
    route: '/violations/register',
    component: 'ViolationRegister',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violation.create'],
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 20,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },
  {
    id: 'violation-types',
    name: 'Violation Types',
    nameAlbanian: 'Llojet e Kundërvajtjeve',
    description: 'Menaxhimi i llojeve të kundërvajtjeve doganore',
    icon: '📊',
    route: '/violations/types',
    component: 'ViolationTypes',
    requiredRoles: ['SectorChief', 'Director'],
    requiredPermissions: ['violation.manage_types'],
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 21,
    hierarchyLevel: 3,
    securityLevel: 'INTERNAL'
  },

  // =================================================================================
  // 4. TASK MANAGEMENT (50+ modules)
  // =================================================================================
  {
    id: 'task-create',
    name: 'Create Task',
    nameAlbanian: 'Krijimi i Detyres',
    description: 'Krijimi i detyrave për oficerët',
    icon: '✅',
    route: '/tasks/create',
    component: 'TaskCreate',
    requiredRoles: ['Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['task.create'],
    category: ModuleCategory.TASKS,
    isActive: true,
    sortOrder: 30,
    hierarchyLevel: 2,
    securityLevel: 'INTERNAL'
  },
  {
    id: 'task-inbox',
    name: 'Task Inbox',
    nameAlbanian: 'Kutia Postare e Detyrave',
    description: 'Kutia postare për detyrat e caktuara',
    icon: '📥',
    route: '/tasks/inbox',
    component: 'TaskInbox',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['task.view'],
    category: ModuleCategory.TASKS,
    isActive: true,
    sortOrder: 31,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  // =================================================================================
  // 5. ACTIVITIES MANAGEMENT (60+ modules)
  // =================================================================================
  {
    id: 'activity-create',
    name: 'Create Activity',
    nameAlbanian: 'Krijimi i Aktivitetit',
    description: 'Krijimi i aktiviteteve në rast',
    icon: '🔄',
    route: '/activities/create',
    component: 'ActivityCreate',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['activity.create'],
    category: ModuleCategory.ACTIVITIES,
    isActive: true,
    sortOrder: 40,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  // =================================================================================
  // 6. TRANSPORT & VEHICLE MANAGEMENT (70+ modules)
  // =================================================================================
  {
    id: 'vehicle-register',
    name: 'Vehicle Registration',
    nameAlbanian: 'Regjistrimi i Mjeteve',
    description: 'Regjistrimi i mjeteve të transportit',
    icon: '🚛',
    route: '/transport/vehicles/register',
    component: 'VehicleRegister',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['vehicle.register'],
    category: ModuleCategory.TRANSPORT,
    isActive: true,
    sortOrder: 50,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },
  {
    id: 'transport-data',
    name: 'Transport Data',
    nameAlbanian: 'Të Dhënat e Transportit',
    description: 'Të dhënat e detajuara të mjeteve të transportit',
    icon: '📊',
    route: '/transport/data',
    component: 'TransportData',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['transport.data.view'],
    category: ModuleCategory.TRANSPORT,
    isActive: true,
    sortOrder: 51,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  // =================================================================================
  // 7. FINES & ADMINISTRATIVE PENALTIES (75+ modules)
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
    sortOrder: 60,
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
    sortOrder: 61,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  // =================================================================================
  // 8. AUDIT MANAGEMENT (40+ modules)
  // =================================================================================
  {
    id: 'audit-diary',
    name: 'Audit Diary',
    nameAlbanian: 'Ditari i Auditimit',
    description: 'Ditari për ndjekjen e aktiviteteve të auditimit',
    icon: '📖',
    route: '/audit/diary',
    component: 'AuditDiary',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['audit.diary'],
    category: ModuleCategory.AUDIT,
    isActive: true,
    sortOrder: 70,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  // =================================================================================
  // 9. DOCUMENT MANAGEMENT (90+ modules)
  // =================================================================================
  {
    id: 'document-upload',
    name: 'Document Upload',
    nameAlbanian: 'Ngarkimi i Dokumenteve',
    description: 'Ngarkimi i dokumenteve në sistem',
    icon: '📤',
    route: '/documents/upload',
    component: 'DocumentUpload',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['document.upload'],
    category: ModuleCategory.DOCUMENTS,
    isActive: true,
    sortOrder: 80,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  // =================================================================================
  // 10. SEARCH & FILTERS (30+ modules)
  // =================================================================================
  {
    id: 'search-filters',
    name: 'Search Filters',
    nameAlbanian: 'Filtrat e Kërkimit',
    description: 'Sistemi i filtrimit dhe kërkimit',
    icon: '🔍',
    route: '/search/filters',
    component: 'SearchFilters',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['search.use'],
    category: ModuleCategory.SEARCH,
    isActive: true,
    sortOrder: 90,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  // =================================================================================
  // 11. REPORTS & ANALYTICS (60+ modules)
  // =================================================================================
  {
    id: 'reports-main',
    name: 'Reports Dashboard',
    nameAlbanian: 'Paneli i Raporteve',
    description: 'Paneli kryesor për raporte dhe statistika',
    icon: '📈',
    route: '/reports',
    component: 'ReportsMain',
    requiredRoles: ['Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['reports.view'],
    category: ModuleCategory.REPORTS,
    isActive: true,
    sortOrder: 100,
    hierarchyLevel: 2,
    securityLevel: 'INTERNAL'
  },

  // =================================================================================
  // 12. NOTIFICATIONS & COMMUNICATION (25+ modules)
  // =================================================================================
  {
    id: 'notifications-main',
    name: 'Notification System',
    nameAlbanian: 'Sistemi i Njoftimeve',
    description: 'Sistemi për menaxhimin e njoftimeve',
    icon: '🔔',
    route: '/notifications',
    component: 'NotificationsMain',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['notifications.view'],
    category: ModuleCategory.NOTIFICATIONS,
    isActive: true,
    sortOrder: 110,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  // =================================================================================
  // 13. REGISTRY & PROTOCOL (45+ modules)
  // =================================================================================
  {
    id: 'protocol-register',
    name: 'Protocol Registry',
    nameAlbanian: 'Regjistri i Protokollit',
    description: 'Regjistri zyrtar i protokollit të zyres administrative',
    icon: '📚',
    route: '/registry/protocol',
    component: 'ProtocolRegistry',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['protocol.register'],
    category: ModuleCategory.REGISTRY,
    isActive: true,
    sortOrder: 120,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  // =================================================================================
  // 14. USER MANAGEMENT (35+ modules)
  // =================================================================================
  {
    id: 'user-admin',
    name: 'User Administration',
    nameAlbanian: 'Administrimi i Përdoruesve',
    description: 'Menaxhimi i përdoruesve të sistemit',
    icon: '👥',
    route: '/users/admin',
    component: 'UserAdmin',
    requiredRoles: ['Director'],
    requiredPermissions: ['user.admin'],
    category: ModuleCategory.USER_MANAGEMENT,
    isActive: true,
    sortOrder: 130,
    hierarchyLevel: 4,
    securityLevel: 'CONFIDENTIAL'
  },

  // =================================================================================
  // 15. ADMINISTRATION & SETTINGS (50+ modules)
  // =================================================================================
  {
    id: 'system-settings',
    name: 'System Settings',
    nameAlbanian: 'Cilësimet e Sistemit',
    description: 'Cilësimet e përgjithshme të sistemit',
    icon: '⚙️',
    route: '/admin/settings',
    component: 'SystemSettings',
    requiredRoles: ['Director'],
    requiredPermissions: ['system.admin'],
    category: ModuleCategory.ADMINISTRATION,
    isActive: true,
    sortOrder: 140,
    hierarchyLevel: 4,
    securityLevel: 'CONFIDENTIAL'
  }

  // Note: This represents a sample of the 800+ modules. 
  // The full implementation would include all modules shown in the system photos
  // covering all aspects of Kosovo Customs operations.
];

/**
 * Case Synchronization Functions
 */

/**
 * Get modules accessible by user hierarchy level with case synchronization
 */
export function getModulesWithCaseSynchronization(
  userRole: string, 
  userHierarchy: number,
  customsPost?: string
): SystemModule[] {
  const modules = KOSOVO_CUSTOMS_MODULES.filter(module => {
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

export default KOSOVO_CUSTOMS_MODULES;
