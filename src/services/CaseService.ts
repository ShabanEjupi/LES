/**
 * KOSOVO CUSTOMS CASE SERVICE - 2025
 * Comprehensive case management service with hierarchy integration
 * Integrates with KosovoCaseSynchronizationService for role-based access control
 */

import { caseSynchronizationService } from './KosovoCaseSynchronization';
import type { Case, CaseStatus, CasePriority, CaseType } from '../types';

export interface CaseListFilters {
  searchTerm?: string;
  status?: CaseStatus;
  type?: CaseType;
  priority?: CasePriority;
  assignedTo?: string;
  customsPost?: string;
  dateFrom?: Date;
  dateTo?: Date;
  violationType?: string;
}

export interface CaseCreationData {
  title: string;
  description: string;
  type: CaseType;
  priority: CasePriority;
  customsPost: string;
  violationType?: string;
  estimatedValue?: number;
  currency: string;
  deadlineDate?: Date;
  reportedParty?: {
    name: string;
    registrationNumber?: string;
    address: string;
    contactInfo: string;
  };
  assignedTo?: string;
}

export interface CaseStatistics {
  totalCases: number;
  openCases: number;
  inProgressCases: number;
  closedCases: number;
  highPriorityCases: number;
  overdueCases: number;
  myAssignedCases: number;
  teamCases: number;
}

export class CaseService {
  private static instance: CaseService;
  private cases: Map<string, Case> = new Map();

  private constructor() {
    this.initializeMockData();
  }

  public static getInstance(): CaseService {
    if (!CaseService.instance) {
      CaseService.instance = new CaseService();
    }
    return CaseService.instance;
  }

