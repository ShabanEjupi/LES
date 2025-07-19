/**
 * KOSOVO CUSTOMS CASE SYNCHRONIZATION SYSTEM - 2025
 * Hierarchical case access and synchronization between different user levels
 * Republic of Kosovo - Customs Administration
 */

import type { User } from '../types';

export interface CaseAccessRule {
  userLevel: number; // 1=Officer, 2=Supervisor, 3=SectorChief, 4=Director/Admin
  canViewOwnCases: boolean;
  canViewSubordinateCases: boolean;
  canViewSameLevelCases: boolean;
  canViewHigherLevelCases: boolean;
  canModifyOwnCases: boolean;
  canModifySubordinateCases: boolean;
  canReassignCases: boolean;
  canDeleteCases: boolean;
}

export interface CaseAccessMatrix {
  [key: string]: CaseAccessRule;
}

/**
 * KOSOVO CUSTOMS HIERARCHICAL ACCESS MATRIX
 * Based on the actual organizational structure
 */
export const KOSOVO_CUSTOMS_ACCESS_MATRIX: CaseAccessMatrix = {
  'OFFICER': {
    userLevel: 1,
    canViewOwnCases: true,
    canViewSubordinateCases: false,
    canViewSameLevelCases: false, // Officers can't see other officers' cases
    canViewHigherLevelCases: false,
    canModifyOwnCases: true,
    canModifySubordinateCases: false,
    canReassignCases: false,
    canDeleteCases: false
  },
  'SUPERVISOR': {
    userLevel: 2,
    canViewOwnCases: true,
    canViewSubordinateCases: true, // Can see Officer cases
    canViewSameLevelCases: true,   // Can see other Supervisor cases
    canViewHigherLevelCases: false,
    canModifyOwnCases: true,
    canModifySubordinateCases: true,
    canReassignCases: true,
    canDeleteCases: false
  },
  'SECTOR_CHIEF': {
    userLevel: 3,
    canViewOwnCases: true,
    canViewSubordinateCases: true, // Can see Supervisor and Officer cases
    canViewSameLevelCases: true,   // Can see other Sector Chief cases
    canViewHigherLevelCases: false,
    canModifyOwnCases: true,
    canModifySubordinateCases: true,
    canReassignCases: true,
    canDeleteCases: true
  },
  'DIRECTOR': {
    userLevel: 4,
    canViewOwnCases: true,
    canViewSubordinateCases: true, // Can see ALL cases (Director is top level)
    canViewSameLevelCases: true,
    canViewHigherLevelCases: false, // No one is above Director
    canModifyOwnCases: true,
    canModifySubordinateCases: true,
    canReassignCases: true,
    canDeleteCases: true
  },
  'ADMIN': {
    userLevel: 4, // Same level as Director for system purposes
    canViewOwnCases: true,
    canViewSubordinateCases: true, // System admin can see everything
    canViewSameLevelCases: true,
    canViewHigherLevelCases: true, // Admin can see even Director cases
    canModifyOwnCases: true,
    canModifySubordinateCases: true,
    canReassignCases: true,
    canDeleteCases: true
  }
};

export interface ViolationCase {
  id: string;
  caseNumber: string;
  createdBy: string;
  createdByRole: string;
  createdByLevel: number;
  assignedTo: string;
  assignedToRole: string;
  assignedToLevel: number;
  department: string;
  customsPost: string;
  status: 'DRAFT' | 'ACTIVE' | 'UNDER_REVIEW' | 'COMPLETED' | 'ARCHIVED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  securityLevel: 'PUBLIC' | 'INTERNAL' | 'CONFIDENTIAL' | 'SECRET';
  createdAt: string;
  updatedAt: string;
  lastModifiedBy: string;
  data: Record<string, string | number | boolean>;
}

/**
 * Case Synchronization Service
 */
export class KosovoCaseSynchronizationService {
  
