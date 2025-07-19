import React, { useState } from 'react';
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
  TextField,
  Chip
} from '@mui/material';
import { 
  Add as AddIcon, 
  Edit as EditIcon, 
  Visibility as ViewIcon,
  Search as SearchIcon 
} from '@mui/icons-material';

interface ProtocolEntry {
  id: string;
  protocolNumber: string;
  registrationDate: string;
  documentType: string;
  sender: string;
  subject: string;
  status: 'ACTIVE' | 'ARCHIVED' | 'PENDING';
  assignedTo: string;
  notes: string;
}

const ProtocolBook: React.FC = () => {
  const [entries] = useState<ProtocolEntry[]>([
    {
      id: '1',
      protocolNumber: 'PROT-2024-001',
      registrationDate: '2024-01-15',
      documentType: 'Kërkesë Administrative',
      sender: 'Kompania ABC sh.p.k.',
      subject: 'Kërkesë për licencë importi',
      status: 'ACTIVE',
      assignedTo: 'Agim Kastrati',
      notes: 'Dokumentacion i kompletë'
    },
    {
      id: '2',
      protocolNumber: 'PROT-2024-002',
      registrationDate: '2024-01-20',
      documentType: 'Ankesë',
      sender: 'Driton Berisha',
      subject: 'Ankesë ndaj vendimit administrativ',
      status: 'PENDING',
      assignedTo: 'Fatmira Hoxha',
      notes: 'Në proces shqyrtimi'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'success';
      case 'PENDING': return 'warning';
      case 'ARCHIVED': return 'default';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'Aktiv';
      case 'PENDING': return 'Në pritje';
      case 'ARCHIVED': return 'Arkivuar';
      default: return status;
    }
  };

  const filteredEntries = entries.filter(entry => 
    entry.protocolNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box className="classic-container">
      <Paper className="classic-paper">
        <Box className="classic-header">
          <Typography variant="h5" component="h1" className="classic-title">
            Libri i Protokollit
          </Typography>
          <Typography variant="body2" className="classic-subtitle">
            Regjistrat zyrtarë të dokumentacionit të doganave
          </Typography>
        </Box>

        <Box className="classic-toolbar">
          <div className="classic-form-row">
            <div className="classic-form-col-8">
              <TextField
                fullWidth
                size="small"
                placeholder="Kërkoni sipas numrit të protokollit, dërguesit, subjektit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'action.active' }} />
                }}
                className="classic-search"
              />
            </div>
            <div className="classic-form-col-4">
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                className="classic-button classic-button-primary"
                fullWidth
              >
                Regjistrim i Ri
              </Button>
            </div>
          </div>
        </Box>

        <TableContainer component={Paper} className="classic-table-container">
          <Table>
            <TableHead>
              <TableRow className="classic-table-header">
                <TableCell>Nr. Protokolli</TableCell>
                <TableCell>Data e Regjistrimit</TableCell>
                <TableCell>Lloji i Dokumentit</TableCell>
                <TableCell>Dërguesi</TableCell>
                <TableCell>Subjekti</TableCell>
                <TableCell>Statusi</TableCell>
                <TableCell>Caktuar</TableCell>
                <TableCell align="center">Veprime</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEntries.map((entry) => (
                <TableRow key={entry.id} className="classic-table-row">
                  <TableCell>
                    <Typography variant="body2" className="classic-text-primary">
                      {entry.protocolNumber}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {new Date(entry.registrationDate).toLocaleDateString('sq-AL')}
                  </TableCell>
                  <TableCell>{entry.documentType}</TableCell>
                  <TableCell>{entry.sender}</TableCell>
                  <TableCell>{entry.subject}</TableCell>
                  <TableCell>
                    <Chip
                      label={getStatusLabel(entry.status)}
                      color={getStatusColor(entry.status) as 'default' | 'success' | 'warning'}
                      size="small"
                      className="classic-chip"
                    />
                  </TableCell>
                  <TableCell>{entry.assignedTo}</TableCell>
                  <TableCell>
                    <Box display="flex" gap={1} justifyContent="center">
                      <IconButton
                        size="small"
                        className="classic-icon-button"
                        title="Shiko detajet"
                      >
                        <ViewIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        className="classic-icon-button"
                        title="Redakto"
                      >
                        <EditIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {filteredEntries.length === 0 && (
          <Box textAlign="center" py={4}>
            <Typography variant="body1" color="text.secondary">
              Nuk u gjetën protokolle që përputhen me kriteret e kërkimit.
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default ProtocolBook;
