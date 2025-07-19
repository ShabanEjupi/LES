// Extended Kosovo Customs Modules Database - Part 2
// Additional specialized modules for comprehensive coverage

import type { KosovoModule } from './kosovoCostomeModules';

// Document Management Modules
export const documentModules: KosovoModule[] = [
  {
    id: 'document-verification',
    name: 'Verifikimi i Dokumenteve',
    nameEn: 'Document Verification',
    category: 'documents',
    icon: '📄',
    description: 'Verifikimi i vërtetësisë së dokumenteve',
    priority: 'HIGH',
    department: 'DOCUMENT_CONTROL',
    requiredRole: 'OFFICER',
    fields: [
      {
        id: 'document_id',
        name: 'documentId',
        label: 'ID e Dokumentit',
        type: 'text',
        required: true
      },
      {
        id: 'document_type',
        name: 'documentType',
        label: 'Lloji i Dokumentit',
        type: 'select',
        required: true,
        options: [
          'Pasaportë',
          'Letërnjoftim',
          'Licencë biznesi',
          'Certifikatë origjine',
          'Faturë tregtare',
          'Packing list',
          'Bill of Lading',
          'Certifikatë cilësie'
        ]
      },
      {
        id: 'issuing_authority',
        name: 'issuingAuthority',
        label: 'Autoriteti Lëshues',
        type: 'text',
        required: true
      },
      {
        id: 'verification_method',
        name: 'verificationMethod',
        label: 'Metoda e Verifikimit',
        type: 'select',
        required: true,
        options: [
          'Verifikim elektronik',
          'Kontaktim i drejtpërdrejtë',
          'Analizë e hologramit',
          'Verifikim i bazës së të dhënave',
          'Ekspertizë grafologjike'
        ]
      },
      {
        id: 'verification_result',
        name: 'verificationResult',
        label: 'Rezultati i Verifikimit',
        type: 'select',
        required: true,
        options: ['I vërtetë', 'I falsifikuar', 'I dyshimtë', 'I pakompletuar']
      },
      {
        id: 'verification_notes',
        name: 'verificationNotes',
        label: 'Shënime Verifikimi',
        type: 'textarea'
      }
    ],
    relatedModules: ['violation-registration', 'case-creation'],
    workflows: ['document-authentication'],
    reports: ['verification-report', 'fraud-statistics'],
    active: true
  },
  {
    id: 'invoice-management',
    name: 'Menaxhimi i Faturave',
    nameEn: 'Invoice Management',
    category: 'documents',
    icon: '🧾',
    description: 'Regjistrimi dhe kontrolli i faturave tregtare',
    priority: 'MEDIUM',
    department: 'FINANCIAL_CONTROL',
    requiredRole: 'OFFICER',
    fields: [
      {
        id: 'invoice_number',
        name: 'invoiceNumber',
        label: 'Numri i Faturës',
        type: 'text',
        required: true
      },
      {
        id: 'invoice_date',
        name: 'invoiceDate',
        label: 'Data e Faturës',
        type: 'date',
        required: true
      },
      {
        id: 'supplier_name',
        name: 'supplierName',
        label: 'Emri i Furnizuesit',
        type: 'text',
        required: true
      },
      {
        id: 'buyer_name',
        name: 'buyerName',
        label: 'Emri i Blerësit',
        type: 'text',
        required: true
      },
      {
        id: 'total_amount',
        name: 'totalAmount',
        label: 'Shuma Totale',
        type: 'currency',
        required: true
      },
      {
        id: 'currency_type',
        name: 'currencyType',
        label: 'Lloji i Monedhës',
        type: 'select',
        required: true,
        options: ['EUR', 'USD', 'CHF', 'GBP', 'ALL', 'RSD']
      },
      {
        id: 'payment_terms',
        name: 'paymentTerms',
        label: 'Kushtet e Pagesës',
        type: 'text'
      },
      {
        id: 'goods_list',
        name: 'goodsList',
        label: 'Lista e Mallrave',
        type: 'textarea',
        required: true
      }
    ],
    relatedModules: ['customs-clearance', 'tax-calculation'],
    workflows: ['invoice-verification'],
    reports: ['invoice-analysis', 'discrepancy-report'],
    active: true
  }
];

