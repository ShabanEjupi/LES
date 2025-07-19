import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotificationPage from './NotificationPage';
import NotificationCenter from './NotificationCenter';
import NotificationSettings from './NotificationSettings';

const NotificationsModule: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<NotificationPage />} />
      <Route path="/page" element={<NotificationPage />} />
      <Route path="/center" element={<NotificationCenter />} />
      <Route path="/settings" element={<NotificationSettings />} />
    </Routes>
  );
};

export default NotificationsModule;
