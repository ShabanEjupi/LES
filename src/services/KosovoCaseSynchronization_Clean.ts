/**
 * KOSOVO CUSTOMS CASE SYNCHRONIZATION SYSTEM - COMPLETE IMPLEMENTATION
 * Implements hierarchical case access control for Kosovo Customs Administration
 * 
 * Hierarchy Levels:
 * 4 - Director (Admin) - Can see all cases across all sectors
 * 3 - Sector Chief - Can see cases in their sector and subordinate levels
 * 2 - Supervisor - Can see cases for officers in their team
 * 1 - Officer - Can see only their assigned cases
 */

import type { User, Case, Activity, Task } from '../types';

// Hierarchical levels in Kosovo Customs Administration
export type HierarchyLevel = 'Officer' | 'SectorChief' | 'Administrator' | 'Director';

export interface HierarchicalUser extends User {
  hierarchyLevel: HierarchyLevel;
  department: string;
  sector?: string;
  subordinates: string[]; // User IDs of direct reports
  supervisor?: string; // User ID of immediate supervisor
  canAccessCases: string[]; // Case IDs this user can access
  managedDepartments: string[]; // Departments this user manages
}

export interface CaseSynchronization {
  caseId: string;
  assignedOfficer: string;
  sectorChief: string;
  administrator: string;
  director: string;
  accessLevel: {
    [userId: string]: 'READ' | 'WRITE' | 'FULL_ACCESS';
  };
  lastSyncedAt: string;
  syncStatus: 'PENDING' | 'SYNCED' | 'ERROR';
}

export interface DepartmentHierarchy {
  departments: {
    [departmentId: string]: {
      name: string;
      director: string;
      sectors: {
        [sectorId: string]: {
          name: string;
          chief: string;
          officers: string[];
        };
      };
    };
  };
}

export interface CaseAccessControl {
  userId: string;
  userLevel: number;
  sectorId?: string;
  teamId?: string;
  customsPostId?: string;
}

export interface CaseData {
  id: string;
  title: string;
  type: string;
  status: string;
  assignedToUserId: string;
  assignedToLevel: number;
  sectorId: string;
  teamId?: string;
  customsPostId: string;
  createdBy: string;
  createdDate: Date;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  isConfidential: boolean;
  securityLevel: 'PUBLIC' | 'INTERNAL' | 'CONFIDENTIAL' | 'SECRET';
}

export class KosovoCaseSynchronizationService {
  private hierarchy: DepartmentHierarchy;
  private caseSyncData: Map<string, CaseSynchronization>;

  // Hierarchy level constants
  private static readonly HIERARCHY_LEVELS = {
    OFFICER: 1,
    SUPERVISOR: 2,
    SECTOR_CHIEF: 3,
    DIRECTOR: 4
  };

  constructor() {
    this.hierarchy = this.initializeHierarchy();
    this.caseSyncData = new Map();
  }

