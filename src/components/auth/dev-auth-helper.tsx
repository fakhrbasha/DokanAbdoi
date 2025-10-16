'use client';
import React, { useEffect } from 'react';
import { useAuth } from './simple-auth-provider';

export default function DevAuthHelper(): React.JSX.Element {
  const { signIn, isAuthenticated } = useAuth();

  useEffect(() => {
    // Auto-authenticate for development
    if (!isAuthenticated && typeof window !== 'undefined') {
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
      
      signIn(mockUser, 'dev-token-123');
      localStorage.setItem('token', 'dev-token-123');
    }
  }, [isAuthenticated, signIn]);

  return null; // This component doesn't render anything
}
