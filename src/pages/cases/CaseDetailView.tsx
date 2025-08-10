import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Breadcrumbs,
  Link,
} from '@mui/material';
import {
  Edit as EditIcon,
  Add as AddIcon,
  Assignment as AssignmentIcon,
  Security as SecurityIcon,
  Inventory as InventoryIcon,
  Person as PersonIcon,
  LocalShipping as ShippingIcon,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';

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
      id={`case-tabpanel-${index}`}
      aria-labelledby={`case-tab-${index}`}
      {...other}
      className="classic-tab-panel"
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const CaseDetailView: React.FC = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [reassignDialogOpen, setReassignDialogOpen] = useState(false);
  const [selectedOfficer, setSelectedOfficer] = useState('');

  // Mock case data - would come from API in real implementation
  const caseData = {
    id: caseId || '03.1.7-2025-4',
    caseNumber: '03.1.7-2025-4',
    offenceType: 'Mandatory Offence',
    caseStatus: 'Hapur',
    createdBy: 'fd_test_mng',
    createdDate: '25.03.2025 14:45',
    lastModified: '25.03.2025 14:45',
    assignee: 'fd_test_mng',
    department: 'SEKTORI I SISTEMEVE',
    company: 'SH.P.K',
    location: 'Veternik',
    registrationNumber: 'AABICC123465',
    vehicleDetails: {
      plateNumber: 'AA-123-AA',
      vehicleType: 'Car',
      brand: 'Hyje',
      weight: '0'
    },
    confiscatedItems: [
      {
        id: 1,
        name: 'Test Item',
        quantity: 1,
        unit: 'copë',
        value: 100,
        status: 'Konfiskuar'
      }
    ],
    activities: [
      {
        id: 1,
        date: '2025.03.25 14:50:48',
        user: 'fd_test_mng',
        action: 'Tagimi Hyrjet',
        description: 'Case Created',
        type: 'CASE_OPENED'
      }
    ]
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleReassign = () => {
    setReassignDialogOpen(false);
    // Handle reassignment logic here
  };

  return (
    <MainLayout>
      <Box sx={{ p: 3 }} className="case-detail-container">
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 2 }} className="classic-breadcrumbs">
          <Link color="inherit" onClick={() => navigate('/cases')} sx={{ cursor: 'pointer' }}>
            Rastet
          </Link>
          <Typography color="text.primary">Rasti {caseData.caseNumber}</Typography>
        </Breadcrumbs>

        {/* Case Header */}
        <Card sx={{ mb: 3 }} className="classic-case-header">
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Box>
                <Typography variant="h4" component="h1" gutterBottom className="case-title">
                  OFFENCE CASE: {caseData.caseNumber}
                </Typography>
                <Typography variant="h6" color="primary" gutterBottom className="offence-type">
                  OFFENCE TYPE: {caseData.offenceType}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Chip 
                  label={`CASE STATUS: ${caseData.caseStatus}`} 
                  color="success" 
                  variant="outlined"
                  className="classic-status-chip"
                />
                <IconButton onClick={() => setEditMode(!editMode)} className="classic-edit-button">
                  <EditIcon />
                </IconButton>
                
                {/* Case Management Integration Buttons */}
                <Button 
                  variant="outlined" 
                  size="small"
                  onClick={() => navigate(`/cases/related-entities/${caseData.id}`)}
                  className="classic-button"
                  sx={{ ml: 1 }}
                >
                  🔗 Entitetet
                </Button>
                
                <Button 
                  variant="outlined" 
                  size="small"
                  onClick={() => navigate(`/cases/access/${caseData.id}`)}
                  className="classic-button"
                >
                  🔐 Qasjet
                </Button>
                
                <Button 
                  variant="outlined" 
                  size="small"
                  onClick={() => navigate(`/cases/additional-info/${caseData.id}`)}
                  className="classic-button"
                >
                  ℹ️ Info Shtesë
                </Button>
                
                <Button 
                  variant="outlined" 
                  size="small"
                  onClick={() => navigate('/cases/types')}
                  className="classic-button"
                >
                  📂 Llojet
                </Button>
              </Box>
            </Box>

            {/* Case Details Grid */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              <Box sx={{ flex: '1 1 400px', minWidth: '300px' }}>
                <Typography variant="subtitle2" color="textSecondary">Numri Rastit:</Typography>
                <Typography variant="body1" gutterBottom>{caseData.caseNumber}</Typography>
                
                <Typography variant="subtitle2" color="textSecondary">Lloji Rastit:</Typography>
                <Typography variant="body1" gutterBottom>Kundërvajtje</Typography>
                
                <Typography variant="subtitle2" color="textSecondary">Case subtype:</Typography>
                <Typography variant="body1" gutterBottom>-</Typography>
                
                <Typography variant="subtitle2" color="textSecondary">Statusi Rastit:</Typography>
                <Typography variant="body1" gutterBottom>{caseData.caseStatus}</Typography>
                
                <Typography variant="subtitle2" color="textSecondary">Data e Hapjes:</Typography>
                <Typography variant="body1" gutterBottom>{caseData.createdDate}</Typography>
                
                <Typography variant="subtitle2" color="textSecondary">Pronari:</Typography>
                <Typography variant="body1" gutterBottom>{caseData.createdBy}</Typography>
                
                <Typography variant="subtitle2" color="textSecondary">Departamenti:</Typography>
                <Typography variant="body1" gutterBottom>{caseData.department}</Typography>
              </Box>
              
              <Box sx={{ flex: '1 1 400px', minWidth: '300px' }}>
                <Typography variant="subtitle2" color="textSecondary">Emri i Kompanisë:</Typography>
                <Typography variant="body1" gutterBottom>{caseData.company}</Typography>
                
                <Typography variant="subtitle2" color="textSecondary">Numri Fiskal:</Typography>
                <Typography variant="body1" gutterBottom>-</Typography>
                
                <Typography variant="subtitle2" color="textSecondary">Numri i Regjistrimit:</Typography>
                <Typography variant="body1" gutterBottom>-</Typography>
                
                <Typography variant="subtitle2" color="textSecondary">Numri i ndërfaqes së përdoruesit:</Typography>
                <Typography variant="body1" gutterBottom>-</Typography>
                
                <Typography variant="subtitle2" color="textSecondary">Detajet e Adresës:</Typography>
                <Typography variant="body1" gutterBottom>{caseData.location}</Typography>
                
                <Typography variant="subtitle2" color="textSecondary">Vendi:</Typography>
                <Typography variant="body1" gutterBottom>-</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Classic Tabs Section */}
        <Card className="classic-tabs-container">
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange} className="classic-tabs">
              <Tab 
                label="Mjetet e Transportit" 
                icon={<ShippingIcon />} 
                iconPosition="start"
                className="classic-tab"
              />
              <Tab 
                label="Artikuj të Konfiskuar" 
                icon={<InventoryIcon />} 
                iconPosition="start"
                className="classic-tab"
              />
              <Tab 
                label="Entitetet e Ndërlidhur" 
                icon={<PersonIcon />} 
                iconPosition="start"
                className="classic-tab"
              />
              <Tab 
                label="Detyrat/Aktivitetet" 
                icon={<AssignmentIcon />} 
                iconPosition="start"
                className="classic-tab"
              />
              <Tab 
                label="Auditimi" 
                icon={<SecurityIcon />} 
                iconPosition="start"
                className="classic-tab"
              />
            </Tabs>
          </Box>

          {/* Transport Details Tab */}
          <TabPanel value={tabValue} index={0}>
            <Typography variant="h6" gutterBottom className="classic-section-title">
              DETAJET E MJETIT TË TRANSPORTIT
            </Typography>
            
            <Card variant="outlined" sx={{ mt: 2 }} className="classic-form-panel">
              <CardContent>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                  <Box sx={{ flex: '1 1 400px', minWidth: '300px' }}>
                    <TextField
                      label="Lloji i Transportit"
                      value="Vëtulli"
                      fullWidth
                      margin="normal"
                      InputProps={{ readOnly: !editMode }}
                      className="classic-text-field"
                    />
                    <TextField
                      label="Detajet e Transportit"
                      value=""
                      fullWidth
                      margin="normal"
                      InputProps={{ readOnly: !editMode }}
                      className="classic-text-field"
                    />
                    <TextField
                      label="Tipi i Veturës"
                      value="Car"
                      fullWidth
                      margin="normal"
                      InputProps={{ readOnly: !editMode }}
                      className="classic-text-field"
                    />
                    <TextField
                      label="Drejtimi"
                      value="Hyrje"
                      fullWidth
                      margin="normal"
                      InputProps={{ readOnly: !editMode }}
                      className="classic-text-field"
                    />
                    <TextField
                      label="Peshë"
                      value="0"
                      fullWidth
                      margin="normal"
                      InputProps={{ readOnly: !editMode }}
                      className="classic-text-field"
                    />
                  </Box>
                  
                  <Box sx={{ flex: '1 1 400px', minWidth: '300px' }}>
                    <TextField
                      label="Numri i Shasisë"
                      value={caseData.registrationNumber}
                      fullWidth
                      margin="normal"
                      InputProps={{ readOnly: !editMode }}
                      className="classic-text-field"
                    />
                    <TextField
                      label="Targat e Veturës"
                      value={caseData.vehicleDetails.plateNumber}
                      fullWidth
                      margin="normal"
                      InputProps={{ readOnly: !editMode }}
                      className="classic-text-field"
                    />
                    <TextField
                      label="Prodhuesit i Veturës"
                      value=""
                      fullWidth
                      margin="normal"
                      InputProps={{ readOnly: !editMode }}
                      className="classic-text-field"
                    />
                    <TextField
                      label="Viti i Prodhimit"
                      value="0"
                      fullWidth
                      margin="normal"
                      InputProps={{ readOnly: !editMode }}
                      className="classic-text-field"
                    />
                    <TextField
                      label="Ngjyra e Veturës"
                      value=""
                      fullWidth
                      margin="normal"
                      InputProps={{ readOnly: !editMode }}
                      className="classic-text-field"
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </TabPanel>

          {/* Confiscated Items Tab */}
          <TabPanel value={tabValue} index={1}>
            <Typography variant="h6" gutterBottom className="classic-section-title">
              ARTIKUJT E KONFISKUAR
            </Typography>
            
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ mb: 2 }}
              className="classic-button classic-primary-button"
              onClick={() => {/* Add new confiscated item */}}
            >
              Shto Konfiskimin e Mallrave
            </Button>
            
            <TableContainer component={Paper} className="classic-table">
              <Table>
                <TableHead>
                  <TableRow className="classic-table-header">
                    <TableCell>Artikulli</TableCell>
                    <TableCell>Sasia</TableCell>
                    <TableCell>Njësia</TableCell>
                    <TableCell>Vlera</TableCell>
                    <TableCell>Statusi</TableCell>
                    <TableCell>Veprimet</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {caseData.confiscatedItems.map((item) => (
                    <TableRow key={item.id} className="classic-table-row">
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.unit}</TableCell>
                      <TableCell>{item.value}</TableCell>
                      <TableCell>
                        <Chip label={item.status} color="error" size="small" />
                      </TableCell>
                      <TableCell>
                        <IconButton size="small" className="classic-icon-button">
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          {/* Related Entities Tab */}
          <TabPanel value={tabValue} index={2}>
            <Typography variant="h6" gutterBottom className="classic-section-title">
              ENTITETET E NDËRLIDHUR NË RAST
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Button variant="contained" startIcon={<AddIcon />} sx={{ mr: 1 }} className="classic-button">
                Krijo Linjë të Re
              </Button>
              <Button variant="outlined" className="classic-button classic-outline-button">
                Selekto Publikimin e Përgjshme
              </Button>
            </Box>
            
            <TableContainer component={Paper} className="classic-table">
              <Table>
                <TableHead>
                  <TableRow className="classic-table-header">
                    <TableCell>Tipi</TableCell>
                    <TableCell>Emri</TableCell>
                    <TableCell>Roli</TableCell>
                    <TableCell>Veprimet</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow className="classic-table-row">
                    <TableCell>Person</TableCell>
                    <TableCell>Test Person</TableCell>
                    <TableCell>Suspect</TableCell>
                    <TableCell>
                      <IconButton size="small" className="classic-icon-button">
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          {/* Activities Tab */}
          <TabPanel value={tabValue} index={3}>
            <Typography variant="h6" gutterBottom className="classic-section-title">
              DETYRAT DHE AKTIVITETET E KRIJUARA NË RAST
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Button variant="contained" sx={{ mr: 1 }} className="classic-button">
                Krijo Detyrën
              </Button>
              <Button variant="contained" sx={{ mr: 1 }} className="classic-button">
                Krijo Aktivitetin
              </Button>
              <Button variant="outlined" className="classic-button classic-outline-button">
                Ditenikok
              </Button>
            </Box>
            
            <TableContainer component={Paper} className="classic-table">
              <Table>
                <TableHead>
                  <TableRow className="classic-table-header">
                    <TableCell>Data</TableCell>
                    <TableCell>Përdoruesi</TableCell>
                    <TableCell>Veprimi</TableCell>
                    <TableCell>Përshkrimi</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {caseData.activities.map((activity) => (
                    <TableRow key={activity.id} className="classic-table-row">
                      <TableCell>{activity.date}</TableCell>
                      <TableCell>{activity.user}</TableCell>
                      <TableCell>{activity.action}</TableCell>
                      <TableCell>{activity.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          {/* Audit Tab */}
          <TabPanel value={tabValue} index={4}>
            <Typography variant="h6" gutterBottom className="classic-section-title">
              DITARI I AUDITIMIT
            </Typography>
            
            <TableContainer component={Paper} className="classic-table">
              <Table>
                <TableHead>
                  <TableRow className="classic-table-header">
                    <TableCell>Data</TableCell>
                    <TableCell>Përdoruesi</TableCell>
                    <TableCell>Veprimi</TableCell>
                    <TableCell>Detajet</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {caseData.activities.map((activity) => (
                    <TableRow key={`audit-${activity.id}`} className="classic-table-row">
                      <TableCell>{activity.date}</TableCell>
                      <TableCell>{activity.user}</TableCell>
                      <TableCell>{activity.action}</TableCell>
                      <TableCell>{activity.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
        </Card>

        {/* Quick Actions Section - Case Management Integration */}
        <Card sx={{ mb: 3 }} className="classic-card">
          <CardContent>
            <Typography variant="h6" gutterBottom className="classic-section-title">
              🚀 VEPRIME TË SHPEJTA - INTEGRIM I SISTEMIT
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button 
                variant="contained" 
                color="success"
                onClick={() => navigate('/fines/calculation-engine')}
                className="classic-button"
                startIcon={<span>💰</span>}
              >
                Kalkuloni Gjobën
              </Button>
              
              <Button 
                variant="contained" 
                color="warning"
                onClick={() => navigate(`/cases/related-entities/${caseData.id}`)}
                className="classic-button"
                startIcon={<span>🔗</span>}
              >
                Menaxho Entitetet
              </Button>
              
              <Button 
                variant="outlined"
                onClick={() => navigate(`/cases/access/${caseData.id}`)}
                className="classic-button"
                startIcon={<span>🔐</span>}
              >
                Qasjet në Rast
              </Button>
              
              <Button 
                variant="outlined"
                onClick={() => navigate(`/cases/additional-info/${caseData.id}`)}
                className="classic-button"
                startIcon={<span>ℹ️</span>}
              >
                Info dhe Butonat
              </Button>
              
              <Button 
                variant="outlined"
                onClick={() => navigate('/documents/templates')}
                className="classic-button"
                startIcon={<span>📄</span>}
              >
                Gjeneroni Dokument
              </Button>
              
              <Button 
                variant="outlined"
                onClick={() => navigate('/notifications')}
                className="classic-button"
                startIcon={<span>📧</span>}
              >
                Dërgoni Njoftim
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Box sx={{ mt: 3, display: 'flex', gap: 2 }} className="classic-action-buttons">
          <Button 
            variant="contained" 
            onClick={() => setReassignDialogOpen(true)}
            startIcon={<AssignmentIcon />}
            className="classic-button classic-primary-button"
          >
            Ricaktimi i Rastit
          </Button>
          <Button 
            variant="outlined" 
            onClick={() => navigate('/cases')}
            className="classic-button classic-outline-button"
          >
            Kthehu te Lista
          </Button>
        </Box>

        {/* Reassign Dialog */}
        <Dialog 
          open={reassignDialogOpen} 
          onClose={() => setReassignDialogOpen(false)} 
          maxWidth="sm" 
          fullWidth
          className="classic-dialog"
        >
          <DialogTitle className="classic-dialog-title">Ri Caktim</DialogTitle>
          <DialogContent className="classic-dialog-content">
            <Typography variant="body2" gutterBottom>
              Current assignee: {caseData.assignee}
            </Typography>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Selekto të Autorizuarin e Ri *</InputLabel>
              <Select
                value={selectedOfficer}
                onChange={(e) => setSelectedOfficer(e.target.value)}
                className="classic-select"
              >
                <MenuItem value="officer1">Asnjë</MenuItem>
                <MenuItem value="officer2">Lexo për Personin</MenuItem>
                <MenuItem value="officer3">Lidh</MenuItem>
                <MenuItem value="officer4">Shkruaj</MenuItem>
                <MenuItem value="officer5">Fshij</MenuItem>
              </Select>
            </FormControl>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Leja Paraprake e të Autorizuarit: *
            </Typography>
          </DialogContent>
          <DialogActions className="classic-dialog-actions">
            <Button onClick={() => setReassignDialogOpen(false)} className="classic-button">
              Cancel
            </Button>
            <Button onClick={handleReassign} variant="contained" className="classic-button classic-primary-button">
              Fund
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </MainLayout>
  );
};

export default CaseDetailView;
