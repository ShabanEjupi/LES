// Template Preview Dialog - Albanian Customs Administration (LES)
// Dialog për Shikimin e Shablloneve - Administrata Doganore e Shqipërisë

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Tab,
  Tabs,
  Card,
  CardContent,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Download as DownloadIcon,
  Print as PrintIcon,
  FileCopy as CopyIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import type {
  DocumentTemplate,
  TemplateField,
  TemplateSection
} from '../../types/DocumentTemplates';

interface TemplatePreviewDialogProps {
  template: DocumentTemplate;
  onEdit?: () => void;
  onClose: () => void;
  canEdit?: boolean;
}

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
      id={`preview-tabpanel-${index}`}
      aria-labelledby={`preview-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 2 }}>{children}</Box>}
    </div>
  );
}

const TemplatePreviewDialog: React.FC<TemplatePreviewDialogProps> = ({
  template,
  onEdit,
  onClose,
  canEdit = false
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const getStatusColor = (status: string) => {
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'CRITICAL': return 'error';
      case 'URGENT': return 'warning';
      case 'HIGH': return 'primary';
      case 'MEDIUM': return 'info';
      case 'LOW': return 'default';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'Aktive';
      case 'APPROVED': return 'E Miratuar';
      case 'UNDER_REVIEW': return 'Në Shqyrtim';
      case 'DRAFT': return 'Projekt';
      case 'DEPRECATED': return 'E Vjetëruar';
      case 'ARCHIVED': return 'E Arkivuar';
      case 'SUSPENDED': return 'E Pezulluar';
      default: return status;
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'CRITICAL': return 'Kritike';
      case 'URGENT': return 'Urgjente';
      case 'HIGH': return 'E Lartë';
      case 'MEDIUM': return 'Mesatare';
      case 'LOW': return 'E Ulët';
      default: return priority;
    }
  };

  const getFieldTypeLabel = (type: string) => {
    switch (type) {
      case 'TEXT': return 'Tekst';
      case 'NUMBER': return 'Numër';
      case 'DATE': return 'Data';
      case 'DATETIME': return 'Data dhe Ora';
      case 'EMAIL': return 'Email';
      case 'PHONE': return 'Telefon';
      case 'DROPDOWN': return 'Lista';
      case 'CHECKBOX': return 'Checkbox';
      case 'TEXTAREA': return 'Zona Teksti';
      case 'FILE_UPLOAD': return 'Ngarkim Skedari';
      case 'SIGNATURE': return 'Nënshkrim';
      default: return type;
    }
  };

  const handleDownload = () => {
    // Implementation for downloading template
    console.log('Downloading template:', template.id);
  };

  const handlePrint = () => {
    // Implementation for printing template
    window.print();
  };

  const handleCopy = () => {
    // Implementation for copying template
    console.log('Copying template:', template.id);
  };

  // Template Information Tab
  const InformationTab = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card className="classic-card">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Informacioni Bazë
            </Typography>
            <Box sx={{ display: 'grid', gap: 2 }}>
              <Box>
                <Typography variant="body2" color="textSecondary">
                  Emri i Shabllonit
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {template.name}
                </Typography>
              </Box>
              {template.nameEn && (
                <Box>
                  <Typography variant="body2" color="textSecondary">
                    Emri në Anglisht
                  </Typography>
                  <Typography variant="body1">
                    {template.nameEn}
                  </Typography>
                </Box>
              )}
              <Box>
                <Typography variant="body2" color="textSecondary">
                  Numri i Shabllonit
                </Typography>
                <Typography variant="body1" fontFamily="monospace">
                  {template.templateNumber}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="textSecondary">
                  Përshkrimi
                </Typography>
                <Typography variant="body1">
                  {template.description}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card className="classic-card">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Kategorizimi
            </Typography>
            <Box sx={{ display: 'grid', gap: 2 }}>
              <Box>
                <Typography variant="body2" color="textSecondary">
                  Statusi
                </Typography>
                <Chip
                  label={getStatusLabel(template.status)}
                  color={getStatusColor(template.status) as 'success' | 'primary' | 'warning' | 'default' | 'error' | 'secondary'}
                  size="small"
                />
              </Box>
              <Box>
                <Typography variant="body2" color="textSecondary">
                  Prioriteti
                </Typography>
                <Chip
                  label={getPriorityLabel(template.priority)}
                  color={getPriorityColor(template.priority) as 'error' | 'warning' | 'primary' | 'info' | 'default'}
                  size="small"
                />
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
                  Kategoria
                </Typography>
                <Typography variant="body1">
                  {template.category}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card className="classic-card">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Metadata
            </Typography>
            <Box sx={{ display: 'grid', gap: 2 }}>
              <Box>
                <Typography variant="body2" color="textSecondary">
                  Versioni
                </Typography>
                <Typography variant="body1" fontFamily="monospace">
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
              <Box>
                <Typography variant="body2" color="textSecondary">
                  Data e Krijimit
                </Typography>
                <Typography variant="body1">
                  {template.createdAt.toLocaleDateString('sq-AL')}
                </Typography>
              </Box>
              {template.lastUsed && (
                <Box>
                  <Typography variant="body2" color="textSecondary">
                    Përdorur për herë të fundit
                  </Typography>
                  <Typography variant="body1">
                    {template.lastUsed.toLocaleDateString('sq-AL')}
                  </Typography>
                </Box>
              )}
              <Box>
                <Typography variant="body2" color="textSecondary">
                  Përdorur {template.usageCount} herë
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card className="classic-card">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Siguria dhe Qasja
            </Typography>
            <Box sx={{ display: 'grid', gap: 2 }}>
              <Box>
                <Typography variant="body2" color="textSecondary">
                  Rolet e Lejuara
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                  {template.allowedRoles.map((role) => (
                    <Chip key={role} label={role} size="small" variant="outlined" />
                  ))}
                </Box>
              </Box>
              <Box>
                <Typography variant="body2" color="textSecondary">
                  Kërkon Miratim
                </Typography>
                <Chip
                  label={template.requiresApproval ? 'Po' : 'Jo'}
                  color={template.requiresApproval ? 'warning' : 'success'}
                  size="small"
                />
              </Box>
              {template.legalBasis && (
                <Box>
                  <Typography variant="body2" color="textSecondary">
                    Baza Ligjore
                  </Typography>
                  <Typography variant="body1">
                    {template.legalBasis}
                  </Typography>
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {(template.tags.length > 0 || template.keywords.length > 0) && (
        <Grid item xs={12}>
          <Card className="classic-card">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Etiketat dhe Fjalët Kyçe
              </Typography>
              {template.tags.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Etiketat
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {template.tags.map((tag) => (
                      <Chip key={tag} label={tag} size="small" color="primary" />
                    ))}
                  </Box>
                </Box>
              )}
              {template.keywords.length > 0 && (
                <Box>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Fjalët Kyçe
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {template.keywords.map((keyword) => (
                      <Chip key={keyword} label={keyword} size="small" variant="outlined" />
                    ))}
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      )}
    </Grid>
  );

  // Template Structure Tab
  const StructureTab = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Struktura e Shabllonit
      </Typography>
      
      {template.sections && template.sections.length > 0 ? (
        template.sections.map((section: TemplateSection, index: number) => (
          <Card key={section.id} sx={{ mb: 2 }} className="classic-card">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {index + 1}. {section.title}
                {section.titleEn && (
                  <Typography variant="body2" color="textSecondary" component="span">
                    {' '}({section.titleEn})
                  </Typography>
                )}
              </Typography>
              
              {section.description && (
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                  {section.description}
                </Typography>
              )}

              {section.fields && section.fields.length > 0 ? (
                <List dense>
                  {section.fields.map((field: TemplateField, fieldIndex: number) => (
                    <ListItem key={field.id} divider={fieldIndex < section.fields.length - 1}>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="subtitle2">
                              {field.name}
                            </Typography>
                            {field.required && (
                              <Chip label="I detyrueshëm" size="small" color="error" />
                            )}
                            <Chip
                              label={getFieldTypeLabel(field.type)}
                              size="small"
                              variant="outlined"
                            />
                          </Box>
                        }
                        secondary={
                          <Box>
                            {field.nameEn && (
                              <Typography variant="body2" color="textSecondary">
                                Anglisht: {field.nameEn}
                              </Typography>
                            )}
                            {field.placeholder && (
                              <Typography variant="body2" color="textSecondary">
                                Placeholder: {field.placeholder}
                              </Typography>
                            )}
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="textSecondary" fontStyle="italic">
                  Nuk ka fusha të përcaktuara në këtë seksion.
                </Typography>
              )}
            </CardContent>
          </Card>
        ))
      ) : (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body1" color="textSecondary">
            Ky shablloni nuk ka seksione të strukturuara.
          </Typography>
        </Paper>
      )}
    </Box>
  );

  // HTML Content Tab
  const ContentTab = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Përmbajtja HTML
      </Typography>
      
      {template.header && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Kreu
          </Typography>
          <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
            <Typography
              variant="body2"
              component="pre"
              sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', overflow: 'auto' }}
            >
              {template.header}
            </Typography>
          </Paper>
        </Box>
      )}

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Përmbajtja Kryesore
        </Typography>
        <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
          <Typography
            variant="body2"
            component="pre"
            sx={{ 
              fontFamily: 'monospace', 
              whiteSpace: 'pre-wrap', 
              overflow: 'auto',
              maxHeight: '400px'
            }}
          >
            {template.htmlTemplate}
          </Typography>
        </Paper>
      </Box>

      {template.footer && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Fundi
          </Typography>
          <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
            <Typography
              variant="body2"
              component="pre"
              sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', overflow: 'auto' }}
            >
              {template.footer}
            </Typography>
          </Paper>
        </Box>
      )}

      {template.cssStyles && (
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            CSS Stilet
          </Typography>
          <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
            <Typography
              variant="body2"
              component="pre"
              sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', overflow: 'auto' }}
            >
              {template.cssStyles}
            </Typography>
          </Paper>
        </Box>
      )}
    </Box>
  );

  return (
    <Box>
      {/* Header with Actions */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" component="h2">
          {template.name}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Shkarko">
            <IconButton onClick={handleDownload} size="small">
              <DownloadIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Printo">
            <IconButton onClick={handlePrint} size="small">
              <PrintIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Kopjo">
            <IconButton onClick={handleCopy} size="small">
              <CopyIcon />
            </IconButton>
          </Tooltip>
          {canEdit && onEdit && (
            <Tooltip title="Ndrysho">
              <IconButton onClick={onEdit} size="small" color="primary">
                <EditIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Informacioni" />
          <Tab label="Struktura" />
          <Tab label="Përmbajtja" />
        </Tabs>
      </Box>

      <TabPanel value={activeTab} index={0}>
        <InformationTab />
      </TabPanel>

      <TabPanel value={activeTab} index={1}>
        <StructureTab />
      </TabPanel>

      <TabPanel value={activeTab} index={2}>
        <ContentTab />
      </TabPanel>

      <Divider sx={{ my: 2 }} />

      {/* Footer Actions */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          onClick={onClose}
          className="classic-button"
        >
          Mbyll
        </Button>
        
        {canEdit && onEdit && (
          <Button
            variant="contained"
            onClick={onEdit}
            startIcon={<EditIcon />}
            className="classic-button-primary"
          >
            Ndrysho Shabllonin
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default TemplatePreviewDialog;
