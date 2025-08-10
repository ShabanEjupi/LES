import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material';
import { Menu as MenuIcon, Logout as LogoutIcon, Settings as SettingsIcon } from '@mui/icons-material';
import { useAuth } from '../../contexts';
import { ClassicButton } from '../common/ClassicButton';
import './Header.css';

interface HeaderProps {
  title?: string;
  onMenuToggle?: () => void;
  showMenuButton?: boolean;
}

/**
 * Header - Official Albanian Government styled header
 * Features Kosovo coat of arms, official government styling, and proper Albanian text
 */
export const Header: React.FC<HeaderProps> = ({
  title = 'LES - Law Enforcement System',
  onMenuToggle,
  showMenuButton = true
}) => {
  const { state, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  const getCurrentTime = () => {
    return new Date().toLocaleString('sq-AL', {
      timeZone: 'Europe/Pristina',
      hour12: false,
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <AppBar position="static" className="classic-header">
      <Toolbar className="classic-toolbar">
        {/* Left Section - Government Branding */}
        <Box className="header-left">
          {showMenuButton && (
            <IconButton 
              edge="start" 
              color="inherit" 
              aria-label="menu"
              onClick={onMenuToggle}
              className="classic-menu-button"
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Box className="government-branding">
            <div className="kosovo-emblem">🇽🇰</div>
            <Box className="system-identity">
              <Typography variant="h6" className="republic-title">
                REPUBLIKA E KOSOVËS
              </Typography>
              <Typography variant="subtitle2" className="ministry-title">
                Doganat e Kosovës
              </Typography>
              <Typography variant="caption" className="system-title">
                {title}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Center Section - Current Time */}
        <Box className="header-center">
          <div className="current-time">
            <Typography variant="body2" className="time-label">
              Ora:
            </Typography>
            <Typography variant="body1" className="time-display">
              {getCurrentTime()}
            </Typography>
          </div>
        </Box>

        {/* Right Section - User Info & Actions */}
        <Box className="header-right">
          {state.user && (
            <>
              <Box className="user-info">
                <Typography variant="body2" className="user-greeting">
                  Mirësevini,
                </Typography>
                <Typography variant="body1" className="user-name">
                  {state.user.fullName}
                </Typography>
                <Typography variant="caption" className="user-role">
                  {state.user.role.name} - {state.user.customsPost}
                </Typography>
              </Box>
              
              <Box className="header-actions">
                <ClassicButton
                  variant="default"
                  size="small"
                  startIcon={<SettingsIcon />}
                  className="header-button"
                >
                  Cilësimet
                </ClassicButton>
                
                <ClassicButton
                  variant="danger"
                  size="small"
                  startIcon={<LogoutIcon />}
                  onClick={handleLogout}
                  className="header-button"
                >
                  Dilni
                </ClassicButton>
              </Box>
            </>
          )}
          
          {!state.user && (
            <Typography variant="body2" className="guest-info">
              Qasje si Vizitor
            </Typography>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