  private initializeHierarchy(): DepartmentHierarchy {
    return {
      departments: {
        'BORDER_CONTROL': {
          name: 'Kontrolli Kufitar',
          director: 'DIR001',
          sectors: {
            'NORTH_SECTOR': {
              name: 'Sektori Verior',
              chief: 'SC001',
              officers: ['OFF001', 'OFF002', 'OFF003']
            },
            'SOUTH_SECTOR': {
              name: 'Sektori Jugor', 
              chief: 'SC002',
              officers: ['OFF004', 'OFF005', 'OFF006']
            },
            'EAST_SECTOR': {
              name: 'Sektori Lindor',
              chief: 'SC003',
              officers: ['OFF007', 'OFF008', 'OFF009']
            },
            'WEST_SECTOR': {
              name: 'Sektori Perëndimor',
              chief: 'SC004',
              officers: ['OFF010', 'OFF011', 'OFF012']
            }
          }
        },
        'CUSTOMS_PROCEDURES': {
          name: 'Procedurat Doganore',
          director: 'DIR002',
          sectors: {
            'IMPORT_SECTOR': {
              name: 'Sektori i Importit',
              chief: 'SC005',
              officers: ['OFF013', 'OFF014', 'OFF015']
            },
            'EXPORT_SECTOR': {
              name: 'Sektori i Eksportit',
              chief: 'SC006',
              officers: ['OFF016', 'OFF017', 'OFF018']
            },
            'TRANSIT_SECTOR': {
              name: 'Sektori i Tranzitit',
              chief: 'SC007',
              officers: ['OFF019', 'OFF020', 'OFF021']
            }
          }
        },
        'INTELLIGENCE_ANALYSIS': {
          name: 'Analiza dhe Inteligjenca',
          director: 'DIR003',
          sectors: {
            'RISK_ANALYSIS': {
              name: 'Analiza e Rrezikut',
              chief: 'SC008',
              officers: ['OFF022', 'OFF023', 'OFF024']
            },
            'INTELLIGENCE_GATHERING': {
              name: 'Grumbullimi i Inteligjencës',
              chief: 'SC009',
              officers: ['OFF025', 'OFF026', 'OFF027']
            }
          }
        },
        'ADMINISTRATION': {
          name: 'Administrata',
          director: 'DIR004',
          sectors: {
            'HR_SECTOR': {
              name: 'Sektori i Burimeve Njerëzore',
              chief: 'SC010',
              officers: ['OFF028', 'OFF029', 'OFF030']
            },
            'IT_SECTOR': {
              name: 'Sektori i IT-së',
              chief: 'SC011',
              officers: ['OFF031', 'OFF032', 'OFF033']
            },
            'LEGAL_SECTOR': {
              name: 'Sektori Juridik',
              chief: 'SC012',
              officers: ['OFF034', 'OFF035', 'OFF036']
            }
          }
        }
      }
    };
  }

  // Synchronize case access based on hierarchy
  public async synchronizeCase(caseData: Case): Promise<CaseSynchronization> {
    const assignedOfficer = caseData.assignedTo;
    const hierarchy = this.getOfficerHierarchy(assignedOfficer);
    
    const caseSyncRecord: CaseSynchronization = {
      caseId: caseData.id,
      assignedOfficer: assignedOfficer,
      sectorChief: hierarchy.sectorChief,
      administrator: hierarchy.administrator,
      director: hierarchy.director,
      accessLevel: {
        [assignedOfficer]: 'FULL_ACCESS',
        [hierarchy.sectorChief]: 'WRITE',
        [hierarchy.administrator]: 'READ',
        [hierarchy.director]: 'READ'
      },
      lastSyncedAt: new Date().toISOString(),
      syncStatus: 'SYNCED'
    };

    this.caseSyncData.set(caseData.id, caseSyncRecord);
    
    // Notify all hierarchy levels
    await this.notifyHierarchy(caseSyncRecord);
    
    return caseSyncRecord;
  }

  // Get officer's hierarchical chain
  private getOfficerHierarchy(officerId: string): {
    sectorChief: string;
    administrator: string;
    director: string;
  } {
    for (const [deptId, dept] of Object.entries(this.hierarchy.departments)) {
      for (const [sectorId, sector] of Object.entries(dept.sectors)) {
        if (sector.officers.includes(officerId)) {
          return {
            sectorChief: sector.chief,
            administrator: this.getAdministratorForDepartment(deptId),
            director: dept.director
          };
        }
      }
    }
    
    // Default hierarchy if officer not found
    return {
      sectorChief: 'SC999',
      administrator: 'ADM999',
      director: 'DIR999'
    };
  }

  private getAdministratorForDepartment(departmentId: string): string {
    // Return the main administrator for each department
    const adminMapping: { [key: string]: string } = {
      'BORDER_CONTROL': 'ADM001',
      'CUSTOMS_PROCEDURES': 'ADM002',
      'INTELLIGENCE_ANALYSIS': 'ADM003',
      'ADMINISTRATION': 'ADM004'
    };
    
    return adminMapping[departmentId] || 'ADM999';
  }

