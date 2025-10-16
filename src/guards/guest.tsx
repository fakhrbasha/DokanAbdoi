'use client';
import React, { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from '@/redux';
import Loading from '@/components/loading';

interface GuestProps {
  children: ReactNode;
}

export default function Guest({ children }: GuestProps): React.JSX.Element {
  const router = useRouter();
  const { isAuthenticated, user, isInitialized } = useSelector((state: any) => state.user);
  const [isAuth, setAuth] = useState(true);

  useEffect(() => {
    // Wait for auth initialization to complete
    if (!isInitialized) {
      return;
    }

    if (isAuthenticated) {
      setAuth(false);

      const isAdmin = user?.role?.includes('admin');
      const isVendor = user?.role?.includes('vendor');
      router.push(isAdmin ? '/admin/dashboard' : isVendor ? '/vendor/dashboard' : '/');
    }
  }, [isAuthenticated, user, isInitialized, router]);

  // Show loading while auth is being initialized
  if (!isInitialized || !isAuth) {
    return <Loading />;
  }

  return <>{children}</>;
}
