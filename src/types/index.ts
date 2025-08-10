// Core entity types for the Kosovo Customs Case Management System (CCMS)
// Based on Kosovo Customs Code (Law No. 03/L–109) and GDPR compliance

export interface User {
  id: string; // UUID as per thesis database design
  username: string;
  email: string;
  fullName: string;
  role: UserRole;
  department: KosovoCustomsDepartment;
  customsPost?: string; // Border post assignment
  officerBadgeNumber?: string; // Official customs officer ID
  permissions: Permission[];
  isActive: boolean;
  lastLogin?: Date;
  passwordHash: string; // Encrypted storage
  failedLoginAttempts: number;
  accountLockedUntil?: Date;
  dataAccessLevel: DataAccessLevel; // GDPR compliance levels
  hierarchyLevel: number; // 1-Officer, 2-Supervisor, 3-SectorChief, 4-Director
  sectorId?: string; // Sector assignment
  teamId?: string; // Team assignment
  createdAt: Date;
  updatedAt: Date;
}

export type KosovoCustomsDepartment = 
  | 'GENERAL_DIRECTORATE'
  | 'CUSTOMS_INVESTIGATIONS'
  | 'RISK_MANAGEMENT'
  | 'CUSTOMS_PROCEDURES'
  | 'POST_CLEARANCE_AUDIT'
  | 'LEGAL_AFFAIRS'
  | 'IT_DEPARTMENT'
  | 'BORDER_MANAGEMENT'
  | 'ANTI_SMUGGLING'
  | 'APPEALS_COMMISSION';

export type DataAccessLevel = 
  | 'PUBLIC'           // General customs information
  | 'INTERNAL'         // Internal customs operations
  | 'CONFIDENTIAL'     // Sensitive investigation data
  | 'SECRET'           // Classified enforcement operations
  | 'TOP_SECRET';      // National security level data

export interface UserRole {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  isSystemRole: boolean; // Cannot be deleted if true
  kosovoLegalBasis?: string; // Reference to Kosovo legal framework
}

export interface Permission {
  id: string;
  name: string;
  resource: string;
  action: string; // 'read', 'write', 'delete', 'approve', 'investigate', 'audit'
  conditions?: PermissionConditions; // Advanced RBAC conditions
  legalBasis?: string; // Kosovo Customs Code article reference
}

export interface PermissionConditions {
  departmentRestriction?: KosovoCustomsDepartment[];
  dataAccessLevelRequired?: DataAccessLevel;
  timeRestriction?: {
    startTime?: string; // HH:mm format
    endTime?: string;
    daysOfWeek?: number[]; // 0-6, Sunday = 0
  };
  ipRestriction?: string[]; // Allowed IP ranges
  locationRestriction?: string[]; // Allowed customs posts
}

export interface Case {
  id: string; // UUID format as per thesis
  caseNumber: string; // Auto-generated: CS-YYYY-NNNN format
  title: string;
  description: string;
  status: CaseStatus;
  priority: CasePriority;
  type: CaseType;
  assignedTo: string; // User ID
  createdBy: string; // User ID
  customsDeclaration?: CustomsDeclaration;
  violation?: Violation;
  documents: Document[];
  timeline: CaseActivity[];
  estimatedValue?: number;
  currency: string;
  deadlineDate?: Date;
  
  // Kosovo Customs Code specific fields
  customsPost: string; // Where case originated
  reportedParty?: Company; // Importer/Exporter being investigated
  violationType?: KosovoViolationType;
  legalReference?: string; // Customs Code article reference
  sanctionApplied?: CaseSanction;
  
  // Workflow and approval tracking
  workflow: WorkflowStatus;
  approvalChain: ApprovalStep[];
  
  // GDPR and audit requirements
  dataRetentionDate?: Date; // When case data should be archived/deleted
  dataClassification: DataAccessLevel;
  gdprNotes?: string; // Special GDPR handling instructions
  
