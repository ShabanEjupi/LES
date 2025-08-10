// Fine Calculation Engine Types - Albanian Customs Administration (LES)
// Llojet e të Dhënave për Motorin e Llogaritjes së Gjobave - Administrata Doganore e Shqipërisë

export interface FineCalculationRule {
  id: string;
  violationType: string;
  violationCode: string;
  violationNameAlbanian: string;
  violationNameEnglish: string;
  legalBasis: string;
  baseAmount: number;
  currency: 'EUR' | 'USD' | 'ALL';
  calculationType: 'FIXED' | 'PERCENTAGE' | 'PROGRESSIVE' | 'CUSTOM';
  percentageRate?: number;
  minimumAmount?: number;
  maximumAmount?: number;
  multiplierFactors: {
    firstOffense: number;
    repeatOffense: number;
    severity: {
      minor: number;
      moderate: number;
      severe: number;
      critical: number;
    };
    cooperation: {
      full: number;
      partial: number;
      none: number;
    };
    economicImpact: {
      low: number;
      medium: number;
      high: number;
      critical: number;
    };
  };
  reductionFactors: {
    voluntaryDisclosure: number;
    immediatePayment: number;
    firstTimeOffender: number;
    cooperativeSubject: number;
    minorTechnicalError: number;
  };
  isActive: boolean;
  effectiveDate: string;
  expiryDate?: string;
  notes: string;
  createdBy: string;
  createdAt: string;
  lastModifiedBy?: string;
  lastModifiedAt?: string;
  version: number;
}

export interface CalculationInput {
  violationType: string;
  violationValue?: number; // For percentage-based calculations
  isRepeatOffense: boolean;
  severityLevel: 'minor' | 'moderate' | 'severe' | 'critical';
  cooperationLevel: 'full' | 'partial' | 'none';
  economicImpact: 'low' | 'medium' | 'high' | 'critical';
  isVoluntaryDisclosure: boolean;
  isImmediatePayment: boolean;
  isFirstTimeOffender: boolean;
  isCooperativeSubject: boolean;
  isMinorTechnicalError: boolean;
  customFactors?: { [key: string]: number };
}

export interface CalculationResult {
  baseAmount: number;
  multipliedAmount: number;
  reducedAmount: number;
  finalAmount: number;
  currency: string;
  appliedMultipliers: string[];
  appliedReductions: string[];
  calculationBreakdown: {
    step: string;
    amount: number;
    factor: number;
    description: string;
  }[];
  legalBasis: string;
  recommendedAmount: number;
  minimumAmount: number;
  maximumAmount: number;
}

export interface FineCalculationHistory {
  id: string;
  ruleId: string;
  input: CalculationInput;
  result: CalculationResult;
  calculatedBy: string;
  calculatedAt: Date;
  caseId?: string;
  violationId?: string;
  notes?: string;
  approved: boolean;
  approvedBy?: string;
  approvedAt?: Date;
}

export interface FineCalculationStatistics {
  totalCalculations: number;
  calculationsToday: number;
  averageAmount: number;
  mostUsedRules: Array<{
    ruleId: string;
    violationType: string;
    count: number;
  }>;
  calculationsByType: Record<string, number>;
  calculationsByUser: Record<string, number>;
  totalFinesIssued: number;
  totalAmountCalculated: number;
}
