# Fine Calculation Engine Module
# Motori i Llogaritjes së Gjobave Administrative

## Overview / Përmbledhje

The Fine Calculation Engine is a comprehensive module for calculating administrative fines in accordance with Albanian Customs Law. This module provides automated calculation based on predefined rules, factors, and legal requirements.

Motori i Llogaritjes së Gjobave është një modul gjithëpërfshirës për llogaritjen e gjobave administrative në përputhje me Ligjin Doganor të Shqipërisë. Ky modul ofron llogaritje të automatizuar bazuar në rregulla të paracaktuara, faktorë dhe kërkesat ligjore.

## Components / Komponentët

### 1. FineCalculationEngine.tsx
**Main calculation interface / Ndërfaqja kryesore e llogaritjes**

- Interactive calculation form with Albanian Customs rules
- Real-time calculation with detailed breakdown
- Support for multiple violation types and factors
- Integration with Albanian Customs Code articles

**Features:**
- ✅ Rule-based calculation engine
- ✅ Multiple violation types (CONTRABAND, FALSE_DECLARATION, DUTY_EVASION, etc.)
- ✅ Severity levels (minor, moderate, severe, critical)
- ✅ Cooperation factors (full, partial, none)
- ✅ Economic impact assessment
- ✅ Reduction factors (voluntary disclosure, immediate payment, etc.)
- ✅ Step-by-step calculation breakdown
- ✅ Albanian Customs Code compliance

### 2. FineCalculationRules.tsx
**Rule management interface / Ndërfaqja e menaxhimit të rregullave**

- CRUD operations for calculation rules
- Version control for rules
- Legal basis documentation
- Active/inactive rule management

**Features:**
- ✅ Create, edit, delete calculation rules
- ✅ Version tracking and audit trail
- ✅ Legal basis documentation
- ✅ Multiplier and reduction factor configuration
- ✅ Rule validation and testing

### 3. FineCalculationHistory.tsx
**Calculation history and audit trail / Historiku dhe auditimi i llogaritjeve**

- Complete audit trail of all calculations
- Export functionality
- User activity tracking
- Calculation result analysis

**Features:**
- ✅ Complete calculation history
- ✅ User-based access control
- ✅ Export to CSV functionality
- ✅ Detailed calculation parameters tracking
- ✅ Applied vs. non-applied calculations
- ✅ Pagination and filtering

## Legal Compliance / Përputhja Ligjore

The module implements calculation rules based on:

- **Albanian Customs Code (Kodi Doganor i Republikës së Shqipërisë)**
- **Article 273** - Goods Smuggling (Kontrabandë e Mallrave)
- **Article 274** - False Declaration (Deklarim i Rremë)
- **Article 275** - Duty Evasion (Shmangje nga Taksat Doganore)
- **Article 276** - Prohibited Goods (Mallra të Ndaluara)
- **Article 277** - Missing Documentation (Dokumente të Mangëta)

## Calculation Logic / Logjika e Llogaritjes

### Base Calculation / Llogaritja Bazë
1. **Fixed Amount** - E fiksuar
2. **Percentage of Value** - Përqindja e vlerës
3. **Progressive Scale** - Shkallë progressive

### Multiplier Factors / Faktorët Multiplikues
- **Offense Type** - Lloji i kundërvajtjes (first/repeat)
- **Severity Level** - Shkalla e rëndesës (minor/moderate/severe/critical)
- **Cooperation Level** - Niveli i bashkëpunimit (full/partial/none)
- **Economic Impact** - Impakti ekonomik (low/medium/high/critical)

### Reduction Factors / Faktorët e Reduktimit
- **Voluntary Disclosure** - Zbulim vullnetar (up to 35%)
- **Immediate Payment** - Pagesë e menjëhershme (up to 15%)
- **First Time Offender** - Kundërvajtës për herë të parë (up to 25%)
- **Cooperative Subject** - Subjekt bashkëpunues (up to 15%)
- **Minor Technical Error** - Gabim i vogël teknik (up to 50%)

*Maximum total reduction: 70%*

## Data Structure / Struktura e të Dhënave

