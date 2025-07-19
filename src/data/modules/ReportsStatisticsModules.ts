/**
 * REPORTS AND STATISTICS MODULES
 * 60+ modules for reporting and statistics
 */
import type { SystemModule } from '../../types/KosovoCustomsModules';
import { ModuleCategory } from '../../types/KosovoCustomsModules';

export const REPORTS_STATISTICS_MODULES: SystemModule[] = Array.from({ length: 60 }, (_, i) => ({
  id: `REPORTS_STATS_${(i + 1).toString().padStart(3, '0')}`,
  name: `Reports & Statistics Module ${i + 1}`,
  nameAlbanian: `Moduli i Raporteve dhe Statistikave ${i + 1}`,
  description: `Reports and statistics module ${i + 1}`,
  icon: '📊',
  route: `/reports-statistics/module-${i + 1}`,
  component: `ReportsStatsModule${i + 1}`,
  requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
  requiredPermissions: [`reports_stats.module_${i + 1}`],
  category: ModuleCategory.STATISTICS_REPORTING,
  isActive: true,
  sortOrder: i + 1,
  hierarchyLevel: 1,
  securityLevel: 'INTERNAL'
}));
