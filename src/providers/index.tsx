import React, { ReactNode } from 'react';
import ReduxProvider from './redux';
import { Toaster } from 'react-hot-toast';
import QueryClientProvider from './query-client';
import AuthProvider from './auth';
import { SimpleAuthProvider } from '@/components/auth/simple-auth-provider';
import DevAuthHelper from '@/components/auth/dev-auth-helper';
// Removed progress provider

interface ProvidersProps {
  children: ReactNode;
  isAuth?: boolean;
  baseCurrency?: string;
  cloudName?: string;
  preset?: string;
  shippingFee?: number;
}

export default function Providers({ 
  children, 
  isAuth, 
  baseCurrency, 
  cloudName, 
  preset, 
  shippingFee 
}: ProvidersProps): React.JSX.Element {
  return (
    <QueryClientProvider>
      <ReduxProvider>
        <SimpleAuthProvider>
          <DevAuthHelper />
          <AuthProvider isAuth={isAuth}>
            <Toaster position={'top-center'} />
            {children}
          </AuthProvider>
        </SimpleAuthProvider>
      </ReduxProvider>
    </QueryClientProvider>
  );
}
