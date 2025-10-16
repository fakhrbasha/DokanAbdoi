'use client';
import React, { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/simple-auth-provider';
import Loading from '@/components/loading';

interface SimpleGuestGuardProps {
  children: ReactNode;
}

export default function SimpleGuestGuard({ children }: SimpleGuestGuardProps): React.JSX.Element {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      // User is authenticated, redirect based on role
      const isAdmin = user.role?.includes('admin');
      const isVendor = user.role?.includes('vendor');
      const redirectPath = isAdmin ? '/admin/dashboard' : isVendor ? '/vendor/dashboard' : '/';
      router.push(redirectPath);
    }
  }, [isAuthenticated, user, isLoading, router]);

  // Show loading while checking authentication
  if (isLoading) {
    return <Loading />;
  }

  // Show loading while redirecting
  if (isAuthenticated) {
    return <Loading />;
  }

  // User is not authenticated, show guest content
  return <>{children}</>;
}
