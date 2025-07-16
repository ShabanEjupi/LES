import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  Description as DocumentIcon,
  Folder as FolderIcon,
  Download as DownloadIcon,
  Delete as DeleteIcon,
  Share as ShareIcon,
} from '@mui/icons-material';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';

const DocumentRepository: React.FC = () => {
  // Sample document data
  const documents = [
    {
      id: '1',
      name: 'Import Declaration - CS-2024-0156.pdf',
      type: 'PDF',
      size: '2.4 MB',
      uploadedDate: '2024-07-10',
      uploadedBy: 'John Doe',
      category: 'Import Declaration',
    },
    {
      id: '2',
      name: 'Evidence Photos - Shipment A.zip',
      type: 'ZIP',
      size: '15.7 MB',
      uploadedDate: '2024-07-09',
      uploadedBy: 'Jane Smith',
      category: 'Evidence',
    },
    {
      id: '3',
      name: 'Investigation Report - Template.docx',
      type: 'DOCX',
      size: '0.8 MB',
      uploadedDate: '2024-07-08',
      uploadedBy: 'System',
      category: 'Template',
    },
  ];

  const DocumentList = () => (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Document Repository
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Manage customs documents, templates, and evidence files
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<UploadIcon />}
          size="large"
        >
          Upload Document
        </Button>
      </Box>

      {/* Statistics Cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
          gap: 3,
          mb: 3,
        }}
      >
        <Card>
          <CardContent>
            <Typography variant="h4" color="primary" gutterBottom>
              1,247
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Total Documents
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h4" color="warning.main" gutterBottom>
              89
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Pending Review
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h4" color="success.main" gutterBottom>
              2.4 GB
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Storage Used
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h4" color="info.main" gutterBottom>
              156
            </Typography>
            <Typography variant="body2" color="textSecondary">
              This Month
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Recent Documents */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Recent Documents
          </Typography>
          <List>
            {documents.map((doc) => (
              <ListItem
                key={doc.id}
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  mb: 1,
                }}
              >
                <ListItemIcon>
                  {doc.type === 'PDF' ? (
                    <DocumentIcon color="error" />
                  ) : doc.type === 'ZIP' ? (
                    <FolderIcon color="warning" />
                  ) : (
                    <DocumentIcon color="primary" />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={doc.name}
                  secondary={
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 0.5 }}>
                      <Chip label={doc.category} size="small" variant="outlined" />
                      <Typography variant="caption">
                        {doc.size} • Uploaded by {doc.uploadedBy} on {doc.uploadedDate}
                      </Typography>
                    </Box>
                  }
                />
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton size="small" color="primary">
                    <DownloadIcon />
                  </IconButton>
                  <IconButton size="small" color="secondary">
                    <ShareIcon />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );

  const DocumentTemplates = () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Document Templates
      </Typography>
      <Typography variant="body1" color="textSecondary">
        This page will contain document templates for various customs procedures.
      </Typography>
    </Box>
  );

  const DocumentUpload = () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Upload Documents
      </Typography>
      <Typography variant="body1" color="textSecondary">
        This page will contain the document upload interface.
      </Typography>
    </Box>
  );

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<DocumentList />} />
        <Route path="/templates" element={<DocumentTemplates />} />
        <Route path="/upload" element={<DocumentUpload />} />
      </Routes>
    </MainLayout>
  );
};

export default DocumentRepository;
