import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemIcon, Badge, Chip } from '@mui/material';
import { ClassicButton } from '../../components/common/ClassicButton';
import { ClassicCard } from '../../components/common/ClassicCard';
import '../../styles/classic-theme.css';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'INFO' | 'WARNING' | 'ERROR' | 'SUCCESS';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  isRead: boolean;
  createdDate: string;
  sender: string;
  relatedModule?: string;
}

const NotificationPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  useEffect(() => {
    // Mock notifications data
    const mockNotifications: Notification[] = [
      {
        id: '1',
        title: 'Kundërvajtje e re e regjistruar',
        message: 'Një kundërvajtje e re është regjistruar në sistemin LES. Ju lutemi rishikoni detajet.',
        type: 'INFO',
        priority: 'HIGH',
        isRead: false,
        createdDate: '2024-01-15 10:30',
        sender: 'Sistemi LES',
        relatedModule: 'VIOLATIONS'
      },
      {
        id: '2',
        title: 'Detyrë e re e caktuar',
        message: 'Ju është caktuar një detyrë e re për hetimin e rastit nr. 2024-001.',
        type: 'WARNING',
        priority: 'HIGH',
        isRead: false,
        createdDate: '2024-01-15 09:15',
        sender: 'Agron Krasniqi',
        relatedModule: 'TASKS'
      },
      {
        id: '3',
        title: 'Raporti i përfunduar',
        message: 'Raporti mujor i aktiviteteve është gati për rishikim.',
        type: 'SUCCESS',
        priority: 'MEDIUM',
        isRead: true,
        createdDate: '2024-01-14 16:45',
        sender: 'Fatmir Hoxha',
        relatedModule: 'REPORTS'
      }
    ];
    setNotifications(mockNotifications);
  }, []);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'INFO': return '🔔';
      case 'WARNING': return '⚠️';
      case 'ERROR': return '❌';
      case 'SUCCESS': return '✅';
      default: return '📢';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'INFO': return '#003d82';
      case 'WARNING': return '#ff8000';
      case 'ERROR': return '#e41e20';
      case 'SUCCESS': return '#008000';
      default: return '#000000';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH': return '#e41e20';
      case 'MEDIUM': return '#ff8000';
      case 'LOW': return '#008000';
      default: return '#000000';
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
    if (!notification.isRead) {
      // Mark as read
      setNotifications(prev => 
        prev.map(n => 
          n.id === notification.id ? { ...n, isRead: true } : n
        )
      );
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <Box className="classic-container">
      <Typography variant="h4" className="classic-title">
        Faqja e Njoftimeve
      </Typography>
      <Typography variant="subtitle1" className="classic-subtitle">
        Sistemi i njoftimeve të sistemit LES
      </Typography>

      <div className="classic-layout-grid">
        <div className="classic-layout-left">
          <ClassicCard title={`Njoftimet (${unreadCount} të palexuara)`}>
            <div className="classic-toolbar">
              <ClassicButton variant="primary" size="small">
                Shëno të gjitha si të lexuara
              </ClassicButton>
              <ClassicButton variant="default" size="small">
                Filtro
              </ClassicButton>
            </div>

            <List className="classic-notification-list">
              {notifications.map((notification) => (
                <ListItem
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`classic-notification-item ${!notification.isRead ? 'unread' : ''}`}
                  style={{ cursor: 'pointer' }}
                >
                  <ListItemIcon>
                    <span className="classic-notification-icon">
                      {getNotificationIcon(notification.type)}
                    </span>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <div className="classic-notification-header">
                        <span className="classic-notification-title">
                          {notification.title}
                        </span>
                        <Chip
                          label={notification.priority}
                          size="small"
                          style={{
                            backgroundColor: getPriorityColor(notification.priority),
                            color: 'white',
                            fontSize: '10px'
                          }}
                        />
                      </div>
                    }
                    secondary={
                      <div className="classic-notification-meta">
                        <span className="classic-notification-sender">
                          {notification.sender}
                        </span>
                        <span className="classic-notification-date">
                          {notification.createdDate}
                        </span>
                      </div>
                    }
                  />
                  {!notification.isRead && (
                    <Badge
                      color="error"
                      variant="dot"
                      className="classic-notification-badge"
                    />
                  )}
                </ListItem>
              ))}
            </List>
          </ClassicCard>
        </div>

        <div className="classic-layout-right">
          {selectedNotification ? (
            <ClassicCard title="Detajet e Njoftimit">
              <div className="classic-notification-detail">
                <div className="classic-notification-detail-header">
                  <h3 style={{ color: getNotificationColor(selectedNotification.type) }}>
                    {getNotificationIcon(selectedNotification.type)} {selectedNotification.title}
                  </h3>
                  <div className="classic-notification-detail-meta">
                    <Chip
                      label={selectedNotification.type}
                      size="small"
                      style={{
                        backgroundColor: getNotificationColor(selectedNotification.type),
                        color: 'white'
                      }}
                    />
                    <Chip
                      label={selectedNotification.priority}
                      size="small"
                      style={{
                        backgroundColor: getPriorityColor(selectedNotification.priority),
                        color: 'white'
                      }}
                    />
                  </div>
                </div>

                <div className="classic-notification-detail-body">
                  <p>{selectedNotification.message}</p>
                </div>

                <div className="classic-notification-detail-footer">
                  <div className="classic-notification-detail-info">
                    <strong>Dërguar nga:</strong> {selectedNotification.sender}<br />
                    <strong>Data:</strong> {selectedNotification.createdDate}<br />
                    {selectedNotification.relatedModule && (
                      <>
                        <strong>Moduli:</strong> {selectedNotification.relatedModule}
                      </>
                    )}
                  </div>

                  <div className="classic-button-group">
                    <ClassicButton variant="primary">
                      Shiko Detajet
                    </ClassicButton>
                    <ClassicButton variant="default">
                      Arkivo
                    </ClassicButton>
                    <ClassicButton variant="default">
                      Fshij
                    </ClassicButton>
                  </div>
                </div>
              </div>
            </ClassicCard>
          ) : (
            <ClassicCard title="Zgjidh një njoftim">
              <div className="classic-empty-state">
                <div className="classic-empty-state-icon">📢</div>
                <p>Zgjidh një njoftim nga lista për të parë detajet.</p>
              </div>
            </ClassicCard>
          )}
        </div>
      </div>
    </Box>
  );
};

export default NotificationPage;