// Personnel and HR Modules
export const personnelModules: KosovoModule[] = [
  {
    id: 'officer-management',
    name: 'Menaxhimi i Oficerëve',
    nameEn: 'Officer Management',
    category: 'personnel',
    icon: '👮',
    description: 'Menaxhimi i personelit dhe oficerëve doganorë',
    priority: 'HIGH',
    department: 'HUMAN_RESOURCES',
    requiredRole: 'ADMIN',
    fields: [
      {
        id: 'officer_id',
        name: 'officerId',
        label: 'ID e Oficierit',
        type: 'text',
        required: true
      },
      {
        id: 'first_name',
        name: 'firstName',
        label: 'Emri',
        type: 'text',
        required: true
      },
      {
        id: 'last_name',
        name: 'lastName',
        label: 'Mbiemri',
        type: 'text',
        required: true
      },
      {
        id: 'position',
        name: 'position',
        label: 'Pozita',
        type: 'select',
        required: true,
        options: [
          'Oficer Doganor',
          'Oficer Kryesor',
          'Kreu i Sektorit',
          'Drejtori i Departamentit',
          'Drejtor i Përgjithshëm',
          'Specialist'
        ]
      },
      {
        id: 'department',
        name: 'department',
        label: 'Departamenti',
        type: 'select',
        required: true,
        options: [
          'Kontrolli Doganor',
          'Hetimet',
          'Administrata',
          'Çështjet Ligjore',
          'Sistemi Informativ',
          'Resurset Njerëzore',
          'Financa'
        ]
      },
      {
        id: 'access_level',
        name: 'accessLevel',
        label: 'Niveli i Qasjes',
        type: 'select',
        required: true,
        options: ['1 - Bazik', '2 - Mesatar', '3 - I lartë', '4 - Administrativ', '5 - Director']
      },
      {
        id: 'hire_date',
        name: 'hireDate',
        label: 'Data e Punësimit',
        type: 'date',
        required: true
      },
      {
        id: 'email',
        name: 'email',
        label: 'Email',
        type: 'email',
        required: true
      },
      {
        id: 'phone',
        name: 'phone',
        label: 'Telefoni',
        type: 'phone',
        required: true
      },
      {
        id: 'specializations',
        name: 'specializations',
        label: 'Specializimet',
        type: 'multiselect',
        options: [
          'Drogat narkotike',
          'Armët dhe eksplozivët',
          'Mallrat luksi',
          'Teknologjia',
          'Automjetet',
          'Analiza financiare',
          'Hetimet e brendshme'
        ]
      }
    ],
    relatedModules: ['shift-management', 'training-records'],
    workflows: ['personnel-onboarding', 'performance-review'],
    reports: ['staff-directory', 'workload-analysis'],
    active: true
  },
  {
    id: 'shift-management',
    name: 'Menaxhimi i Turneve',
    nameEn: 'Shift Management',
    category: 'personnel',
    icon: '🕐',
    description: 'Planifikimi dhe menaxhimi i turneve të punës',
    priority: 'MEDIUM',
    department: 'HUMAN_RESOURCES',
    requiredRole: 'SECTOR_CHIEF',
    fields: [
      {
        id: 'shift_date',
        name: 'shiftDate',
        label: 'Data e Turnit',
        type: 'date',
        required: true
      },
      {
        id: 'shift_type',
        name: 'shiftType',
        label: 'Lloji i Turnit',
        type: 'select',
        required: true,
        options: ['Mëngjes (06:00-14:00)', 'Pasdite (14:00-22:00)', 'Natë (22:00-06:00)', '24 orë']
      },
      {
        id: 'assigned_officers',
        name: 'assignedOfficers',
        label: 'Oficerët e Caktuar',
        type: 'multiselect',
        required: true
      },
      {
        id: 'shift_supervisor',
        name: 'shiftSupervisor',
        label: 'Mbikëqyrësi i Turnit',
        type: 'select',
        required: true
      },
      {
        id: 'location',
        name: 'location',
        label: 'Vendndodhja',
        type: 'select',
        required: true,
        options: [
          'Pika Kufitare Dheu i Bardhë',
          'Pika Kufitare Bërnjakë',
          'Pika Kufitare Qafë Morinë',
          'Pika Kufitare Jarinjë',
          'Pika Kufitare Merdare',
          'Aeroporti i Prishtinës',
          'Zyra Qendrore'
        ]
      },
      {
        id: 'special_instructions',
        name: 'specialInstructions',
        label: 'Udhëzime të Veçanta',
        type: 'textarea'
      }
    ],
    relatedModules: ['officer-management', 'attendance-tracking'],
    workflows: ['shift-approval', 'overtime-calculation'],
    reports: ['shift-report', 'coverage-analysis'],
    active: true
  }
];

