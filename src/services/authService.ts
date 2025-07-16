import type { User, ApiResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/.netlify/functions';

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
    const response = await fetch(`${API_BASE_URL}/auth-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.trim(),
        password: password
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Login failed with status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Login failed');
    }

    return {
      success: true,
      user: data.user,
      token: data.token,
      message: data.message
    };
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
