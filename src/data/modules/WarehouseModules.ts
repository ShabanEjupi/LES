/**
 * WAREHOUSE MODULES
 * 90+ modules for warehouse operations
 */
import type { SystemModule } from '../../types/KosovoCustomsModules';
import { ModuleCategory } from '../../types/KosovoCustomsModules';

export const WAREHOUSE_MODULES: SystemModule[] = Array.from({ length: 90 }, (_, i) => ({
  id: `WAREHOUSE_${(i + 1).toString().padStart(3, '0')}`,
  name: `Warehouse Module ${i + 1}`,
  nameAlbanian: `Moduli i Depos ${i + 1}`,
  description: `Warehouse operation module ${i + 1}`,
  icon: '🏭',
  route: `/warehouses/module-${i + 1}`,
  component: `WarehouseModule${i + 1}`,
  requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
  requiredPermissions: [`warehouse.module_${i + 1}`],
  category: ModuleCategory.WAREHOUSES,
  isActive: true,
  sortOrder: i + 1,
  hierarchyLevel: 1,
  securityLevel: 'INTERNAL'
}));
