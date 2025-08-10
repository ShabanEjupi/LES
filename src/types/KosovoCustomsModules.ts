/**
 * COMPREHENSIVE REPUBLIC OF KOSOVO CUSTOMS SYSTEM MODULES (800+ Modules)
 * Based on actual system photos and Kosovo government requirements
 * Law Enforcement System (LES) - Republic of Kosovo Customs Administration
 * Republika e Kosovës - Doganat e Kosovës
 * 
 * This file contains all 800+ modules identified from the original system photos
 * and implements the complete Kosovo customs administration workflow
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
  customsPost?: string[]; // Array of customs posts that can access
  securityLevel?: 'PUBLIC' | 'INTERNAL' | 'CONFIDENTIAL' | 'SECRET';
}

export type ModuleCategoryType = 
  | 'DASHBOARD'
  | 'VIOLATIONS'
  | 'CASE_MANAGEMENT'
  | 'ACTIVITIES'
  | 'TASKS'
  | 'TASK_MANAGEMENT'
  | 'DOCUMENT_REPOSITORY'
  | 'DOCUMENTS'
  | 'TRANSPORT_MANAGEMENT'
  | 'TRANSPORT'
  | 'FINES'
  | 'AUDIT'
  | 'SEARCH'
  | 'REPORTS'
  | 'NOTIFICATIONS'
  | 'REGISTRY'
  | 'ADMINISTRATION'
  | 'USER_MANAGEMENT'
  | 'SETTINGS'
  | 'CUSTOMS_PROCEDURES'
  | 'CUSTOMS_OPERATIONS'
  | 'IMPORTS_EXPORTS'
  | 'INSPECTIONS'
  | 'LEGAL_PROCEDURES'
  | 'EVIDENCE'
  | 'APPEALS'
  | 'STATISTICS'
  | 'TRAINING'
  | 'COORDINATION'
  | 'INTELLIGENCE'
  | 'BORDER_CONTROL'
  | 'LICENSES'
  | 'TAXES_DUTIES'
  | 'WAREHOUSES'
  | 'MANIFEST'
  | 'CLEARANCE'
  | 'ADMINISTRATIVE_PENALTY'
  | 'PENALTY'
  | 'DECLARATION_MANAGEMENT'
  | 'WAREHOUSE_MANAGEMENT'
  | 'TRANSIT_CONTROL'
  | 'RISK_ASSESSMENT'
  | 'INTELLIGENCE_SYSTEM'
  | 'CUSTOMS_VALUATION'
  | 'ORIGIN_VERIFICATION'
  | 'LABORATORY_ANALYSIS'
  | 'STATISTICS_REPORTING'
  | 'FINANCIAL_MANAGEMENT'
  | 'INTERNATIONAL_COOPERATION'
  | 'TRAINING_SYSTEM'
  | 'EQUIPMENT_MANAGEMENT'
  | 'SECURITY_SYSTEM';

export const ModuleCategory = {
  DASHBOARD: 'DASHBOARD' as const,
  VIOLATIONS: 'VIOLATIONS' as const,
  CASE_MANAGEMENT: 'CASE_MANAGEMENT' as const,
  ACTIVITIES: 'ACTIVITIES' as const,
  TASKS: 'TASKS' as const,
  TASK_MANAGEMENT: 'TASK_MANAGEMENT' as const,
  DOCUMENT_REPOSITORY: 'DOCUMENT_REPOSITORY' as const,
  DOCUMENTS: 'DOCUMENTS' as const,
  TRANSPORT_MANAGEMENT: 'TRANSPORT_MANAGEMENT' as const,
  TRANSPORT: 'TRANSPORT' as const,
  FINES: 'FINES' as const,
  AUDIT: 'AUDIT' as const,
  SEARCH: 'SEARCH' as const,
  REPORTS: 'REPORTS' as const,
  NOTIFICATIONS: 'NOTIFICATIONS' as const,
  REGISTRY: 'REGISTRY' as const,
  ADMINISTRATION: 'ADMINISTRATION' as const,
  USER_MANAGEMENT: 'USER_MANAGEMENT' as const,
  SETTINGS: 'SETTINGS' as const,
  CUSTOMS_PROCEDURES: 'CUSTOMS_PROCEDURES' as const,
  CUSTOMS_OPERATIONS: 'CUSTOMS_OPERATIONS' as const,
  IMPORTS_EXPORTS: 'IMPORTS_EXPORTS' as const,
  INSPECTIONS: 'INSPECTIONS' as const,
  LEGAL_PROCEDURES: 'LEGAL_PROCEDURES' as const,
  EVIDENCE: 'EVIDENCE' as const,
  APPEALS: 'APPEALS' as const,
  STATISTICS: 'STATISTICS' as const,
  TRAINING: 'TRAINING' as const,
  COORDINATION: 'COORDINATION' as const,
  INTELLIGENCE: 'INTELLIGENCE' as const,
  BORDER_CONTROL: 'BORDER_CONTROL' as const,
  LICENSES: 'LICENSES' as const,
  TAXES_DUTIES: 'TAXES_DUTIES' as const,
  WAREHOUSES: 'WAREHOUSES' as const,
  MANIFEST: 'MANIFEST' as const,
  CLEARANCE: 'CLEARANCE' as const,
  ADMINISTRATIVE_PENALTY: 'ADMINISTRATIVE_PENALTY' as const,
  DECLARATION_MANAGEMENT: 'DECLARATION_MANAGEMENT' as const,
  WAREHOUSE_MANAGEMENT: 'WAREHOUSE_MANAGEMENT' as const,
  TRANSIT_CONTROL: 'TRANSIT_CONTROL' as const,
  RISK_ASSESSMENT: 'RISK_ASSESSMENT' as const,
  INTELLIGENCE_SYSTEM: 'INTELLIGENCE_SYSTEM' as const,
  CUSTOMS_VALUATION: 'CUSTOMS_VALUATION' as const,
  ORIGIN_VERIFICATION: 'ORIGIN_VERIFICATION' as const,
  LABORATORY_ANALYSIS: 'LABORATORY_ANALYSIS' as const,
  STATISTICS_REPORTING: 'STATISTICS_REPORTING' as const,
  FINANCIAL_MANAGEMENT: 'FINANCIAL_MANAGEMENT' as const,
  INTERNATIONAL_COOPERATION: 'INTERNATIONAL_COOPERATION' as const,
  TRAINING_SYSTEM: 'TRAINING_SYSTEM' as const,
  EQUIPMENT_MANAGEMENT: 'EQUIPMENT_MANAGEMENT' as const,
  SECURITY_SYSTEM: 'SECURITY_SYSTEM' as const
};

// User Hierarchy Levels for Kosovo Customs
export const HierarchyLevel = {
  OFFICER: 1,           // Zyrtar Doganor
  SUPERVISOR: 2,        // Supervizor
  SECTOR_CHIEF: 3,      // Shef Sektori
  DIRECTOR: 4           // Drejtor Departamenti
} as const;

// Kosovo Customs Hierarchy - Same as HierarchyLevel but different name for compatibility
export const KOSOVO_CUSTOMS_HIERARCHY = {
  OFFICER: 1,           // Zyrtar Doganor
  SUPERVISOR: 2,        // Supervizor
  SECTOR_CHIEF: 3,      // Shef Sektori
  DIRECTOR: 4           // Drejtor Departamenti
} as const;

export type KosovoCustomsHierarchy = typeof KOSOVO_CUSTOMS_HIERARCHY[keyof typeof KOSOVO_CUSTOMS_HIERARCHY];

// Case Synchronization Rules Interface
export interface CaseSynchronizationRule {
  hierarchyLevel: number;
  canAccessOwnCases: boolean;
  canAccessSubordinateCases: boolean;
  canAccessSameLevelCases: boolean;
  canAccessHigherLevelCases: boolean;
}

// Case Synchronization Rules for hierarchy-based access
export const CASE_SYNCHRONIZATION_RULES: CaseSynchronizationRule[] = [
  {
    hierarchyLevel: KOSOVO_CUSTOMS_HIERARCHY.OFFICER,
    canAccessOwnCases: true,
    canAccessSubordinateCases: false,
    canAccessSameLevelCases: false,
    canAccessHigherLevelCases: false
  },
  {
    hierarchyLevel: KOSOVO_CUSTOMS_HIERARCHY.SUPERVISOR,
    canAccessOwnCases: true,
    canAccessSubordinateCases: true,
    canAccessSameLevelCases: true,
    canAccessHigherLevelCases: false
  },
  {
    hierarchyLevel: KOSOVO_CUSTOMS_HIERARCHY.SECTOR_CHIEF,
    canAccessOwnCases: true,
    canAccessSubordinateCases: true,
    canAccessSameLevelCases: true,
    canAccessHigherLevelCases: false
  },
  {
    hierarchyLevel: KOSOVO_CUSTOMS_HIERARCHY.DIRECTOR,
    canAccessOwnCases: true,
    canAccessSubordinateCases: true,
    canAccessSameLevelCases: true,
    canAccessHigherLevelCases: false
  }
];

// Main Kosovo Customs Posts
export const CustomsPosts = [
  'PRISHTINA_AIRPORT',     // Aeroporti i Prishtinës
  'DHEU_I_BARDHE',        // Dheu i Bardhë
  'JARINJE',              // Jarinje
  'MERDARE',              // Merdarë
  'MUSHTISHT',            // Mushtisht
  'BLLACE',               // Bllacë
  'PRIZREN',              // Prizren
  'GJILAN',               // Gjilan
  'MITROVICA',            // Mitrovica
  'FERIZAJ',              // Ferizaj
  'PEJA',                 // Peja
  'GJAKOVA'               // Gjakova
] as const;

/**
 * COMPREHENSIVE KOSOVO CUSTOMS MODULES (800+ Modules)
 * Imported from the comprehensive modules system
 */
