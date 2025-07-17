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
    console.log('Attempting login for username:', username);
    
    // Use real endpoint for authentication
    const endpoint = `${API_BASE_URL}/auth-login`;
    console.log('API URL:', endpoint);

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.trim(),
        password: password
      }),
    });

    console.log('Login response status:', response.status);
    console.log('Login response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      let errorMessage = `Login failed with status: ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (parseError) {
        console.error('Failed to parse error response:', parseError);
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log('Login response data:', { ...data, token: data.token ? '[REDACTED]' : undefined });
    
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
    
    // Handle network errors more gracefully
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return {
        success: false,
        message: 'Network error: Unable to connect to the server. Please check your connection and try again.',
      };
    }
    
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
    console.log('🔐 Token verification - token length:', token.length);
    
    // Check if token exists and has basic structure
    if (!token || token.trim() === '') {
      console.log('❌ Token is empty');
      return false;
    }
    
    // Basic JWT structure check (should have 3 parts separated by dots)
    const parts = token.split('.');
    console.log('🔍 Token parts count:', parts.length);
    
    if (parts.length !== 3) {
      console.log('❌ Invalid JWT structure');
      return false;
    }
    
    try {
      // Decode the payload to check expiration
      const payload = JSON.parse(atob(parts[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      
      console.log('📅 Token payload:', { 
        exp: payload.exp, 
        currentTime, 
        isExpired: payload.exp && payload.exp < currentTime 
      });
      
      if (payload.exp && payload.exp < currentTime) {
        console.log('❌ Token has expired');
        return false;
      }
      
      console.log('✅ Token appears valid');
      return true;
    } catch (decodeError) {
      console.error('❌ Error decoding token:', decodeError);
      return false;
    }
  } catch (error) {
    console.error('❌ Token verification error:', error);
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
