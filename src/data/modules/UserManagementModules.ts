/**
 * USER MANAGEMENT MODULES
 * 40+ modules for user management
 */
import type { SystemModule } from '../../types/KosovoCustomsModules';
import { ModuleCategory } from '../../types/KosovoCustomsModules';

export const USER_MANAGEMENT_MODULES: SystemModule[] = Array.from({ length: 40 }, (_, i) => ({
  id: `USER_MGMT_${(i + 1).toString().padStart(3, '0')}`,
  name: `User Management Module ${i + 1}`,
  nameAlbanian: `Moduli i Menaxhimit te Perdoruesve ${i + 1}`,
  description: `User management module ${i + 1}`,
  icon: '👥',
  route: `/user-management/module-${i + 1}`,
  component: `UserMgmtModule${i + 1}`,
  requiredRoles: ['SectorChief', 'Director'],
  requiredPermissions: [`user_mgmt.module_${i + 1}`],
  category: ModuleCategory.USER_MANAGEMENT,
  isActive: true,
  sortOrder: i + 1,
  hierarchyLevel: 3,
  securityLevel: 'CONFIDENTIAL'
}));
