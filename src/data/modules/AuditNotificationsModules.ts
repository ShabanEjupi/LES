/**
 * AUDIT AND NOTIFICATIONS MODULES
 * Modulet e Auditimit dhe Njoftimeve
 * Based on actual Kosovo Customs system photos and requirements
 */

import type { SystemModule } from '../../types/KosovoCustomsModules';
import { ModuleCategory } from '../../types/KosovoCustomsModules';

export const AUDIT_NOTIFICATIONS_MODULES: SystemModule[] = [
  {
    id: 'AUDIT_TRAIL_DIARY',
    name: 'Audit Trail Diary',
    nameAlbanian: 'Ditari i Auditimit Modul',
    description: 'Ditari i auditimit per gjurmimin e veprimeve ne sistem',
    icon: '📔',
    route: '/audit/diary',
    component: 'AuditTrailDiary',
    requiredRoles: ['Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['audit.diary.view'],
    category: ModuleCategory.AUDIT,
    isActive: true,
    sortOrder: 1,
    hierarchyLevel: 2,
    securityLevel: 'CONFIDENTIAL'
  },

  {
    id: 'AUDIT_TRAIL',
    name: 'Audit Trail',
    nameAlbanian: 'Gjurmet e Auditimit',
    description: 'Gjurmimi i te gjitha veprimeve ne sistem',
    icon: '🔍',
    route: '/audit/trail',
    component: 'AuditTrail',
    requiredRoles: ['Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['audit.trail.view'],
    category: ModuleCategory.AUDIT,
    isActive: true,
    sortOrder: 2,
    hierarchyLevel: 2,
    securityLevel: 'CONFIDENTIAL'
  },

  {
    id: 'AUDIT_LOGS',
    name: 'Audit Logs',
    nameAlbanian: 'Regjistrat e Auditimit',
    description: 'Regjistrat e detajuar te auditimit te sistemit',
    icon: '📊',
    route: '/audit/logs',
    component: 'AuditLogs',
    requiredRoles: ['Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['audit.logs.view'],
    category: ModuleCategory.AUDIT,
    isActive: true,
    sortOrder: 3,
    hierarchyLevel: 2,
    securityLevel: 'CONFIDENTIAL'
  },

  {
    id: 'USER_ACTIVITY_AUDIT',
    name: 'User Activity Audit',
    nameAlbanian: 'Auditimi i Aktivitetit te Perdoruesve',
    description: 'Auditimi i aktiviteteve te perdoruesve te sistemit',
    icon: '👥',
    route: '/audit/user-activity',
    component: 'UserActivityAudit',
    requiredRoles: ['SectorChief', 'Director'],
    requiredPermissions: ['audit.user_activity.view'],
    category: ModuleCategory.AUDIT,
    isActive: true,
    sortOrder: 4,
    hierarchyLevel: 3,
    securityLevel: 'CONFIDENTIAL'
  },

  {
    id: 'SYSTEM_CHANGES_AUDIT',
    name: 'System Changes Audit',
    nameAlbanian: 'Auditimi i Ndryshimeve te Sistemit',
    description: 'Auditimi i ndryshimeve ne sistem',
    icon: '⚙️',
    route: '/audit/system-changes',
    component: 'SystemChangesAudit',
    requiredRoles: ['SectorChief', 'Director'],
    requiredPermissions: ['audit.system_changes.view'],
    category: ModuleCategory.AUDIT,
    isActive: true,
    sortOrder: 5,
    hierarchyLevel: 3,
    securityLevel: 'SECRET'
  },

  {
    id: 'SECURITY_AUDIT',
    name: 'Security Audit',
    nameAlbanian: 'Auditimi i Sigurise',
    description: 'Auditimi i sigurise se sistemit',
    icon: '🔒',
    route: '/audit/security',
    component: 'SecurityAudit',
    requiredRoles: ['Director'],
    requiredPermissions: ['audit.security.view'],
    category: ModuleCategory.AUDIT,
    isActive: true,
    sortOrder: 6,
    hierarchyLevel: 4,
    securityLevel: 'SECRET'
  },

  {
    id: 'NOTIFICATION_PAGE',
    name: 'Notification Page',
    nameAlbanian: 'Faqja e Njoftimit',
    description: 'Faqja kryesore e njoftimeve te sistemit',
    icon: '📢',
    route: '/notifications',
    component: 'NotificationPage',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['notifications.view'],
    category: ModuleCategory.NOTIFICATIONS,
    isActive: true,
    sortOrder: 1,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'NOTIFICATION_CENTER',
    name: 'Notification Center',
    nameAlbanian: 'Qendra e Njoftimeve',
    description: 'Qendra e njoftimeve per te gjitha modulet',
    icon: '🔔',
    route: '/notifications/center',
    component: 'NotificationCenter',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['notifications.center.view'],
    category: ModuleCategory.NOTIFICATIONS,
    isActive: true,
    sortOrder: 2,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'SYSTEM_NOTIFICATIONS',
    name: 'System Notifications',
    nameAlbanian: 'Njoftimet e Sistemit',
    description: 'Njoftimet e pergjithshme te sistemit',
    icon: '🖥️',
    route: '/notifications/system',
    component: 'SystemNotifications',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['notifications.system.view'],
    category: ModuleCategory.NOTIFICATIONS,
    isActive: true,
    sortOrder: 3,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'CASE_NOTIFICATIONS',
    name: 'Case Notifications',
    nameAlbanian: 'Njoftimet e Rasteve',
    description: 'Njoftimet e lidhura me rastet',
    icon: '📁',
    route: '/notifications/cases',
    component: 'CaseNotifications',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['notifications.cases.view'],
    category: ModuleCategory.NOTIFICATIONS,
    isActive: true,
    sortOrder: 4,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'TASK_NOTIFICATIONS',
    name: 'Task Notifications',
    nameAlbanian: 'Njoftimet e Detyrave',
    description: 'Njoftimet e lidhura me detyrat',
    icon: '📋',
    route: '/notifications/tasks',
    component: 'TaskNotifications',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['notifications.tasks.view'],
    category: ModuleCategory.NOTIFICATIONS,
    isActive: true,
    sortOrder: 5,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'URGENT_NOTIFICATIONS',
    name: 'Urgent Notifications',
    nameAlbanian: 'Njoftimet Urgjente',
    description: 'Njoftimet urgjente te sistemit',
    icon: '🚨',
    route: '/notifications/urgent',
    component: 'UrgentNotifications',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['notifications.urgent.view'],
    category: ModuleCategory.NOTIFICATIONS,
    isActive: true,
    sortOrder: 6,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'NOTIFICATION_SETTINGS',
    name: 'Notification Settings',
    nameAlbanian: 'Cilesimet e Njoftimeve',
    description: 'Cilesimet e njoftimeve te perdoruesit',
    icon: '⚙️',
    route: '/notifications/settings',
    component: 'NotificationSettings',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['notifications.settings.edit'],
    category: ModuleCategory.SETTINGS,
    isActive: true,
    sortOrder: 10,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'NOTIFICATION_HISTORY',
    name: 'Notification History',
    nameAlbanian: 'Historiku i Njoftimeve',
    description: 'Historiku i te gjitha njoftimeve',
    icon: '📚',
    route: '/notifications/history',
    component: 'NotificationHistory',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['notifications.history.view'],
    category: ModuleCategory.NOTIFICATIONS,
    isActive: true,
    sortOrder: 7,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'ALERT_MANAGEMENT',
    name: 'Alert Management',
    nameAlbanian: 'Menaxhimi i Alarmeve',
    description: 'Menaxhimi i alarmeve te sistemit',
    icon: '⚠️',
    route: '/notifications/alerts',
    component: 'AlertManagement',
    requiredRoles: ['Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['notifications.alerts.manage'],
    category: ModuleCategory.NOTIFICATIONS,
    isActive: true,
    sortOrder: 8,
    hierarchyLevel: 2,
    securityLevel: 'INTERNAL'
  }
];
