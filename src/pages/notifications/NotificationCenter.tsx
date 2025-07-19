import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/classic-theme.css';

interface Notification {
  id: string;
  type: 'CASE_ASSIGNMENT' | 'CASE_UPDATE' | 'VIOLATION_ALERT' | 'SYSTEM_ALERT' | 'DEADLINE_WARNING' | 'APPROVAL_REQUEST';
  title: string;
  message: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  isRead: boolean;
  createdAt: string;
  expiresAt?: string;
  relatedEntityType?: 'CASE' | 'VIOLATION' | 'VEHICLE' | 'DOCUMENT';
  relatedEntityId?: string;
  actionRequired: boolean;
  actionUrl?: string;
  actionLabel?: string;
  senderId?: string;
  senderName?: string;
}

const NotificationCenter: React.FC = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread' | 'urgent' | 'action_required'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'priority'>('date');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      // Simulate API call
      const mockNotifications: Notification[] = [
        {
          id: 'NOT-001',
          type: 'CASE_ASSIGNMENT',
          title: 'New Case Assigned',
          message: 'Case CASE-2024-001 has been assigned to you for review',
          priority: 'HIGH',
          isRead: false,
          createdAt: '2025-07-19T09:30:00Z',
          relatedEntityType: 'CASE',
          relatedEntityId: 'CASE-2024-001',
          actionRequired: true,
          actionUrl: '/cases/CASE-2024-001',
          actionLabel: 'Review Case',
          senderId: 'SC001',
          senderName: 'Sector Chief Ramadan'
        },
        {
          id: 'NOT-002',
          type: 'VIOLATION_ALERT',
          title: 'Vehicle Blacklist Alert',
          message: 'Vehicle SK-123-XY has been flagged and added to the blacklist',
          priority: 'URGENT',
          isRead: false,
          createdAt: '2025-07-19T08:15:00Z',
          relatedEntityType: 'VEHICLE',
          relatedEntityId: 'VEH-003',
          actionRequired: true,
          actionUrl: '/vehicles/VEH-003',
          actionLabel: 'View Vehicle',
          senderId: 'SYS001',
          senderName: 'System Alert'
        },
        {
          id: 'NOT-003',
          type: 'DEADLINE_WARNING',
          title: 'Case Deadline Approaching',
          message: 'Case CASE-2024-002 deadline is in 2 days. Please complete review.',
          priority: 'MEDIUM',
          isRead: true,
          createdAt: '2025-07-18T16:45:00Z',
          expiresAt: '2025-07-21T23:59:59Z',
          relatedEntityType: 'CASE',
          relatedEntityId: 'CASE-2024-002',
          actionRequired: true,
          actionUrl: '/cases/CASE-2024-002',
          actionLabel: 'Complete Review',
          senderId: 'SYS001',
          senderName: 'Deadline Monitor'
        },
        {
          id: 'NOT-004',
          type: 'SYSTEM_ALERT',
          title: 'System Maintenance Scheduled',
          message: 'System maintenance is scheduled for tonight at 02:00 AM',
          priority: 'LOW',
          isRead: true,
          createdAt: '2025-07-18T14:20:00Z',
          actionRequired: false,
          senderId: 'ADM001',
          senderName: 'System Administrator'
        },
        {
          id: 'NOT-005',
          type: 'APPROVAL_REQUEST',
          title: 'Document Approval Required',
          message: 'Import permit IP-2024-567 requires your approval',
          priority: 'HIGH',
          isRead: false,
          createdAt: '2025-07-19T11:20:00Z',
          relatedEntityType: 'DOCUMENT',
          relatedEntityId: 'DOC-001',
          actionRequired: true,
          actionUrl: '/documents/DOC-001/approve',
          actionLabel: 'Review & Approve',
          senderId: 'OFF015',
          senderName: 'Officer Petrit'
        }
      ];

      setNotifications(mockNotifications);
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    switch (filter) {
      case 'unread':
        return !notification.isRead;
      case 'urgent':
        return notification.priority === 'URGENT' || notification.priority === 'HIGH';
      case 'action_required':
        return notification.actionRequired;
      default:
        return true;
    }
  }).sort((a, b) => {
    if (sortBy === 'priority') {
      const priorityOrder = { 'URGENT': 4, 'HIGH': 3, 'MEDIUM': 2, 'LOW': 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== notificationId)
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'CASE_ASSIGNMENT': return '📁';
      case 'CASE_UPDATE': return '🔄';
      case 'VIOLATION_ALERT': return '⚠️';
      case 'SYSTEM_ALERT': return '🔧';
      case 'DEADLINE_WARNING': return '⏰';
      case 'APPROVAL_REQUEST': return '✅';
      default: return '📢';
    }
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'URGENT': return 'priority-urgent';
      case 'HIGH': return 'priority-high';
      case 'MEDIUM': return 'priority-medium';
      case 'LOW': return 'priority-low';
      default: return 'priority-default';
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const urgentCount = notifications.filter(n => n.priority === 'URGENT' || n.priority === 'HIGH').length;
  const actionRequiredCount = notifications.filter(n => n.actionRequired).length;

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading notifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Notification Center</h1>
        <p className="page-description">
          Stay updated with all system notifications, alerts, and important messages
        </p>
        <div className="notification-stats">
          <div className="stat-item">
            <span className="stat-number">{unreadCount}</span>
            <span className="stat-label">Unread</span>
          </div>
          <div className="stat-item urgent">
            <span className="stat-number">{urgentCount}</span>
            <span className="stat-label">Urgent</span>
          </div>
          <div className="stat-item action">
            <span className="stat-number">{actionRequiredCount}</span>
            <span className="stat-label">Action Required</span>
          </div>
        </div>
      </div>

      <div className="notification-controls">
        <div className="filter-controls">
          <label htmlFor="filter">Filter:</label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | 'unread' | 'urgent' | 'action_required')}
            className="filter-select"
          >
            <option value="all">All Notifications</option>
            <option value="unread">Unread Only</option>
            <option value="urgent">Urgent & High Priority</option>
            <option value="action_required">Action Required</option>
          </select>
        </div>

        <div className="sort-controls">
          <label htmlFor="sort">Sort by:</label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'priority')}
            className="sort-select"
          >
            <option value="date">Date (Newest First)</option>
            <option value="priority">Priority (Highest First)</option>
          </select>
        </div>

        <div className="action-controls">
          {unreadCount > 0 && (
            <button 
              className="btn btn-secondary"
              onClick={markAllAsRead}
            >
              Mark All as Read
            </button>
          )}
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/notifications/settings')}
          >
            Notification Settings
          </button>
        </div>
      </div>

      <div className="notifications-container">
        {filteredNotifications.length === 0 ? (
          <div className="no-notifications">
            <div className="no-notifications-icon">📭</div>
            <h3>No notifications found</h3>
            <p>
              {filter !== 'all' 
                ? `No notifications match the current filter: ${filter.replace('_', ' ')}`
                : 'You have no notifications at this time.'
              }
            </p>
          </div>
        ) : (
          <div className="notifications-list">
            {filteredNotifications.map(notification => (
              <div 
                key={notification.id}
                className={`notification-item ${!notification.isRead ? 'unread' : ''} ${getPriorityClass(notification.priority)}`}
              >
                <div className="notification-header">
                  <div className="notification-icon">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="notification-meta">
                    <span className="notification-type">{notification.type.replace('_', ' ')}</span>
                    <span className="notification-priority">{notification.priority}</span>
                    <span className="notification-time">
                      {new Date(notification.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="notification-actions">
                    {!notification.isRead && (
                      <button 
                        className="btn-icon"
                        onClick={() => markAsRead(notification.id)}
                        title="Mark as read"
                      >
                        ✓
                      </button>
                    )}
                    <button 
                      className="btn-icon"
                      onClick={() => deleteNotification(notification.id)}
                      title="Delete notification"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                <div className="notification-content">
                  <h4 className="notification-title">{notification.title}</h4>
                  <p className="notification-message">{notification.message}</p>
                  
                  {notification.senderName && (
                    <div className="notification-sender">
                      From: {notification.senderName}
                    </div>
                  )}

                  {notification.expiresAt && (
                    <div className="notification-expires">
                      Expires: {new Date(notification.expiresAt).toLocaleString()}
                    </div>
                  )}

                  {notification.relatedEntityType && notification.relatedEntityId && (
                    <div className="notification-related">
                      Related {notification.relatedEntityType}: 
                      <Link 
                        to={`/${notification.relatedEntityType.toLowerCase()}s/${notification.relatedEntityId}`}
                        className="related-link"
                      >
                        {notification.relatedEntityId}
                      </Link>
                    </div>
                  )}
                </div>

                {notification.actionRequired && notification.actionUrl && (
                  <div className="notification-footer">
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        markAsRead(notification.id);
                        navigate(notification.actionUrl!);
                      }}
                    >
                      {notification.actionLabel || 'Take Action'}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="notification-summary">
        <p>
          Showing {filteredNotifications.length} of {notifications.length} notifications
          {filter !== 'all' && ` (filtered by: ${filter.replace('_', ' ')})`}
        </p>
      </div>
    </div>
  );
};

export default NotificationCenter;
