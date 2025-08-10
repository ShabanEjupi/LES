// Document Templates Types - Albanian Customs Administration (LES)
// Shabllonet e Dokumenteve - Administrata Doganore e Shqipërisë

// Template Status Types
export type TemplateStatus = 
  | 'DRAFT'                    // Projekt - Template in development
  | 'UNDER_REVIEW'            // Në shqyrtim - Being reviewed
  | 'APPROVED'                // E miratuar - Ready for use
  | 'ACTIVE'                  // Aktive - Currently in use
  | 'DEPRECATED'              // E vjetëruar - No longer recommended
  | 'ARCHIVED'                // E arkivuar - Kept for historical records
  | 'SUSPENDED';              // E pezulluar - Temporarily disabled

// Template Types for Albanian Customs
export type TemplateType = 
  | 'VIOLATION_REPORT'        // Raporti i Kundërvajtjes
  | 'FINE_NOTICE'            // Njoftimi i Gjobës
  | 'CUSTOMS_DECLARATION'    // Deklarata Doganore
  | 'INSPECTION_REPORT'      // Raporti i Inspektimit
  | 'SEIZURE_REPORT'         // Raporti i Sekuestrimit
  | 'ADMINISTRATIVE_DECISION' // Vendimi Administrativ
  | 'APPEAL_FORM'            // Formulari i Ankesës
  | 'COURT_SUBMISSION'       // Dorëzimi në Gjykatë
  | 'NOTIFICATION_LETTER'    // Letra e Njoftimit
  | 'COMPLIANCE_CERTIFICATE' // Certifikata e Përputhshmërisë
  | 'EVIDENCE_INVENTORY'     // Inventari i Provave
  | 'WITNESS_STATEMENT'      // Dëshmia e Dëshmitarit
  | 'EXPERT_OPINION'         // Mendimi i Ekspertit
  | 'CASE_SUMMARY'           // Përmbledhja e Rastit
  | 'LEGAL_MEMO'             // Memorandumi Ligjor
  | 'CLOSURE_REPORT';        // Raporti i Mbylljes

// Template Category
export type TemplateCategory = 
  | 'LEGAL_DOCUMENTS'        // Dokumentet Ligjore
  | 'ADMINISTRATIVE_FORMS'   // Formularët Administrativë
  | 'VIOLATION_PROCESSING'   // Përpunimi i Kundërvajtjeve
  | 'COURT_SUBMISSIONS'      // Dorëzimet në Gjykatë
  | 'NOTIFICATIONS'          // Njoftimet
  | 'REPORTS'                // Raportet
  | 'CERTIFICATES'           // Certifikatat
  | 'CORRESPONDENCE';        // Korrespondenca

// Priority levels for template processing
export type TemplatePriority = 
  | 'LOW'                    // E ulët - Standard processing
  | 'MEDIUM'                 // Mesatare - Normal priority
  | 'HIGH'                   // E lartë - Expedited processing
  | 'URGENT'                 // Urgjente - Immediate attention
  | 'CRITICAL';              // Kritike - Emergency processing

// Field Types for Template Variables
export type TemplateFieldType = 
  | 'TEXT'                   // Tekst i thjeshtë
  | 'NUMBER'                 // Numër
  | 'DATE'                   // Data
  | 'DATETIME'               // Data dhe ora
  | 'CURRENCY'               // Monedha
  | 'PERCENTAGE'             // Përqindja
  | 'EMAIL'                  // Email adresa
  | 'PHONE'                  // Numri i telefonit
  | 'ID_NUMBER'              // Numri i identitetit
  | 'ADDRESS'                // Adresa
  | 'DROPDOWN'               // Lista e zgjedhjes
  | 'CHECKBOX'               // Kutia e kontrollit
  | 'RADIO'                  // Butoni radio
  | 'TEXTAREA'               // Zona e tekstit
  | 'FILE_UPLOAD'            // Ngarkimi i skedarit
  | 'SIGNATURE'              // Nënshkrimi
  | 'BARCODE'                // Kodi i shiritit
  | 'QR_CODE';               // Kodi QR

