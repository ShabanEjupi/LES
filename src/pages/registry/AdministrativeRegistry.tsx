import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  Alert,
  CircularProgress
} from '@mui/material';
import { 
  Add as AddIcon, 
  Edit as EditIcon, 
  Delete as DeleteIcon, 
  Visibility as ViewIcon,
  FileDownload as DownloadIcon,
  Search as SearchIcon 
} from '@mui/icons-material';

interface AdministrativeRecord {
  id: string;
  registryNumber: string;
  documentType: string;
  submissionDate: string;
  applicantName: string;
  applicationStatus: 'PENDING' | 'APPROVED' | 'REJECTED' | 'UNDER_REVIEW';
  processedBy: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

const AdministrativeRegistry: React.FC = () => {
  const [records, setRecords] = useState<AdministrativeRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<AdministrativeRecord | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  useEffect(() => {
    // Simulate API call
    const loadRecords = async () => {
      try {
        setLoading(true);
        // In real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data for demonstration
        const mockRecords: AdministrativeRecord[] = [
          {
            id: '1',
            registryNumber: 'REG-2024-001',
            documentType: 'Kërkesë për Licencë',
            submissionDate: '2024-01-15',
            applicantName: 'Kompania ABC sh.p.k.',
            applicationStatus: 'PENDING',
            processedBy: 'Agim Kastrati',
            notes: 'Dokumentacion i kompletë',
            createdAt: '2024-01-15T10:30:00Z',
            updatedAt: '2024-01-15T10:30:00Z'
          },
          {
            id: '2',
            registryNumber: 'REG-2024-002',
            documentType: 'Ankesë Administrative',
            submissionDate: '2024-01-20',
            applicantName: 'Driton Berisha',
            applicationStatus: 'APPROVED',
            processedBy: 'Fatmira Hoxha',
            notes: 'E aprovuar pas shqyrtimit',
            createdAt: '2024-01-20T14:20:00Z',
            updatedAt: '2024-01-22T09:15:00Z'
          }
        ];
        
        setRecords(mockRecords);
        setError(null);
      } catch (error) {
        console.error('Error loading records:', error);
        setError('Gabim në ngarkimin e regjistrit administrativ');
      } finally {
        setLoading(false);
      }
    };

    loadRecords();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'warning';
      case 'APPROVED': return 'success';
      case 'REJECTED': return 'error';
      case 'UNDER_REVIEW': return 'info';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'PENDING': return 'Në pritje';
      case 'APPROVED': return 'E aprovuar';
      case 'REJECTED': return 'E refuzuar';
      case 'UNDER_REVIEW': return 'Në shqyrtim';
      default: return status;
    }
  };

  const handleNewRecord = () => {
    setSelectedRecord(null);
    setOpenDialog(true);
  };

  const handleEditRecord = (record: AdministrativeRecord) => {
    setSelectedRecord(record);
    setOpenDialog(true);
  };

  const handleDeleteRecord = (id: string) => {
    if (window.confirm('Jeni i sigurt që dëshironi ta fshini këtë regjistër?')) {
      setRecords(prev => prev.filter(record => record.id !== id));
    }
  };

  const handleViewRecord = (record: AdministrativeRecord) => {
    // Implementation for viewing record details
    console.log('Viewing record:', record);
  };

  const handleDownloadRecord = (record: AdministrativeRecord) => {
    // Implementation for downloading record
    console.log('Downloading record:', record);
  };

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.registryNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.documentType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'ALL' || record.applicationStatus === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className="classic-container">
      <Paper className="classic-paper">
        <Box className="classic-header">
          <Typography variant="h5" component="h1" className="classic-title">
            Regjistri Administrativ
          </Typography>
          <Typography variant="body2" className="classic-subtitle">
            Menaxhimi i dokumentacionit administrativ të doganave
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box className="classic-toolbar">
          <div className="classic-form-row">
            <div className="classic-form-col-6">
              <TextField
                fullWidth
                size="small"
                placeholder="Kërkoni sipas numrit të regjistrit, aplikantit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'action.active' }} />
                }}
                className="classic-search"
              />
            </div>
            <div className="classic-form-col-3">
              <TextField
                select
                fullWidth
                size="small"
                label="Filtro sipas statusit"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                SelectProps={{ native: true }}
                className="classic-select"
              >
                <option value="ALL">Të gjitha</option>
                <option value="PENDING">Në pritje</option>
                <option value="APPROVED">E aprovuar</option>
                <option value="REJECTED">E refuzuar</option>
                <option value="UNDER_REVIEW">Në shqyrtim</option>
              </TextField>
            </div>
            <div className="classic-form-col-3">
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleNewRecord}
                className="classic-button classic-button-primary"
                fullWidth
              >
                Regjistër i Ri
              </Button>
            </div>
          </div>
        </Box>

        <TableContainer component={Paper} className="classic-table-container">
          <Table>
            <TableHead>
              <TableRow className="classic-table-header">
                <TableCell>Nr. Regjistri</TableCell>
                <TableCell>Lloji i Dokumentit</TableCell>
                <TableCell>Aplikanti</TableCell>
                <TableCell>Data e Paraqitjes</TableCell>
                <TableCell>Statusi</TableCell>
                <TableCell>Përpunuar nga</TableCell>
                <TableCell align="center">Veprime</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id} className="classic-table-row">
                  <TableCell>
                    <Typography variant="body2" className="classic-text-primary">
                      {record.registryNumber}
                    </Typography>
                  </TableCell>
                  <TableCell>{record.documentType}</TableCell>
                  <TableCell>{record.applicantName}</TableCell>
                  <TableCell>
                    {new Date(record.submissionDate).toLocaleDateString('sq-AL')}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={getStatusLabel(record.applicationStatus)}
                      color={getStatusColor(record.applicationStatus) as 'default' | 'success' | 'error' | 'warning' | 'info'}
                      size="small"
                      className="classic-chip"
                    />
                  </TableCell>
                  <TableCell>{record.processedBy}</TableCell>
                  <TableCell>
                    <Box display="flex" gap={1} justifyContent="center">
                      <IconButton
                        size="small"
                        onClick={() => handleViewRecord(record)}
                        className="classic-icon-button"
                        title="Shiko detajet"
                      >
                        <ViewIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleEditRecord(record)}
                        className="classic-icon-button"
                        title="Redakto"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDownloadRecord(record)}
                        className="classic-icon-button"
                        title="Shkarko"
                      >
                        <DownloadIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteRecord(record.id)}
                        className="classic-icon-button classic-icon-button-danger"
                        title="Fshije"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {filteredRecords.length === 0 && (
          <Box textAlign="center" py={4}>
            <Typography variant="body1" color="text.secondary">
              Nuk u gjetën regjistrime që përputhen me kriteret e kërkimit.
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Dialog for adding/editing records */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
        className="classic-dialog"
      >
        <DialogTitle>
          {selectedRecord ? 'Redakto Regjistrin' : 'Regjistër i Ri'}
        </DialogTitle>
        <DialogContent>
          <div className="classic-form-container">
            <div className="classic-form-row">
              <div className="classic-form-col-6">
                <TextField
                  fullWidth
                  label="Numri i Regjistrit"
                  defaultValue={selectedRecord?.registryNumber || ''}
                  className="classic-input"
                />
              </div>
              <div className="classic-form-col-6">
                <TextField
                  fullWidth
                  label="Lloji i Dokumentit"
                  defaultValue={selectedRecord?.documentType || ''}
                  className="classic-input"
                />
              </div>
            </div>
            <div className="classic-form-row">
              <div className="classic-form-col-6">
                <TextField
                  fullWidth
                  label="Emri i Aplikantit"
                  defaultValue={selectedRecord?.applicantName || ''}
                  className="classic-input"
                />
              </div>
              <div className="classic-form-col-6">
                <TextField
                  fullWidth
                  type="date"
                  label="Data e Paraqitjes"
                  defaultValue={selectedRecord?.submissionDate || ''}
                  InputLabelProps={{ shrink: true }}
                  className="classic-input"
                />
              </div>
            </div>
            <div className="classic-form-row">
              <div className="classic-form-col-6">
                <TextField
                  select
                  fullWidth
                  label="Statusi"
                  defaultValue={selectedRecord?.applicationStatus || 'PENDING'}
                  SelectProps={{ native: true }}
                  className="classic-select"
                >
                  <option value="PENDING">Në pritje</option>
                  <option value="APPROVED">E aprovuar</option>
                  <option value="REJECTED">E refuzuar</option>
                  <option value="UNDER_REVIEW">Në shqyrtim</option>
                </TextField>
              </div>
              <div className="classic-form-col-6">
                <TextField
                  fullWidth
                  label="Përpunuar nga"
                  defaultValue={selectedRecord?.processedBy || ''}
                  className="classic-input"
                />
              </div>
            </div>
            <div className="classic-form-row">
              <div className="classic-form-col-12">
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Shënime"
                  defaultValue={selectedRecord?.notes || ''}
                  className="classic-input"
                />
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDialog(false)}
            className="classic-button classic-button-secondary"
          >
            Anulo
          </Button>
          <Button
            onClick={() => {
              // Implementation for saving
              setOpenDialog(false);
            }}
            className="classic-button classic-button-primary"
          >
            Ruaj
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdministrativeRegistry;
