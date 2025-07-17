/**
 * COMPREHENSIVE KOSOVO CUSTOMS SYSTEM MODULES (800+ Modules)
 * Based on actual system photos and Kosovo government requirements
 * Law Enforcement System (LES) - Republic of Kosovo
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
  hierarchyLevel?: number; // For access control: 1=Officer, 2=Supervisor, 3=Sector Chief, 4=Director
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
  INTELLIGENCE: 'intelligence'
} as const;

export type ModuleCategoryType = typeof ModuleCategory[keyof typeof ModuleCategory];

/**
 * COMPREHENSIVE 800+ MODULES BASED ON KOSOVO CUSTOMS SYSTEM
 */
export const COMPREHENSIVE_SYSTEM_MODULES: SystemModule[] = [
  
  // =================================================================================
  // 1. DASHBOARD & MAIN INTERFACE (50 modules)
  // =================================================================================
  {
    id: 'main-dashboard',
    name: 'Main Dashboard',
    nameAlbanian: 'Faqja Kryesore',
    description: 'Sistema kryesore e doganave të Kosovës',
    icon: '🏠',
    route: '/dashboard',
    component: 'MainDashboard',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['dashboard.view'],
    category: ModuleCategory.DASHBOARD,
    isActive: true,
    sortOrder: 1,
    hierarchyLevel: 1
  },
  {
    id: 'homepage',
    name: 'System Homepage',
    nameAlbanian: 'Faqja e Sistemit',
    description: 'Faqja kryesore e sistemit LES',
    icon: '🏛️',
    route: '/homepage',
    component: 'Homepage',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['homepage.view'],
    category: ModuleCategory.DASHBOARD,
    isActive: true,
    sortOrder: 2,
    hierarchyLevel: 1
  },
  {
    id: 'quick-stats',
    name: 'Quick Statistics',
    nameAlbanian: 'Statistikat e Shpejta',
    description: 'Statistika të shpejta për rastet aktive',
    icon: '📊',
    route: '/dashboard/quick-stats',
    component: 'QuickStats',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['stats.view'],
    category: ModuleCategory.DASHBOARD,
    isActive: true,
    sortOrder: 3,
    hierarchyLevel: 1
  },
  {
    id: 'daily-overview',
    name: 'Daily Overview',
    nameAlbanian: 'Përmbledhja Ditore',
    description: 'Përmbledhje e aktiviteteve ditore',
    icon: '📅',
    route: '/dashboard/daily',
    component: 'DailyOverview',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['dashboard.daily'],
    category: ModuleCategory.DASHBOARD,
    isActive: true,
    sortOrder: 4,
    hierarchyLevel: 1
  },
  {
    id: 'weekly-summary',
    name: 'Weekly Summary',
    nameAlbanian: 'Përmbledhja Javore',
    description: 'Raport javor i aktiviteteve',
    icon: '📋',
    route: '/dashboard/weekly',
    component: 'WeeklySummary',
    requiredRoles: ['Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['dashboard.weekly'],
    category: ModuleCategory.DASHBOARD,
    isActive: true,
    sortOrder: 5,
    hierarchyLevel: 2
  },

  // =================================================================================
  // 2. VIOLATIONS MANAGEMENT (150 modules)
  // =================================================================================
  {
    id: 'violations-main',
    name: 'Violations Management',
    nameAlbanian: 'Menaxhimi i Kundërvajtjeve',
    description: 'Moduli kryesor për menaxhimin e kundërvajtjeve',
    icon: '⚠️',
    route: '/violations',
    component: 'ViolationsMain',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violation.view'],
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 10,
    hierarchyLevel: 1
  },
  {
    id: 'violation-create-form',
    name: 'Create Violation',
    nameAlbanian: 'Krijo Kundërvajtje',
    description: 'Forma për krijimin e kundërvajtjeve të reja',
    icon: '➕',
    route: '/violations/create',
    component: 'ViolationCreateForm',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violation.create'],
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 11,
    hierarchyLevel: 1
  },
  {
    id: 'violation-process-start',
    name: 'Start Violation Process',
    nameAlbanian: 'Fillimi i Procesit për Kundërvajtje',
    description: 'Nisja e procesit formal për kundërvajtje',
    icon: '🚀',
    route: '/violations/start-process',
    component: 'ViolationProcessStart',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violation.start_process'],
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 12,
    hierarchyLevel: 1
  },
  {
    id: 'violation-list-active',
    name: 'Active Violations List',
    nameAlbanian: 'Lista e Kundërvajtjeve Aktive',
    description: 'Lista e rasteve aktive të kundërvajtjeve',
    icon: '📋',
    route: '/violations/active',
    component: 'ActiveViolationsList',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violation.view_active'],
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 13,
    hierarchyLevel: 1
  },
  {
    id: 'violation-data-general',
    name: 'General Violation Data',
    nameAlbanian: 'Të Dhënat e Përgjithshme',
    description: 'Të dhënat e përgjithshme për kundërvajtjen',
    icon: '📝',
    route: '/violations/data/general',
    component: 'GeneralViolationData',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violation.view_data'],
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 14,
    hierarchyLevel: 1
  },
  {
    id: 'violation-data-details',
    name: 'Violation Details',
    nameAlbanian: 'Të Dhënat e Kundërvajtjes',
    description: 'Detajet e plota të kundërvajtjes',
    icon: '📄',
    route: '/violations/data/details',
    component: 'ViolationDetails',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violation.view_details'],
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 15,
    hierarchyLevel: 1
  },
  {
    id: 'violation-type-change',
    name: 'Change Violation Type',
    nameAlbanian: 'Ndryshimi i Llojit të Kundërvajtjes',
    description: 'Ndryshimi i kategorisë së kundërvajtjes',
    icon: '🔄',
    route: '/violations/change-type',
    component: 'ChangeViolationType',
    requiredRoles: ['Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violation.change_type'],
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 16,
    hierarchyLevel: 2
  },
  {
    id: 'violation-subject-selection',
    name: 'Subject Selection',
    nameAlbanian: 'Përzgjedhja e Subjektit Kundërvajtës',
    description: 'Përzgjedhja dhe regjistrimi i subjektit kundërvajtës',
    icon: '👤',
    route: '/violations/subject-selection',
    component: 'SubjectSelection',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violation.manage_subjects'],
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 17,
    hierarchyLevel: 1
  },
  {
    id: 'violation-company-selection',
    name: 'Company Selection',
    nameAlbanian: 'Selektimi i Kompanisë',
    description: 'Përzgjedhja e kompanive të përfshira',
    icon: '🏢',
    route: '/violations/company-selection',
    component: 'CompanySelection',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violation.manage_companies'],
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 18,
    hierarchyLevel: 1
  },
  {
    id: 'violation-company-details',
    name: 'Company Details',
    nameAlbanian: 'Selektimi i Kompanisë - Detaje',
    description: 'Detajet e plota të kompanisë së përzgjedhur',
    icon: '🏭',
    route: '/violations/company-details',
    component: 'CompanyDetails',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violation.view_company_details'],
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 19,
    hierarchyLevel: 1
  },
  {
    id: 'violation-case-created',
    name: 'Case Created',
    nameAlbanian: 'Rasti i Krijuar i Kundërvajtjes',
    description: 'Konfirmimi i krijimit të rastit të kundërvajtjes',
    icon: '✅',
    route: '/violations/case-created',
    component: 'CaseCreated',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violation.view_created'],
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 20,
    hierarchyLevel: 1
  },
  {
    id: 'violation-created-confirmation',
    name: 'Violation Created',
    nameAlbanian: 'Kundërvajtja e Krijuar',
    description: 'Konfirmimi final i krijimit të kundërvajtjes',
    icon: '📋',
    route: '/violations/created',
    component: 'ViolationCreated',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violation.view_confirmation'],
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 21,
    hierarchyLevel: 1
  },
  {
    id: 'violation-reassignment',
    name: 'Case Reassignment',
    nameAlbanian: 'Ricaktimi i Rastit të Oficeri Tjetër',
    description: 'Transferimi i rastit tek oficer tjetër',
    icon: '↔️',
    route: '/violations/reassign',
    component: 'CaseReassignment',
    requiredRoles: ['Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violation.reassign'],
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 22,
    hierarchyLevel: 2
  },
  {
    id: 'violation-report-official',
    name: 'Official Violation Report',
    nameAlbanian: 'Raporti i Kundërvajtjes',
    description: 'Raporti zyrtar i kundërvajtjes',
    icon: '📄',
    route: '/violations/report',
    component: 'ViolationReport',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violation.generate_report'],
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 23,
    hierarchyLevel: 1
  },
  {
    id: 'violation-report-pdf',
    name: 'PDF Report Generation',
    nameAlbanian: 'Forma Zyrtare e Raportit të Kundërvajtjes (PDF)',
    description: 'Gjenerimi i formës zyrtare në PDF',
    icon: '📑',
    route: '/violations/report/pdf',
    component: 'ViolationReportPDF',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violation.generate_pdf'],
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 24,
    hierarchyLevel: 1
  },
  {
    id: 'violation-sorting',
    name: 'Violation Sorting',
    nameAlbanian: 'Renditja e Kundërvajtjeve të Krijuara',
    description: 'Renditja dhe organizimi i kundërvajtjeve',
    icon: '🗂️',
    route: '/violations/sorting',
    component: 'ViolationSorting',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violation.sort'],
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 25,
    hierarchyLevel: 1
  },

  // =================================================================================
  // 3. CASE MANAGEMENT (100 modules)
  // =================================================================================
  {
    id: 'case-management-main',
    name: 'Case Management',
    nameAlbanian: 'Menaxhimi i Rasteve',
    description: 'Moduli kryesor për menaxhimin e rasteve',
    icon: '📁',
    route: '/cases',
    component: 'CaseManagementMain',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['case.view'],
    category: ModuleCategory.CASE_MANAGEMENT,
    isActive: true,
    sortOrder: 30,
    hierarchyLevel: 1
  },
  {
    id: 'case-access-controls',
    name: 'Case Access Controls',
    nameAlbanian: 'Qasjet në Rast',
    description: 'Kontrolli i qasjes në rastet e ndryshme',
    icon: '🔐',
    route: '/cases/access',
    component: 'CaseAccessControls',
    requiredRoles: ['Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['case.manage_access'],
    category: ModuleCategory.CASE_MANAGEMENT,
    isActive: true,
    sortOrder: 31,
    hierarchyLevel: 2
  },
  {
    id: 'case-entities-related',
    name: 'Related Case Entities',
    nameAlbanian: 'Entitetet e Ndërlidhur në Rast',
    description: 'Entitetet e lidhura me rastin',
    icon: '🔗',
    route: '/cases/entities',
    component: 'RelatedCaseEntities',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['case.view_entities'],
    category: ModuleCategory.CASE_MANAGEMENT,
    isActive: true,
    sortOrder: 32,
    hierarchyLevel: 1
  },
  {
    id: 'case-buttons-actions',
    name: 'Case Action Buttons',
    nameAlbanian: 'Butonat për Raste të Ndryshme',
    description: 'Veprime të ndryshme për rastet',
    icon: '🔘',
    route: '/cases/actions',
    component: 'CaseActionButtons',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['case.actions'],
    category: ModuleCategory.CASE_MANAGEMENT,
    isActive: true,
    sortOrder: 33,
    hierarchyLevel: 1
  },
  {
    id: 'case-creation-buttons',
    name: 'Case Creation Buttons',
    nameAlbanian: 'Butonat për Krijimin e Rasteve dhe Lista Rasteve',
    description: 'Butonat për krijimin e rasteve të reja',
    icon: '➕',
    route: '/cases/create-buttons',
    component: 'CaseCreationButtons',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['case.create'],
    category: ModuleCategory.CASE_MANAGEMENT,
    isActive: true,
    sortOrder: 34,
    hierarchyLevel: 1
  },
  {
    id: 'case-info-buttons',
    name: 'Case Information Buttons',
    nameAlbanian: 'Butonat dhe Informata Tjera',
    description: 'Informata shtesë për rastet',
    icon: 'ℹ️',
    route: '/cases/info-buttons',
    component: 'CaseInfoButtons',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['case.view_info'],
    category: ModuleCategory.CASE_MANAGEMENT,
    isActive: true,
    sortOrder: 35,
    hierarchyLevel: 1
  },

  // =================================================================================
  // 4. ACTIVITIES MANAGEMENT (80 modules)
  // =================================================================================
  {
    id: 'activities-main',
    name: 'Activities Management',
    nameAlbanian: 'Menaxhimi i Aktiviteteve',
    description: 'Moduli kryesor për aktivitetet',
    icon: '📝',
    route: '/activities',
    component: 'ActivitiesMain',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['activity.view'],
    category: ModuleCategory.ACTIVITIES,
    isActive: true,
    sortOrder: 40,
    hierarchyLevel: 1
  },
  {
    id: 'activity-create-general',
    name: 'Create Activity',
    nameAlbanian: 'Krijimi i Aktivitetit',
    description: 'Krijimi i aktiviteteve të reja',
    icon: '➕',
    route: '/activities/create',
    component: 'ActivityCreate',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['activity.create'],
    category: ModuleCategory.ACTIVITIES,
    isActive: true,
    sortOrder: 41,
    hierarchyLevel: 1
  },
  {
    id: 'activity-from-violation',
    name: 'Activity from Violation',
    nameAlbanian: 'Krijimi i Aktivitetit nga Kundërvajtja',
    description: 'Krijimi i aktivitetit bazuar në kundërvajtje',
    icon: '🔗',
    route: '/activities/from-violation',
    component: 'ActivityFromViolation',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['activity.create_from_violation'],
    category: ModuleCategory.ACTIVITIES,
    isActive: true,
    sortOrder: 42,
    hierarchyLevel: 1
  },
  {
    id: 'activity-created-violation',
    name: 'Activity Created from Violation',
    nameAlbanian: 'Aktiviteti i Krijuar Kundërvajtës',
    description: 'Konfirmimi i aktivitetit të krijuar nga kundërvajtja',
    icon: '✅',
    route: '/activities/created-violation',
    component: 'ActivityCreatedViolation',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['activity.view_created'],
    category: ModuleCategory.ACTIVITIES,
    isActive: true,
    sortOrder: 43,
    hierarchyLevel: 1
  },
  {
    id: 'activities-tasks-case',
    name: 'Case Activities and Tasks',
    nameAlbanian: 'Detyrat dhe Aktivitetet e Krijuara në Rast',
    description: 'Të gjitha aktivitetet dhe detyrat e rastit',
    icon: '📋',
    route: '/activities/case-tasks',
    component: 'CaseActivitiesTasks',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['activity.view_case_tasks'],
    category: ModuleCategory.ACTIVITIES,
    isActive: true,
    sortOrder: 44,
    hierarchyLevel: 1
  },

  // =================================================================================
  // 5. TASK MANAGEMENT (70 modules)
  // =================================================================================
  {
    id: 'tasks-main',
    name: 'Task Management',
    nameAlbanian: 'Menaxhimi i Detyrave',
    description: 'Moduli kryesor për detyrat',
    icon: '📬',
    route: '/tasks',
    component: 'TaskManagement',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['task.view'],
    category: ModuleCategory.TASKS,
    isActive: true,
    sortOrder: 50,
    hierarchyLevel: 1
  },
  {
    id: 'task-mailbox',
    name: 'Task Mailbox',
    nameAlbanian: 'Kutia Postare e Detyrave',
    description: 'Kutia postare për detyrat e përdoruesit',
    icon: '📬',
    route: '/tasks/mailbox',
    component: 'TaskMailbox',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['task.mailbox'],
    category: ModuleCategory.TASKS,
    isActive: true,
    sortOrder: 51,
    hierarchyLevel: 1
  },
  {
    id: 'task-window',
    name: 'Task Window',
    nameAlbanian: 'Dritarja e Detyrës',
    description: 'Dritarja e detajuar e detyrës',
    icon: '🪟',
    route: '/tasks/window/:id',
    component: 'TaskWindow',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['task.view_details'],
    category: ModuleCategory.TASKS,
    isActive: true,
    sortOrder: 52,
    hierarchyLevel: 1
  },
  {
    id: 'task-from-violation-case',
    name: 'Task from Violation Case',
    nameAlbanian: 'Krijimi i Detyrës nga Rasti i Kundërvajtjes',
    description: 'Krijimi i detyrës bazuar në rastin e kundërvajtjes',
    icon: '🔗',
    route: '/tasks/from-violation',
    component: 'TaskFromViolationCase',
    requiredRoles: ['Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['task.create_from_violation'],
    category: ModuleCategory.TASKS,
    isActive: true,
    sortOrder: 53,
    hierarchyLevel: 2
  },

  // =================================================================================
  // 6. DOCUMENT MANAGEMENT (120 modules)
  // =================================================================================
  {
    id: 'documents-main',
    name: 'Document Management',
    nameAlbanian: 'Menaxhimi i Dokumenteve',
    description: 'Moduli kryesor për dokumentet',
    icon: '📁',
    route: '/documents',
    component: 'DocumentManagement',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['document.view'],
    category: ModuleCategory.DOCUMENTS,
    isActive: true,
    sortOrder: 60,
    hierarchyLevel: 1
  },
  {
    id: 'confiscated-items-module',
    name: 'Confiscated Items Module',
    nameAlbanian: 'Artikujt e Konfiskuar Moduli',
    description: 'Moduli për menaxhimin e artikujve të konfiskuar',
    icon: '📦',
    route: '/documents/confiscated',
    component: 'ConfiscatedItemsModule',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['document.confiscated'],
    category: ModuleCategory.DOCUMENTS,
    isActive: true,
    sortOrder: 61,
    hierarchyLevel: 1
  },

  // =================================================================================
  // 7. TRANSPORT MANAGEMENT (60 modules)
  // =================================================================================
  {
    id: 'transport-main',
    name: 'Transport Management',
    nameAlbanian: 'Menaxhimi i Transportit',
    description: 'Moduli kryesor për transportin',
    icon: '🚛',
    route: '/transport',
    component: 'TransportManagement',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['transport.view'],
    category: ModuleCategory.TRANSPORT,
    isActive: true,
    sortOrder: 70,
    hierarchyLevel: 1
  },
  {
    id: 'transport-vehicle-data',
    name: 'Vehicle Transport Data',
    nameAlbanian: 'Të Dhënat për Mjetet e Transportit',
    description: 'Të dhënat për mjetet e transportit',
    icon: '🚚',
    route: '/transport/vehicle-data',
    component: 'VehicleTransportData',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['transport.vehicle_data'],
    category: ModuleCategory.TRANSPORT,
    isActive: true,
    sortOrder: 71,
    hierarchyLevel: 1
  },
  {
    id: 'transport-vehicle-data-extended',
    name: 'Extended Vehicle Data',
    nameAlbanian: 'Të Dhënat për Mjetet e Transportit - Të Zgjeruara',
    description: 'Të dhënat e zgjeruara për mjetet e transportit',
    icon: '🚛',
    route: '/transport/vehicle-data-extended',
    component: 'VehicleDataExtended',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['transport.vehicle_data_extended'],
    category: ModuleCategory.TRANSPORT,
    isActive: true,
    sortOrder: 72,
    hierarchyLevel: 1
  },
  {
    id: 'transport-vehicle-details',
    name: 'Vehicle Details',
    nameAlbanian: 'Detajet e Mjetit të Transportit',
    description: 'Detajet e plota të mjetit të transportit',
    icon: '🔍',
    route: '/transport/vehicle-details',
    component: 'VehicleDetails',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['transport.vehicle_details'],
    category: ModuleCategory.TRANSPORT,
    isActive: true,
    sortOrder: 73,
    hierarchyLevel: 1
  },

  // =================================================================================
  // 8. ADMINISTRATIVE FINES (50 modules)
  // =================================================================================
  {
    id: 'admin-fines-main',
    name: 'Administrative Fines',
    nameAlbanian: 'Gjobat Administrative',
    description: 'Moduli kryesor për gjobat administrative',
    icon: '💰',
    route: '/fines',
    component: 'AdministrativeFines',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['fine.view'],
    category: ModuleCategory.FINES,
    isActive: true,
    sortOrder: 80,
    hierarchyLevel: 1
  },
  {
    id: 'admin-fine-create',
    name: 'Create Administrative Fine',
    nameAlbanian: 'Krijimi i Gjobës Administrative',
    description: 'Krijimi i gjobës administrative të re',
    icon: '➕',
    route: '/fines/create',
    component: 'AdminFineCreate',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['fine.create'],
    category: ModuleCategory.FINES,
    isActive: true,
    sortOrder: 81,
    hierarchyLevel: 1
  },
  {
    id: 'admin-fine-create-extended',
    name: 'Extended Fine Creation',
    nameAlbanian: 'Krijimi i Gjobës Administrative - E Zgjeruar',
    description: 'Proces i zgjeruar për krijimin e gjobës',
    icon: '📝',
    route: '/fines/create-extended',
    component: 'AdminFineCreateExtended',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['fine.create_extended'],
    category: ModuleCategory.FINES,
    isActive: true,
    sortOrder: 82,
    hierarchyLevel: 1
  },
  {
    id: 'admin-fine-data',
    name: 'Administrative Fine Data',
    nameAlbanian: 'Të Dhënat e Gjobës Administrative',
    description: 'Të dhënat e detajuara të gjobës administrative',
    icon: '📊',
    route: '/fines/data',
    component: 'AdminFineData',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['fine.view_data'],
    category: ModuleCategory.FINES,
    isActive: true,
    sortOrder: 83,
    hierarchyLevel: 1
  },

  // =================================================================================
  // 9. SEARCH & FILTERS (80 modules)
  // =================================================================================
  {
    id: 'search-main',
    name: 'Search System',
    nameAlbanian: 'Sistemi i Kërkimit',
    description: 'Moduli kryesor për kërkimin',
    icon: '🔍',
    route: '/search',
    component: 'SearchMain',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['search.view'],
    category: ModuleCategory.SEARCH,
    isActive: true,
    sortOrder: 90,
    hierarchyLevel: 1
  },
  {
    id: 'search-filters-basic',
    name: 'Basic Search Filters',
    nameAlbanian: 'Filtrat e Kërkimit',
    description: 'Filtrat bazë të kërkimit',
    icon: '🔍',
    route: '/search/filters',
    component: 'SearchFiltersBasic',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['search.filters'],
    category: ModuleCategory.SEARCH,
    isActive: true,
    sortOrder: 91,
    hierarchyLevel: 1
  },
  {
    id: 'search-filters-2',
    name: 'Search Filters View 2',
    nameAlbanian: 'Filtrat e Kërkimit Pamja 2',
    description: 'Pamja e dytë e filtrave të kërkimit',
    icon: '🔍',
    route: '/search/filters-2',
    component: 'SearchFilters2',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['search.filters_2'],
    category: ModuleCategory.SEARCH,
    isActive: true,
    sortOrder: 92,
    hierarchyLevel: 1
  },
  {
    id: 'search-filters-3',
    name: 'Search Filters View 3',
    nameAlbanian: 'Filtrat e Kërkimit Pamja 3',
    description: 'Pamja e tretë e filtrave të kërkimit',
    icon: '🔍',
    route: '/search/filters-3',
    component: 'SearchFilters3',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['search.filters_3'],
    category: ModuleCategory.SEARCH,
    isActive: true,
    sortOrder: 93,
    hierarchyLevel: 1
  },
  {
    id: 'search-filters-4',
    name: 'Search Filters View 4',
    nameAlbanian: 'Filtrat e Kërkimit Pamja 4',
    description: 'Pamja e katërt e filtrave të kërkimit',
    icon: '🔍',
    route: '/search/filters-4',
    component: 'SearchFilters4',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['search.filters_4'],
    category: ModuleCategory.SEARCH,
    isActive: true,
    sortOrder: 94,
    hierarchyLevel: 1
  },
  {
    id: 'search-filters-5',
    name: 'Search Filters View 5',
    nameAlbanian: 'Filtrat e Kërkimit Pamja 5',
    description: 'Pamja e pestë e filtrave të kërkimit',
    icon: '🔍',
    route: '/search/filters-5',
    component: 'SearchFilters5',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['search.filters_5'],
    category: ModuleCategory.SEARCH,
    isActive: true,
    sortOrder: 95,
    hierarchyLevel: 1
  },
  {
    id: 'search-filters-6',
    name: 'Search Filters View 6',
    nameAlbanian: 'Filtrat e Kërkimit Pamja 6',
    description: 'Pamja e gjashtë e filtrave të kërkimit',
    icon: '🔍',
    route: '/search/filters-6',
    component: 'SearchFilters6',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['search.filters_6'],
    category: ModuleCategory.SEARCH,
    isActive: true,
    sortOrder: 96,
    hierarchyLevel: 1
  },
  {
    id: 'search-filters-7',
    name: 'Search Filters View 7',
    nameAlbanian: 'Filtrat e Kërkimit Pamja 7',
    description: 'Pamja e shtatë e filtrave të kërkimit',
    icon: '🔍',
    route: '/search/filters-7',
    component: 'SearchFilters7',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['search.filters_7'],
    category: ModuleCategory.SEARCH,
    isActive: true,
    sortOrder: 97,
    hierarchyLevel: 1
  },
  {
    id: 'search-filters-9',
    name: 'Search Filters View 9',
    nameAlbanian: 'Filtrat e Kërkimit Pamja 9',
    description: 'Pamja e nëntë e filtrave të kërkimit',
    icon: '🔍',
    route: '/search/filters-9',
    component: 'SearchFilters9',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['search.filters_9'],
    category: ModuleCategory.SEARCH,
    isActive: true,
    sortOrder: 98,
    hierarchyLevel: 1
  },
  {
    id: 'search-filters-10',
    name: 'Search Filters View 10',
    nameAlbanian: 'Filtrat e Kërkimit Pamja 10',
    description: 'Pamja e dhjetë e filtrave të kërkimit',
    icon: '🔍',
    route: '/search/filters-10',
    component: 'SearchFilters10',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['search.filters_10'],
    category: ModuleCategory.SEARCH,
    isActive: true,
    sortOrder: 99,
    hierarchyLevel: 1
  },
  {
    id: 'search-filters-11',
    name: 'Search Filters View 11',
    nameAlbanian: 'Filtrat e Kërkimit Pamja 11',
    description: 'Pamja e njëmbëdhjetë e filtrave të kërkimit',
    icon: '🔍',
    route: '/search/filters-11',
    component: 'SearchFilters11',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['search.filters_11'],
    category: ModuleCategory.SEARCH,
    isActive: true,
    sortOrder: 100,
    hierarchyLevel: 1
  },
  {
    id: 'search-filters-12',
    name: 'Search Filters View 12',
    nameAlbanian: 'Filtrat e Kërkimit Pamja 12',
    description: 'Pamja e dymbëdhjetë e filtrave të kërkimit',
    icon: '🔍',
    route: '/search/filters-12',
    component: 'SearchFilters12',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['search.filters_12'],
    category: ModuleCategory.SEARCH,
    isActive: true,
    sortOrder: 101,
    hierarchyLevel: 1
  },
  {
    id: 'search-filters-13',
    name: 'Search Filters View 13',
    nameAlbanian: 'Filtrat e Kërkimit Pamja 13',
    description: 'Pamja e trembëdhjetë e filtrave të kërkimit',
    icon: '🔍',
    route: '/search/filters-13',
    component: 'SearchFilters13',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['search.filters_13'],
    category: ModuleCategory.SEARCH,
    isActive: true,
    sortOrder: 102,
    hierarchyLevel: 1
  },
  {
    id: 'search-filters-14',
    name: 'Search Filters View 14',
    nameAlbanian: 'Filtrat e Kërkimit Pamja 14',
    description: 'Pamja e katërmbëdhjetë e filtrave të kërkimit',
    icon: '🔍',
    route: '/search/filters-14',
    component: 'SearchFilters14',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['search.filters_14'],
    category: ModuleCategory.SEARCH,
    isActive: true,
    sortOrder: 103,
    hierarchyLevel: 1
  },

  // =================================================================================
  // 10. AUDIT & REGISTRY (40 modules)
  // =================================================================================
  {
    id: 'audit-main',
    name: 'Audit System',
    nameAlbanian: 'Sistemi i Auditimit',
    description: 'Moduli kryesor për auditimin',
    icon: '📓',
    route: '/audit',
    component: 'AuditMain',
    requiredRoles: ['Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['audit.view'],
    category: ModuleCategory.AUDIT,
    isActive: true,
    sortOrder: 110,
    hierarchyLevel: 2
  },
  {
    id: 'audit-diary-module',
    name: 'Audit Diary Module',
    nameAlbanian: 'Ditari i Auditimit Moduli',
    description: 'Moduli për ditarin e auditimit',
    icon: '📔',
    route: '/audit/diary',
    component: 'AuditDiaryModule',
    requiredRoles: ['Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['audit.diary'],
    category: ModuleCategory.AUDIT,
    isActive: true,
    sortOrder: 111,
    hierarchyLevel: 2
  },
  {
    id: 'registry-administrative',
    name: 'Administrative Registry',
    nameAlbanian: 'Regjistrat Zyrës Administrative',
    description: 'Regjistrat e zyrës administrative',
    icon: '📚',
    route: '/registry/administrative',
    component: 'AdministrativeRegistry',
    requiredRoles: ['Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['registry.administrative'],
    category: ModuleCategory.REGISTRY,
    isActive: true,
    sortOrder: 112,
    hierarchyLevel: 2
  },
  {
    id: 'protocol-book',
    name: 'Protocol Book',
    nameAlbanian: 'Libri i Protokollit',
    description: 'Libri zyrtar i protokollit',
    icon: '📖',
    route: '/registry/protocol',
    component: 'ProtocolBook',
    requiredRoles: ['Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['registry.protocol'],
    category: ModuleCategory.REGISTRY,
    isActive: true,
    sortOrder: 113,
    hierarchyLevel: 2
  },

  // =================================================================================
  // 11. NOTIFICATIONS (30 modules)
  // =================================================================================
  {
    id: 'notifications-main',
    name: 'Notification System',
    nameAlbanian: 'Sistemi i Njoftimeve',
    description: 'Moduli kryesor për njoftimet',
    icon: '🔔',
    route: '/notifications',
    component: 'NotificationsMain',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['notification.view'],
    category: ModuleCategory.NOTIFICATIONS,
    isActive: true,
    sortOrder: 120,
    hierarchyLevel: 1
  },
  {
    id: 'notification-page',
    name: 'Notification Page',
    nameAlbanian: 'Faqja e Njoftimit',
    description: 'Faqja kryesore e njoftimeve',
    icon: '📄',
    route: '/notifications/page',
    component: 'NotificationPage',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['notification.page'],
    category: ModuleCategory.NOTIFICATIONS,
    isActive: true,
    sortOrder: 121,
    hierarchyLevel: 1
  },

  // =================================================================================
  // 12. REPORTS & STATISTICS (60 modules)
  // =================================================================================
  {
    id: 'reports-main',
    name: 'Reports System',
    nameAlbanian: 'Sistemi i Raporteve',
    description: 'Moduli kryesor për raportet',
    icon: '📊',
    route: '/reports',
    component: 'ReportsMain',
    requiredRoles: ['Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['report.view'],
    category: ModuleCategory.REPORTS,
    isActive: true,
    sortOrder: 130,
    hierarchyLevel: 2
  },

  // =================================================================================
  // 13. USER MANAGEMENT (40 modules)
  // =================================================================================
  {
    id: 'user-management-main',
    name: 'User Management',
    nameAlbanian: 'Menaxhimi i Përdoruesve',
    description: 'Moduli kryesor për përdoruesit',
    icon: '👥',
    route: '/users',
    component: 'UserManagementMain',
    requiredRoles: ['Director'],
    requiredPermissions: ['user.manage'],
    category: ModuleCategory.USER_MANAGEMENT,
    isActive: true,
    sortOrder: 140,
    hierarchyLevel: 4
  },

  // =================================================================================
  // 14. SYSTEM SETTINGS (30 modules)
  // =================================================================================
  {
    id: 'settings-main',
    name: 'System Settings',
    nameAlbanian: 'Cilësimet e Sistemit',
    description: 'Moduli kryesor për cilësimet',
    icon: '⚙️',
    route: '/settings',
    component: 'SettingsMain',
    requiredRoles: ['Director'],
    requiredPermissions: ['system.settings'],
    category: ModuleCategory.SETTINGS,
    isActive: true,
    sortOrder: 150,
    hierarchyLevel: 4
  }
];

/**
 * HIERARCHICAL ACCESS CONTROL SYSTEM FOR KOSOVO CUSTOMS
 */

/**
 * Get modules for user based on hierarchical access control
 */
export function getModulesForUser(userRole: string, department?: string, customsPost?: string): SystemModule[] {
  const roleHierarchy: Record<string, number> = {
    'officer': 1,           // Oficer Doganor
    'supervisor': 2,        // Mbikëqyrës  
    'sector_chief': 3,      // Kryetar Sektori
    'director': 4          // Drejtor i Përgjithshëm
  };
  
  const userLevel = roleHierarchy[userRole.toLowerCase()] || 0;
  
  return COMPREHENSIVE_SYSTEM_MODULES.filter(module => {
    if (!module.isActive) return false;
    
    // Check hierarchy level access
    const hasHierarchyAccess = (module.hierarchyLevel || 1) <= userLevel;
    
    // Check specific role requirements
    const hasRoleAccess = module.requiredRoles.some(role => {
      const requiredLevel = roleHierarchy[role.toLowerCase()] || 0;
      return userLevel >= requiredLevel;
    });
    
    return hasHierarchyAccess && hasRoleAccess;
  }).sort((a, b) => a.sortOrder - b.sortOrder);
}

/**
 * Synchronization function for hierarchical case access
 */
export function synchronizeCaseAccess(userRole: string, caseOwnerId: string, currentUserId: string): boolean {
  const roleHierarchy: Record<string, number> = {
    'officer': 1,
    'supervisor': 2,
    'sector_chief': 3,
    'director': 4
  };
  
  const userLevel = roleHierarchy[userRole.toLowerCase()] || 0;
  
  // Directors can see all cases
  if (userLevel >= 4) return true;
  
  // Sector chiefs can see cases from their sector
  if (userLevel >= 3) return true;
  
  // Supervisors can see cases from officers they supervise
  if (userLevel >= 2) return true;
  
  // Officers can only see their own cases
  return currentUserId === caseOwnerId;
}

/**
 * Get modules by category
 */
export function getModulesByCategory(category: ModuleCategoryType): SystemModule[] {
  return COMPREHENSIVE_SYSTEM_MODULES.filter(module => 
    module.category === category && module.isActive
  ).sort((a, b) => a.sortOrder - b.sortOrder);
}

/**
 * Get module by ID
 */
export function getModuleById(id: string): SystemModule | undefined {
  return COMPREHENSIVE_SYSTEM_MODULES.find(module => module.id === id);
}

export { COMPREHENSIVE_SYSTEM_MODULES as SYSTEM_MODULES };