// Template Field Definition
export interface TemplateField {
  id: string;                          // Field identifier
  name: string;                        // Field name in Albanian
  nameEn?: string;                     // Field name in English
  type: TemplateFieldType;             // Field data type
  required: boolean;                   // Is field mandatory
  defaultValue?: string | number | boolean; // Default value
  placeholder?: string;                // Placeholder text
  validation?: {
    minLength?: number;                // Minimum character length
    maxLength?: number;                // Maximum character length
    pattern?: string;                  // Regex validation pattern
    min?: number;                      // Minimum numeric value
    max?: number;                      // Maximum numeric value
  };
  options?: Array<{                    // For dropdown/radio fields
    value: string;
    label: string;
    labelEn?: string;
  }>;
  dependsOn?: string;                  // Field dependency
  conditional?: {                      // Conditional display logic
    field: string;
    value: string | number | boolean;
    operator: '=' | '!=' | '>' | '<' | '>=' | '<=' | 'contains';
  };
  formatting?: {                       // Field formatting options
    currency?: 'ALL' | 'EUR' | 'USD';  // Currency type
    dateFormat?: 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD';
    numberFormat?: 'decimal' | 'integer' | 'percentage';
  };
}

// Template Section for organizing fields
export interface TemplateSection {
  id: string;                          // Section identifier
  title: string;                       // Section title in Albanian
  titleEn?: string;                    // Section title in English
  description?: string;                // Section description
  order: number;                       // Display order
  fields: TemplateField[];             // Fields in this section
  collapsible?: boolean;               // Can section be collapsed
  defaultCollapsed?: boolean;          // Default collapsed state
}

// Template Version Information
export interface TemplateVersion {
  version: string;                     // Version number (e.g., "1.0.0")
  createdAt: Date;                     // Version creation date
  createdBy: string;                   // User ID who created version
  changes: string;                     // Description of changes
  isActive: boolean;                   // Is this the active version
  approvedBy?: string;                 // User ID who approved version
  approvedAt?: Date;                   // Approval date
}

// Template Approval Workflow
export interface TemplateApprovalStep {
  id: string;                          // Step identifier
  stepName: string;                    // Step name
  role: string;                        // Required role for approval
  order: number;                       // Step order
  isRequired: boolean;                 // Is step mandatory
  completed: boolean;                  // Has step been completed
  completedBy?: string;                // User ID who completed step
  completedAt?: Date;                  // Completion date
  comments?: string;                   // Approval comments
  action: 'APPROVE' | 'REJECT' | 'REQUEST_CHANGES'; // Action taken
}

// Main Document Template Interface
export interface DocumentTemplate {
  id: string;                          // Unique template ID
  templateNumber: string;              // Template reference number
  name: string;                        // Template name in Albanian
  nameEn?: string;                     // Template name in English
  description: string;                 // Template description
  type: TemplateType;                  // Template type
  category: TemplateCategory;          // Template category
  status: TemplateStatus;              // Current status
  priority: TemplatePriority;          // Processing priority
  
  // Template Structure
  sections: TemplateSection[];         // Template sections
  
  // Template Content
  htmlTemplate: string;                // HTML template content
  cssStyles?: string;                  // Custom CSS styles
  header?: string;                     // Template header HTML
  footer?: string;                     // Template footer HTML
  watermark?: string;                  // Watermark text or image
  
  // Version Control
  version: string;                     // Current version
  versions: TemplateVersion[];         // Version history
  
  // Approval Workflow
  requiresApproval: boolean;           // Does template need approval
  approvalSteps: TemplateApprovalStep[]; // Approval workflow steps
  
  // Legal Compliance
  legalBasis?: string;                 // Legal basis for template
  complianceNotes?: string;            // Compliance requirements
  retentionPeriod?: number;            // Document retention period (years)
  
  // Access Control
  allowedRoles: string[];              // Roles that can use template
  departmentRestrictions?: string[];   // Department access restrictions
  
  // Usage Tracking
  usageCount: number;                  // How many times used
  lastUsed?: Date;                     // Last usage date
  
  // Metadata
  tags: string[];                      // Template tags for search
  keywords: string[];                  // Search keywords
  createdBy: string;                   // Creator user ID
  createdAt: Date;                     // Creation date
  updatedBy?: string;                  // Last updater user ID
  updatedAt?: Date;                    // Last update date
  publishedBy?: string;                // Publisher user ID
  publishedAt?: Date;                  // Publication date
  
