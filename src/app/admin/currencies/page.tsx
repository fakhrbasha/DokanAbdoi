import React from 'react';
import type { Metadata } from 'next';
import CurrencyList from '@/components/_admin/currencies/currency-list';

export const metadata: Metadata = {
  title: 'Currencies - Nextall',
  applicationName: 'Nextall',
  authors: [{ name: 'Nextall' }]
};

export default function CurrenciesPage(): React.JSX.Element {
  return <CurrencyList />;
}