  // Case relationships
  relatedCases?: string[]; // IDs of related cases
  parentCaseId?: string; // For sub-investigations
  
  createdAt: Date;
  updatedAt: Date;
}

export type KosovoViolationType = 
  | 'UNDERVALUATION'                    // Article 273 - Customs Code
  | 'MISCLASSIFICATION'                // Article 274 - Tariff misclassification
  | 'ORIGIN_FRAUD'                     // Article 275 - False origin certificates
  | 'PROHIBITED_GOODS'                 // Article 276 - Banned imports/exports
  | 'INCOMPLETE_DOCUMENTATION'         // Article 277 - Missing documents
  | 'TAX_EVASION'                      // Article 278 - Duty avoidance
  | 'SMUGGLING'                        // Article 279 - Illegal border crossing
  | 'TRANSIT_VIOLATION'                // Article 280 - Transit procedure abuse
  | 'TEMPORARY_ADMISSION_ABUSE'        // Temporary import violations
  | 'DUTY_FREE_ABUSE'                  // Duty-free shop violations
  | 'EXPORT_RESTRICTION_VIOLATION'     // Cultural heritage, etc.
  | 'LICENSING_VIOLATION';             // Import/export license violations

export interface CaseSanction {
  type: 'FINE' | 'CONFISCATION' | 'SUSPENSION' | 'CRIMINAL_REFERRAL' | 'WARNING';
  amount?: number;
  currency?: string;
  description: string;
  legalBasis: string; // Customs Code article
  appealDeadline?: Date;
  enforcementStatus: 'PENDING' | 'ENFORCED' | 'APPEALED' | 'SUSPENDED';
}

export interface ApprovalStep {
  id: string;
  stepName: string;
  assignedTo: string; // User ID or Role ID
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'SKIPPED';
  approvedBy?: string; // User ID
  approvedAt?: Date;
  comments?: string;
  digitalSignature?: DigitalSignature;
  requiredDocuments: string[]; // Document IDs that must be present
}

export type CaseStatus = 
  | 'DRAFT' 
  | 'SUBMITTED' 
  | 'UNDER_REVIEW' 
  | 'INVESTIGATION' 
  | 'PENDING_APPROVAL' 
  | 'APPROVED' 
  | 'REJECTED' 
  | 'CLOSED' 
  | 'APPEALED';

export type CasePriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export type CaseType = 
  | 'CUSTOMS_VIOLATION' 
  | 'IMPORT_INSPECTION' 
  | 'EXPORT_INSPECTION' 
  | 'TAX_ASSESSMENT' 
  | 'FRAUD_INVESTIGATION' 
  | 'COMPLIANCE_CHECK';

export interface CustomsDeclaration {
  id: string;
  declarationNumber: string;
  declarationType: 'IMPORT' | 'EXPORT' | 'TRANSIT';
  declarant: Company;
  goods: Good[];
  totalValue: number;
  currency: string;
  submissionDate: Date;
  clearanceDate?: Date;
  status: 'PENDING' | 'CLEARED' | 'DETAINED' | 'REJECTED';
}

export interface Company {
  id: string;
  name: string;
  registrationNumber: string;
  taxNumber: string;
  address: Address;
  contactPerson: string;
  email: string;
  phone: string;
  type: 'IMPORTER' | 'EXPORTER' | 'BROKER' | 'CARRIER';
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Good {
  id: string;
  description: string;
  hsCode: string; // Harmonized System Code
  quantity: number;
  unit: string;
  unitValue: number;
  totalValue: number;
  currency: string;
  originCountry: string;
  weight?: number;
  volume?: number;
}

export interface Violation {
  id: string;
  type: ViolationType;
  description: string;
  severity: 'MINOR' | 'MAJOR' | 'CRITICAL';
  penaltyAmount?: number;
  currency: string;
  regulations: string[]; // List of violated regulation references
  evidence: Document[];
}

export type ViolationType = 
  | 'UNDERVALUATION' 
  | 'MISCLASSIFICATION' 
  | 'PROHIBITED_GOODS' 
  | 'INCOMPLETE_DOCUMENTATION' 
  | 'TAX_EVASION' 
  | 'SMUGGLING';

export interface Document {
  id: string; // UUID format
  title: string;
  description?: string;
  type: DocumentType;
  category: DocumentCategory;
  fileUrl: string; // Encrypted storage URL
  fileName: string;
  fileSize: number;
  mimeType: string;
  version: number;
  isLatestVersion: boolean;
  uploadedBy: string; // User ID
  tags: string[];
  confidentialityLevel: DataAccessLevel; // Updated to use enhanced levels
  retentionDate?: Date;
  approvalStatus: 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED';
  digitalSignature?: DigitalSignature;
  metadata: DocumentMetadata;
  