  /**
   * Get cases that a user can access based on their role and hierarchy level
   */
  static getAccessibleCases(user: User, allCases: ViolationCase[]): ViolationCase[] {
    const userRole = user.role.id;
    const accessRules = KOSOVO_CUSTOMS_ACCESS_MATRIX[userRole];
    
    if (!accessRules) {
      console.warn(`No access rules found for role: ${userRole}`);
      return [];
    }

    return allCases.filter(caseItem => {
      // Always allow access to own cases
      if (caseItem.createdBy === user.id || caseItem.assignedTo === user.id) {
        return accessRules.canViewOwnCases;
      }

      // Check subordinate cases
      if (caseItem.createdByLevel < user.hierarchyLevel || caseItem.assignedToLevel < user.hierarchyLevel) {
        return accessRules.canViewSubordinateCases;
      }

      // Check same level cases
      if (caseItem.createdByLevel === user.hierarchyLevel || caseItem.assignedToLevel === user.hierarchyLevel) {
        return accessRules.canViewSameLevelCases;
      }

      // Check higher level cases
      if (caseItem.createdByLevel > user.hierarchyLevel || caseItem.assignedToLevel > user.hierarchyLevel) {
        return accessRules.canViewHigherLevelCases;
      }

      return false;
    });
  }

  /**
   * Check if user can modify a specific case
   */
  static canModifyCase(user: User, caseItem: ViolationCase): boolean {
    const userRole = user.role.id;
    const accessRules = KOSOVO_CUSTOMS_ACCESS_MATRIX[userRole];
    
    if (!accessRules) return false;

    // Can always modify own cases (if allowed)
    if (caseItem.createdBy === user.id || caseItem.assignedTo === user.id) {
      return accessRules.canModifyOwnCases;
    }

    // Can modify subordinate cases
    if (caseItem.createdByLevel < user.hierarchyLevel || caseItem.assignedToLevel < user.hierarchyLevel) {
      return accessRules.canModifySubordinateCases;
    }

    return false;
  }

  /**
   * Check if user can reassign a case
   */
  static canReassignCase(user: User, caseItem: ViolationCase): boolean {
    const userRole = user.role.id;
    const accessRules = KOSOVO_CUSTOMS_ACCESS_MATRIX[userRole];
    
    if (!accessRules) return false;

    return accessRules.canReassignCases && (
      caseItem.createdBy === user.id || 
      caseItem.assignedTo === user.id ||
      caseItem.createdByLevel < user.hierarchyLevel ||
      caseItem.assignedToLevel < user.hierarchyLevel
    );
  }

  /**
   * Check if user can delete a case
   */
  static canDeleteCase(user: User, caseItem: ViolationCase): boolean {
    const userRole = user.role.id;
    const accessRules = KOSOVO_CUSTOMS_ACCESS_MATRIX[userRole];
    
    if (!accessRules) return false;

    return accessRules.canDeleteCases && (
      caseItem.createdBy === user.id ||
      user.hierarchyLevel >= 3 // Only Sector Chief and above can delete
    );
  }

  /**
   * Synchronize cases between different hierarchy levels
   * This simulates the real-time synchronization that would happen with the server
   */
  static async synchronizeCases(user: User): Promise<ViolationCase[]> {
    try {
      // In a real implementation, this would make API calls to sync with server
      console.log(`🔄 Synchronizing cases for ${user.role.id} - ${user.fullName}`);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Get cases from localStorage (simulating database)
      const storedCases = localStorage.getItem('kosovoCustomsCases');
      const allCases: ViolationCase[] = storedCases ? JSON.parse(storedCases) : [];

      // Filter cases based on user access rights
      const accessibleCases = this.getAccessibleCases(user, allCases);

      console.log(`✅ Synchronized ${accessibleCases.length} cases for user ${user.username}`);
      
      return accessibleCases;
    } catch (error) {
      console.error('❌ Case synchronization failed:', error);
      return [];
    }
  }