  /**
   * Initialize with Kosovo Customs mock data
   */
  private initializeMockData(): void {
    const mockCases: Case[] = [
      {
        id: 'KS-2025-001',
        caseNumber: 'KS-2025-001',
        title: 'Kontrabandë Mallrash në Dogana Merdarë',
        description: 'Dyshim për kontrabandë mallrash me vlerë të lartë në Dogana Merdarë',
        status: 'UNDER_REVIEW',
        priority: 'HIGH',
        type: 'CUSTOMS_VIOLATION',
        assignedTo: 'OFF001',
        createdBy: 'SUP001',
        customsPost: 'Dogana Merdarë',
        violationType: 'SMUGGLING',
        legalReference: 'Neni 145, Kodi Doganor i Kosovës',
        estimatedValue: 75000,
        currency: 'EUR',
        deadlineDate: new Date('2025-02-15'),
        documents: [],
        timeline: [
          {
            id: 'activity-001',
            caseId: 'KS-2025-001',
            type: 'CREATED',
            description: 'Rasti u krijua nga raportimi i oficerit doganor',
            performedBy: 'SUP001',
            performedAt: new Date('2025-01-15T08:30:00'),
            timestamp: new Date('2025-01-15T08:30:00'),
            metadata: { customsPost: 'Dogana Merdarë' }
          }
        ],
        workflow: {
          currentStep: 'INVESTIGATION',
          steps: [
            { 
              id: 'step-001',
              name: 'CREATED', 
              description: 'Rasti u krijua',
              status: 'COMPLETED', 
              completedAt: new Date('2025-01-15T08:30:00'),
              requiredDocuments: [],
              nextSteps: ['step-002']
            },
            { 
              id: 'step-002',
              name: 'INVESTIGATION', 
              description: 'Hetimi në proces',
              status: 'IN_PROGRESS',
              requiredDocuments: [],
              nextSteps: ['step-003']
            },
            { 
              id: 'step-003',
              name: 'REVIEW', 
              description: 'Rishikimi nga supervizori',
              status: 'PENDING',
              requiredDocuments: [],
              nextSteps: ['step-004']
            },
            { 
              id: 'step-004',
              name: 'DECISION', 
              description: 'Vendimi përfundimtar',
              status: 'PENDING',
              requiredDocuments: [],
              nextSteps: []
            }
          ],
          isCompleted: false,
          lastUpdated: new Date('2025-01-15T09:00:00')
        },
        approvalChain: [],
        dataClassification: 'CONFIDENTIAL',
        createdAt: new Date('2025-01-15T08:30:00'),
        updatedAt: new Date('2025-01-15T09:00:00')
      },
      {
        id: 'KS-2025-002',
        caseNumber: 'KS-2025-002',
        title: 'Shmangje Tatimore në Import Mallrash',
        description: 'Përdorim i dokumenteve të rreme për shmangje nga tatimi doganor',
        status: 'INVESTIGATION',
        priority: 'MEDIUM',
        type: 'TAX_ASSESSMENT',
        assignedTo: 'OFF002',
        createdBy: 'SC001',
        customsPost: 'Dogana Prishtinë',
        violationType: 'TAX_EVASION',
        legalReference: 'Neni 142, Kodi Doganor i Kosovës',
        estimatedValue: 25000,
        currency: 'EUR',
        deadlineDate: new Date('2025-02-20'),
        documents: [],
        timeline: [
          {
            id: 'activity-002',
            caseId: 'KS-2025-002',
            type: 'CASE_CREATED',
            description: 'Rasti u krijua nga kontrolli i auditimit',
            performedBy: 'SC001',
            performedAt: new Date('2025-01-18T10:15:00'),
            timestamp: new Date('2025-01-18T10:15:00'),
            metadata: { customsPost: 'Dogana Prishtinë' }
          }
        ],
        workflow: {
          currentStep: 'INVESTIGATION',
          isCompleted: false,
          steps: [
            { 
              id: 'step-1',
              name: 'CREATED', 
              description: 'Case creation step',
              status: 'COMPLETED', 
              completedAt: new Date('2025-01-18T10:15:00'),
              requiredDocuments: [],
              nextSteps: ['step-2']
            },
            { 
              id: 'step-2',
              name: 'INVESTIGATION', 
              description: 'Investigation phase',
              status: 'IN_PROGRESS', 
              startedAt: new Date('2025-01-18T11:00:00'),
              requiredDocuments: [],
              nextSteps: ['step-3']
            },
            { 
              id: 'step-3',
              name: 'REVIEW', 
              description: 'Review phase',
              status: 'PENDING',
              requiredDocuments: [],
              nextSteps: ['step-4']
            },
            { 
              id: 'step-4',
              name: 'DECISION', 
              description: 'Decision phase',
              status: 'PENDING',
              requiredDocuments: [],
              nextSteps: []
            }
          ],
          lastUpdated: new Date('2025-01-18T11:00:00')
        },
        approvalChain: [],
        dataClassification: 'INTERNAL',
        createdAt: new Date('2025-01-18T10:15:00'),
        updatedAt: new Date('2025-01-18T11:00:00')
      },
      {
        id: 'KS-2025-003',
        caseNumber: 'KS-2025-003',
        title: 'Kontrolli i Mallrave të Rrezikshme',
        description: 'Kontrolli i importit të mallrave të rrezikshme pa licencë të përshtatshme',
        status: 'PENDING_APPROVAL',
        priority: 'URGENT',
        type: 'IMPORT_INSPECTION',
        assignedTo: 'OFF003',
        createdBy: 'OFF003',
        customsPost: 'Dogana Gjilan',
        violationType: 'PROHIBITED_GOODS',
        legalReference: 'Neni 135, Kodi Doganor i Kosovës',
        estimatedValue: 150000,
        currency: 'EUR',
        deadlineDate: new Date('2025-01-25'),
        documents: [],
        timeline: [
          {
            id: 'activity-003',
            caseId: 'KS-2025-003',
            type: 'CASE_CREATED',
            description: 'Rasti u krijua nga inspektimi i mallrave',
            performedBy: 'OFF003',
            performedAt: new Date('2025-01-20T14:45:00'),
            timestamp: new Date('2025-01-20T14:45:00'),
            metadata: { customsPost: 'Dogana Gjilan' }
          }
        ],
        workflow: {
          currentStep: 'REVIEW',
          isCompleted: false,
          steps: [
            { 
              id: 'step-1', 
              name: 'CREATED', 
              description: 'Case creation step',
              status: 'COMPLETED', 
              completedAt: new Date('2025-01-20T14:45:00'),
              requiredDocuments: [],
              nextSteps: ['step-2']
            },
            { 
              id: 'step-2', 
              name: 'INVESTIGATION', 
              description: 'Investigation phase',
              status: 'COMPLETED', 
              completedAt: new Date('2025-01-22T16:30:00'),
              requiredDocuments: [],
              nextSteps: ['step-3']
            },
            { 
              id: 'step-3', 
              name: 'REVIEW', 
              description: 'Review phase',
              status: 'IN_PROGRESS', 
              startedAt: new Date('2025-01-22T17:00:00'),
              requiredDocuments: [],
              nextSteps: ['step-4']
            },
            { 
              id: 'step-4', 
              name: 'DECISION', 
              description: 'Decision phase',
              status: 'PENDING',
              requiredDocuments: [],
              nextSteps: []
            }
          ],
          lastUpdated: new Date('2025-01-22T17:00:00')
        },
        approvalChain: [],
        dataClassification: 'CONFIDENTIAL',
        createdAt: new Date('2025-01-20T14:45:00'),
        updatedAt: new Date('2025-01-22T17:00:00')
      }
    ];

    mockCases.forEach(caseData => {
      this.cases.set(caseData.id, caseData);
      // Sync with hierarchy system
      caseSynchronizationService.synchronizeCase(caseData);
    });
  }

