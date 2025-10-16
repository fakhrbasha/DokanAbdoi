'use client';
import React, { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/simple-auth-provider';
import Loading from '@/components/loading';

interface SimpleAdminGuardProps {
  children: ReactNode;
}

export default function SimpleAdminGuard({ children }: SimpleAdminGuardProps): React.JSX.Element {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        // Not authenticated, redirect to sign in
        router.push('/auth/sign-in');
        return;
      }

      if (user && !user.role?.includes('admin')) {
        // Not an admin, redirect to home
        router.push('/');
        return;
      }
    }
  }, [isAuthenticated, user, isLoading, router]);

  // Show loading while checking authentication
  if (isLoading) {
    return <Loading />;
  }

  // Show loading while redirecting
  if (!isAuthenticated || !user?.role?.includes('admin')) {
    return <Loading />;
  }

  // User is authenticated and is admin
  return <>{children}</>;
}
