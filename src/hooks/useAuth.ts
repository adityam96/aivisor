import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// Types
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

// Hook for user login
export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      // In a real app, this would be an API call
      // return axios.post('/api/auth/login', credentials);
      
      // Mock implementation
      return new Promise<{ user: User; token: string }>((resolve) => {
        setTimeout(() => {
          resolve({
            user: {
              id: '123',
              name: 'Test User',
              email: credentials.email,
              role: 'user',
            },
            token: 'mock-jwt-token',
          });
        }, 500);
      });
    },
    onSuccess: (data) => {
      // Store token in localStorage
      localStorage.setItem('token', data.token);
      
      // Update user in cache
      queryClient.setQueryData(['currentUser'], data.user);
      
      // Invalidate and refetch current user query
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    }
  });
};

// Hook for user registration
export const useRegister = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: RegisterData) => {
      // In a real app, this would be an API call
      // return axios.post('/api/auth/register', data);
      
      // Mock implementation
      return new Promise<{ user: User; token: string }>((resolve) => {
        setTimeout(() => {
          resolve({
            user: {
              id: '123',
              name: data.name,
              email: data.email,
              role: 'user',
            },
            token: 'mock-jwt-token',
          });
        }, 500);
      });
    },
    onSuccess: (data) => {
      // Store token in localStorage
      localStorage.setItem('token', data.token);
      
      // Update user in cache
      queryClient.setQueryData(['currentUser'], data.user);
    }
  });
};

// Hook for user logout
export const useLogout = () => {
  const queryClient = useQueryClient();
  
  return () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    
    // Clear user from cache
    queryClient.setQueryData(['currentUser'], null);
    
    // Invalidate queries
    queryClient.invalidateQueries({ queryKey: ['currentUser'] });
  };
};

// Hook for fetching current user
export const useCurrentUser = () => {
  return useQuery<User | null>({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        return null;
      }
      
      // In a real app, this would be an API call
      // return axios.get('/api/auth/me', {
      //   headers: { Authorization: `Bearer ${token}` }
      // });
      
      // Mock implementation
      return new Promise<User>((resolve) => {
        setTimeout(() => {
          resolve({
            id: '123',
            name: 'Test User',
            email: 'test@example.com',
            role: 'user',
          });
        }, 500);
      });
    },
    staleTime: 5 * 60 * 1000 // 5 minutes
  });
};

// Hook for forgot password
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      // In a real app, this would be an API call
      // return axios.post('/api/auth/forgot-password', { email });
      
      // Mock implementation
      return new Promise<{ message: string }>((resolve) => {
        setTimeout(() => {
          resolve({
            message: 'Password reset email sent',
          });
        }, 500);
      });
    }
  });
};

// Hook for reset password
export const useResetPassword = () => {
  return useMutation({
    mutationFn: async ({ token, password }: { token: string; password: string }) => {
      // In a real app, this would be an API call
      // return axios.post('/api/auth/reset-password', { token, password });
      
      // Mock implementation
      return new Promise<{ message: string }>((resolve) => {
        setTimeout(() => {
          resolve({
            message: 'Password reset successful',
          });
        }, 500);
      });
    }
  });
};

// Combined auth hook for convenience
export const useAuth = () => {
  const login = useLogin();
  const register = useRegister();
  const logout = useLogout();
  const currentUser = useCurrentUser();
  const forgotPassword = useForgotPassword();
  const resetPassword = useResetPassword();
  
  return {
    login,
    register,
    logout,
    currentUser,
    forgotPassword,
    resetPassword,
    isAuthenticated: !!currentUser.data,
    user: currentUser.data,
    isLoading: currentUser.isLoading,
  };
};
