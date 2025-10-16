import React from 'react';
import type { Metadata } from 'next';
import Dashboard from '@/components/_admin/dashboard';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Nextall E-commerce Script',
  description: 'Admin dashboard for Nextall e-commerce platform management',
  applicationName: 'Nextall',
  authors: [{ name: 'Nextall' }],
  keywords: 'admin, dashboard, ecommerce, Nextall, management',
  icons: {
    icon: 'https://nextall.vercel.app/favicon.png'
  },
  openGraph: {
    images: 'https://nextall.vercel.app/opengraph-image.png?1c6a1fa20db2840f'
  }
};

export default function DashboardPage(): React.JSX.Element {
  return <Dashboard />;
}
