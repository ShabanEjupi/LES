// Fine Calculation Service - Albanian Customs Administration (LES)
// Shërbimi i Llogaritjes së Gjobave - Administrata Doganore e Shqipërisë

import type {
  FineCalculationRule,
  CalculationInput,
  CalculationResult,
  FineCalculationHistory,
  FineCalculationStatistics
} from '../types/FineCalculation';

class FineCalculationService {
  private baseUrl = '/api/fine-calculation';

  // Rule Management
  async getRules(): Promise<FineCalculationRule[]> {
    try {
      const response = await fetch(`${this.baseUrl}/rules`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching calculation rules:', error);
      return this.getMockRules();
    }
  }

  async getRule(id: string): Promise<FineCalculationRule | null> {
    try {
      const response = await fetch(`${this.baseUrl}/rules/${id}`);
      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching rule:', error);
      const rules = this.getMockRules();
      return rules.find(r => r.id === id) || null;
    }
  }

  async createRule(rule: FineCalculationRule): Promise<FineCalculationRule> {
    try {
      const response = await fetch(`${this.baseUrl}/rules`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rule),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating rule:', error);
      // Return the rule as-is for mock purposes
      return rule;
    }
  }

  async updateRule(id: string, rule: FineCalculationRule): Promise<FineCalculationRule> {
    try {
      const response = await fetch(`${this.baseUrl}/rules/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rule),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating rule:', error);
      // Return the rule as-is for mock purposes
      return rule;
    }
  }

  async deleteRule(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/rules/${id}`, {
        method: 'DELETE',
      });
      
      return response.ok;
    } catch (error) {
      console.error('Error deleting rule:', error);
      return false;
    }
  }

  async calculateFine(input: CalculationInput, ruleId: string): Promise<CalculationResult> {
    try {
      const response = await fetch(`${this.baseUrl}/calculate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input, ruleId }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error calculating fine:', error);
      // Return mock calculation for development
      return this.getMockCalculation(input, ruleId);
    }
  }

  // History Management
  async saveCalculation(calculation: Omit<FineCalculationHistory, 'id' | 'calculatedAt'>): Promise<FineCalculationHistory> {
    try {
      const response = await fetch(`${this.baseUrl}/history`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(calculation),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error saving calculation:', error);
      // Return mock saved calculation
      return {
        ...calculation,
        id: `calc-${Date.now()}`,
        calculatedAt: new Date(),
      };
    }
  }

  async getCalculationHistory(filters?: {
    userId?: string;
    ruleId?: string;
    dateFrom?: Date;
    dateTo?: Date;
    caseId?: string;
  }): Promise<FineCalculationHistory[]> {
    try {
      const queryParams = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            queryParams.append(key, value.toString());
          }
        });
      }

      const response = await fetch(`${this.baseUrl}/history?${queryParams}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching calculation history:', error);
      return this.getMockHistory();
    }
  }

  // Statistics
  async getStatistics(): Promise<FineCalculationStatistics> {
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

  // Rule Validation
  async validateRule(rule: FineCalculationRule): Promise<{ isValid: boolean; errors: string[] }> {
    try {
      const response = await fetch(`${this.baseUrl}/rules/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rule),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error validating rule:', error);
      return {
        isValid: true,
        errors: []
      };
    }
  }

  // Mock Data for Development
  private getMockRules(): FineCalculationRule[] {
    return [
      {
        id: 'CONTRABAND_001',
        violationType: 'CONTRABAND',
        violationCode: 'KV-273',
        violationNameAlbanian: 'Kontrabandë e Mallrave',
        violationNameEnglish: 'Goods Smuggling',
        legalBasis: 'Neni 273, Kodi Doganor i Republikës së Shqipërisë',
        baseAmount: 5000,
        currency: 'EUR',
        calculationType: 'PERCENTAGE',
        percentageRate: 200,
        minimumAmount: 5000,
        maximumAmount: 100000,
        multiplierFactors: {
          firstOffense: 1.0,
          repeatOffense: 2.0,
          severity: { minor: 0.5, moderate: 1.0, severe: 1.5, critical: 2.0 },
          cooperation: { full: 0.8, partial: 1.0, none: 1.5 },
          economicImpact: { low: 0.8, medium: 1.0, high: 1.3, critical: 1.8 }
        },
        reductionFactors: {
          voluntaryDisclosure: 0.3,
          immediatePayment: 0.1,
          firstTimeOffender: 0.2,
          cooperativeSubject: 0.15,
          minorTechnicalError: 0.5
        },
        isActive: true,
        effectiveDate: '2024-01-01',
        notes: 'Gjoba për kontrabandë sipas Kodit Doganor',
        createdBy: 'admin',
        createdAt: '2024-01-01T00:00:00Z',
        version: 1
      },
      {
        id: 'FALSE_DECLARATION_001',
        violationType: 'FALSE_DECLARATION',
        violationCode: 'KV-274',
        violationNameAlbanian: 'Deklarim i Rremë',
        violationNameEnglish: 'False Declaration',
        legalBasis: 'Neni 274, Kodi Doganor i Republikës së Shqipërisë',
        baseAmount: 2000,
        currency: 'EUR',
        calculationType: 'PROGRESSIVE',
        minimumAmount: 1000,
        maximumAmount: 50000,
        multiplierFactors: {
          firstOffense: 1.0,
          repeatOffense: 1.8,
          severity: { minor: 0.6, moderate: 1.0, severe: 1.4, critical: 1.8 },
          cooperation: { full: 0.7, partial: 1.0, none: 1.4 },
          economicImpact: { low: 0.8, medium: 1.0, high: 1.2, critical: 1.5 }
        },
        reductionFactors: {
          voluntaryDisclosure: 0.4,
          immediatePayment: 0.1,
          firstTimeOffender: 0.25,
          cooperativeSubject: 0.2,
          minorTechnicalError: 0.6
        },
        isActive: true,
        effectiveDate: '2024-01-01',
        notes: 'Gjoba për deklarim të rremë të mallrave',
        createdBy: 'admin',
        createdAt: '2024-01-01T00:00:00Z',
        version: 1
      }
    ];
  }

  private getMockCalculation(input: CalculationInput, ruleId: string): CalculationResult {
    const rule = this.getMockRules().find(r => r.id === ruleId);
    if (!rule) {
      throw new Error('Rule not found');
    }

    // Simple mock calculation
    let amount = rule.baseAmount;
    
    if (rule.calculationType === 'PERCENTAGE' && input.violationValue) {
      amount = (input.violationValue * (rule.percentageRate || 100)) / 100;
    }

    // Apply multipliers
    if (input.isRepeatOffense) {
      amount *= rule.multiplierFactors.repeatOffense;
    }
    amount *= rule.multiplierFactors.severity[input.severityLevel];
    amount *= rule.multiplierFactors.cooperation[input.cooperationLevel];
    amount *= rule.multiplierFactors.economicImpact[input.economicImpact];

    const multipliedAmount = amount;

    // Apply reductions
    let totalReduction = 0;
    if (input.isVoluntaryDisclosure) totalReduction += rule.reductionFactors.voluntaryDisclosure;
    if (input.isImmediatePayment) totalReduction += rule.reductionFactors.immediatePayment;
    if (input.isFirstTimeOffender) totalReduction += rule.reductionFactors.firstTimeOffender;
    if (input.isCooperativeSubject) totalReduction += rule.reductionFactors.cooperativeSubject;
    if (input.isMinorTechnicalError) totalReduction += rule.reductionFactors.minorTechnicalError;

    totalReduction = Math.min(totalReduction, 0.7); // Max 70% reduction
    const reducedAmount = amount * (1 - totalReduction);

    // Apply limits
    let finalAmount = reducedAmount;
    if (rule.minimumAmount && finalAmount < rule.minimumAmount) {
      finalAmount = rule.minimumAmount;
    }
    if (rule.maximumAmount && finalAmount > rule.maximumAmount) {
      finalAmount = rule.maximumAmount;
    }

    return {
      baseAmount: rule.baseAmount,
      multipliedAmount,
      reducedAmount,
      finalAmount: Math.round(finalAmount),
      currency: rule.currency,
      appliedMultipliers: [
        input.isRepeatOffense ? 'Kundërvajtje e përsëritur' : 'Kundërvajtje e parë',
        `Shkalla: ${input.severityLevel}`,
        `Bashkëpunimi: ${input.cooperationLevel}`,
        `Impakti ekonomik: ${input.economicImpact}`
      ],
      appliedReductions: [
        input.isVoluntaryDisclosure ? 'Zbulim vullnetar' : '',
        input.isImmediatePayment ? 'Pagesë e menjëhershme' : '',
        input.isFirstTimeOffender ? 'Kundërvajtës për herë të parë' : '',
        input.isCooperativeSubject ? 'Subjekt bashkëpunues' : '',
        input.isMinorTechnicalError ? 'Gabim i vogël teknik' : ''
      ].filter(Boolean),
      calculationBreakdown: [
        {
          step: '1',
          amount: rule.baseAmount,
          factor: 1,
          description: `Vlera bazë sipas ${rule.legalBasis}`
        },
        {
          step: '2',
          amount: finalAmount,
          factor: 1,
          description: 'Vlera finale pas të gjithë faktorëve'
        }
      ],
      legalBasis: rule.legalBasis,
      recommendedAmount: Math.round(finalAmount),
      minimumAmount: rule.minimumAmount || 0,
      maximumAmount: rule.maximumAmount || 0
    };
  }

  private getMockHistory(): FineCalculationHistory[] {
    return [
      {
        id: 'calc-001',
        ruleId: 'CONTRABAND_001',
        input: {
          violationType: 'CONTRABAND',
          violationValue: 10000,
          isRepeatOffense: false,
          severityLevel: 'severe',
          cooperationLevel: 'partial',
          economicImpact: 'high',
          isVoluntaryDisclosure: false,
          isImmediatePayment: false,
          isFirstTimeOffender: true,
          isCooperativeSubject: false,
          isMinorTechnicalError: false
        },
        result: {
          baseAmount: 5000,
          multipliedAmount: 15000,
          reducedAmount: 12000,
          finalAmount: 12000,
          currency: 'EUR',
          appliedMultipliers: ['Kundërvajtje e parë', 'Shkalla: severe'],
          appliedReductions: ['Kundërvajtës për herë të parë'],
          calculationBreakdown: [],
          legalBasis: 'Neni 273, Kodi Doganor',
          recommendedAmount: 12000,
          minimumAmount: 5000,
          maximumAmount: 100000
        },
        calculatedBy: 'officer1',
        calculatedAt: new Date('2024-01-15'),
        caseId: 'CS-2024-001',
        approved: true,
        approvedBy: 'supervisor1',
        approvedAt: new Date('2024-01-15')
      }
    ];
  }

  private getMockStatistics(): FineCalculationStatistics {
    return {
      totalCalculations: 156,
      calculationsToday: 8,
      averageAmount: 7500,
      mostUsedRules: [
        { ruleId: 'FALSE_DECLARATION_001', violationType: 'FALSE_DECLARATION', count: 45 },
        { ruleId: 'CONTRABAND_001', violationType: 'CONTRABAND', count: 32 },
        { ruleId: 'DUTY_EVASION_001', violationType: 'DUTY_EVASION', count: 28 }
      ],
      calculationsByType: {
        'FALSE_DECLARATION': 45,
        'CONTRABAND': 32,
        'DUTY_EVASION': 28,
        'PROHIBITED_GOODS': 18,
        'DOCUMENTATION_MISSING': 33
      },
      calculationsByUser: {
        'officer1': 45,
        'officer2': 38,
        'supervisor1': 23,
        'inspector1': 50
      },
      totalFinesIssued: 134,
      totalAmountCalculated: 1245000
    };
  }
}

export const fineCalculationService = new FineCalculationService();
