import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/classic-theme.css';

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  desktopNotifications: boolean;
  notificationTypes: {
    CASE_ASSIGNMENT: boolean;
    CASE_UPDATE: boolean;
    VIOLATION_ALERT: boolean;
    SYSTEM_ALERT: boolean;
    DEADLINE_WARNING: boolean;
    APPROVAL_REQUEST: boolean;
  };
  prioritySettings: {
    URGENT: boolean;
    HIGH: boolean;
    MEDIUM: boolean;
    LOW: boolean;
  };
  quietHours: {
    enabled: boolean;
    startTime: string;
    endTime: string;
  };
  frequency: 'REAL_TIME' | 'DAILY_DIGEST' | 'WEEKLY_DIGEST';
  autoMarkAsRead: boolean;
  retentionDays: number;
}

const NotificationSettings: React.FC = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    desktopNotifications: true,
    notificationTypes: {
      CASE_ASSIGNMENT: true,
      CASE_UPDATE: true,
      VIOLATION_ALERT: true,
      SYSTEM_ALERT: false,
      DEADLINE_WARNING: true,
      APPROVAL_REQUEST: true,
    },
    prioritySettings: {
      URGENT: true,
      HIGH: true,
      MEDIUM: true,
      LOW: false,
    },
    quietHours: {
      enabled: false,
      startTime: '22:00',
      endTime: '08:00',
    },
    frequency: 'REAL_TIME',
    autoMarkAsRead: false,
    retentionDays: 30,
  });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      // Simulate API call to load user notification settings
      // In real implementation, this would fetch from backend
      console.log('Loading notification settings...');
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const saveSettings = async () => {
    try {
      setLoading(true);
      // Simulate API call to save settings
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetToDefaults = () => {
    setSettings({
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      desktopNotifications: true,
      notificationTypes: {
        CASE_ASSIGNMENT: true,
        CASE_UPDATE: true,
        VIOLATION_ALERT: true,
        SYSTEM_ALERT: false,
        DEADLINE_WARNING: true,
        APPROVAL_REQUEST: true,
      },
      prioritySettings: {
        URGENT: true,
        HIGH: true,
        MEDIUM: true,
        LOW: false,
      },
      quietHours: {
        enabled: false,
        startTime: '22:00',
        endTime: '08:00',
      },
      frequency: 'REAL_TIME',
      autoMarkAsRead: false,
      retentionDays: 30,
    });
  };

  const updateSetting = <K extends keyof NotificationSettings>(
    key: K, 
    value: NotificationSettings[K]
  ) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const updateNestedSetting = <K extends keyof NotificationSettings>(
    parentKey: K,
    childKey: string,
    value: unknown
  ) => {
    setSettings(prev => ({
      ...prev,
      [parentKey]: {
        ...(prev[parentKey] as Record<string, unknown>),
        [childKey]: value
      }
    }));
  };

  const testNotification = () => {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification('Test Notification', {
          body: 'This is a test notification from Kosovo Customs Administration System',
          icon: '/favicon.ico'
        });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification('Test Notification', {
              body: 'This is a test notification from Kosovo Customs Administration System',
              icon: '/favicon.ico'
            });
          }
        });
      }
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Notification Settings</h1>
        <p className="page-description">
          Configure how and when you receive notifications from the system
        </p>
        <div className="header-actions">
          <button 
            className="btn btn-secondary"
            onClick={() => navigate('/notifications')}
          >
            ← Back to Notifications
          </button>
        </div>
      </div>

      <div className="settings-container">
        {/* Delivery Methods */}
        <div className="settings-section">
          <h2 className="section-title">Delivery Methods</h2>
          <div className="settings-grid">
            <div className="setting-item">
              <label className="setting-label">
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) => updateSetting('emailNotifications', e.target.checked)}
                />
                <span className="setting-text">
                  <strong>Email Notifications</strong>
                  <small>Receive notifications via email</small>
                </span>
              </label>
            </div>

            <div className="setting-item">
              <label className="setting-label">
                <input
                  type="checkbox"
                  checked={settings.pushNotifications}
                  onChange={(e) => updateSetting('pushNotifications', e.target.checked)}
                />
                <span className="setting-text">
                  <strong>Push Notifications</strong>
                  <small>Browser push notifications</small>
                </span>
              </label>
            </div>

            <div className="setting-item">
              <label className="setting-label">
                <input
                  type="checkbox"
                  checked={settings.smsNotifications}
                  onChange={(e) => updateSetting('smsNotifications', e.target.checked)}
                />
                <span className="setting-text">
                  <strong>SMS Notifications</strong>
                  <small>Text messages for urgent alerts</small>
                </span>
              </label>
            </div>

            <div className="setting-item">
              <label className="setting-label">
                <input
                  type="checkbox"
                  checked={settings.desktopNotifications}
                  onChange={(e) => updateSetting('desktopNotifications', e.target.checked)}
                />
                <span className="setting-text">
                  <strong>Desktop Notifications</strong>
                  <small>System tray notifications</small>
                </span>
              </label>
              <button 
                className="btn btn-sm btn-secondary"
                onClick={testNotification}
              >
                Test
              </button>
            </div>
          </div>
        </div>

        {/* Notification Types */}
        <div className="settings-section">
          <h2 className="section-title">Notification Types</h2>
          <div className="settings-grid">
            {Object.entries(settings.notificationTypes).map(([type, enabled]) => (
              <div key={type} className="setting-item">
                <label className="setting-label">
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={(e) => updateNestedSetting('notificationTypes', type, e.target.checked)}
                  />
                  <span className="setting-text">
                    <strong>{type.replace('_', ' ')}</strong>
                    <small>
                      {type === 'CASE_ASSIGNMENT' && 'When cases are assigned to you'}
                      {type === 'CASE_UPDATE' && 'When case status changes'}
                      {type === 'VIOLATION_ALERT' && 'Critical violation alerts'}
                      {type === 'SYSTEM_ALERT' && 'System maintenance and updates'}
                      {type === 'DEADLINE_WARNING' && 'Approaching deadlines'}
                      {type === 'APPROVAL_REQUEST' && 'Documents requiring approval'}
                    </small>
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Priority Settings */}
        <div className="settings-section">
          <h2 className="section-title">Priority Filters</h2>
          <div className="settings-grid">
            {Object.entries(settings.prioritySettings).map(([priority, enabled]) => (
              <div key={priority} className="setting-item">
                <label className="setting-label">
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={(e) => updateNestedSetting('prioritySettings', priority, e.target.checked)}
                  />
                  <span className="setting-text">
                    <strong>{priority} Priority</strong>
                    <small>
                      {priority === 'URGENT' && 'Critical issues requiring immediate attention'}
                      {priority === 'HIGH' && 'Important notifications'}
                      {priority === 'MEDIUM' && 'Standard notifications'}
                      {priority === 'LOW' && 'Informational messages'}
                    </small>
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Frequency Settings */}
        <div className="settings-section">
          <h2 className="section-title">Delivery Frequency</h2>
          <div className="setting-item">
            <label className="setting-label">
              <span className="setting-text">
                <strong>Notification Frequency</strong>
                <small>How often you receive notifications</small>
              </span>
            </label>
            <select
              value={settings.frequency}
              onChange={(e) => updateSetting('frequency', e.target.value as NotificationSettings['frequency'])}
              className="setting-select"
            >
              <option value="REAL_TIME">Real-time (Immediate)</option>
              <option value="DAILY_DIGEST">Daily Digest</option>
              <option value="WEEKLY_DIGEST">Weekly Digest</option>
            </select>
          </div>
        </div>

        {/* Quiet Hours */}
        <div className="settings-section">
          <h2 className="section-title">Quiet Hours</h2>
          <div className="setting-item">
            <label className="setting-label">
              <input
                type="checkbox"
                checked={settings.quietHours.enabled}
                onChange={(e) => updateNestedSetting('quietHours', 'enabled', e.target.checked)}
              />
              <span className="setting-text">
                <strong>Enable Quiet Hours</strong>
                <small>Pause non-urgent notifications during specified hours</small>
              </span>
            </label>
          </div>

          {settings.quietHours.enabled && (
            <div className="quiet-hours-config">
              <div className="time-inputs">
                <div className="time-input">
                  <label>Start Time:</label>
                  <input
                    type="time"
                    value={settings.quietHours.startTime}
                    onChange={(e) => updateNestedSetting('quietHours', 'startTime', e.target.value)}
                  />
                </div>
                <div className="time-input">
                  <label>End Time:</label>
                  <input
                    type="time"
                    value={settings.quietHours.endTime}
                    onChange={(e) => updateNestedSetting('quietHours', 'endTime', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Additional Settings */}
        <div className="settings-section">
          <h2 className="section-title">Additional Settings</h2>
          <div className="settings-grid">
            <div className="setting-item">
              <label className="setting-label">
                <input
                  type="checkbox"
                  checked={settings.autoMarkAsRead}
                  onChange={(e) => updateSetting('autoMarkAsRead', e.target.checked)}
                />
                <span className="setting-text">
                  <strong>Auto-mark as Read</strong>
                  <small>Automatically mark notifications as read when viewed</small>
                </span>
              </label>
            </div>

            <div className="setting-item">
              <label className="setting-label">
                <span className="setting-text">
                  <strong>Retention Period</strong>
                  <small>How long to keep notifications (days)</small>
                </span>
              </label>
              <input
                type="number"
                min="1"
                max="365"
                value={settings.retentionDays}
                onChange={(e) => updateSetting('retentionDays', parseInt(e.target.value))}
                className="setting-input"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="settings-actions">
          <button 
            className="btn btn-secondary"
            onClick={resetToDefaults}
            disabled={loading}
          >
            Reset to Defaults
          </button>
          <button 
            className="btn btn-primary"
            onClick={saveSettings}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Settings'}
          </button>
        </div>

        {saved && (
          <div className="save-confirmation">
            ✓ Settings saved successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationSettings;