// Training and Development Modules
export const trainingModules: KosovoModule[] = [
  {
    id: 'training-program',
    name: 'Programet e Trajnimit',
    nameEn: 'Training Programs',
    category: 'training',
    icon: '🎓',
    description: 'Organizimi dhe menaxhimi i programeve të trajnimit',
    priority: 'MEDIUM',
    department: 'TRAINING_DEVELOPMENT',
    requiredRole: 'SECTOR_CHIEF',
    fields: [
      {
        id: 'program_title',
        name: 'programTitle',
        label: 'Titulli i Programit',
        type: 'text',
        required: true
      },
      {
        id: 'training_type',
        name: 'trainingType',
        label: 'Lloji i Trajnimit',
        type: 'select',
        required: true,
        options: [
          'Trajnim bazik',
          'Trajnim i avancuar',
          'Specializim',
          'Rifreskim',
          'Certifikim',
          'Workshop'
        ]
      },
      {
        id: 'duration_hours',
        name: 'durationHours',
        label: 'Kohëzgjatja (orë)',
        type: 'number',
        required: true
      },
      {
        id: 'max_participants',
        name: 'maxParticipants',
        label: 'Numri Maksimal i Pjesëmarrësve',
        type: 'number',
        required: true
      },
      {
        id: 'prerequisites',
        name: 'prerequisites',
        label: 'Paraushtet',
        type: 'textarea'
      },
      {
        id: 'learning_objectives',
        name: 'learningObjectives',
        label: 'Objektivat e Të Mësuarit',
        type: 'textarea',
        required: true
      },
      {
        id: 'training_material',
        name: 'trainingMaterial',
        label: 'Materiali Trajnues',
        type: 'file'
      },
      {
        id: 'instructor',
        name: 'instructor',
        label: 'Instruktori',
        type: 'text',
        required: true
      },
      {
        id: 'location',
        name: 'location',
        label: 'Vendndodhja',
        type: 'text',
        required: true
      }
    ],
    relatedModules: ['training-enrollment', 'certification-tracking'],
    workflows: ['training-approval', 'evaluation-process'],
    reports: ['training-report', 'effectiveness-analysis'],
    active: true
  }
];

