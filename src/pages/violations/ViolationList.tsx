import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Tooltip,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Visibility as ViewIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon,
  GetApp as ExportIcon,
  Print as PrintIcon,
  Assignment as CaseIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';

// Types
interface Violation {
  id: string;
  violationNumber: string;
  violationType: string;
  status: 'Aktiv' | 'Mbyllur' | 'Në Procesim' | 'Pezulluar';
  reportDate: string;
  location: string;
  officer: string;
  subject: {
    name: string;
    type: 'Fizik' | 'Juridik';
  };
  severity: 'E Lehtë' | 'E Mesme' | 'E Rëndë';
  hasCase: boolean;
  description: string;
}

// Mock data - in real app this would come from API
const mockViolations: Violation[] = [
  {
    id: '1',
    violationNumber: 'KV-2024-001',
    violationType: 'Importi i Pakontrolluar',
    status: 'Aktiv',
    reportDate: '2024-01-15',
    location: 'Aeroporti Nënë Tereza',
    officer: 'Agim Berisha',
    subject: { name: 'ABC Import Sh.p.k.', type: 'Juridik' },
    severity: 'E Rëndë',
    hasCase: true,
    description: 'Importi i mallrave pa deklarim doganor'
  },
  {
    id: '2',
    violationNumber: 'KV-2024-002',
    violationType: 'Dokumentacion i Mangët',
    status: 'Në Procesim',
    reportDate: '2024-01-18',
    location: 'Doga e Durrësit',
    officer: 'Mira Krasniqi',
    subject: { name: 'Burim Dyla', type: 'Fizik' },
    severity: 'E Mesme',
    hasCase: false,
    description: 'Dokumentacion i paplotë për mallra'
  },
  {
    id: '3',
    violationNumber: 'KV-2024-003',
    violationType: 'Kontrabandë e Lehtë',
    status: 'Mbyllur',
    reportDate: '2024-01-20',
    location: 'Kufiri Morinë',
    officer: 'Fatmir Hoxha',
    subject: { name: 'Transport Kosova Sh.p.k.', type: 'Juridik' },
    severity: 'E Lehtë',
    hasCase: true,
    description: 'Tentativë kontrabandimi cigare'
  }
];