  /**
   * Get cases visible to user based on hierarchy
   */
  public async getCasesForUser(
    userId: string, 
    userHierarchyLevel: number,
    sectorId?: string,
    teamId?: string,
    filters?: CaseListFilters
  ): Promise<Case[]> {
    const allCases = Array.from(this.cases.values());
    
    // Get cases based on hierarchy access
    const accessibleCaseIds = caseSynchronizationService.getCasesForUser(
      userId, 
      this.mapHierarchyLevel(userHierarchyLevel)
    );

    let visibleCases: Case[] = [];

    if (accessibleCaseIds.includes('ALL_CASES')) {
      // Director level - see all cases
      visibleCases = allCases;
    } else {
      // Filter based on accessible case IDs and user hierarchy
      visibleCases = allCases.filter(caseData => {
        // Officers see only their own cases
        if (userHierarchyLevel === 1) {
          return caseData.assignedTo === userId;
        }
        // Supervisors see their team's cases
        if (userHierarchyLevel === 2) {
          return caseData.assignedTo === userId || 
                 (teamId && this.isInTeam(caseData.assignedTo, teamId));
        }
        // Sector Chiefs see sector cases
        if (userHierarchyLevel === 3) {
          return sectorId && this.isInSector(caseData.customsPost, sectorId);
        }
        // Directors see all
        return true;
      });
    }

    // Apply additional filters
    if (filters) {
      visibleCases = this.applyFilters(visibleCases, filters);
    }

    return visibleCases.sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }

