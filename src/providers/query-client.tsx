'use client';
import React, { useState, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface ReactQueryProviderProps {
  children: ReactNode;
}

export default function ReactQueryProvider({ children }: ReactQueryProviderProps): React.JSX.Element {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false
          }
        }
      })
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
