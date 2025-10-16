'use client';
import React, { useEffect, ReactNode } from 'react';
import { useDispatch, useSelector } from '@/redux';
import { setLogout } from '@/redux/slices/user';
import { setWishlist } from '@/redux/slices/wishlist';
import { deleteCookie } from '@/hooks/use-cookies';

interface AuthProviderProps {
  children: ReactNode;
  isAuth?: boolean;
}

export default function AuthProvider({ children, isAuth }: AuthProviderProps): React.JSX.Element {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: any) => state.user);

  useEffect(() => {
    if (!isAuthenticated) {
      deleteCookie('token');
      dispatch(setLogout());
      dispatch(setWishlist([]));
    }
  }, [isAuthenticated, dispatch]);

  return <>{children}</>;
}
