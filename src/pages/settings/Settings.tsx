import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import {
  Notifications as NotificationIcon,
  Security as SecurityIcon,
  Palette as ThemeIcon,
  Language as LanguageIcon,
  Backup as BackupIcon,
  Update as UpdateIcon,
} from '@mui/icons-material';
import MainLayout from '../../components/layout/MainLayout';

const Settings: React.FC = () => {
  const settingsCategories = [
    {
      title: 'Notifications',
      icon: <NotificationIcon />,
      settings: [
        { label: 'Email Notifications', description: 'Receive email alerts for case updates', enabled: true },
        { label: 'Push Notifications', description: 'Browser push notifications', enabled: false },
        { label: 'SMS Alerts', description: 'SMS notifications for urgent cases', enabled: true },
      ],
    },
    {
      title: 'Security',
      icon: <SecurityIcon />,
      settings: [
        { label: 'Two-Factor Authentication', description: 'Enhanced security with 2FA', enabled: true },
        { label: 'Session Timeout', description: 'Auto logout after inactivity', enabled: true },
        { label: 'Login Alerts', description: 'Notify of new login attempts', enabled: true },
      ],
    },
    {
      title: 'Appearance',
      icon: <ThemeIcon />,
      settings: [
        { label: 'Dark Mode', description: 'Switch to dark theme', enabled: false },
        { label: 'Compact View', description: 'Reduce spacing for more content', enabled: false },
        { label: 'High Contrast', description: 'Improve visibility', enabled: false },
      ],
    },
  ];

  return (
    <MainLayout>
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            System Settings
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Configure your preferences and system settings
          </Typography>
        </Box>

        {/* Settings Categories */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', lg: 'repeat(auto-fit, minmax(450px, 1fr))' }, 
          gap: 3,
          mb: 3
        }}>
          {settingsCategories.map((category, index) => (
            <Card key={index}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {category.icon}
                  {category.title}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <List>
                  {category.settings.map((setting, settingIndex) => (
                    <ListItem key={settingIndex}>
                      <ListItemText
                        primary={setting.label}
                        secondary={setting.description}
                      />
                      <ListItemSecondaryAction>
                        <FormControlLabel
                          control={<Switch checked={setting.enabled} />}
                          label=""
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Additional Settings */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
          gap: 3 
        }}>
          {/* Language & Region */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LanguageIcon />
                Language & Region
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <List>
                <ListItem>
                  <ListItemText
                    primary="Language"
                    secondary="Current: English / Albanian"
                  />
                  <Button size="small" variant="outlined">
                    Change
                  </Button>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Time Zone"
                    secondary="Europe/Tirane (GMT+1)"
                  />
                  <Button size="small" variant="outlined">
                    Change
                  </Button>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Date Format"
                    secondary="DD/MM/YYYY"
                  />
                  <Button size="small" variant="outlined">
                    Change
                  </Button>
                </ListItem>
              </List>
            </CardContent>
          </Card>

          {/* System Maintenance */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <BackupIcon />
                System Maintenance
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <List>
                <ListItem>
                  <ListItemIcon>
                    <BackupIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Backup Data"
                    secondary="Last backup: Today, 02:00 AM"
                  />
                  <Button size="small" variant="outlined">
                    Backup Now
                  </Button>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <UpdateIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="System Updates"
                    secondary="Version 1.0.0 - Up to date"
                  />
                  <Button size="small" variant="outlined">
                    Check Updates
                  </Button>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Box>

        {/* Save Button */}
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="outlined" size="large">
            Reset to Defaults
          </Button>
          <Button variant="contained" size="large">
            Save Changes
          </Button>
        </Box>
      </Box>
    </MainLayout>
  );
};

export default Settings;
