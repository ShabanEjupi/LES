// Template Approval Dialog - Albanian Customs Administration (LES)
// Dialog për Miratimin e Shablloneve - Administrata Doganore e Shqipërisë

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Alert,
  Chip,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';
import {
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon,
  Edit as RequestChangesIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import type {
  DocumentTemplate,
  TemplateApprovalStep
} from '../../types/DocumentTemplates';

interface TemplateApprovalDialogProps {
  template: DocumentTemplate;
  onApprove: (stepId: string, comments?: string) => Promise<void>;
  onReject: (stepId: string, comments: string) => Promise<void>;
  onRequestChanges: (stepId: string, comments: string) => Promise<void>;
  onClose: () => void;
  currentUserRole: string;
}

const TemplateApprovalDialog: React.FC<TemplateApprovalDialogProps> = ({
  template,
  onApprove,
  onReject,
  onRequestChanges,
  onClose,
  currentUserRole
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [comments, setComments] = useState('');
  const [action, setAction] = useState<'APPROVE' | 'REJECT' | 'REQUEST_CHANGES'>('APPROVE');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Find the current step based on user role and completion status
    const currentStepIndex = template.approvalSteps.findIndex(
      step => step.role === currentUserRole && !step.completed
    );
    if (currentStepIndex !== -1) {
      setActiveStep(currentStepIndex);
    }
  }, [template.approvalSteps, currentUserRole]);

  const currentStep = template.approvalSteps[activeStep];
  const canPerformAction = currentStep && 
    currentStep.role === currentUserRole && 
    !currentStep.completed;

  const getStepIcon = (step: TemplateApprovalStep) => {
    if (step.completed) {
      switch (step.action) {
        case 'APPROVE':
          return <ApproveIcon color="success" />;
        case 'REJECT':
          return <RejectIcon color="error" />;
        case 'REQUEST_CHANGES':
          return <RequestChangesIcon color="warning" />;
        default:
          return <ApproveIcon color="success" />;
      }
    }
    return <PersonIcon color="action" />;
  };

  const handleSubmitAction = async () => {
    if (!currentStep || !canPerformAction) return;

    setIsSubmitting(true);
    try {
      switch (action) {
        case 'APPROVE':
          await onApprove(currentStep.id, comments);
          break;
        case 'REJECT':
          await onReject(currentStep.id, comments);
          break;
        case 'REQUEST_CHANGES':
          await onRequestChanges(currentStep.id, comments);
          break;
      }
      onClose();
    } catch (error) {
      console.error('Error submitting approval action:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getActionColor = (actionType: string) => {
    switch (actionType) {
      case 'APPROVE': return 'success';
      case 'REJECT': return 'error';
      case 'REQUEST_CHANGES': return 'warning';
      default: return 'default';
    }
  };

  const getActionLabel = (actionType: string) => {
    switch (actionType) {
      case 'APPROVE': return 'Miratuar';
      case 'REJECT': return 'Refuzuar';
      case 'REQUEST_CHANGES': return 'Kërkohen Ndryshime';
      default: return 'Panjohur';
    }
  };

  return (
    <Box>
      {/* Template Information */}
      <Card sx={{ mb: 3 }} className="classic-card">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Detajet e Shabllonit
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <Box>
              <Typography variant="body2" color="textSecondary">
                Emri
              </Typography>
              <Typography variant="body1">
                {template.name}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="textSecondary">
                Lloji
              </Typography>
              <Typography variant="body1">
                {template.type}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="textSecondary">
                Versioni
              </Typography>
              <Typography variant="body1">
                {template.version}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="textSecondary">
                Krijuar nga
              </Typography>
              <Typography variant="body1">
                {template.createdBy}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="textSecondary">
              Përshkrimi
            </Typography>
            <Typography variant="body1">
              {template.description}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Approval Workflow */}
      <Card sx={{ mb: 3 }} className="classic-card">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Rrjedha e Miratimit
          </Typography>
          
          <Stepper activeStep={activeStep} orientation="vertical">
            {template.approvalSteps.map((step, index) => (
              <Step key={step.id} completed={step.completed}>
                <StepLabel 
                  icon={getStepIcon(step)}
                  optional={
                    step.completed && (
                      <Chip
                        size="small"
                        label={getActionLabel(step.action)}
                        color={getActionColor(step.action) as 'success' | 'error' | 'warning' | 'default'}
                      />
                    )
                  }
                >
                  <Box>
                    <Typography variant="subtitle1">
                      {step.stepName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Roli: {step.role}
                    </Typography>
                  </Box>
                </StepLabel>
                <StepContent>
                  {step.completed ? (
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="body2" color="textSecondary">
                        Përfunduar nga: {step.completedBy}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Data: {step.completedAt?.toLocaleDateString('sq-AL')}
                      </Typography>
                      {step.comments && (
                        <Box sx={{ mt: 1, p: 1, bgcolor: 'grey.100', borderRadius: 1 }}>
                          <Typography variant="body2">
                            <strong>Komente:</strong> {step.comments}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  ) : (
                    index === activeStep && canPerformAction && (
                      <Box sx={{ ml: 2 }}>
                        <Alert severity="info" sx={{ mb: 2 }}>
                          Ju keni autorizimin për të kryer veprime në këtë hap të miratimit.
                        </Alert>
                      </Box>
                    )
                  )}
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </Card>

      {/* Action Panel - Only show if user can perform action */}
      {canPerformAction && (
        <Card sx={{ mb: 3 }} className="classic-card">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Veprimi i Miratimit
            </Typography>
            
            <FormControl component="fieldset" sx={{ mb: 2 }}>
              <RadioGroup
                value={action}
                onChange={(e) => setAction(e.target.value as 'APPROVE' | 'REJECT' | 'REQUEST_CHANGES')}
              >
                <FormControlLabel
                  value="APPROVE"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <ApproveIcon color="success" />
                      <Typography>Mirato Shabllonin</Typography>
                    </Box>
                  }
                />
                <FormControlLabel
                  value="REQUEST_CHANGES"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <RequestChangesIcon color="warning" />
                      <Typography>Kërko Ndryshime</Typography>
                    </Box>
                  }
                />
                <FormControlLabel
                  value="REJECT"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <RejectIcon color="error" />
                      <Typography>Refuzo Shabllonin</Typography>
                    </Box>
                  }
                />
              </RadioGroup>
            </FormControl>

            <TextField
              fullWidth
              multiline
              rows={4}
              label={action === 'APPROVE' ? 'Komente (opsionale)' : 'Komente (të detyrueshme)'}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder={
                action === 'APPROVE' 
                  ? 'Shtoni komente shtesë për miratimin...'
                  : action === 'REQUEST_CHANGES'
                  ? 'Specifikoni ndryshimet e kërkuara...'
                  : 'Shpjegoni arsyet e refuzimit...'
              }
              required={action !== 'APPROVE'}
              className="classic-textfield"
              sx={{ mb: 2 }}
            />

            {action !== 'APPROVE' && !comments.trim() && (
              <Alert severity="warning" sx={{ mb: 2 }}>
                Komentet janë të detyrueshme për {action === 'REJECT' ? 'refuzimin' : 'kërkimin e ndryshimeve'}.
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {/* Previous Actions History */}
      {template.approvalSteps.some(step => step.completed) && (
        <Card sx={{ mb: 3 }} className="classic-card">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Historiku i Veprimeve
            </Typography>
            <List>
              {template.approvalSteps
                .filter(step => step.completed)
                .map((step, index) => (
                  <ListItem key={step.id} divider={index < template.approvalSteps.length - 1}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: getActionColor(step.action) + '.light' }}>
                        {getStepIcon(step)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="subtitle2">
                            {step.stepName}
                          </Typography>
                          <Chip
                            size="small"
                            label={getActionLabel(step.action)}
                            color={getActionColor(step.action) as 'success' | 'error' | 'warning' | 'default'}
                          />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="textSecondary">
                            {step.completedBy} • {step.completedAt?.toLocaleDateString('sq-AL', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </Typography>
                          {step.comments && (
                            <Typography variant="body2" sx={{ mt: 0.5 }}>
                              {step.comments}
                            </Typography>
                          )}
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
            </List>
          </CardContent>
        </Card>
      )}

      <Divider sx={{ my: 2 }} />

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          onClick={onClose}
          className="classic-button"
        >
          Mbyll
        </Button>
        
        {canPerformAction && (
          <Button
            variant="contained"
            onClick={handleSubmitAction}
            disabled={isSubmitting || (action !== 'APPROVE' && !comments.trim())}
            className="classic-button-primary"
            startIcon={
              action === 'APPROVE' ? <ApproveIcon /> :
              action === 'REJECT' ? <RejectIcon /> :
              <RequestChangesIcon />
            }
          >
            {isSubmitting ? 'Po përpunohet...' : 
             action === 'APPROVE' ? 'Mirato' :
             action === 'REJECT' ? 'Refuzo' :
             'Kërko Ndryshime'}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default TemplateApprovalDialog;
