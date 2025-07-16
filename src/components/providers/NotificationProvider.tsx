import React, { useReducer, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Notification } from '../../types';
import { NotificationContext, type NotificationContextType } from '../../contexts/NotificationContext';

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
}

type NotificationAction =
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'MARK_AS_READ'; payload: string }
  | { type: 'MARK_ALL_AS_READ' }
  | { type: 'SET_NOTIFICATIONS'; payload: Notification[] }
  | { type: 'CLEAR_ALL' };

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
};

const notificationReducer = (
  state: NotificationState,
  action: NotificationAction
): NotificationState => {
  switch (action.type) {
    case 'ADD_NOTIFICATION': {
      const newNotifications = [action.payload, ...state.notifications];
      const unreadCount = newNotifications.filter(n => !n.isRead).length;
      return {
        notifications: newNotifications,
        unreadCount,
      };
    }
    case 'REMOVE_NOTIFICATION': {
      const newNotifications = state.notifications.filter(n => n.id !== action.payload);
      const unreadCount = newNotifications.filter(n => !n.isRead).length;
      return {
        notifications: newNotifications,
        unreadCount,
      };
    }
    case 'MARK_AS_READ': {
      const newNotifications = state.notifications.map(n =>
        n.id === action.payload ? { ...n, isRead: true, readAt: new Date() } : n
      );
      const unreadCount = newNotifications.filter(n => !n.isRead).length;
      return {
        notifications: newNotifications,
        unreadCount,
      };
    }
    case 'MARK_ALL_AS_READ': {
      const newNotifications = state.notifications.map(n => ({
        ...n,
        isRead: true,
        readAt: new Date(),
      }));
      return {
        notifications: newNotifications,
        unreadCount: 0,
      };
    }
    case 'SET_NOTIFICATIONS': {
      const unreadCount = action.payload.filter(n => !n.isRead).length;
      return {
        notifications: action.payload,
        unreadCount,
      };
    }
    case 'CLEAR_ALL':
      return {
        notifications: [],
        unreadCount: 0,
      };
    default:
      return state;
  }
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  const generateId = (): string => {
    return `notification_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  };

  const addNotification = useCallback(
    (notification: Omit<Notification, 'id' | 'createdAt'>) => {
      const newNotification: Notification = {
        ...notification,
        id: generateId(),
        createdAt: new Date(),
      };
      dispatch({ type: 'ADD_NOTIFICATION', payload: newNotification });

      // Auto-remove notification after 5 seconds for non-high priority notifications
      if (notification.priority !== 'HIGH') {
        setTimeout(() => {
          dispatch({ type: 'REMOVE_NOTIFICATION', payload: newNotification.id });
        }, 5000);
      }
    },
    []
  );

  const removeNotification = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
  }, []);

  const markAsRead = useCallback((id: string) => {
    dispatch({ type: 'MARK_AS_READ', payload: id });
  }, []);

  const markAllAsRead = useCallback(() => {
    dispatch({ type: 'MARK_ALL_AS_READ' });
  }, []);

  const clearAll = useCallback(() => {
    dispatch({ type: 'CLEAR_ALL' });
  }, []);

  // Convenience methods for common notification types
  const showSuccess = useCallback(
    (message: string, title = 'Success') => {
      addNotification({
        userId: 'current', // Will be set properly when we have auth context
        type: 'SYSTEM_MAINTENANCE',
        title,
        message,
        isRead: false,
        priority: 'MEDIUM',
      });
    },
    [addNotification]
  );

  const showError = useCallback(
    (message: string, title = 'Error') => {
      addNotification({
        userId: 'current',
        type: 'SYSTEM_MAINTENANCE',
        title,
        message,
        isRead: false,
        priority: 'HIGH',
      });
    },
    [addNotification]
  );

  const showWarning = useCallback(
    (message: string, title = 'Warning') => {
      addNotification({
        userId: 'current',
        type: 'DEADLINE_APPROACHING',
        title,
        message,
        isRead: false,
        priority: 'MEDIUM',
      });
    },
    [addNotification]
  );

  const showInfo = useCallback(
    (message: string, title = 'Information') => {
      addNotification({
        userId: 'current',
        type: 'SYSTEM_MAINTENANCE',
        title,
        message,
        isRead: false,
        priority: 'LOW',
      });
    },
    [addNotification]
  );

  const contextValue: NotificationContextType = {
    state,
    addNotification,
    removeNotification,
    markAsRead,
    markAllAsRead,
    clearAll,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};