  /**
   * Create a new case with proper hierarchy assignment
   */
  static createCase(user: User, caseData: Partial<ViolationCase>): ViolationCase {
    const newCase: ViolationCase = {
      id: `case_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      caseNumber: `KS-${Date.now().toString().slice(-8)}`,
      createdBy: user.id,
      createdByRole: user.role.id,
      createdByLevel: user.hierarchyLevel,
      assignedTo: user.id, // Initially assigned to creator
      assignedToRole: user.role.id,
      assignedToLevel: user.hierarchyLevel,
      department: user.department,
      customsPost: user.customsPost || 'Unknown',
      status: 'DRAFT',
      priority: 'MEDIUM',
      securityLevel: user.dataAccessLevel === 'TOP_SECRET' ? 'SECRET' : 
                    user.dataAccessLevel === 'CONFIDENTIAL' ? 'CONFIDENTIAL' :
                    user.dataAccessLevel === 'INTERNAL' ? 'INTERNAL' : 'PUBLIC',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastModifiedBy: user.id,
      data: {},
      ...caseData
    };

    // Save to localStorage (simulating database save)
    const storedCases = localStorage.getItem('kosovoCustomsCases');
    const allCases: ViolationCase[] = storedCases ? JSON.parse(storedCases) : [];
    allCases.push(newCase);
    localStorage.setItem('kosovoCustomsCases', JSON.stringify(allCases));

    console.log(`✅ Created new case ${newCase.caseNumber} by ${user.fullName}`);
    
    return newCase;
  }

  /**
   * Reassign a case to another user
   */
  static reassignCase(
    currentUser: User, 
    caseItem: ViolationCase, 
    targetUser: User
  ): boolean {
    if (!this.canReassignCase(currentUser, caseItem)) {
      console.warn(`❌ User ${currentUser.username} cannot reassign case ${caseItem.caseNumber}`);
      return false;
    }

    // Update case assignment
    caseItem.assignedTo = targetUser.id;
    caseItem.assignedToRole = targetUser.role.id;
    caseItem.assignedToLevel = targetUser.hierarchyLevel;
    caseItem.updatedAt = new Date().toISOString();
    caseItem.lastModifiedBy = currentUser.id;

    // Update in localStorage
    const storedCases = localStorage.getItem('kosovoCustomsCases');
    const allCases: ViolationCase[] = storedCases ? JSON.parse(storedCases) : [];
    const caseIndex = allCases.findIndex(c => c.id === caseItem.id);
    
    if (caseIndex !== -1) {
      allCases[caseIndex] = caseItem;
      localStorage.setItem('kosovoCustomsCases', JSON.stringify(allCases));
      
      console.log(`✅ Case ${caseItem.caseNumber} reassigned to ${targetUser.fullName}`);
      return true;
    }

    return false;
  }

  /**
   * Get users that a case can be assigned to based on current user's authority
   */
  static getAssignableUsers(currentUser: User, allUsers: User[]): User[] {
    const userRole = currentUser.role.id;
    const accessRules = KOSOVO_CUSTOMS_ACCESS_MATRIX[userRole];
    
    if (!accessRules || !accessRules.canReassignCases) {
      return [];
    }

    return allUsers.filter(user => {
      // Can assign to subordinates
      if (user.hierarchyLevel < currentUser.hierarchyLevel) {
        return true;
      }
      
      // Can assign to same level (if Supervisor or above)
      if (user.hierarchyLevel === currentUser.hierarchyLevel && currentUser.hierarchyLevel >= 2) {
        return true;
      }
      
      // Directors and Admins can assign to anyone
      if (currentUser.hierarchyLevel >= 4) {
        return true;
      }
      
      return false;
    });
  }

  /**
   * Get statistics about cases for current user
   */
  static getCaseStatistics(user: User, cases: ViolationCase[]) {
    const ownCases = cases.filter(c => c.createdBy === user.id || c.assignedTo === user.id);
    const activeCases = cases.filter(c => c.status === 'ACTIVE');
    const completedCases = cases.filter(c => c.status === 'COMPLETED');
    const highPriorityCases = cases.filter(c => c.priority === 'HIGH' || c.priority === 'CRITICAL');

    return {
      totalAccessible: cases.length,
      ownCases: ownCases.length,
      activeCases: activeCases.length,
      completedCases: completedCases.length,
      highPriorityCases: highPriorityCases.length,
      byStatus: {
        DRAFT: cases.filter(c => c.status === 'DRAFT').length,
        ACTIVE: activeCases.length,
        UNDER_REVIEW: cases.filter(c => c.status === 'UNDER_REVIEW').length,
        COMPLETED: completedCases.length,
        ARCHIVED: cases.filter(c => c.status === 'ARCHIVED').length
      },
      byPriority: {
        LOW: cases.filter(c => c.priority === 'LOW').length,
        MEDIUM: cases.filter(c => c.priority === 'MEDIUM').length,
        HIGH: cases.filter(c => c.priority === 'HIGH').length,
        CRITICAL: cases.filter(c => c.priority === 'CRITICAL').length
      }
    };
  }
}

export default KosovoCaseSynchronizationService;
