'use client';
import React, { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/simple-auth-provider';
import Loading from '@/components/loading';

interface SimpleAuthGuardProps {
  children: ReactNode;
}

export default function SimpleAuthGuard({ children }: SimpleAuthGuardProps): React.JSX.Element {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/sign-in');
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading while checking authentication
  if (isLoading) {
    return <Loading />;
  }

  // Show loading while redirecting
  if (!isAuthenticated) {
    return <Loading />;
  }

  // User is authenticated
  return <>{children}</>;
}
