// Document Template Service - Albanian Customs Administration (LES)
// Shërbimi i Shablloneve të Dokumenteve - Administrata Doganore e Shqipërisë

import type {
  DocumentTemplate,
  TemplateInstance,
  TemplateSearchFilters,
  TemplateStatistics,
  TemplateValidationResult,
  TemplateExportData,
  TemplateAuditLog
} from '../types/DocumentTemplates';

class DocumentTemplateService {
  private baseUrl = '/api/templates';

  // Template Management
  async getTemplates(filters?: TemplateSearchFilters): Promise<DocumentTemplate[]> {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            if (Array.isArray(value)) {
              value.forEach(v => queryParams.append(key, v.toString()));
            } else {
              queryParams.append(key, value.toString());
            }
          }
        });
      }

      const response = await fetch(`${this.baseUrl}?${queryParams}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching templates:', error);
      // Return mock data for development
      return this.getMockTemplates(filters);
    }
  }

  async getTemplate(id: string): Promise<DocumentTemplate | null> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`);
      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching template:', error);
      return this.getMockTemplate(id);
    }
  }

  async createTemplate(template: Omit<DocumentTemplate, 'id' | 'createdAt' | 'usageCount'>): Promise<DocumentTemplate> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(template),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating template:', error);
      throw error;
    }
  }

  async updateTemplate(id: string, template: Partial<DocumentTemplate>): Promise<DocumentTemplate> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(template),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating template:', error);
      throw error;
    }
  }

  async deleteTemplate(id: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting template:', error);
      throw error;
    }
  }

  // Template Approval
  async approveTemplate(id: string, stepId: string, comments?: string): Promise<DocumentTemplate> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stepId, comments }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error approving template:', error);
      throw error;
    }
  }

  async rejectTemplate(id: string, stepId: string, comments: string): Promise<DocumentTemplate> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stepId, comments }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error rejecting template:', error);
      throw error;
    }
  }

  // Template Instances
  async createInstance(templateId: string, data: Record<string, string | number | boolean | Date | string[]>): Promise<TemplateInstance> {
    try {
      const response = await fetch(`${this.baseUrl}/${templateId}/instances`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating template instance:', error);
      throw error;
    }
  }

  async getInstances(templateId: string): Promise<TemplateInstance[]> {
    try {
      const response = await fetch(`${this.baseUrl}/${templateId}/instances`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching template instances:', error);
      return [];
    }
  }

  // Statistics
  async getStatistics(): Promise<TemplateStatistics> {
    try {
      const response = await fetch(`${this.baseUrl}/statistics`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching statistics:', error);
      return this.getMockStatistics();
    }
  }

  // Validation
  async validateTemplate(template: DocumentTemplate): Promise<TemplateValidationResult> {
    try {
      const response = await fetch(`${this.baseUrl}/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(template),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error validating template:', error);
      return {
        isValid: false,
        errors: [{ message: 'Validation service unavailable', severity: 'ERROR' }],
        warnings: [],
        suggestions: []
      };
    }
  }

  // Export/Import
  async exportTemplate(id: string): Promise<TemplateExportData> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}/export`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error exporting template:', error);
      throw error;
    }
  }

  async importTemplate(exportData: TemplateExportData): Promise<DocumentTemplate> {
    try {
      const response = await fetch(`${this.baseUrl}/import`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(exportData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error importing template:', error);
      throw error;
    }
  }

  // Audit Log
  async getAuditLog(templateId: string): Promise<TemplateAuditLog[]> {
    try {
      const response = await fetch(`${this.baseUrl}/${templateId}/audit`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching audit log:', error);
      return [];
    }
  }

  // Mock Data for Development
  private getMockTemplates(filters?: TemplateSearchFilters): DocumentTemplate[] {
    const mockTemplates: DocumentTemplate[] = [
      {
        id: 'tpl-001',
        templateNumber: 'DOG-KUNDV-001',
        name: 'Raporti i Kundërvajtjes Doganore',
        nameEn: 'Customs Violation Report',
        description: 'Shablloni standard për raportimin e kundërvajtjeve doganore',
        type: 'VIOLATION_REPORT',
        category: 'VIOLATION_PROCESSING',
        status: 'ACTIVE',
        priority: 'HIGH',
        sections: [],
        htmlTemplate: '<html><body>Template content...</body></html>',
        version: '2.1.0',
        versions: [],
        requiresApproval: true,
        approvalSteps: [],
        allowedRoles: ['Officer', 'Supervisor'],
        usageCount: 145,
        lastUsed: new Date('2024-01-15'),
        tags: ['kundërvajtje', 'doganë', 'raport'],
        keywords: ['violation', 'customs', 'report'],
        createdBy: 'admin',
        createdAt: new Date('2023-06-01'),
        updatedBy: 'supervisor1',
        updatedAt: new Date('2024-01-10')
      },
      {
        id: 'tpl-002',
        templateNumber: 'DOG-GJOBE-001',
        name: 'Njoftimi i Gjobës Administrative',
        nameEn: 'Administrative Fine Notice',
        description: 'Shablloni për njoftimin e gjobave administrative',
        type: 'FINE_NOTICE',
        category: 'LEGAL_DOCUMENTS',
        status: 'ACTIVE',
        priority: 'HIGH',
        sections: [],
        htmlTemplate: '<html><body>Fine notice template...</body></html>',
        version: '1.5.0',
        versions: [],
        requiresApproval: true,
        approvalSteps: [],
        allowedRoles: ['Officer', 'Supervisor'],
        usageCount: 89,
        lastUsed: new Date('2024-01-14'),
        tags: ['gjobë', 'administrative', 'njoftim'],
        keywords: ['fine', 'administrative', 'notice'],
        createdBy: 'admin',
        createdAt: new Date('2023-05-15'),
        updatedBy: 'supervisor2',
        updatedAt: new Date('2024-01-05')
      },
      {
        id: 'tpl-003',
        templateNumber: 'DOG-INSPEKT-001',
        name: 'Raporti i Inspektimit',
        nameEn: 'Inspection Report',
        description: 'Shablloni për raportet e inspektimeve doganore',
        type: 'INSPECTION_REPORT',
        category: 'REPORTS',
        status: 'UNDER_REVIEW',
        priority: 'MEDIUM',
        sections: [],
        htmlTemplate: '<html><body>Inspection template...</body></html>',
        version: '1.0.0',
        versions: [],
        requiresApproval: true,
        approvalSteps: [],
        allowedRoles: ['Inspector', 'Supervisor'],
        usageCount: 23,
        lastUsed: new Date('2024-01-12'),
        tags: ['inspektim', 'doganë', 'raport'],
        keywords: ['inspection', 'customs', 'report'],
        createdBy: 'inspector1',
        createdAt: new Date('2024-01-01'),
        updatedBy: 'inspector1',
        updatedAt: new Date('2024-01-08')
      }
    ];

    // Apply filters if provided
    if (!filters) return mockTemplates;

    return mockTemplates.filter(template => {
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const matchesSearch = 
          template.name.toLowerCase().includes(searchTerm) ||
          template.description.toLowerCase().includes(searchTerm) ||
          template.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        if (!matchesSearch) return false;
      }

      if (filters.status && template.status !== filters.status) return false;
      if (filters.type && template.type !== filters.type) return false;
      if (filters.category && template.category !== filters.category) return false;
      if (filters.priority && template.priority !== filters.priority) return false;

      return true;
    });
  }

  private getMockTemplate(id: string): DocumentTemplate | null {
    const templates = this.getMockTemplates();
    return templates.find(t => t.id === id) || null;
  }

  private getMockStatistics(): TemplateStatistics {
    return {
      totalTemplates: 15,
      activeTemplates: 12,
      templatesAwaitingApproval: 2,
      mostUsedTemplates: [
        { templateId: 'tpl-001', name: 'Raporti i Kundërvajtjes', usageCount: 145 },
        { templateId: 'tpl-002', name: 'Njoftimi i Gjobës', usageCount: 89 },
        { templateId: 'tpl-003', name: 'Raporti i Inspektimit', usageCount: 23 }
      ],
      recentTemplates: [
        { templateId: 'tpl-003', name: 'Raporti i Inspektimit', updatedAt: new Date('2024-01-08') },
        { templateId: 'tpl-002', name: 'Njoftimi i Gjobës', updatedAt: new Date('2024-01-05') },
        { templateId: 'tpl-001', name: 'Raporti i Kundërvajtjes', updatedAt: new Date('2024-01-10') }
      ],
      templatesByCategory: {
        'LEGAL_DOCUMENTS': 3,
        'ADMINISTRATIVE_FORMS': 2,
        'VIOLATION_PROCESSING': 4,
        'COURT_SUBMISSIONS': 1,
        'NOTIFICATIONS': 2,
        'REPORTS': 2,
        'CERTIFICATES': 1,
        'CORRESPONDENCE': 0
      },
      templatesByType: {
        'VIOLATION_REPORT': 2,
        'FINE_NOTICE': 2,
        'CUSTOMS_DECLARATION': 1,
        'INSPECTION_REPORT': 2,
        'SEIZURE_REPORT': 1,
        'ADMINISTRATIVE_DECISION': 2,
        'APPEAL_FORM': 1,
        'COURT_SUBMISSION': 1,
        'NOTIFICATION_LETTER': 2,
        'COMPLIANCE_CERTIFICATE': 1,
        'EVIDENCE_INVENTORY': 0,
        'WITNESS_STATEMENT': 0,
        'EXPERT_OPINION': 0,
        'CASE_SUMMARY': 0,
        'LEGAL_MEMO': 0,
        'CLOSURE_REPORT': 0
      }
    };
  }
}

export const documentTemplateService = new DocumentTemplateService();
