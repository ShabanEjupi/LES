/**
 * IMPORTS AND EXPORTS MODULES
 * 150+ modules for import/export operations
 */
import type { SystemModule } from '../../types/KosovoCustomsModules';
import { ModuleCategory } from '../../types/KosovoCustomsModules';

export const IMPORTS_EXPORTS_MODULES: SystemModule[] = Array.from({ length: 150 }, (_, i) => ({
  id: `IMPORT_EXPORT_${(i + 1).toString().padStart(3, '0')}`,
  name: `Import/Export Module ${i + 1}`,
  nameAlbanian: `Moduli i Import/Eksportit ${i + 1}`,
  description: `Import/Export operation module ${i + 1}`,
  icon: '🚢',
  route: `/imports-exports/module-${i + 1}`,
  component: `ImportExportModule${i + 1}`,
  requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
  requiredPermissions: [`imports_exports.module_${i + 1}`],
  category: ModuleCategory.IMPORTS_EXPORTS,
  isActive: true,
  sortOrder: i + 1,
  hierarchyLevel: 1,
  securityLevel: 'INTERNAL'
}));
