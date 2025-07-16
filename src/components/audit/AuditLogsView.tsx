import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  TextField,
  MenuItem,
  Stack,
} from '@mui/material';
import {
  Security as SecurityIcon,
  Person as PersonIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Download as DownloadIcon,
  Visibility as VisibilityIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import type { AuditLog } from '../../types';

interface AuditLogsViewProps {
  logs?: AuditLog[];
}

// Sample audit log data
const generateSampleAuditLogs = (): AuditLog[] => [
  {
    id: 'audit-001',
    userId: 'user-001',
    action: 'CASE_ACCESSED',
    resource: 'cases',
    resourceId: 'CS-2024-0156',
    details: { description: 'Case status updated from PENDING to UNDER_REVIEW' },
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    timestamp: new Date('2024-07-15T09:30:00'),
    success: true,
    retentionPeriod: 2555,
    automaticDelete: true,
    checksum: 'sha256:abc123...def456',
  },
  {
    id: 'audit-002',
    userId: 'user-002',
    action: 'DOCUMENT_DOWNLOADED',
    resource: 'documents',
    resourceId: 'doc-001',
    details: { description: 'Evidence document downloaded for case review' },
    ipAddress: '192.168.1.105',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    timestamp: new Date('2024-07-15T10:15:00'),
    success: true,
    retentionPeriod: 1825,
    automaticDelete: true,
    checksum: 'sha256:ghi789...jkl012',
  },
  {
    id: 'audit-003',
    userId: 'user-003',
    action: 'EVIDENCE_UPLOADED',
    resource: 'evidence',
    resourceId: 'evidence-001',
    details: { description: 'Photographic evidence uploaded for smuggling investigation' },
    ipAddress: '192.168.1.110',
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
    timestamp: new Date('2024-07-15T11:45:00'),
    success: true,
    retentionPeriod: 3650,
    automaticDelete: false,
    checksum: 'sha256:stu901...vwx234',
  },
];

const AuditLogsView: React.FC<AuditLogsViewProps> = ({ logs = generateSampleAuditLogs() }) => {
  const [filteredLogs, setFilteredLogs] = useState<AuditLog[]>(logs);
  const [filters, setFilters] = useState({
    userId: '',
    action: '',
    resource: '',
    dateFrom: '',
    dateTo: '',
  });

  useEffect(() => {
    let filtered = logs;

    // Apply filters
    if (filters.userId) {
      filtered = filtered.filter(log => log.userId.includes(filters.userId));
    }
    if (filters.action) {
      filtered = filtered.filter(log => log.action.includes(filters.action));
    }
    if (filters.resource) {
      filtered = filtered.filter(log => log.resource.includes(filters.resource));
    }

    setFilteredLogs(filtered);
  }, [filters, logs]);

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const clearFilters = () => {
    setFilters({
      userId: '',
      action: '',
      resource: '',
      dateFrom: '',
      dateTo: '',
    });
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'CASE_ACCESSED':
        return <VisibilityIcon />;
      case 'DOCUMENT_DOWNLOADED':
        return <DownloadIcon />;
      case 'EVIDENCE_UPLOADED':
        return <SecurityIcon />;
      default:
        return <PersonIcon />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'CASE_ACCESSED':
        return 'primary';
      case 'DOCUMENT_DOWNLOADED':
        return 'secondary';
      case 'EVIDENCE_UPLOADED':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Audit Logs
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Comprehensive audit trail for Kosovo Customs Case Management System activities.
      </Typography>

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            <FilterIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Filters
          </Typography>
          
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
            <TextField
              label="User ID"
              value={filters.userId}
              onChange={(e) => handleFilterChange('userId', e.target.value)}
              size="small"
              sx={{ minWidth: 200 }}
            />
            <TextField
              label="Action"
              select
              value={filters.action}
              onChange={(e) => handleFilterChange('action', e.target.value)}
              size="small"
              sx={{ minWidth: 200 }}
            >
              <MenuItem value="">All Actions</MenuItem>
              <MenuItem value="CASE_ACCESSED">Case Accessed</MenuItem>
              <MenuItem value="DOCUMENT_DOWNLOADED">Document Downloaded</MenuItem>
              <MenuItem value="EVIDENCE_UPLOADED">Evidence Uploaded</MenuItem>
            </TextField>
            <TextField
              label="Resource"
              select
              value={filters.resource}
              onChange={(e) => handleFilterChange('resource', e.target.value)}
              size="small"
              sx={{ minWidth: 200 }}
            >
              <MenuItem value="">All Resources</MenuItem>
              <MenuItem value="cases">Cases</MenuItem>
              <MenuItem value="documents">Documents</MenuItem>
              <MenuItem value="evidence">Evidence</MenuItem>
            </TextField>
          </Stack>

          <Stack direction="row" spacing={2}>
            <Button 
              variant="outlined" 
              onClick={clearFilters}
              startIcon={<RefreshIcon />}
            >
              Clear Filters
            </Button>
            <Button 
              variant="contained" 
              startIcon={<SearchIcon />}
            >
              Search
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Results */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Audit Log Entries ({filteredLogs.length})
          </Typography>

          <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Action</TableCell>
                  <TableCell>User ID</TableCell>
                  <TableCell>Resource</TableCell>
                  <TableCell>Resource ID</TableCell>
                  <TableCell>Timestamp</TableCell>
                  <TableCell>IP Address</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id} hover>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        {getActionIcon(log.action)}
                        <Chip 
                          label={log.action}
                          color={getActionColor(log.action) as 'primary' | 'secondary' | 'success' | 'default'}
                          size="small"
                        />
                      </Stack>
                    </TableCell>
                    <TableCell>{log.userId}</TableCell>
                    <TableCell>{log.resource}</TableCell>
                    <TableCell>{log.resourceId}</TableCell>
                    <TableCell>{log.timestamp.toLocaleString()}</TableCell>
                    <TableCell>{log.ipAddress}</TableCell>
                    <TableCell>
                      <Chip 
                        label={log.success ? 'Success' : 'Failed'}
                        color={log.success ? 'success' : 'error'}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AuditLogsView;
