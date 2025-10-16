'use client';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signIn, setLogout, setInitialize } from '@/redux/slices/user';
import { authService } from '@/services';
import type { User } from '@/types/models';

interface AuthInitializerProps {
  children: React.ReactNode;
}

export default function AuthInitializer({ children }: AuthInitializerProps): React.JSX.Element {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check if token exists in localStorage
        const token = typeof window !== 'undefined' ? 
          localStorage.getItem('token') || sessionStorage.getItem('token') : null;

        if (token) {
          // Since authorization was removed from backend, just check if token exists
          // In a real app, you'd validate the token here
          // For now, we'll assume the token is valid if it exists
          // You can restore token validation when you re-enable backend auth
          
          // For development purposes, create a mock user if token exists
          const mockUser = {
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
          
          dispatch(signIn(mockUser));
        } else {
          // No token, ensure user is logged out
          dispatch(setLogout());
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        dispatch(setLogout());
      } finally {
        // Mark initialization as complete
        dispatch(setInitialize());
      }
    };

    initializeAuth();
  }, [dispatch]);

  return <>{children}</>;
}
