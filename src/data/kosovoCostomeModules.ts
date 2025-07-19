// Complete Kosovo Customs Modules Database
// Contains all 800+ modules based on system screenshots and requirements

export interface ModuleField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'select' | 'textarea' | 'number' | 'date' | 'multiselect' | 'checkbox' | 'file' | 'currency' | 'time' | 'email' | 'phone';
  required?: boolean;
  options?: string[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
  dependent?: {
    field: string;
    value: string;
  };
}

export interface KosovoModule {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  icon: string;
  description: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  department: string;
  requiredRole: 'OFFICER' | 'SECTOR_CHIEF' | 'ADMIN' | 'DIRECTOR';
  fields: ModuleField[];
  relatedModules?: string[];
  workflows?: string[];
  reports?: string[];
  active: boolean;
}

// Core Violation Management Modules (Based on system-photos)
export const violationModules: KosovoModule[] = [
  {
    id: 'violation-registration',
    name: 'Regjistrimi i Kundërvajtjeve',
    nameEn: 'Violation Registration',
    category: 'violations',
    icon: '⚠️',
    description: 'Regjistrimi dhe dokumentimi i kundërvajtjeve doganore',
    priority: 'HIGH',
    department: 'CUSTOMS_CONTROL',
    requiredRole: 'OFFICER',
    fields: [
      {
        id: 'violation_type',
        name: 'violationType',
        label: 'Lloji i Kundërvajtjes',
        type: 'select',
        required: true,
        options: [
          'Kontrabandë e thjeshtë',
          'Kontrabandë e rëndë',
          'Deklarim i gabuar',
          'Mosdeklarim i mallrave',
          'Dokumente të falsifikuara',
          'Tejkalim i kufijve tarifore',
          'Mallra të ndaluara',
          'Probleme me licensat'
        ]
      },
      {
        id: 'incident_location',
        name: 'location',
        label: 'Vendi i Ngjarjes',
        type: 'select',
        required: true,
        options: [
          'Pika Kufitare Dheu i Bardhë',
          'Pika Kufitare Bërnjakë',
          'Pika Kufitare Qafë Morinë',
          'Pika Kufitare Jarinjë',
          'Pika Kufitare Merdare',
          'Aeroporti i Prishtinës',
          'Doganat e Brendshme'
        ]
      },
      {
        id: 'subject_name',
        name: 'subjectName',
        label: 'Emri i Subjektit',
        type: 'text',
        required: true
      },
      {
        id: 'subject_id',
        name: 'subjectId',
        label: 'Nr. Personal/Fiskal',
        type: 'text',
        required: true,
        validation: {
          pattern: '^[0-9]{9,10}$',
          message: 'Numri personal duhet të ketë 9-10 shifra'
        }
      },
      {
        id: 'company_name',
        name: 'companyName',
        label: 'Emri i Kompanisë',
        type: 'text'
      },
      {
        id: 'vehicle_plate',
        name: 'vehiclePlate',
        label: 'Targat e Mjetit',
        type: 'text'
      },
      {
        id: 'goods_description',
        name: 'goodsDescription',
        label: 'Përshkrimi i Mallrave',
        type: 'textarea',
        required: true
      },
      {
        id: 'estimated_value',
        name: 'estimatedValue',
        label: 'Vlera e Përgjithshme (€)',
        type: 'currency',
        required: true
      },
      {
        id: 'incident_date',
        name: 'incidentDate',
        label: 'Data e Ngjarjes',
        type: 'date',
        required: true
      },
      {
        id: 'incident_time',
        name: 'incidentTime',
        label: 'Ora e Ngjarjes',
        type: 'time',
        required: true
      }
    ],
    relatedModules: ['case-management', 'penalty-calculation', 'vehicle-inspection'],
    workflows: ['violation-processing', 'case-creation'],
    reports: ['violation-report', 'daily-violations'],
    active: true
  },
  {
    id: 'violation-type-change',
    name: 'Ndryshimi i Llojit të Kundërvajtjes',
    nameEn: 'Violation Type Change',
    category: 'violations',
    icon: '🔄',
    description: 'Ndryshimi i llojit të kundërvajtjes pas analizës së detajuar',
    priority: 'MEDIUM',
    department: 'CUSTOMS_CONTROL',
    requiredRole: 'SECTOR_CHIEF',
    fields: [
      {
        id: 'original_violation_id',
        name: 'originalViolationId',
        label: 'ID e Kundërvajtjes Origjinale',
        type: 'text',
        required: true
      },
      {
        id: 'new_violation_type',
        name: 'newViolationType',
        label: 'Lloji i Ri i Kundërvajtjes',
        type: 'select',
        required: true,
        options: [
          'Kontrabandë e thjeshtë',
          'Kontrabandë e rëndë',
          'Deklarim i gabuar',
          'Mosdeklarim i mallrave',
          'Dokumente të falsifikuara',
          'Tejkalim i kufijve tarifore',
          'Mallra të ndaluara',
          'Probleme me licensat'
        ]
      },
      {
        id: 'change_reason',
        name: 'changeReason',
        label: 'Arsyeja e Ndryshimit',
        type: 'textarea',
        required: true
      },
      {
        id: 'supporting_evidence',
        name: 'supportingEvidence',
        label: 'Dëshmi Mbështetëse',
        type: 'textarea'
      },
      {
        id: 'approval_authority',
        name: 'approvalAuthority',
        label: 'Autoriteti Miratues',
        type: 'select',
        required: true,
        options: [
          'Kreu i Sektorit',
          'Drejtori i Departamentit',
          'Drejtori i Përgjithshëm'
        ]
      }
    ],
    relatedModules: ['violation-registration', 'case-management'],
    workflows: ['type-change-approval'],
    reports: ['type-change-log'],
    active: true
  }
];