  /**
   * Create a new case
   */
  public async createCase(
    caseData: CaseCreationData,
    createdBy: string
  ): Promise<Case> {
    const caseId = this.generateCaseId();
    const caseNumber = this.generateCaseNumber();

    const newCase: Case = {
      id: caseId,
      caseNumber,
      title: caseData.title,
      description: caseData.description,
      status: 'DRAFT',
      priority: caseData.priority,
      type: caseData.type,
      assignedTo: caseData.assignedTo || createdBy,
      createdBy,
      customsPost: caseData.customsPost,
      violationType: caseData.violationType as any,
      estimatedValue: caseData.estimatedValue,
      currency: caseData.currency,
      deadlineDate: caseData.deadlineDate,
      reportedParty: caseData.reportedParty ? {
        id: this.generateId(),
        name: caseData.reportedParty.name,
        registrationNumber: caseData.reportedParty.registrationNumber,
        taxNumber: caseData.reportedParty.registrationNumber || '',
        contactPerson: '',
        email: caseData.reportedParty.contactInfo || '',
        phone: '',
        address: {
          street: caseData.reportedParty.address,
          city: '',
          state: '',
          postalCode: '',
          country: 'Kosovo'
        },
        contactInfo: {
          email: caseData.reportedParty.contactInfo || '',
          phone: '',
          website: ''
        },
        type: 'IMPORTER'
      } : undefined,
      documents: [],
      timeline: [
        {
          id: this.generateId(),
          caseId,
          type: 'CASE_CREATED',
          description: 'Rasti u krijua',
          performedBy: createdBy,
          performedAt: new Date(),
          timestamp: new Date(),
          metadata: { customsPost: caseData.customsPost }
        }
      ],
      workflow: {
        currentStep: 'CREATED',
        isCompleted: false,
        steps: [
          { 
            id: 'step-1',
            name: 'CREATED', 
            description: 'Case created',
            status: 'COMPLETED', 
            completedAt: new Date(),
            requiredDocuments: [],
            nextSteps: ['step-2']
          },
          { 
            id: 'step-2',
            name: 'INVESTIGATION', 
            description: 'Investigation phase',
            status: 'PENDING',
            requiredDocuments: [],
            nextSteps: ['step-3']
          },
          { 
            id: 'step-3',
            name: 'REVIEW', 
            description: 'Review phase',
            status: 'PENDING',
            requiredDocuments: [],
            nextSteps: ['step-4']
          },
          { 
            id: 'step-4',
            name: 'DECISION', 
            description: 'Decision phase',
            status: 'PENDING',
            requiredDocuments: [],
            nextSteps: []
          }
        ],
        lastUpdated: new Date()
      },
      approvalChain: [],
      dataClassification: 'INTERNAL',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.cases.set(caseId, newCase);
    
    // Sync with hierarchy system
    await caseSynchronizationService.synchronizeCase(newCase);

    return newCase;
  }

  /**
   * Get case by ID (with access control)
   */
  public async getCaseById(
    caseId: string,
    userId: string,
    userHierarchyLevel: number
  ): Promise<Case | null> {
    const caseData = this.cases.get(caseId);
    if (!caseData) return null;

    // Check access permissions
    const canAccess = caseSynchronizationService.canUserAccessCase(userId, caseId);
    if (!canAccess) {
      // Additional hierarchy-based check
      if (userHierarchyLevel === 1 && caseData.assignedTo !== userId) {
        return null; // Officers can only see their own cases
      }
    }

    return caseData;
  }

  /**
   * Update case status
   */
  public async updateCaseStatus(
    caseId: string,
    newStatus: CaseStatus,
    userId: string,
    notes?: string
  ): Promise<Case | null> {
    const caseData = this.cases.get(caseId);
    if (!caseData) return null;

    // Check edit permissions
    const accessLevel = caseSynchronizationService.getUserAccessLevel(userId, caseId);
    if (accessLevel !== 'WRITE' && accessLevel !== 'FULL_ACCESS') {
      throw new Error('Nuk keni të drejta për të modifikuar këtë rast');
    }

    caseData.status = newStatus;
    caseData.updatedAt = new Date();

    // Add timeline entry
    caseData.timeline.push({
      id: this.generateId(),
      caseId,
      type: 'STATUS_CHANGED',
      description: `Statusi u ndryshua në: ${newStatus}${notes ? ` - ${notes}` : ''}`,
      performedBy: userId,
      performedAt: new Date(),
      timestamp: new Date(),
      metadata: { oldStatus: caseData.status, newStatus, notes }
    });

    // Update workflow
    this.updateWorkflowStatus(caseData, newStatus);

    this.cases.set(caseId, caseData);
    return caseData;
  }

  /**
   * Reassign case to different user
   */
  public async reassignCase(
    caseId: string,
    newAssigneeId: string,
    reassignedBy: string,
    reason?: string
  ): Promise<Case | null> {
    const caseData = this.cases.get(caseId);
    if (!caseData) return null;

    const oldAssignee = caseData.assignedTo;
    caseData.assignedTo = newAssigneeId;
    caseData.updatedAt = new Date();

    // Add timeline entry
    caseData.timeline.push({
      id: this.generateId(),
      caseId,
      type: 'CASE_REASSIGNED',
      description: `Rasti u ricaktua nga ${oldAssignee} tek ${newAssigneeId}${reason ? ` - ${reason}` : ''}`,
      performedBy: reassignedBy,
      performedAt: new Date(),
      timestamp: new Date(),
      metadata: { oldAssignee, newAssignee: newAssigneeId, reason }
    });

    this.cases.set(caseId, caseData);

    // Update hierarchy synchronization
    await caseSynchronizationService.reassignCase(caseId, newAssigneeId);

    return caseData;
  }

  /**
   * Get case statistics for dashboard
   */
  public async getCaseStatistics(
    userId: string,
    userHierarchyLevel: number,
    sectorId?: string,
    teamId?: string
  ): Promise<CaseStatistics> {
    const cases = await this.getCasesForUser(userId, userHierarchyLevel, sectorId, teamId);
    const myCases = cases.filter(c => c.assignedTo === userId);
    const teamCases = teamId ? cases.filter(c => this.isInTeam(c.assignedTo, teamId)) : [];

    return {
      totalCases: cases.length,
      openCases: cases.filter(c => c.status === 'SUBMITTED' || c.status === 'UNDER_REVIEW').length,
      inProgressCases: cases.filter(c => c.status === 'INVESTIGATION').length,
      closedCases: cases.filter(c => c.status === 'CLOSED').length,
      highPriorityCases: cases.filter(c => c.priority === 'HIGH' || c.priority === 'URGENT').length,
      overdueCases: cases.filter(c => c.deadlineDate && c.deadlineDate < new Date()).length,
      myAssignedCases: myCases.length,
      teamCases: teamCases.length
    };
  }

  // Helper methods
  private mapHierarchyLevel(level: number): 'Officer' | 'SectorChief' | 'Administrator' | 'Director' {
    switch (level) {
      case 1: return 'Officer';
      case 2: return 'SectorChief';
      case 3: return 'Administrator';
      case 4: return 'Director';
      default: return 'Officer';
    }
  }

  private applyFilters(cases: Case[], filters: CaseListFilters): Case[] {
    return cases.filter(caseData => {
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        if (!caseData.title.toLowerCase().includes(searchLower) &&
            !caseData.description.toLowerCase().includes(searchLower) &&
            !caseData.caseNumber.toLowerCase().includes(searchLower)) {
          return false;
        }
      }

      if (filters.status && caseData.status !== filters.status) return false;
      if (filters.type && caseData.type !== filters.type) return false;
      if (filters.priority && caseData.priority !== filters.priority) return false;
      if (filters.assignedTo && caseData.assignedTo !== filters.assignedTo) return false;
      if (filters.customsPost && caseData.customsPost !== filters.customsPost) return false;
      if (filters.violationType && caseData.violationType !== filters.violationType) return false;

      if (filters.dateFrom && caseData.createdAt < filters.dateFrom) return false;
      if (filters.dateTo && caseData.createdAt > filters.dateTo) return false;

      return true;
    });
  }

