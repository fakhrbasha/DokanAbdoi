'use client';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  _id: string;
  fullName: string;
  email: string;
  role: string[];
  status: string;
  isVerified: boolean;
  avatar?: any;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (userData: User, token?: string) => void;
  signOut: () => void;
  checkAuth: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface SimpleAuthProviderProps {
  children: ReactNode;
}

export function SimpleAuthProvider({ children }: SimpleAuthProviderProps): React.JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const token = typeof window !== 'undefined' ? 
          localStorage.getItem('token') || sessionStorage.getItem('token') : null;

        if (token) {
          // For development - create a mock admin user
          const mockUser: User = {
            _id: '1',
            fullName: 'Admin User',
            email: 'admin@example.com',
            role: ['admin'],
            status: 'active',
            isVerified: true,
            avatar: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          
          setUser(mockUser);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const signIn = (userData: User, token?: string) => {
    setUser(userData);
    setIsAuthenticated(true);
    
    if (token && typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  };

  const signOut = () => {
    setUser(null);
    setIsAuthenticated(false);
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
    }
  };

  const checkAuth = () => {
    const token = typeof window !== 'undefined' ? 
      localStorage.getItem('token') || sessionStorage.getItem('token') : null;
    return !!token;
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    signIn,
    signOut,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a SimpleAuthProvider');
  }
  return context;
}
