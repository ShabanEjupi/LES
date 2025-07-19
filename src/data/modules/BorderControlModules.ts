/**
 * BORDER CONTROL MODULES
 * 100+ modules for border control operations
 */
import type { SystemModule } from '../../types/KosovoCustomsModules';
import { ModuleCategory } from '../../types/KosovoCustomsModules';

export const BORDER_CONTROL_MODULES: SystemModule[] = Array.from({ length: 100 }, (_, i) => ({
  id: `BORDER_CONTROL_${(i + 1).toString().padStart(3, '0')}`,
  name: `Border Control Module ${i + 1}`,
  nameAlbanian: `Moduli i Kontrollit Kufitar ${i + 1}`,
  description: `Border control operation module ${i + 1}`,
  icon: '🛂',
  route: `/border-control/module-${i + 1}`,
  component: `BorderControlModule${i + 1}`,
  requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
  requiredPermissions: [`border_control.module_${i + 1}`],
  category: ModuleCategory.BORDER_CONTROL,
  isActive: true,
  sortOrder: i + 1,
  hierarchyLevel: 1,
  securityLevel: 'CONFIDENTIAL'
}));