const ViolationList: React.FC = () => {
  const navigate = useNavigate();
  const [violations, setViolations] = useState<Violation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [severityFilter, setSeverityFilter] = useState('');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setViolations(mockViolations);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string): 'success' | 'default' | 'warning' | 'error' | 'primary' | 'secondary' | 'info' => {
    switch (status) {
      case 'Aktiv': return 'success';
      case 'Mbyllur': return 'default';
      case 'Në Procesim': return 'warning';
      case 'Pezulluar': return 'error';
      default: return 'default';
    }
  };

  const getSeverityColor = (severity: string): 'success' | 'default' | 'warning' | 'error' | 'primary' | 'secondary' | 'info' => {
    switch (severity) {
      case 'E Lehtë': return 'info';
      case 'E Mesme': return 'warning';
      case 'E Rëndë': return 'error';
      default: return 'default';
    }
  };

  const filteredViolations = violations.filter(violation => {
    const matchesSearch = violation.violationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         violation.subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         violation.violationType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || violation.status === statusFilter;
    const matchesType = !typeFilter || violation.violationType === typeFilter;
    const matchesSeverity = !severityFilter || violation.severity === severityFilter;
    
    return matchesSearch && matchesStatus && matchesType && matchesSeverity;
  });

  const handleCreateViolation = () => {
    navigate('/violations/new');
  };

  const handleViewViolation = (violationId: string) => {
    navigate(`/violations/${violationId}`);
  };

  const handleCreateCase = (violationId: string) => {
    navigate(`/cases/new?violationId=${violationId}`);
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setViolations(mockViolations);
      setLoading(false);
    }, 1000);
  };

  return (
    <MainLayout>
      <Box className="classic-page">
        {/* Header Section */}
        <Card className="classic-card page-header">
          <CardHeader
            title={
              <Box display="flex" alignItems="center" gap={1}>
                <FilterIcon className="classic-icon" />
                <Typography variant="h5" className="classic-title">
                  Menaxhimi i Kundërvajtjeve
                </Typography>
              </Box>
            }
            action={
              <Box display="flex" gap={1}>
                <Tooltip title="Rifresko listën">
                  <IconButton 
                    onClick={handleRefresh} 
                    className="classic-icon-button"
                    disabled={loading}
                  >
                    <RefreshIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Eksporto në Excel">
                  <IconButton className="classic-icon-button">
                    <ExportIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Printo listën">
                  <IconButton className="classic-icon-button">
                    <PrintIcon />
                  </IconButton>
                </Tooltip>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleCreateViolation}
                  className="classic-button classic-button-primary"
                >
                  Krijo Kundërvajtje
                </Button>
              </Box>
            }
          />
        </Card>

        {/* Filters Section */}
        <Card className="classic-card">
          <CardContent>
            <Typography variant="h6" className="classic-subtitle" gutterBottom>
              Filtrat e Kërkimit
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
              <Box sx={{ flex: '1 1 300px', minWidth: '200px' }}>
                <TextField
                  fullWidth
                  label="Kërko..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  className="classic-textfield"
                />
              </Box>
              <Box sx={{ flex: '1 1 150px', minWidth: '120px' }}>
                <FormControl fullWidth className="classic-select">
                  <InputLabel>Statusi</InputLabel>
                  <Select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    label="Statusi"
                  >
                    <MenuItem value="">Të gjitha</MenuItem>
                    <MenuItem value="Aktiv">Aktiv</MenuItem>
                    <MenuItem value="Në Procesim">Në Procesim</MenuItem>
                    <MenuItem value="Mbyllur">Mbyllur</MenuItem>
                    <MenuItem value="Pezulluar">Pezulluar</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ flex: '1 1 200px', minWidth: '150px' }}>
                <FormControl fullWidth className="classic-select">
                  <InputLabel>Lloji i Kundërvajtjes</InputLabel>
                  <Select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    label="Lloji i Kundërvajtjes"
                  >
                    <MenuItem value="">Të gjitha</MenuItem>
                    <MenuItem value="Importi i Pakontrolluar">Importi i Pakontrolluar</MenuItem>
                    <MenuItem value="Dokumentacion i Mangët">Dokumentacion i Mangët</MenuItem>
                    <MenuItem value="Kontrabandë e Lehtë">Kontrabandë e Lehtë</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ flex: '1 1 150px', minWidth: '120px' }}>
                <FormControl fullWidth className="classic-select">
                  <InputLabel>Rëndësia</InputLabel>
                  <Select
                    value={severityFilter}
                    onChange={(e) => setSeverityFilter(e.target.value)}
                    label="Rëndësia"
                  >
                    <MenuItem value="">Të gjitha</MenuItem>
                    <MenuItem value="E Lehtë">E Lehtë</MenuItem>
                    <MenuItem value="E Mesme">E Mesme</MenuItem>
                    <MenuItem value="E Rëndë">E Rëndë</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ flex: '1 1 150px', minWidth: '120px' }}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('');
                    setTypeFilter('');
                    setSeverityFilter('');
                  }}
                  className="classic-button"
                >
                  Pastro Filtrat
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Statistics */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
          <Box sx={{ flex: '1 1 250px', minWidth: '200px' }}>
            <Card className="classic-card classic-stat-card">
              <CardContent>
                <Typography variant="h6" className="classic-stat-number">
                  {violations.filter(v => v.status === 'Aktiv').length}
                </Typography>
                <Typography variant="body2" className="classic-stat-label">
                  Kundërvajtje Aktive
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ flex: '1 1 250px', minWidth: '200px' }}>
            <Card className="classic-card classic-stat-card">
              <CardContent>
                <Typography variant="h6" className="classic-stat-number">
                  {violations.filter(v => v.status === 'Në Procesim').length}
                </Typography>
                <Typography variant="body2" className="classic-stat-label">
                  Në Procesim
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ flex: '1 1 250px', minWidth: '200px' }}>
            <Card className="classic-card classic-stat-card">
              <CardContent>
                <Typography variant="h6" className="classic-stat-number">
                  {violations.filter(v => v.hasCase).length}
                </Typography>
                <Typography variant="body2" className="classic-stat-label">
                  Me Raste të Krijuara
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ flex: '1 1 250px', minWidth: '200px' }}>
            <Card className="classic-card classic-stat-card">
              <CardContent>
                <Typography variant="h6" className="classic-stat-number">
                  {violations.length}
                </Typography>
                <Typography variant="body2" className="classic-stat-label">
                  Totali
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* Results Section */}
        <Card className="classic-card">
          <CardHeader
            title={
              <Typography variant="h6" className="classic-subtitle">
                Lista e Kundërvajtjeve ({filteredViolations.length} rezultate)
              </Typography>
            }
          />
          <CardContent>
            {loading ? (
              <Box display="flex" justifyContent="center" py={4}>
                <CircularProgress />
              </Box>
            ) : filteredViolations.length === 0 ? (
              <Alert severity="info" className="classic-alert">
                Nuk u gjetën kundërvajtje që përputhen me kriteret e kërkimit.
              </Alert>
            ) : (
              <TableContainer component={Paper} className="classic-table-container">
                <Table className="classic-table">
                  <TableHead className="classic-table-head">
                    <TableRow>
                      <TableCell>Nr. Kundërvajtje</TableCell>
                      <TableCell>Lloji</TableCell>
                      <TableCell>Subjekti</TableCell>
                      <TableCell>Statusi</TableCell>
                      <TableCell>Rëndësia</TableCell>
                      <TableCell>Data e Raportimit</TableCell>
                      <TableCell>Oficeri</TableCell>
                      <TableCell>Veprimet</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredViolations.map((violation) => (
                      <TableRow key={violation.id} className="classic-table-row">
                        <TableCell>
                          <Typography variant="body2" className="classic-cell-primary">
                            {violation.violationNumber}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {violation.violationType}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box>
                            <Typography variant="body2" className="classic-cell-primary">
                              {violation.subject.name}
                            </Typography>
                            <Typography variant="caption" className="classic-cell-secondary">
                              {violation.subject.type}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={violation.status}
                            color={getStatusColor(violation.status)}
                            size="small"
                            className="classic-chip"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={violation.severity}
                            color={getSeverityColor(violation.severity)}
                            size="small"
                            className="classic-chip"
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {new Date(violation.reportDate).toLocaleDateString('sq-AL')}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {violation.officer}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box display="flex" gap={0.5}>
                            <Tooltip title="Shiko detajet">
                              <IconButton
                                size="small"
                                onClick={() => handleViewViolation(violation.id)}
                                className="classic-action-button"
                              >
                                <ViewIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            {!violation.hasCase && (
                              <Tooltip title="Krijo rast">
                                <IconButton
                                  size="small"
                                  onClick={() => handleCreateCase(violation.id)}
                                  className="classic-action-button classic-action-primary"
                                >
                                  <CaseIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            )}
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>
      </Box>
    </MainLayout>
  );
};

export default ViolationList;
