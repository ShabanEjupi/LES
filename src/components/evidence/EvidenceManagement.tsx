import React, { useState, useCallback } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Avatar,
  Tooltip,
  Alert,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Stack,
  Badge,
  LinearProgress,
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  Visibility as ViewIcon,
  Download as DownloadIcon,
  Edit as EditIcon,
  Security as SecurityIcon,
  Science as ScienceIcon,
  Verified as VerifiedIcon,
  Assignment as AssignmentIcon,
  Timeline as TimelineIcon,
  PhotoCamera as PhotoIcon,
  Videocam as VideoIcon,
  AudioFile as AudioIcon,
  Description as DocumentIcon,
  Computer as DigitalIcon,
} from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import type { 
  Document, 
  DocumentType,
  EvidenceType, 
  DataAccessLevel,
  GDPRLawfulBasis 
} from '../../types';

interface EvidenceManagementProps {
  caseId: string;
  documents: Document[];
  onDocumentUpdate: (documents: Document[]) => void;
}

const EvidenceManagement: React.FC<EvidenceManagementProps> = ({
  documents,
  onDocumentUpdate,
}) => {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [chainOfCustodyDialogOpen, setChainOfCustodyDialogOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [newDocument, setNewDocument] = useState({
    title: '',
    description: '',
    type: 'EVIDENCE' as DocumentType,
    evidenceType: 'PHOTOGRAPH' as EvidenceType,
    confidentialityLevel: 'INTERNAL' as DataAccessLevel,
    containsPersonalData: false,
    gdprLawfulBasis: 'LEGAL_OBLIGATION' as GDPRLawfulBasis,
    tags: [] as string[],
    file: null as File | null,
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setNewDocument(prev => ({
        ...prev,
        file: acceptedFiles[0],
        title: acceptedFiles[0].name.split('.')[0],
      }));
      setUploadDialogOpen(true);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp'],
      'video/*': ['.mp4', '.avi', '.mov', '.wmv'],
      'audio/*': ['.mp3', '.wav', '.aac', '.ogg'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    },
    maxSize: 100 * 1024 * 1024, // 100MB
  });

  const getEvidenceIcon = (evidenceType: EvidenceType) => {
    const iconMap: Record<EvidenceType, React.ReactNode> = {
      'PHOTOGRAPH': <PhotoIcon />,
      'VIDEO_RECORDING': <VideoIcon />,
      'AUDIO_RECORDING': <AudioIcon />,
      'DOCUMENT_SCAN': <DocumentIcon />,
      'DIGITAL_EVIDENCE': <DigitalIcon />,
      'WITNESS_STATEMENT': <AssignmentIcon />,
      'EXPERT_REPORT': <ScienceIcon />,
      'LAB_ANALYSIS': <ScienceIcon />,
      'X_RAY_SCAN': <SecurityIcon />,
      'CUSTOMS_DECLARATION': <DocumentIcon />,
      'COMMERCIAL_INVOICE': <DocumentIcon />,
      'TRANSPORT_DOCUMENT': <DocumentIcon />,
      'CERTIFICATE': <VerifiedIcon />,
      'SURVEILLANCE_DATA': <SecurityIcon />,
    };
    return iconMap[evidenceType] || <DocumentIcon />;
  };

  const getConfidentialityColor = (level: DataAccessLevel) => {
    const colorMap: Record<DataAccessLevel, 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> = {
      'PUBLIC': 'success',
      'INTERNAL': 'info',
      'CONFIDENTIAL': 'warning',
      'SECRET': 'error',
      'TOP_SECRET': 'error',
    };
    return colorMap[level] || 'default';
  };

  const handleUpload = async () => {
    if (!newDocument.file) return;

    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Create new document object
    const documentData: Document = {
      id: `doc-${Date.now()}`,
      title: newDocument.title,
      description: newDocument.description,
      type: 'EVIDENCE',
      category: 'EVIDENCE',
      evidenceType: newDocument.evidenceType,
      fileUrl: `https://storage.example.com/${newDocument.file.name}`,
      fileName: newDocument.file.name,
      fileSize: newDocument.file.size,
      mimeType: newDocument.file.type,
      version: 1,
      isLatestVersion: true,
      uploadedBy: 'current-user-id',
      tags: newDocument.tags,
      confidentialityLevel: newDocument.confidentialityLevel,
      retentionDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
      approvalStatus: 'PENDING',
      metadata: {
        checksum: 'sha256-example-checksum',
        accessLog: [],
      },
      chainOfCustody: [{
        id: `custody-${Date.now()}`,
        transferredTo: 'current-user-id',
        transferDate: new Date(),
        location: 'Digital Evidence Storage',
        purpose: 'Initial upload and registration',
        condition: 'EXCELLENT',
        notes: 'Evidence uploaded through CCMS',
        digitalSignature: {
          signedBy: 'current-user-id',
          signatureData: 'digital-signature-data',
          timestamp: new Date(),
          certificateId: 'cert-123',
          isValid: true,
        },
      }],
      forensicAnalysis: [],
      legalAdmissibility: 'ADMISSIBLE',
      sourceType: 'DIGITAL_SCAN',
      containsPersonalData: newDocument.containsPersonalData,
      gdprLawfulBasis: newDocument.gdprLawfulBasis,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Add to documents list
    onDocumentUpdate([...documents, documentData]);
    
    // Reset form and close dialog
    setNewDocument({
      title: '',
      description: '',
      type: 'EVIDENCE',
      evidenceType: 'PHOTOGRAPH',
      confidentialityLevel: 'INTERNAL',
      containsPersonalData: false,
      gdprLawfulBasis: 'LEGAL_OBLIGATION',
      tags: [],
      file: null,
    });
    setUploadDialogOpen(false);
    setUploadProgress(0);
  };

  const ChainOfCustodyDialog = () => (
    <Dialog open={chainOfCustodyDialogOpen} onClose={() => setChainOfCustodyDialogOpen(false)} maxWidth="md" fullWidth>
      <DialogTitle>Chain of Custody - {selectedDocument?.title}</DialogTitle>
      <DialogContent>
        {selectedDocument?.chainOfCustody && (
          <Stepper orientation="vertical">
            {selectedDocument.chainOfCustody.map((record) => (
              <Step key={record.id} active={true} completed={true}>
                <StepLabel>
                  <Typography variant="body2" fontWeight={500}>
                    Transfer to: {record.transferredTo}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {new Date(record.transferDate).toLocaleString('sq-AL')}
                  </Typography>
                </StepLabel>
                <StepContent>
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="caption" color="textSecondary">Location</Typography>
                        <Typography variant="body2">{record.location}</Typography>
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="caption" color="textSecondary">Condition</Typography>
                        <Chip 
                          label={record.condition} 
                          size="small" 
                          color={record.condition === 'EXCELLENT' ? 'success' : 'warning'} 
                        />
                      </Box>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="textSecondary">Purpose</Typography>
                      <Typography variant="body2">{record.purpose}</Typography>
                    </Box>
                    {record.notes && (
                      <Box>
                        <Typography variant="caption" color="textSecondary">Notes</Typography>
                        <Typography variant="body2">{record.notes}</Typography>
                      </Box>
                    )}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <VerifiedIcon color="success" fontSize="small" />
                      <Typography variant="caption">
                        Digitally signed and verified
                      </Typography>
                    </Box>
                  </Stack>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setChainOfCustodyDialogOpen(false)}>Close</Button>
        <Button variant="contained">Add Transfer</Button>
      </DialogActions>
    </Dialog>
  );

  const UploadDialog = () => (
    <Dialog open={uploadDialogOpen} onClose={() => setUploadDialogOpen(false)} maxWidth="md" fullWidth>
      <DialogTitle>Upload Evidence</DialogTitle>      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Evidence Title"
              value={newDocument.title}
              onChange={(e) => setNewDocument(prev => ({ ...prev, title: e.target.value }))}
              required
            />
            
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description"
              value={newDocument.description}
              onChange={(e) => setNewDocument(prev => ({ ...prev, description: e.target.value }))}
            />

            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Evidence Type</InputLabel>
                <Select
                  value={newDocument.evidenceType}
                  onChange={(e) => setNewDocument(prev => ({ ...prev, evidenceType: e.target.value as EvidenceType }))}
                >
                  <MenuItem value="PHOTOGRAPH">Photograph</MenuItem>
                  <MenuItem value="VIDEO_RECORDING">Video Recording</MenuItem>
                  <MenuItem value="AUDIO_RECORDING">Audio Recording</MenuItem>
                  <MenuItem value="DOCUMENT_SCAN">Document Scan</MenuItem>
                  <MenuItem value="DIGITAL_EVIDENCE">Digital Evidence</MenuItem>
                  <MenuItem value="WITNESS_STATEMENT">Witness Statement</MenuItem>
                  <MenuItem value="EXPERT_REPORT">Expert Report</MenuItem>
                  <MenuItem value="LAB_ANALYSIS">Lab Analysis</MenuItem>
                  <MenuItem value="X_RAY_SCAN">X-Ray Scan</MenuItem>
                  <MenuItem value="SURVEILLANCE_DATA">Surveillance Data</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Classification Level</InputLabel>
                <Select
                  value={newDocument.confidentialityLevel}
                  onChange={(e) => setNewDocument(prev => ({ ...prev, confidentialityLevel: e.target.value as DataAccessLevel }))}
                >
                  <MenuItem value="PUBLIC">Public</MenuItem>
                  <MenuItem value="INTERNAL">Internal</MenuItem>
                  <MenuItem value="CONFIDENTIAL">Confidential</MenuItem>
                  <MenuItem value="SECRET">Secret</MenuItem>
                  <MenuItem value="TOP_SECRET">Top Secret</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel>GDPR Lawful Basis</InputLabel>
                <Select
                  value={newDocument.gdprLawfulBasis}
                  onChange={(e) => setNewDocument(prev => ({ ...prev, gdprLawfulBasis: e.target.value as GDPRLawfulBasis }))}
                >
                  <MenuItem value="LEGAL_OBLIGATION">Legal Obligation (Art. 6(1)(c))</MenuItem>
                  <MenuItem value="PUBLIC_TASK">Public Task (Art. 6(1)(e))</MenuItem>
                  <MenuItem value="LEGITIMATE_INTERESTS">Legitimate Interests (Art. 6(1)(f))</MenuItem>
                  <MenuItem value="VITAL_INTERESTS">Vital Interests (Art. 6(1)(d))</MenuItem>
                  <MenuItem value="CONSENT">Consent (Art. 6(1)(a))</MenuItem>
                  <MenuItem value="CONTRACT">Contract (Art. 6(1)(b))</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Contains Personal Data</InputLabel>
                <Select
                  value={newDocument.containsPersonalData}
                  onChange={(e) => setNewDocument(prev => ({ ...prev, containsPersonalData: e.target.value === 'true' }))}
                >
                  <MenuItem value="false">No</MenuItem>
                  <MenuItem value="true">Yes</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {newDocument.file && (
              <Alert severity="info">
                <Typography variant="body2">
                  <strong>Selected File:</strong> {newDocument.file.name} ({(newDocument.file.size / 1024 / 1024).toFixed(2)} MB)
                </Typography>
              </Alert>
            )}

            {uploadProgress > 0 && (
              <Box>
                <LinearProgress variant="determinate" value={uploadProgress} />
                <Typography variant="caption" align="center" display="block">
                  Uploading... {uploadProgress}%
                </Typography>
              </Box>
            )}
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setUploadDialogOpen(false)}>Cancel</Button>
        <Button 
          variant="contained" 
          onClick={handleUpload}
          disabled={!newDocument.file || !newDocument.title || uploadProgress > 0}
        >
          Upload Evidence
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight={600}>
          Evidence Management
        </Typography>
        <Button variant="contained" startIcon={<UploadIcon />} onClick={() => setUploadDialogOpen(true)}>
          Upload Evidence
        </Button>
      </Box>

      {/* Stats Cards */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
        <Card sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(25% - 12px)' } }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h4" color="primary">{documents.length}</Typography>
            <Typography variant="body2" color="textSecondary">Total Evidence</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(25% - 12px)' } }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h4" color="success.main">
              {documents.filter(d => d.legalAdmissibility === 'ADMISSIBLE').length}
            </Typography>
            <Typography variant="body2" color="textSecondary">Admissible</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(25% - 12px)' } }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h4" color="warning.main">
              {documents.filter(d => d.containsPersonalData).length}
            </Typography>
            <Typography variant="body2" color="textSecondary">Contains PII</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(25% - 12px)' } }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h4" color="error.main">
              {documents.filter(d => d.confidentialityLevel === 'SECRET' || d.confidentialityLevel === 'TOP_SECRET').length}
            </Typography>
            <Typography variant="body2" color="textSecondary">Classified</Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Upload Drop Zone */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box
            {...getRootProps()}
            sx={{
              border: 2,
              borderColor: isDragActive ? 'primary.main' : 'grey.300',
              borderStyle: 'dashed',
              borderRadius: 2,
              p: 4,
              textAlign: 'center',
              cursor: 'pointer',
              bgcolor: isDragActive ? 'primary.50' : 'grey.50',
              transition: 'all 0.2s',
            }}
          >
            <input {...getInputProps()} />
            <UploadIcon sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              {isDragActive ? 'Drop files here...' : 'Drag & drop evidence files here'}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              or click to select files (max 100MB)
            </Typography>
            <Typography variant="caption" color="textSecondary" display="block" sx={{ mt: 1 }}>
              Supported: Images, Videos, Audio, Documents
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Evidence Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Evidence Inventory
          </Typography>
          
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Evidence</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Classification</TableCell>
                  <TableCell>Admissibility</TableCell>
                  <TableCell>Chain of Custody</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {documents.map((doc) => (
                  <TableRow key={doc.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ bgcolor: 'primary.100' }}>
                          {doc.evidenceType && getEvidenceIcon(doc.evidenceType)}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight={500}>
                            {doc.title}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {doc.fileName} • {(doc.fileSize / 1024 / 1024).toFixed(2)} MB
                          </Typography>
                          {doc.containsPersonalData && (
                            <Box sx={{ mt: 0.5 }}>
                              <Chip label="PII" size="small" color="warning" />
                            </Box>
                          )}
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={doc.evidenceType?.replace('_', ' ')} 
                        size="small" 
                        variant="outlined" 
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={doc.confidentialityLevel} 
                        size="small" 
                        color={getConfidentialityColor(doc.confidentialityLevel)}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={doc.legalAdmissibility} 
                        size="small" 
                        color={doc.legalAdmissibility === 'ADMISSIBLE' ? 'success' : 'error'}
                      />
                    </TableCell>
                    <TableCell>
                      <Badge badgeContent={doc.chainOfCustody?.length || 0} color="primary">
                        <Button
                          size="small"
                          startIcon={<TimelineIcon />}
                          onClick={() => {
                            setSelectedDocument(doc);
                            setChainOfCustodyDialogOpen(true);
                          }}
                        >
                          View Chain
                        </Button>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="View Evidence">
                          <IconButton size="small">
                            <ViewIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Download">
                          <IconButton size="small">
                            <DownloadIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit Metadata">
                          <IconButton size="small">
                            <EditIcon fontSize="small" />
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

      {/* Dialogs */}
      <UploadDialog />
      <ChainOfCustodyDialog />
    </Box>
  );
};

export default EvidenceManagement;
