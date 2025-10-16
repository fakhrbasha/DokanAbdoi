// Authentication state and actions hook

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { authService } from '@/services/auth.service';
import type { User, SignInRequest, SignUpRequest } from '@/types/api';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  signIn: (credentials: SignInRequest) => Promise<void>;
  signUp: (userData: SignUpRequest) => Promise<void>;
  signOut: () => void;
  refreshUser: () => Promise<void>;
  updateProfile: (data: any) => Promise<void>;
  changePassword: (data: any) => Promise<void>;
  clearError: () => void;
}

export const useAuth = (): AuthState & AuthActions => {
  const router = useRouter();
  const queryClient = useQueryClient();
  
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get current user query
  const { data: userData, isLoading: userLoading, refetch: refetchUser } = useQuery({
    queryKey: ['currentUser'],
    queryFn: authService.getCurrentUser,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: isAuthenticated
  });

  // Sign in mutation
  const signInMutation = useMutation({
    mutationFn: authService.signIn,
    onSuccess: (data) => {
      setUser(data.user);
      setIsAuthenticated(true);
      setError(null);
      
      // Store token
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', data.token);
      }
      
      toast.success('Logged in successfully!');
      
      // Redirect based on role
      const isAdmin = data.user?.role?.includes('admin');
      const isVendor = data.user?.role?.includes('vendor');
      const redirectPath = isAdmin ? '/admin/dashboard' : isVendor ? '/vendor/dashboard' : '/';
      router.push(redirectPath);
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Sign in failed. Please try again.';
      setError(message);
      toast.error(message);
    }
  });

  // Sign up mutation
  const signUpMutation = useMutation({
    mutationFn: authService.signUp,
    onSuccess: (data) => {
      setUser(data.user);
      setIsAuthenticated(true);
      setError(null);
      
      // Store token
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', data.token);
      }
      
      toast.success('Account created successfully!');
      router.push('/');
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Sign up failed. Please try again.';
      setError(message);
      toast.error(message);
    }
  });

  // Sign out mutation
  const signOutMutation = useMutation({
    mutationFn: authService.signOut,
    onSuccess: () => {
      setUser(null);
      setIsAuthenticated(false);
      setError(null);
      
      // Clear token
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
      }
      
      // Clear all queries
      queryClient.clear();
      
      toast.success('Logged out successfully!');
      router.push('/auth/sign-in');
    },
    onError: () => {
      // Even if API call fails, clear local state
      setUser(null);
      setIsAuthenticated(false);
      setError(null);
      
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
      }
      
      queryClient.clear();
      router.push('/auth/sign-in');
    }
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: authService.updateProfile,
    onSuccess: (data) => {
      setUser(data.data);
      queryClient.setQueryData(['currentUser'], { user: data.data });
      toast.success('Profile updated successfully!');
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Failed to update profile.';
      toast.error(message);
    }
  });

  // Change password mutation
  const changePasswordMutation = useMutation({
    mutationFn: authService.changePassword,
    onSuccess: () => {
      toast.success('Password changed successfully!');
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Failed to change password.';
      toast.error(message);
    }
  });

  // Check authentication status on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = typeof window !== 'undefined' ? 
          localStorage.getItem('token') || sessionStorage.getItem('token') : null;
        
        if (token) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Update user state when query data changes
  useEffect(() => {
    if (userData?.user) {
      setUser(userData.user);
      setIsAuthenticated(true);
    } else if (userData === null) {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, [userData]);

  // Actions
  const signIn = useCallback(async (credentials: SignInRequest) => {
    setError(null);
    await signInMutation.mutateAsync(credentials);
  }, [signInMutation]);

  const signUp = useCallback(async (userData: SignUpRequest) => {
    setError(null);
    await signUpMutation.mutateAsync(userData);
  }, [signUpMutation]);

  const signOut = useCallback(() => {
    signOutMutation.mutate();
  }, [signOutMutation]);

  const refreshUser = useCallback(async () => {
    if (isAuthenticated) {
      await refetchUser();
    }
  }, [isAuthenticated, refetchUser]);

  const updateProfile = useCallback(async (data: any) => {
    await updateProfileMutation.mutateAsync(data);
  }, [updateProfileMutation]);

  const changePassword = useCallback(async (data: any) => {
    await changePasswordMutation.mutateAsync(data);
  }, [changePasswordMutation]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    // State
    user,
    isAuthenticated,
    isLoading: isLoading || userLoading,
    error,
    
    // Actions
    signIn,
    signUp,
    signOut,
    refreshUser,
    updateProfile,
    changePassword,
    clearError
  };
};

// Hook for checking specific permissions
export const usePermissions = () => {
  const { user } = useAuth();
  
  const hasRole = useCallback((role: string): boolean => {
    return user?.role?.includes(role) ?? false;
  }, [user]);

  const hasAnyRole = useCallback((roles: string[]): boolean => {
    return roles.some(role => user?.role?.includes(role)) ?? false;
  }, [user]);

  const hasAllRoles = useCallback((roles: string[]): boolean => {
    return roles.every(role => user?.role?.includes(role)) ?? false;
  }, [user]);

  const isAdmin = useCallback((): boolean => {
    return hasRole('admin');
  }, [hasRole]);

  const isVendor = useCallback((): boolean => {
    return hasRole('vendor');
  }, [hasRole]);

  const isCustomer = useCallback((): boolean => {
    return hasRole('customer');
  }, [hasRole]);

  return {
    hasRole,
    hasAnyRole,
    hasAllRoles,
    isAdmin,
    isVendor,
    isCustomer
  };
};

// Hook for protected routes
export const useProtectedRoute = (requiredRole?: string, redirectTo: string = '/auth/sign-in') => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const { hasRole } = usePermissions();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push(redirectTo);
        return;
      }

      if (requiredRole && !hasRole(requiredRole)) {
        router.push('/');
        return;
      }
    }
  }, [isAuthenticated, isLoading, requiredRole, hasRole, router, redirectTo]);

  return {
    isAuthenticated,
    isLoading,
    user,
    hasAccess: isAuthenticated && (!requiredRole || hasRole(requiredRole))
  };
};
