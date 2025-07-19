/**
 * TRANSPORT AND VEHICLE MODULES
 * Modulet e Transportit dhe Mjeteve
 * Based on actual Kosovo Customs system photos and requirements
 */

import type { SystemModule } from '../../types/KosovoCustomsModules';
import { ModuleCategory } from '../../types/KosovoCustomsModules';

export const TRANSPORT_VEHICLE_MODULES: SystemModule[] = [
  {
    id: 'TRANSPORT_VEHICLE_DETAILS',
    name: 'Transport Vehicle Details',
    nameAlbanian: 'Detajet e Mjetit te Transportit',
    description: 'Te dhenat e detajuara te mjetit te transportit',
    icon: '🚛',
    route: '/vehicles/:id/details',
    component: 'TransportVehicleDetails',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['vehicles.view'],
    category: ModuleCategory.TRANSPORT,
    isActive: true,
    sortOrder: 1,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'TRANSPORT_VEHICLE_DATA',
    name: 'Transport Vehicle Data',
    nameAlbanian: 'Te Dhenat per Mjetet e Transportit',
    description: 'Te dhenat e pergjithshme per mjetet e transportit',
    icon: '🚛',
    route: '/vehicles/data',
    component: 'TransportVehicleData',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['vehicles.data.view'],
    category: ModuleCategory.TRANSPORT,
    isActive: true,
    sortOrder: 2,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'TRANSPORT_VEHICLE_DATA_EXTENDED',
    name: 'Extended Transport Vehicle Data',
    nameAlbanian: 'Te Dhenat per Mjetet e Transportit Pamja 2',
    description: 'Te dhenat e zgjera per mjetet e transportit',
    icon: '🚛',
    route: '/vehicles/data-extended',
    component: 'TransportVehicleDataExtended',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['vehicles.data.extended'],
    category: ModuleCategory.TRANSPORT,
    isActive: true,
    sortOrder: 3,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'VEHICLE_REGISTRATION',
    name: 'Vehicle Registration',
    nameAlbanian: 'Regjistrimi i Mjetit',
    description: 'Regjistrimi i ri i mjetit te transportit',
    icon: '📝',
    route: '/vehicles/register',
    component: 'VehicleRegistration',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['vehicles.register'],
    category: ModuleCategory.TRANSPORT,
    isActive: true,
    sortOrder: 4,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'VEHICLE_SEARCH',
    name: 'Vehicle Search',
    nameAlbanian: 'Kerkimi i Mjeteve',
    description: 'Kerkimi dhe filtrimi i mjeteve te transportit',
    icon: '🔍',
    route: '/vehicles/search',
    component: 'VehicleSearch',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['vehicles.search'],
    category: ModuleCategory.SEARCH,
    isActive: true,
    sortOrder: 15,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'VEHICLE_LIST',
    name: 'Vehicles List',
    nameAlbanian: 'Lista e Mjeteve',
    description: 'Lista e te gjitha mjeteve te regjistruara',
    icon: '📋',
    route: '/vehicles',
    component: 'VehiclesList',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['vehicles.list'],
    category: ModuleCategory.TRANSPORT,
    isActive: true,
    sortOrder: 5,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'VEHICLE_INSPECTION',
    name: 'Vehicle Inspection',
    nameAlbanian: 'Inspektimi i Mjetit',
    description: 'Inspektimi doganor i mjetit te transportit',
    icon: '🔍',
    route: '/vehicles/:id/inspection',
    component: 'VehicleInspection',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['vehicles.inspection'],
    category: ModuleCategory.INSPECTIONS,
    isActive: true,
    sortOrder: 1,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'VEHICLE_DOCUMENTATION',
    name: 'Vehicle Documentation',
    nameAlbanian: 'Dokumentimi i Mjetit',
    description: 'Dokumentet e mjetit te transportit',
    icon: '📄',
    route: '/vehicles/:id/documentation',
    component: 'VehicleDocumentation',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['vehicles.documentation'],
    category: ModuleCategory.DOCUMENTS,
    isActive: true,
    sortOrder: 10,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'VEHICLE_CUSTOMS_CLEARANCE',
    name: 'Vehicle Customs Clearance',
    nameAlbanian: 'Lirimi Doganor i Mjetit',
    description: 'Procedurat per lirimin doganor te mjetit',
    icon: '✅',
    route: '/vehicles/:id/clearance',
    component: 'VehicleCustomsClearance',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['vehicles.clearance'],
    category: ModuleCategory.CLEARANCE,
    isActive: true,
    sortOrder: 1,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'VEHICLE_TRACKING',
    name: 'Vehicle Tracking',
    nameAlbanian: 'Gjurmimi i Mjetit',
    description: 'Gjurmimi i levizjeve te mjetit ne sistem',
    icon: '📍',
    route: '/vehicles/:id/tracking',
    component: 'VehicleTracking',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['vehicles.tracking'],
    category: ModuleCategory.TRANSPORT,
    isActive: true,
    sortOrder: 6,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'VEHICLE_HISTORY',
    name: 'Vehicle History',
    nameAlbanian: 'Historiku i Mjetit',
    description: 'Historiku i plotë i aktiviteteve te mjetit',
    icon: '📚',
    route: '/vehicles/:id/history',
    component: 'VehicleHistory',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['vehicles.history'],
    category: ModuleCategory.TRANSPORT,
    isActive: true,
    sortOrder: 7,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'VEHICLE_VIOLATION_LINK',
    name: 'Vehicle Violation Link',
    nameAlbanian: 'Lidhja e Mjetit me Kundervajtjen',
    description: 'Lidhja e mjetit te transportit me rastin e kundervajtjes',
    icon: '🔗',
    route: '/vehicles/:id/violation-link',
    component: 'VehicleViolationLink',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['vehicles.violation.link'],
    category: ModuleCategory.TRANSPORT,
    isActive: true,
    sortOrder: 8,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'TRANSPORT_COMPANY_DETAILS',
    name: 'Transport Company Details',
    nameAlbanian: 'Detajet e Kompanise se Transportit',
    description: 'Te dhenat e kompanise se transportit',
    icon: '🏢',
    route: '/transport/companies/:id',
    component: 'TransportCompanyDetails',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['transport.companies.view'],
    category: ModuleCategory.TRANSPORT,
    isActive: true,
    sortOrder: 9,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'TRANSPORT_PERMITS',
    name: 'Transport Permits',
    nameAlbanian: 'Lejet e Transportit',
    description: 'Menaxhimi i lejeve te transportit',
    icon: '📜',
    route: '/transport/permits',
    component: 'TransportPermits',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['transport.permits.view'],
    category: ModuleCategory.LICENSES,
    isActive: true,
    sortOrder: 1,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'DRIVER_INFORMATION',
    name: 'Driver Information',
    nameAlbanian: 'Informata mbi Drejtuesian',
    description: 'Te dhenat dhe informata mbi drejtuesian e mjetit',
    icon: '👤',
    route: '/vehicles/:id/driver',
    component: 'DriverInformation',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['vehicles.driver.view'],
    category: ModuleCategory.TRANSPORT,
    isActive: true,
    sortOrder: 10,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  }
];