// Risk Management Modules
export const riskModules: KosovoModule[] = [
  {
    id: 'risk-assessment',
    name: 'Vlerësimi i Rrezikut',
    nameEn: 'Risk Assessment',
    category: 'risk',
    icon: '⚠️',
    description: 'Identifikimi dhe vlerësimi i rreziqeve',
    priority: 'HIGH',
    department: 'RISK_MANAGEMENT',
    requiredRole: 'SECTOR_CHIEF',
    fields: [
      {
        id: 'risk_type',
        name: 'riskType',
        label: 'Lloji i Rrezikut',
        type: 'select',
        required: true,
        options: [
          'Rrezik operacional',
          'Rrezik financiar',
          'Rrezik i sigurisë',
          'Rrezik i reputacionit',
          'Rrezik ligjor',
          'Rrezik teknologjik'
        ]
      },
      {
        id: 'risk_description',
        name: 'riskDescription',
        label: 'Përshkrimi i Rrezikut',
        type: 'textarea',
        required: true
      },
      {
        id: 'probability',
        name: 'probability',
        label: 'Probabiliteti',
        type: 'select',
        required: true,
        options: ['Shumë i ulët', 'I ulët', 'Mesatar', 'I lartë', 'Shumë i lartë']
      },
      {
        id: 'impact',
        name: 'impact',
        label: 'Ndikimi',
        type: 'select',
        required: true,
        options: ['Minimal', 'I ulët', 'Mesatar', 'I lartë', 'Katastrofik']
      },
      {
        id: 'risk_level',
        name: 'riskLevel',
        label: 'Niveli i Rrezikut',
        type: 'select',
        required: true,
        options: ['I pranueshëm', 'I moderuar', 'I lartë', 'Ekstrem']
      },
      {
        id: 'mitigation_measures',
        name: 'mitigationMeasures',
        label: 'Masat e Zbutjes',
        type: 'textarea',
        required: true
      },
      {
        id: 'responsible_person',
        name: 'responsiblePerson',
        label: 'Personi Përgjegjës',
        type: 'select',
        required: true
      },
      {
        id: 'review_date',
        name: 'reviewDate',
        label: 'Data e Rishikimit',
        type: 'date',
        required: true
      }
    ],
    relatedModules: ['compliance-monitoring', 'incident-management'],
    workflows: ['risk-approval', 'monitoring-process'],
    reports: ['risk-register', 'mitigation-status'],
    active: true
  }
];

// Technology and System Modules
export const technologyModules: KosovoModule[] = [
  {
    id: 'system-monitoring',
    name: 'Monitorimi i Sistemit',
    nameEn: 'System Monitoring',
    category: 'technology',
    icon: '📊',
    description: 'Monitorimi i performancës së sistemeve',
    priority: 'HIGH',
    department: 'INFORMATION_TECHNOLOGY',
    requiredRole: 'ADMIN',
    fields: [
      {
        id: 'system_name',
        name: 'systemName',
        label: 'Emri i Sistemit',
        type: 'text',
        required: true
      },
      {
        id: 'monitoring_type',
        name: 'monitoringType',
        label: 'Lloji i Monitorimit',
        type: 'select',
        required: true,
        options: [
          'Performance monitoring',
          'Security monitoring',
          'Availability monitoring',
          'Error monitoring',
          'User activity monitoring'
        ]
      },
      {
        id: 'status',
        name: 'status',
        label: 'Statusi',
        type: 'select',
        required: true,
        options: ['Online', 'Offline', 'Warning', 'Critical', 'Maintenance']
      },
      {
        id: 'uptime_percentage',
        name: 'uptimePercentage',
        label: 'Përqindja e Disponueshmërisë',
        type: 'number',
        required: true
      },
      {
        id: 'response_time',
        name: 'responseTime',
        label: 'Koha e Përgjigjes (ms)',
        type: 'number'
      },
      {
        id: 'error_count',
        name: 'errorCount',
        label: 'Numri i Gabimeve',
        type: 'number'
      },
      {
        id: 'last_check',
        name: 'lastCheck',
        label: 'Kontrolli i Fundit',
        type: 'date',
        required: true
      },
      {
        id: 'alerts_generated',
        name: 'alertsGenerated',
        label: 'Alarmet e Gjeneruara',
        type: 'number'
      }
    ],
    relatedModules: ['alert-management', 'maintenance-scheduling'],
    workflows: ['incident-response'],
    reports: ['system-health', 'performance-metrics'],
    active: true
  }
];

