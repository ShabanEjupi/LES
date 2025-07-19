/**
 * ADMINISTRATION MODULES
 * 60+ modules for administration
 */
import type { SystemModule } from '../../types/KosovoCustomsModules';
import { ModuleCategory } from '../../types/KosovoCustomsModules';

export const ADMINISTRATION_MODULES: SystemModule[] = Array.from({ length: 60 }, (_, i) => ({
  id: `ADMIN_${(i + 1).toString().padStart(3, '0')}`,
  name: `Administration Module ${i + 1}`,
  nameAlbanian: `Moduli i Administrimit ${i + 1}`,
  description: `Administration module ${i + 1}`,
  icon: '⚙️',
  route: `/administration/module-${i + 1}`,
  component: `AdminModule${i + 1}`,
  requiredRoles: ['SectorChief', 'Director'],
  requiredPermissions: [`admin.module_${i + 1}`],
  category: ModuleCategory.ADMINISTRATION,
  isActive: true,
  sortOrder: i + 1,
  hierarchyLevel: 3,
  securityLevel: 'CONFIDENTIAL'
}));
