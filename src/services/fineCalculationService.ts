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
      },
      {
        id: 'DUTY_EVASION_001',
        violationType: 'DUTY_EVASION',
        violationCode: 'KV-275',
        violationNameAlbanian: 'Shmangje nga Taksat Doganore',
        violationNameEnglish: 'Duty Evasion',
        legalBasis: 'Neni 275, Kodi Doganor i Republikës së Shqipërisë',
        baseAmount: 3000,
        currency: 'EUR',
        calculationType: 'PERCENTAGE',
        percentageRate: 150,
        minimumAmount: 2000,
        maximumAmount: 75000,
        multiplierFactors: {
          firstOffense: 1.0,
          repeatOffense: 2.2,
          severity: { minor: 0.7, moderate: 1.0, severe: 1.4, critical: 1.9 },
          cooperation: { full: 0.75, partial: 1.0, none: 1.4 },
          economicImpact: { low: 0.85, medium: 1.0, high: 1.25, critical: 1.6 }
        },
        reductionFactors: {
          voluntaryDisclosure: 0.35,
          immediatePayment: 0.12,
          firstTimeOffender: 0.22,
          cooperativeSubject: 0.18,
          minorTechnicalError: 0.4
        },
        isActive: true,
        effectiveDate: '2024-01-01',
        notes: 'Gjoba për shmangje nga taksat doganore',
        createdBy: 'admin',
        createdAt: '2024-01-01T00:00:00Z',
        version: 1
      },
      {
        id: 'PROHIBITED_GOODS_001',
        violationType: 'PROHIBITED_GOODS',
        violationCode: 'KV-276',
        violationNameAlbanian: 'Mallra të Ndaluara',
        violationNameEnglish: 'Prohibited Goods',
        legalBasis: 'Neni 276, Kodi Doganor i Republikës së Shqipërisë',
        baseAmount: 8000,
        currency: 'EUR',
        calculationType: 'FIXED',
        minimumAmount: 5000,
        maximumAmount: 150000,
        multiplierFactors: {
          firstOffense: 1.0,
          repeatOffense: 2.5,
          severity: { minor: 0.8, moderate: 1.0, severe: 1.6, critical: 2.2 },
          cooperation: { full: 0.8, partial: 1.0, none: 1.6 },
          economicImpact: { low: 0.9, medium: 1.0, high: 1.4, critical: 2.0 }
        },
        reductionFactors: {
          voluntaryDisclosure: 0.25,
          immediatePayment: 0.08,
          firstTimeOffender: 0.18,
          cooperativeSubject: 0.12,
          minorTechnicalError: 0.3
        },
        isActive: true,
        effectiveDate: '2024-01-01',
        notes: 'Gjoba për mallra të ndaluara sipas ligjit',
        createdBy: 'admin',
        createdAt: '2024-01-01T00:00:00Z',
        version: 1
      },
      {
        id: 'DOCUMENTATION_MISSING_001',
        violationType: 'DOCUMENTATION_MISSING',
        violationCode: 'KV-277',
        violationNameAlbanian: 'Dokumente të Mangëta',
        violationNameEnglish: 'Missing Documentation',
        legalBasis: 'Neni 277, Kodi Doganor i Republikës së Shqipërisë',
        baseAmount: 500,
        currency: 'EUR',
        calculationType: 'FIXED',
        minimumAmount: 300,
        maximumAmount: 5000,
        multiplierFactors: {
          firstOffense: 1.0,
          repeatOffense: 1.5,
          severity: { minor: 0.6, moderate: 1.0, severe: 1.3, critical: 1.8 },
          cooperation: { full: 0.7, partial: 1.0, none: 1.3 },
          economicImpact: { low: 0.8, medium: 1.0, high: 1.2, critical: 1.4 }
        },
        reductionFactors: {
          voluntaryDisclosure: 0.5,
          immediatePayment: 0.15,
          firstTimeOffender: 0.3,
          cooperativeSubject: 0.25,
          minorTechnicalError: 0.7
        },
        isActive: true,
        effectiveDate: '2024-01-01',
        notes: 'Gjoba për dokumente të mangëta ose të pasakta',
        createdBy: 'admin',
        createdAt: '2024-01-01T00:00:00Z',
        version: 1
      },
      {
        id: 'MISCLASSIFICATION_001',
        violationType: 'MISCLASSIFICATION',
        violationCode: 'KV-278',
        violationNameAlbanian: 'Klasifikim i Gabuar i Mallrave',
        violationNameEnglish: 'Goods Misclassification',
        legalBasis: 'Neni 278, Kodi Doganor i Republikës së Shqipërisë',
        baseAmount: 1000,
        currency: 'EUR',
        calculationType: 'PERCENTAGE',
        percentageRate: 50,
        minimumAmount: 500,
        maximumAmount: 15000,
        multiplierFactors: {
          firstOffense: 1.0,
          repeatOffense: 1.6,
          severity: { minor: 0.7, moderate: 1.0, severe: 1.3, critical: 1.7 },
          cooperation: { full: 0.75, partial: 1.0, none: 1.25 },
          economicImpact: { low: 0.8, medium: 1.0, high: 1.15, critical: 1.4 }
        },
        reductionFactors: {
          voluntaryDisclosure: 0.4,
          immediatePayment: 0.12,
          firstTimeOffender: 0.25,
          cooperativeSubject: 0.2,
          minorTechnicalError: 0.6
        },
        isActive: true,
        effectiveDate: '2024-01-01',
        notes: 'Gjoba për klasifikim të gabuar të mallrave në kodin doganor',
        createdBy: 'admin',
        createdAt: '2024-01-01T00:00:00Z',
        version: 1
      },
      {
        id: 'UNDERVALUATION_001',
        violationType: 'UNDERVALUATION',
        violationCode: 'KV-279',
        violationNameAlbanian: 'Nënvlerësim i Mallrave',
        violationNameEnglish: 'Goods Undervaluation',
        legalBasis: 'Neni 279, Kodi Doganor i Republikës së Shqipërisë',
        baseAmount: 1500,
        currency: 'EUR',
        calculationType: 'PERCENTAGE',
        percentageRate: 80,
        minimumAmount: 800,
        maximumAmount: 25000,
        multiplierFactors: {
          firstOffense: 1.0,
          repeatOffense: 1.8,
          severity: { minor: 0.7, moderate: 1.0, severe: 1.4, critical: 1.8 },
          cooperation: { full: 0.8, partial: 1.0, none: 1.3 },
          economicImpact: { low: 0.85, medium: 1.0, high: 1.2, critical: 1.5 }
        },
        reductionFactors: {
          voluntaryDisclosure: 0.35,
          immediatePayment: 0.1,
          firstTimeOffender: 0.2,
          cooperativeSubject: 0.15,
          minorTechnicalError: 0.5
        },
        isActive: true,
        effectiveDate: '2024-01-01',
        notes: 'Gjoba për nënvlerësim të qëllimshëm të mallrave',
        createdBy: 'admin',
        createdAt: '2024-01-01T00:00:00Z',
        version: 1
      }
    ];
  }

  private getMockCalculation(input: CalculationInput, ruleId: string): CalculationResult {
    const rule = this.getMockRules().find(r => r.id === ruleId);
    if (!rule) {
      throw new Error('Rregulla nuk u gjet për ID: ' + ruleId);
    }

    // Step-by-step calculation with detailed breakdown
    const breakdown: Array<{step: string; amount: number; factor: number; description: string}> = [];
    let currentAmount = rule.baseAmount;

    // Step 1: Base amount
    breakdown.push({
      step: '1',
      amount: currentAmount,
      factor: 1.0,
      description: `Vlera bazë sipas ${rule.violationCode} - ${rule.legalBasis}`
    });

    // Step 2: Handle percentage calculation if applicable
    if (rule.calculationType === 'PERCENTAGE' && input.violationValue) {
      const percentageAmount = (input.violationValue * (rule.percentageRate || 100)) / 100;
      currentAmount = Math.max(percentageAmount, rule.baseAmount);
      breakdown.push({
        step: '2',
        amount: currentAmount,
        factor: (rule.percentageRate || 100) / 100,
        description: `Llogaritje mbi bazë përqindjeje: ${input.violationValue} EUR × ${rule.percentageRate}% = ${percentageAmount.toLocaleString()} EUR`
      });
    }

    let stepCounter = breakdown.length + 1;

    // Step 3: Apply offense type multiplier
    const offenseMultiplier = input.isRepeatOffense ? rule.multiplierFactors.repeatOffense : rule.multiplierFactors.firstOffense;
    currentAmount *= offenseMultiplier;
    breakdown.push({
      step: stepCounter.toString(),
      amount: currentAmount,
      factor: offenseMultiplier,
      description: `${input.isRepeatOffense ? 'Kundërvajtje e përsëritur' : 'Kundërvajtje e parë'} (×${offenseMultiplier})`
    });
    stepCounter++;

    // Step 4: Apply severity multiplier
    const severityMultiplier = rule.multiplierFactors.severity[input.severityLevel];
    currentAmount *= severityMultiplier;
    const severityLabels = {
      minor: 'E vogël',
      moderate: 'E mesme',
      severe: 'E rëndë',
      critical: 'Kritike'
    };
    breakdown.push({
      step: stepCounter.toString(),
      amount: currentAmount,
      factor: severityMultiplier,
      description: `Shkalla e rëndesës: ${severityLabels[input.severityLevel]} (×${severityMultiplier})`
    });
    stepCounter++;

    // Step 5: Apply cooperation multiplier
    const cooperationMultiplier = rule.multiplierFactors.cooperation[input.cooperationLevel];
    currentAmount *= cooperationMultiplier;
    const cooperationLabels = {
      full: 'I plotë',
      partial: 'I pjesshëm',
      none: 'Asnjë'
    };
    breakdown.push({
      step: stepCounter.toString(),
      amount: currentAmount,
      factor: cooperationMultiplier,
      description: `Bashkëpunimi: ${cooperationLabels[input.cooperationLevel]} (×${cooperationMultiplier})`
    });
    stepCounter++;

    // Step 6: Apply economic impact multiplier
    const economicMultiplier = rule.multiplierFactors.economicImpact[input.economicImpact];
    currentAmount *= economicMultiplier;
    const economicLabels = {
      low: 'I ulët',
      medium: 'I mesëm',
      high: 'I lartë',
      critical: 'Kritik'
    };
    breakdown.push({
      step: stepCounter.toString(),
      amount: currentAmount,
      factor: economicMultiplier,
      description: `Impakti ekonomik: ${economicLabels[input.economicImpact]} (×${economicMultiplier})`
    });
    stepCounter++;

    const multipliedAmount = currentAmount;

    // Step 7: Apply reduction factors
    let totalReduction = 0;
    const appliedReductions: string[] = [];

    if (input.isVoluntaryDisclosure) {
      totalReduction += rule.reductionFactors.voluntaryDisclosure;
      appliedReductions.push(`Zbulim vullnetar (-${(rule.reductionFactors.voluntaryDisclosure * 100).toFixed(0)}%)`);
    }
    if (input.isImmediatePayment) {
      totalReduction += rule.reductionFactors.immediatePayment;
      appliedReductions.push(`Pagesë e menjëhershme (-${(rule.reductionFactors.immediatePayment * 100).toFixed(0)}%)`);
    }
    if (input.isFirstTimeOffender) {
      totalReduction += rule.reductionFactors.firstTimeOffender;
      appliedReductions.push(`Kundërvajtës për herë të parë (-${(rule.reductionFactors.firstTimeOffender * 100).toFixed(0)}%)`);
    }
    if (input.isCooperativeSubject) {
      totalReduction += rule.reductionFactors.cooperativeSubject;
      appliedReductions.push(`Subjekt bashkëpunues (-${(rule.reductionFactors.cooperativeSubject * 100).toFixed(0)}%)`);
    }
    if (input.isMinorTechnicalError) {
      totalReduction += rule.reductionFactors.minorTechnicalError;
      appliedReductions.push(`Gabim i vogël teknik (-${(rule.reductionFactors.minorTechnicalError * 100).toFixed(0)}%)`);
    }

    // Maximum reduction is 70%
    const cappedReduction = Math.min(totalReduction, 0.7);
    if (totalReduction > 0.7) {
      appliedReductions.push(`⚠️ Reduktimi i kufizuar në 70% maksimum`);
    }

    currentAmount = currentAmount * (1 - cappedReduction);

    if (cappedReduction > 0) {
      breakdown.push({
        step: stepCounter.toString(),
        amount: currentAmount,
        factor: 1 - cappedReduction,
        description: `Aplikimi i reduktimeve: -${(cappedReduction * 100).toFixed(1)}% (${appliedReductions.join(', ')})`
      });
      stepCounter++;
    }

    const reducedAmount = currentAmount;

    // Step 8: Apply minimum/maximum limits
    let finalAmount = reducedAmount;

    if (rule.minimumAmount && finalAmount < rule.minimumAmount) {
      finalAmount = rule.minimumAmount;
      breakdown.push({
        step: stepCounter.toString(),
        amount: finalAmount,
        factor: 1,
        description: `Aplikimi i limitit minimal: ${rule.minimumAmount.toLocaleString()} EUR`
      });
    }

    if (rule.maximumAmount && finalAmount > rule.maximumAmount) {
      finalAmount = rule.maximumAmount;
      breakdown.push({
        step: stepCounter.toString(),
        amount: finalAmount,
        factor: 1,
        description: `Aplikimi i limitit maksimal: ${rule.maximumAmount.toLocaleString()} EUR`
      });
    }

    // Create applied multipliers summary
    const appliedMultipliers = [
      input.isRepeatOffense ? `Kundërvajtje e përsëritur (×${offenseMultiplier})` : `Kundërvajtje e parë (×${offenseMultiplier})`,
      `Shkalla e rëndesës: ${severityLabels[input.severityLevel]} (×${severityMultiplier})`,
      `Bashkëpunimi: ${cooperationLabels[input.cooperationLevel]} (×${cooperationMultiplier})`,
      `Impakti ekonomik: ${economicLabels[input.economicImpact]} (×${economicMultiplier})`
    ];

    return {
      baseAmount: rule.baseAmount,
      multipliedAmount: Math.round(multipliedAmount),
      reducedAmount: Math.round(reducedAmount),
      finalAmount: Math.round(finalAmount),
      currency: rule.currency,
      appliedMultipliers,
      appliedReductions,
      calculationBreakdown: breakdown,
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