// Export all extended modules
export const extendedKosovoModules: KosovoModule[] = [
  ...documentModules,
  ...personnelModules,
  ...trainingModules,
  ...riskModules,
  ...technologyModules
];

// Additional specialized modules for specific operations
export const specializedModules: KosovoModule[] = [
  // Border Control Modules
  {
    id: 'border-entry-control',
    name: 'Kontrolli i Hyrjes në Kufij',
    nameEn: 'Border Entry Control',
    category: 'border',
    icon: '🛂',
    description: 'Kontrolli i personave dhe mjeteve në hyrje',
    priority: 'HIGH',
    department: 'BORDER_CONTROL',
    requiredRole: 'OFFICER',
    fields: [
      {
        id: 'passport_number',
        name: 'passportNumber',
        label: 'Numri i Pasaportës',
        type: 'text',
        required: true
      },
      {
        id: 'nationality',
        name: 'nationality',
        label: 'Kombësia',
        type: 'select',
        required: true,
        options: ['Kosovë', 'Shqipëri', 'Maqedonia e Veriut', 'Mal i Zi', 'Serbi', 'Të tjera']
      },
      {
        id: 'purpose_of_visit',
        name: 'purposeOfVisit',
        label: 'Qëllimi i Vizitës',
        type: 'select',
        required: true,
        options: ['Turizëm', 'Biznes', 'Transit', 'Vizitë familjare', 'Studime', 'Të tjera']
      },
      {
        id: 'entry_point',
        name: 'entryPoint',
        label: 'Pika e Hyrjes',
        type: 'select',
        required: true,
        options: [
          'Dheu i Bardhë',
          'Bërnjakë',
          'Qafë Morinë',
          'Jarinjë',
          'Merdare',
          'Aeroporti i Prishtinës'
        ]
      },
      {
        id: 'duration_of_stay',
        name: 'durationOfStay',
        label: 'Kohëzgjatja e Qëndrimit (ditë)',
        type: 'number'
      }
    ],
    relatedModules: ['passport-verification', 'watchlist-check'],
    workflows: ['entry-approval'],
    reports: ['entry-statistics', 'visitor-analytics'],
    active: true
  },
  
  // Customs Clearance Modules
  {
    id: 'customs-declaration',
    name: 'Deklarimi Doganor',
    nameEn: 'Customs Declaration',
    category: 'clearance',
    icon: '📋',
    description: 'Regjistrimi i deklarimeve doganore',
    priority: 'HIGH',
    department: 'CUSTOMS_CLEARANCE',
    requiredRole: 'OFFICER',
    fields: [
      {
        id: 'declaration_number',
        name: 'declarationNumber',
        label: 'Numri i Deklarimit',
        type: 'text',
        required: true
      },
      {
        id: 'declarant_name',
        name: 'declarantName',
        label: 'Emri i Deklaruesit',
        type: 'text',
        required: true
      },
      {
        id: 'goods_category',
        name: 'goodsCategory',
        label: 'Kategoria e Mallrave',
        type: 'select',
        required: true,
        options: [
          'Ushqim dhe pije',
          'Veshje dhe tekstil',
          'Teknologji',
          'Makina dhe pajisje',
          'Materiale ndërtimi',
          'Kimikate',
          'Ilaçe',
          'Të tjera'
        ]
      },
      {
        id: 'total_value',
        name: 'totalValue',
        label: 'Vlera Totale (€)',
        type: 'currency',
        required: true
      },
      {
        id: 'duty_amount',
        name: 'dutyAmount',
        label: 'Shuma e Taksës (€)',
        type: 'currency',
        required: true
      },
      {
        id: 'origin_country',
        name: 'originCountry',
        label: 'Vendi i Origjinës',
        type: 'text',
        required: true
      }
    ],
    relatedModules: ['tax-calculation', 'payment-processing'],
    workflows: ['declaration-processing'],
    reports: ['customs-revenue', 'trade-statistics'],
    active: true
  },

  // Intelligence and Security Modules
  {
    id: 'intelligence-gathering',
    name: 'Mbledhja e Informacioneve',
    nameEn: 'Intelligence Gathering',
    category: 'intelligence',
    icon: '🕵️',
    description: 'Mbledhja dhe analiza e informacioneve të inteligjencës',
    priority: 'HIGH',
    department: 'INTELLIGENCE',
    requiredRole: 'SECTOR_CHIEF',
    fields: [
      {
        id: 'source_type',
        name: 'sourceType',
        label: 'Lloji i Burimit',
        type: 'select',
        required: true,
        options: [
          'Informator',
          'Surveillancë',
          'Interceptim',
          'Bashkëpunim ndërkombëtar',
          'Analizë e hapur',
          'Raportim qytetar'
        ]
      },
      {
        id: 'classification_level',
        name: 'classificationLevel',
        label: 'Niveli i Klasifikimit',
        type: 'select',
        required: true,
        options: ['Publik', 'I brendshëm', 'Konfidencial', 'Sekret', 'Shumë sekret']
      },
      {
        id: 'intelligence_summary',
        name: 'intelligenceSummary',
        label: 'Përmbledhja e Informacionit',
        type: 'textarea',
        required: true
      },
      {
        id: 'reliability_assessment',
        name: 'reliabilityAssessment',
        label: 'Vlerësimi i Besueshmërisë',
        type: 'select',
        required: true,
        options: ['Shumë i besueshëm', 'I besueshëm', 'Mesatar', 'I dyshimtë', 'I pabesueshëm']
      },
      {
        id: 'actionable',
        name: 'actionable',
        label: 'I Veprueshëm',
        type: 'checkbox'
      }
    ],
    relatedModules: ['threat-assessment', 'operational-planning'],
    workflows: ['intelligence-analysis'],
    reports: ['intelligence-report', 'threat-assessment'],
    active: true
  }
];

