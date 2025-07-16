import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Assessment as ReportIcon,
  TrendingUp as TrendingIcon,
  PieChart as PieChartIcon,
  BarChart as BarChartIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';
import MainLayout from '../../components/layout/MainLayout';

const Reports: React.FC = () => {
  const reportCategories = [
    {
      title: 'Case Reports',
      reports: [
        { name: 'Monthly Case Summary', description: 'Summary of all cases processed this month' },
        { name: 'Case Status Report', description: 'Current status of all active cases' },
        { name: 'Investigation Performance', description: 'Performance metrics for investigations' },
      ],
    },
    {
      title: 'Violation Analytics',
      reports: [
        { name: 'Violation Types Analysis', description: 'Breakdown of violation types and trends' },
        { name: 'Geographic Distribution', description: 'Violations by geographical location' },
        { name: 'Penalty Assessment Report', description: 'Analysis of penalties and fines imposed' },
      ],
    },
    {
      title: 'Operational Reports',
      reports: [
        { name: 'User Activity Report', description: 'System usage and user activity statistics' },
        { name: 'Document Repository Stats', description: 'Document storage and access statistics' },
        { name: 'System Performance Report', description: 'System performance and uptime metrics' },
      ],
    },
  ];

  return (
    <MainLayout>
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Reports & Analytics
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Generate comprehensive reports and view analytics dashboards
          </Typography>
        </Box>

        {/* Quick Stats */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: 3, 
          mb: 4 
        }}>
          <Card>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <TrendingIcon color="primary" sx={{ fontSize: 40 }} />
              <Box>
                <Typography variant="h5" fontWeight={600}>
                  1,247
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Total Reports Generated
                </Typography>
              </Box>
            </CardContent>
          </Card>
          <Card>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <PieChartIcon color="success" sx={{ fontSize: 40 }} />
              <Box>
                <Typography variant="h5" fontWeight={600}>
                  89
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Scheduled Reports
                </Typography>
              </Box>
            </CardContent>
          </Card>
          <Card>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <BarChartIcon color="warning" sx={{ fontSize: 40 }} />
              <Box>
                <Typography variant="h5" fontWeight={600}>
                  156
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Custom Dashboards
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Report Categories */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: 'repeat(auto-fit, minmax(400px, 1fr))' }, 
          gap: 3 
        }}>
          {reportCategories.map((category, index) => (
            <Card key={index}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ReportIcon color="primary" />
                  {category.title}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <List dense>
                  {category.reports.map((report, reportIndex) => (
                    <ListItem
                      key={reportIndex}
                      sx={{
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 1,
                        mb: 1,
                      }}
                      secondaryAction={
                        <Button
                          size="small"
                          startIcon={<DownloadIcon />}
                          color="primary"
                        >
                          Generate
                        </Button>
                      }
                    >
                      <ListItemIcon>
                        <ReportIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary={report.name}
                        secondary={report.description}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Additional Actions */}
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Custom Report Builder
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              Create custom reports with specific filters, date ranges, and data visualizations.
            </Typography>
            <Button variant="outlined" startIcon={<ReportIcon />}>
              Launch Report Builder
            </Button>
          </CardContent>
        </Card>
      </Box>
    </MainLayout>
  );
};

export default Reports;