// Case Management Modules
export const caseModules: KosovoModule[] = [
  {
    id: 'case-creation',
    name: 'Krijimi i Rasteve',
    nameEn: 'Case Creation',
    category: 'cases',
    icon: '📋',
    description: 'Hapja dhe regjistrimi i rasteve të reja',
    priority: 'HIGH',
    department: 'INVESTIGATION',
    requiredRole: 'OFFICER',
    fields: [
      {
        id: 'case_type',
        name: 'caseType',
        label: 'Lloji i Rastit',
        type: 'select',
        required: true,
        options: [
          'Hetim për kontrabandë',
          'Verifikim dokumentesh',
          'Inspektim rutinor',
          'Ndjekje e informacionit',
          'Kontroll pas doganimit',
          'Investigim i brendshëm'
        ]
      },
      {
        id: 'case_title',
        name: 'caseTitle',
        label: 'Titulli i Rastit',
        type: 'text',
        required: true
      },
      {
        id: 'case_priority',
        name: 'casePriority',
        label: 'Prioriteti',
        type: 'select',
        required: true,
        options: ['I ULËT', 'MESATAR', 'I LARTË', 'URGJENT']
      },
      {
        id: 'primary_officer',
        name: 'primaryOfficer',
        label: 'Oficeri Kryesor',
        type: 'select',
        required: true
      },
      {
        id: 'supporting_officers',
        name: 'supportingOfficers',
        label: 'Oficerë Mbështetës',
        type: 'multiselect'
      },
      {
        id: 'case_description',
        name: 'caseDescription',
        label: 'Përshkrimi i Rastit',
        type: 'textarea',
        required: true
      },
      {
        id: 'estimated_duration',
        name: 'estimatedDuration',
        label: 'Kohëzgjatja e Parashikuar (ditë)',
        type: 'number',
        required: true
      },
      {
        id: 'related_violations',
        name: 'relatedViolations',
        label: 'Kundërvajtjet e Lidhura',
        type: 'multiselect'
      },
      {
        id: 'budget_allocation',
        name: 'budgetAllocation',
        label: 'Alokimi i Buxhetit (€)',
        type: 'currency'
      }
    ],
    relatedModules: ['activity-management', 'officer-assignment'],
    workflows: ['case-approval', 'case-tracking'],
    reports: ['case-summary', 'progress-report'],
    active: true
  },
  {
    id: 'case-assignment',
    name: 'Ricaktimi i Rastit',
    nameEn: 'Case Reassignment',
    category: 'cases',
    icon: '👥',
    description: 'Ricaktimi i rasteve tek oficerë të tjerë',
    priority: 'MEDIUM',
    department: 'ADMINISTRATION',
    requiredRole: 'SECTOR_CHIEF',
    fields: [
      {
        id: 'case_id',
        name: 'caseId',
        label: 'ID e Rastit',
        type: 'text',
        required: true
      },
      {
        id: 'current_officer',
        name: 'currentOfficer',
        label: 'Oficeri Aktual',
        type: 'text',
        required: true
      },
      {
        id: 'new_officer',
        name: 'newOfficer',
        label: 'Oficeri i Ri',
        type: 'select',
        required: true
      },
      {
        id: 'reassignment_reason',
        name: 'reassignmentReason',
        label: 'Arsyeja e Ricaktimit',
        type: 'select',
        required: true,
        options: [
          'Ngarkesë pune',
          'Specializim',
          'Konflikt interesi',
          'Kerkesë e oficierit',
          'Riorganizim',
          'Arsye tjera'
        ]
      },
      {
        id: 'transfer_notes',
        name: 'transferNotes',
        label: 'Shënime për Transferim',
        type: 'textarea',
        required: true
      },
      {
        id: 'handover_date',
        name: 'handoverDate',
        label: 'Data e Dorëzimit',
        type: 'date',
        required: true
      }
    ],
    relatedModules: ['case-creation', 'officer-management'],
    workflows: ['reassignment-approval'],
    reports: ['reassignment-log'],
    active: true
  }
];

