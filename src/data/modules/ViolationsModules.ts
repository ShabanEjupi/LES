/**
 * VIOLATIONS AND INFRACTIONS MODULES
 * Modulet e Kundervajtjeve dhe Kunderveprimeve
 * Based on actual Kosovo Customs system photos and requirements
 */

import type { SystemModule } from '../../types/KosovoCustomsModules';
import { ModuleCategory } from '../../types/KosovoCustomsModules';

export const VIOLATIONS_MODULES: SystemModule[] = [
  // Main Violation Management
  {
    id: 'VIOLATIONS_LIST',
    name: 'Violations List',
    nameAlbanian: 'Lista e Kundervajt jeve',
    description: 'Renditja e kundervajtjeve te krijuara - Lista kryesore e rasteve',
    icon: '📋',
    route: '/violations',
    component: 'ViolationsList',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violations.view'],
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 1,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'VIOLATION_CREATE',
    name: 'Create New Violation',
    nameAlbanian: 'Krijimi i Kundervajtjes',
    description: 'Krijimi i rastit te ri te kundervajtjes - Formulari per regjistrimin e rastit',
    icon: '➕',
    route: '/violations/create',
    component: 'ViolationCreateForm',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violations.create'],
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 2,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'VIOLATION_PROCESS_START',
    name: 'Start Violation Process',
    nameAlbanian: 'Fillimi i Procesit per Kundervajtje',
    description: 'Fillimi i procesit administrative per kundervajtje doganore',
    icon: '🚀',
    route: '/violations/start-process',
    component: 'ViolationProcessStart',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violations.process.start'],
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 3,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'VIOLATION_DETAILS',
    name: 'Violation Details',
    nameAlbanian: 'Te Dhenat e Kundervajtjes',
    description: 'Detajet e plota te rastit te kundervajtjes',
    icon: '🔍',
    route: '/violations/:id',
    component: 'ViolationDetails',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violations.view'],
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 4,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'VIOLATION_TYPE_CHANGE',
    name: 'Change Violation Type',
    nameAlbanian: 'Ndryshimi i Llojit te Kundervajtjes',
    description: 'Ndryshimi i kategorise se kundervajtjes sipas rrethanave',
    icon: '🔄',
    route: '/violations/:id/change-type',
    component: 'ViolationTypeChange',
    requiredRoles: ['Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violations.modify'],
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 5,
    hierarchyLevel: 2,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'VIOLATION_REPORT',
    name: 'Violation Report',
    nameAlbanian: 'Raporti i Kundervajtjes',
    description: 'Raport i detajuar per rastin e kundervajtjes',
    icon: '📄',
    route: '/violations/:id/report',
    component: 'ViolationReport',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violations.report.view'],
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 6,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'VIOLATION_OFFICIAL_REPORT',
    name: 'Official Violation Report PDF',
    nameAlbanian: 'Forma Zyrtare e Raportit te Kundervajtjes',
    description: 'Forma zyrtare e raportit te kundervajtjes e gjeneruar ne PDF',
    icon: '📑',
    route: '/violations/:id/official-report',
    component: 'ViolationOfficialReport',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violations.report.official'],
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 7,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'VIOLATION_SUBJECT_SELECTION',
    name: 'Subject Selection',
    nameAlbanian: 'Perzgjedhja e Subjektit Kundervajtes',
    description: 'Perzgjedhja dhe caktimi i subjektit kundervajtes',
    icon: '👤',
    route: '/violations/subject-selection',
    component: 'ViolationSubjectSelection',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violations.subject.select'],
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 8,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'VIOLATION_COMPANY_SELECTION',
    name: 'Company Selection',
    nameAlbanian: 'Selektimi i Kompanise',
    description: 'Selektimi i kompanise se perfsire ne kundervajtje',
    icon: '🏢',
    route: '/violations/company-selection',
    component: 'ViolationCompanySelection',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violations.company.select'],
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 9,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'VIOLATION_REASSIGNMENT',
    name: 'Case Reassignment',
    nameAlbanian: 'Ricaktimi i Rastit te Oficeri Tjeter',
    description: 'Ricaktimi i rastit te kundervajtjes oficeri tjeter',
    icon: '🔄',
    route: '/violations/:id/reassign',
    component: 'ViolationReassignment',
    requiredRoles: ['Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violations.reassign'],
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 10,
    hierarchyLevel: 2,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'VIOLATION_CASE_ACCESS',
    name: 'Case Access Control',
    nameAlbanian: 'Qasjet ne Rast',
    description: 'Menaxhimi i qasjeve dhe autorizimeve per rastin',
    icon: '🔐',
    route: '/violations/:id/access',
    component: 'ViolationCaseAccess',
    requiredRoles: ['Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violations.access.manage'],
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 11,
    hierarchyLevel: 2,
    securityLevel: 'CONFIDENTIAL'
  },

  {
    id: 'VIOLATION_ENTITIES_LINKED',
    name: 'Linked Entities',
    nameAlbanian: 'Entitetet e Nderlidhur ne Rast',
    description: 'Entitetet dhe subjektet e nderlidhur me rastin e kundervajtjes',
    icon: '🔗',
    route: '/violations/:id/entities',
    component: 'ViolationLinkedEntities',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violations.entities.view'],
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 12,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'VIOLATION_GENERAL_DATA',
    name: 'General Violation Data',
    nameAlbanian: 'Te Dhenat Gjenerale',
    description: 'Te dhenat e pergjithshme te rastit te kundervajtjes',
    icon: '📊',
    route: '/violations/:id/general-data',
    component: 'ViolationGeneralData',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violations.data.view'],
    category: ModuleCategory.VIOLATIONS,
    isActive: true,
    sortOrder: 13,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  // Search and Filter Modules
  {
    id: 'VIOLATION_SEARCH_FILTERS',
    name: 'Search Filters',
    nameAlbanian: 'Filtrat e Kerkimit',
    description: 'Filtrat e avancuar per kerkimin e kundervajtjeve',
    icon: '🔍',
    route: '/violations/search',
    component: 'ViolationSearchFilters',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violations.search'],
    category: ModuleCategory.SEARCH,
    isActive: true,
    sortOrder: 1,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'VIOLATION_SEARCH_ADVANCED_1',
    name: 'Advanced Search View 1',
    nameAlbanian: 'Filtrat e Kerkimit Pamja 2',
    description: 'Pamja e avancuar e kerkimit me filtra te detajuar',
    icon: '🔍',
    route: '/violations/search/advanced-1',
    component: 'ViolationSearchAdvanced1',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violations.search.advanced'],
    category: ModuleCategory.SEARCH,
    isActive: true,
    sortOrder: 2,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'VIOLATION_SEARCH_ADVANCED_2',
    name: 'Advanced Search View 2',
    nameAlbanian: 'Filtrat e Kerkimit Pamja 3',
    description: 'Pamja e dyte e kerkimit te avancuar',
    icon: '🔍',
    route: '/violations/search/advanced-2',
    component: 'ViolationSearchAdvanced2',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violations.search.advanced'],
    category: ModuleCategory.SEARCH,
    isActive: true,
    sortOrder: 3,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'VIOLATION_SEARCH_ADVANCED_3',
    name: 'Advanced Search View 3',
    nameAlbanian: 'Filtrat e Kerkimit Pamja 4',
    description: 'Pamja e trete e kerkimit te avancuar',
    icon: '🔍',
    route: '/violations/search/advanced-3',
    component: 'ViolationSearchAdvanced3',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violations.search.advanced'],
    category: ModuleCategory.SEARCH,
    isActive: true,
    sortOrder: 4,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'VIOLATION_SEARCH_ADVANCED_4',
    name: 'Advanced Search View 4',
    nameAlbanian: 'Filtrat e Kerkimit Pamja 5',
    description: 'Pamja e katert e kerkimit te avancuar',
    icon: '🔍',
    route: '/violations/search/advanced-4',
    component: 'ViolationSearchAdvanced4',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violations.search.advanced'],
    category: ModuleCategory.SEARCH,
    isActive: true,
    sortOrder: 5,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'VIOLATION_SEARCH_FILTERS_6',
    name: 'Search Filters View 6',
    nameAlbanian: 'Filtrat e Kerkimit Pamja 6',
    description: 'Pamja e gjashte e filtrave te kerkimit',
    icon: '🔍',
    route: '/violations/search/filters-6',
    component: 'ViolationSearchFilters6',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violations.search.filters'],
    category: ModuleCategory.SEARCH,
    isActive: true,
    sortOrder: 6,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'VIOLATION_SEARCH_FILTERS_7',
    name: 'Search Filters View 7',
    nameAlbanian: 'Filtrat e Kerkimit Pamja 7',
    description: 'Pamja e shtate e filtrave te kerkimit',
    icon: '🔍',
    route: '/violations/search/filters-7',
    component: 'ViolationSearchFilters7',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violations.search.filters'],
    category: ModuleCategory.SEARCH,
    isActive: true,
    sortOrder: 7,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'VIOLATION_SEARCH_FILTERS_9',
    name: 'Search Filters View 9',
    nameAlbanian: 'Filtrat e Kerkimit Pamja 9',
    description: 'Pamja e nente e filtrave te kerkimit',
    icon: '🔍',
    route: '/violations/search/filters-9',
    component: 'ViolationSearchFilters9',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violations.search.filters'],
    category: ModuleCategory.SEARCH,
    isActive: true,
    sortOrder: 8,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'VIOLATION_SEARCH_FILTERS_10',
    name: 'Search Filters View 10',
    nameAlbanian: 'Filtrat e Kerkimit Pamja 10',
    description: 'Pamja e dhjetë e filtrave te kerkimit',
    icon: '🔍',
    route: '/violations/search/filters-10',
    component: 'ViolationSearchFilters10',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violations.search.filters'],
    category: ModuleCategory.SEARCH,
    isActive: true,
    sortOrder: 9,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'VIOLATION_SEARCH_FILTERS_11',
    name: 'Search Filters View 11',
    nameAlbanian: 'Filtrat e Kerkimit Pamja 11',
    description: 'Pamja e njembëdhjetë e filtrave te kerkimit',
    icon: '🔍',
    route: '/violations/search/filters-11',
    component: 'ViolationSearchFilters11',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violations.search.filters'],
    category: ModuleCategory.SEARCH,
    isActive: true,
    sortOrder: 10,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'VIOLATION_SEARCH_FILTERS_12',
    name: 'Search Filters View 12',
    nameAlbanian: 'Filtrat e Kerkimit Pamja 12',
    description: 'Pamja e dymbëdhjetë e filtrave te kerkimit',
    icon: '🔍',
    route: '/violations/search/filters-12',
    component: 'ViolationSearchFilters12',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violations.search.filters'],
    category: ModuleCategory.SEARCH,
    isActive: true,
    sortOrder: 11,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'VIOLATION_SEARCH_FILTERS_13',
    name: 'Search Filters View 13',
    nameAlbanian: 'Filtrat e Kerkimit Pamja 13',
    description: 'Pamja e trembëdhjetë e filtrave te kerkimit',
    icon: '🔍',
    route: '/violations/search/filters-13',
    component: 'ViolationSearchFilters13',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violations.search.filters'],
    category: ModuleCategory.SEARCH,
    isActive: true,
    sortOrder: 12,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'VIOLATION_SEARCH_FILTERS_14',
    name: 'Search Filters View 14',
    nameAlbanian: 'Filtrat e Kerkimit Pamja 14',
    description: 'Pamja e katërmbëdhjetë e filtrave te kerkimit',
    icon: '🔍',
    route: '/violations/search/filters-14',
    component: 'ViolationSearchFilters14',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['violations.search.filters'],
    category: ModuleCategory.SEARCH,
    isActive: true,
    sortOrder: 13,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  }
];
