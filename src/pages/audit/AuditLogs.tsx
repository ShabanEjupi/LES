import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
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
  Button,
  Tabs,
  Tab,
  Avatar,
  Tooltip,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Visibility as ViewIcon,
  Download as DownloadIcon,
  Security as SecurityIcon,
  Person as PersonIcon,
  Description as DocumentIcon,
  Assignment as CaseIcon,
} from '@mui/icons-material';
import MainLayout from '../../components/layout/MainLayout';

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  userAvatar: string;
  action: string;
  resource: string;
  resourceType: 'case' | 'document' | 'user' | 'system';
  details: string;
  ipAddress: string;
  status: 'success' | 'warning' | 'error';
}

const AuditLogs: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample audit log data
  const auditLogs: AuditLog[] = [
    {
      id: '1',
      timestamp: '2024-01-15 14:30:25',
      user: 'Admin User',
      userAvatar: '',
      action: 'Case Created',
      resource: 'CASE-2024-001',
      resourceType: 'case',
      details: 'Created new customs violation case',
      ipAddress: '192.168.1.100',
      status: 'success',
    },
    {
      id: '2',
      timestamp: '2024-01-15 14:25:10',
      user: 'John Smith',
      userAvatar: '',
      action: 'Document Upload',
      resource: 'DOC-2024-045',
      resourceType: 'document',
      details: 'Uploaded invoice document for case CASE-2024-001',
      ipAddress: '192.168.1.105',
      status: 'success',
    },
    {
      id: '3',
      timestamp: '2024-01-15 14:20:33',
      user: 'Jane Doe',
      userAvatar: '',
      action: 'Login Failed',
      resource: 'USER-jane.doe',
      resourceType: 'user',
      details: 'Failed login attempt - incorrect password',
      ipAddress: '10.0.0.15',
      status: 'warning',
    },
    {
      id: '4',
      timestamp: '2024-01-15 14:15:22',
      user: 'System',
      userAvatar: '',
      action: 'Backup Completed',
      resource: 'BACKUP-20240115',
      resourceType: 'system',
      details: 'Automatic system backup completed successfully',
      ipAddress: 'localhost',
      status: 'success',
    },
    {
      id: '5',
      timestamp: '2024-01-15 14:10:45',
      user: 'Mike Johnson',
      userAvatar: '',
      action: 'Case Status Update',
      resource: 'CASE-2024-001',
      resourceType: 'case',
      details: 'Changed case status from "Open" to "Under Investigation"',
      ipAddress: '192.168.1.110',
      status: 'success',
    },
    {
      id: '6',
      timestamp: '2024-01-15 14:05:18',
      user: 'Admin User',
      userAvatar: '',
      action: 'User Permission Changed',
      resource: 'USER-mike.johnson',
      resourceType: 'user',
      details: 'Updated user permissions - added "Case Manager" role',
      ipAddress: '192.168.1.100',
      status: 'success',
    },
  ];

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'case':
        return <CaseIcon fontSize="small" />;
      case 'document':
        return <DocumentIcon fontSize="small" />;
      case 'user':
        return <PersonIcon fontSize="small" />;
      case 'system':
        return <SecurityIcon fontSize="small" />;
      default:
        return <SecurityIcon fontSize="small" />;
    }
  };

  const getStatusColor = (status: string): 'success' | 'warning' | 'error' | 'default' => {
    switch (status) {
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      default:
        return 'default';
    }
  };

  const filteredLogs = auditLogs.filter(log =>
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.resource.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { label: 'Total Activities', value: '1,234', color: 'primary' },
    { label: 'Failed Attempts', value: '23', color: 'error' },
    { label: 'System Events', value: '456', color: 'info' },
    { label: 'User Actions', value: '755', color: 'success' },
  ];

  return (
    <MainLayout>
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Audit Logs
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Track and monitor all system activities and user actions
          </Typography>
        </Box>

        {/* Statistics Cards */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }, 
          gap: 2,
          mb: 3
        }}>
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color={`${stat.color}.main`} fontWeight={600}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {stat.label}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Filters and Search */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', md: 'row' },
              gap: 2,
              alignItems: { md: 'center' }
            }}>
              <TextField
                placeholder="Search audit logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ flex: 1 }}
              />
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button startIcon={<FilterIcon />} variant="outlined">
                  Filter
                </Button>
                <Button startIcon={<DownloadIcon />} variant="outlined">
                  Export
                </Button>
              </Box>
            </Box>

            {/* Tabs for different log types */}
            <Tabs value={selectedTab} onChange={(_, value) => setSelectedTab(value)} sx={{ mt: 2 }}>
              <Tab label="All Activities" />
              <Tab label="User Actions" />
              <Tab label="System Events" />
              <Tab label="Security Events" />
            </Tabs>
          </CardContent>
        </Card>

        {/* Audit Logs Table */}
        <Card>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Timestamp</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell>Action</TableCell>
                  <TableCell>Resource</TableCell>
                  <TableCell>Details</TableCell>
                  <TableCell>IP Address</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id} hover>
                    <TableCell>
                      <Typography variant="body2">
                        {log.timestamp}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 32, height: 32 }}>
                          {log.user.charAt(0)}
                        </Avatar>
                        <Typography variant="body2">
                          {log.user}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {getResourceIcon(log.resourceType)}
                        <Typography variant="body2">
                          {log.action}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontFamily="monospace">
                        {log.resource}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Tooltip title={log.details}>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            maxWidth: 200, 
                            overflow: 'hidden', 
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {log.details}
                        </Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontFamily="monospace">
                        {log.ipAddress}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={log.status} 
                        color={getStatusColor(log.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton size="small">
                        <ViewIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Box>
    </MainLayout>
  );
};

export default AuditLogs;