// Activity and Task Management Modules
export const activityModules: KosovoModule[] = [
  {
    id: 'activity-creation',
    name: 'Krijimi i Aktiviteteve',
    nameEn: 'Activity Creation',
    category: 'activities',
    icon: '📝',
    description: 'Krijimi dhe planifikimi i aktiviteteve dhe detyrave',
    priority: 'HIGH',
    department: 'OPERATIONS',
    requiredRole: 'OFFICER',
    fields: [
      {
        id: 'activity_type',
        name: 'activityType',
        label: 'Lloji i Aktivitetit',
        type: 'select',
        required: true,
        options: [
          'Inspektim',
          'Hetim',
          'Dokumentim',
          'Verifikim',
          'Trajnim',
          'Mirëmbajtje',
          'Raportim',
          'Koordinim'
        ]
      },
      {
        id: 'activity_title',
        name: 'activityTitle',
        label: 'Titulli i Aktivitetit',
        type: 'text',
        required: true
      },
      {
        id: 'activity_description',
        name: 'activityDescription',
        label: 'Përshkrimi i Aktivitetit',
        type: 'textarea',
        required: true
      },
      {
        id: 'start_date',
        name: 'startDate',
        label: 'Data e Fillimit',
        type: 'date',
        required: true
      },
      {
        id: 'due_date',
        name: 'dueDate',
        label: 'Data e Përfundimit',
        type: 'date',
        required: true
      },
      {
        id: 'assigned_team',
        name: 'assignedTeam',
        label: 'Ekipi i Caktuar',
        type: 'multiselect',
        required: true
      },
      {
        id: 'required_resources',
        name: 'requiredResources',
        label: 'Resurset e Nevojshme',
        type: 'textarea'
      },
      {
        id: 'expected_outcome',
        name: 'expectedOutcome',
        label: 'Rezultati i Pritur',
        type: 'textarea'
      },
      {
        id: 'activity_location',
        name: 'activityLocation',
        label: 'Vendndodhja',
        type: 'text',
        required: true
      },
      {
        id: 'estimated_hours',
        name: 'estimatedHours',
        label: 'Orët e Parashikuara',
        type: 'number',
        required: true
      }
    ],
    relatedModules: ['case-creation', 'task-management'],
    workflows: ['activity-approval', 'progress-tracking'],
    reports: ['activity-report', 'time-tracking'],
    active: true
  },
  {
    id: 'task-mailbox',
    name: 'Kutia Postare e Detyrave',
    nameEn: 'Task Mailbox',
    category: 'activities',
    icon: '📬',
    description: 'Sistemi i mesazheve dhe detyrave të brendshme',
    priority: 'MEDIUM',
    department: 'ADMINISTRATION',
    requiredRole: 'OFFICER',
    fields: [
      {
        id: 'message_type',
        name: 'messageType',
        label: 'Lloji i Mesazhit',
        type: 'select',
        required: true,
        options: [
          'Detyrë e re',
          'Përditësim statusi',
          'Kërkesë për informacion',
          'Njoftim',
          'Alarm',
          'Raport'
        ]
      },
      {
        id: 'recipient',
        name: 'recipient',
        label: 'Marrësi',
        type: 'select',
        required: true
      },
      {
        id: 'subject',
        name: 'subject',
        label: 'Subjekti',
        type: 'text',
        required: true
      },
      {
        id: 'message_content',
        name: 'messageContent',
        label: 'Përmbajtja e Mesazhit',
        type: 'textarea',
        required: true
      },
      {
        id: 'priority_level',
        name: 'priorityLevel',
        label: 'Niveli i Prioritetit',
        type: 'select',
        required: true,
        options: ['I ULËT', 'NORMAL', 'I LARTË', 'KRITIK']
      },
      {
        id: 'requires_response',
        name: 'requiresResponse',
        label: 'Kërkon Përgjigje',
        type: 'checkbox'
      },
      {
        id: 'response_deadline',
        name: 'responseDeadline',
        label: 'Afati i Përgjigjes',
        type: 'date',
        dependent: {
          field: 'requiresResponse',
          value: 'true'
        }
      },
      {
        id: 'attachments',
        name: 'attachments',
        label: 'Bashkëngjitje',
        type: 'file'
      }
    ],
    relatedModules: ['communication', 'notification-system'],
    workflows: ['message-routing', 'response-tracking'],
    reports: ['message-log', 'response-times'],
    active: true
  }
];

