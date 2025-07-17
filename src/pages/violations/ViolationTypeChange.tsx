import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Divider,
} from '@mui/material';
import {
  Save as SaveIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';

const ViolationTypeChange: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCase, setSelectedCase] = useState('');
  const [newViolationType, setNewViolationType] = useState('');
  const [reason, setReason] = useState('');
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    'Zgjidhni Rastin',
    'Zgjidhni Llojin e Ri',
    'Jepni Arsyen',
    'Konfirmoni Ndryshimin'
  ];

  // Sample cases data
  const availableCases = [
    { id: '03.1.7-2025-4', title: 'Kundërvajtje Mandatore - Import Documentation', currentType: 'Kundërvajtje Mandatore' },
    { id: '03.1.7-2025-3', title: 'Kundërvajtje e rregullt - Undeclared goods', currentType: 'Kundërvajtje e rregullt' },
    { id: '10.11.2023-1', title: 'Kundërvajtje e rregullt - Document verification', currentType: 'Kundërvajtje e rregullt' }
  ];

  const violationTypes = [
    'Kundërvajtje Mandatore',
    'Kundërvajtje e rregullt',
    'Kundërvajtje Administrative',
    'Kundërvajtje Penale',
    'Kundërvajtje Disciplinore'
  ];

  const handleNext = () => {
    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    // Here you would normally submit the change request
    alert('Kërkesa për ndryshimin e llojit të kundërvajtjes u dërgua me sukses!');
    navigate('/violations');
  };

  const selectedCaseData = availableCases.find(c => c.id === selectedCase);

  return (
    <MainLayout>
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Ndryshimi i Llojit të Kundërvajtjes
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Ndryshoni llojin e një kundërvajtjeje ekzistuese
          </Typography>
        </Box>

        {/* Stepper */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Paper>

        {/* Step Content */}
        <Card>
          <CardContent sx={{ p: 4 }}>
            {activeStep === 0 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Zgjidhni Rastin për Ndryshim
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                  Zgjidhni rastin e kundërvajtjes që dëshironi të ndryshoni llojin.
                </Typography>
                
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel>Rasti i Kundërvajtjes</InputLabel>
                  <Select
                    value={selectedCase}
                    onChange={(e) => setSelectedCase(e.target.value)}
                    label="Rasti i Kundërvajtjes"
                  >
                    {availableCases.map((caseItem) => (
                      <MenuItem key={caseItem.id} value={caseItem.id}>
                        {caseItem.id} - {caseItem.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {selectedCaseData && (
                  <Alert severity="info" sx={{ mb: 3 }}>
                    <Typography variant="body2">
                      <strong>Rasti i zgjedhur:</strong> {selectedCaseData.id}<br />
                      <strong>Titulli:</strong> {selectedCaseData.title}<br />
                      <strong>Lloji aktual:</strong> {selectedCaseData.currentType}
                    </Typography>
                  </Alert>
                )}
              </Box>
            )}

            {activeStep === 1 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Zgjidhni Llojin e Ri të Kundërvajtjes
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                  Zgjidhni llojin e ri të kundërvajtjes për rastin e zgjedhur.
                </Typography>

                {selectedCaseData && (
                  <Alert severity="warning" sx={{ mb: 3 }}>
                    <Typography variant="body2">
                      <strong>Lloji aktual:</strong> {selectedCaseData.currentType}
                    </Typography>
                  </Alert>
                )}

                <FormControl fullWidth>
                  <InputLabel>Lloji i Ri i Kundërvajtjes</InputLabel>
                  <Select
                    value={newViolationType}
                    onChange={(e) => setNewViolationType(e.target.value)}
                    label="Lloji i Ri i Kundërvajtjes"
                  >
                    {violationTypes
                      .filter(type => type !== selectedCaseData?.currentType)
                      .map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Box>
            )}

            {activeStep === 2 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Arsyet për Ndryshimin
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                  Jepni arsyet për ndryshimin e llojit të kundërvajtjes.
                </Typography>

                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  label="Arsyet për ndryshimin"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Shpjegoni arsyet për ndryshimin e llojit të kundërvajtjes..."
                  helperText="Kjo fushë është e detyrueshme për dokumentimin e ndryshimit."
                />
              </Box>
            )}

            {activeStep === 3 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Konfirmoni Ndryshimin
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                  Rishikoni informacionet para se të konfirmoni ndryshimin.
                </Typography>

                <Paper sx={{ p: 3, bgcolor: 'grey.50' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box>
                      <Typography variant="subtitle2" color="textSecondary">
                        Rasti i Kundërvajtjes
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        {selectedCase} - {selectedCaseData?.title}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle2" color="textSecondary">
                          Lloji Aktual
                        </Typography>
                        <Typography variant="body1">
                          {selectedCaseData?.currentType}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle2" color="textSecondary">
                          Lloji i Ri
                        </Typography>
                        <Typography variant="body1" color="primary">
                          {newViolationType}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box>
                      <Typography variant="subtitle2" color="textSecondary">
                        Arsyet për Ndryshimin
                      </Typography>
                      <Typography variant="body1">
                        {reason}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>

                <Alert severity="warning" sx={{ mt: 3 }}>
                  <Typography variant="body2">
                    <strong>Kujdes:</strong> Ky ndryshim do të jetë i përhershëm dhe do të regjistrohet në auditimin e sistemit.
                  </Typography>
                </Alert>
              </Box>
            )}

            <Divider sx={{ my: 3 }} />

            {/* Navigation Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                onClick={() => navigate('/violations')}
                startIcon={<CancelIcon />}
                color="inherit"
              >
                Anulo
              </Button>
              
              <Box sx={{ display: 'flex', gap: 2 }}>
                {activeStep > 0 && (
                  <Button onClick={handleBack}>
                    Prapa
                  </Button>
                )}
                
                {activeStep < steps.length - 1 ? (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={
                      (activeStep === 0 && !selectedCase) ||
                      (activeStep === 1 && !newViolationType) ||
                      (activeStep === 2 && !reason.trim())
                    }
                  >
                    Vazhdo
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    startIcon={<SaveIcon />}
                    color="primary"
                  >
                    Konfirmo Ndryshimin
                  </Button>
                )}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </MainLayout>
  );
};

export default ViolationTypeChange;
