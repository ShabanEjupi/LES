import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserManagement from './UserManagement';
import UserCreate from './UserCreate';

const UserRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<UserManagement />} />
      <Route path="/new" element={<UserCreate />} />
    </Routes>
  );
};

export default UserRouter;
