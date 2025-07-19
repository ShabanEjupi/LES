/**
 * ADMINISTRATIVE PENALTIES MODULES
 * Modulet e Gjobave Administrative
 * Based on actual Kosovo Customs system photos and requirements
 */

import type { SystemModule } from '../../types/KosovoCustomsModules';
import { ModuleCategory } from '../../types/KosovoCustomsModules';

export const ADMINISTRATIVE_PENALTIES_MODULES: SystemModule[] = [
  {
    id: 'ADMINISTRATIVE_FINE_CREATE',
    name: 'Create Administrative Fine',
    nameAlbanian: 'Krijimi i Gjobes Administrative',
    description: 'Krijimi i gjobes administrative per kundervajtje doganore',
    icon: '💰',
    route: '/fines/administrative/create',
    component: 'AdministrativeFineCreate',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['fines.administrative.create'],
    category: ModuleCategory.FINES,
    isActive: true,
    sortOrder: 1,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'ADMINISTRATIVE_FINE_CREATE_ADVANCED',
    name: 'Advanced Administrative Fine Creation',
    nameAlbanian: 'Krijimi i Gjobes Administrative Pamja 2',
    description: 'Formular i avancuar per krijimin e gjobes administrative',
    icon: '💰',
    route: '/fines/administrative/create-advanced',
    component: 'AdministrativeFineCreateAdvanced',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['fines.administrative.create.advanced'],
    category: ModuleCategory.FINES,
    isActive: true,
    sortOrder: 2,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'ADMINISTRATIVE_FINE_DATA',
    name: 'Administrative Fine Data',
    nameAlbanian: 'Te Dhenat e Gjobes Administrative',
    description: 'Te dhenat e detajuara te gjobes administrative',
    icon: '📋',
    route: '/fines/administrative/:id/data',
    component: 'AdministrativeFineData',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['fines.administrative.view'],
    category: ModuleCategory.FINES,
    isActive: true,
    sortOrder: 3,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'ADMINISTRATIVE_FINE_LIST',
    name: 'Administrative Fines List',
    nameAlbanian: 'Lista e Gjobave Administrative',
    description: 'Lista e te gjitha gjobave administrative te lëshuara',
    icon: '📋',
    route: '/fines/administrative',
    component: 'AdministrativeFinesList',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['fines.administrative.list'],
    category: ModuleCategory.FINES,
    isActive: true,
    sortOrder: 4,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'ADMINISTRATIVE_FINE_PAYMENT',
    name: 'Administrative Fine Payment',
    nameAlbanian: 'Pagesa e Gjobes Administrative',
    description: 'Regjistrimi i pagesave te gjobave administrative',
    icon: '💳',
    route: '/fines/administrative/:id/payment',
    component: 'AdministrativeFinePayment',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['fines.administrative.payment'],
    category: ModuleCategory.FINES,
    isActive: true,
    sortOrder: 5,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'ADMINISTRATIVE_FINE_STATUS',
    name: 'Administrative Fine Status',
    nameAlbanian: 'Statusi i Gjobes Administrative',
    description: 'Gjendja dhe statusi i gjobes administrative',
    icon: '📊',
    route: '/fines/administrative/:id/status',
    component: 'AdministrativeFineStatus',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['fines.administrative.status'],
    category: ModuleCategory.FINES,
    isActive: true,
    sortOrder: 6,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'ADMINISTRATIVE_FINE_APPEAL',
    name: 'Administrative Fine Appeal',
    nameAlbanian: 'Ankesa per Gjoben Administrative',
    description: 'Procesimi i ankesave per gjobet administrative',
    icon: '⚖️',
    route: '/fines/administrative/:id/appeal',
    component: 'AdministrativeFineAppeal',
    requiredRoles: ['Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['fines.administrative.appeal'],
    category: ModuleCategory.APPEALS,
    isActive: true,
    sortOrder: 1,
    hierarchyLevel: 2,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'ADMINISTRATIVE_FINE_CANCELLATION',
    name: 'Administrative Fine Cancellation',
    nameAlbanian: 'Anulimi i Gjobes Administrative',
    description: 'Anulimi i gjobes administrative ne raste te vecanta',
    icon: '❌',
    route: '/fines/administrative/:id/cancel',
    component: 'AdministrativeFineCancellation',
    requiredRoles: ['SectorChief', 'Director'],
    requiredPermissions: ['fines.administrative.cancel'],
    category: ModuleCategory.FINES,
    isActive: true,
    sortOrder: 7,
    hierarchyLevel: 3,
    securityLevel: 'CONFIDENTIAL'
  },

  {
    id: 'ADMINISTRATIVE_OFFICE_REGISTRY',
    name: 'Administrative Office Registry',
    nameAlbanian: 'Regjistrat e Zyres Administrative',
    description: 'Regjistrat zyrtar te zyres administrative te doganave',
    icon: '📚',
    route: '/registry/administrative-office',
    component: 'AdministrativeOfficeRegistry',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['registry.administrative.view'],
    category: ModuleCategory.REGISTRY,
    isActive: true,
    sortOrder: 1,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'PROTOCOL_BOOK',
    name: 'Protocol Book',
    nameAlbanian: 'Libri i Protokollit',
    description: 'Libri i protokollit te zyres administrative doganore',
    icon: '📖',
    route: '/registry/protocol-book',
    component: 'ProtocolBook',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['registry.protocol.view'],
    category: ModuleCategory.REGISTRY,
    isActive: true,
    sortOrder: 2,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  }
];
