import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Badge,
  Tabs,
  Tab,
} from '@mui/material';
import {
  PersonAdd as AddUserIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Block as BlockIcon,
  Visibility as ViewIcon,
  Delete as DeleteIcon,
  Group as GroupIcon,
  Person as PersonIcon,
  AdminPanelSettings as AdminIcon,
  Security as SecurityIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Refresh as RefreshIcon,
  Print as PrintIcon,
  CheckCircle as ActiveIcon,
  Cancel as InactiveIcon,
  SupervisorAccount as SupervisorIcon,
} from '@mui/icons-material';
import MainLayout from '../../components/layout/MainLayout';

// Types
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'Administrator' | 'Oficer' | 'Supervisor' | 'Përdorues';
  department: 'IT' | 'Doganë' | 'Hetim' | 'Administrata' | 'Sigurim';
  status: 'Aktiv' | 'Joaktiv' | 'Pezulluar';
  avatar?: string;
  lastLogin: string;
  createdDate: string;
  permissions: string[];
  isOnline: boolean;
  cases: number;
  violations: number;
}

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    firstName: 'Agim',
    lastName: 'Berisha',
    email: 'agim.berisha@dogana.gov.al',
    phone: '+355 69 123 4567',
    role: 'Administrator',
    department: 'IT',
    status: 'Aktiv',
    lastLogin: '2024-01-20T10:30:00',
    createdDate: '2023-05-15',
    permissions: ['user.create', 'user.edit', 'user.delete', 'system.admin'],
    isOnline: true,
    cases: 45,
    violations: 23
  },
  {
    id: '2',
    firstName: 'Mira',
    lastName: 'Krasniqi',
    email: 'mira.krasniqi@dogana.gov.al',
    phone: '+355 68 987 6543',
    role: 'Oficer',
    department: 'Doganë',
    status: 'Aktiv',
    lastLogin: '2024-01-20T09:15:00',
    createdDate: '2023-08-20',
    permissions: ['case.create', 'case.edit', 'violation.create'],
    isOnline: true,
    cases: 78,
    violations: 45
  },
  {
    id: '3',
    firstName: 'Fatmir',
    lastName: 'Hoxha',
    email: 'fatmir.hoxha@dogana.gov.al',
    phone: '+355 67 555 4321',
    role: 'Supervisor',
    department: 'Hetim',
    status: 'Aktiv',
    lastLogin: '2024-01-19T16:45:00',
    createdDate: '2022-12-10',
    permissions: ['case.view', 'case.approve', 'violation.review'],
    isOnline: false,
    cases: 120,
    violations: 67
  },
  {
    id: '4',
    firstName: 'Elvira',
    lastName: 'Çela',
    email: 'elvira.cela@dogana.gov.al',
    phone: '+355 69 888 7777',
    role: 'Përdorues',
    department: 'Administrata',
    status: 'Joaktiv',
    lastLogin: '2024-01-15T14:20:00',
    createdDate: '2023-11-05',
    permissions: ['document.view'],
    isOnline: false,
    cases: 12,
    violations: 8
  }
];

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
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const UserManagement: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUsers(mockUsers);
      setLoading(false);
    }, 1000);
  }, []);

  const getRoleColor = (role: string): 'success' | 'default' | 'warning' | 'error' | 'primary' | 'secondary' | 'info' => {
    switch (role) {
      case 'Administrator': return 'error';
      case 'Supervisor': return 'warning';
      case 'Oficer': return 'primary';
      case 'Përdorues': return 'default';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string): 'success' | 'default' | 'warning' | 'error' | 'primary' | 'secondary' | 'info' => {
    switch (status) {
      case 'Aktiv': return 'success';
      case 'Joaktiv': return 'default';
      case 'Pezulluar': return 'error';
      default: return 'default';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Administrator': return <AdminIcon fontSize="small" color="error" />;
      case 'Supervisor': return <SupervisorIcon fontSize="small" color="warning" />;
      case 'Oficer': return <SecurityIcon fontSize="small" color="primary" />;
      case 'Përdorues': return <PersonIcon fontSize="small" />;
      default: return <PersonIcon fontSize="small" />;
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);
    const matchesRole = !roleFilter || user.role === roleFilter;
    const matchesDepartment = !departmentFilter || user.department === departmentFilter;
    const matchesStatus = !statusFilter || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesDepartment && matchesStatus;
  });

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setUsers(mockUsers);
      setLoading(false);
    }, 1000);
  };

  const handleToggleStatus = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { 
            ...user, 
            status: user.status === 'Aktiv' ? 'Joaktiv' : 'Aktiv'
          }
        : user
    ));
  };

  const handleDeleteUser = (userId: string) => {
    if (window.confirm('Jeni të sigurt që dëshironi të fshini këtë përdorues?')) {
      setUsers(prev => prev.filter(user => user.id !== userId));
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <MainLayout>
      <Box className="classic-page">
        {/* Header Section */}
        <Card className="classic-card page-header">
          <CardHeader
            title={
              <Box display="flex" alignItems="center" gap={1}>
                <GroupIcon className="classic-icon" />
                <Typography variant="h5" className="classic-title">
                  Menaxhimi i Përdoruesve
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
                <Tooltip title="Printo listën">
                  <IconButton className="classic-icon-button">
                    <PrintIcon />
                  </IconButton>
                </Tooltip>            <Button
              variant="contained"
              startIcon={<AddUserIcon />}
              onClick={() => navigate('/users/new')}
              className="classic-button classic-button-primary"
            >
              Shto Përdorues
            </Button>
              </Box>
            }
          />
        </Card>

        {/* Tabs */}
        <Card className="classic-card">
          <Tabs 
            value={currentTab} 
            onChange={(_, newValue) => setCurrentTab(newValue)}
            className="classic-tabs"
          >
            <Tab label="Të Gjithë Përdoruesit" />
            <Tab label="Përdorues Aktivë" />
            <Tab label="Administratorë" />
            <Tab label="Rolet dhe Lejet" />
          </Tabs>
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
                  label="Kërko përdorues..."
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
                  <InputLabel>Roli</InputLabel>
                  <Select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    label="Roli"
                  >
                    <MenuItem value="">Të gjitha</MenuItem>
                    <MenuItem value="Administrator">Administrator</MenuItem>
                    <MenuItem value="Supervisor">Supervisor</MenuItem>
                    <MenuItem value="Oficer">Oficer</MenuItem>
                    <MenuItem value="Përdorues">Përdorues</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ flex: '1 1 150px', minWidth: '120px' }}>
                <FormControl fullWidth className="classic-select">
                  <InputLabel>Departamenti</InputLabel>
                  <Select
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                    label="Departamenti"
                  >
                    <MenuItem value="">Të gjitha</MenuItem>
                    <MenuItem value="IT">IT</MenuItem>
                    <MenuItem value="Doganë">Doganë</MenuItem>
                    <MenuItem value="Hetim">Hetim</MenuItem>
                    <MenuItem value="Administrata">Administrata</MenuItem>
                    <MenuItem value="Sigurim">Sigurim</MenuItem>
                  </Select>
                </FormControl>
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
                    <MenuItem value="Joaktiv">Joaktiv</MenuItem>
                    <MenuItem value="Pezulluar">Pezulluar</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ flex: '1 1 150px', minWidth: '120px' }}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => {
                    setSearchTerm('');
                    setRoleFilter('');
                    setDepartmentFilter('');
                    setStatusFilter('');
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
                  {users.length}
                </Typography>
                <Typography variant="body2" className="classic-stat-label">
                  Totali Përdoruesve
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ flex: '1 1 250px', minWidth: '200px' }}>
            <Card className="classic-card classic-stat-card">
              <CardContent>
                <Typography variant="h6" className="classic-stat-number">
                  {users.filter(u => u.status === 'Aktiv').length}
                </Typography>
                <Typography variant="body2" className="classic-stat-label">
                  Përdorues Aktivë
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ flex: '1 1 250px', minWidth: '200px' }}>
            <Card className="classic-card classic-stat-card">
              <CardContent>
                <Typography variant="h6" className="classic-stat-number">
                  {users.filter(u => u.isOnline).length}
                </Typography>
                <Typography variant="body2" className="classic-stat-label">
                  Online Tani
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ flex: '1 1 250px', minWidth: '200px' }}>
            <Card className="classic-card classic-stat-card">
              <CardContent>
                <Typography variant="h6" className="classic-stat-number">
                  {users.filter(u => u.role === 'Administrator').length}
                </Typography>
                <Typography variant="body2" className="classic-stat-label">
                  Administratorë
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* Tab Content */}
        <TabPanel value={currentTab} index={0}>
          {/* All Users */}
          <Card className="classic-card">
            <CardHeader
              title={
                <Typography variant="h6" className="classic-subtitle">
                  Lista e Përdoruesve ({filteredUsers.length} rezultate)
                </Typography>
              }
            />
            <CardContent>
              {loading ? (
                <Box display="flex" justifyContent="center" py={4}>
                  <CircularProgress />
                </Box>
              ) : filteredUsers.length === 0 ? (
                <Alert severity="info" className="classic-alert">
                  Nuk u gjetën përdorues që përputhen me kriteret e kërkimit.
                </Alert>
              ) : (
                <TableContainer component={Paper} className="classic-table-container">
                  <Table className="classic-table">
                    <TableHead className="classic-table-head">
                      <TableRow>
                        <TableCell>Përdoruesi</TableCell>
                        <TableCell>Roli</TableCell>
                        <TableCell>Departamenti</TableCell>
                        <TableCell>Statusi</TableCell>
                        <TableCell>Kontakti</TableCell>
                        <TableCell>Aktiviteti</TableCell>
                        <TableCell>Veprimet</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id} className="classic-table-row">
                          <TableCell>
                            <Box display="flex" alignItems="center" gap={2}>
                              <Badge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                variant="dot"
                                color={user.isOnline ? 'success' : 'default'}
                              >
                                <Avatar 
                                  src={user.avatar}
                                  className="classic-avatar"
                                >
                                  {getInitials(user.firstName, user.lastName)}
                                </Avatar>
                              </Badge>
                              <Box>
                                <Typography variant="body2" className="classic-cell-primary">
                                  {user.firstName} {user.lastName}
                                </Typography>
                                <Typography variant="caption" className="classic-cell-secondary">
                                  Anëtar që nga {new Date(user.createdDate).toLocaleDateString('sq-AL')}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box display="flex" alignItems="center" gap={1}>
                              {getRoleIcon(user.role)}
                              <Chip
                                label={user.role}
                                color={getRoleColor(user.role)}
                                size="small"
                                className="classic-chip"
                              />
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {user.department}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box display="flex" alignItems="center" gap={1}>
                              {user.status === 'Aktiv' ? 
                                <ActiveIcon fontSize="small" color="success" /> : 
                                <InactiveIcon fontSize="small" color="disabled" />
                              }
                              <Chip
                                label={user.status}
                                color={getStatusColor(user.status)}
                                size="small"
                                className="classic-chip"
                              />
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box>
                              <Box display="flex" alignItems="center" gap={0.5} mb={0.5}>
                                <EmailIcon fontSize="small" color="disabled" />
                                <Typography variant="caption">
                                  {user.email}
                                </Typography>
                              </Box>
                              <Box display="flex" alignItems="center" gap={0.5}>
                                <PhoneIcon fontSize="small" color="disabled" />
                                <Typography variant="caption">
                                  {user.phone}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box>
                              <Typography variant="caption" display="block">
                                {user.cases} raste • {user.violations} kundërvajtje
                              </Typography>
                              <Typography variant="caption" className="classic-cell-secondary">
                                Login i fundit: {new Date(user.lastLogin).toLocaleDateString('sq-AL')}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box display="flex" gap={0.5}>
                              <Tooltip title="Shiko detajet">
                                <IconButton
                                  size="small"
                                  className="classic-action-button"
                                >
                                  <ViewIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Edito">
                                <IconButton
                                  size="small"
                                  className="classic-action-button classic-action-primary"
                                >
                                  <EditIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title={user.status === 'Aktiv' ? 'Çaktivizo' : 'Aktivizo'}>
                                <IconButton
                                  size="small"
                                  onClick={() => handleToggleStatus(user.id)}
                                  className="classic-action-button"
                                  color={user.status === 'Aktiv' ? 'warning' : 'success'}
                                >
                                  <BlockIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Fshij">
                                <IconButton
                                  size="small"
                                  onClick={() => handleDeleteUser(user.id)}
                                  className="classic-action-button"
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
              )}
            </CardContent>
          </Card>
        </TabPanel>

        {/* Other tabs content */}
        <TabPanel value={currentTab} index={1}>
          <Alert severity="info">Vetëm përdorues aktivë</Alert>
        </TabPanel>
        
        <TabPanel value={currentTab} index={2}>
          <Alert severity="info">Vetëm administratorë dhe supervisorë</Alert>
        </TabPanel>
        
        <TabPanel value={currentTab} index={3}>
          <Card className="classic-card">
            <CardContent>
              <Typography variant="h6" className="classic-subtitle" gutterBottom>
                Rolet dhe Lejet e Sistemit
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 2 }}>
                <Box>
                  <Typography variant="subtitle1" gutterBottom>Administrator</Typography>
                  <Typography variant="body2" color="text.secondary">
                    • Menaxhimi i plotë i sistemit<br/>
                    • Krijimi dhe fshirja e përdoruesve<br/>
                    • Qasje në të gjitha modulet<br/>
                    • Konfigurimi i sistemit
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle1" gutterBottom>Supervisor</Typography>
                  <Typography variant="body2" color="text.secondary">
                    • Mbikëqyrja e rasteve dhe kundërvajtjeve<br/>
                    • Aprovimi i dokumenteve<br/>
                    • Menaxhimi i ekipit<br/>
                    • Raportimi dhe statistika
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle1" gutterBottom>Oficer</Typography>
                  <Typography variant="body2" color="text.secondary">
                    • Krijimi dhe menaxhimi i rasteve<br/>
                    • Regjistrimi i kundërvajtjeve<br/>
                    • Ngarkimi i dokumenteve<br/>
                    • Hetimi dhe raportet
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle1" gutterBottom>Përdorues</Typography>
                  <Typography variant="body2" color="text.secondary">
                    • Qasje e kufizuar në sistem<br/>
                    • Shikimi i dokumenteve<br/>
                    • Kërkimi dhe filtrimi<br/>
                    • Raporte bazike
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Add User Dialog */}
        <Dialog 
          open={addUserDialogOpen} 
          onClose={() => setAddUserDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Shto Përdorues të Ri</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <Alert severity="info" sx={{ mb: 2 }}>
                Plotësoni informacionet e nevojshme për përdoruesin e ri.
              </Alert>
              <Typography variant="body2">
                Implementimi i formës së përdoruesit do të jetë i disponueshëm së shpejti.
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAddUserDialogOpen(false)}>Anulo</Button>
            <Button variant="contained" onClick={() => setAddUserDialogOpen(false)}>
              Shto Përdorues
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </MainLayout>
  );
};

export default UserManagement;
