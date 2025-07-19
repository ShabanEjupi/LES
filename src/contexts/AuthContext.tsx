// Main authentication component for the LES system
import React from 'react';
import { AuthProvider } from './AuthProvider';

// Export useAuth hook and types for easy importing
export { useAuth } from './auth/AuthContext';
export type { AuthContextType } from './auth/AuthTypes';
export type { User } from '../types';

// Authentication wrapper component
const AuthContextWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
};

export default AuthContextWrapper;
