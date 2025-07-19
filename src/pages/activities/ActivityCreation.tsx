import React, { useState } from 'react';
import { Box, Typography, TextField, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { ClassicButton } from '../../components/common/ClassicButton';
import { ClassicCard } from '../../components/common/ClassicCard';
import '../../styles/classic-theme.css';

interface Activity {
  id: string;
  type: string;
  description: string;
  assignedTo: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  dueDate: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  relatedViolationId?: string;
}

const ActivityCreation: React.FC = () => {
  const [activity, setActivity] = useState<Partial<Activity>>({
    type: '',
    description: '',
    assignedTo: '',
    priority: 'MEDIUM',
    dueDate: '',
    status: 'PENDING'
  });

  const handleSubmit = () => {
    // Logic to create activity
    console.log('Creating activity:', activity);
  };

  return (
    <Box className="classic-container">
      <Typography variant="h4" className="classic-title">
        Krijimi i Aktivitetit
      </Typography>
      <Typography variant="subtitle1" className="classic-subtitle">
        Sistemi për krijimin e aktiviteteve të reja
      </Typography>

      <ClassicCard>
        <div className="classic-form-grid">
          <div className="classic-form-row">
            <div className="classic-form-field">
              <FormControl fullWidth className="classic-form-control">
                <InputLabel>Lloji i Aktivitetit</InputLabel>
                <Select
                  value={activity.type}
                  onChange={(e) => setActivity({...activity, type: e.target.value})}
                  className="classic-select"
                >
                  <MenuItem value="INVESTIGATION">Hetim</MenuItem>
                  <MenuItem value="DOCUMENTATION">Dokumentim</MenuItem>
                  <MenuItem value="INSPECTION">Inspektim</MenuItem>
                  <MenuItem value="FOLLOW_UP">Ndjekje</MenuItem>
                  <MenuItem value="REVIEW">Rishikim</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="classic-form-field">
              <FormControl fullWidth className="classic-form-control">
                <InputLabel>Prioriteti</InputLabel>
                <Select
                  value={activity.priority}
                  onChange={(e) => setActivity({...activity, priority: e.target.value as 'HIGH' | 'MEDIUM' | 'LOW'})}
                  className="classic-select"
                >
                  <MenuItem value="HIGH">I Lartë</MenuItem>
                  <MenuItem value="MEDIUM">Mesatar</MenuItem>
                  <MenuItem value="LOW">I Ulët</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="classic-form-row">
            <div className="classic-form-field-full">
              <TextField
                fullWidth
                label="Përshkrimi i Aktivitetit"
                multiline
                rows={4}
                value={activity.description}
                onChange={(e) => setActivity({...activity, description: e.target.value})}
                className="classic-textfield"
                variant="outlined"
              />
            </div>
          </div>

          <div className="classic-form-row">
            <div className="classic-form-field">
              <TextField
                fullWidth
                label="Caktuar për"
                value={activity.assignedTo}
                onChange={(e) => setActivity({...activity, assignedTo: e.target.value})}
                className="classic-textfield"
                variant="outlined"
              />
            </div>

            <div className="classic-form-field">
              <TextField
                fullWidth
                label="Data e Përfundimit"
                type="date"
                value={activity.dueDate}
                onChange={(e) => setActivity({...activity, dueDate: e.target.value})}
                className="classic-textfield"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </div>

          <div className="classic-form-row">
            <div className="classic-button-group">
              <ClassicButton 
                variant="primary" 
                onClick={handleSubmit}
                className="classic-button-primary"
              >
                Krijo Aktivitet
              </ClassicButton>
              <ClassicButton 
                variant="default"
                className="classic-button-default"
              >
                Pastro
              </ClassicButton>
              <ClassicButton 
                variant="default"
                className="classic-button-default"
              >
                Kthehu
              </ClassicButton>
            </div>
          </div>
        </div>
      </ClassicCard>
    </Box>
  );
};

export default ActivityCreation;
