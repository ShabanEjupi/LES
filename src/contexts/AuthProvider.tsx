import React, { useReducer, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { AuthContext } from './auth/AuthContext';
import { initialState, authReducer, type AuthContextType } from './auth/AuthTypes';
import * as authService from '../services/authService';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const checkAuth = useCallback(async (): Promise<void> => {
    try {
      console.log('🔍 checkAuth - Starting authentication check');
      const token = localStorage.getItem('authToken');
      const userStr = localStorage.getItem('user');
      
      console.log('📦 checkAuth - Storage check:', { hasToken: !!token, hasUser: !!userStr });
      
      if (token && userStr) {
        try {
          const user = JSON.parse(userStr);
          console.log('👤 checkAuth - Parsed user:', user.username);
          
          // Verify token is still valid
          console.log('🔐 checkAuth - Verifying token...');
          const isValid = await authService.verifyToken(token);
          console.log('✅ checkAuth - Token valid:', isValid);
          
          if (isValid) {
            console.log('✅ checkAuth - Dispatching AUTH_SUCCESS');
            dispatch({ type: 'AUTH_SUCCESS', payload: user });
            return;
          } else {
            console.log('❌ checkAuth - Token invalid, clearing data');
          }
        } catch (error) {
          console.error('❌ checkAuth - Error parsing user data:', error);
        }
      }
      
      // Clear invalid auth data
      console.log('🧹 checkAuth - Clearing invalid auth data and dispatching LOGOUT');
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.error('❌ checkAuth - Failed:', error);
      dispatch({ type: 'LOGOUT' });
    }
  }, []);

  // Check authentication status on app load
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (username: string, password: string): Promise<void> => {
    try {
      dispatch({ type: 'AUTH_START' });
      
      const response = await authService.login(username, password);
      
      if (response.success && response.user) {
        // Store token and user info
        if (response.token) {
          localStorage.setItem('authToken', response.token);
        }
        localStorage.setItem('user', JSON.stringify(response.user));
        
        dispatch({ type: 'AUTH_SUCCESS', payload: response.user });
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
      throw error;
    }
  };

  const logout = (): void => {
    try {
      // Clear stored auth data
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      
      // Call logout API
      authService.logout();
      
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.error('Logout error:', error);
      // Still dispatch logout even if API call fails
      dispatch({ type: 'LOGOUT' });
    }
  };

  const clearError = (): void => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const contextValue: AuthContextType = {
    state,
    login,
    logout,
    clearError,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
