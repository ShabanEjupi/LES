import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogContent,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Divider,
  Stack
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  FileDownload as DownloadIcon,
  FileUpload as UploadIcon,
  FileCopy as CopyIcon,
  CheckCircle as ApproveIcon
} from '@mui/icons-material';
import MainLayout from '../../components/layout/MainLayout';
import type {
  DocumentTemplate,
  TemplateSearchFilters,
  TemplateStatus,
  TemplateType,
  TemplateCategory,
  TemplatePriority,
  TemplateStatistics
} from '../../types/DocumentTemplates';
import { documentTemplateService } from '../../services/documentTemplateService.ts';
import TemplateCreationDialog from '../../components/documents/TemplateCreationDialog';
import TemplateApprovalDialog from '../../components/documents/TemplateApprovalDialog';
import TemplatePreviewDialog from '../../components/documents/TemplatePreviewDialog';
import '../../styles/classic-theme.css';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`template-tabpanel-${index}`}
      aria-labelledby={`template-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export const DocumentTemplates: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [templates, setTemplates] = useState<DocumentTemplate[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<DocumentTemplate[]>([]);
  const [statistics, setStatistics] = useState<TemplateStatistics | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'view' | 'create' | 'edit' | 'approve'>('view');

  // Search and Filter State
  const [searchFilters, setSearchFilters] = useState<TemplateSearchFilters>({
    search: '',
    status: undefined,
    type: undefined,
    category: undefined,
    priority: undefined
  });

  const loadTemplates = React.useCallback(async () => {
    try {
      const data = await documentTemplateService.getTemplates(searchFilters);
      setTemplates(data);
    } catch (error) {
      console.error('Error loading templates:', error);
    }
  }, [searchFilters]);

  const loadStatistics = React.useCallback(async () => {
    try {
      const stats = await documentTemplateService.getStatistics();
      setStatistics(stats);
    } catch (error) {
      console.error('Error loading statistics:', error);
    }
  }, []);

  const applyFilters = React.useCallback(() => {
    let filtered = templates;

    if (searchFilters.search) {
      const searchTerm = searchFilters.search.toLowerCase();
      filtered = filtered.filter(
        template =>
          template.name.toLowerCase().includes(searchTerm) ||
          template.description.toLowerCase().includes(searchTerm) ||
          template.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    if (searchFilters.status) {
      filtered = filtered.filter(template => template.status === searchFilters.status);
    }

    if (searchFilters.type) {
      filtered = filtered.filter(template => template.type === searchFilters.type);
    }

    if (searchFilters.category) {
      filtered = filtered.filter(template => template.category === searchFilters.category);
    }

    if (searchFilters.priority) {
      filtered = filtered.filter(template => template.priority === searchFilters.priority);
    }

    setFilteredTemplates(filtered);
  }, [templates, searchFilters]);

  useEffect(() => {
    loadTemplates();
    loadStatistics();
  }, [loadTemplates, loadStatistics]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleCreateTemplate = () => {
    setSelectedTemplate(null);
    setDialogType('create');
    setDialogOpen(true);
  };

  const handleEditTemplate = (template: DocumentTemplate) => {
    setSelectedTemplate(template);
    setDialogType('edit');
    setDialogOpen(true);
  };

  const handleViewTemplate = (template: DocumentTemplate) => {
    setSelectedTemplate(template);
    setDialogType('view');
    setDialogOpen(true);
  };

  const handleApproveTemplate = (template: DocumentTemplate) => {
    setSelectedTemplate(template);
    setDialogType('approve');
    setDialogOpen(true);
  };

  const handleDeleteTemplate = async (templateId: string) => {
    if (window.confirm('Jeni të sigurt që dëshironi të fshini këtë shabll?')) {
      try {
        await documentTemplateService.deleteTemplate(templateId);
        await loadTemplates();
      } catch (error) {
        console.error('Error deleting template:', error);
      }
    }
  };

  const getStatusColor = (status: TemplateStatus): "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" => {
    switch (status) {
      case 'ACTIVE': return 'success';
      case 'APPROVED': return 'primary';
      case 'UNDER_REVIEW': return 'warning';
      case 'DRAFT': return 'default';
      case 'DEPRECATED': return 'error';
      case 'ARCHIVED': return 'secondary';
      case 'SUSPENDED': return 'error';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority: TemplatePriority): "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" => {
    switch (priority) {
      case 'CRITICAL': return 'error';
      case 'URGENT': return 'warning';
      case 'HIGH': return 'primary';
      case 'MEDIUM': return 'info';
      case 'LOW': return 'default';
      default: return 'default';
    }
  };

  // Statistics Cards Component
  const StatisticsCards = () => (
    <Stack direction="row" spacing={3} sx={{ mb: 3 }}>
      <Card className="classic-card" sx={{ flex: 1 }}>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            Shabllonet Gjithsej
          </Typography>
          <Typography variant="h4" component="div">
            {statistics?.totalTemplates || 0}
          </Typography>
        </CardContent>
      </Card>
      <Card className="classic-card" sx={{ flex: 1 }}>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            Aktive
          </Typography>
          <Typography variant="h4" component="div" color="success.main">
            {statistics?.activeTemplates || 0}
          </Typography>
        </CardContent>
      </Card>
      <Card className="classic-card" sx={{ flex: 1 }}>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            Në Pritje të Miratimit
          </Typography>
          <Typography variant="h4" component="div" color="warning.main">
            {statistics?.templatesAwaitingApproval || 0}
          </Typography>
        </CardContent>
      </Card>
      <Card className="classic-card" sx={{ flex: 1 }}>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            Më të Përdorurat
          </Typography>
          <Typography variant="h4" component="div" color="primary.main">
            {statistics?.mostUsedTemplates?.length || 0}
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  );

  // Filter Panel Component
  const FilterPanel = () => (
    <Paper className="classic-panel" sx={{ p: 2, mb: 2 }}>
      <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
        <Box sx={{ minWidth: 250 }}>
          <TextField
            fullWidth
            label="Kërko Shabllonet"
            variant="outlined"
            size="small"
            value={searchFilters.search || ''}
            onChange={(e) => setSearchFilters(prev => ({ ...prev, search: e.target.value }))}
            className="classic-textfield"
          />
        </Box>
        <Box sx={{ minWidth: 150 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Statusi</InputLabel>
            <Select
              value={searchFilters.status || ''}
              label="Statusi"
              onChange={(e) => setSearchFilters(prev => ({ ...prev, status: e.target.value as TemplateStatus || undefined }))}
              className="classic-select"
            >
              <MenuItem value="">Të gjitha</MenuItem>
              <MenuItem value="ACTIVE">Aktive</MenuItem>
              <MenuItem value="APPROVED">E Miratuar</MenuItem>
              <MenuItem value="UNDER_REVIEW">Në Shqyrtim</MenuItem>
              <MenuItem value="DRAFT">Projekt</MenuItem>
              <MenuItem value="DEPRECATED">E Vjetëruar</MenuItem>
              <MenuItem value="ARCHIVED">E Arkivuar</MenuItem>
              <MenuItem value="SUSPENDED">E Pezulluar</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 200 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Lloji</InputLabel>
            <Select
              value={searchFilters.type || ''}
              label="Lloji"
              onChange={(e) => setSearchFilters(prev => ({ ...prev, type: e.target.value as TemplateType || undefined }))}
              className="classic-select"
            >
              <MenuItem value="">Të gjitha</MenuItem>
              <MenuItem value="VIOLATION_REPORT">Raporti i Kundërvajtjes</MenuItem>
              <MenuItem value="FINE_NOTICE">Njoftimi i Gjobës</MenuItem>
              <MenuItem value="CUSTOMS_DECLARATION">Deklarata Doganore</MenuItem>
              <MenuItem value="INSPECTION_REPORT">Raporti i Inspektimit</MenuItem>
              <MenuItem value="SEIZURE_REPORT">Raporti i Sekuestrimit</MenuItem>
              <MenuItem value="ADMINISTRATIVE_DECISION">Vendimi Administrativ</MenuItem>
              <MenuItem value="APPEAL_FORM">Formulari i Ankesës</MenuItem>
              <MenuItem value="COURT_SUBMISSION">Dorëzimi në Gjykatë</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 200 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Kategoria</InputLabel>
            <Select
              value={searchFilters.category || ''}
              label="Kategoria"
              onChange={(e) => setSearchFilters(prev => ({ ...prev, category: e.target.value as TemplateCategory || undefined }))}
              className="classic-select"
            >
              <MenuItem value="">Të gjitha</MenuItem>
              <MenuItem value="LEGAL_DOCUMENTS">Dokumentet Ligjore</MenuItem>
              <MenuItem value="ADMINISTRATIVE_FORMS">Formularët Administrativë</MenuItem>
              <MenuItem value="VIOLATION_PROCESSING">Përpunimi i Kundërvajtjeve</MenuItem>
              <MenuItem value="COURT_SUBMISSIONS">Dorëzimet në Gjykatë</MenuItem>
              <MenuItem value="NOTIFICATIONS">Njoftimet</MenuItem>
              <MenuItem value="REPORTS">Raportet</MenuItem>
              <MenuItem value="CERTIFICATES">Certifikatat</MenuItem>
              <MenuItem value="CORRESPONDENCE">Korrespondenca</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateTemplate}
            className="classic-button-primary"
            size="small"
          >
            Shabllo i Ri
          </Button>
          <Button
            variant="outlined"
            startIcon={<UploadIcon />}
            className="classic-button"
            size="small"
          >
            Importo
          </Button>
        </Box>
      </Stack>
    </Paper>
  );

  // Templates Table Component
  const TemplatesTable = () => (
    <TableContainer component={Paper} className="classic-table-container">
      <Table size="small">
        <TableHead className="classic-table-header">
          <TableRow>
            <TableCell>Emri i Shabllonit</TableCell>
            <TableCell>Lloji</TableCell>
            <TableCell>Kategoria</TableCell>
            <TableCell>Statusi</TableCell>
            <TableCell>Përparësia</TableCell>
            <TableCell>Versioni</TableCell>
            <TableCell>I Përdorur</TableCell>
            <TableCell>Veprimet</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredTemplates.map((template) => (
            <TableRow key={template.id} className="classic-table-row">
              <TableCell>
                <Box>
                  <Typography variant="body2" fontWeight="medium">
                    {template.name}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {template.templateNumber}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>{template.type}</TableCell>
              <TableCell>{template.category}</TableCell>
              <TableCell>
                <Chip
                  label={template.status}
                  color={getStatusColor(template.status)}
                  size="small"
                  className="classic-chip"
                />
              </TableCell>
              <TableCell>
                <Chip
                  label={template.priority}
                  color={getPriorityColor(template.priority)}
                  size="small"
                  className="classic-chip"
                />
              </TableCell>
              <TableCell>{template.version}</TableCell>
              <TableCell>{template.usageCount}</TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  <Tooltip title="Shiko">
                    <IconButton
                      size="small"
                      onClick={() => handleViewTemplate(template)}
                      className="classic-icon-button"
                    >
                      <ViewIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Ndrysho">
                    <IconButton
                      size="small"
                      onClick={() => handleEditTemplate(template)}
                      className="classic-icon-button"
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Kopjo">
                    <IconButton
                      size="small"
                      className="classic-icon-button"
                    >
                      <CopyIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Shkarko">
                    <IconButton
                      size="small"
                      className="classic-icon-button"
                    >
                      <DownloadIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  {template.status === 'UNDER_REVIEW' && (
                    <Tooltip title="Miraton">
                      <IconButton
                        size="small"
                        onClick={() => handleApproveTemplate(template)}
                        className="classic-icon-button"
                        color="success"
                      >
                        <ApproveIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                  <Tooltip title="Fshi">
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteTemplate(template.id)}
                      className="classic-icon-button"
                      color="error"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <MainLayout>
      <Box className="classic-page">
        <Typography variant="h4" className="classic-page-title" gutterBottom>
          🏛️ Shabllonet e Dokumenteve
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" paragraph>
          Menaxhimi i shablloneve të dokumenteve për Administrtatën Doganore të Shqipërisë
        </Typography>

        <Divider className="classic-divider" />

        {/* Statistics Overview */}
        <StatisticsCards />

        {/* Main Content Tabs */}
        <Paper className="classic-paper">
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            className="classic-tabs"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Të Gjitha Shabllonet" />
            <Tab label="Draftet e Mia" />
            <Tab label="Në Pritje të Miratimit" />
            <Tab label="Të Arkivuara" />
          </Tabs>

          <TabPanel value={activeTab} index={0}>
            <FilterPanel />
            <TemplatesTable />
          </TabPanel>

          <TabPanel value={activeTab} index={1}>
            <FilterPanel />
            <TemplatesTable />
          </TabPanel>

          <TabPanel value={activeTab} index={2}>
            <FilterPanel />
            <TemplatesTable />
          </TabPanel>

          <TabPanel value={activeTab} index={3}>
            <FilterPanel />
            <TemplatesTable />
          </TabPanel>
        </Paper>

        {/* Template Dialog */}
        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          maxWidth="lg"
          fullWidth
          className="classic-dialog"
        >
          <DialogContent className="classic-dialog-content" sx={{ p: 0 }}>
            {dialogType === 'view' && selectedTemplate && (
              <TemplatePreviewDialog
                template={selectedTemplate}
                onEdit={() => {
                  setDialogType('edit');
                }}
                onClose={() => setDialogOpen(false)}
                canEdit={true}
              />
            )}
            {(dialogType === 'create' || dialogType === 'edit') && (
              <TemplateCreationDialog
                template={dialogType === 'edit' ? selectedTemplate || undefined : undefined}
                onSave={async (templateData) => {
                  try {
                    if (dialogType === 'edit' && selectedTemplate) {
                      await documentTemplateService.updateTemplate(selectedTemplate.id, templateData);
                    } else {
                      await documentTemplateService.createTemplate(templateData);
                    }
                    await loadTemplates();
                    setDialogOpen(false);
                  } catch (error) {
                    console.error('Error saving template:', error);
                  }
                }}
                onCancel={() => setDialogOpen(false)}
                isEdit={dialogType === 'edit'}
              />
            )}
            {dialogType === 'approve' && selectedTemplate && (
              <TemplateApprovalDialog
                template={selectedTemplate}
                onApprove={async (stepId, comments) => {
                  try {
                    await documentTemplateService.approveTemplate(selectedTemplate.id, stepId, comments);
                    await loadTemplates();
                    setDialogOpen(false);
                  } catch (error) {
                    console.error('Error approving template:', error);
                  }
                }}
                onReject={async (stepId, comments) => {
                  try {
                    await documentTemplateService.rejectTemplate(selectedTemplate.id, stepId, comments);
                    await loadTemplates();
                    setDialogOpen(false);
                  } catch (error) {
                    console.error('Error rejecting template:', error);
                  }
                }}
                onRequestChanges={async (stepId, comments) => {
                  try {
                    await documentTemplateService.rejectTemplate(selectedTemplate.id, stepId, comments);
                    await loadTemplates();
                    setDialogOpen(false);
                  } catch (error) {
                    console.error('Error requesting changes:', error);
                  }
                }}
                onClose={() => setDialogOpen(false)}
                currentUserRole="Supervisor" // This should come from auth context
              />
            )}
          </DialogContent>
        </Dialog>
      </Box>
    </MainLayout>
  );
};

export default DocumentTemplates;
