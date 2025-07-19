/**
 * DOCUMENTS AND EVIDENCE MODULES
 * Modulet e Dokumenteve dhe Provave
 * Based on actual Kosovo Customs system photos and requirements
 */

import type { SystemModule } from '../../types/KosovoCustomsModules';
import { ModuleCategory } from '../../types/KosovoCustomsModules';

export const DOCUMENTS_EVIDENCE_MODULES: SystemModule[] = [
  {
    id: 'CONFISCATED_ARTICLES',
    name: 'Confiscated Articles',
    nameAlbanian: 'Artikujt e Konfiskuar Moduli',
    description: 'Moduli per menaxhimin e artikujve te konfiskuar',
    icon: '📦',
    route: '/evidence/confiscated-articles',
    component: 'ConfiscatedArticles',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['evidence.confiscated.view'],
    category: ModuleCategory.EVIDENCE,
    isActive: true,
    sortOrder: 1,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'CONFISCATED_ARTICLES_LIST',
    name: 'Confiscated Articles List',
    nameAlbanian: 'Lista e Artikujve te Konfiskuar',
    description: 'Lista e te gjitha artikujve te konfiskuar',
    icon: '📋',
    route: '/evidence/confiscated-articles/list',
    component: 'ConfiscatedArticlesList',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['evidence.confiscated.list'],
    category: ModuleCategory.EVIDENCE,
    isActive: true,
    sortOrder: 2,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'CONFISCATED_ARTICLES_REGISTER',
    name: 'Register Confiscated Articles',
    nameAlbanian: 'Regjistrimi i Artikujve te Konfiskuar',
    description: 'Regjistrimi i artikujve te konfiskuar ne sistem',
    icon: '📝',
    route: '/evidence/confiscated-articles/register',
    component: 'ConfiscatedArticlesRegister',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['evidence.confiscated.register'],
    category: ModuleCategory.EVIDENCE,
    isActive: true,
    sortOrder: 3,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'DOCUMENT_REPOSITORY',
    name: 'Document Repository',
    nameAlbanian: 'Depozita e Dokumenteve',
    description: 'Depozita qendrore e dokumenteve te sistemit',
    icon: '🗂️',
    route: '/documents/repository',
    component: 'DocumentRepository',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['documents.repository.view'],
    category: ModuleCategory.DOCUMENT_REPOSITORY,
    isActive: true,
    sortOrder: 1,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'DOCUMENT_UPLOAD',
    name: 'Document Upload',
    nameAlbanian: 'Ngarkimi i Dokumenteve',
    description: 'Ngarkimi i dokumenteve ne sistem',
    icon: '📤',
    route: '/documents/upload',
    component: 'DocumentUpload',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['documents.upload'],
    category: ModuleCategory.DOCUMENT_REPOSITORY,
    isActive: true,
    sortOrder: 2,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'DOCUMENT_SEARCH',
    name: 'Document Search',
    nameAlbanian: 'Kerkimi i Dokumenteve',
    description: 'Kerkimi dhe filtrimi i dokumenteve',
    icon: '🔍',
    route: '/documents/search',
    component: 'DocumentSearch',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['documents.search'],
    category: ModuleCategory.SEARCH,
    isActive: true,
    sortOrder: 16,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'DOCUMENT_CLASSIFICATION',
    name: 'Document Classification',
    nameAlbanian: 'Klasifikimi i Dokumenteve',
    description: 'Klasifikimi dhe kategorizimi i dokumenteve',
    icon: '📂',
    route: '/documents/classification',
    component: 'DocumentClassification',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['documents.classify'],
    category: ModuleCategory.DOCUMENT_REPOSITORY,
    isActive: true,
    sortOrder: 3,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'DOCUMENT_APPROVAL',
    name: 'Document Approval',
    nameAlbanian: 'Miratimi i Dokumenteve',
    description: 'Miratimi dhe autorizimi i dokumenteve',
    icon: '✅',
    route: '/documents/:id/approval',
    component: 'DocumentApproval',
    requiredRoles: ['Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['documents.approve'],
    category: ModuleCategory.DOCUMENT_REPOSITORY,
    isActive: true,
    sortOrder: 4,
    hierarchyLevel: 2,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'DOCUMENT_ARCHIVE',
    name: 'Document Archive',
    nameAlbanian: 'Arkiva e Dokumenteve',
    description: 'Arkiva e dokumenteve te sistemit',
    icon: '🗄️',
    route: '/documents/archive',
    component: 'DocumentArchive',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['documents.archive.view'],
    category: ModuleCategory.DOCUMENT_REPOSITORY,
    isActive: true,
    sortOrder: 5,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'EVIDENCE_MANAGEMENT',
    name: 'Evidence Management',
    nameAlbanian: 'Menaxhimi i Provave',
    description: 'Menaxhimi i pergjithshem i provave',
    icon: '🔍',
    route: '/evidence',
    component: 'EvidenceManagement',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['evidence.manage'],
    category: ModuleCategory.EVIDENCE,
    isActive: true,
    sortOrder: 4,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'EVIDENCE_COLLECTION',
    name: 'Evidence Collection',
    nameAlbanian: 'Mbledhja e Provave',
    description: 'Mbledhja dhe regjistrimi i provave',
    icon: '📋',
    route: '/evidence/collection',
    component: 'EvidenceCollection',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['evidence.collect'],
    category: ModuleCategory.EVIDENCE,
    isActive: true,
    sortOrder: 5,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'EVIDENCE_ANALYSIS',
    name: 'Evidence Analysis',
    nameAlbanian: 'Analiza e Provave',
    description: 'Analiza dhe vleresimi i provave',
    icon: '🔬',
    route: '/evidence/analysis',
    component: 'EvidenceAnalysis',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['evidence.analyze'],
    category: ModuleCategory.EVIDENCE,
    isActive: true,
    sortOrder: 6,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'EVIDENCE_CHAIN_CUSTODY',
    name: 'Evidence Chain of Custody',
    nameAlbanian: 'Zinxhiri i Ruajtjes se Provave',
    description: 'Gjurmimi i zinxhirit te ruajtjes se provave',
    icon: '🔗',
    route: '/evidence/chain-custody',
    component: 'EvidenceChainCustody',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['evidence.custody.view'],
    category: ModuleCategory.EVIDENCE,
    isActive: true,
    sortOrder: 7,
    hierarchyLevel: 1,
    securityLevel: 'CONFIDENTIAL'
  },

  {
    id: 'DIGITAL_EVIDENCE',
    name: 'Digital Evidence',
    nameAlbanian: 'Provat Dixhitale',
    description: 'Menaxhimi i provave dixhitale',
    icon: '💾',
    route: '/evidence/digital',
    component: 'DigitalEvidence',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['evidence.digital.view'],
    category: ModuleCategory.EVIDENCE,
    isActive: true,
    sortOrder: 8,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'PHYSICAL_EVIDENCE',
    name: 'Physical Evidence',
    nameAlbanian: 'Provat Fizike',
    description: 'Menaxhimi i provave fizike',
    icon: '📦',
    route: '/evidence/physical',
    component: 'PhysicalEvidence',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['evidence.physical.view'],
    category: ModuleCategory.EVIDENCE,
    isActive: true,
    sortOrder: 9,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  },

  {
    id: 'PHOTO_EVIDENCE',
    name: 'Photo Evidence',
    nameAlbanian: 'Provat Fotografike',
    description: 'Menaxhimi i provave fotografike',
    icon: '📷',
    route: '/evidence/photos',
    component: 'PhotoEvidence',
    requiredRoles: ['Officer', 'Supervisor', 'SectorChief', 'Director'],
    requiredPermissions: ['evidence.photos.view'],
    category: ModuleCategory.EVIDENCE,
    isActive: true,
    sortOrder: 10,
    hierarchyLevel: 1,
    securityLevel: 'INTERNAL'
  }
];