  // Kosovo specific fields for evidence management
  evidenceType?: EvidenceType;
  chainOfCustody: ChainOfCustodyRecord[];
  forensicAnalysis?: ForensicAnalysisResult[];
  legalAdmissibility: 'ADMISSIBLE' | 'QUESTIONABLE' | 'INADMISSIBLE';
  sourceType: 'ORIGINAL' | 'COPY' | 'CERTIFIED_COPY' | 'DIGITAL_SCAN';
  
  // GDPR compliance fields
  containsPersonalData: boolean;
  dataSubjects?: string[]; // Names/IDs of data subjects
  gdprLawfulBasis?: GDPRLawfulBasis;
  dataRetentionReason?: string;
  
  createdAt: Date;
  updatedAt: Date;
}

export type EvidenceType = 
  | 'PHOTOGRAPH'                 // Physical evidence photos
  | 'VIDEO_RECORDING'           // Surveillance or inspection videos
  | 'AUDIO_RECORDING'           // Interviews, phone calls
  | 'DOCUMENT_SCAN'             // Scanned official documents
  | 'DIGITAL_EVIDENCE'          // Computer files, emails
  | 'WITNESS_STATEMENT'         // Written testimonies
  | 'EXPERT_REPORT'             // Technical analysis reports
  | 'LAB_ANALYSIS'              // Chemical/physical analysis
  | 'X_RAY_SCAN'                // Cargo scanning results
  | 'CUSTOMS_DECLARATION'       // Official customs forms
  | 'COMMERCIAL_INVOICE'        // Business transaction records
  | 'TRANSPORT_DOCUMENT'        // Bills of lading, airway bills
  | 'CERTIFICATE'               // Origin, quality certificates
  | 'SURVEILLANCE_DATA';        // CCTV, tracking data

export interface ChainOfCustodyRecord {
  id: string;
  transferredFrom?: string; // User ID (null for initial custody)
  transferredTo: string; // User ID
  transferDate: Date;
  location: string; // Where evidence is stored
  purpose: string; // Why evidence was transferred
  condition: 'EXCELLENT' | 'GOOD' | 'FAIR' | 'DAMAGED';
  notes?: string;
  digitalSignature: DigitalSignature;
}

export interface ForensicAnalysisResult {
  id: string;
  analysisType: 'CHEMICAL' | 'DIGITAL_FORENSICS' | 'DOCUMENT_ANALYSIS' | 'FINGERPRINT' | 'DNA';
  conductedBy: string; // Lab name or expert name
  analysisDate: Date;
  methodology: string;
  findings: string;
  conclusions: string;
  reliability: 'HIGH' | 'MEDIUM' | 'LOW';
  reportDocument?: string; // Document ID of full report
}

export type GDPRLawfulBasis = 
  | 'LEGAL_OBLIGATION'          // Article 6(1)(c) - Customs Code compliance
  | 'PUBLIC_TASK'               // Article 6(1)(e) - Customs enforcement
  | 'LEGITIMATE_INTERESTS'      // Article 6(1)(f) - Investigation purposes
  | 'VITAL_INTERESTS'           // Article 6(1)(d) - Public safety
  | 'CONSENT'                   // Article 6(1)(a) - Explicit consent
  | 'CONTRACT';                 // Article 6(1)(b) - Contract necessity

export type DocumentType = 
  | 'INVOICE' 
  | 'PACKING_LIST' 
  | 'CERTIFICATE' 
  | 'PERMIT' 
  | 'DECLARATION' 
  | 'REPORT' 
  | 'EVIDENCE' 
  | 'CORRESPONDENCE';

export type DocumentCategory = 
  | 'CUSTOMS_DECLARATION' 
  | 'SUPPORTING_DOCUMENTS' 
  | 'LEGAL_DOCUMENTS' 
  | 'EVIDENCE' 
  | 'REPORTS' 
  | 'CORRESPONDENCE' 
  | 'TEMPLATES';

export interface DocumentMetadata {
  checksum: string;
  encryptionKey?: string;
  accessLog: AccessLog[];
  workflow?: WorkflowStatus;
}

export interface DigitalSignature {
  signedBy: string; // User ID
  signatureData: string;
  timestamp: Date;
  certificateId: string;
  isValid: boolean;
}

export interface AccessLog {
  id: string; // UUID for each access event
  userId: string;
  action: AccessAction;
  timestamp: Date;
  ipAddress: string;
  userAgent: string;
  resource: string; // What was accessed (case, document, etc.)
  resourceId: string; // ID of the accessed resource
  success: boolean; // Whether access was granted
  failureReason?: string; // If access denied, why
  sessionId: string; // User session identifier
  geolocation?: GeolocationData; // Physical location if available
}

export type AccessAction = 
  | 'VIEW' 
  | 'DOWNLOAD' 
  | 'EDIT' 
  | 'DELETE' 
  | 'SHARE'
  | 'PRINT'
  | 'EXPORT'
  | 'COPY'
  | 'SEARCH'
  | 'LOGIN'
  | 'LOGOUT'
  | 'UPLOAD'
  | 'APPROVE'
  | 'REJECT';

export interface GeolocationData {
  latitude?: number;
  longitude?: number;
  accuracy?: number;
  city?: string;
  country?: string;
  ipBasedLocation?: string;
}

// Enhanced Audit Logging System (GDPR Compliant)
export interface AuditLog {
  id: string; // UUID format
  userId: string;
  action: string;
  resource: string; // Table/entity affected
  resourceId: string; // Specific record ID
  oldValues?: Record<string, unknown>; // Before change
  newValues?: Record<string, unknown>; // After change
  timestamp: Date;
  ipAddress: string;
  userAgent: string;
  success: boolean;
  errorMessage?: string;
  
