import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';

interface CaseFormData {
  caseNumber: string;
  violationType: string;
  priority: string;
  status: string;
  title: string;
  description: string;
  personInfo: {
    name: string;
    personalNumber: string;
    address: string;
    phone: string;
    email: string;
  };
  companyInfo: {
    name: string;
    registrationNumber: string;
    address: string;
    phone: string;
    email: string;
    representative: string;
  };
  incidentDetails: {
    date: string;
    time: string;
    location: string;
    description: string;
    customsOffice: string;
    officer: string;
  };
  documents: Array<{
    name: string;
    type: string;
    size: string;
  }>;
}

const CaseCreate: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<CaseFormData>({
    caseNumber: '',
    violationType: 'Mandatore',
    priority: 'Medium',
    status: 'Hapur',
    title: '',
    description: '',
    personInfo: {
      name: '',
      personalNumber: '',
      address: '',
      phone: '',
      email: '',
    },
    companyInfo: {
      name: '',
      registrationNumber: '',
      address: '',
      phone: '',
      email: '',
      representative: '',
    },
    incidentDetails: {
      date: '',
      time: '',
      location: '',
      description: '',
      customsOffice: '',
      officer: '',
    },
    documents: [],
  });

  const steps = [
    'Informacionet Bazë',
    'Personin/Kompaninë',
    'Detajet e Incidentit',
    'Dokumentet dhe Konfirmimi'
  ];

  const violationTypes = [
    'Mandatore',
    'Penale',
    'Administrative',
    'Kontrabandë',
    'Taksë e Papaguar'
  ];

  const priorities = ['Low', 'Medium', 'High', 'Urgent'];
  const statuses = ['Hapur', 'Në Proces', 'Mbyllur', 'Pezulluar'];

  const customsOffices = [
    'Dogana Tiranë',
    'Dogana Durrës',
    'Dogana Vlorë',
    'Dogana Shkodër',
    'Dogana Korçë'
  ];

  const handleInputChange = (section: string, field: string, value: string) => {
    if (section === 'root') {
      setFormData(prev => ({ ...prev, [field]: value }));
    } else {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section as keyof typeof prev] as any,
          [field]: value
        }
      }));
    }
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    const caseId = `CASE_${Date.now()}`;
    console.log('Creating case:', { ...formData, id: caseId });
    alert(`Rasti u krijua me sukses!\nID: ${caseId}\nTitulli: ${formData.title}`);
    navigate('/cases');
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <div className="classic-window-content">
            <div className="classic-form-row">
              <label className="classic-label">Numri i Rastit:</label>
              <input
                type="text"
                className="classic-textbox"
                value={formData.caseNumber}
                onChange={(e) => handleInputChange('root', 'caseNumber', e.target.value)}
                placeholder="Do të gjeneronët automatikisht nëse lihet bosh"
              />
            </div>

            <div className="classic-form-row">
              <label className="classic-label">Lloji i Kundërvajtjes:</label>
              <select
                className="classic-combobox"
                value={formData.violationType}
                onChange={(e) => handleInputChange('root', 'violationType', e.target.value)}
              >
                {violationTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div className="classic-form-row" style={{ flex: 1 }}>
                <label className="classic-label">Prioriteti:</label>
                <select
                  className="classic-combobox"
                  value={formData.priority}
                  onChange={(e) => handleInputChange('root', 'priority', e.target.value)}
                >
                  {priorities.map(priority => (
                    <option key={priority} value={priority}>{priority}</option>
                  ))}
                </select>
              </div>

              <div className="classic-form-row" style={{ flex: 1 }}>
                <label className="classic-label">Statusi:</label>
                <select
                  className="classic-combobox"
                  value={formData.status}
                  onChange={(e) => handleInputChange('root', 'status', e.target.value)}
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="classic-form-row">
              <label className="classic-label">Titulli i Rastit:</label>
              <input
                type="text"
                className="classic-textbox"
                value={formData.title}
                onChange={(e) => handleInputChange('root', 'title', e.target.value)}
                placeholder="Shkruani një titull të shkurtër për rastin"
                required
              />
            </div>

            <div className="classic-form-row">
              <label className="classic-label">Përshkrimi:</label>
              <textarea
                className="classic-textarea"
                value={formData.description}
                onChange={(e) => handleInputChange('root', 'description', e.target.value)}
                placeholder="Përshkrimi i detajuar i rastit..."
                rows={6}
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="classic-window-content">
            <div className="classic-window" style={{ marginBottom: '16px' }}>
              <div className="classic-window-header">
                👤 Informacionet e Personit
              </div>
              <div className="classic-window-content">
                <div className="classic-form-row">
                  <label className="classic-label">Emri i Plotë:</label>
                  <input
                    type="text"
                    className="classic-textbox"
                    value={formData.personInfo.name}
                    onChange={(e) => handleInputChange('personInfo', 'name', e.target.value)}
                    placeholder="Emri dhe mbiemri"
                  />
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <div className="classic-form-row" style={{ flex: 1 }}>
                    <label className="classic-label">Numri Personal:</label>
                    <input
                      type="text"
                      className="classic-textbox"
                      value={formData.personInfo.personalNumber}
                      onChange={(e) => handleInputChange('personInfo', 'personalNumber', e.target.value)}
                      placeholder="NXXXXXXXXXXXXL"
                    />
                  </div>

                  <div className="classic-form-row" style={{ flex: 1 }}>
                    <label className="classic-label">Telefoni:</label>
                    <input
                      type="text"
                      className="classic-textbox"
                      value={formData.personInfo.phone}
                      onChange={(e) => handleInputChange('personInfo', 'phone', e.target.value)}
                      placeholder="+355 XX XXX XXX"
                    />
                  </div>
                </div>

                <div className="classic-form-row">
                  <label className="classic-label">Adresa:</label>
                  <input
                    type="text"
                    className="classic-textbox"
                    value={formData.personInfo.address}
                    onChange={(e) => handleInputChange('personInfo', 'address', e.target.value)}
                    placeholder="Adresa e plotë"
                  />
                </div>

                <div className="classic-form-row">
                  <label className="classic-label">Email:</label>
                  <input
                    type="email"
                    className="classic-textbox"
                    value={formData.personInfo.email}
                    onChange={(e) => handleInputChange('personInfo', 'email', e.target.value)}
                    placeholder="email@example.com"
                  />
                </div>
              </div>
            </div>

            <div className="classic-window">
              <div className="classic-window-header">
                🏢 Informacionet e Kompanisë (Opsionale)
              </div>
              <div className="classic-window-content">
                <div className="classic-form-row">
                  <label className="classic-label">Emri i Kompanisë:</label>
                  <input
                    type="text"
                    className="classic-textbox"
                    value={formData.companyInfo.name}
                    onChange={(e) => handleInputChange('companyInfo', 'name', e.target.value)}
                    placeholder="Emri i kompanisë"
                  />
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <div className="classic-form-row" style={{ flex: 1 }}>
                    <label className="classic-label">Numri i Regjistrimit:</label>
                    <input
                      type="text"
                      className="classic-textbox"
                      value={formData.companyInfo.registrationNumber}
                      onChange={(e) => handleInputChange('companyInfo', 'registrationNumber', e.target.value)}
                      placeholder="NUIS"
                    />
                  </div>

                  <div className="classic-form-row" style={{ flex: 1 }}>
                    <label className="classic-label">Telefoni:</label>
                    <input
                      type="text"
                      className="classic-textbox"
                      value={formData.companyInfo.phone}
                      onChange={(e) => handleInputChange('companyInfo', 'phone', e.target.value)}
                      placeholder="+355 XX XXX XXX"
                    />
                  </div>
                </div>

                <div className="classic-form-row">
                  <label className="classic-label">Adresa:</label>
                  <input
                    type="text"
                    className="classic-textbox"
                    value={formData.companyInfo.address}
                    onChange={(e) => handleInputChange('companyInfo', 'address', e.target.value)}
                    placeholder="Adresa e kompanisë"
                  />
                </div>

                <div className="classic-form-row">
                  <label className="classic-label">Përfaqësuesi:</label>
                  <input
                    type="text"
                    className="classic-textbox"
                    value={formData.companyInfo.representative}
                    onChange={(e) => handleInputChange('companyInfo', 'representative', e.target.value)}
                    placeholder="Emri i përfaqësuesit"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="classic-window-content">
            <div className="classic-form-row">
              <label className="classic-label">Data e Incidentit:</label>
              <input
                type="date"
                className="classic-textbox"
                value={formData.incidentDetails.date}
                onChange={(e) => handleInputChange('incidentDetails', 'date', e.target.value)}
                style={{ width: '200px' }}
              />
            </div>

            <div className="classic-form-row">
              <label className="classic-label">Ora e Incidentit:</label>
              <input
                type="time"
                className="classic-textbox"
                value={formData.incidentDetails.time}
                onChange={(e) => handleInputChange('incidentDetails', 'time', e.target.value)}
                style={{ width: '150px' }}
              />
            </div>

            <div className="classic-form-row">
              <label className="classic-label">Vendi i Incidentit:</label>
              <input
                type="text"
                className="classic-textbox"
                value={formData.incidentDetails.location}
                onChange={(e) => handleInputChange('incidentDetails', 'location', e.target.value)}
                placeholder="Lokacioni i saktë"
              />
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div className="classic-form-row" style={{ flex: 1 }}>
                <label className="classic-label">Zyra Doganore:</label>
                <select
                  className="classic-combobox"
                  value={formData.incidentDetails.customsOffice}
                  onChange={(e) => handleInputChange('incidentDetails', 'customsOffice', e.target.value)}
                >
                  <option value="">Zgjidhni zyrën...</option>
                  {customsOffices.map(office => (
                    <option key={office} value={office}>{office}</option>
                  ))}
                </select>
              </div>

              <div className="classic-form-row" style={{ flex: 1 }}>
                <label className="classic-label">Oficeri Përgjegjës:</label>
                <input
                  type="text"
                  className="classic-textbox"
                  value={formData.incidentDetails.officer}
                  onChange={(e) => handleInputChange('incidentDetails', 'officer', e.target.value)}
                  placeholder="Emri i officerit"
                />
              </div>
            </div>

            <div className="classic-form-row">
              <label className="classic-label">Përshkrimi i Incidentit:</label>
              <textarea
                className="classic-textarea"
                value={formData.incidentDetails.description}
                onChange={(e) => handleInputChange('incidentDetails', 'description', e.target.value)}
                placeholder="Përshkrimi i detajuar i incidentit dhe veprimeve të ndërmarra..."
                rows={8}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="classic-window-content">
            <div className="classic-window" style={{ marginBottom: '16px' }}>
              <div className="classic-window-header">
                📎 Ngarko Dokumentet
              </div>
              <div className="classic-window-content">
                <div className="classic-form-row">
                  <button className="classic-button">
                    📁 Zgjidh Dokumentet
                  </button>
                  <span style={{ marginLeft: '12px', fontSize: '12px', color: '#666' }}>
                    PDF, Word, Excel, Imazhe (max 10MB)
                  </span>
                </div>

                {formData.documents.length > 0 && (
                  <div style={{ marginTop: '12px' }}>
                    <table className="classic-table" style={{ width: '100%' }}>
                      <thead>
                        <tr>
                          <th>Emri i Dokumentit</th>
                          <th>Lloji</th>
                          <th>Madhësia</th>
                          <th>Veprime</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.documents.map((doc, index) => (
                          <tr key={index}>
                            <td>{doc.name}</td>
                            <td>{doc.type}</td>
                            <td>{doc.size}</td>
                            <td>
                              <button className="classic-button" style={{ fontSize: '10px', padding: '2px 6px' }}>
                                Hiq
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            <div className="classic-window">
              <div className="classic-window-header">
                ✅ Përmbledhja e Rastit
              </div>
              <div className="classic-window-content">
                <div style={{ fontSize: '12px', lineHeight: '1.6' }}>
                  <div style={{ marginBottom: '8px' }}>
                    <strong>Numri i Rastit:</strong> {formData.caseNumber || 'Do të gjenerojnët automatikisht'}
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <strong>Lloji:</strong> {formData.violationType}
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <strong>Prioriteti:</strong> {formData.priority}
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <strong>Titulli:</strong> {formData.title}
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <strong>Personi:</strong> {formData.personInfo.name}
                  </div>
                  {formData.companyInfo.name && (
                    <div style={{ marginBottom: '8px' }}>
                      <strong>Kompania:</strong> {formData.companyInfo.name}
                    </div>
                  )}
                  <div style={{ marginBottom: '8px' }}>
                    <strong>Data e Incidentit:</strong> {formData.incidentDetails.date}
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <strong>Dokumentet:</strong> {formData.documents.length} dokument(e)
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Hapi i panjohur</div>;
    }
  };

  return (
    <MainLayout>
      <div style={{ padding: '16px', backgroundColor: '#f0f0f0' }}>
        <div className="classic-window">
          <div className="classic-window-header">
            🔒 Krijoni Rast të Ri Kundërvajtje - {steps[activeStep]}
            <button 
              className="classic-button" 
              onClick={() => navigate('/cases')}
              style={{ marginLeft: 'auto', fontSize: '11px' }}
            >
              ❌ Anulo
            </button>
          </div>

          {/* Step Progress */}
          <div className="classic-window-content" style={{ padding: '8px 16px', borderBottom: '1px solid #808080' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {steps.map((step, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: index <= activeStep ? '#316ac5' : '#c0c0c0',
                      color: index <= activeStep ? 'white' : '#808080',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}
                  >
                    {index + 1}
                  </div>
                  <span style={{
                    marginLeft: '8px',
                    fontSize: '11px',
                    color: index <= activeStep ? '#000' : '#808080',
                    fontWeight: index === activeStep ? 'bold' : 'normal'
                  }}>
                    {step}
                  </span>
                  {index < steps.length - 1 && (
                    <div
                      style={{
                        flex: 1,
                        height: '2px',
                        backgroundColor: index < activeStep ? '#316ac5' : '#c0c0c0',
                        margin: '0 16px'
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="classic-window-content" style={{ padding: '16px', borderTop: '1px solid #808080' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button
                className="classic-button"
                onClick={handleBack}
                disabled={activeStep === 0}
                style={{ opacity: activeStep === 0 ? 0.5 : 1 }}
              >
                ⬅️ Mbrapa
              </button>

              <div style={{ display: 'flex', gap: '8px' }}>
                {activeStep === steps.length - 1 ? (
                  <button
                    className="classic-button"
                    onClick={handleSubmit}
                    style={{ backgroundColor: '#28a745', color: 'white', fontWeight: 'bold' }}
                  >
                    ✅ Krijo Rastin
                  </button>
                ) : (
                  <button
                    className="classic-button"
                    onClick={handleNext}
                  >
                    Përpara ➡️
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

export default CaseCreate;
