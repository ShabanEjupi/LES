import React, { useState } from 'react';
import { Box, Typography, TextField, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { ClassicButton } from '../../components/common/ClassicButton';
import { ClassicCard } from '../../components/common/ClassicCard';
import '../../styles/classic-theme.css';

interface Task {
  id: string;
  title: string;
  description: string;
  type: string;
  assignedTo: string;
  assignedBy: string;
  priority: 'URGENT' | 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  dueDate: string;
  relatedViolationId?: string;
  relatedCaseId?: string;
  estimatedHours: number;
  actualHours?: number;
  department: string;
  tags: string[];
}

const TaskCreation: React.FC = () => {
  const [task, setTask] = useState<Partial<Task>>({
    title: '',
    description: '',
    type: '',
    assignedTo: '',
    assignedBy: 'Current User', // Would come from auth context
    priority: 'MEDIUM',
    status: 'PENDING',
    dueDate: '',
    estimatedHours: 1,
    department: '',
    tags: []
  });

  const [newTag, setNewTag] = useState('');

  const taskTypes = [
    { value: 'INVESTIGATION', label: 'Hetim/Investigation' },
    { value: 'DOCUMENTATION', label: 'Dokumentim/Documentation' },
    { value: 'INSPECTION', label: 'Inspektim/Inspection' },
    { value: 'FOLLOW_UP', label: 'Ndjekje/Follow-up' },
    { value: 'REVIEW', label: 'Rishikim/Review' },
    { value: 'ANALYSIS', label: 'Analizë/Analysis' },
    { value: 'REPORT_WRITING', label: 'Shkrim Raporti/Report Writing' },
    { value: 'CASE_CLOSURE', label: 'Mbyllje Rasti/Case Closure' },
    { value: 'ADMINISTRATIVE', label: 'Administrative' },
    { value: 'LEGAL_REVIEW', label: 'Rishikim Ligjor/Legal Review' }
  ];

  const departments = [
    'Kontrolli Kufitar/Border Control',
    'Hetimi/Investigation',
    'Vlerësimi i Riskut/Risk Assessment',
    'Operacionet/Operations',
    'Siguria/Security',
    'Administrata/Administration',
    'Juridik/Legal',
    'IT & Sisteme/IT & Systems'
  ];

  const officers = [
    'Agron Berisha - Oficer Hetues',
    'Blerta Krasniqi - Supervizore',
    'Driton Osmani - Oficer Kufitar',
    'Fatmira Hoxha - Analizuese',
    'Gezim Mustafa - Oficer i Sigurisë',
    'Hajrije Salihu - Koordinatore',
    'Ilir Zeqiri - Oficer Operacional',
    'Jeta Rama - Specialiste Juridike'
  ];

  const handleSubmit = () => {
    console.log('Creating task:', task);
    // Here would integrate with backend API
    alert('Detyra u krijua me sukses! / Task created successfully!');
  };

  const handleClear = () => {
    setTask({
      title: '',
      description: '',
      type: '',
      assignedTo: '',
      assignedBy: 'Current User',
      priority: 'MEDIUM',
      status: 'PENDING',
      dueDate: '',
      estimatedHours: 1,
      department: '',
      tags: []
    });
    setNewTag('');
  };

  const addTag = () => {
    if (newTag.trim() && !task.tags?.includes(newTag.trim())) {
      setTask({
        ...task,
        tags: [...(task.tags || []), newTag.trim()]
      });
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTask({
      ...task,
      tags: task.tags?.filter(tag => tag !== tagToRemove) || []
    });
  };

  return (
    <Box className="classic-container">
      <div className="classic-header">
        <Typography variant="h4" className="classic-title">
          🗂️ Krijimi i Detyrës së Re
        </Typography>
        <Typography variant="subtitle1" className="classic-subtitle">
          Sistemi për krijimin dhe caktimin e detyrave të reja për personelin e doganave
        </Typography>
      </div>

      <ClassicCard>
        <div className="classic-form-grid">
          {/* Basic Information */}
          <div className="classic-form-section">
            <Typography variant="h6" className="classic-section-title">
              📋 Informacioni Bazë
            </Typography>
          </div>

          <div className="classic-form-row">
            <div className="classic-form-field-large">
              <TextField
                fullWidth
                label="Titulli i Detyrës / Task Title"
                value={task.title}
                onChange={(e) => setTask({...task, title: e.target.value})}
                className="classic-textfield"
                variant="outlined"
                required
              />
            </div>

            <div className="classic-form-field">
              <FormControl fullWidth className="classic-form-control">
                <InputLabel>Lloji i Detyrës / Task Type</InputLabel>
                <Select
                  value={task.type}
                  onChange={(e) => setTask({...task, type: e.target.value})}
                  className="classic-select"
                >
                  {taskTypes.map(type => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="classic-form-row">
            <div className="classic-form-field-full">
              <TextField
                fullWidth
                label="Përshkrimi i Detyrës / Task Description"
                multiline
                rows={4}
                value={task.description}
                onChange={(e) => setTask({...task, description: e.target.value})}
                className="classic-textfield"
                variant="outlined"
                required
              />
            </div>
          </div>

          {/* Assignment Information */}
          <div className="classic-form-section">
            <Typography variant="h6" className="classic-section-title">
              👥 Informacioni i Caktimit
            </Typography>
          </div>

          <div className="classic-form-row">
            <div className="classic-form-field">
              <FormControl fullWidth className="classic-form-control">
                <InputLabel>Caktuar për / Assigned To</InputLabel>
                <Select
                  value={task.assignedTo}
                  onChange={(e) => setTask({...task, assignedTo: e.target.value})}
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
              <FormControl fullWidth className="classic-form-control">
                <InputLabel>Departamenti / Department</InputLabel>
                <Select
                  value={task.department}
                  onChange={(e) => setTask({...task, department: e.target.value})}
                  className="classic-select"
                >
                  {departments.map(dept => (
                    <MenuItem key={dept} value={dept}>
                      {dept}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>

          {/* Priority and Timing */}
          <div className="classic-form-section">
            <Typography variant="h6" className="classic-section-title">
              ⏰ Prioriteti dhe Afatet
            </Typography>
          </div>

          <div className="classic-form-row">
            <div className="classic-form-field">
              <FormControl fullWidth className="classic-form-control">
                <InputLabel>Prioriteti / Priority</InputLabel>
                <Select
                  value={task.priority}
                  onChange={(e) => setTask({...task, priority: e.target.value as Task['priority']})}
                  className="classic-select"
                >
                  <MenuItem value="URGENT" style={{color: '#d32f2f'}}>🔴 Urgjent/Urgent</MenuItem>
                  <MenuItem value="HIGH" style={{color: '#f57c00'}}>🟠 I Lartë/High</MenuItem>
                  <MenuItem value="MEDIUM" style={{color: '#1976d2'}}>🔵 Mesatar/Medium</MenuItem>
                  <MenuItem value="LOW" style={{color: '#388e3c'}}>🟢 I Ulët/Low</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="classic-form-field">
              <TextField
                fullWidth
                label="Data e Përfundimit / Due Date"
                type="date"
                value={task.dueDate}
                onChange={(e) => setTask({...task, dueDate: e.target.value})}
                className="classic-textfield"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </div>

            <div className="classic-form-field">
              <TextField
                fullWidth
                label="Orët e Vlerësuara / Estimated Hours"
                type="number"
                value={task.estimatedHours}
                onChange={(e) => setTask({...task, estimatedHours: Number(e.target.value)})}
                className="classic-textfield"
                variant="outlined"
                inputProps={{ min: 0.5, step: 0.5 }}
              />
            </div>

            <div className="classic-form-field">
              <FormControl fullWidth className="classic-form-control">
                <InputLabel>Statusi / Status</InputLabel>
                <Select
                  value={task.status}
                  onChange={(e) => setTask({...task, status: e.target.value as Task['status']})}
                  className="classic-select"
                >
                  <MenuItem value="PENDING">⏳ Në pritje/Pending</MenuItem>
                  <MenuItem value="IN_PROGRESS">🔄 Në progres/In Progress</MenuItem>
                  <MenuItem value="COMPLETED">✅ E kompletuar/Completed</MenuItem>
                  <MenuItem value="CANCELLED">❌ E anuluar/Cancelled</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          {/* Tags Section */}
          <div className="classic-form-section">
            <Typography variant="h6" className="classic-section-title">
              🏷️ Etiketat / Tags
            </Typography>
          </div>

          <div className="classic-form-row">
            <div className="classic-form-field-large">
              <TextField
                fullWidth
                label="Shto Etiketë / Add Tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="classic-textfield"
                variant="outlined"
                onKeyPress={(e) => e.key === 'Enter' && addTag()}
              />
            </div>

            <div className="classic-form-field">
              <ClassicButton 
                variant="default"
                onClick={addTag}
              >
                ➕ Shto Etiketë
              </ClassicButton>
            </div>
          </div>

          {task.tags && task.tags.length > 0 && (
            <div className="classic-form-row">
              <div className="classic-form-field-full">
                <div className="classic-tags-container">
                  {task.tags.map((tag, index) => (
                    <span key={index} className="classic-tag">
                      {tag}
                      <button 
                        className="classic-tag-remove"
                        onClick={() => removeTag(tag)}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="classic-form-row">
            <div className="classic-button-group">
              <ClassicButton 
                variant="primary" 
                onClick={handleSubmit}
                className="classic-button-primary"
              >
                ✅ Krijo Detyrën
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
    </Box>
  );
};

export default TaskCreation;