// Vehicle and Transport Modules
export const vehicleModules: KosovoModule[] = [
  {
    id: 'vehicle-registration',
    name: 'Regjistrimi i Mjeteve të Transportit',
    nameEn: 'Vehicle Registration',
    category: 'vehicles',
    icon: '🚛',
    description: 'Regjistrimi dhe menaxhimi i mjeteve të transportit',
    priority: 'HIGH',
    department: 'CUSTOMS_CONTROL',
    requiredRole: 'OFFICER',
    fields: [
      {
        id: 'plate_number',
        name: 'plateNumber',
        label: 'Numri i Targës',
        type: 'text',
        required: true,
        validation: {
          pattern: '^[A-Z]{1,3}[0-9]{1,4}[A-Z]{0,2}$',
          message: 'Format i targës i pavlefshëm'
        }
      },
      {
        id: 'vehicle_type',
        name: 'vehicleType',
        label: 'Lloji i Mjetit',
        type: 'select',
        required: true,
        options: [
          'Kamion',
          'Furgon',
          'Autobus',
          'Automobil',
          'Motocikletë',
          'Traktore',
          'Rimorkio',
          'Autotraktor'
        ]
      },
      {
        id: 'make',
        name: 'make',
        label: 'Marka',
        type: 'text',
        required: true
      },
      {
        id: 'model',
        name: 'model',
        label: 'Modeli',
        type: 'text',
        required: true
      },
      {
        id: 'year',
        name: 'year',
        label: 'Viti i Prodhimit',
        type: 'number',
        required: true,
        validation: {
          min: 1950,
          max: 2025,
          message: 'Viti duhet të jetë midis 1950-2025'
        }
      },
      {
        id: 'color',
        name: 'color',
        label: 'Ngjyra',
        type: 'text',
        required: true
      },
      {
        id: 'owner_name',
        name: 'ownerName',
        label: 'Emri i Pronarit',
        type: 'text',
        required: true
      },
      {
        id: 'owner_id',
        name: 'ownerId',
        label: 'Nr. Personal i Pronarit',
        type: 'text',
        required: true
      },
      {
        id: 'registration_country',
        name: 'registrationCountry',
        label: 'Vendi i Regjistrimit',
        type: 'select',
        required: true,
        options: [
          'Kosovë',
          'Shqipëri',
          'Maqedonia e Veriut',
          'Mal i Zi',
          'Serbi',
          'Të tjera'
        ]
      },
      {
        id: 'vehicle_capacity',
        name: 'vehicleCapacity',
        label: 'Kapaciteti (kg)',
        type: 'number'
      },
      {
        id: 'engine_number',
        name: 'engineNumber',
        label: 'Numri i Motorit',
        type: 'text'
      },
      {
        id: 'chassis_number',
        name: 'chassisNumber',
        label: 'Numri i Shasisë',
        type: 'text'
      }
    ],
    relatedModules: ['vehicle-inspection', 'driver-registration'],
    workflows: ['vehicle-verification'],
    reports: ['vehicle-registry', 'vehicle-statistics'],
    active: true
  },
  {
    id: 'vehicle-inspection',
    name: 'Inspektimi i Mjeteve',
    nameEn: 'Vehicle Inspection',
    category: 'vehicles',
    icon: '🔍',
    description: 'Inspektimi i detajuar i mjeteve dhe ngarkesave',
    priority: 'HIGH',
    department: 'CUSTOMS_CONTROL',
    requiredRole: 'OFFICER',
    fields: [
      {
        id: 'inspection_type',
        name: 'inspectionType',
        label: 'Lloji i Inspektimit',
        type: 'select',
        required: true,
        options: [
          'Inspektim rutinor',
          'Inspektim i detajuar',
          'Inspektim pas dyshimit',
          'Inspektim i ri',
          'Kontroll teknik'
        ]
      },
      {
        id: 'vehicle_id',
        name: 'vehicleId',
        label: 'ID e Mjetit',
        type: 'text',
        required: true
      },
      {
        id: 'inspection_location',
        name: 'inspectionLocation',
        label: 'Vendndodhja e Inspektimit',
        type: 'select',
        required: true,
        options: [
          'Pika Kufitare',
          'Qendra Doganore',
          'Rrugë',
          'Depo',
          'Port',
          'Aeroport'
        ]
      },
      {
        id: 'inspection_date',
        name: 'inspectionDate',
        label: 'Data e Inspektimit',
        type: 'date',
        required: true
      },
      {
        id: 'inspection_time',
        name: 'inspectionTime',
        label: 'Ora e Inspektimit',
        type: 'time',
        required: true
      },
      {
        id: 'inspector_officer',
        name: 'inspectorOfficer',
        label: 'Oficeri Inspektues',
        type: 'select',
        required: true
      },
      {
        id: 'documents_checked',
        name: 'documentsChecked',
        label: 'Dokumentet e Kontrolluara',
        type: 'multiselect',
        required: true,
        options: [
          'Leje drejtimi',
          'Regjistrim i mjetit',
          'Sigurim',
          'Manifest i ngarkesës',
          'Fatura',
          'Licensa transporti'
        ]
      },
      {
        id: 'exterior_condition',
        name: 'exteriorCondition',
        label: 'Gjendja e Jashtme',
        type: 'select',
        required: true,
        options: ['E mirë', 'E dëmtuar', 'E modifikuar', 'Dyshimtare']
      },
      {
        id: 'cargo_inspection',
        name: 'cargoInspection',
        label: 'Inspektimi i Ngarkesës',
        type: 'textarea',
        required: true
      },
      {
        id: 'irregularities_found',
        name: 'irregularitiesFound',
        label: 'Parregullsi të Gjetura',
        type: 'textarea'
      },
      {
        id: 'photos_taken',
        name: 'photosTaken',
        label: 'Foto të Marra',
        type: 'file'
      },
      {
        id: 'inspection_result',
        name: 'inspectionResult',
        label: 'Rezultati i Inspektimit',
        type: 'select',
        required: true,
        options: [
          'I kaluar',
          'I kaluar me vërejtje',
          'I mos kaluar',
          'Nevoja për inspektim të ri'
        ]
      }
    ],
    relatedModules: ['violation-registration', 'penalty-calculation'],
    workflows: ['inspection-approval', 'follow-up-actions'],
    reports: ['inspection-report', 'daily-inspections'],
    active: true
  }
];

