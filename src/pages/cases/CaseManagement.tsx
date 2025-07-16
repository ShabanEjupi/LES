import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  InputAdornment,
  Fab,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Visibility as ViewIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';

const CaseManagement: React.FC = () => {
  const navigate = useNavigate();

  // Sample case data
  const cases = [
    {
      id: 'CS-2024-0156',
      title: 'Suspicious Import Documentation',
      type: 'Document Fraud',
      status: 'ACTIVE',
      priority: 'HIGH',
      assignee: 'John Doe',
      createdDate: '2024-07-10',
      dueDate: '2024-07-25',
    },
    {
      id: 'CS-2024-0155',
      title: 'Undeclared Goods Investigation',
      type: 'Smuggling',
      status: 'PENDING',
      priority: 'MEDIUM',
      assignee: 'Jane Smith',
      createdDate: '2024-07-08',
      dueDate: '2024-07-22',
    },
    {
      id: 'CS-2024-0154',
      title: 'Tax Evasion Case',
      type: 'Tax Evasion',
      status: 'COMPLETED',
      priority: 'LOW',
      assignee: 'Mike Johnson',
      createdDate: '2024-07-05',
      dueDate: '2024-07-20',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'warning';
      case 'PENDING':
        return 'info';
      case 'COMPLETED':
        return 'success';
      case 'DISMISSED':
        return 'error';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH':
        return 'error';
      case 'MEDIUM':
        return 'warning';
      case 'LOW':
        return 'success';
      default:
        return 'default';
    }
  };

  const CaseList = () => (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Case Management
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Manage customs violation cases and investigations
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/cases/new')}
          size="large"
        >
          New Case
        </Button>
      </Box>

      {/* Search and Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField
              placeholder="Search cases..."
              variant="outlined"
              size="small"
              sx={{ flex: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="outlined"
              startIcon={<FilterIcon />}
              size="small"
            >
              Filters
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Cases Table */}
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Case ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Assignee</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cases.map((caseItem) => (
                <TableRow key={caseItem.id} hover>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600}>
                      {caseItem.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {caseItem.title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {caseItem.type}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={caseItem.status}
                      color={getStatusColor(caseItem.status) as "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={caseItem.priority}
                      color={getPriorityColor(caseItem.priority) as "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {caseItem.assignee}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {caseItem.createdDate}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {caseItem.dueDate}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton size="small" color="primary">
                        <ViewIcon />
                      </IconButton>
                      <IconButton size="small" color="secondary">
                        <EditIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => navigate('/cases/new')}
      >
        <AddIcon />
      </Fab>
    </Box>
  );

  const NewCase = () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Create New Case
      </Typography>
      <Typography variant="body1" color="textSecondary">
        This page is under development. Case creation form will be implemented here.
      </Typography>
    </Box>
  );

  const MyCases = () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        My Cases
      </Typography>
      <Typography variant="body1" color="textSecondary">
        This page will show cases assigned to the current user.
      </Typography>
    </Box>
  );

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<CaseList />} />
        <Route path="/new" element={<NewCase />} />
        <Route path="/my" element={<MyCases />} />
      </Routes>
    </MainLayout>
  );
};

export default CaseManagement;
