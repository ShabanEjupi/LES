import React from 'react';
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
  IconButton,
  Chip,
  Avatar,
} from '@mui/material';
import {
  PersonAdd as AddUserIcon,
  Edit as EditIcon,
  Block as BlockIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import MainLayout from '../../components/layout/MainLayout';

const UserManagement: React.FC = () => {
  // Sample user data
  const users = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@customs.gov.al',
      role: 'Administrator',
      department: 'IT Department',
      status: 'Active',
      lastLogin: '2024-07-15 09:30',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@customs.gov.al',
      role: 'Senior Inspector',
      department: 'Investigations',
      status: 'Active',
      lastLogin: '2024-07-15 08:15',
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@customs.gov.al',
      role: 'Customs Officer',
      department: 'Port Authority',
      status: 'Inactive',
      lastLogin: '2024-07-12 16:45',
    },
  ];

  const getStatusColor = (status: string) => {
    return status === 'Active' ? 'success' : 'error';
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Administrator':
        return 'error';
      case 'Senior Inspector':
        return 'warning';
      case 'Customs Officer':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <MainLayout>
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h4" fontWeight={600} gutterBottom>
              User Management
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Manage user accounts, roles, and permissions
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddUserIcon />}
            size="large"
          >
            Add User
          </Button>
        </Box>

        {/* Statistics */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: 3, 
          mb: 3 
        }}>
          <Card>
            <CardContent>
              <Typography variant="h4" color="primary" gutterBottom>
                47
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Total Users
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="h4" color="success.main" gutterBottom>
                42
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Active Users
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="h4" color="warning.main" gutterBottom>
                5
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Inactive Users
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="h4" color="info.main" gutterBottom>
                12
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Online Now
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Users Table */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              System Users
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>User</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Department</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Last Login</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar>{user.name.charAt(0)}</Avatar>
                          <Typography variant="body2" fontWeight={600}>
                            {user.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {user.email}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={user.role}
                          color={getRoleColor(user.role) as any}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {user.department}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={user.status}
                          color={getStatusColor(user.status) as any}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {user.lastLogin}
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
                          <IconButton size="small" color="error">
                            <BlockIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
    </MainLayout>
  );
};

export default UserManagement;
