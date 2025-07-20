import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts';
import MainLayout from '../../components/layout/MainLayout';
import './ViolationCreateClassic.css';

interface ViolationFormData {
  // Basic Information
  caseNumber: string;
  violationType: string;
  violationSubtype: string;
  priority: 'I ulët' | 'I mesëm' | 'I lartë' | 'Urgjent';
  reportDate: string;
  location: string;
  customsPost: string;
  
  // Subject Information
  subjectType: 'Fizik' | 'Juridik' | 'Organizatë';
  subjectName: string;
  subjectId: string; // Personal ID or Fiscal Number
  subjectAddress: string;
  subjectPhone: string;
  subjectEmail: string;
  
  // Vehicle Information (if applicable)
  hasVehicle: boolean;
  vehiclePlateNumber: string;
  vehicleType: string;
  vehicleModel: string;
  vehicleYear: string;
  driverName: string;
  driverLicense: string;
  
  // Goods Information
  goodsDescription: string;
  quantity: string;
  unit: string;
  declaredValue: string;
  actualValue: string;
  originCountry: string;
  destinationCountry: string;
  
  // Violation Details
  description: string;
  lawArticle: string;
  evidenceDescription: string;
  witnessInfo: string;
  
  // Administrative
  reportingOfficer: string;
  assignedOfficer: string;
  department: string;
  isConfidential: boolean;
  requiresApproval: boolean;
}