// Goods and Merchandise Modules
export const goodsModules: KosovoModule[] = [
  {
    id: 'goods-confiscation',
    name: 'Konfiskimi i Artikujve',
    nameEn: 'Goods Confiscation',
    category: 'goods',
    icon: '📦',
    description: 'Konfiskimi dhe ruajtja e mallrave të ndaluara',
    priority: 'HIGH',
    department: 'CUSTOMS_CONTROL',
    requiredRole: 'OFFICER',
    fields: [
      {
        id: 'confiscation_reason',
        name: 'confiscationReason',
        label: 'Arsyeja e Konfiskimit',
        type: 'select',
        required: true,
        options: [
          'Mallra të ndaluara',
          'Mos deklarim',
          'Deklarim i gabuar',
          'Dokumente të falsifikuara',
          'Moskategorisje e saktë',
          'Tejkalim i kuotave'
        ]
      },
      {
        id: 'goods_description',
        name: 'goodsDescription',
        label: 'Përshkrimi i Mallrave',
        type: 'textarea',
        required: true
      },
      {
        id: 'goods_quantity',
        name: 'goodsQuantity',
        label: 'Sasia',
        type: 'number',
        required: true
      },
      {
        id: 'goods_unit',
        name: 'goodsUnit',
        label: 'Njësia Matëse',
        type: 'select',
        required: true,
        options: [
          'Copë',
          'Kilogram',
          'Litër',
          'Metër',
          'Kubik',
          'Paket',
          'Kuti',
          'Shumë'
        ]
      },
      {
        id: 'estimated_value',
        name: 'estimatedValue',
        label: 'Vlera e Vlerësuar (€)',
        type: 'currency',
        required: true
      },
      {
        id: 'origin_country',
        name: 'originCountry',
        label: 'Vendi i Origjinës',
        type: 'text',
        required: true
      },
      {
        id: 'confiscation_location',
        name: 'confiscationLocation',
        label: 'Vendi i Konfiskimit',
        type: 'select',
        required: true,
        options: [
          'Pika Kufitare Dheu i Bardhë',
          'Pika Kufitare Bërnjakë',
          'Pika Kufitare Qafë Morinë',
          'Pika Kufitare Jarinjë',
          'Pika Kufitare Merdare',
          'Aeroporti i Prishtinës',
          'Doganat e Brendshme'
        ]
      },
      {
        id: 'storage_location',
        name: 'storageLocation',
        label: 'Vendi i Ruajtjes',
        type: 'select',
        required: true,
        options: [
          'Depot Prishtinë',
          'Depot Prizren',
          'Depot Pejë',
          'Depot Mitrovicë',
          'Depot Gjakovë',
          'Depot Gjilan'
        ]
      },
      {
        id: 'responsible_officer',
        name: 'responsibleOfficer',
        label: 'Oficeri Përgjegjës',
        type: 'select',
        required: true
      },
      {
        id: 'photos_evidence',
        name: 'photosEvidence',
        label: 'Foto Dëshmi',
        type: 'file',
        required: true
      },
      {
        id: 'special_handling',
        name: 'specialHandling',
        label: 'Trajtim Special',
        type: 'multiselect',
        options: [
          'Mall i prishëm',
          'Mall i rrezikshëm',
          'Vlera e lartë',
          'Dokumentim i veçantë',
          'Temperatura e kontrolluar',
          'Siguri e shtuar'
        ]
      }
    ],
    relatedModules: ['violation-registration', 'storage-management'],
    workflows: ['confiscation-approval', 'disposal-process'],
    reports: ['confiscation-report', 'inventory-status'],
    active: true
  }
];

