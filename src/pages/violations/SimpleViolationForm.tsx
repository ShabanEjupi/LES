import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';

const SimpleViolationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    caseNumber: '',
    violationType: '',
    description: '',
    location: '',
    date: ''
  });
  
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Violation form submitted:', formData);
    setSubmitted(true);
  };

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  if (submitted) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="success">
          <Typography variant="h6">
            ✅ Kundërvajtja u krijua me sukses!
          </Typography>
          <Typography variant="body2">
            Numri i rastit: {formData.caseNumber || 'AUTO-GENERATED'}
          </Typography>
          <Button 
            variant="outlined" 
            onClick={() => setSubmitted(false)}
            sx={{ mt: 2 }}
          >
            Krijo Kundërvajtje të Re
          </Button>
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#003d82', fontWeight: 'bold' }}>
        🇽🇰 Krijimi i Kundërvajtjes
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ mb: 3 }}>
        Republika e Kosovës - Doganat e Kosovës - Sistemi LES
      </Typography>

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <TextField
                  sx={{ flex: '1 1 300px' }}
                  label="Numri i Rastit"
                  value={formData.caseNumber}
                  onChange={handleChange('caseNumber')}
                  placeholder="Automatically generated if empty"
                />
                
                <FormControl sx={{ flex: '1 1 300px' }}>
                  <InputLabel>Lloji i Kundërvajtjes</InputLabel>
                  <Select
                    value={formData.violationType}
                    onChange={handleChange('violationType')}
                  >
                    <MenuItem value="smuggling">Kontrabanda</MenuItem>
                    <MenuItem value="false_declaration">Deklarim i Rremë</MenuItem>
                    <MenuItem value="documentation">Probleme me Dokumentet</MenuItem>
                    <MenuItem value="goods_inspection">Inspektim i Mallrave</MenuItem>
                    <MenuItem value="vehicle_violation">Kundërvajtje Automjeti</MenuItem>
                    <MenuItem value="other">Të tjera</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <TextField
                fullWidth
                multiline
                rows={4}
                label="Përshkrimi i Kundërvajtjes"
                value={formData.description}
                onChange={handleChange('description')}
                placeholder="Shkruani detajet e kundërvajtjes..."
              />

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <TextField
                  sx={{ flex: '1 1 300px' }}
                  label="Lokacioni"
                  value={formData.location}
                  onChange={handleChange('location')}
                  placeholder="p.sh. Pika Kufitare Merdare"
                />

                <TextField
                  sx={{ flex: '1 1 300px' }}
                  type="datetime-local"
                  label="Data dhe Koha"
                  value={formData.date}
                  onChange={handleChange('date')}
                  InputLabelProps={{ shrink: true }}
                />
              </Box>

              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button variant="outlined" onClick={() => setFormData({
                  caseNumber: '',
                  violationType: '',
                  description: '',
                  location: '',
                  date: ''
                })}>
                  Pastro Formularin
                </Button>
                <Button 
                  type="submit" 
                  variant="contained" 
                  sx={{ 
                    backgroundColor: '#003d82',
                    '&:hover': { backgroundColor: '#002855' }
                  }}
                >
                  Krijo Kundërvajtjen
                </Button>
              </Box>
            </Box>
          </form>
        </CardContent>
      </Card>

      <Box sx={{ mt: 3 }}>
        <Alert severity="info">
          <Typography variant="body2">
            ℹ️ Kjo është një version demonstrativ. Të dhënat nuk ruhen në bazën e të dhënave.
          </Typography>
        </Alert>
      </Box>
    </Box>
  );
};

export default SimpleViolationForm;
