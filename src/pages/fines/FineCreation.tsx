import React, { useState } from 'react';
import { useAuth } from '../../contexts';
import '../../styles/classic-theme.css';

interface AdministrativeFine {
  id: string;
  violationId: string;
  subjectType: 'INDIVIDUAL' | 'COMPANY';
  subjectName: string;
  subjectIdentifier: string;
  violationType: string;
  fineAmount: number;
  currency: 'EUR' | 'USD' | 'ALL';
  description: string;
  legalBasis: string;
  issuedBy: string;
  issuedDate: string;
  dueDate: string;
  status: 'ISSUED' | 'PAID' | 'OVERDUE' | 'CANCELLED' | 'APPEALED';
  paymentMethod?: string;
  paymentDate?: string;
  appealDate?: string;
  appealReason?: string;
  notes: string;
}

const FineCreation: React.FC = () => {
  const { state } = useAuth();
  const [fine, setFine] = useState<Partial<AdministrativeFine>>({
    violationId: '',
    subjectType: 'INDIVIDUAL',
    subjectName: '',
    subjectIdentifier: '',
    violationType: '',
    fineAmount: 0,
    currency: 'EUR',
    description: '',
    legalBasis: '',
    issuedBy: state.user?.fullName || 'Current Officer',
    issuedDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    status: 'ISSUED',
    notes: ''
  });

  const violationTypes = [
    { value: 'CONTRABAND', label: 'Kontrabandë / Contraband', code: 'KV-273', baseAmount: 5000 },
    { value: 'FALSE_DECLARATION', label: 'Deklarim i Rremë / False Declaration', code: 'KV-274', baseAmount: 2000 },
    { value: 'DUTY_EVASION', label: 'Shmangje Takse / Duty Evasion', code: 'KV-275', baseAmount: 3000 },
    { value: 'PROHIBITED_GOODS', label: 'Mallra të Ndaluara / Prohibited Goods', code: 'KV-276', baseAmount: 8000 },
    { value: 'DOCUMENTATION_MISSING', label: 'Dokumente të Mangëta / Missing Documentation', code: 'KV-277', baseAmount: 500 },
    { value: 'MISCLASSIFICATION', label: 'Klasifikim i Gabuar / Misclassification', code: 'KV-278', baseAmount: 1000 },
    { value: 'UNDERVALUATION', label: 'Nënvlerësim / Undervaluation', code: 'KV-279', baseAmount: 1500 }
  ];

  const legalBases = [
    'Neni 273, Kodi Doganor i Republikës së Shqipërisë',
    'Neni 274, Kodi Doganor i Republikës së Shqipërisë', 
    'Neni 275, Kodi Doganor i Republikës së Shqipërisë',
    'Neni 276, Kodi Doganor i Republikës së Shqipërisë',
    'Neni 277, Kodi Doganor i Republikës së Shqipërisë',
    'Neni 278, Kodi Doganor i Republikës së Shqipërisë',
    'Neni 279, Kodi Doganor i Republikës së Shqipërisë',
    'Vendim i KM Nr. 508/2015 për Procedurat Doganore',
    'Udhëzim Nr. 12/2018 për Gjobat Administrative në Dogana'
  ];

  const officers = [
    'Agron Berisha - Oficer Hetues',
    'Blerta Krasniqi - Supervizore Doganore',
    'Driton Osmani - Oficer Kufitar',
    'Fatmira Hoxha - Analizuese e Riskut',
    'Gezim Mustafa - Oficer i Sigurisë',
    'Hajrije Salihu - Koordinatore Operacionale',
    'Ilir Zeqiri - Oficer Operacional',
    'Jeta Rama - Specialiste Juridike'
  ];

  const handleViolationTypeChange = (violationType: string) => {
    const selectedViolation = violationTypes.find(vt => vt.value === violationType);
    if (selectedViolation) {
      setFine({
        ...fine,
        violationType,
        fineAmount: selectedViolation.baseAmount,
        legalBasis: selectedViolation.code.startsWith('KV-') ? 
          legalBases.find(lb => lb.includes(selectedViolation.code.replace('KV-', 'Neni '))) || legalBases[0]
          : legalBases[0]
      });
    }
  };

  const calculateDueDate = () => {
    const issuedDate = new Date(fine.issuedDate || new Date());
    const dueDate = new Date(issuedDate);
    dueDate.setDate(dueDate.getDate() + 30); // 30 days to pay
    return dueDate.toISOString().split('T')[0];
  };

  const handleSubmit = () => {
    // Auto-calculate due date if not set
    const finalFine = {
      ...fine,
      id: `AF-${Date.now()}`,
      dueDate: fine.dueDate || calculateDueDate()
    };
    
    console.log('Creating administrative fine:', finalFine);
    alert('Gjoba administrative u krijua me sukses! / Administrative fine created successfully!');
  };

  const handleClear = () => {
    setFine({
      violationId: '',
      subjectType: 'INDIVIDUAL',
      subjectName: '',
      subjectIdentifier: '',
      violationType: '',
      fineAmount: 0,
      currency: 'EUR',
      description: '',
      legalBasis: '',
      issuedBy: state.user?.fullName || 'Current Officer',
      issuedDate: new Date().toISOString().split('T')[0],
      dueDate: '',
      status: 'ISSUED',
      notes: ''
    });
  };

  const handleUseCalculationEngine = () => {
    // Navigate to calculation engine
    alert('Duke ju drejtuar në Motorin e Llogaritjes së Gjobave...');
  };

  return (
    <div className="classic-window" style={{ margin: '20px', maxWidth: '100%' }}>
      <div className="classic-window-header">
        💶 Krijimi i Gjobës Administrative - Administrative Fine Creation
      </div>

      <div className="classic-window-content">
        {/* Header Controls */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '16px',
          padding: '12px',
          background: '#f0f0f0',
          border: '1px inset #c0c0c0'
        }}>
          <div style={{ fontSize: '12px', fontWeight: 'bold' }}>
            💶 Sistemi për Krijimin dhe Lëshimin e Gjobave Administrative
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              className="classic-button"
              onClick={handleUseCalculationEngine}
              style={{ fontSize: '11px' }}
            >
              🧮 Motori i Llogaritjes
            </button>
            <button className="classic-button" style={{ fontSize: '11px' }}>
              📋 Shabllonet
            </button>
            <button className="classic-button" style={{ fontSize: '11px' }}>
              📊 Historiku
            </button>
          </div>
        </div>

        {/* Subject Information Section */}
        <div style={{ 
          background: '#f8f8f8', 
          border: '1px inset #c0c0c0', 
          padding: '16px', 
          marginBottom: '16px' 
        }}>
          <h4 style={{ margin: '0 0 16px 0', fontSize: '12px' }}>👤 Informata mbi Subjektin:</h4>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '16px',
            marginBottom: '16px'
          }}>
            <div className="classic-form-row">
              <label className="classic-label" style={{ fontSize: '11px' }}>Lloji i subjektit:</label>
              <select
                className="classic-dropdown"
                value={fine.subjectType}
                onChange={(e) => setFine({...fine, subjectType: e.target.value as 'INDIVIDUAL' | 'COMPANY'})}
                style={{ fontSize: '11px' }}
              >
                <option value="INDIVIDUAL">Person Fizik / Individual</option>
                <option value="COMPANY">Person Juridik / Company</option>
              </select>
            </div>

            <div className="classic-form-row">
              <label className="classic-label" style={{ fontSize: '11px' }}>
                {fine.subjectType === 'INDIVIDUAL' ? 'Emri i plotë:' : 'Emri i kompanisë:'}
              </label>
              <input
                type="text"
                className="classic-textbox"
                value={fine.subjectName}
                onChange={(e) => setFine({...fine, subjectName: e.target.value})}
                placeholder={fine.subjectType === 'INDIVIDUAL' ? 'Agron Krasniqi' : 'ABC Company Ltd.'}
                style={{ fontSize: '11px' }}
              />
            </div>

            <div className="classic-form-row">
              <label className="classic-label" style={{ fontSize: '11px' }}>
                {fine.subjectType === 'INDIVIDUAL' ? 'Numri personal:' : 'Numri i regjistrimit:'}
              </label>
              <input
                type="text"
                className="classic-textbox"
                value={fine.subjectIdentifier}
                onChange={(e) => setFine({...fine, subjectIdentifier: e.target.value})}
                placeholder={fine.subjectType === 'INDIVIDUAL' ? '1234567890' : '811234567'}
                style={{ fontSize: '11px' }}
              />
            </div>
          </div>
        </div>

        {/* Violation Information Section */}
        <div style={{ 
          background: '#f8f8f8', 
          border: '1px inset #c0c0c0', 
          padding: '16px', 
          marginBottom: '16px' 
        }}>
          <h4 style={{ margin: '0 0 16px 0', fontSize: '12px' }}>⚖️ Informata mbi Kundërvajtjen:</h4>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '16px',
            marginBottom: '16px'
          }}>
            <div className="classic-form-row">
              <label className="classic-label" style={{ fontSize: '11px' }}>ID i kundërvajtjes:</label>
              <input
                type="text"
                className="classic-textbox"
                value={fine.violationId}
                onChange={(e) => setFine({...fine, violationId: e.target.value})}
                placeholder="KV-2024-001"
                style={{ fontSize: '11px' }}
              />
            </div>

            <div className="classic-form-row">
              <label className="classic-label" style={{ fontSize: '11px' }}>Lloji i kundërvajtjes:</label>
              <select
                className="classic-dropdown"
                value={fine.violationType}
                onChange={(e) => handleViolationTypeChange(e.target.value)}
                style={{ fontSize: '11px' }}
              >
                <option value="">-- Zgjidhni llojin e kundërvajtjes --</option>
                {violationTypes.map(vt => (
                  <option key={vt.value} value={vt.value}>
                    {vt.code} - {vt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="classic-form-row">
              <label className="classic-label" style={{ fontSize: '11px' }}>Baza ligjore:</label>
              <select
                className="classic-dropdown"
                value={fine.legalBasis}
                onChange={(e) => setFine({...fine, legalBasis: e.target.value})}
                style={{ fontSize: '11px' }}
              >
                <option value="">-- Zgjidhni bazën ligjore --</option>
                {legalBases.map((lb, index) => (
                  <option key={index} value={lb}>{lb}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="classic-form-row" style={{ marginBottom: '16px' }}>
            <label className="classic-label" style={{ fontSize: '11px' }}>Përshkrimi i kundërvajtjes:</label>
            <textarea
              className="classic-textbox"
              value={fine.description}
              onChange={(e) => setFine({...fine, description: e.target.value})}
              placeholder="Përshkruani detajisht kundërvajtjen e kryer..."
              rows={4}
              style={{ fontSize: '11px', width: '100%', resize: 'vertical' }}
            />
          </div>
        </div>

        {/* Fine Amount Section */}
        <div style={{ 
          background: '#e8f4fd', 
          border: '2px solid #003d82', 
          padding: '16px', 
          marginBottom: '16px' 
        }}>
          <h4 style={{ margin: '0 0 16px 0', fontSize: '12px', color: '#003d82' }}>💰 Informata mbi Gjobën:</h4>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '16px',
            marginBottom: '16px'
          }}>
            <div className="classic-form-row">
              <label className="classic-label" style={{ fontSize: '11px' }}>Vlera e gjobës:</label>
              <input
                type="number"
                className="classic-textbox"
                value={fine.fineAmount}
                onChange={(e) => setFine({...fine, fineAmount: parseFloat(e.target.value) || 0})}
                placeholder="0.00"
                step="0.01"
                min="0"
                style={{ fontSize: '11px' }}
              />
            </div>

            <div className="classic-form-row">
              <label className="classic-label" style={{ fontSize: '11px' }}>Monedha:</label>
              <select
                className="classic-dropdown"
                value={fine.currency}
                onChange={(e) => setFine({...fine, currency: e.target.value as 'EUR' | 'USD' | 'ALL'})}
                style={{ fontSize: '11px' }}
              >
                <option value="EUR">EUR - Euro</option>
                <option value="USD">USD - Dollarë amerikanë</option>
                <option value="ALL">ALL - Lekë shqiptare</option>
              </select>
            </div>

            <div className="classic-form-row">
              <label className="classic-label" style={{ fontSize: '11px' }}>Data e lëshimit:</label>
              <input
                type="date"
                className="classic-textbox"
                value={fine.issuedDate}
                onChange={(e) => setFine({...fine, issuedDate: e.target.value})}
                style={{ fontSize: '11px' }}
              />
            </div>

            <div className="classic-form-row">
              <label className="classic-label" style={{ fontSize: '11px' }}>Afati i pagesës:</label>
              <input
                type="date"
                className="classic-textbox"
                value={fine.dueDate}
                onChange={(e) => setFine({...fine, dueDate: e.target.value})}
                placeholder={calculateDueDate()}
                style={{ fontSize: '11px' }}
              />
            </div>
          </div>

          <div style={{ 
            background: 'white', 
            padding: '12px', 
            border: '1px inset #c0c0c0',
            textAlign: 'center',
            fontSize: '14px'
          }}>
            <strong>VLERA TOTALE E GJOBËS: {fine.fineAmount?.toLocaleString()} {fine.currency}</strong>
          </div>
        </div>

        {/* Administrative Information Section */}
        <div style={{ 
          background: '#f8f8f8', 
          border: '1px inset #c0c0c0', 
          padding: '16px', 
          marginBottom: '16px' 
        }}>
          <h4 style={{ margin: '0 0 16px 0', fontSize: '12px' }}>📋 Informata Administrative:</h4>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '16px',
            marginBottom: '16px'
          }}>
            <div className="classic-form-row">
              <label className="classic-label" style={{ fontSize: '11px' }}>Lëshuar nga:</label>
              <select
                className="classic-dropdown"
                value={fine.issuedBy}
                onChange={(e) => setFine({...fine, issuedBy: e.target.value})}
                style={{ fontSize: '11px' }}
              >
                <option value={state.user?.fullName || 'Current Officer'}>
                  {state.user?.fullName} (Ti)
                </option>
                {officers.filter(o => o !== state.user?.fullName).map((officer, index) => (
                  <option key={index} value={officer}>{officer}</option>
                ))}
              </select>
            </div>

            <div className="classic-form-row">
              <label className="classic-label" style={{ fontSize: '11px' }}>Statusi:</label>
              <select
                className="classic-dropdown"
                value={fine.status}
                onChange={(e) => setFine({...fine, status: e.target.value as AdministrativeFine['status']})}
                style={{ fontSize: '11px' }}
              >
                <option value="ISSUED">E lëshuar / Issued</option>
                <option value="PAID">E paguar / Paid</option>
                <option value="OVERDUE">E vonuar / Overdue</option>
                <option value="CANCELLED">E anuluar / Cancelled</option>
                <option value="APPEALED">Në apel / Appealed</option>
              </select>
            </div>
          </div>

          <div className="classic-form-row">
            <label className="classic-label" style={{ fontSize: '11px' }}>Shënime shtesë:</label>
            <textarea
              className="classic-textbox"
              value={fine.notes}
              onChange={(e) => setFine({...fine, notes: e.target.value})}
              placeholder="Shënime shtesë për gjobën..."
              rows={3}
              style={{ fontSize: '11px', width: '100%', resize: 'vertical' }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          gap: '8px',
          padding: '16px',
          background: '#f0f0f0',
          border: '1px inset #c0c0c0'
        }}>
          <button 
            className="classic-button"
            onClick={handleClear}
            style={{ fontSize: '11px' }}
          >
            🗑️ Pastro Formën
          </button>
          <button 
            className="classic-button"
            onClick={() => window.print()}
            style={{ fontSize: '11px' }}
          >
            👁️ Parashiko
          </button>
          <button 
            className="classic-button classic-button-primary"
            onClick={handleSubmit}
            style={{ fontSize: '11px' }}
          >
            💾 Krijo Gjobën
          </button>
        </div>
      </div>
    </div>
  );
};

export default FineCreation;