  // Kosovo Customs specific audit fields
  customsPost?: string; // Where action originated
  legalBasis?: string; // Why action was performed
  businessJustification?: string; // Operational reason
  
  // GDPR compliance fields
  dataCategory?: 'PERSONAL' | 'SENSITIVE' | 'CRIMINAL' | 'ADMINISTRATIVE';
  retentionPeriod: number; // Days to retain audit log
  automaticDelete: boolean; // Whether to auto-delete after retention
  
  // Digital integrity
  checksum: string; // Tamper detection
  digitalSignature?: string; // Non-repudiation
  
  // Case/investigation linking
  relatedCaseId?: string; // If action was case-related
  investigationPhase?: 'INITIAL' | 'ACTIVE' | 'CLOSING' | 'CLOSED';
}

export interface CaseActivity {
  id: string;
  caseId: string;
  type: ActivityType;
  description: string;
  performedBy: string; // User ID
  timestamp: Date;
  changes?: Record<string, unknown>;
  attachments?: string[]; // Document IDs
}

export type ActivityType = 
  | 'CREATED' 
  | 'UPDATED' 
  | 'STATUS_CHANGED' 
  | 'ASSIGNED' 
  | 'COMMENT_ADDED' 
  | 'DOCUMENT_UPLOADED' 
  | 'APPROVED' 
  | 'REJECTED';

export interface WorkflowStatus {
  currentStep: string;
  steps: WorkflowStep[];
  isCompleted: boolean;
  completedAt?: Date;
}

export interface WorkflowStep {
  id: string;
  name: string;
  description: string;
  assignedTo?: string; // User ID or Role ID
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'SKIPPED';
  completedBy?: string; // User ID
  completedAt?: Date;
  comments?: string;
  requiredDocuments: string[];
  nextSteps: string[];
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  relatedEntityType?: 'CASE' | 'DOCUMENT' | 'USER';
  relatedEntityId?: string;
  actionUrl?: string;
  createdAt: Date;
  readAt?: Date;
}

export type NotificationType = 
  | 'CASE_ASSIGNED' 
  | 'CASE_STATUS_CHANGED' 
  | 'DOCUMENT_APPROVAL_REQUIRED' 
  | 'DEADLINE_APPROACHING' 
  | 'SYSTEM_MAINTENANCE' 
  | 'VIOLATION_DETECTED';

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId: string;
  details: Record<string, unknown>;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
  success: boolean;
  errorMessage?: string;
}

