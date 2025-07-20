import React, { useState } from 'react';
import type { ViolationType } from '../../types';
import './ViolationProcess.css';

interface ViolationFormData {
  subjectType?: string;
  subjectName?: string;
  subjectId?: string;
  address?: string;
  phone?: string;
  email?: string;
  goodsDescription?: string;
  quantity?: number;
  unit?: string;
  declaredValue?: number;
  actualValue?: number;
  originCountry?: string;
  missingDocuments?: string;
}

const ViolationProcess: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ViolationFormData>({});
  const [selectedViolationType, setSelectedViolationType] = useState<ViolationType | ''>('');

  const steps = [
    { id: 1, title: 'Lloji i Kundërvajtjes', description: 'Përzgjedhja e llojit të kundërvajtjes' },
    { id: 2, title: 'Detajet e Subjektit', description: 'Informata për subjektin kundërvajtës' },
    { id: 3, title: 'Detajet e Mallrave', description: 'Përshkrimi i mallrave dhe dokumenteve' },
    { id: 4, title: 'Konfirmimi', description: 'Rishikimi dhe konfirmimi i të dhënave' }
  ];

  const violationTypes: Array<{id: ViolationType; name: string; description: string}> = [
    { id: 'TAX_EVASION', name: 'Shmangje nga Taksat', description: 'Mosdeklarim i drejtë për shmangjen e taksave' },
    { id: 'MISCLASSIFICATION', name: 'Klasifikim i Gabuar', description: 'Deklarim i gabuar i mallrave' },
    { id: 'SMUGGLING', name: 'Kontrabandë', description: 'Tentativë për kalim të paligjshëm të mallrave' },
    { id: 'UNDERVALUATION', name: 'Nënvlerësim', description: 'Deklarim i vlerës më të ulët se reale' },
    { id: 'PROHIBITED_GOODS', name: 'Mallra të Ndaluara', description: 'Import/eksport i mallrave të ndaluara' },
    { id: 'INCOMPLETE_DOCUMENTATION', name: 'Dokumentacion i Paplotë', description: 'Mungesa e dokumenteve të nevojshme' }
  ];

  const handleInputChange = (field: keyof ViolationFormData, value: string | number) => {
    setFormData((prev: ViolationFormData) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
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
      // Here you would submit the violation case
      const violationCase = {
        ...formData,
        type: selectedViolationType,
        status: 'PENDING',
        createdAt: new Date().toISOString(),
        caseNumber: `KV-${Date.now()}`,
        priority: 'MEDIUM'
      };

      console.log('Creating violation case:', violationCase);
      alert('Rasti i kundërvajtjes u krijua me sukses!');
      
      // Reset form
      setFormData({});
      setSelectedViolationType('');
      setCurrentStep(1);
    } catch (error) {
      console.error('Error creating violation case:', error);
      alert('Gabim gjatë krijimit të rastit të kundërvajtjes!');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-content">
            <h3>Përzgjidhni Llojin e Kundërvajtjes</h3>
            <div className="violation-types-grid">
              {violationTypes.map(type => (
                <div
                  key={type.id}
                  className={`violation-type-card ${selectedViolationType === type.id ? 'selected' : ''}`}
                  onClick={() => setSelectedViolationType(type.id)}
                >
                  <h4>{type.name}</h4>
                  <p>{type.description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="step-content">
            <h3>Detajet e Subjektit Kundërvajtës</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Lloji i Subjektit</label>
                <select
                  value={formData.subjectType || ''}
                  onChange={(e) => handleInputChange('subjectType', e.target.value)}
                >
                  <option value="">Përzgjidhni...</option>
                  <option value="individual">Person Fizik</option>
                  <option value="company">Kompani</option>
                  <option value="organization">Organizatë</option>
                </select>
              </div>

              <div className="form-group">
                <label>Emri/Emërtimi</label>
                <input
                  type="text"
                  value={formData.subjectName || ''}
                  onChange={(e) => handleInputChange('subjectName', e.target.value)}
                  placeholder="Shkruani emrin ose emërtimin"
                />
              </div>

              <div className="form-group">
                <label>Numri Personal/Fiskal</label>
                <input
                  type="text"
                  value={formData.subjectId || ''}
                  onChange={(e) => handleInputChange('subjectId', e.target.value)}
                  placeholder="Numri personal ose fiskal"
                />
              </div>

              <div className="form-group">
                <label>Adresa</label>
                <textarea
                  value={formData.address || ''}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Adresa e plotë"
                  rows={3}
                />
              </div>

              <div className="form-group">
                <label>Telefoni</label>
                <input
                  type="tel"
                  value={formData.phone || ''}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+383 xx xxx xxx"
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="email@example.com"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="step-content">
            <h3>Detajet e Mallrave dhe Dokumenteve</h3>
            <div className="form-grid">
              <div className="form-group full-width">
                <label>Përshkrimi i Mallrave</label>
                <textarea
                  value={formData.goodsDescription || ''}
                  onChange={(e) => handleInputChange('goodsDescription', e.target.value)}
                  placeholder="Përshkrimi i detajuar i mallrave"
                  rows={4}
                />
              </div>

              <div className="form-group">
                <label>Sasia</label>
                <input
                  type="number"
                  value={formData.quantity || ''}
                  onChange={(e) => handleInputChange('quantity', Number(e.target.value))}
                  placeholder="Sasia e mallrave"
                />
              </div>

              <div className="form-group">
                <label>Njësia e Matjes</label>
                <select
                  value={formData.unit || ''}
                  onChange={(e) => handleInputChange('unit', e.target.value)}
                >
                  <option value="">Përzgjidhni...</option>
                  <option value="kg">Kilogram (kg)</option>
                  <option value="ton">Ton</option>
                  <option value="piece">Copë</option>
                  <option value="liter">Litër</option>
                  <option value="package">Paketë</option>
                </select>
              </div>

              <div className="form-group">
                <label>Vlera e Deklaruar (€)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.declaredValue || ''}
                  onChange={(e) => handleInputChange('declaredValue', Number(e.target.value))}
                  placeholder="0.00"
                />
              </div>

              <div className="form-group">
                <label>Vlera e Vërtetë (€)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.actualValue || ''}
                  onChange={(e) => handleInputChange('actualValue', Number(e.target.value))}
                  placeholder="0.00"
                />
              </div>

              <div className="form-group">
                <label>Vendi i Origjinës</label>
                <input
                  type="text"
                  value={formData.originCountry || ''}
                  onChange={(e) => handleInputChange('originCountry', e.target.value)}
                  placeholder="Shteti i origjinës"
                />
              </div>

              <div className="form-group full-width">
                <label>Dokumentet e Munguar</label>
                <textarea
                  value={formData.missingDocuments || ''}
                  onChange={(e) => handleInputChange('missingDocuments', e.target.value)}
                  placeholder="Lista e dokumenteve që mungojnë"
                  rows={3}
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="step-content">
            <h3>Konfirmimi i të Dhënave</h3>
            <div className="confirmation-content">
              <div className="summary-section">
                <h4>Lloji i Kundërvajtjes</h4>
                <p>{violationTypes.find(t => t.id === selectedViolationType)?.name}</p>
              </div>

              <div className="summary-section">
                <h4>Subjekti</h4>
                <p><strong>Emri:</strong> {formData.subjectName}</p>
                <p><strong>Lloji:</strong> {formData.subjectType}</p>
                <p><strong>Nr. Personal/Fiskal:</strong> {formData.subjectId}</p>
              </div>

              <div className="summary-section">
                <h4>Mallrat</h4>
                <p><strong>Përshkrimi:</strong> {formData.goodsDescription}</p>
                <p><strong>Sasia:</strong> {formData.quantity} {formData.unit}</p>
                <p><strong>Vlera:</strong> €{formData.declaredValue}</p>
              </div>

              <div className="confirmation-note">
                <p>Pas konfirmimit, rasti do të krijohet dhe do të caktohet numri i rastit. A jeni të sigurt që dëshironi të vazhdoni?</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="violation-process">
      <div className="page-header">
        <h1>Procesi i Kundërvajtjes</h1>
        <p>Krijimi i rastit të ri të kundërvajtjes doganore</p>
      </div>

      <div className="process-container">
        {/* Progress Steps */}
        <div className="steps-navigation">
          {steps.map((step) => (
            <div key={step.id} className={`step ${currentStep === step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}>
              <div className="step-number">{step.id}</div>
              <div className="step-info">
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="process-content">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="process-navigation">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="btn btn-secondary"
          >
            Mbrapa
          </button>

          {currentStep < steps.length ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={currentStep === 1 && !selectedViolationType}
              className="btn btn-primary"
            >
              Përpara
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="btn btn-success"
            >
              Krijo Rastin
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViolationProcess;
