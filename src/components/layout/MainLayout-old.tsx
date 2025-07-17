import React from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Security as ViolationsIcon,
  Assignment as CasesIcon,
  FolderOpen as DocumentsIcon,
  People as UsersIcon,
  Assessment as ReportsIcon,
  Settings as SettingsIcon,
  History as AuditIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 280;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Paneli Kryesor', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Kundërvajtjet', icon: <ViolationsIcon />, path: '/violations' },
    { text: 'Rastet', icon: <CasesIcon />, path: '/cases' },
    { text: 'Dokumentet', icon: <DocumentsIcon />, path: '/documents' },
    { text: 'Përdoruesit', icon: <UsersIcon />, path: '/users' },
    { text: 'Raporte', icon: <ReportsIcon />, path: '/reports' },
    { text: 'Ditari i Auditimit', icon: <AuditIcon />, path: '/audit' },
    { text: 'Rregullimet', icon: <SettingsIcon />, path: '/settings' },
  ];

  const isSelected = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      {/* Header */}
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          backgroundColor: '#2c5aa0',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <Toolbar className="classic-window-header">
          <Typography variant="h6" noWrap component="div" sx={{ color: 'white', fontWeight: 600 }}>
            Sistemi i Administrimit Doganor - Republika e Shqipërisë
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#f5f7fa',
            borderRight: '1px solid #d4dae4',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <Typography variant="h6" sx={{ color: '#2c5aa0', fontWeight: 600, fontSize: '14px' }}>
            Menaxhimi i Rasteve
          </Typography>
        </Toolbar>
        
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              component="div"
              onClick={() => navigate(item.path)}
              sx={{
                backgroundColor: isSelected(item.path) ? '#e3f2fd' : 'transparent',
                borderLeft: isSelected(item.path) ? '4px solid #2c5aa0' : '4px solid transparent',
                '&:hover': {
                  backgroundColor: '#f0f4f8',
                },
                margin: '2px 0',
                cursor: 'pointer',
              }}
            >
              <ListItemIcon sx={{ color: isSelected(item.path) ? '#2c5aa0' : '#5a6c7d' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  '& .MuiTypography-root': {
                    fontSize: '13px',
                    fontWeight: isSelected(item.path) ? 600 : 400,
                    color: isSelected(item.path) ? '#2c5aa0' : '#2c3e50',
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: '#f8f9fa',
          p: 0,
          minHeight: '100vh',
        }}
      >
        <Toolbar />
        <Box className="classic-window" sx={{ m: 2, backgroundColor: 'white', minHeight: 'calc(100vh - 120px)' }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