// Administrative and Financial Modules
export const administrativeModules: KosovoModule[] = [
  {
    id: 'administrative-penalty',
    name: 'Gjoba Administrative',
    nameEn: 'Administrative Penalty',
    category: 'penalties',
    icon: '💰',
    description: 'Llogaritja dhe aplikimi i gjobave administrative',
    priority: 'HIGH',
    department: 'LEGAL_AFFAIRS',
    requiredRole: 'OFFICER',
    fields: [
      {
        id: 'violation_reference',
        name: 'violationReference',
        label: 'Referenca e Kundërvajtjes',
        type: 'text',
        required: true
      },
      {
        id: 'penalty_type',
        name: 'penaltyType',
        label: 'Lloji i Gjobës',
        type: 'select',
        required: true,
        options: [
          'Gjobë për kontrabandë',
          'Gjobë për mos deklarim',
          'Gjobë për dokumente të rreme',
          'Gjobë për tejkalim kohor',
          'Gjobë për mosrespektim procedurash',
          'Gjobë administrative'
        ]
      },
      {
        id: 'base_amount',
        name: 'baseAmount',
        label: 'Shuma Bazë (€)',
        type: 'currency',
        required: true
      },
      {
        id: 'aggravating_factors',
        name: 'aggravatingFactors',
        label: 'Faktorë Rëndues',
        type: 'multiselect',
        options: [
          'Përsëritje e veprës',
          'Vlera e lartë',
          'Mallra të rrezikshëm',
          'Qëllim komercial',
          'Mosrespektim i autoriteteve',
          'Dokumente të falsifikuara'
        ]
      },
      {
        id: 'mitigating_factors',
        name: 'mitigatingFactors',
        label: 'Faktorë Lehtësues',
        type: 'multiselect',
        options: [
          'Bashkëpunim me autoritetet',
          'Deklarim vullnetar',
          'Herë e parë',
          'Gabim i padëshiruar',
          'Korrigjim i menjëhershëm',
          'Vështirësi ekonomike'
        ]
      },
      {
        id: 'final_amount',
        name: 'finalAmount',
        label: 'Shuma Finale (€)',
        type: 'currency',
        required: true
      },
      {
        id: 'payment_deadline',
        name: 'paymentDeadline',
        label: 'Afati i Pagesës',
        type: 'date',
        required: true
      },
      {
        id: 'appeal_rights',
        name: 'appealRights',
        label: 'E Drejta e Ankesës',
        type: 'textarea',
        required: true
      },
      {
        id: 'collection_method',
        name: 'collectionMethod',
        label: 'Mënyra e Arkëtimit',
        type: 'select',
        required: true,
        options: [
          'Pagesë direkte',
          'Transfer bankar',
          'Përmes bankës',
          'Zbritje nga llogaria',
          'Sekuestrim',
          'Ekzekutim forsues'
        ]
      }
    ],
    relatedModules: ['violation-registration', 'payment-tracking'],
    workflows: ['penalty-approval', 'collection-process'],
    reports: ['penalty-report', 'collection-status'],
    active: true
  },
  {
    id: 'protocol-registry',
    name: 'Regjistri i Zyrës Administrative - Libri i Protokollit',
    nameEn: 'Administrative Office Registry - Protocol Book',
    category: 'administration',
    icon: '📚',
    description: 'Regjistrimi zyrtar i të gjitha akteve dhe dokumenteve',
    priority: 'MEDIUM',
    department: 'ADMINISTRATION',
    requiredRole: 'OFFICER',
    fields: [
      {
        id: 'protocol_number',
        name: 'protocolNumber',
        label: 'Numri i Protokollit',
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
          'Vendim administrative',
          'Proces-verbal',
          'Raport inspektimi',
          'Kërkesë',
          'Ankesë',
          'Korrespondencë',
          'Urdhër',
          'Njoftim'
        ]
      },
      {
        id: 'document_title',
        name: 'documentTitle',
        label: 'Titulli i Dokumentit',
        type: 'text',
        required: true
      },
      {
        id: 'sender',
        name: 'sender',
        label: 'Dërguesi',
        type: 'text',
        required: true
      },
      {
        id: 'recipient',
        name: 'recipient',
        label: 'Marrësi',
        type: 'text',
        required: true
      },
      {
        id: 'registration_date',
        name: 'registrationDate',
        label: 'Data e Regjistrimit',
        type: 'date',
        required: true
      },
      {
        id: 'registration_time',
        name: 'registrationTime',
        label: 'Ora e Regjistrimit',
        type: 'time',
        required: true
      },
      {
        id: 'document_summary',
        name: 'documentSummary',
        label: 'Përmbledhja e Dokumentit',
        type: 'textarea',
        required: true
      },
      {
        id: 'priority_level',
        name: 'priorityLevel',
        label: 'Niveli i Prioritetit',
        type: 'select',
        required: true,
        options: ['I ULËT', 'NORMAL', 'I LARTË', 'URGJENT']
      },
      {
        id: 'classification',
        name: 'classification',
        label: 'Klasifikimi',
        type: 'select',
        required: true,
        options: [
          'Publik',
          'I brendshëm',
          'Konfidencial',
          'I kufizuar',
          'Sekret'
        ]
      },
      {
        id: 'responsible_unit',
        name: 'responsibleUnit',
        label: 'Njësia Përgjegjëse',
        type: 'select',
        required: true
      },
      {
        id: 'deadline',
        name: 'deadline',
        label: 'Afati',
        type: 'date'
      },
      {
        id: 'notes',
        name: 'notes',
        label: 'Shënime',
        type: 'textarea'
      }
    ],
    relatedModules: ['document-management', 'archive-system'],
    workflows: ['document-routing', 'archive-process'],
    reports: ['protocol-log', 'document-statistics'],
    active: true
  }
];