  private updateWorkflowStatus(caseData: Case, status: CaseStatus): void {
    const statusToStepMap: { [key in CaseStatus]: string } = {
      'DRAFT': 'CREATED',
      'SUBMITTED': 'INVESTIGATION',
      'UNDER_REVIEW': 'INVESTIGATION',
      'INVESTIGATION': 'INVESTIGATION',
      'PENDING_APPROVAL': 'REVIEW',
      'APPROVED': 'DECISION',
      'REJECTED': 'DECISION',
      'CLOSED': 'DECISION',
      'APPEALED': 'REVIEW'
    };

    const targetStep = statusToStepMap[status];
    if (targetStep) {
      const step = caseData.workflow.steps.find(s => s.name === targetStep);
      if (step) {
        step.status = 'IN_PROGRESS';
        if (!step.startedAt) {
          step.startedAt = new Date();
        }
        caseData.workflow.currentStep = targetStep;
        caseData.workflow.lastUpdated = new Date();
      }
    }
  }

  private isInTeam(userId: string, teamId: string): boolean {
    // Mock implementation - in real system this would check user-team relationships
    return Math.random() > 0.5; // 50% chance for demo
  }

  private isInSector(customsPost: string, sectorId: string): boolean {
    // Mock implementation - in real system this would check customs post-sector mappings
    return true; // For demo, assume all posts are in all sectors
  }

  private generateCaseId(): string {
    return `KS-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
  }

  private generateCaseNumber(): string {
    const year = new Date().getFullYear();
    const sequence = String(Date.now()).slice(-4);
    return `CS-${year}-${sequence}`;
  }

  private generateId(): string {
    return `id_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Singleton export
export const caseService = CaseService.getInstance();
