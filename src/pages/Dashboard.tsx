import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Cases as CasesIcon,
  Description as DocumentIcon,
  TrendingUp,
  TrendingDown,
  MoreVert,
  Warning,
  CheckCircle,
  Schedule,
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import MainLayout from '../components/layout/MainLayout';
import type { KPIData } from '../types';

const Dashboard: React.FC = () => {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  // Sample data for KPI cards
  const kpiData: KPIData[] = [
    {
      title: 'Total Cases',
      value: 1247,
      icon: 'cases',
      change: 12.5,
      changeType: 'increase',
      format: 'number',
    },
    {
      title: 'Active Investigations',
      value: 89,
      icon: 'active',
      change: -3.2,
      changeType: 'decrease',
      format: 'number',
    },
    {
      title: 'Completed Cases',
      value: 856,
      icon: 'completed',
      change: 8.7,
      changeType: 'increase',
      format: 'number',
    },
    {
      title: 'Success Rate',
      value: 94.2,
      icon: 'success',
      change: 2.1,
      changeType: 'increase',
      format: 'percentage',
    },
  ];

  // Sample data for charts
  const caseStatusData = [
    { name: 'Active', value: 89, color: '#ff9800' },
    { name: 'Pending', value: 156, color: '#2196f3' },
    { name: 'Completed', value: 856, color: '#4caf50' },
    { name: 'Dismissed', value: 146, color: '#f44336' },
  ];

  const monthlyTrendsData = [
    { month: 'Jan', cases: 65, completed: 45 },
    { month: 'Feb', cases: 78, completed: 55 },
    { month: 'Mar', cases: 92, completed: 68 },
    { month: 'Apr', cases: 85, completed: 72 },
    { month: 'May', cases: 101, completed: 89 },
    { month: 'Jun', cases: 88, completed: 76 },
  ];

  const violationTypesData = [
    { type: 'Smuggling', count: 234, percentage: 32 },
    { type: 'Tax Evasion', count: 187, percentage: 26 },
    { type: 'Document Fraud', count: 145, percentage: 20 },
    { type: 'Prohibited Items', count: 98, percentage: 14 },
    { type: 'Other', count: 58, percentage: 8 },
  ];

  const recentActivities = [
    {
      id: 1,
      title: 'New case assigned',
      description: 'Case #CS-2024-0156 assigned to John Doe',
      timestamp: '5 minutes ago',
      type: 'assignment',
      icon: <CasesIcon />,
    },
    {
      id: 2,
      title: 'Document uploaded',
      description: 'Evidence document added to Case #CS-2024-0134',
      timestamp: '12 minutes ago',
      type: 'document',
      icon: <DocumentIcon />,
    },
    {
      id: 3,
      title: 'Case completed',
      description: 'Case #CS-2024-0098 marked as completed',
      timestamp: '1 hour ago',
      type: 'completion',
      icon: <CheckCircle />,
    },
    {
      id: 4,
      title: 'Alert generated',
      description: 'High-risk shipment detected at Port Authority',
      timestamp: '2 hours ago',
      type: 'alert',
      icon: <Warning />,
    },
  ];

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const renderKPIIcon = (iconType: string) => {
    const iconProps = { fontSize: 'large' as const, color: 'primary' as const };
    
    switch (iconType) {
      case 'cases':
        return <CasesIcon {...iconProps} />;
      case 'active':
        return <Schedule {...iconProps} />;
      case 'completed':
        return <CheckCircle {...iconProps} />;
      case 'success':
        return <TrendingUp {...iconProps} />;
      default:
        return <DashboardIcon {...iconProps} />;
    }
  };

  const renderChangeIcon = (changeType: string) => {
    const iconProps = { fontSize: 'small' as const };
    
    switch (changeType) {
      case 'increase':
        return <TrendingUp {...iconProps} color="success" />;
      case 'decrease':
        return <TrendingDown {...iconProps} color="error" />;
      default:
        return null;
    }
  };

  const formatValue = (value: number | string, format: string) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    switch (format) {
      case 'percentage':
        return `${numValue}%`;
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'EUR',
        }).format(numValue);
      default:
        return new Intl.NumberFormat().format(numValue);
    }
  };

  return (
    <MainLayout>
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Dashboard
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Welcome back! Here's what's happening with your customs cases today.
          </Typography>
        </Box>

        {/* KPI Cards */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: 3, 
          mb: 4 
        }}>
          {kpiData.map((kpi, index) => (
            <Card
              key={index}
              sx={{
                height: '100%',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 4,
                },
              }}
            >
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  mb={2}
                >
                  {renderKPIIcon(kpi.icon || 'default')}
                  <IconButton
                    size="small"
                    onClick={handleMenuClick}
                  >
                    <MoreVert />
                  </IconButton>
                </Box>
                <Typography variant="h4" fontWeight={600} gutterBottom>
                  {formatValue(kpi.value, kpi.format || 'number')}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {kpi.title}
                </Typography>
                {kpi.change && (
                  <Box display="flex" alignItems="center" gap={0.5}>
                    {renderChangeIcon(kpi.changeType || 'neutral')}
                    <Typography
                      variant="caption"
                      color={kpi.changeType === 'increase' ? 'success.main' : 'error.main'}
                    >
                      {Math.abs(kpi.change)}{kpi.format === 'percentage' ? '%' : ''}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      vs last month
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Charts Section */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, 
          gap: 3,
          mb: 4
        }}>
          {/* Case Status Distribution */}
          <Card sx={{ height: 400 }}>
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography variant="h6" fontWeight={600}>
                  Case Status Distribution
                </Typography>
                <IconButton
                  size="small"
                  onClick={handleMenuClick}
                >
                  <MoreVert />
                </IconButton>
              </Box>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={caseStatusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {caseStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Monthly Trends */}
          <Card sx={{ height: 400 }}>
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography variant="h6" fontWeight={600}>
                  Monthly Trends
                </Typography>
                <IconButton
                  size="small"
                  onClick={handleMenuClick}
                >
                  <MoreVert />
                </IconButton>
              </Box>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Line type="monotone" dataKey="cases" stroke="#2196f3" strokeWidth={2} />
                  <Line type="monotone" dataKey="completed" stroke="#4caf50" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Box>

        {/* Bottom Section */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, 
          gap: 3 
        }}>
          {/* Violation Types */}
          <Card>
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography variant="h6" fontWeight={600}>
                  Violation Types
                </Typography>
                <IconButton
                  size="small"
                  onClick={handleMenuClick}
                >
                  <MoreVert />
                </IconButton>
              </Box>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={violationTypesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <RechartsTooltip />
                  <Bar dataKey="count" fill="#2196f3" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Recent Activities
              </Typography>
              <List>
                {recentActivities.map((activity) => (
                  <ListItem key={activity.id} sx={{ px: 0 }}>
                    <ListItemIcon>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.light' }}>
                        {activity.icon}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={activity.title}
                      secondary={
                        <Box>
                          <Typography variant="body2" color="textSecondary">
                            {activity.description}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {activity.timestamp}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Box>

        {/* Context Menu */}
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>View Details</MenuItem>
          <MenuItem onClick={handleMenuClose}>Export Data</MenuItem>
          <MenuItem onClick={handleMenuClose}>Configure</MenuItem>
        </Menu>
      </Box>
    </MainLayout>
  );
};

export default Dashboard;
