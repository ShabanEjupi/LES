import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Alert,
  AlertTitle
} from '@mui/material';
import { 
  moduleRegistry, 
  getModulesByPriority, 
  getModulesByCategory,
  developmentPhases
} from '../../data/moduleRegistry';

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
      id={`module-tabpanel-${index}`}
      aria-labelledby={`module-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const ModuleDevelopmentDashboard: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getStatusColor = (status: string): 'success' | 'warning' | 'info' | 'error' => {
    switch (status) {
      case 'IMPLEMENTED': return 'success';
      case 'IN_PROGRESS': return 'warning';
      case 'TESTED': return 'info';
      default: return 'error';
    }
  };

  const getPriorityColor = (priority: string): 'error' | 'warning' | 'success' | 'default' => {
    switch (priority) {
      case 'HIGH': return 'error';
      case 'MEDIUM': return 'warning';
      case 'LOW': return 'success';
      default: return 'default';
    }
  };

  // CORRECTED: Actual total modules count is 632, not just the ones in registry
  const TOTAL_MODULES_COUNT = 632; // Actual count from modules-not-programmed-yet.txt
  const implementedModules = moduleRegistry.filter(m => m.status === 'IMPLEMENTED').length;
  const notImplementedModules = TOTAL_MODULES_COUNT - implementedModules;
  const totalHours = 5056; // Estimated total hours for all 632 modules

  const completionPercentage = (implementedModules / TOTAL_MODULES_COUNT) * 100;

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      {/* Phase 1 Alert */}
      <Alert severity="info" sx={{ mb: 3 }}>
        <AlertTitle>🚀 Phase 1: Foundation Fixes - IN PROGRESS</AlertTitle>
        Currently fixing core infrastructure issues and preparing for module implementation.
        The foundation must be solid before implementing the 632 modules.
      </Alert>

      {/* Summary Cards */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <Card sx={{ minWidth: 200, flex: 1 }}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Total Modules
            </Typography>
            <Typography variant="h4" component="div">
              {TOTAL_MODULES_COUNT}
            </Typography>
            <Typography variant="body2">
              Modules to implement
            </Typography>
          </CardContent>
        </Card>
        
        <Card sx={{ minWidth: 200, flex: 1 }}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Completion Progress
            </Typography>
            <Typography variant="h4" component="div" color="primary">
              {completionPercentage.toFixed(1)}%
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={completionPercentage} 
              sx={{ mt: 1 }}
            />
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 200, flex: 1 }}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Estimated Hours
            </Typography>
            <Typography variant="h4" component="div">
              {totalHours}h
            </Typography>
            <Typography variant="body2">
              Total development time
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 200, flex: 1 }}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Not Implemented
            </Typography>
            <Typography variant="h4" component="div" color="error">
              {notImplementedModules}
            </Typography>
            <Typography variant="body2">
              Modules pending
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Development Phases */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            📋 Development Phases
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {Object.entries(developmentPhases).map(([phase, description]) => (
              <Box key={phase} sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 1, minWidth: 250, flex: 1 }}>
                <Typography variant="subtitle1" color="primary">
                  {phase.toUpperCase()}
                </Typography>
                <Typography variant="body2">
                  {description}
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Tabs for detailed view */}
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="High Priority Focus" />
            <Tab label="Summary" />
            <Tab label="All Modules" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Alert severity="warning" sx={{ mb: 2 }}>
            <AlertTitle>🎯 Phase 2 Focus: High Priority Modules</AlertTitle>
            These modules should be implemented immediately after Phase 1 completion.
          </Alert>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Module Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Required Roles</TableCell>
                  <TableCell>Est. Hours</TableCell>
                  <TableCell>Route</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getModulesByPriority('HIGH').map((module) => (
                  <TableRow key={module.id}>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        {module.nameEn}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {module.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {module.description}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {module.requiredRoles?.map(role => (
                        <Chip key={role} label={role} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                      ))}
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold" color="error">
                        {module.estimatedHours}h
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <code>{module.route}</code>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            {['HIGH', 'MEDIUM', 'LOW'].map((priority) => (
              <Card key={priority} sx={{ flex: 1 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom color={getPriorityColor(priority)}>
                    {priority} Priority
                  </Typography>
                  <Typography variant="h4">
                    {getModulesByPriority(priority as 'HIGH' | 'MEDIUM' | 'LOW').length}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    modules
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
          
          <Typography variant="h6" gutterBottom>By Category</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {[...new Set(moduleRegistry.map(m => m.category))].map((category) => (
              <Chip 
                key={category} 
                label={`${category.replace('_', ' ')} (${getModulesByCategory(category).length})`}
                variant="outlined"
              />
            ))}
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Module Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Route</TableCell>
                  <TableCell>Hours</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {moduleRegistry.map((module) => (
                  <TableRow key={module.id}>
                    <TableCell>
                      <Typography variant="body2">
                        {module.nameEn}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {module.name}
                      </Typography>
                    </TableCell>
                    <TableCell>{module.category}</TableCell>
                    <TableCell>
                      <Chip 
                        label={module.priority} 
                        size="small" 
                        color={getPriorityColor(module.priority)}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={module.status} 
                        size="small" 
                        color={getStatusColor(module.status)}
                      />
                    </TableCell>
                    <TableCell>
                      <code>{module.route}</code>
                    </TableCell>
                    <TableCell>{module.estimatedHours}h</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </Card>
    </Box>
  );
};

export default ModuleDevelopmentDashboard;