// Laboratory and Forensics Modules
export const laboratoryModules: KosovoModule[] = [
  {
    id: 'sample-analysis',
    name: 'Analiza e Mostrës',
    nameEn: 'Sample Analysis',
    category: 'laboratory',
    icon: '🔬',
    description: 'Analiza laboratorike e mostrave të konfiskuara',
    priority: 'HIGH',
    department: 'LABORATORY',
    requiredRole: 'OFFICER',
    fields: [
      {
        id: 'sample_id',
        name: 'sampleId',
        label: 'ID e Mostrës',
        type: 'text',
        required: true
      },
      {
        id: 'sample_type',
        name: 'sampleType',
        label: 'Lloji i Mostrës',
        type: 'select',
        required: true,
        options: [
          'Substancë narkotike',
          'Alkool',
          'Duhan',
          'Ushqim',
          'Ilaç',
          'Kimikate',
          'Materiale të panjohura'
        ]
      },
      {
        id: 'collection_date',
        name: 'collectionDate',
        label: 'Data e Mbledhjes',
        type: 'date',
        required: true
      },
      {
        id: 'analysis_method',
        name: 'analysisMethod',
        label: 'Metoda e Analizës',
        type: 'select',
        required: true,
        options: [
          'Spektrometri',
          'Kromatografi',
          'Test i shpejtë',
          'Analizë mikroskopike',
          'Test kimik',
          'Analizë DNA'
        ]
      },
      {
        id: 'test_results',
        name: 'testResults',
        label: 'Rezultatet e Testit',
        type: 'textarea',
        required: true
      },
      {
        id: 'purity_level',
        name: 'purityLevel',
        label: 'Niveli i Pastërtisë (%)',
        type: 'number'
      }
    ],
    relatedModules: ['evidence-management', 'case-creation'],
    workflows: ['analysis-approval'],
    reports: ['lab-report', 'analysis-statistics'],
    active: true
  }
];

// All extended modules combined
export const allExtendedModules = [
  ...extendedKosovoModules,
  ...specializedModules,
  ...laboratoryModules
];
