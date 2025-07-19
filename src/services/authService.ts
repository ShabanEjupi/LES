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
    
    // Mock authentication for development - always return success with demo users
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    
    // Demo users for testing
    const demoUsers = {
      'admin': { password: 'admin123', role: 'ADMIN', name: 'Administrator' },
      'director': { password: 'director123', role: 'DIRECTOR', name: 'Drejtori i Përgjithshëm' },
      'chief': { password: 'chief123', role: 'SECTOR_CHIEF', name: 'Kreu i Sektorit' },
      'officer': { password: 'officer123', role: 'OFFICER', name: 'Oficer Doganor' },
      'test': { password: 'test', role: 'OFFICER', name: 'Test User' }
    };
    
    const user = demoUsers[username.toLowerCase() as keyof typeof demoUsers];
    
    if (!user || user.password !== password) {
      return {
        success: false,
        message: 'Emri i përdoruesit ose fjalëkalimi është i gabuar',
      };
    }
    
    const userData = {
      id: Date.now().toString(),
      username: username,
      email: `${username}@dogana.rks-gov.net`,
      fullName: user.name,
      role: {
        id: user.role,
        name: user.role,
        description: user.role === 'ADMIN' ? 'System Administrator' : 
                    user.role === 'DIRECTOR' ? 'General Director' :
                    user.role === 'SECTOR_CHIEF' ? 'Sector Chief' : 'Customs Officer',
        permissions: [],
        isSystemRole: true,
        kosovoLegalBasis: 'Law No. 05/L-037 on Customs Code of Kosovo'
      },
      department: 'CUSTOMS_PROCEDURES' as const,
      customsPost: 'Prishtinë Airport',
      officerBadgeNumber: `KS-${Date.now().toString().slice(-6)}`,
      permissions: [],
      isActive: true,
      lastLogin: new Date(),
      passwordHash: 'mock-hash', // In real app, this would be properly hashed
      failedLoginAttempts: 0,
      dataAccessLevel: user.role === 'ADMIN' || user.role === 'DIRECTOR' ? 'SECRET' as const :
                      user.role === 'SECTOR_CHIEF' ? 'CONFIDENTIAL' as const : 'INTERNAL' as const,
      hierarchyLevel: user.role === 'OFFICER' ? 1 :
                     user.role === 'SECTOR_CHIEF' ? 3 :
                     user.role === 'DIRECTOR' ? 4 : 4, // ADMIN = 4
      sectorId: 'SEC001',
      teamId: 'TEAM001',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return {
      success: true,
      user: userData,
      token: `mock-token-${Date.now()}`,
      message: 'Kyçja u krye me sukses'
    };
  } catch (error) {
    console.error('Login error:', error);
    
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Gabim gjatë kyçjes',
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
