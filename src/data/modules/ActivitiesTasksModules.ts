/**
 * ACTIVITIES AND TASKS MODULES
 * Modulet e Aktiviteteve dhe Detyrave
 * Based on actual Kosovo Customs system photos and requirements
 */

import type { SystemModule } from '../../types/KosovoCustomsModules';
import { ModuleCategory } from '../../types/KosovoCustomsModules';

export const ACTIVITIES_TASKS_MODULES: SystemModule[] = [
  {
    id: 'ACTIVITY_CREATION',
    name: 'Activity Creation',
    nameAlbanian: 'Krijimi i Aktivitetit',
    description: 'Krijimi i aktivitetit te ri ne sistem',
    icon: '📝',
    route: '/activities/create',
    component: 'ActivityCreation',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['activities.create'],
    category: ModuleCategory.ACTIVITIES,
    isActive: true,
    sortOrder: 1,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'ACTIVITY_FROM_VIOLATION',
    name: 'Activity from Violation',
    nameAlbanian: 'Krijimi i Aktivitetit nga Kundervajtja',
    description: 'Krijimi i aktivitetit nga rasti i kundervajtjes',
    icon: '📝',
    route: '/activities/create-from-violation/:violationId',
    component: 'ActivityFromViolation',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['activities.create.from_violation'],
    category: ModuleCategory.ACTIVITIES,
    isActive: true,
    sortOrder: 2,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'ACTIVITY_CREATED_FROM_VIOLATION',
    name: 'Activity Created from Violation',
    nameAlbanian: 'Aktiviteti i Krijuar Kundervajtes',
    description: 'Pamja e aktivitetit te krijuar nga kundervajtja',
    icon: '✅',
    route: '/activities/:id/created-from-violation',
    component: 'ActivityCreatedFromViolation',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['activities.view'],
    category: ModuleCategory.ACTIVITIES,
    isActive: true,
    sortOrder: 3,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'TASK_CREATION',
    name: 'Task Creation',
    nameAlbanian: 'Krijimi i Detyres nga Rasti',
    description: 'Krijimi i detyres nga rasti i kundervajtjes',
    icon: '📋',
    route: '/tasks/create',
    component: 'TaskCreation',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['tasks.create'],
    category: ModuleCategory.TASKS,
    isActive: true,
    sortOrder: 1,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'TASK_FROM_VIOLATION_CASE',
    name: 'Task from Violation Case',
    nameAlbanian: 'Krijimi i Detyres nga Rasti i Kundervajtjes',
    description: 'Krijimi i detyres specifike nga rasti i kundervajtjes',
    icon: '📋',
    route: '/tasks/create-from-violation/:violationId',
    component: 'TaskFromViolationCase',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['tasks.create.from_violation'],
    category: ModuleCategory.TASKS,
    isActive: true,
    sortOrder: 2,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'TASK_WINDOW',
    name: 'Task Window',
    nameAlbanian: 'Dritarja e Detyres',
    description: 'Dritarja kryesore per menaxhimin e detyres',
    icon: '🪟',
    route: '/tasks/:id/window',
    component: 'TaskWindow',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['tasks.view'],
    category: ModuleCategory.TASKS,
    isActive: true,
    sortOrder: 3,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'TASK_MAILBOX',
    name: 'Task Mailbox',
    nameAlbanian: 'Kutia Postare e Detyrave',
    description: 'Kutia postare per marrjen dhe dergimin e detyrave',
    icon: '📫',
    route: '/tasks/mailbox',
    component: 'TaskMailbox',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['tasks.mailbox.view'],
    category: ModuleCategory.TASKS,
    isActive: true,
    sortOrder: 4,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'TASK_ACTIVITY_LIST',
    name: 'Tasks and Activities in Case',
    nameAlbanian: 'Detyrat dhe Aktivitetet e Krijuara ne Rast',
    description: 'Lista e te gjitha detyrave dhe aktiviteteve ne rast',
    icon: '📋',
    route: '/cases/:id/tasks-activities',
    component: 'TaskActivityList',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['cases.tasks.view'],
    category: ModuleCategory.CASE_MANAGEMENT,
    isActive: true,
    sortOrder: 10,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'TASK_ASSIGNMENT',
    name: 'Task Assignment',
    nameAlbanian: 'Caktimi i Detyres',
    description: 'Caktimi i detyres zyrtarit pergjegjes',
    icon: '👤',
    route: '/tasks/:id/assign',
    component: 'TaskAssignment',
    requiredRoles: ['Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['tasks.assign'],
    category: ModuleCategory.TASKS,
    isActive: true,
    sortOrder: 5,
    hierarchyLevel: 2,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'TASK_STATUS_UPDATE',
    name: 'Task Status Update',
    nameAlbanian: 'Perditesimi i Statusit te Detyres',
    description: 'Perditesimi i statusit dhe progresit te detyres',
    icon: '🔄',
    route: '/tasks/:id/status',
    component: 'TaskStatusUpdate',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['tasks.status.update'],
    category: ModuleCategory.TASKS,
    isActive: true,
    sortOrder: 6,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'TASK_COMPLETION',
    name: 'Task Completion',
    nameAlbanian: 'Perfundimi i Detyres',
    description: 'Perfundimi dhe raportimi i detyres se kryer',
    icon: '✅',
    route: '/tasks/:id/complete',
    component: 'TaskCompletion',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['tasks.complete'],
    category: ModuleCategory.TASKS,
    isActive: true,
    sortOrder: 7,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'ACTIVITY_LIST',
    name: 'Activities List',
    nameAlbanian: 'Lista e Aktiviteteve',
    description: 'Lista e te gjitha aktiviteteve te sistemit',
    icon: '📋',
    route: '/activities',
    component: 'ActivitiesList',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['activities.list'],
    category: ModuleCategory.ACTIVITIES,
    isActive: true,
    sortOrder: 4,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'ACTIVITY_DETAILS',
    name: 'Activity Details',
    nameAlbanian: 'Detajet e Aktivitetit',
    description: 'Detajet e plota te aktivitetit te zgjedhur',
    icon: '🔍',
    route: '/activities/:id',
    component: 'ActivityDetails',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['activities.view'],
    category: ModuleCategory.ACTIVITIES,
    isActive: true,
    sortOrder: 5,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'ACTIVITY_TRACKING',
    name: 'Activity Tracking',
    nameAlbanian: 'Gjurmimi i Aktivitetit',
    description: 'Gjurmimi i progresit te aktivitetit',
    icon: '📊',
    route: '/activities/:id/tracking',
    component: 'ActivityTracking',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['activities.track'],
    category: ModuleCategory.ACTIVITIES,
    isActive: true,
    sortOrder: 6,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  }
];