  // Get cases accessible by a user based on their hierarchy level
  public getCasesForUser(userId: string, userLevel: HierarchyLevel): string[] {
    const accessibleCases: string[] = [];
    
    for (const [caseId, syncData] of this.caseSyncData.entries()) {
      switch (userLevel) {
        case 'Officer':
          if (syncData.assignedOfficer === userId) {
            accessibleCases.push(caseId);
          }
          break;
          
        case 'SectorChief':
          if (syncData.sectorChief === userId || syncData.assignedOfficer === userId) {
            accessibleCases.push(caseId);
          }
          break;
          
        case 'Administrator':
          if (syncData.administrator === userId || 
              syncData.sectorChief === userId || 
              syncData.assignedOfficer === userId) {
            accessibleCases.push(caseId);
          }
          break;
          
        case 'Director':
          if (syncData.director === userId ||
              syncData.administrator === userId || 
              syncData.sectorChief === userId || 
              syncData.assignedOfficer === userId) {
            accessibleCases.push(caseId);
          }
          break;
      }
    }
    
    return accessibleCases;
  }

  // Check if user can access a specific case
  public canUserAccessCase(userId: string, caseId: string): boolean {
    const syncData = this.caseSyncData.get(caseId);
    if (!syncData) return false;
    
    return Object.keys(syncData.accessLevel).includes(userId);
  }

  // Get user's access level for a case
  public getUserAccessLevel(userId: string, caseId: string): 'READ' | 'WRITE' | 'FULL_ACCESS' | null {
    const syncData = this.caseSyncData.get(caseId);
    if (!syncData) return null;
    
    return syncData.accessLevel[userId] || null;
  }

  // Reassign case to different officer
  public async reassignCase(caseId: string, newOfficerId: string): Promise<CaseSynchronization> {
    const existingSyncData = this.caseSyncData.get(caseId);
    if (!existingSyncData) {
      throw new Error(`Case ${caseId} not found in sync data`);
    }

    const newHierarchy = this.getOfficerHierarchy(newOfficerId);
    
    const updatedSyncData: CaseSynchronization = {
      ...existingSyncData,
      assignedOfficer: newOfficerId,
      sectorChief: newHierarchy.sectorChief,
      administrator: newHierarchy.administrator,
      director: newHierarchy.director,
      accessLevel: {
        [newOfficerId]: 'FULL_ACCESS',
        [newHierarchy.sectorChief]: 'WRITE',
        [newHierarchy.administrator]: 'READ',
        [newHierarchy.director]: 'READ'
      },
      lastSyncedAt: new Date().toISOString(),
      syncStatus: 'SYNCED'
    };

    this.caseSyncData.set(caseId, updatedSyncData);
    
    // Notify hierarchy about reassignment
    await this.notifyHierarchy(updatedSyncData, 'REASSIGNMENT');
    
    return updatedSyncData;
  }

  // Notify hierarchy levels about case changes
  private async notifyHierarchy(
    syncData: CaseSynchronization, 
    notificationType: 'NEW_CASE' | 'REASSIGNMENT' | 'UPDATE' = 'NEW_CASE'
  ): Promise<void> {
    const notifications = [
      {
        userId: syncData.assignedOfficer,
        message: `Case ${syncData.caseId} ${notificationType === 'NEW_CASE' ? 'assigned to you' : 'updated'}`,
        priority: 'HIGH' as const
      },
      {
        userId: syncData.sectorChief,
        message: `Case ${syncData.caseId} in your sector requires attention`,
        priority: 'MEDIUM' as const
      },
      {
        userId: syncData.administrator,
        message: `New case ${syncData.caseId} in your department`,
        priority: 'LOW' as const
      },
      {
        userId: syncData.director,
        message: `Case ${syncData.caseId} activity in your directorate`,
        priority: 'LOW' as const
      }
    ];

    // In a real implementation, these would be sent via notification service
    for (const notification of notifications) {
      console.log(`Notification sent to ${notification.userId}: ${notification.message}`);
    }
  }

  // Get hierarchy structure for display
  public getHierarchyStructure(): DepartmentHierarchy {
    return this.hierarchy;
  }

  // Get subordinates for a user (for supervisors to see their team's cases)
  public getSubordinateCases(supervisorId: string): string[] {
    const subordinateCases: string[] = [];
    
    for (const [caseId, syncData] of this.caseSyncData.entries()) {
      // Check if supervisor is in the hierarchy chain for this case
      if (syncData.sectorChief === supervisorId || 
          syncData.administrator === supervisorId || 
          syncData.director === supervisorId) {
        subordinateCases.push(caseId);
      }
    }
    
    return subordinateCases;
  }