  // Integration
  integrationSettings?: {              // External system integration
    autoSubmitTo?: string[];           // Systems to auto-submit to
    apiEndpoints?: string[];           // API endpoints for data
    webhooks?: string[];               // Webhook URLs
  };
}

// Template Instance (filled template)
export interface TemplateInstance {
  id: string;                          // Instance ID
  templateId: string;                  // Source template ID
  templateVersion: string;             // Template version used
  
  // Case Information
  caseId?: string;                     // Associated case ID
  violationId?: string;                // Associated violation ID
  
  // Instance Data
  data: Record<string, string | number | boolean | Date | string[]>; // Field values
  generatedContent: string;            // Generated document content
  
  // Status
  status: 'DRAFT' | 'COMPLETED' | 'SUBMITTED' | 'APPROVED' | 'REJECTED';
  
  // Metadata
  createdBy: string;                   // Creator user ID
  createdAt: Date;                     // Creation date
  completedAt?: Date;                  // Completion date
  submittedAt?: Date;                  // Submission date
  
  // File Information
  fileName?: string;                   // Generated file name
  filePath?: string;                   // File storage path
  fileSize?: number;                   // File size in bytes
  mimeType?: string;                   // File MIME type
  
  // Digital Signature
  digitalSignature?: {                 // Digital signature info
    signedBy: string;                  // Signer user ID
    signedAt: Date;                    // Signature date
    signature: string;                 // Signature data
    certificate: string;               // Certificate info
  };
}

// Template Search Filters
export interface TemplateSearchFilters {
  search?: string;                     // General search term
  type?: TemplateType;                 // Filter by type
  category?: TemplateCategory;         // Filter by category
  status?: TemplateStatus;             // Filter by status
  priority?: TemplatePriority;         // Filter by priority
  tags?: string[];                     // Filter by tags
  createdBy?: string;                  // Filter by creator
  createdAfter?: Date;                 // Created after date
  createdBefore?: Date;                // Created before date
  lastUsedAfter?: Date;                // Last used after date
  hasApprovalPending?: boolean;        // Has pending approvals
  allowedForRole?: string;             // Templates allowed for role
}

// Template Statistics
export interface TemplateStatistics {
  totalTemplates: number;              // Total number of templates
  activeTemplates: number;             // Number of active templates
  templatesAwaitingApproval: number;   // Templates pending approval
  mostUsedTemplates: Array<{           // Most frequently used
    templateId: string;
    name: string;
    usageCount: number;
  }>;
  recentTemplates: Array<{             // Recently created/updated
    templateId: string;
    name: string;
    updatedAt: Date;
  }>;
  templatesByCategory: Record<TemplateCategory, number>; // Count by category
  templatesByType: Record<TemplateType, number>;         // Count by type
}

// Template Export/Import
export interface TemplateExportData {
  template: DocumentTemplate;          // Template data
  instances?: TemplateInstance[];      // Associated instances
  exportedAt: Date;                    // Export timestamp
  exportedBy: string;                  // Exporter user ID
  version: string;                     // Export format version
}

// Template Validation Result
export interface TemplateValidationResult {
  isValid: boolean;                    // Is template valid
  errors: Array<{                      // Validation errors
    field?: string;                    // Field with error
    section?: string;                  // Section with error
    message: string;                   // Error message
    severity: 'ERROR' | 'WARNING' | 'INFO'; // Error severity
  }>;
  warnings: string[];                  // Validation warnings
  suggestions: string[];               // Improvement suggestions
}

// Template Audit Log
export interface TemplateAuditLog {
  id: string;                          // Audit log ID
  templateId: string;                  // Template ID
  action: 'CREATED' | 'UPDATED' | 'APPROVED' | 'REJECTED' | 'PUBLISHED' | 'ARCHIVED' | 'USED'; // Action performed
  userId: string;                      // User who performed action
  timestamp: Date;                     // When action occurred
  details: Record<string, string | number | boolean>; // Action details
  ipAddress?: string;                  // User IP address
  userAgent?: string;                  // User browser/agent
  changes?: Array<{                    // Changes made
    field: string;
    oldValue: string | number | boolean | null;
    newValue: string | number | boolean | null;
  }>;
}
