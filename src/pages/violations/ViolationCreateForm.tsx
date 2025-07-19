import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface ViolationFormData {
  caseNumber: string;
  violationType: string;
  violationSubtype: string;
  subject: {
    type: 'company' | 'individual';
    name: string;
    idNumber: string;
    address: string;
    phone: string;
    email: string;
  };
  location: {
    customsPost: string;
    checkpoint: string;
    coordinates: string;
  };
  vehicle: {
    plateNumber: string;
    type: string;
    model: string;
    year: string;
    driverName: string;
    driverLicense: string;
  };
  goods: {
    description: string;
    quantity: string;
    value: string;
    origin: string;
    destination: string;
  };
  description: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  assignedOfficer: string;
  witnesses: string[];
  documents: string[];
  evidence: string[];
}

const ViolationCreateForm: React.FC = () => {
  const { state } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ViolationFormData>({
    caseNumber: `KV-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
    violationType: '',
    violationSubtype: '',
    subject: {
      type: 'company',
      name: '',
      idNumber: '',
      address: '',
      phone: '',
      email: ''
    },
    location: {
      customsPost: state.user?.customsPost || '',
      checkpoint: '',
      coordinates: ''
    },
    vehicle: {
      plateNumber: '',
      type: '',
      model: '',
      year: '',
      driverName: '',
      driverLicense: ''
    },
    goods: {
      description: '',
      quantity: '',
      value: '',
      origin: '',
      destination: ''
    },
    description: '',
    priority: 'MEDIUM',
    assignedOfficer: state.user?.username || '',
    witnesses: [''],
    documents: [''],
    evidence: ['']
  });

  const violationTypes = [
    'Kontrabandë',
    'Gabim deklarimi',
    'Dokumenta të falsifikuara',
    'Mosdeklarim',
    'Shkelje procedurale',
    'Transportim ilegal',
    'Dokumenta të skaduara'
  ];

  const violationSubtypes: Record<string, string[]> = {
    'Kontrabandë': ['Mallra të ndaluara', 'Mallra pa licencë', 'Shmangje doganore'],
    'Gabim deklarimi': ['Gabim në vlerë', 'Gabim në sasi', 'Gabim në klasifikim'],
    'Dokumenta të falsifikuara': ['Fatura të falsifikuara', 'Certifikata të falsifikuara', 'Pasaporta të falsifikuara'],
    'Mosdeklarim': ['Mallra të fshehura', 'Deklarim i paplotë', 'Mosdeklarim total'],
    'Shkelje procedurale': ['Procedura e gabuar', 'Autorizime të humbura', 'Afate të skaduara'],
    'Transportim ilegal': ['Pa dokumente', 'Rrugë e ndaluar', 'Kohë e ndaluar'],
    'Dokumenta të skaduara': ['Licenca e skaduar', 'Sigurim i skaduar', 'Regjistrimi i skaduar']
  };

  const handleInputChange = (section: keyof ViolationFormData, field: string, value: string | number | boolean | Date) => {
    setFormData(prev => ({
      ...prev,
      [section]: typeof prev[section] === 'object' && !Array.isArray(prev[section])
        ? { ...prev[section], [field]: value }
        : value
    }));
  };

  // Array change handlers (not currently used in UI but kept for future use)
  /*
  const handleArrayChange = (arrayName: 'witnesses' | 'documents' | 'evidence', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (arrayName: 'witnesses' | 'documents' | 'evidence') => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: [...prev[arrayName], '']
    }));
  };

  const removeArrayItem = (arrayName: 'witnesses' | 'documents' | 'evidence', index: number) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index)
    }));
  };
  */

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating violation with data:', formData);
    alert('Rasti i kundervajtjes u krijua me sukses!');
  };

  const renderStep1 = () => (
    <div>
      <h3 style={{ margin: '0 0 16px 0', fontSize: '14px' }}>1. Informata Themelore</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
        <div className="classic-form-row">
          <label className="classic-label">📋 Numri i Rastit:</label>
          <input
            type="text"
            className="classic-textbox"
            value={formData.caseNumber}
            onChange={(e) => handleInputChange('caseNumber', '', e.target.value)}
            style={{ fontSize: '11px' }}
          />
        </div>

        <div className="classic-form-row">
          <label className="classic-label">⚠️ Lloji i Kundervajtjes:</label>
          <select
            className="classic-dropdown"
            value={formData.violationType}
            onChange={(e) => {
              handleInputChange('violationType', '', e.target.value);
              handleInputChange('violationSubtype', '', '');
            }}
            style={{ fontSize: '11px' }}
          >
            <option value="">Përzgjidh llojin...</option>
            {violationTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="classic-form-row">
          <label className="classic-label">🔍 Nënlloji:</label>
          <select
            className="classic-dropdown"
            value={formData.violationSubtype}
            onChange={(e) => handleInputChange('violationSubtype', '', e.target.value)}
            disabled={!formData.violationType}
            style={{ fontSize: '11px' }}
          >
            <option value="">Përzgjidh nënllojin...</option>
            {formData.violationType && violationSubtypes[formData.violationType]?.map(subtype => (
              <option key={subtype} value={subtype}>{subtype}</option>
            ))}
          </select>
        </div>

        <div className="classic-form-row">
          <label className="classic-label">🚨 Prioriteti:</label>
          <select
            className="classic-dropdown"
            value={formData.priority}
            onChange={(e) => handleInputChange('priority', '', e.target.value as 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL')}
            style={{ fontSize: '11px' }}
          >
            <option value="LOW">I ulët</option>
            <option value="MEDIUM">Mesatar</option>
            <option value="HIGH">I lartë</option>
            <option value="URGENT">Urgjent</option>
          </select>
        </div>

        <div className="classic-form-row">
          <label className="classic-label">👤 Oficeri Përgjegjës:</label>
          <input
            type="text"
            className="classic-textbox"
            value={formData.assignedOfficer}
            onChange={(e) => handleInputChange('assignedOfficer', '', e.target.value)}
            style={{ fontSize: '11px' }}
          />
        </div>
      </div>

      <div className="classic-form-row" style={{ marginTop: '16px' }}>
        <label className="classic-label">📝 Përshkrimi i Përgjithshëm:</label>
        <textarea
          className="classic-textbox"
          value={formData.description}
          onChange={(e) => handleInputChange('description', '', e.target.value)}
          rows={4}
          style={{ fontSize: '11px', resize: 'vertical' }}
          placeholder="Përshkruani detajet e kundervajtjes..."
        />
      </div>
    </div>
  );

  const totalSteps = 4;

  return (
    <div className="classic-window" style={{ margin: '20px', maxWidth: '100%' }}>
      <div className="classic-window-header">
        ➕ Krijimi i Rastit të Kundervajtjes - Hapi {currentStep} nga {totalSteps}
      </div>

      <div className="classic-window-content">
        {/* Progress Bar */}
        <div style={{ 
          marginBottom: '24px', 
          background: '#f0f0f0', 
          border: '1px inset #c0c0c0', 
          padding: '12px' 
        }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: '6px',
                  background: i < currentStep ? '#007bff' : '#e0e0e0',
                  border: '1px inset #c0c0c0'
                }}
              />
            ))}
          </div>
          <div style={{ fontSize: '11px', color: '#666' }}>
            Progresi: {Math.round((currentStep / totalSteps) * 100)}% i kompletuar
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step Content */}
          <div style={{ marginBottom: '24px' }}>
            {currentStep === 1 && renderStep1()}
          </div>

          {/* Navigation Buttons */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            borderTop: '1px solid #c0c0c0',
            paddingTop: '16px'
          }}>
            <button
              type="button"
              className="classic-button"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              style={{ fontSize: '11px' }}
            >
              ⬅️ Mbrapa
            </button>

            <div style={{ fontSize: '11px', color: '#666' }}>
              Hapi {currentStep} nga {totalSteps}
            </div>

            {currentStep < totalSteps ? (
              <button
                type="button"
                className="classic-button classic-button-primary"
                onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
                style={{ fontSize: '11px' }}
              >
                Përpara ➡️
              </button>
            ) : (
              <button
                type="submit"
                className="classic-button classic-button-primary"
                style={{ fontSize: '11px' }}
              >
                ✅ Krijo Rastin
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViolationCreateForm;
