// Main authentication component for the LES system
import React from 'react';
import { AuthProvider } from './AuthProvider';

// Authentication wrapper component
const AuthContextWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
};

export default AuthContextWrapper;
