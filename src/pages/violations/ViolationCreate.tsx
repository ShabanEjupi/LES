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
  Divider,
  FormControlLabel,
  Checkbox,
  Stepper,
  Step,
  StepLabel,
  Paper,
} from '@mui/material';
import {
  Save as SaveIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';

const ViolationCreate: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  
  // Form data
  const [violationData, setViolationData] = useState({
    violationType: '',
    subject: '',
    description: '',
    priority: 'MEDIUM',
    department: '',
    assignedTo: '',
    dueDate: '',
    involvedParties: '',
    evidence: '',
    isConfidential: false,
    requiresApproval: true,
  });

  const steps = [
    'Informacioni Bazë',
    'Detajet e Kundërvajtjes',
    'Caktimi dhe Afatet',
    'Rishikimi dhe Ruajtja'
  ];

  const violationTypes = [
    'Kundërvajtje Mandatore',
    'Kundërvajtje e rregullt',
    'Kundërvajtje Administrative',
    'Kundërvajtje Penale',
    'Kundërvajtje Disciplinore'
  ];

  const departments = [
    { value: 'BORDER_MANAGEMENT', label: 'Menaxhimi i Kufijve' },
    { value: 'CUSTOMS_CONTROL', label: 'Kontrolli Doganor' },
    { value: 'INVESTIGATION', label: 'Hetimi' },
    { value: 'LEGAL_AFFAIRS', label: 'Çështjet Juridike' },
    { value: 'ADMINISTRATION', label: 'Administrata' }
  ];

  const officers = [
    { value: 'inspector01', label: 'Inspector Doganor 1' },
    { value: 'inspector02', label: 'Inspector Doganor 2' },
    { value: 'supervisor01', label: 'Supervizor 1' },
    { value: 'manager01', label: 'Menaxher Departamenti' }
  ];

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setViolationData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    // Generate case number
    const caseNumber = `03.1.7-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`;
    
    // Here you would normally submit to backend
    console.log('Creating violation:', { ...violationData, caseNumber });
    
    alert(`Kundërvajtja u krijua me sukses! Numri i rastit: ${caseNumber}`);
    navigate('/violations');
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 0:
        return violationData.violationType && violationData.subject;
      case 1:
        return violationData.description && violationData.involvedParties;
      case 2:
        return violationData.department && violationData.assignedTo && violationData.dueDate;
      default:
        return true;
    }
  };

  return (
    <MainLayout>
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Krijimi i Kundërvajtjes së Re
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Krijoni një kundërvajtje të re doganore
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
                  Informacioni Bazë i Kundërvajtjes
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                  Jepni informacionin bazë për kundërvajtjen që po krijoni.
                </Typography>
                
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                  <Box sx={{ flex: "1 1 auto", minWidth: "300px", "@media (min-width: 960px)": { flex: "6 1 0%" } }}>
                    <FormControl fullWidth required>
                      <InputLabel>Lloji i Kundërvajtjes</InputLabel>
                      <Select
                        value={violationData.violationType}
                        onChange={(e) => handleInputChange('violationType', e.target.value)}
                        label="Lloji i Kundërvajtjes"
                      >
                        {violationTypes.map((type) => (
                          <MenuItem key={type} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  
                  <Box sx={{ flex: "1 1 auto", minWidth: "300px", "@media (min-width: 960px)": { flex: "6 1 0%" } }}>
                    <FormControl fullWidth>
                      <InputLabel>Prioriteti</InputLabel>
                      <Select
                        value={violationData.priority}
                        onChange={(e) => handleInputChange('priority', e.target.value)}
                        label="Prioriteti"
                      >
                        <MenuItem value="LOW">I ulët</MenuItem>
                        <MenuItem value="MEDIUM">I mesëm</MenuItem>
                        <MenuItem value="HIGH">I lartë</MenuItem>
                        <MenuItem value="URGENT">Urgjent</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  
                  <Box sx={{ flex: "1 1 auto", minWidth: "250px" }}>
                    <TextField
                      fullWidth
                      required
                      label="Subjekti i Kundërvajtjes"
                      value={violationData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      placeholder="Jepni një përshkrim të shkurtër të kundërvajtjes"
                    />
                  </Box>
                </Box>
              </Box>
            )}

            {activeStep === 1 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Detajet e Kundërvajtjes
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                  Jepni detaje të plota për kundërvajtjen.
                </Typography>
                
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                  <Box sx={{ flex: "1 1 auto", minWidth: "250px" }}>
                    <TextField
                      fullWidth
                      required
                      multiline
                      rows={6}
                      label="Përshkrimi i Detajuar"
                      value={violationData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Përshkruani detajet e kundërvajtjes, rrethanat, dhe faktet e rëndësishme..."
                    />
                  </Box>
                  
                  <Box sx={{ flex: "1 1 auto", minWidth: "250px" }}>
                    <TextField
                      fullWidth
                      required
                      multiline
                      rows={4}
                      label="Palët e Përfshira"
                      value={violationData.involvedParties}
                      onChange={(e) => handleInputChange('involvedParties', e.target.value)}
                      placeholder="Listoni personat, kompanitë ose organizatat e përfshira në kundërvajtje..."
                    />
                  </Box>
                  
                  <Box sx={{ flex: "1 1 auto", minWidth: "250px" }}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Provat dhe Dokumentet"
                      value={violationData.evidence}
                      onChange={(e) => handleInputChange('evidence', e.target.value)}
                      placeholder="Përshkruani provat, dokumentet dhe materialet mbështetëse..."
                    />
                  </Box>
                  
                  <Box sx={{ flex: "1 1 auto", minWidth: "250px" }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={violationData.isConfidential}
                          onChange={(e) => handleInputChange('isConfidential', e.target.checked)}
                        />
                      }
                      label="Rasti është konfidencial"
                    />
                  </Box>
                </Box>
              </Box>
            )}

            {activeStep === 2 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Caktimi dhe Afatet
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                  Caktoni departamentin, oficerin përgjegjës dhe afatet.
                </Typography>
                
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                  <Box sx={{ flex: "1 1 auto", minWidth: "300px", "@media (min-width: 960px)": { flex: "6 1 0%" } }}>
                    <FormControl fullWidth required>
                      <InputLabel>Departamenti</InputLabel>
                      <Select
                        value={violationData.department}
                        onChange={(e) => handleInputChange('department', e.target.value)}
                        label="Departamenti"
                      >
                        {departments.map((dept) => (
                          <MenuItem key={dept.value} value={dept.value}>
                            {dept.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  
                  <Box sx={{ flex: "1 1 auto", minWidth: "300px", "@media (min-width: 960px)": { flex: "6 1 0%" } }}>
                    <FormControl fullWidth required>
                      <InputLabel>Caktuar tek</InputLabel>
                      <Select
                        value={violationData.assignedTo}
                        onChange={(e) => handleInputChange('assignedTo', e.target.value)}
                        label="Caktuar tek"
                      >
                        {officers.map((officer) => (
                          <MenuItem key={officer.value} value={officer.value}>
                            {officer.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  
                  <Box sx={{ flex: "1 1 auto", minWidth: "300px", "@media (min-width: 960px)": { flex: "6 1 0%" } }}>
                    <TextField
                      fullWidth
                      required
                      type="date"
                      label="Data e Scadencës"
                      value={violationData.dueDate}
                      onChange={(e) => handleInputChange('dueDate', e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Box>
                  
                  <Box sx={{ flex: "1 1 auto", minWidth: "250px" }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={violationData.requiresApproval}
                          onChange={(e) => handleInputChange('requiresApproval', e.target.checked)}
                        />
                      }
                      label="Kërkon miratimin e menaxherit"
                    />
                  </Box>
                </Box>
              </Box>
            )}

            {activeStep === 3 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Rishikoni dhe Konfirmoni
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                  Rishikoni të gjitha informacionet para se të ruani kundërvajtjen.
                </Typography>

                <Paper sx={{ p: 3, bgcolor: 'grey.50' }}>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                    <Box sx={{ flex: "1 1 auto", minWidth: "300px", "@media (min-width: 960px)": { flex: "6 1 0%" } }}>
                      <Typography variant="subtitle2" color="textSecondary">
                        Lloji i Kundërvajtjes
                      </Typography>
                      <Typography variant="body1">{violationData.violationType}</Typography>
                    </Box>
                    
                    <Box sx={{ flex: "1 1 auto", minWidth: "300px", "@media (min-width: 960px)": { flex: "6 1 0%" } }}>
                      <Typography variant="subtitle2" color="textSecondary">
                        Prioriteti
                      </Typography>
                      <Typography variant="body1">{violationData.priority}</Typography>
                    </Box>
                    
                    <Box sx={{ flex: "1 1 auto", minWidth: "250px" }}>
                      <Typography variant="subtitle2" color="textSecondary">
                        Subjekti
                      </Typography>
                      <Typography variant="body1">{violationData.subject}</Typography>
                    </Box>
                    
                    <Box sx={{ flex: "1 1 auto", minWidth: "250px" }}>
                      <Typography variant="subtitle2" color="textSecondary">
                        Përshkrimi
                      </Typography>
                      <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                        {violationData.description}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ flex: "1 1 auto", minWidth: "300px", "@media (min-width: 960px)": { flex: "6 1 0%" } }}>
                      <Typography variant="subtitle2" color="textSecondary">
                        Departamenti
                      </Typography>
                      <Typography variant="body1">
                        {departments.find(d => d.value === violationData.department)?.label}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ flex: "1 1 auto", minWidth: "300px", "@media (min-width: 960px)": { flex: "6 1 0%" } }}>
                      <Typography variant="subtitle2" color="textSecondary">
                        Caktuar tek
                      </Typography>
                      <Typography variant="body1">
                        {officers.find(o => o.value === violationData.assignedTo)?.label}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ flex: "1 1 auto", minWidth: "300px", "@media (min-width: 960px)": { flex: "6 1 0%" } }}>
                      <Typography variant="subtitle2" color="textSecondary">
                        Data e Scadencës
                      </Typography>
                      <Typography variant="body1">{violationData.dueDate}</Typography>
                    </Box>
                  </Box>
                </Paper>

                <Alert severity="info" sx={{ mt: 3 }}>
                  <Typography variant="body2">
                    Pas ruajtjes, kundërvajtja do të jetë e disponueshme për të gjithë anëtarët e departamentit të caktuar.
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
                    disabled={!isStepValid(activeStep)}
                  >
                    Vazhdo
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    startIcon={<SaveIcon />}
                    color="primary"
                    disabled={!isStepValid(activeStep)}
                  >
                    Ruaj Kundërvajtjen
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

export default ViolationCreate;