### FineCalculationRule Interface
```typescript
interface FineCalculationRule {
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
    severity: { minor: number; moderate: number; severe: number; critical: number };
    cooperation: { full: number; partial: number; none: number };
    economicImpact: { low: number; medium: number; high: number; critical: number };
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
}
```

## Usage Examples / Shembuj Përdorimi

### 1. Simple Fixed Fine Calculation
```typescript
// Kontrabandë e mallrave - 5000 EUR bazë
const contraband = {
  violationType: 'CONTRABAND',
  baseAmount: 5000,
  calculationType: 'FIXED',
  severity: 'severe',
  cooperation: 'none',
  isFirstOffense: false
};
// Result: 5000 * 1.5 (severe) * 1.5 (no cooperation) * 2.0 (repeat) = 22,500 EUR
```

### 2. Percentage-based Calculation
```typescript
// Shmangje taksash - 150% e vlerës së shmangur
const dutyEvasion = {
  violationType: 'DUTY_EVASION',
  calculationType: 'PERCENTAGE',
  percentageRate: 150,
  violationValue: 10000, // EUR evaded
  reductionFactors: ['voluntaryDisclosure', 'immediatePayment']
};
// Result: 15000 * 0.65 (35% reduction) = 9,750 EUR
```

## Security Features / Veçoritë e Sigurisë

- **Role-based Access Control** - Kontroll qasje bazuar në role
- **Audit Trail** - Gjurmë auditimi
- **Session Tracking** - Ndjekje sesioni
- **IP Address Logging** - Regjistrim adrese IP
- **Data Encryption** - Enkriptim i të dhënave
- **Digital Signatures** - Nënshkrime digjitale

## Integration Points / Pikat e Integrimit

- **Case Management System** - Sistemi i menaxhimit të rasteve
- **Document Repository** - Depoja e dokumenteve
- **User Management** - Menaxhimi i përdoruesve
- **Audit System** - Sistemi i auditimit
- **Reporting Engine** - Motori i raporteve

## API Endpoints / Pikat e API-së

```typescript
// Calculation endpoints
POST /api/fines/calculate - Calculate fine amount
GET /api/fines/rules - Get calculation rules
POST /api/fines/rules - Create new rule
PUT /api/fines/rules/:id - Update rule
DELETE /api/fines/rules/:id - Delete rule
GET /api/fines/history - Get calculation history
POST /api/fines/apply - Apply calculated fine
```

## Testing / Testimi

### Unit Tests / Testet e Njësisë
- Calculation logic validation
- Rule application testing
- Edge case handling
- Albanian legal compliance

### Integration Tests / Testet e Integrimit
- Database operations
- User authentication
- Audit trail functionality
- Export capabilities

## Performance Considerations / Konsiderata të Performancës

- **Caching** - Rregullat e llogaritjes ruhen në cache
- **Pagination** - Historiku shfaqet me paginacion
- **Lazy Loading** - Ngarkimi lazy i të dhënave
- **Database Indexing** - Indeksimi i bazës së të dhënave

## Maintenance / Mirëmbajtja

### Regular Updates / Përditësimet e Rregullta
- Legal rule updates
- Exchange rate adjustments
- Performance optimizations
- Security patches

### Backup Strategy / Strategjia e Backup-ut
- Daily rule backups
- Calculation history archives
- Configuration snapshots
- Disaster recovery procedures

## Support / Mbështetja

For technical support and questions regarding the Fine Calculation Engine:

**Albanian Customs Administration - IT Department**
**Administrata Doganore Shqiptare - Departamenti i IT-së**

- Email: it-support@dogana.gov.al
- Phone: +355 4 xxxx xxx
- Internal: Extension 2500

## Version History / Historiku i Versioneve

- **v1.0.0** - Initial implementation with basic calculation engine
- **v1.1.0** - Added rules management interface
- **v1.2.0** - Implemented calculation history and audit trail
- **v1.3.0** - Enhanced Albanian Customs Code compliance
- **v1.4.0** - Added export functionality and performance improvements

## License / Licenca

This module is part of the LES (Legal Enforcement System) and is licensed under the GNU General Public License v3.0. See LICENSE file for details.

Ky modul është pjesë e LES (Sistemi i Zbatimit Ligjor) dhe është i licencuar nën GNU General Public License v3.0. Shihni skedarin LICENSE për detaje.
