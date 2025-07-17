import { useContext } from 'react';
import { AuthContext } from './auth/AuthContext';
import type { AuthContextType } from './auth/AuthTypes';

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
