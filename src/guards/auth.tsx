'use client';
import React, { useEffect, useState, ReactNode } from 'react';
import { useSelector } from '@/redux';
import { useRouter } from 'next/navigation';
import Loading from '@/components/loading';

interface AuthProps {
  children: ReactNode;
}

export default function Auth({ children }: AuthProps): React.JSX.Element {
  const router = useRouter();
  const { isAuthenticated, isInitialized } = useSelector((state: any) => state.user);
  const [isAuth, setAuth] = useState(true);

  useEffect(() => {
    // Wait for auth initialization to complete
    if (!isInitialized) {
      return;
    }

    if (!isAuthenticated) {
      setAuth(false);
      router.push('/auth/sign-in');
    }
  }, [isAuthenticated, isInitialized, router]);

  // Show loading while auth is being initialized
  if (!isInitialized || !isAuth) {
    return <Loading />;
  }

  return <>{children}</>;
}