  // Sync case activities and tasks with hierarchy
  public async syncCaseActivities(caseId: string, activities: Activity[]): Promise<void> {
    const syncData = this.caseSyncData.get(caseId);
    if (!syncData) return;

    // Notify hierarchy about new activities
    for (const activity of activities) {
      await this.notifyHierarchy(syncData, 'UPDATE');
    }
  }

  // Get dashboard data for a user based on their hierarchy level
  public getDashboardData(userId: string, userLevel: HierarchyLevel): {
    totalCases: number;
    pendingCases: number;
    completedCases: number;
    subordinateCases: number;
  } {
    const accessibleCases = this.getCasesForUser(userId, userLevel);
    const subordinateCases = this.getSubordinateCases(userId);
    
    return {
      totalCases: accessibleCases.length,
      pendingCases: Math.floor(accessibleCases.length * 0.6), // Mock data
      completedCases: Math.floor(accessibleCases.length * 0.4), // Mock data
      subordinateCases: subordinateCases.length
    };
  }

  /**
   * Get all cases that a user can view based on their hierarchy level
   */
  public getViewableCases(userAccess: CaseAccessControl, allCases: CaseData[]): CaseData[] {
    switch (userAccess.userLevel) {
      case KosovoCaseSynchronizationService.HIERARCHY_LEVELS.DIRECTOR:
        // Directors can see all cases
        return allCases;
      
      case KosovoCaseSynchronizationService.HIERARCHY_LEVELS.SECTOR_CHIEF:
        // Sector chiefs can see cases in their sector
        return allCases.filter(caseData => 
          caseData.sectorId === userAccess.sectorId ||
          caseData.assignedToLevel <= userAccess.userLevel
        );
      
      case KosovoCaseSynchronizationService.HIERARCHY_LEVELS.SUPERVISOR:
        // Supervisors can see cases in their team
        return allCases.filter(caseData => 
          caseData.teamId === userAccess.teamId ||
          caseData.assignedToUserId === userAccess.userId
        );
      
      case KosovoCaseSynchronizationService.HIERARCHY_LEVELS.OFFICER:
      default:
        // Officers can only see their own cases
        return allCases.filter(caseData => 
          caseData.assignedToUserId === userAccess.userId
        );
    }
  }

  /**
   * Check if user can edit a specific case
   */
  public canEditCase(userAccess: CaseAccessControl, caseData: CaseData): boolean {
    // Directors and sector chiefs can edit all cases in their jurisdiction
    if (userAccess.userLevel >= KosovoCaseSynchronizationService.HIERARCHY_LEVELS.SECTOR_CHIEF) {
      return userAccess.sectorId === caseData.sectorId || userAccess.userLevel === KosovoCaseSynchronizationService.HIERARCHY_LEVELS.DIRECTOR;
    }
    
    // Supervisors can edit cases in their team
    if (userAccess.userLevel === KosovoCaseSynchronizationService.HIERARCHY_LEVELS.SUPERVISOR) {
      return caseData.teamId === userAccess.teamId;
    }
    
    // Officers can only edit their own cases
    return caseData.assignedToUserId === userAccess.userId;
  }

  /**
   * Get case statistics for a user
   */
  public getCaseStatistics(userAccess: CaseAccessControl, allCases: CaseData[]): {
    total: number;
    pending: number;
    inProgress: number;
    completed: number;
    highPriority: number;
  } {
    const viewableCases = this.getViewableCases(userAccess, allCases);
    
    return {
      total: viewableCases.length,
      pending: viewableCases.filter(c => c.status === 'PENDING').length,
      inProgress: viewableCases.filter(c => c.status === 'IN_PROGRESS').length,
      completed: viewableCases.filter(c => c.status === 'COMPLETED').length,
      highPriority: viewableCases.filter(c => c.priority === 'HIGH' || c.priority === 'URGENT').length,
    };
  }
}

// Singleton instance
export const caseSynchronizationService = new KosovoCaseSynchronizationService();
