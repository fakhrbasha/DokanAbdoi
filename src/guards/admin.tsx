'use client';
import React, { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { RootState, useSelector } from '@/redux';
import Loading from '@/components/loading';

interface AdminGuardProps {
  children: ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps): React.JSX.Element {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const { isAuthenticated, user, isInitialized } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    // Wait for auth initialization to complete
    if (!isInitialized) {
      return;
    }

    // Check authentication and authorization
    if (isAuthenticated === false) {
      // User is not authenticated
      setIsLoading(false);
      setIsAuthorized(false);
      toast.error("Please sign in to access the admin dashboard");
      router.push('/auth/sign-in');
      return;
    }

    if (isAuthenticated === true && user) {
      // User is authenticated, check role
      if (user.role && user.role.includes('admin')) {
        setIsLoading(false);
        setIsAuthorized(true);
      } else {
        setIsLoading(false);
        setIsAuthorized(false);
        toast.error("You're not authorized to access the admin dashboard");
        router.push('/');
      }
    }
  }, [isAuthenticated, user, isInitialized, router]);

  // Show loading while checking authentication
  if (isLoading) {
    return <Loading />;
  }

  // Show loading if not authorized (will redirect)
  if (!isAuthorized) {
    return <Loading />;
  }

  // Render children if authorized
  return <>{children}</>;
}
