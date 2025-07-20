import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent,
  Button,
  Chip
} from '@mui/material';

const ModuleNavigationHelper: React.FC = () => {
  const workingModules = [
    { 
      name: 'Module Development Dashboard', 
      route: '/admin/modules', 
      status: '✅ WORKING',
      description: 'View overall module development progress'
    },
    { 
      name: 'Activity Creation', 
      route: '/activities/create', 
      status: '✅ WORKING',
      description: 'Create new activities'
    },
    { 
      name: 'Activity from Violation', 
      route: '/activities/from-violation', 
      status: '✅ WORKING',
      description: 'Create activity from existing violation'
    },
    { 
      name: 'Activity List', 
      route: '/activities', 
      status: '🔧 BASIC',
      description: 'List all activities (basic implementation)'
    },
    { 
      name: 'Task Management', 
      route: '/tasks', 
      status: '🔧 BASIC',
      description: 'Manage tasks (basic implementation)'
    },
    { 
      name: 'Violation Management', 
      route: '/violations', 
      status: '🔧 BASIC',
      description: 'Manage violations (basic implementation)'
    },
    { 
      name: 'Dashboard', 
      route: '/dashboard', 
      status: '✅ WORKING',
      description: 'Main system dashboard'
    }
  ];

  const pendingModules = [
    { 
      name: 'Advanced Search', 
      route: '/search', 
      status: '⏳ PENDING',
      description: 'Advanced search functionality'
    },
    { 
      name: 'Vehicle Management', 
      route: '/vehicles', 
      status: '⏳ PENDING',
      description: 'Manage vehicles and transport'
    },
    { 
      name: 'Document Repository', 
      route: '/documents', 
      status: '⏳ PENDING',
      description: 'Document management system'
    },
    { 
      name: 'Administrative Fines', 
      route: '/fines', 
      status: '⏳ PENDING',
      description: 'Fine calculation and management'
    }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3" gutterBottom sx={{ color: '#003d82', fontWeight: 'bold', textAlign: 'center' }}>
        🧭 LES Module Navigation Helper
      </Typography>
      
      <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        Quick access to working modules and development progress
      </Typography>

      {/* Working Modules */}
      <Typography variant="h4" gutterBottom sx={{ color: '#4caf50', fontWeight: 'bold', mt: 4 }}>
        ✅ Working Modules
      </Typography>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 2, mb: 4 }}>
        {workingModules.map((module, index) => (
          <Card key={index} sx={{ border: '2px solid #4caf50' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  {module.name}
                </Typography>
                <Chip 
                  label={module.status} 
                  color={module.status.includes('✅') ? 'success' : 'warning'}
                  size="small"
                />
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {module.description}
              </Typography>
              <Button 
                component={Link} 
                to={module.route}
                variant="contained" 
                color="success"
                fullWidth
                sx={{ textTransform: 'none' }}
              >
                Open: {module.route}
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Pending Modules */}
      <Typography variant="h4" gutterBottom sx={{ color: '#ff9800', fontWeight: 'bold', mt: 4 }}>
        ⏳ Pending Implementation
      </Typography>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 2, mb: 4 }}>
        {pendingModules.map((module, index) => (
          <Card key={index} sx={{ border: '2px solid #ff9800', opacity: 0.7 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  {module.name}
                </Typography>
                <Chip 
                  label={module.status} 
                  color="warning"
                  size="small"
                />
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {module.description}
              </Typography>
              <Button 
                variant="outlined" 
                color="warning"
                fullWidth
                disabled
                sx={{ textTransform: 'none' }}
              >
                Coming Soon: {module.route}
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Quick Development Links */}
      <Card sx={{ mt: 4, background: 'linear-gradient(135deg, #003d82 0%, #1e3a8a 100%)', color: 'white' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            🚀 Development Quick Links
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button 
              component={Link} 
              to="/admin/modules"
              variant="contained" 
              color="inherit"
              sx={{ color: '#003d82' }}
            >
              📊 Development Dashboard
            </Button>
            <Button 
              component={Link} 
              to="/activities/create"
              variant="contained" 
              color="inherit"
              sx={{ color: '#003d82' }}
            >
              ➕ Create Activity
            </Button>
            <Button 
              component={Link} 
              to="/activities/from-violation"
              variant="contained" 
              color="inherit"
              sx={{ color: '#003d82' }}
            >
              🔗 Activity from Violation
            </Button>
            <Button 
              component={Link} 
              to="/violations"
              variant="contained" 
              color="inherit"
              sx={{ color: '#003d82' }}
            >
              ⚖️ Violations
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ModuleNavigationHelper;