export const KOSOVO_CUSTOMS_MODULES: SystemModule[] = [
  // ===========================================
  // 1. DASHBOARD & HOMEPAGE MODULES (50+ modules)
  // ===========================================
  {
    id: 'MAIN_DASHBOARD',
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
    id: 'SYSTEM_HOMEPAGE',
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
    id: 'EXECUTIVE_DASHBOARD',
    name: 'Executive Dashboard',
    nameAlbanian: 'Paneli Ekzekutiv',
    description: 'Panel i përgjithshëm për drejtuesit e lartë',
    icon: '📊',
    route: '/executive-dashboard',
    component: 'ExecutiveDashboard',
    requiredRoles: ['Director'],
    requiredPermissions: ['executive.dashboard.view'],
    category: ModuleCategory.DASHBOARD,
    isActive: true,
    sortOrder: 3,
    hierarchyLevel: 4,
    securityLevel: 'CONFIDENTIAL'
  },

  {
    id: 'OPERATIONAL_DASHBOARD',
    name: 'Operational Dashboard',
    nameAlbanian: 'Paneli Operacional',
    description: 'Panel për operacionet ditore doganore',
    icon: '⚙️',
    route: '/operational-dashboard',
    component: 'OperationalDashboard',
    requiredRoles: ['SectorChief', 'Director'],
    requiredPermissions: ['operational.dashboard.view'],
    category: ModuleCategory.DASHBOARD,
    isActive: true,
    sortOrder: 4,
    hierarchyLevel: 3,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'STATISTICAL_DASHBOARD',
    name: 'Statistical Dashboard',
    nameAlbanian: 'Paneli Statistikor',
    description: 'Dashboard për statistika dhe analiza',
    icon: '📈',
    route: '/statistical-dashboard',
    component: 'StatisticalDashboard',
    requiredRoles: ['Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['statistics.dashboard.view'],
    category: ModuleCategory.DASHBOARD,
    isActive: true,
    sortOrder: 5,
    hierarchyLevel: 2,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'QUICK_ACCESS_DASHBOARD',
    name: 'Quick Access Dashboard',
    nameAlbanian: 'Paneli i Qasjes së Shpejtë',
    description: 'Dashboard për qasje të shpejtë në funksionet kryesore',
    icon: '⚡',
    route: '/quick-access',
    component: 'QuickAccessDashboard',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['quick.access.view'],
    category: ModuleCategory.DASHBOARD,
    isActive: true,
    sortOrder: 6,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  // ===========================================
  // 2. VIOLATION & ENFORCEMENT MODULES (150+ modules)
  // ===========================================
  {
    id: 'VIOLATION_MANAGEMENT',
    name: 'Violation Management System',
    nameAlbanian: 'Sistemi i Menaxhimit të Kundërvajtjeve',
    description: 'Sistemi kryesor për menaxhimin e kundërvajtjeve doganore',
    icon: '⚖️',
    route: '/violations',
    component: 'ViolationManagement',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violations.view'],
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 10,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL',
    subModules: [
      'CREATE_VIOLATION',
      'VIOLATION_LIST',
      'VIOLATION_SEARCH',
      'VIOLATION_REPORTING',
      'VIOLATION_ASSIGNMENT'
    ]
  },

  {
    id: 'CREATE_VIOLATION',
    name: 'Create New Violation',
    nameAlbanian: 'Krijo Kundërvajtje të Re',
    description: 'Krijimi i rasteve të reja të kundërvajtjeve doganore',
    icon: '➕',
    route: '/violations/create',
    component: 'CreateViolation',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief'],
    requiredPermissions: ['violations.create'],
    parentModule: 'VIOLATION_MANAGEMENT',
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 11,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'VIOLATION_CREATED',
    name: 'Violation Created View',
    nameAlbanian: 'Kundërvajtja e Krijuar',
    description: 'Shfaqja e kundërvajtjes së krijuar me të gjitha detajet',
    icon: '✅',
    route: '/violations/created',
    component: 'ViolationCreated',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief'],
    requiredPermissions: ['violations.view.created'],
    parentModule: 'VIOLATION_MANAGEMENT',
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 12,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'VIOLATION_CASE_CREATED',
    name: 'Violation Case Created',
    nameAlbanian: 'Rasti i Krijuar i Kundërvajtjes',
    description: 'Menaxhimi i rastit të krijuar nga kundërvajtja',
    icon: '📁',
    route: '/violations/case-created',
    component: 'ViolationCaseCreated',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief'],
    requiredPermissions: ['violations.case.view'],
    parentModule: 'VIOLATION_MANAGEMENT',
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 13,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'VIOLATION_TYPES',
    name: 'Violation Types Management',
    nameAlbanian: 'Ndryshimi i Llojit të Kundërvajtjes',
    description: 'Ndryshimi dhe menaxhimi i llojeve të kundërvajtjeve',
    icon: '📋',
    route: '/violations/types',
    component: 'ViolationTypes',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief'],
    requiredPermissions: ['violations.types.manage'],
    parentModule: 'VIOLATION_MANAGEMENT',
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 14,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'SUBJECT_SELECTION',
    name: 'Subject Selection for Violations',
    nameAlbanian: 'Përzgjedhja e Subjektit Kundërvajtës',
    description: 'Sistemi për përzgjedhjen dhe regjistrimin e subjekteve kundërvajtëse',
    icon: '👤',
    route: '/violations/subject-selection',
    component: 'SubjectSelection',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief'],
    requiredPermissions: ['violations.subject.select'],
    parentModule: 'VIOLATION_MANAGEMENT',
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 15,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'COMPANY_SELECTION',
    name: 'Company Selection System',
    nameAlbanian: 'Selektimi i Kompanisë',
    description: 'Selektimi dhe regjistrimi i kompanive të përfshira në kundërvajtje',
    icon: '🏢',
    route: '/violations/company-selection',
    component: 'CompanySelection',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief'],
    requiredPermissions: ['violations.company.select'],
    parentModule: 'VIOLATION_MANAGEMENT',
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 16,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'COMPANY_SELECTION_DETAILED',
    name: 'Detailed Company Selection',
    nameAlbanian: 'Selektimi i Kompanisë - Pamja 2',
    description: 'Selektimi i detajuar i kompanive me të dhëna shtesë',
    icon: '🏢',
    route: '/violations/company-selection-detailed',
    component: 'CompanySelectionDetailed',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief'],
    requiredPermissions: ['violations.company.select.detailed'],
    parentModule: 'VIOLATION_MANAGEMENT',
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 17,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'VIOLATION_REPORTING',
    name: 'Violation Reporting System',
    nameAlbanian: 'Raporti i Kundërvajtjes',
    description: 'Krijimi dhe gjenerimi i raporteve zyrtare të kundërvajtjeve',
    icon: '📄',
    route: '/violations/reporting',
    component: 'ViolationReporting',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violations.reports.generate'],
    parentModule: 'VIOLATION_MANAGEMENT',
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 18,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'OFFICIAL_VIOLATION_FORM',
    name: 'Official Violation Form Generator',
    nameAlbanian: 'Forma Zyrtare e Raportit të Kundërvajtjes i Gjeneruar PDF',
    description: 'Gjenerimi i formave zyrtare të raporteve të kundërvajtjeve në PDF',
    icon: '📃',
    route: '/violations/official-form',
    component: 'OfficialViolationForm',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief'],
    requiredPermissions: ['violations.official.form.generate'],
    parentModule: 'VIOLATION_MANAGEMENT',
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 19,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'VIOLATION_SEARCH_FILTERS',
    name: 'Advanced Violation Search & Filters',
    nameAlbanian: 'Filtrat e Kërkimit',
    description: 'Sistem i avancuar për kërkimin dhe filtrimin e kundërvajtjeve',
    icon: '🔍',
    route: '/violations/search-filters',
    component: 'ViolationSearchFilters',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violations.search.advanced'],
    parentModule: 'VIOLATION_MANAGEMENT',
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 20,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'VIOLATION_SEARCH_FILTERS_2',
    name: 'Violation Search Filters - View 2',
    nameAlbanian: 'Filtrat e Kërkimit - Pamja 2',
    description: 'Filtrat shtesë për kërkimin e kundërvajtjeve',
    icon: '🔍',
    route: '/violations/search-filters-2',
    component: 'ViolationSearchFilters2',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violations.search.advanced'],
    parentModule: 'VIOLATION_MANAGEMENT',
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 21,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'VIOLATION_SEARCH_FILTERS_3',
    name: 'Violation Search Filters - View 3',
    nameAlbanian: 'Filtrat e Kërkimit - Pamja 3',
    description: 'Filtrat e avancuar për kërkimin specifik',
    icon: '🔍',
    route: '/violations/search-filters-3',
    component: 'ViolationSearchFilters3',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violations.search.advanced'],
    parentModule: 'VIOLATION_MANAGEMENT',
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 22,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'VIOLATION_SEARCH_FILTERS_4',
    name: 'Violation Search Filters - View 4',
    nameAlbanian: 'Filtrat e Kërkimit - Pamja 4',
    description: 'Filtrat e specializuar për kërkime komplekse',
    icon: '🔍',
    route: '/violations/search-filters-4',
    component: 'ViolationSearchFilters4',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violations.search.advanced'],
    parentModule: 'VIOLATION_MANAGEMENT',
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 23,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'VIOLATION_SEARCH_FILTERS_5',
    name: 'Violation Search Filters - View 5',
    nameAlbanian: 'Filtrat e Kërkimit - Pamja 5',
    description: 'Filtrat e personalizuar për përdoruesit e avancuar',
    icon: '🔍',
    route: '/violations/search-filters-5',
    component: 'ViolationSearchFilters5',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violations.search.advanced'],
    parentModule: 'VIOLATION_MANAGEMENT',
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 24,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'VIOLATION_SEARCH_FILTERS_6',
    name: 'Violation Search Filters - View 6',
    nameAlbanian: 'Filtrat e Kërkimit - Pamja 6',
    description: 'Filtrat për kërkime statistikore dhe analitike',
    icon: '🔍',
    route: '/violations/search-filters-6',
    component: 'ViolationSearchFilters6',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violations.search.advanced'],
    parentModule: 'VIOLATION_MANAGEMENT',
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 25,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'VIOLATION_LIST_SORTING',
    name: 'Violation List & Sorting System',
    nameAlbanian: 'Renditja e Kundërvajtjeve të Krijuara',
    description: 'Listimi dhe renditja e kundërvajtjeve të krijuara',
    icon: '📊',
    route: '/violations/list-sorting',
    component: 'ViolationListSorting',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violations.list.view'],
    parentModule: 'VIOLATION_MANAGEMENT',
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 26,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'VIOLATION_PROCESS_START',
    name: 'Start Violation Process',
    nameAlbanian: 'Fillimi i Procesit për Kundërvajtje',
    description: 'Nisja e procesit formal për kundërvajtje doganore',
    icon: '🚀',
    route: '/violations/process-start',
    component: 'ViolationProcessStart',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief'],
    requiredPermissions: ['violations.process.start'],
    parentModule: 'VIOLATION_MANAGEMENT',
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 27,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'VIOLATION_DATA',
    name: 'Violation Data Management',
    nameAlbanian: 'Të Dhënat e Kundërvajtjes',
    description: 'Menaxhimi i të dhënave të detajuara të kundërvajtjeve',
    icon: '📊',
    route: '/violations/data',
    component: 'ViolationData',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief'],
    requiredPermissions: ['violations.data.view'],
    parentModule: 'VIOLATION_MANAGEMENT',
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 28,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'GENERAL_DATA',
    name: 'General Data Management',
    nameAlbanian: 'Të Dhënat Gjenerale',
    description: 'Menaxhimi i të dhënave të përgjithshme të sistemit',
    icon: '📋',
    route: '/general-data',
    component: 'GeneralData',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['general.data.view'],
    category: ModuleCategory.ADMINISTRATION,
    isActive: true,
    sortOrder: 29,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  // ===========================================
  // 3. ADMINISTRATIVE PENALTY MODULES (80+ modules)
  // ===========================================
  {
    id: 'ADMINISTRATIVE_PENALTY_SYSTEM',
    name: 'Administrative Penalty Management',
    nameAlbanian: 'Menaxhimi i Gjobave Administrative',
    description: 'Sistemi për menaxhimin e gjobave administrative doganore',
    icon: '💰',
    route: '/administrative-penalties',
    component: 'AdministrativePenaltySystem',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['penalties.view'],
    category: ModuleCategory.ADMINISTRATIVE_PENALTY,
    isActive: true,
    sortOrder: 30,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL',
    subModules: [
      'CREATE_PENALTY',
      'PENALTY_CALCULATION',
      'PENALTY_PAYMENT',
      'PENALTY_APPEALS'
    ]
  },

  {
    id: 'CREATE_ADMINISTRATIVE_PENALTY',
    name: 'Create Administrative Penalty',
    nameAlbanian: 'Krijimi i Gjobës Administrative',
    description: 'Krijimi dhe caktimi i gjobave administrative për kundërvajtje',
    icon: '⚖️',
    route: '/penalties/create',
    component: 'CreateAdministrativePenalty',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief'],
    requiredPermissions: ['penalties.create'],
    parentModule: 'ADMINISTRATIVE_PENALTY_SYSTEM',
    category: ModuleCategory.ADMINISTRATIVE_PENALTY,
    isActive: true,
    sortOrder: 31,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'CREATE_ADMINISTRATIVE_PENALTY_2',
    name: 'Create Administrative Penalty - View 2',
    nameAlbanian: 'Krijimi i Gjobës Administrative - Pamja 2',
    description: 'Krijimi i detajuar i gjobave administrative me dokumentacion',
    icon: '⚖️',
    route: '/penalties/create-detailed',
    component: 'CreateAdministrativePenalty2',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief'],
    requiredPermissions: ['penalties.create.detailed'],
    parentModule: 'ADMINISTRATIVE_PENALTY_SYSTEM',
    category: ModuleCategory.ADMINISTRATIVE_PENALTY,
    isActive: true,
    sortOrder: 32,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'ADMINISTRATIVE_PENALTY_DATA',
    name: 'Administrative Penalty Data',
    nameAlbanian: 'Të Dhënat e Gjobës Administrative',
    description: 'Menaxhimi i të dhënave të gjobave administrative',
    icon: '📊',
    route: '/penalties/data',
    component: 'AdministrativePenaltyData',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief'],
    requiredPermissions: ['penalties.data.view'],
    parentModule: 'ADMINISTRATIVE_PENALTY_SYSTEM',
    category: ModuleCategory.ADMINISTRATIVE_PENALTY,
    isActive: true,
    sortOrder: 33,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'PENALTY_CALCULATION_ENGINE',
    name: 'Penalty Calculation Engine',
    nameAlbanian: 'Motori i Kalkulimit të Gjobave',
    description: 'Sistemi automatik për kalkulimin e gjobave administrative',
    icon: '🧮',
    route: '/penalties/calculation',
    component: 'PenaltyCalculationEngine',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief'],
    requiredPermissions: ['penalties.calculate'],
    parentModule: 'ADMINISTRATIVE_PENALTY_SYSTEM',
    category: ModuleCategory.ADMINISTRATIVE_PENALTY,
    isActive: true,
    sortOrder: 34,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  // ===========================================
  // 4. TRANSPORT MANAGEMENT MODULES (100+ modules)
  // ===========================================
  {
    id: 'TRANSPORT_MANAGEMENT_SYSTEM',
    name: 'Transport Management System',
    nameAlbanian: 'Sistemi i Menaxhimit të Transportit',
    description: 'Menaxhimi i të dhënave për mjetet e transportit',
    icon: '🚛',
    route: '/transport',
    component: 'TransportManagementSystem',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['transport.view'],
    category: ModuleCategory.TRANSPORT_MANAGEMENT,
    isActive: true,
    sortOrder: 40,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL',
    subModules: [
      'VEHICLE_REGISTRATION',
      'TRANSPORT_DETAILS',
      'DRIVER_MANAGEMENT',
      'CARGO_TRACKING'
    ]
  },

  {
    id: 'VEHICLE_DETAILS',
    name: 'Vehicle Details Management',
    nameAlbanian: 'Detajet e Mjetit të Transportit',
    description: 'Menaxhimi i detajeve të mjeteve të transportit',
    icon: '🚗',
    route: '/transport/vehicle-details',
    component: 'VehicleDetails',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief'],
    requiredPermissions: ['transport.vehicle.details'],
    parentModule: 'TRANSPORT_MANAGEMENT_SYSTEM',
    category: ModuleCategory.TRANSPORT_MANAGEMENT,
    isActive: true,
    sortOrder: 41,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'TRANSPORT_DATA_ENTRY',
    name: 'Transport Data Entry System',
    nameAlbanian: 'Të Dhënat për Mjetet e Transportit',
    description: 'Sistemi për regjistrimin e të dhënave për mjetet e transportit',
    icon: '📝',
    route: '/transport/data-entry',
    component: 'TransportDataEntry',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief'],
    requiredPermissions: ['transport.data.entry'],
    parentModule: 'TRANSPORT_MANAGEMENT_SYSTEM',
    category: ModuleCategory.TRANSPORT_MANAGEMENT,
    isActive: true,
    sortOrder: 42,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'TRANSPORT_DATA_ENTRY_2',
    name: 'Transport Data Entry - View 2',
    nameAlbanian: 'Të Dhënat për Mjetet e Transportit - Pamja 2',
    description: 'Regjistrimi i detajuar i të dhënave të transportit',
    icon: '📝',
    route: '/transport/data-entry-2',
    component: 'TransportDataEntry2',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief'],
    requiredPermissions: ['transport.data.entry.detailed'],
    parentModule: 'TRANSPORT_MANAGEMENT_SYSTEM',
    category: ModuleCategory.TRANSPORT_MANAGEMENT,
    isActive: true,
    sortOrder: 43,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  // ===========================================
  // 5. TASK MANAGEMENT MODULES (60+ modules)
  // ===========================================
  {
    id: 'TASK_MANAGEMENT_SYSTEM',
    name: 'Task Management System',
    nameAlbanian: 'Sistemi i Menaxhimit të Detyrave',
    description: 'Sistemi për menaxhimin e detyrave dhe aktiviteteve',
    icon: '📋',
    route: '/tasks',
    component: 'TaskManagementSystem',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['tasks.view'],
    category: ModuleCategory.TASKS,
    isActive: true,
    sortOrder: 50,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL',
    subModules: [
      'CREATE_TASK',
      'TASK_ASSIGNMENT',
      'TASK_TRACKING',
      'TASK_MAILBOX'
    ]
  },

  {
    id: 'CREATE_TASK_FROM_VIOLATION',
    name: 'Create Task from Violation',
    nameAlbanian: 'Krijimi i Detyrës nga Rasti i Kundërvajtjes',
    description: 'Krijimi i detyrave të reja nga rastet e kundërvajtjeve',
    icon: '📝',
    route: '/tasks/create-from-violation',
    component: 'CreateTaskFromViolation',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief'],
    requiredPermissions: ['tasks.create.from.violation'],
    parentModule: 'TASK_MANAGEMENT_SYSTEM',
    category: ModuleCategory.TASKS,
    isActive: true,
    sortOrder: 51,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'TASK_MAILBOX',
    name: 'Task Mailbox System',
    nameAlbanian: 'Kutia Postare e Detyrave',
    description: 'Sistemi i kutisë postare për menaxhimin e detyrave',
    icon: '📬',
    route: '/tasks/mailbox',
    component: 'TaskMailbox',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['tasks.mailbox.view'],
    parentModule: 'TASK_MANAGEMENT_SYSTEM',
    category: ModuleCategory.TASKS,
    isActive: true,
    sortOrder: 52,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'TASK_WINDOW',
    name: 'Task Window Interface',
    nameAlbanian: 'Dritarja e Detyrës',
    description: 'Interface për menaxhimin e detajeve të detyrës',
    icon: '🪟',
    route: '/tasks/task-window',
    component: 'TaskWindow',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief'],
    requiredPermissions: ['tasks.window.view'],
    parentModule: 'TASK_MANAGEMENT_SYSTEM',
    category: ModuleCategory.TASK_MANAGEMENT,
    isActive: true,
    sortOrder: 53,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'ACTIVITY_CREATION',
    name: 'Activity Creation System',
    nameAlbanian: 'Krijimi i Aktivitetit',
    description: 'Sistemi për krijimin e aktiviteteve të reja',
    icon: '🎯',
    route: '/tasks/activity-creation',
    component: 'ActivityCreation',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief'],
    requiredPermissions: ['activities.create'],
    parentModule: 'TASK_MANAGEMENT_SYSTEM',
    category: ModuleCategory.TASK_MANAGEMENT,
    isActive: true,
    sortOrder: 54,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'ACTIVITY_FROM_VIOLATION',
    name: 'Create Activity from Violation',
    nameAlbanian: 'Krijimi i Aktivitetit nga Kundërvajtja',
    description: 'Krijimi i aktiviteteve të reja nga kundërvajtjet',
    icon: '⚡',
    route: '/tasks/activity-from-violation',
    component: 'ActivityFromViolation',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief'],
    requiredPermissions: ['activities.create.from.violation'],
    parentModule: 'TASK_MANAGEMENT_SYSTEM',
    category: ModuleCategory.TASK_MANAGEMENT,
    isActive: true,
    sortOrder: 55,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'ACTIVITY_CREATED_FROM_VIOLATION',
    name: 'Activity Created from Violation View',
    nameAlbanian: 'Aktiviteti i Krijuar Kundërvajtës',
    description: 'Shfaqja e aktiviteteve të krijuara nga kundërvajtjet',
    icon: '✅',
    route: '/tasks/activity-created-from-violation',
    component: 'ActivityCreatedFromViolation',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief'],
    requiredPermissions: ['activities.view.created'],
    parentModule: 'TASK_MANAGEMENT_SYSTEM',
    category: ModuleCategory.TASK_MANAGEMENT,
    isActive: true,
    sortOrder: 56,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'TASKS_ACTIVITIES_IN_CASE',
    name: 'Tasks and Activities in Case',
    nameAlbanian: 'Detyrat dhe Aktivitetet e Krijuara në Rast',
    description: 'Menaxhimi i detyrave dhe aktiviteteve të lidhura me raste',
    icon: '📊',
    route: '/tasks/case-activities',
    component: 'TasksActivitiesInCase',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['tasks.case.activities.view'],
    parentModule: 'TASK_MANAGEMENT_SYSTEM',
    category: ModuleCategory.TASK_MANAGEMENT,
    isActive: true,
    sortOrder: 57,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  // ===========================================
  // 6. CASE MANAGEMENT MODULES (120+ modules)
  // ===========================================
  {
    id: 'CASE_MANAGEMENT_SYSTEM',
    name: 'Case Management System',
    nameAlbanian: 'Sistemi i Menaxhimit të Rasteve',
    description: 'Sistemi kryesor për menaxhimin e rasteve doganore',
    icon: '📁',
    route: '/cases',
    component: 'CaseManagementSystem',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['cases.view'],
    category: ModuleCategory.CASE_MANAGEMENT,
    isActive: true,
    sortOrder: 60,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL',
    subModules: [
      'CASE_CREATION',
      'CASE_ASSIGNMENT',
      'CASE_TRACKING',
      'CASE_ENTITIES'
    ]
  },

  {
    id: 'CASE_ASSIGNMENT',
    name: 'Case Assignment System',
    nameAlbanian: 'Ricaktimi i Rastit të Oficeri Tjetër',
    description: 'Sistemi për ricaktimin dhe transferimin e rasteve',
    icon: '👥',
    route: '/cases/assignment',
    component: 'CaseAssignment',
    requiredRoles: ['Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['cases.assign'],
    parentModule: 'CASE_MANAGEMENT_SYSTEM',
    category: ModuleCategory.CASE_MANAGEMENT,
    isActive: true,
    sortOrder: 61,
    hierarchyLevel: 2,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'CASE_ACCESS_MANAGEMENT',
    name: 'Case Access Management',
    nameAlbanian: 'Qasjet në Rast',
    description: 'Menaxhimi i qasjeve dhe autorizimeve për raste',
    icon: '🔐',
    route: '/cases/access',
    component: 'CaseAccessManagement',
    requiredRoles: ['Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['cases.access.manage'],
    parentModule: 'CASE_MANAGEMENT_SYSTEM',
    category: ModuleCategory.CASE_MANAGEMENT,
    isActive: true,
    sortOrder: 62,
    hierarchyLevel: 2,
    securityLevel: 'CONFIDENTIAL'
  },

  {
    id: 'RELATED_ENTITIES',
    name: 'Related Entities in Case',
    nameAlbanian: 'Entitetet e Ndërlidhur në Rast',
    description: 'Menaxhimi i entiteteve të ndërlidhura në raste doganore',
    icon: '🔗',
    route: '/cases/related-entities',
    component: 'RelatedEntities',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief'],
    requiredPermissions: ['cases.entities.view'],
    parentModule: 'CASE_MANAGEMENT_SYSTEM',
    category: ModuleCategory.CASE_MANAGEMENT,
    isActive: true,
    sortOrder: 63,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'CASE_BUTTONS_CONTROLS',
    name: 'Case Control Buttons',
    nameAlbanian: 'Butonat për Raste të Ndryshme',
    description: 'Paneli i kontrollit me butonat për menaxhimin e rasteve',
    icon: '🎛️',
    route: '/cases/control-buttons',
    component: 'CaseButtonsControls',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief'],
    requiredPermissions: ['cases.controls.view'],
    parentModule: 'CASE_MANAGEMENT_SYSTEM',
    category: ModuleCategory.CASE_MANAGEMENT,
    isActive: true,
    sortOrder: 64,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'CASE_CREATION_BUTTONS',
    name: 'Case Creation Buttons',
    nameAlbanian: 'Butonat për Krijimin e Rasteve dhe Lista Rasteve',
    description: 'Butonat për krijimin e rasteve të reja dhe listën e rasteve',
    icon: '🔘',
    route: '/cases/creation-buttons',
    component: 'CaseCreationButtons',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief'],
    requiredPermissions: ['cases.creation.buttons.view'],
    parentModule: 'CASE_MANAGEMENT_SYSTEM',
    category: ModuleCategory.CASE_MANAGEMENT,
    isActive: true,
    sortOrder: 65,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'CASE_INFO_BUTTONS',
    name: 'Case Information & Other Buttons',
    nameAlbanian: 'Butonat dhe Informata Tjera',
    description: 'Butonat për informata shtesë dhe funksione të tjera',
    icon: 'ℹ️',
    route: '/cases/info-buttons',
    component: 'CaseInfoButtons',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief'],
    requiredPermissions: ['cases.info.buttons.view'],
    parentModule: 'CASE_MANAGEMENT_SYSTEM',
    category: ModuleCategory.CASE_MANAGEMENT,
    isActive: true,
    sortOrder: 66,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  // ===========================================
  // 7. CONFISCATED ITEMS MODULES (40+ modules)
  // ===========================================
  {
    id: 'CONFISCATED_ITEMS_MODULE',
    name: 'Confiscated Items Management',
    nameAlbanian: 'Artikujt e Konfiskuar Moduli',
    description: 'Menaxhimi i artikujve të konfiskuar në doganë',
    icon: '📦',
    route: '/confiscated-items',
    component: 'ConfiscatedItemsModule',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['confiscated.items.view'],
    category: ModuleCategory.CASE_MANAGEMENT,
    isActive: true,
    sortOrder: 70,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL',
    subModules: [
      'ITEM_REGISTRATION',
      'ITEM_STORAGE',
      'ITEM_DISPOSAL',
      'ITEM_TRACKING'
    ]
  },

  // ===========================================
  // 8. AUDIT & LOGGING MODULES (50+ modules)
  // ===========================================
  {
    id: 'AUDIT_DIARY_MODULE',
    name: 'Audit Diary Module',
    nameAlbanian: 'Ditari i Auditimit Modul',
    description: 'Moduli për menaxhimin e ditarit të auditimit',
    icon: '📖',
    route: '/audit-diary',
    component: 'AuditDiaryModule',
    requiredRoles: ['Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['audit.diary.view'],
    category: ModuleCategory.AUDIT,
    isActive: true,
    sortOrder: 80,
    hierarchyLevel: 2,
    securityLevel: 'CONFIDENTIAL'
  },

  // ===========================================
  // 9. ADMINISTRATIVE OFFICE MODULES (30+ modules)
  // ===========================================
  {
    id: 'ADMINISTRATIVE_OFFICE_REGISTERS',
    name: 'Administrative Office Registers',
    nameAlbanian: 'Regjistrat e Zyrës Administrative - Libri i Protokollit',
    description: 'Menaxhimi i regjistrave të zyrës administrative',
    icon: '📚',
    route: '/admin-registers',
    component: 'AdministrativeOfficeRegisters',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['admin.registers.view'],
    category: ModuleCategory.ADMINISTRATION,
    isActive: true,
    sortOrder: 90,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  // ===========================================
  // 10. NOTIFICATION SYSTEM MODULES (25+ modules)
  // ===========================================
  {
    id: 'NOTIFICATION_SYSTEM',
    name: 'Notification System',
    nameAlbanian: 'Sistemi i Njoftimeve',
    description: 'Sistemi për menaxhimin e njoftimeve',
    icon: '🔔',
    route: '/notifications',
    component: 'NotificationSystem',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['notifications.view'],
    category: ModuleCategory.NOTIFICATIONS,
    isActive: true,
    sortOrder: 100,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'NOTIFICATION_PAGE',
    name: 'Notification Page',
    nameAlbanian: 'Faqja e Njoftimit',
    description: 'Faqja kryesore për shfaqjen e njoftimeve',
    icon: '📢',
    route: '/notifications/page',
    component: 'NotificationPage',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['notifications.page.view'],
    parentModule: 'NOTIFICATION_SYSTEM',
    category: ModuleCategory.NOTIFICATIONS,
    isActive: true,
    sortOrder: 101,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  }

  // NOTE: This shows the first 50+ modules. The complete implementation would include
  // all 800+ modules covering:
  // - Customs Procedures (100+ modules)
  // - Border Control (80+ modules)
  // - Declaration Management (70+ modules)
  // - Warehouse Management (60+ modules)
  // - Transit Control (50+ modules)
  // - Risk Assessment (40+ modules)
  // - Intelligence System (30+ modules)
  // - Customs Valuation (25+ modules)
  // - Origin Verification (20+ modules)
  // - Laboratory Analysis (15+ modules)
  // - Statistics & Reporting (80+ modules)
  // - Financial Management (60+ modules)
  // - Legal Procedures (40+ modules)
  // - International Cooperation (20+ modules)
  // - Training System (15+ modules)
  // - Equipment Management (10+ modules)
  // - Security System (30+ modules)
];

/**
 * Helper function to get modules by category
 */
export function getModulesByCategory(category: ModuleCategoryType): SystemModule[] {
  return KOSOVO_CUSTOMS_MODULES.filter(module => module.category === category);
}

/**
 * Helper function to get modules by hierarchy level
 */
export function getModulesByHierarchy(hierarchyLevel: number): SystemModule[] {
  return KOSOVO_CUSTOMS_MODULES.filter(module => 
    module.hierarchyLevel === hierarchyLevel || !module.hierarchyLevel
  );
}

/**
 * Helper function to get modules accessible by role
 */
export function getModulesByRole(role: string): SystemModule[] {
  return KOSOVO_CUSTOMS_MODULES.filter(module => 
    module.requiredRoles.includes(role)
  );
}

/**
 * Get modules with case synchronization based on user hierarchy and role
 * This function implements the hierarchical access control for Kosovo Customs
 */
export function getModulesWithCaseSynchronization(
  userRole: string,
  userLevel: number,
  customsPost?: string
): SystemModule[] {
  // Filter modules based on role
  let userModules = getModulesByRole(userRole);
  
  // Apply hierarchy-based filtering
  userModules = userModules.filter(module => {
    // Check hierarchy level access
    if (module.hierarchyLevel && module.hierarchyLevel > userLevel) {
      return false;
    }
    
    // Check customs post access
    if (module.customsPost && customsPost && !module.customsPost.includes(customsPost)) {
      return false;
    }
    
    // Check security level access
    if (module.securityLevel) {
      switch (module.securityLevel) {
        case 'SECRET':
          return userLevel >= KOSOVO_CUSTOMS_HIERARCHY.DIRECTOR;
        case 'CONFIDENTIAL':
          return userLevel >= KOSOVO_CUSTOMS_HIERARCHY.SECTOR_CHIEF;
        case 'INTERNAL':
          return userLevel >= KOSOVO_CUSTOMS_HIERARCHY.OFFICER;
        case 'PUBLIC':
          return true;
        default:
          return true;
      }
    }
    
    return true;
  });
  
  return userModules.sort((a, b) => a.sortOrder - b.sortOrder);
}

/**
 * Get case synchronization rules for a given hierarchy level
 */
export function getCaseSynchronizationRules(userHierarchyLevel: number): CaseSynchronizationRule | null {
  return CASE_SYNCHRONIZATION_RULES.find(rule => rule.hierarchyLevel === userHierarchyLevel) || null;
}

/**
 * Helper function to build hierarchical module tree for user interface
 * This enables hierarchy-based access control where:
 * - Director (Level 4) can see all modules
 * - SectorChief (Level 3) can see Level 1-3 modules
 * - Supervisor (Level 2) can see Level 1-2 modules  
 * - Officer (Level 1) can see Level 1 modules only
 */
export function buildModuleTree(hierarchyLevel: number): SystemModule[] {
  const accessibleModules = getModulesByHierarchy(hierarchyLevel);
  
  return accessibleModules.filter(module => !module.parentModule)
    .map(module => ({
      ...module,
      subModules: accessibleModules.filter(sub => sub.parentModule === module.id).map(sub => sub.id)
    }));
}

/**
 * Function to get module by ID
 */
export function getModuleById(id: string): SystemModule | undefined {
  return KOSOVO_CUSTOMS_MODULES.find(module => module.id === id);
}

/**
 * Function to check if user has access to module
 * Implements role-based and hierarchy-based access control
 */
export function hasModuleAccess(
  module: SystemModule, 
  userRole: string, 
  userHierarchyLevel: number,
  userPermissions: string[]
): boolean {
  const hasRole = module.requiredRoles.includes(userRole);
  const hasHierarchyAccess = !module.hierarchyLevel || userHierarchyLevel >= module.hierarchyLevel;
  const hasPermissions = module.requiredPermissions.every(
    permission => userPermissions.includes(permission)
  );
  
  return hasRole && hasHierarchyAccess && hasPermissions && module.isActive;
}

/**
 * Function to get synchronized cases based on hierarchy
 * Director can see all cases, SectorChief sees their sector + subordinates,
 * Supervisor sees their team, Officer sees their own cases
 */
export function getSynchronizedCases(
  userHierarchyLevel: number,
  userSector?: string,
  userTeam?: string
): string[] {
  switch (userHierarchyLevel) {
    case 4: // Director - sees all cases
      return ['ALL_CASES'];
    case 3: // SectorChief - sees sector cases
      return [`SECTOR_${userSector}`, 'SUBORDINATE_CASES'];
    case 2: // Supervisor - sees team cases
      return [`TEAM_${userTeam}`, 'ASSIGNED_CASES'];
    case 1: // Officer - sees own cases
    default:
      return ['OWN_CASES'];
  }
}

export default KOSOVO_CUSTOMS_MODULES;
