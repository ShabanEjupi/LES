// Template Creation Dialog - Albanian Customs Administration (LES)
// Dialog për Krijimin e Shablloneve - Administrata Doganore e Shqipërisë

import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Divider,
  Card,
  CardContent,
  IconButton,
  Chip,
  Button,
  Switch,
  FormControlLabel,
  Alert,
  Tab,
  Tabs
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Preview as PreviewIcon
} from '@mui/icons-material';
import type {
  DocumentTemplate,
  TemplateType,
  TemplateCategory,
  TemplatePriority,
  TemplateField,
  TemplateSection,
  TemplateFieldType
} from '../../types/DocumentTemplates';

interface TemplateCreationDialogProps {
  template?: DocumentTemplate;
  onSave: (template: Partial<DocumentTemplate>) => Promise<void>;
  onCancel: () => void;
  isEdit?: boolean;
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
      id={`template-tabpanel-${index}`}
      aria-labelledby={`template-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const TemplateCreationDialog: React.FC<TemplateCreationDialogProps> = ({
  template,
  onSave,
  onCancel,
  isEdit = false
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [templateData, setTemplateData] = useState<Partial<DocumentTemplate>>({
    name: '',
    nameEn: '',
    description: '',
    type: 'VIOLATION_REPORT',
    category: 'VIOLATION_PROCESSING',
    status: 'DRAFT',
    priority: 'MEDIUM',
    sections: [],
    htmlTemplate: '',
    cssStyles: '',
    header: '',
    footer: '',
    requiresApproval: true,
    allowedRoles: ['Officer'],
    tags: [],
    keywords: [],
    legalBasis: '',
    complianceNotes: ''
  });

  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    if (template && isEdit) {
      setTemplateData(template);
    }
  }, [template, isEdit]);

  const handleInputChange = (field: keyof DocumentTemplate, value: string | boolean | string[] | TemplateSection[] | TemplateType | TemplateCategory | TemplatePriority) => {
    setTemplateData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTagsChange = (tagsString: string) => {
    const tags = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    handleInputChange('tags', tags);
  };

  const handleKeywordsChange = (keywordsString: string) => {
    const keywords = keywordsString.split(',').map(keyword => keyword.trim()).filter(keyword => keyword.length > 0);
    handleInputChange('keywords', keywords);
  };

  const addSection = () => {
    const newSection: TemplateSection = {
      id: `section-${Date.now()}`,
      title: 'Seksioni i Ri',
      titleEn: 'New Section',
      description: '',
      order: (templateData.sections?.length || 0) + 1,
      fields: [],
      collapsible: false,
      defaultCollapsed: false
    };

    handleInputChange('sections', [...(templateData.sections || []), newSection]);
  };

  const updateSection = (sectionId: string, updates: Partial<TemplateSection>) => {
    const updatedSections = templateData.sections?.map(section =>
      section.id === sectionId ? { ...section, ...updates } : section
    ) || [];
    handleInputChange('sections', updatedSections);
  };

  const deleteSection = (sectionId: string) => {
    const filteredSections = templateData.sections?.filter(section => section.id !== sectionId) || [];
    handleInputChange('sections', filteredSections);
  };

  const addFieldToSection = (sectionId: string) => {
    const newField: TemplateField = {
      id: `field-${Date.now()}`,
      name: 'Fushë e Re',
      nameEn: 'New Field',
      type: 'TEXT',
      required: false,
      placeholder: ''
    };

    const updatedSections = templateData.sections?.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          fields: [...section.fields, newField]
        };
      }
      return section;
    }) || [];

    handleInputChange('sections', updatedSections);
  };

  const updateField = (sectionId: string, fieldId: string, updates: Partial<TemplateField>) => {
    const updatedSections = templateData.sections?.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          fields: section.fields.map(field =>
            field.id === fieldId ? { ...field, ...updates } : field
          )
        };
      }
      return section;
    }) || [];

    handleInputChange('sections', updatedSections);
  };

  const deleteField = (sectionId: string, fieldId: string) => {
    const updatedSections = templateData.sections?.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          fields: section.fields.filter(field => field.id !== fieldId)
        };
      }
      return section;
    }) || [];

    handleInputChange('sections', updatedSections);
  };

  const validateTemplate = (): boolean => {
    const errors: string[] = [];

    if (!templateData.name?.trim()) {
      errors.push('Emri i shabllonit është i detyrueshëm');
    }

    if (!templateData.description?.trim()) {
      errors.push('Përshkrimi është i detyrueshëm');
    }

    if (!templateData.htmlTemplate?.trim()) {
      errors.push('Përmbajtja HTML është e detyrueshme');
    }

    if (!templateData.allowedRoles?.length) {
      errors.push('Duhet të specifikoni të paktën një rol të lejuar');
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSave = async () => {
    if (!validateTemplate()) {
      return;
    }

    try {
      await onSave(templateData);
    } catch (error) {
      console.error('Error saving template:', error);
    }
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

// Basic Information Tab
  const BasicInformationTab = () => (
    <Grid2 container spacing={3}>
      <Grid2 xs={12} md={6}>
        <TextField
          fullWidth
          label="Emri i Shabllonit *"
          value={templateData.name || ''}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className="classic-textfield"
        />
      </Grid2>
      <Grid2 xs={12} md={6}>
        <TextField
          fullWidth
          label="Emri në Anglisht"
          value={templateData.nameEn || ''}
          onChange={(e) => handleInputChange('nameEn', e.target.value)}
          className="classic-textfield"
        />
      </Grid2>
      <Grid2 xs={12}>
        <TextField
          fullWidth
          multiline
          rows={3}
          label="Përshkrimi *"
          value={templateData.description || ''}
          onChange={(e) => handleInputChange('description', e.target.value)}
          className="classic-textfield"
        />
      </Grid2>
      <Grid2 xs={12} md={4}>
        <FormControl fullWidth>
          <InputLabel>Lloji i Shabllonit</InputLabel>
          <Select
            value={templateData.type || 'VIOLATION_REPORT'}
            label="Lloji i Shabllonit"
            onChange={(e) => handleInputChange('type', e.target.value as TemplateType)}
            className="classic-select"
          >
            <MenuItem value="VIOLATION_REPORT">Raporti i Kundërvajtjes</MenuItem>
            <MenuItem value="FINE_NOTICE">Njoftimi i Gjobës</MenuItem>
            <MenuItem value="CUSTOMS_DECLARATION">Deklarata Doganore</MenuItem>
            <MenuItem value="INSPECTION_REPORT">Raporti i Inspektimit</MenuItem>
            <MenuItem value="SEIZURE_REPORT">Raporti i Sekuestrimit</MenuItem>
            <MenuItem value="ADMINISTRATIVE_DECISION">Vendimi Administrativ</MenuItem>
            <MenuItem value="APPEAL_FORM">Formulari i Ankesës</MenuItem>
            <MenuItem value="COURT_SUBMISSION">Dorëzimi në Gjykatë</MenuItem>
            <MenuItem value="NOTIFICATION_LETTER">Letra e Njoftimit</MenuItem>
            <MenuItem value="COMPLIANCE_CERTIFICATE">Certifikata e Përputhshmërisë</MenuItem>
          </Select>
        </FormControl>
      </Grid2>
      <Grid2 xs={12} md={4}>
        <FormControl fullWidth>
          <InputLabel>Kategoria</InputLabel>
          <Select
            value={templateData.category || 'VIOLATION_PROCESSING'}
            label="Kategoria"
            onChange={(e) => handleInputChange('category', e.target.value as TemplateCategory)}
            className="classic-select"
          >
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
      </Grid2>
      <Grid2 xs={12} md={4}>
        <FormControl fullWidth>
          <InputLabel>Prioriteti</InputLabel>
          <Select
            value={templateData.priority || 'MEDIUM'}
            label="Prioriteti"
            onChange={(e) => handleInputChange('priority', e.target.value as TemplatePriority)}
            className="classic-select"
          >
            <MenuItem value="LOW">E ulët</MenuItem>
            <MenuItem value="MEDIUM">Mesatare</MenuItem>
            <MenuItem value="HIGH">E lartë</MenuItem>
            <MenuItem value="URGENT">Urgjente</MenuItem>
            <MenuItem value="CRITICAL">Kritike</MenuItem>
          </Select>
        </FormControl>
      </Grid2>
      <Grid2 xs={12} md={6}>
        <TextField
          fullWidth
          label="Etiketat (ndarë me presje)"
          value={templateData.tags?.join(', ') || ''}
          onChange={(e) => handleTagsChange(e.target.value)}
          placeholder="kundërvajtje, doganë, raport"
          className="classic-textfield"
        />
      </Grid2>
      <Grid2 xs={12} md={6}>
        <TextField
          fullWidth
          label="Fjalët kyçe (ndarë me presje)"
          value={templateData.keywords?.join(', ') || ''}
          onChange={(e) => handleKeywordsChange(e.target.value)}
          placeholder="violation, customs, report"
          className="classic-textfield"
        />
      </Grid2>
      <Grid2 xs={12} md={6}>
        <TextField
          fullWidth
          label="Baza Ligjore"
          value={templateData.legalBasis || ''}
          onChange={(e) => handleInputChange('legalBasis', e.target.value)}
          className="classic-textfield"
        />
      </Grid2>
      <Grid2 xs={12} md={6}>
        <FormControlLabel
          control={
            <Switch
              checked={templateData.requiresApproval || false}
              onChange={(e) => handleInputChange('requiresApproval', e.target.checked)}
            />
          }
          label="Kërkon Miratim"
        />
      </Grid2>
    </Grid2>
  );

  // Template Content Tab
  const TemplateContentTab = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Kreu i Dokumentit"
          value={templateData.header || ''}
          onChange={(e) => handleInputChange('header', e.target.value)}
          placeholder="HTML për kreun e dokumentit..."
          className="classic-textfield"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          multiline
          rows={12}
          label="Përmbajtja HTML *"
          value={templateData.htmlTemplate || ''}
          onChange={(e) => handleInputChange('htmlTemplate', e.target.value)}
          placeholder="Shkruani përmbajtjen HTML të shabllonit këtu..."
          className="classic-textfield"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Fundi i Dokumentit"
          value={templateData.footer || ''}
          onChange={(e) => handleInputChange('footer', e.target.value)}
          placeholder="HTML për fundin e dokumentit..."
          className="classic-textfield"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="CSS Stilet"
          value={templateData.cssStyles || ''}
          onChange={(e) => handleInputChange('cssStyles', e.target.value)}
          placeholder="CSS stilet e personalizuara për shabllonin..."
          className="classic-textfield"
        />
      </Grid>
    </Grid>
  );

  // Fields and Sections Tab
  const FieldsAndSectionsTab = () => (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Seksionet dhe Fushat</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={addSection}
          className="classic-button-primary"
        >
          Shto Seksion
        </Button>
      </Box>

      {templateData.sections?.map((section, sectionIndex) => (
        <Card key={section.id} sx={{ mb: 2 }} className="classic-card">
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Seksioni {sectionIndex + 1}</Typography>
              <Box>
                <IconButton
                  size="small"
                  onClick={() => addFieldToSection(section.id)}
                  title="Shto Fushë"
                >
                  <AddIcon />
                </IconButton>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => deleteSection(section.id)}
                  title="Fshi Seksionin"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="Titulli"
                  value={section.title}
                  onChange={(e) => updateSection(section.id, { title: e.target.value })}
                  className="classic-textfield"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="Titulli në Anglisht"
                  value={section.titleEn || ''}
                  onChange={(e) => updateSection(section.id, { titleEn: e.target.value })}
                  className="classic-textfield"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  label="Përshkrimi"
                  value={section.description || ''}
                  onChange={(e) => updateSection(section.id, { description: e.target.value })}
                  className="classic-textfield"
                />
              </Grid>
            </Grid>

            {/* Fields in this section */}
            {section.fields.map((field, fieldIndex) => (
              <Card key={field.id} sx={{ mt: 2, ml: 2 }} variant="outlined">
                <CardContent sx={{ py: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle2">Fusha {fieldIndex + 1}</Typography>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => deleteField(section.id, field.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  <Grid container spacing={1}>
                    <Grid item xs={12} md={3}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Emri"
                        value={field.name}
                        onChange={(e) => updateField(section.id, field.id, { name: e.target.value })}
                        className="classic-textfield"
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <FormControl fullWidth size="small">
                        <InputLabel>Lloji</InputLabel>
                        <Select
                          value={field.type}
                          label="Lloji"
                          onChange={(e) => updateField(section.id, field.id, { type: e.target.value as TemplateFieldType })}
                          className="classic-select"
                        >
                          <MenuItem value="TEXT">Tekst</MenuItem>
                          <MenuItem value="NUMBER">Numër</MenuItem>
                          <MenuItem value="DATE">Data</MenuItem>
                          <MenuItem value="DATETIME">Data dhe Ora</MenuItem>
                          <MenuItem value="EMAIL">Email</MenuItem>
                          <MenuItem value="PHONE">Telefon</MenuItem>
                          <MenuItem value="DROPDOWN">Lista</MenuItem>
                          <MenuItem value="CHECKBOX">Checkbox</MenuItem>
                          <MenuItem value="TEXTAREA">Zona Teksti</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Placeholder"
                        value={field.placeholder || ''}
                        onChange={(e) => updateField(section.id, field.id, { placeholder: e.target.value })}
                        className="classic-textfield"
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <FormControlLabel
                        control={
                          <Switch
                            size="small"
                            checked={field.required}
                            onChange={(e) => updateField(section.id, field.id, { required: e.target.checked })}
                          />
                        }
                        label="I detyrueshëm"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      ))}
    </Box>
  );

  // Compliance and Security Tab
  const ComplianceTab = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Përputhshmëria Ligjore dhe Siguria
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Shënimet e Përputhshmërisë"
          value={templateData.complianceNotes || ''}
          onChange={(e) => handleInputChange('complianceNotes', e.target.value)}
          placeholder="Shënimet dhe kërkesat për përputhshmëri..."
          className="classic-textfield"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel>Rolet e Lejuara</InputLabel>
          <Select
            multiple
            value={templateData.allowedRoles || []}
            label="Rolet e Lejuara"
            onChange={(e) => handleInputChange('allowedRoles', e.target.value)}
            className="classic-select"
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {(selected as string[]).map((value) => (
                  <Chip key={value} label={value} size="small" />
                ))}
              </Box>
            )}
          >
            <MenuItem value="Officer">Zyrtar</MenuItem>
            <MenuItem value="Supervisor">Mbikëqyrës</MenuItem>
            <MenuItem value="Inspector">Inspektor</MenuItem>
            <MenuItem value="Administrator">Administrator</MenuItem>
            <MenuItem value="Auditor">Auditor</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Alert severity="info">
          <Typography variant="body2">
            Ky shablloni do të jetë i disponueshëm vetëm për rolet e zgjedhura.
            Sigurohuni që të specifikoni rolet e duhura sipas politikave të sigurisë.
          </Typography>
        </Alert>
      </Grid>
    </Grid>
  );

  return (
    <Box>
      {validationErrors.length > 0 && (
        <Alert severity="error" sx={{ mb: 2 }}>
          <Typography variant="subtitle2">Gabime gjatë validimit:</Typography>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            {validationErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </Alert>
      )}

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Informacioni Bazë" />
          <Tab label="Përmbajtja" />
          <Tab label="Fushat dhe Seksionet" />
          <Tab label="Përputhshmëria" />
        </Tabs>
      </Box>

      <TabPanel value={activeTab} index={0}>
        <BasicInformationTab />
      </TabPanel>

      <TabPanel value={activeTab} index={1}>
        <TemplateContentTab />
      </TabPanel>

      <TabPanel value={activeTab} index={2}>
        <FieldsAndSectionsTab />
      </TabPanel>

      <TabPanel value={activeTab} index={3}>
        <ComplianceTab />
      </TabPanel>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          onClick={onCancel}
          className="classic-button"
        >
          Anulo
        </Button>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<PreviewIcon />}
            onClick={() => setPreviewMode(!previewMode)}
            className="classic-button"
          >
            {previewMode ? 'Ndrysho' : 'Shiko'}
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            className="classic-button-primary"
          >
            {isEdit ? 'Ruaj Ndryshimet' : 'Krijo Shabllonin'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default TemplateCreationDialog;