// Advanced Reporting System (Chapter 14: Evaluation and Expected Impact)
export interface Report {
  id: string;
  name: string;
  description: string;
  type: ReportType;
  parameters: ReportParameter[];
  schedule?: ReportSchedule;
  format: ReportFormat[];
  createdBy: string; // User ID
  isPublic: boolean;
  
  // Kosovo Customs specific reporting
  kosovoReportingRequirement?: KosovoReportingType;
  euReportingStandard?: 'UCC' | 'NCTS' | 'EORI' | 'AEO';
  confidentialityLevel: DataAccessLevel;
  
  // Advanced analytics features
  dataVisualization: DataVisualizationType[];
  kpiMetrics: KPIDefinition[];
  benchmarkComparison?: BenchmarkData;
  
  // GDPR compliance for reports
  containsPersonalData: boolean;
  anonymizationLevel: 'NONE' | 'PARTIAL' | 'FULL';
  
  createdAt: Date;
  updatedAt: Date;
}

export type ReportType = 
  | 'CASE_SUMMARY'                    // General case statistics
  | 'VIOLATION_STATISTICS'           // Violation type analysis
  | 'PERFORMANCE_METRICS'            // Officer/department performance
  | 'COMPLIANCE_REPORT'              // Legal compliance status
  | 'FINANCIAL_SUMMARY'              // Revenue and penalties
  | 'CUSTOMS_REVENUE_ANALYSIS'       // Tax collection analysis
  | 'RISK_ASSESSMENT_REPORT'         // Risk management insights
  | 'CROSS_BORDER_ANALYSIS'          // Border post statistics
  | 'INVESTIGATION_EFFICIENCY'       // Case resolution times
  | 'EVIDENCE_MANAGEMENT_REPORT'     // Evidence handling metrics
  | 'GDPR_COMPLIANCE_AUDIT'          // Data protection compliance
  | 'SYSTEM_USAGE_ANALYTICS'         // Platform usage statistics
  | 'EXTERNAL_AGENCY_COOPERATION'    // Inter-agency collaboration
  | 'EU_REPORTING_SUBMISSION'        // EU customs reporting
  | 'PARLIAMENTARY_BRIEFING';        // Government oversight reports

export type KosovoReportingType = 
  | 'MONTHLY_CUSTOMS_STATISTICS'     // Required by Kosovo Customs Code
  | 'QUARTERLY_VIOLATION_SUMMARY'    // For Ministry of Finance
  | 'ANNUAL_COMPLIANCE_REPORT'       // For Assembly of Kosovo
  | 'EU_PROGRESS_REPORT'             // For European Commission
  | 'ANTI_CORRUPTION_AUDIT'          // For Anti-Corruption Agency
  | 'JUDICIAL_COOPERATION_REPORT'    // For Kosovo Judicial Council
  | 'TRADE_FACILITATION_METRICS';    // For World Bank/IMF

