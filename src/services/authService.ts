import type { User, ApiResponse } from '../types';

const API_BASE_URL = '/api';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  message?: string;
}

/**
 * Authenticate user with username and password
 */
export const login = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    // Mock authentication for development
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    
    // Mock user credentials
    if (username === 'admin' && password === 'admin') {
      const mockUser: User = {
        id: '1',
        username: 'admin',
        email: 'admin@customs.gov.al',
        fullName: 'Administrator User',
        department: 'IT_DEPARTMENT',
        passwordHash: 'hashed_password',
        failedLoginAttempts: 0,
        dataAccessLevel: 'SECRET',
        role: {
          id: '1',
          name: 'Administrator',
          description: 'System administrator with full access',
          isSystemRole: true,
          permissions: [
            { id: '1', name: 'Read Users', resource: 'users', action: 'read' },
            { id: '2', name: 'Manage Users', resource: 'users', action: 'write' },
            { id: '3', name: 'Read Documents', resource: 'documents', action: 'read' },
            { id: '4', name: 'Manage Documents', resource: 'documents', action: 'write' },
            { id: '5', name: 'Read Cases', resource: 'cases', action: 'read' },
            { id: '6', name: 'Manage Cases', resource: 'cases', action: 'write' },
            { id: '7', name: 'Read Reports', resource: 'reports', action: 'read' },
            { id: '8', name: 'Read Audit Logs', resource: 'audit', action: 'read' },
            { id: '9', name: 'Manage Settings', resource: 'settings', action: 'write' },
          ],
        },
        permissions: [
          { id: '1', name: 'Read Users', resource: 'users', action: 'read' },
          { id: '2', name: 'Manage Users', resource: 'users', action: 'write' },
          { id: '3', name: 'Read Documents', resource: 'documents', action: 'read' },
          { id: '4', name: 'Manage Documents', resource: 'documents', action: 'write' },
          { id: '5', name: 'Read Cases', resource: 'cases', action: 'read' },
          { id: '6', name: 'Manage Cases', resource: 'cases', action: 'write' },
          { id: '7', name: 'Read Reports', resource: 'reports', action: 'read' },
          { id: '8', name: 'Read Audit Logs', resource: 'audit', action: 'read' },
          { id: '9', name: 'Manage Settings', resource: 'settings', action: 'write' },
        ],
        isActive: true,
        lastLogin: new Date(),
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date(),
      };

      return {
        success: true,
        user: mockUser,
        token: 'mock-jwt-token-12345',
        message: 'Login successful',
      };
    } else {
      return {
        success: false,
        message: 'Invalid username or password',
      };
    }
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Login failed',
    };
  }
};

/**
 * Logout current user
 */
export const logout = async (): Promise<void> => {
  try {
    // Mock logout for development
    await new Promise(resolve => setTimeout(resolve, 200)); // Simulate network delay
    console.log('User logged out successfully');
  } catch (error) {
    console.error('Logout error:', error);
  }
};

/**
 * Verify if the current token is valid
 */
export const verifyToken = async (token: string): Promise<boolean> => {
  try {
    // Mock token verification for development
    await new Promise(resolve => setTimeout(resolve, 200)); // Simulate network delay
    
    // For development, consider all tokens valid if they exist
    return token === 'mock-jwt-token-12345';
  } catch (error) {
    console.error('Token verification error:', error);
    return false;
  }
};

/**
 * Get current user profile
 */
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) return null;

    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get current user');
    }

    const data = await response.json() as ApiResponse<User>;
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
};

/**
 * Change user password
 */
export const changePassword = async (
  currentPassword: string,
  newPassword: string
): Promise<boolean> => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('No authentication token');

    const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currentPassword,
        newPassword,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to change password');
    }

    const data = await response.json() as ApiResponse<boolean>;
    return data.success;
  } catch (error) {
    console.error('Change password error:', error);
    throw error;
  }
};

/**
 * Request password reset
 */
export const requestPasswordReset = async (email: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error('Failed to request password reset');
    }

    const data = await response.json() as ApiResponse<boolean>;
    return data.success;
  } catch (error) {
    console.error('Password reset request error:', error);
    throw error;
  }
};

/**
 * Get authorization header for API requests
 */
export const getAuthHeader = (): Record<string, string> => {
  const token = localStorage.getItem('authToken');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

/**
 * Check if user has specific permission
 */
export const hasPermission = (user: User | null, resource: string, action: string): boolean => {
  if (!user || !user.permissions) return false;
  
  return user.permissions.some(
    permission => permission.resource === resource && permission.action === action
  );
};

/**
 * Check if user has any of the specified roles
 */
export const hasRole = (user: User | null, roleNames: string[]): boolean => {
  if (!user || !user.role) return false;
  
  return roleNames.includes(user.role.name);
};

/**
 * Format user display name
 */
export const formatUserName = (user: User): string => {
  return user.fullName || user.username;
};