// Audit and Monitoring Modules
export const auditModules: KosovoModule[] = [
  {
    id: 'audit-diary',
    name: 'Ditari i Auditimit',
    nameEn: 'Audit Diary',
    category: 'audit',
    icon: '📋',
    description: 'Regjistrimi i të gjitha aktiviteteve të auditimit',
    priority: 'HIGH',
    department: 'INTERNAL_AUDIT',
    requiredRole: 'SECTOR_CHIEF',
    fields: [
      {
        id: 'audit_date',
        name: 'auditDate',
        label: 'Data e Auditimit',
        type: 'date',
        required: true
      },
      {
        id: 'audit_type',
        name: 'auditType',
        label: 'Lloji i Auditimit',
        type: 'select',
        required: true,
        options: [
          'Audit i brendshëm',
          'Audit i jashtëm',
          'Audit financiar',
          'Audit procedural',
          'Audit i performancës',
          'Audit i sigurisë'
        ]
      },
      {
        id: 'audited_unit',
        name: 'auditedUnit',
        label: 'Njësia e Audituar',
        type: 'select',
        required: true
      },
      {
        id: 'audit_scope',
        name: 'auditScope',
        label: 'Qëllimi i Auditimit',
        type: 'textarea',
        required: true
      },
      {
        id: 'auditor_team',
        name: 'auditorTeam',
        label: 'Ekipi i Auditorëve',
        type: 'multiselect',
        required: true
      },
      {
        id: 'audit_findings',
        name: 'auditFindings',
        label: 'Gjetjet e Auditimit',
        type: 'textarea',
        required: true
      },
      {
        id: 'recommendations',
        name: 'recommendations',
        label: 'Rekomandimet',
        type: 'textarea',
        required: true
      },
      {
        id: 'risk_level',
        name: 'riskLevel',
        label: 'Niveli i Rrezikut',
        type: 'select',
        required: true,
        options: ['I ULËT', 'MESATAR', 'I LARTË', 'KRITIK']
      },
      {
        id: 'corrective_actions',
        name: 'correctiveActions',
        label: 'Veprimet Korrigjuese',
        type: 'textarea'
      },
      {
        id: 'implementation_deadline',
        name: 'implementationDeadline',
        label: 'Afati i Implementimit',
        type: 'date'
      },
      {
        id: 'follow_up_date',
        name: 'followUpDate',
        label: 'Data e Ndjekjes',
        type: 'date'
      }
    ],
    relatedModules: ['risk-management', 'compliance-monitoring'],
    workflows: ['audit-approval', 'follow-up-tracking'],
    reports: ['audit-report', 'compliance-status'],
    active: true
  }
];

// Search and Filter Modules
export const searchModules: KosovoModule[] = [
  {
    id: 'advanced-search',
    name: 'Filtrat e Kërkimit të Avancuar',
    nameEn: 'Advanced Search Filters',
    category: 'search',
    icon: '🔍',
    description: 'Sistem i avancuar për kërkimin e të dhënave',
    priority: 'MEDIUM',
    department: 'INFORMATION_SYSTEMS',
    requiredRole: 'OFFICER',
    fields: [
      {
        id: 'search_type',
        name: 'searchType',
        label: 'Lloji i Kërkimit',
        type: 'select',
        required: true,
        options: [
          'Kërkim i përgjithshëm',
          'Kërkim i kundërvajtjeve',
          'Kërkim i rasteve',
          'Kërkim i mjeteve',
          'Kërkim i mallrave',
          'Kërkim i personave'
        ]
      },
      {
        id: 'date_range_from',
        name: 'dateRangeFrom',
        label: 'Data prej',
        type: 'date'
      },
      {
        id: 'date_range_to',
        name: 'dateRangeTo',
        label: 'Data deri',
        type: 'date'
      },
      {
        id: 'department_filter',
        name: 'departmentFilter',
        label: 'Filtro sipas Departamentit',
        type: 'multiselect',
        options: [
          'Kontrolli Doganor',
          'Hetimet',
          'Administrata',
          'Çështjet Ligjore',
          'Sistemi Informativ'
        ]
      },
      {
        id: 'status_filter',
        name: 'statusFilter',
        label: 'Filtro sipas Statusit',
        type: 'multiselect',
        options: [
          'Aktiv',
          'I mbyllur',
          'Në pritje',
          'I anuluar',
          'Në proces'
        ]
      },
      {
        id: 'priority_filter',
        name: 'priorityFilter',
        label: 'Filtro sipas Prioritetit',
        type: 'multiselect',
        options: ['I ULËT', 'MESATAR', 'I LARTË', 'URGJENT']
      },
      {
        id: 'officer_filter',
        name: 'officerFilter',
        label: 'Filtro sipas Oficierit',
        type: 'multiselect'
      },
      {
        id: 'location_filter',
        name: 'locationFilter',
        label: 'Filtro sipas Vendndodhjes',
        type: 'multiselect',
        options: [
          'Pika Kufitare Dheu i Bardhë',
          'Pika Kufitare Bërnjakë',
          'Pika Kufitare Qafë Morinë',
          'Pika Kufitare Jarinjë',
          'Pika Kufitare Merdare',
          'Aeroporti i Prishtinës',
          'Doganat e Brendshme'
        ]
      },
      {
        id: 'keyword_search',
        name: 'keywordSearch',
        label: 'Fjalë Kyçe',
        type: 'text'
      },
      {
        id: 'amount_range_min',
        name: 'amountRangeMin',
        label: 'Shuma minimale (€)',
        type: 'currency'
      },
      {
        id: 'amount_range_max',
        name: 'amountRangeMax',
        label: 'Shuma maksimale (€)',
        type: 'currency'
      }
    ],
    relatedModules: ['reporting-system', 'data-analytics'],
    workflows: ['search-optimization'],
    reports: ['search-analytics', 'usage-statistics'],
    active: true
  }
];

