import React, { useState } from 'react';
import { Box, Typography, TextField, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { ClassicButton } from '../../components/common/ClassicButton';
import { ClassicCard } from '../../components/common/ClassicCard';
import '../../styles/classic-theme.css';

interface AdministrativeFine {
  id: string;
  violationId: string;
  subjectType: 'INDIVIDUAL' | 'COMPANY';
  subjectName: string;
  subjectIdentifier: string; // Personal ID or Company Registration
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
    issuedBy: 'Current Officer',
    issuedDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    status: 'ISSUED',
    notes: ''
  });

  const violationTypes = [
    { value: 'CONTRABAND', label: 'Kontrabandë / Contraband', baseAmount: 5000 },
    { value: 'DOCUMENTATION_MISSING', label: 'Dokumente të Mangëta / Missing Documentation', baseAmount: 500 },
    { value: 'FALSE_DECLARATION', label: 'Deklarim i Rremë / False Declaration', baseAmount: 2000 },
    { value: 'DUTY_EVASION', label: 'Shmangje Takse / Duty Evasion', baseAmount: 3000 },
    { value: 'PROHIBITED_GOODS', label: 'Mallra të Ndaluara / Prohibited Goods', baseAmount: 8000 },
    { value: 'INCORRECT_CLASSIFICATION', label: 'Klasifikim i Gabuar / Incorrect Classification', baseAmount: 1000 },
    { value: 'UNDERVALUATION', label: 'Nënvlerësim / Undervaluation', baseAmount: 1500 },
    { value: 'UNAUTHORIZED_TRANSPORT', label: 'Transport i Paautorizuar / Unauthorized Transport', baseAmount: 2500 },
    { value: 'REGULATION_VIOLATION', label: 'Shkelje Rregulloreje / Regulation Violation', baseAmount: 800 },
    { value: 'PROCEDURE_VIOLATION', label: 'Shkelje Procedure / Procedure Violation', baseAmount: 600 }
  ];

  const legalBases = [
    'Ligji Nr. 102/2014 për Kodin Doganor të Republikës së Shqipërisë',
    'Vendim i KM Nr. 508/2015 për Procedurat Doganore',
    'Udhëzim Nr. 12/2018 për Gjobat Administrative në Dogana',
    'Rregullore BE Nr. 952/2013 (Kodi Doganor i Bashkimit)',
    'Ligji Nr. 61/2012 për Pjesëmarrjen e Shqipërisë në Treg të Përbashkët',
    'Vendim i KM Nr. 875/2016 për Mallrat e Ndaluara',
    'Udhëzim Nr. 8/2019 për Vlerësimin Doganor',
    'Ligji Nr. 9920/2008 për Procedurat Tatimore'
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
    setFine({
      ...fine,
      violationType,
      fineAmount: selectedViolation?.baseAmount || 0
    });
  };

  const calculateDueDate = () => {
    const issuedDate = new Date(fine.issuedDate || new Date());
    const dueDate = new Date(issuedDate);
    dueDate.setDate(dueDate.getDate() + 30); // 30 days to pay
    return dueDate.toISOString().split('T')[0];
  };

  const handleSubmit = () => {
    // Auto-calculate due date if not set
    if (!fine.dueDate) {
      setFine({
        ...fine,
        dueDate: calculateDueDate()
      });
    }
    
    console.log('Creating administrative fine:', fine);
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
      issuedBy: 'Current Officer',
      issuedDate: new Date().toISOString().split('T')[0],
      dueDate: '',
      status: 'ISSUED',
      notes: ''
    });
  };

  return (
    <Box className="classic-container">
      <div className="classic-header">
        <Typography variant="h4" className="classic-title">
          💶 Krijimi i Gjobës Administrative
        </Typography>
        <Typography variant="subtitle1" className="classic-subtitle">
          Sistemi për krijimin dhe lëshimin e gjobave administrative për shkelje doganore
        </Typography>
      </div>

      <ClassicCard>
        <div className="classic-form-grid">
          {/* Violation Information */}
          <div className="classic-form-section">
            <Typography variant="h6" className="classic-section-title">
              📋 Informacioni i Shkeljës
            </Typography>
          </div>

          <div className="classic-form-row">
            <div className="classic-form-field">
              <TextField
                fullWidth
                label="ID e Kundërvajtjes / Violation ID"
                value={fine.violationId}
                onChange={(e) => setFine({...fine, violationId: e.target.value})}
                className="classic-textfield"
                variant="outlined"
                required
              />
            </div>

            <div className="classic-form-field">
              <FormControl fullWidth className="classic-form-control">
                <InputLabel>Lloji i Shkeljës / Violation Type</InputLabel>
                <Select
                  value={fine.violationType}
                  onChange={(e) => handleViolationTypeChange(e.target.value)}
                  className="classic-select"
                >
                  {violationTypes.map(type => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label} - {type.baseAmount} EUR
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>

          {/* Subject Information */}
          <div className="classic-form-section">
            <Typography variant="h6" className="classic-section-title">
              👤 Informacioni i Subjektit
            </Typography>
          </div>

          <div className="classic-form-row">
            <div className="classic-form-field">
              <FormControl fullWidth className="classic-form-control">
                <InputLabel>Lloji i Subjektit / Subject Type</InputLabel>
                <Select
                  value={fine.subjectType}
                  onChange={(e) => setFine({...fine, subjectType: e.target.value as 'INDIVIDUAL' | 'COMPANY'})}
                  className="classic-select"
                >
                  <MenuItem value="INDIVIDUAL">👤 Person Fizik / Individual</MenuItem>
                  <MenuItem value="COMPANY">🏢 Kompani / Company</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="classic-form-field">
              <TextField
                fullWidth
                label={fine.subjectType === 'INDIVIDUAL' ? 'Emri i Plotë / Full Name' : 'Emri i Kompanisë / Company Name'}
                value={fine.subjectName}
                onChange={(e) => setFine({...fine, subjectName: e.target.value})}
                className="classic-textfield"
                variant="outlined"
                required
              />
            </div>

            <div className="classic-form-field">
              <TextField
                fullWidth
                label={fine.subjectType === 'INDIVIDUAL' ? 'Nr. Identitetit / ID Number' : 'Nr. Regjistrit / Registration Number'}
                value={fine.subjectIdentifier}
                onChange={(e) => setFine({...fine, subjectIdentifier: e.target.value})}
                className="classic-textfield"
                variant="outlined"
                required
              />
            </div>
          </div>

          {/* Fine Details */}
          <div className="classic-form-section">
            <Typography variant="h6" className="classic-section-title">
              💰 Detajet e Gjobës
            </Typography>
          </div>

          <div className="classic-form-row">
            <div className="classic-form-field">
              <TextField
                fullWidth
                label="Shuma e Gjobës / Fine Amount"
                type="number"
                value={fine.fineAmount}
                onChange={(e) => setFine({...fine, fineAmount: Number(e.target.value)})}
                className="classic-textfield"
                variant="outlined"
                inputProps={{ min: 0, step: 50 }}
              />
            </div>

            <div className="classic-form-field">
              <FormControl fullWidth className="classic-form-control">
                <InputLabel>Monedha / Currency</InputLabel>
                <Select
                  value={fine.currency}
                  onChange={(e) => setFine({...fine, currency: e.target.value as 'EUR' | 'USD' | 'ALL'})}
                  className="classic-select"
                >
                  <MenuItem value="EUR">💶 Euro (EUR)</MenuItem>
                  <MenuItem value="USD">💵 Dollar (USD)</MenuItem>
                  <MenuItem value="ALL">🏦 Lek (ALL)</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="classic-form-field">
              <FormControl fullWidth className="classic-form-control">
                <InputLabel>Statusi / Status</InputLabel>
                <Select
                  value={fine.status}
                  onChange={(e) => setFine({...fine, status: e.target.value as AdministrativeFine['status']})}
                  className="classic-select"
                >
                  <MenuItem value="ISSUED">📄 E Lëshuar / Issued</MenuItem>
                  <MenuItem value="PAID">✅ E Paguar / Paid</MenuItem>
                  <MenuItem value="OVERDUE">⏰ E Vonuar / Overdue</MenuItem>
                  <MenuItem value="CANCELLED">❌ E Anuluar / Cancelled</MenuItem>
                  <MenuItem value="APPEALED">⚖️ E Ankimuar / Appealed</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="classic-form-row">
            <div className="classic-form-field-full">
              <TextField
                fullWidth
                label="Përshkrimi i Shkeljës / Violation Description"
                multiline
                rows={3}
                value={fine.description}
                onChange={(e) => setFine({...fine, description: e.target.value})}
                className="classic-textfield"
                variant="outlined"
                required
              />
            </div>
          </div>

          {/* Legal and Administrative Details */}
          <div className="classic-form-section">
            <Typography variant="h6" className="classic-section-title">
              ⚖️ Informacioni Ligjor dhe Administrativ
            </Typography>
          </div>

          <div className="classic-form-row">
            <div className="classic-form-field-full">
              <FormControl fullWidth className="classic-form-control">
                <InputLabel>Baza Ligjore / Legal Basis</InputLabel>
                <Select
                  value={fine.legalBasis}
                  onChange={(e) => setFine({...fine, legalBasis: e.target.value})}
                  className="classic-select"
                >
                  {legalBases.map(basis => (
                    <MenuItem key={basis} value={basis}>
                      {basis}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="classic-form-row">
            <div className="classic-form-field">
              <FormControl fullWidth className="classic-form-control">
                <InputLabel>Lëshuar nga / Issued By</InputLabel>
                <Select
                  value={fine.issuedBy}
                  onChange={(e) => setFine({...fine, issuedBy: e.target.value})}
                  className="classic-select"
                >
                  {officers.map(officer => (
                    <MenuItem key={officer} value={officer}>
                      {officer}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className="classic-form-field">
              <TextField
                fullWidth
                label="Data e Lëshimit / Issue Date"
                type="date"
                value={fine.issuedDate}
                onChange={(e) => setFine({...fine, issuedDate: e.target.value})}
                className="classic-textfield"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </div>

            <div className="classic-form-field">
              <TextField
                fullWidth
                label="Data e Skadencës / Due Date"
                type="date"
                value={fine.dueDate || calculateDueDate()}
                onChange={(e) => setFine({...fine, dueDate: e.target.value})}
                className="classic-textfield"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </div>
          </div>

          <div className="classic-form-row">
            <div className="classic-form-field-full">
              <TextField
                fullWidth
                label="Shënime / Notes"
                multiline
                rows={3}
                value={fine.notes}
                onChange={(e) => setFine({...fine, notes: e.target.value})}
                className="classic-textfield"
                variant="outlined"
                placeholder="Shënime shtesë për gjobën administrative..."
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="classic-form-row">
            <div className="classic-button-group">
              <ClassicButton 
                variant="primary" 
                onClick={handleSubmit}
                className="classic-button-primary"
              >
                💶 Krijo Gjobën
              </ClassicButton>
              <ClassicButton 
                variant="default"
                onClick={handleClear}
                className="classic-button-default"
              >
                🔄 Pastro Formën
              </ClassicButton>
              <ClassicButton 
                variant="default"
                onClick={() => window.history.back()}
                className="classic-button-default"
              >
                ◀️ Kthehu
              </ClassicButton>
            </div>
          </div>
        </div>
      </ClassicCard>

      {/* Summary Panel */}
      {fine.fineAmount && fine.fineAmount > 0 && (
        <ClassicCard className="fine-summary-card">
          <div className="classic-form-section">
            <Typography variant="h6" className="classic-section-title">
              📊 Përmbledhje e Gjobës
            </Typography>
          </div>
          <div className="fine-summary">
            <p><strong>Subjekti:</strong> {fine.subjectName || 'N/A'}</p>
            <p><strong>Lloji i Shkeljës:</strong> {violationTypes.find(vt => vt.value === fine.violationType)?.label || 'N/A'}</p>
            <p><strong>Shuma:</strong> {fine.fineAmount} {fine.currency}</p>
            <p><strong>Data e Skadencës:</strong> {fine.dueDate || calculateDueDate()}</p>
            <p><strong>Baza Ligjore:</strong> {fine.legalBasis || 'N/A'}</p>
          </div>
        </ClassicCard>
      )}
    </Box>
  );
};

export default FineCreation;
