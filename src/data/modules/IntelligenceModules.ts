/**
 * INTELLIGENCE MODULES
 * 80+ modules for intelligence operations
 */
import type { SystemModule } from '../../types/KosovoCustomsModules';
import { ModuleCategory } from '../../types/KosovoCustomsModules';

export const INTELLIGENCE_MODULES: SystemModule[] = Array.from({ length: 80 }, (_, i) => ({
  id: `INTELLIGENCE_${(i + 1).toString().padStart(3, '0')}`,
  name: `Intelligence Module ${i + 1}`,
  nameAlbanian: `Moduli i Inteligjences ${i + 1}`,
  description: `Intelligence operation module ${i + 1}`,
  icon: '🕵️',
  route: `/intelligence/module-${i + 1}`,
  component: `IntelligenceModule${i + 1}`,
  requiredRoles: ['SectorChief', 'Director'],
  requiredPermissions: [`intelligence.module_${i + 1}`],
  category: ModuleCategory.INTELLIGENCE,
  isActive: true,
  sortOrder: i + 1,
  hierarchyLevel: 3,
  securityLevel: 'SECRET'
}));