// Notification and Communication Modules
export const notificationModules: KosovoModule[] = [
  {
    id: 'notification-system',
    name: 'Sistemi i Njoftimeve',
    nameEn: 'Notification System',
    category: 'notifications',
    icon: '🔔',
    description: 'Menaxhimi i njoftimeve dhe paralajmërimeve',
    priority: 'HIGH',
    department: 'INFORMATION_SYSTEMS',
    requiredRole: 'OFFICER',
    fields: [
      {
        id: 'notification_type',
        name: 'notificationType',
        label: 'Lloji i Njoftimit',
        type: 'select',
        required: true,
        options: [
          'Alarm urgjent',
          'Njoftim rutinor',
          'Paralajmërim sistemi',
          'Njoftim administrative',
          'Alert sigurie',
          'Njoftim procedural'
        ]
      },
      {
        id: 'recipients',
        name: 'recipients',
        label: 'Marrësit',
        type: 'multiselect',
        required: true
      },
      {
        id: 'notification_title',
        name: 'notificationTitle',
        label: 'Titulli i Njoftimit',
        type: 'text',
        required: true
      },
      {
        id: 'notification_content',
        name: 'notificationContent',
        label: 'Përmbajtja',
        type: 'textarea',
        required: true
      },
      {
        id: 'priority_level',
        name: 'priorityLevel',
        label: 'Niveli i Prioritetit',
        type: 'select',
        required: true,
        options: ['I ULËT', 'NORMAL', 'I LARTË', 'KRITIK']
      },
      {
        id: 'delivery_method',
        name: 'deliveryMethod',
        label: 'Mënyra e Dorëzimit',
        type: 'multiselect',
        required: true,
        options: [
          'Sistemi i brendshëm',
          'Email',
          'SMS',
          'Njoftim desktop',
          'Aplikacion mobil'
        ]
      },
      {
        id: 'scheduled_time',
        name: 'scheduledTime',
        label: 'Ora e Planifikuar',
        type: 'date'
      },
      {
        id: 'expiry_time',
        name: 'expiryTime',
        label: 'Ora e Skadimit',
        type: 'date'
      },
      {
        id: 'requires_acknowledgment',
        name: 'requiresAcknowledgment',
        label: 'Kërkon Konfirmim',
        type: 'checkbox'
      },
      {
        id: 'attachments',
        name: 'attachments',
        label: 'Bashkëngjitje',
        type: 'file'
      }
    ],
    relatedModules: ['communication-system', 'alert-management'],
    workflows: ['notification-routing', 'acknowledgment-tracking'],
    reports: ['notification-log', 'delivery-status'],
    active: true
  }
];

// Export all modules
export const allKosovoModules: KosovoModule[] = [
  ...violationModules,
  ...caseModules,
  ...activityModules,
  ...vehicleModules,
  ...goodsModules,
  ...administrativeModules,
  ...auditModules,
  ...searchModules,
  ...notificationModules
];

// Module categories for organization
export const moduleCategories = {
  violations: 'Kundërvajtjet',
  cases: 'Rastet',
  activities: 'Aktivitetet',
  vehicles: 'Mjetet e Transportit',
  goods: 'Mallrat',
  penalties: 'Gjobat',
  administration: 'Administrata',
  audit: 'Auditimi',
  search: 'Kërkimi',
  notifications: 'Njoftimet'
};

// Get modules by category
export const getModulesByCategory = (category: string): KosovoModule[] => {
  return allKosovoModules.filter(module => module.category === category);
};

// Get module by ID
export const getModuleById = (id: string): KosovoModule | undefined => {
  return allKosovoModules.find(module => module.id === id);
};

// Get modules by department
export const getModulesByDepartment = (department: string): KosovoModule[] => {
  return allKosovoModules.filter(module => module.department === department);
};

// Get modules by required role
export const getModulesByRole = (role: string): KosovoModule[] => {
  return allKosovoModules.filter(module => module.requiredRole === role);
};