export type ReportFormat = 'PDF' | 'EXCEL' | 'CSV' | 'JSON' | 'XML' | 'HTML';

export type DataVisualizationType = 
  | 'BAR_CHART' 
  | 'LINE_CHART' 
  | 'PIE_CHART' 
  | 'HEATMAP' 
  | 'TREEMAP' 
  | 'SCATTER_PLOT' 
  | 'HISTOGRAM' 
  | 'AREA_CHART'
  | 'GAUGE_CHART'
  | 'FUNNEL_CHART'
  | 'GEOGRAPHIC_MAP';

export interface KPIDefinition {
  id: string;
  name: string;
  description: string;
  formula: string; // Mathematical formula for calculation
  targetValue?: number;
  unit: string;
  frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'ANNUALLY';
  category: 'EFFICIENCY' | 'COMPLIANCE' | 'REVENUE' | 'QUALITY' | 'TIMELINESS';
}

export interface BenchmarkData {
  type: 'INTERNAL_HISTORICAL' | 'REGIONAL_COMPARISON' | 'EU_AVERAGE' | 'BEST_PRACTICE';
  comparisonValues: Record<string, number>;
  dateRange: {
    from: Date;
    to: Date;
  };
  source: string;
}

export interface ReportParameter {
  name: string;
  type: 'STRING' | 'NUMBER' | 'DATE' | 'BOOLEAN' | 'SELECT';
  required: boolean;
  defaultValue?: string | number | boolean;
  options?: string[]; // For SELECT type
}

export interface ReportSchedule {
  frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY';
  time: string; // HH:mm format
  recipients: string[]; // User IDs or email addresses
  isActive: boolean;
}

export interface SystemSettings {
  id: string;
  category: 'GENERAL' | 'SECURITY' | 'WORKFLOW' | 'NOTIFICATIONS';
  key: string;
  value: string | number | boolean | object;
  description: string;
  isPublic: boolean;
  updatedBy: string; // User ID
  updatedAt: Date;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form types
export interface CaseFormData {
  title: string;
  description: string;
  type: CaseType;
  priority: CasePriority;
  assignedTo: string;
  customsDeclaration?: Partial<CustomsDeclaration>;
  violation?: Partial<Violation>;
  deadlineDate?: Date;
}

export interface UserFormData {
  username: string;
  email: string;
  fullName: string;
  role: string;
  department: string;
  isActive: boolean;
}

export interface DocumentFormData {
  title: string;
  description?: string;
  type: DocumentType;
  category: DocumentCategory;
  tags: string[];
  confidentialityLevel: 'PUBLIC' | 'INTERNAL' | 'CONFIDENTIAL' | 'SECRET';
  file: File;
}

// Filter and search types
export interface CaseFilters {
  status?: CaseStatus[];
  priority?: CasePriority[];
  type?: CaseType[];
  assignedTo?: string[];
  createdBy?: string[];
  dateRange?: {
    from: Date;
    to: Date;
  };
  searchQuery?: string;
}

export interface DocumentFilters {
  type?: DocumentType[];
  category?: DocumentCategory[];
  confidentialityLevel?: string[];
  uploadedBy?: string[];
  tags?: string[];
  dateRange?: {
    from: Date;
    to: Date;
  };
  searchQuery?: string;
}

// Chart data types for dashboard
export interface ChartData {
  label: string;
  value: number;
  color?: string;
}

export interface TimeSeriesData {
  date: string;
  value: number;
  category?: string;
}

export interface KPIData {
  title: string;
  value: number | string;
  change?: number;
  changeType?: 'increase' | 'decrease' | 'neutral';
  format?: 'number' | 'currency' | 'percentage';
  icon?: string;
}

// Export Document Templates types
export * from './DocumentTemplates';