const ViolationCreateClassic: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ViolationFormData>({
    caseNumber: `KV-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,
    violationType: '',
    violationSubtype: '',
    priority: 'I mesëm',
    reportDate: new Date().toISOString().split('T')[0],
    location: '',
    customsPost: state.user?.customsPost || '',
    
    subjectType: 'Fizik',
    subjectName: '',
    subjectId: '',
    subjectAddress: '',
    subjectPhone: '',
    subjectEmail: '',
    
    hasVehicle: false,
    vehiclePlateNumber: '',
    vehicleType: '',
    vehicleModel: '',
    vehicleYear: '',
    driverName: '',
    driverLicense: '',
    
    goodsDescription: '',
    quantity: '',
    unit: '',
    declaredValue: '',
    actualValue: '',
    originCountry: '',
    destinationCountry: '',
    
    description: '',
    lawArticle: '',
    evidenceDescription: '',
    witnessInfo: '',
    
    reportingOfficer: state.user?.fullName || '',
    assignedOfficer: '',
    department: state.user?.department || '',
    isConfidential: false,
    requiresApproval: true
  });

  const violationTypes = [
    'Kontrabandë',
    'Gabim deklarimi',
    'Dokumenta të falsifikuara',
    'Mosdeklarim',
    'Shkelje procedurale',
    'Transportim ilegal',
    'Dokumenta të skaduara',
    'Mallra të ndaluara',
    'Nënvlerësim',
    'Shmangje nga taksat'
  ];

  const violationSubtypes: Record<string, string[]> = {
    'Kontrabandë': ['Mallra të fshehura', 'Kalim i paligjshëm', 'Shmangje doganore'],
    'Gabim deklarimi': ['Gabim në vlerë', 'Gabim në sasi', 'Gabim në klasifikim'],
    'Dokumenta të falsifikuara': ['Fatura të falsifikuara', 'Certifikata të falsifikuara', 'Pasaporta të falsifikuara'],
    'Mosdeklarim': ['Mallra të fshehura', 'Deklarim i paplotë', 'Mosdeklarim total'],
    'Shkelje procedurale': ['Procedura e gabuar', 'Autorizime të humbura', 'Afate të skaduara'],
    'Transportim ilegal': ['Pa dokumente', 'Rrugë e ndaluar', 'Kohë e ndaluar'],
    'Dokumenta të skaduara': ['Licenca e skaduar', 'Sigurim i skaduar', 'Regjistrimi i skaduar'],
    'Mallra të ndaluara': ['Drogë', 'Armë', 'Eksplozivë', 'Materiale të rrezikshme'],
    'Nënvlerësim': ['Vlerë më e ulët', 'Fatura e falsifikuar', 'Manipulim çmimi'],
    'Shmangje nga taksat': ['Mosdeklarim taksa', 'Reduktim i paligjshëm', 'Shmangie doganore']
  };

  const customsPosts = [
    'Aeroporti Nënë Tereza',
    'Doganë e Durrësit',
    'Kufiri Morinë',
    'Kufiri Qafë Thanë',
    'Kufiri Vermicë',
    'Doganë e Prishtinës',
    'Doganë e Gjakovës',
    'Doganë e Prizrenit'
  ];

  const officers = [
    'Agron Berisha',
    'Fatmire Krasniqi',
    'Mentor Gashi',
    'Blerta Jashari',
    'Driton Hoxha',
    'Mimoza Rama'
  ];

  const handleInputChange = (field: keyof ViolationFormData, value: string | boolean | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      // Simulate API call
      console.log('Creating violation case:', formData);
      
      // Show success message
      alert(`Rasti i kundërvajtjes u krijua me sukses!\nNumri i rastit: ${formData.caseNumber}`);
      
      // Navigate back to violations list
      navigate('/violations/list');
    } catch (error) {
      console.error('Error creating violation:', error);
      alert('Gabim gjatë krijimit të rastit të kundërvajtjes!');
    }
  };

  const renderStep1 = () => (
    <div className="form-step">
      <h3>Hapi 1: Informacioni Bazë</h3>
      
      <div className="form-grid">
        <div className="form-group">
          <label>Numri i Rastit *</label>
          <input
            type="text"
            value={formData.caseNumber}
            onChange={(e) => handleInputChange('caseNumber', e.target.value)}
            className="classic-input"
            disabled
          />
        </div>

        <div className="form-group">
          <label>Data e Raportimit *</label>
          <input
            type="date"
            value={formData.reportDate}
            onChange={(e) => handleInputChange('reportDate', e.target.value)}
            className="classic-input"
            required
          />
        </div>

        <div className="form-group">
          <label>Lloji i Kundërvajtjes *</label>
          <select
            value={formData.violationType}
            onChange={(e) => handleInputChange('violationType', e.target.value)}
            className="classic-select"
            required
          >
            <option value="">Zgjidhni llojin...</option>
            {violationTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Nënlloji i Kundërvajtjes</label>
          <select
            value={formData.violationSubtype}
            onChange={(e) => handleInputChange('violationSubtype', e.target.value)}
            className="classic-select"
            disabled={!formData.violationType}
          >
            <option value="">Zgjidhni nënllojin...</option>
            {formData.violationType && violationSubtypes[formData.violationType]?.map(subtype => (
              <option key={subtype} value={subtype}>{subtype}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Prioriteti *</label>
          <select
            value={formData.priority}
            onChange={(e) => handleInputChange('priority', e.target.value as 'I ulët' | 'I mesëm' | 'I lartë' | 'Urgjent')}
            className="classic-select"
            required
          >
            <option value="I ulët">I ulët</option>
            <option value="I mesëm">I mesëm</option>
            <option value="I lartë">I lartë</option>
            <option value="Urgjent">Urgjent</option>
          </select>
        </div>

        <div className="form-group">
          <label>Posti Doganor *</label>
          <select
            value={formData.customsPost}
            onChange={(e) => handleInputChange('customsPost', e.target.value)}
            className="classic-select"
            required
          >
            <option value="">Zgjidhni postin...</option>
            {customsPosts.map(post => (
              <option key={post} value={post}>{post}</option>
            ))}
          </select>
        </div>

        <div className="form-group full-width">
          <label>Lokacioni i Saktë *</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="classic-input"
            placeholder="Përshkrini lokacionin e saktë të kundërvajtjes..."
            required
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="form-step">
      <h3>Hapi 2: Informacioni i Subjektit</h3>
      
      <div className="form-grid">
        <div className="form-group">
          <label>Lloji i Subjektit *</label>
          <select
            value={formData.subjectType}
            onChange={(e) => handleInputChange('subjectType', e.target.value as 'Fizik' | 'Juridik' | 'Organizatë')}
            className="classic-select"
            required
          >
            <option value="Fizik">Person Fizik</option>
            <option value="Juridik">Person Juridik</option>
            <option value="Organizatë">Organizatë</option>
          </select>
        </div>

        <div className="form-group">
          <label>
            {formData.subjectType === 'Fizik' ? 'Emri dhe Mbiemri *' : 'Emri i Kompanisë *'}
          </label>
          <input
            type="text"
            value={formData.subjectName}
            onChange={(e) => handleInputChange('subjectName', e.target.value)}
            className="classic-input"
            required
          />
        </div>

        <div className="form-group">
          <label>
            {formData.subjectType === 'Fizik' ? 'Numri Personal *' : 'Numri Fiskal *'}
          </label>
          <input
            type="text"
            value={formData.subjectId}
            onChange={(e) => handleInputChange('subjectId', e.target.value)}
            className="classic-input"
            required
          />
        </div>

        <div className="form-group">
          <label>Telefoni</label>
          <input
            type="tel"
            value={formData.subjectPhone}
            onChange={(e) => handleInputChange('subjectPhone', e.target.value)}
            className="classic-input"
            placeholder="+383 XX XXX XXX"
          />
        </div>

        <div className="form-group full-width">
          <label>Adresa *</label>
          <input
            type="text"
            value={formData.subjectAddress}
            onChange={(e) => handleInputChange('subjectAddress', e.target.value)}
            className="classic-input"
            required
          />
        </div>

        <div className="form-group full-width">
          <label>Email</label>
          <input
            type="email"
            value={formData.subjectEmail}
            onChange={(e) => handleInputChange('subjectEmail', e.target.value)}
            className="classic-input"
          />
        </div>
      </div>

      {/* Vehicle Information */}
      <div className="vehicle-section">
        <div className="form-group full-width">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={formData.hasVehicle}
              onChange={(e) => handleInputChange('hasVehicle', e.target.checked)}
              className="classic-checkbox"
            />
            Ka të bëjë me mjet transporti
          </label>
        </div>

        {formData.hasVehicle && (
          <div className="vehicle-details">
            <div className="form-grid">
              <div className="form-group">
                <label>Targat *</label>
                <input
                  type="text"
                  value={formData.vehiclePlateNumber}
                  onChange={(e) => handleInputChange('vehiclePlateNumber', e.target.value)}
                  className="classic-input"
                  required={formData.hasVehicle}
                />
              </div>

              <div className="form-group">
                <label>Lloji i Mjetit</label>
                <input
                  type="text"
                  value={formData.vehicleType}
                  onChange={(e) => handleInputChange('vehicleType', e.target.value)}
                  className="classic-input"
                  placeholder="Kamion, Autobus, Makinë..."
                />
              </div>

              <div className="form-group">
                <label>Modeli</label>
                <input
                  type="text"
                  value={formData.vehicleModel}
                  onChange={(e) => handleInputChange('vehicleModel', e.target.value)}
                  className="classic-input"
                />
              </div>

              <div className="form-group">
                <label>Viti</label>
                <input
                  type="number"
                  value={formData.vehicleYear}
                  onChange={(e) => handleInputChange('vehicleYear', e.target.value)}
                  className="classic-input"
                  min="1990"
                  max={new Date().getFullYear()}
                />
              </div>

              <div className="form-group">
                <label>Emri i Shoferit</label>
                <input
                  type="text"
                  value={formData.driverName}
                  onChange={(e) => handleInputChange('driverName', e.target.value)}
                  className="classic-input"
                />
              </div>

              <div className="form-group">
                <label>Patenta e Shoferit</label>
                <input
                  type="text"
                  value={formData.driverLicense}
                  onChange={(e) => handleInputChange('driverLicense', e.target.value)}
                  className="classic-input"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="form-step">
      <h3>Hapi 3: Informacioni i Mallrave dhe Detajet</h3>
      
      <div className="form-grid">
        <div className="form-group full-width">
          <label>Përshkrimi i Mallrave</label>
          <textarea
            value={formData.goodsDescription}
            onChange={(e) => handleInputChange('goodsDescription', e.target.value)}
            className="classic-textarea"
            rows={3}
            placeholder="Përshkruani mallrat e përfshira në kundërvajtje..."
          />
        </div>

        <div className="form-group">
          <label>Sasia</label>
          <input
            type="text"
            value={formData.quantity}
            onChange={(e) => handleInputChange('quantity', e.target.value)}
            className="classic-input"
          />
        </div>

        <div className="form-group">
          <label>Njësia</label>
          <select
            value={formData.unit}
            onChange={(e) => handleInputChange('unit', e.target.value)}
            className="classic-select"
          >
            <option value="">Zgjidhni njësinë...</option>
            <option value="kg">Kilogram (kg)</option>
            <option value="ton">Ton</option>
            <option value="copë">Copë</option>
            <option value="paketa">Paketa</option>
            <option value="litër">Litër</option>
            <option value="m³">Metër kub (m³)</option>
          </select>
        </div>

        <div className="form-group">
          <label>Vlera e Deklaruar (€)</label>
          <input
            type="number"
            value={formData.declaredValue}
            onChange={(e) => handleInputChange('declaredValue', e.target.value)}
            className="classic-input"
            min="0"
            step="0.01"
          />
        </div>

        <div className="form-group">
          <label>Vlera Reale (€)</label>
          <input
            type="number"
            value={formData.actualValue}
            onChange={(e) => handleInputChange('actualValue', e.target.value)}
            className="classic-input"
            min="0"
            step="0.01"
          />
        </div>

        <div className="form-group">
          <label>Vendi i Origjinës</label>
          <input
            type="text"
            value={formData.originCountry}
            onChange={(e) => handleInputChange('originCountry', e.target.value)}
            className="classic-input"
          />
        </div>

        <div className="form-group">
          <label>Destinacioni</label>
          <input
            type="text"
            value={formData.destinationCountry}
            onChange={(e) => handleInputChange('destinationCountry', e.target.value)}
            className="classic-input"
          />
        </div>

        <div className="form-group">
          <label>Neni i Ligjit</label>
          <input
            type="text"
            value={formData.lawArticle}
            onChange={(e) => handleInputChange('lawArticle', e.target.value)}
            className="classic-input"
            placeholder="p.sh. Neni 23, paragrafi 2"
          />
        </div>

        <div className="form-group full-width">
          <label>Përshkrimi i Kundërvajtjes *</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="classic-textarea"
            rows={4}
            placeholder="Përshkruani detalisht kundërvajtjen..."
            required
          />
        </div>

        <div className="form-group full-width">
          <label>Dëshmitë dhe Provat</label>
          <textarea
            value={formData.evidenceDescription}
            onChange={(e) => handleInputChange('evidenceDescription', e.target.value)}
            className="classic-textarea"
            rows={3}
            placeholder="Përshkruani dëshmitë dhe provat e mbledhura..."
          />
        </div>

        <div className="form-group full-width">
          <label>Informacioni i Dëshmitarëve</label>
          <textarea
            value={formData.witnessInfo}
            onChange={(e) => handleInputChange('witnessInfo', e.target.value)}
            className="classic-textarea"
            rows={2}
            placeholder="Informacioni i dëshmitarëve (emrat, kontaktet)..."
          />
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="form-step">
      <h3>Hapi 4: Informacioni Administrativ dhe Konfirmimi</h3>
      
      <div className="form-grid">
        <div className="form-group">
          <label>Oficeri Raportues *</label>
          <input
            type="text"
            value={formData.reportingOfficer}
            onChange={(e) => handleInputChange('reportingOfficer', e.target.value)}
            className="classic-input"
            required
          />
        </div>

        <div className="form-group">
          <label>Oficeri i Caktuar</label>
          <select
            value={formData.assignedOfficer}
            onChange={(e) => handleInputChange('assignedOfficer', e.target.value)}
            className="classic-select"
          >
            <option value="">Zgjidhni oficerin...</option>
            {officers.map(officer => (
              <option key={officer} value={officer}>{officer}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Departamenti</label>
          <input
            type="text"
            value={formData.department}
            onChange={(e) => handleInputChange('department', e.target.value)}
            className="classic-input"
          />
        </div>

        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={formData.isConfidential}
              onChange={(e) => handleInputChange('isConfidential', e.target.checked)}
              className="classic-checkbox"
            />
            Rast konfidencial
          </label>
        </div>

        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={formData.requiresApproval}
              onChange={(e) => handleInputChange('requiresApproval', e.target.checked)}
              className="classic-checkbox"
            />
            Kërkon miratim të supervizorëve
          </label>
        </div>
      </div>

      {/* Summary Section */}
      <div className="summary-section">
        <h4>Përmbledhje e Rastit</h4>
        <div className="summary-grid">
          <div className="summary-item">
            <strong>Numri i Rastit:</strong> {formData.caseNumber}
          </div>
          <div className="summary-item">
            <strong>Lloji i Kundërvajtjes:</strong> {formData.violationType}
          </div>
          <div className="summary-item">
            <strong>Subjekti:</strong> {formData.subjectName}
          </div>
          <div className="summary-item">
            <strong>Prioriteti:</strong> {formData.priority}
          </div>
          <div className="summary-item">
            <strong>Lokacioni:</strong> {formData.location}
          </div>
          <div className="summary-item">
            <strong>Data:</strong> {formData.reportDate}
          </div>
        </div>
      </div>
    </div>
  );

  const getStepClass = (step: number) => {
    if (step === currentStep) return 'step active';
    if (step < currentStep) return 'step completed';
    return 'step';
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.violationType && formData.reportDate && formData.location && formData.customsPost;
      case 2:
        return formData.subjectName && formData.subjectId && formData.subjectAddress;
      case 3:
        return formData.description;
      case 4:
        return formData.reportingOfficer;
      default:
        return true;
    }
  };

  return (
    <MainLayout>
      <div className="violation-create-classic">
        <div className="classic-window">
          <div className="classic-window-header">
            ➕ Krijimi i Kundërvajtjes së Re - Administrata Doganore e Kosovës
          </div>
          <div className="classic-window-content">
            
            {/* Progress Steps */}
            <div className="progress-steps">
              <div className={getStepClass(1)}>
                <div className="step-number">1</div>
                <div className="step-title">Informacioni Bazë</div>
              </div>
              <div className={getStepClass(2)}>
                <div className="step-number">2</div>
                <div className="step-title">Subjekti</div>
              </div>
              <div className={getStepClass(3)}>
                <div className="step-number">3</div>
                <div className="step-title">Mallrat dhe Detajet</div>
              </div>
              <div className={getStepClass(4)}>
                <div className="step-number">4</div>
                <div className="step-title">Konfirmimi</div>
              </div>
            </div>

            {/* Form Content */}
            <div className="form-content">
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
              {currentStep === 4 && renderStep4()}
            </div>

            {/* Navigation Buttons */}
            <div className="form-navigation">
              <div className="nav-left">
                <button 
                  className="classic-button"
                  onClick={() => navigate('/violations/dashboard')}
                >
                  ❌ Anulo
                </button>
              </div>
              
              <div className="nav-right">
                {currentStep > 1 && (
                  <button 
                    className="classic-button"
                    onClick={handlePrevious}
                  >
                    ← Kthehu
                  </button>
                )}
                
                {currentStep < 4 ? (
                  <button 
                    className={`classic-button ${isStepValid() ? 'btn-primary' : 'btn-disabled'}`}
                    onClick={handleNext}
                    disabled={!isStepValid()}
                  >
                    Vazhdo →
                  </button>
                ) : (
                  <button 
                    className={`classic-button ${isStepValid() ? 'btn-success' : 'btn-disabled'}`}
                    onClick={handleSubmit}
                    disabled={!isStepValid()}
                  >
                    ✅ Krijo Rastin
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ViolationCreateClassic;
