import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Stack,
  Divider,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  Tooltip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Edit as EditIcon,
  Assignment as AssignmentIcon,
  Security as SecurityIcon,
  Gavel as GavelIcon,
  AttachFile as AttachFileIcon,
  Visibility as VisibilityIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  Share as ShareIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  AccountBalance as AccountBalanceIcon,
  VerifiedUser as VerifiedUserIcon,
  Timeline as TimelineIcon,
} from '@mui/icons-material';
import type { Case, CasePriority, CaseStatus } from '../../types';

interface CaseDetailViewProps {
  caseData: Case;
  onUpdate?: (updatedCase: Case) => void;
  onClose?: () => void;
}

const CaseDetailView: React.FC<CaseDetailViewProps> = ({ caseData, onClose }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editFormData, setEditFormData] = useState({
    assignedTo: caseData.assignedTo,
    priority: caseData.priority,
    status: caseData.status,
  });

  const getStatusColor = (status: string) => {
    const statusColors: Record<string, 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> = {
      'DRAFT': 'default',
      'SUBMITTED': 'info',
      'UNDER_REVIEW': 'warning',
      'INVESTIGATION': 'primary',
      'PENDING_APPROVAL': 'warning',
      'APPROVED': 'success',
      'REJECTED': 'error',
      'CLOSED': 'success',
      'APPEALED': 'error',
    };
    return statusColors[status] || 'default';
  };

  const getPriorityColor = (priority: string) => {
    const priorityColors: Record<string, 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> = {
      'LOW': 'success',
      'MEDIUM': 'warning',
      'HIGH': 'error',
      'URGENT': 'error',
    };
    return priorityColors[priority] || 'default';
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('sq-AL', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const CaseOverview = () => (
    <Stack spacing={3}>
      {/* Main content card */}
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" fontWeight={600}>
              {caseData.title}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton size="small" onClick={() => setShowEditDialog(true)}>
                <EditIcon />
              </IconButton>
              <IconButton size="small">
                <PrintIcon />
              </IconButton>
              <IconButton size="small">
                <ShareIcon />
              </IconButton>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
            <Chip
              label={caseData.status}
              color={getStatusColor(caseData.status)}
              icon={<AssignmentIcon />}
            />
            <Chip
              label={caseData.priority}
              color={getPriorityColor(caseData.priority)}
              icon={<SecurityIcon />}
            />
            <Chip
              label={caseData.type}
              variant="outlined"
              icon={<GavelIcon />}
            />
            {caseData.dataClassification && (
              <Chip
                label={`Security: ${caseData.dataClassification}`}
                color="secondary"
                icon={<VerifiedUserIcon />}
              />
            )}
          </Box>

          <Typography variant="body1" paragraph>
            {caseData.description}
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* Case details in flexible layout */}
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              <Box sx={{ minWidth: 120 }}>
                <Typography variant="caption" color="textSecondary">
                  Case Number
                </Typography>
                <Typography variant="body2" fontWeight={500}>
                  {caseData.caseNumber}
                </Typography>
              </Box>
              <Box sx={{ minWidth: 120 }}>
                <Typography variant="caption" color="textSecondary">
                  Customs Post
                </Typography>
                <Typography variant="body2" fontWeight={500}>
                  {caseData.customsPost}
                </Typography>
              </Box>
              <Box sx={{ minWidth: 120 }}>
                <Typography variant="caption" color="textSecondary">
                  Created Date
                </Typography>
                <Typography variant="body2" fontWeight={500}>
                  {new Date(caseData.createdAt).toLocaleDateString('sq-AL')}
                </Typography>
              </Box>
              <Box sx={{ minWidth: 120 }}>
                <Typography variant="caption" color="textSecondary">
                  Deadline
                </Typography>
                <Typography variant="body2" fontWeight={500}>
                  {caseData.deadlineDate ? new Date(caseData.deadlineDate).toLocaleDateString('sq-AL') : 'Not set'}
                </Typography>
              </Box>
            </Box>
          </Stack>

          {caseData.estimatedValue && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="caption" color="textSecondary">
                Estimated Value
              </Typography>
              <Typography variant="h6" color="primary">
                {formatCurrency(caseData.estimatedValue, caseData.currency)}
              </Typography>
            </Box>
          )}

          {caseData.legalReference && (
            <Alert severity="info" sx={{ mt: 2 }}>
              <Typography variant="body2">
                <strong>Legal Reference:</strong> {caseData.legalReference}
              </Typography>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Side panel card */}
      <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PersonIcon />
              Parties Involved
            </Typography>

            {caseData.reportedParty && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="textSecondary">
                  Reported Party
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                  <Avatar>
                    <BusinessIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="body2" fontWeight={500}>
                      {caseData.reportedParty.name}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {caseData.reportedParty.registrationNumber}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
                  Type: {caseData.reportedParty.type}
                </Typography>
              </Box>
            )}

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle2" color="textSecondary">
              Assigned Officer
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
              <Avatar>
                <PersonIcon />
              </Avatar>
              <Box>
                <Typography variant="body2" fontWeight={500}>
                  Officer ID: {caseData.assignedTo}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Active since case creation
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {caseData.sanctionApplied && (
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AccountBalanceIcon />
                Applied Sanctions
              </Typography>
              
              <Chip
                label={caseData.sanctionApplied.type}
                color={caseData.sanctionApplied.type === 'FINE' ? 'warning' : 'error'}
                size="small"
                sx={{ mb: 1 }}
              />
              
              {caseData.sanctionApplied.amount && (
                <Typography variant="h6" color="error">
                  {formatCurrency(caseData.sanctionApplied.amount, caseData.sanctionApplied.currency || 'EUR')}
                </Typography>
              )}
              
              <Typography variant="body2" sx={{ mt: 1 }}>
                {caseData.sanctionApplied.description}
              </Typography>
              
              <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
                Legal Basis: {caseData.sanctionApplied.legalBasis}
              </Typography>
              
              <Chip
                label={`Status: ${caseData.sanctionApplied.enforcementStatus}`}
                size="small"
                variant="outlined"
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        )}
    </Stack>
  );

  const CaseTimeline = () => (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TimelineIcon />
          Case Activity Timeline
        </Typography>
        
        <Box sx={{ mt: 2 }}>
          {caseData.timeline.map((activity) => (
            <Box key={activity.id} sx={{ mb: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'between', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" fontWeight={500}>
                  {activity.description}
                </Typography>
                <Chip
                  label={activity.type}
                  size="small"
                  color={getTimelineColor(activity.type)}
                />
              </Box>
              <Typography variant="caption" color="textSecondary">
                {new Date(activity.timestamp).toLocaleString('sq-AL')}
              </Typography>
              {activity.changes && (
                <Box sx={{ mt: 1, p: 1, bgcolor: 'grey.100', borderRadius: 1 }}>
                  <Typography variant="caption">
                    Changes: {JSON.stringify(activity.changes, null, 2)}
                  </Typography>
                </Box>
              )}
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );

  const getTimelineColor = (type: string): 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' => {
    const colorMap: Record<string, 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'> = {
      'CREATED': 'primary',
      'UPDATED': 'info',
      'STATUS_CHANGED': 'warning',
      'ASSIGNED': 'secondary',
      'APPROVED': 'success',
      'REJECTED': 'error',
    };
    return colorMap[type] || 'primary';
  };

  const DocumentsSection = () => (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AttachFileIcon />
            Evidence & Documents ({caseData.documents.length})
          </Typography>
          <Button variant="outlined" size="small">
            Upload Document
          </Button>
        </Box>

        <TableContainer component={Paper} variant="outlined">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Document</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Classification</TableCell>
                <TableCell>Uploaded</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {caseData.documents.map((doc) => (
                <TableRow key={doc.id} hover>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" fontWeight={500}>
                        {doc.title}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {doc.fileName} ({(doc.fileSize / 1024).toFixed(1)} KB)
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip label={doc.type} size="small" variant="outlined" />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={doc.confidentialityLevel} 
                      size="small" 
                      color={doc.confidentialityLevel === 'SECRET' ? 'error' : 'default'}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption">
                      {new Date(doc.createdAt).toLocaleDateString('sq-AL')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Tooltip title="View">
                        <IconButton size="small">
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Download">
                        <IconButton size="small">
                          <DownloadIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );

  const WorkflowSection = () => (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Workflow Status
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="textSecondary">
            Current Step: {caseData.workflow?.currentStep || 'Not defined'}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Completion: {caseData.workflow?.isCompleted ? 'Completed' : 'In Progress'}
          </Typography>
        </Box>

        {caseData.approvalChain.length > 0 && (
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Approval Chain
            </Typography>
            {caseData.approvalChain.map((step) => (
              <Box key={step.id} sx={{ mb: 2, p: 2, border: 1, borderColor: 'grey.200', borderRadius: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'between', alignItems: 'center' }}>
                  <Typography variant="body2" fontWeight={500}>
                    {step.stepName}
                  </Typography>
                  <Chip 
                    label={step.status} 
                    size="small"
                    color={step.status === 'APPROVED' ? 'success' : step.status === 'REJECTED' ? 'error' : 'warning'}
                  />
                </Box>
                {step.comments && (
                  <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
                    Comments: {step.comments}
                  </Typography>
                )}
                {step.approvedAt && (
                  <Typography variant="caption" color="textSecondary">
                    {step.status} on {new Date(step.approvedAt).toLocaleString('sq-AL')}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );

  const EditCaseDialog = () => (
    <Dialog open={showEditDialog} onClose={() => setShowEditDialog(false)} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Case Details</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 1 }}>
          <TextField
            fullWidth
            label="Assigned To"
            value={editFormData.assignedTo}
            onChange={(e) => setEditFormData({ ...editFormData, assignedTo: e.target.value })}
            sx={{ mb: 2 }}
          />
          
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Priority</InputLabel>
            <Select
              value={editFormData.priority}
              onChange={(e) => setEditFormData({ ...editFormData, priority: e.target.value as CasePriority })}
            >
              <MenuItem value="LOW">Low</MenuItem>
              <MenuItem value="MEDIUM">Medium</MenuItem>
              <MenuItem value="HIGH">High</MenuItem>
              <MenuItem value="URGENT">Urgent</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={editFormData.status}
              onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value as CaseStatus })}
            >
              <MenuItem value="DRAFT">Draft</MenuItem>
              <MenuItem value="SUBMITTED">Submitted</MenuItem>
              <MenuItem value="UNDER_REVIEW">Under Review</MenuItem>
              <MenuItem value="INVESTIGATION">Investigation</MenuItem>
              <MenuItem value="PENDING_APPROVAL">Pending Approval</MenuItem>
              <MenuItem value="APPROVED">Approved</MenuItem>
              <MenuItem value="REJECTED">Rejected</MenuItem>
              <MenuItem value="CLOSED">Closed</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setShowEditDialog(false)}>Cancel</Button>
        <Button variant="contained" onClick={() => {
          // Handle save logic here
          setShowEditDialog(false);
        }}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight={600}>
          Case Details
        </Typography>
        {onClose && (
          <Button variant="outlined" onClick={onClose}>
            Back to Cases
          </Button>
        )}
      </Box>

      {/* Tab Navigation */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 3 }}>
          {['Overview', 'Timeline', 'Documents', 'Workflow'].map((tab, index) => (
            <Button
              key={tab}
              onClick={() => setActiveTab(index)}
              variant={activeTab === index ? 'contained' : 'text'}
              size="small"
            >
              {tab}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Tab Content */}
      {activeTab === 0 && <CaseOverview />}
      {activeTab === 1 && <CaseTimeline />}
      {activeTab === 2 && <DocumentsSection />}
      {activeTab === 3 && <WorkflowSection />}

      {/* Edit Dialog */}
      <EditCaseDialog />
    </Box>
  );
};

export default CaseDetailView;
