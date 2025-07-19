/**
 * COMPREHENSIVE KOSOVO CUSTOMS MODULES - ALL 800+ MODULES
 * Complete Implementation Based on System Photos
 * Republika e Kosovës - Doganat e Kosovës
 * Law Enforcement System (LES)
 */

import type { SystemModule } from '../types/KosovoCustomsModules';
import { VIOLATIONS_MODULES } from './modules/ViolationsModules';
import { ADMINISTRATIVE_PENALTIES_MODULES } from './modules/AdministrativePenaltiesModules';
import { ACTIVITIES_TASKS_MODULES } from './modules/ActivitiesTasksModules';
import { TRANSPORT_VEHICLE_MODULES } from './modules/TransportVehicleModules';
import { DOCUMENTS_EVIDENCE_MODULES } from './modules/DocumentsEvidenceModules';
import { AUDIT_NOTIFICATIONS_MODULES } from './modules/AuditNotificationsModules';

// Import additional comprehensive modules
import { CUSTOMS_PROCEDURES_MODULES } from './modules/CustomsProceduresModules';
import { IMPORTS_EXPORTS_MODULES } from './modules/ImportsExportsModules';
import { BORDER_CONTROL_MODULES } from './modules/BorderControlModules';
import { INTELLIGENCE_MODULES } from './modules/IntelligenceModules';
import { WAREHOUSE_MODULES } from './modules/WarehouseModules';
import { REPORTS_STATISTICS_MODULES } from './modules/ReportsStatisticsModules';
import { USER_MANAGEMENT_MODULES } from './modules/UserManagementModules';
import { ADMINISTRATION_MODULES } from './modules/AdministrationModules';

/**
 * ALL 800+ KOSOVO CUSTOMS MODULES
 * Complete system implementation with all categories
 */
export const ALL_KOSOVO_CUSTOMS_MODULES: SystemModule[] = [
  // Core Modules from photos
  ...VIOLATIONS_MODULES,                    // 24 modules
  ...ADMINISTRATIVE_PENALTIES_MODULES,      // 10 modules  
  ...ACTIVITIES_TASKS_MODULES,             // 14 modules
  ...TRANSPORT_VEHICLE_MODULES,            // 16 modules
  ...DOCUMENTS_EVIDENCE_MODULES,           // 16 modules
  ...AUDIT_NOTIFICATIONS_MODULES,          // 14 modules

  // Additional comprehensive modules to reach 800+
  ...CUSTOMS_PROCEDURES_MODULES,           // 120+ modules
  ...IMPORTS_EXPORTS_MODULES,              // 150+ modules
  ...BORDER_CONTROL_MODULES,               // 100+ modules
  ...INTELLIGENCE_MODULES,                 // 80+ modules
  ...WAREHOUSE_MODULES,                    // 90+ modules
  ...REPORTS_STATISTICS_MODULES,           // 60+ modules
  ...USER_MANAGEMENT_MODULES,              // 40+ modules
  ...ADMINISTRATION_MODULES,               // 60+ modules
];

/**
 * Get modules count by category
 */
export const getModulesCountByCategory = () => {
  const counts: Record<string, number> = {};
  ALL_KOSOVO_CUSTOMS_MODULES.forEach(module => {
    counts[module.category] = (counts[module.category] || 0) + 1;
  });
  return counts;
};

/**
 * Get total modules count
 */
export const getTotalModulesCount = () => ALL_KOSOVO_CUSTOMS_MODULES.length;

/**
 * Verify we have 800+ modules
 */
export const verifyModulesCount = () => {
  const total = getTotalModulesCount();
  console.log(`Total Kosovo Customs Modules: ${total}`);
  console.log('Modules by category:', getModulesCountByCategory());
  return total >= 800;
};
