import React from 'react';
import type { Metadata } from 'next';
import ShopsMain from '@/components/_admin/shops/shops';
import HeaderBreadcrumbs from '@/components/header-breadcrumbs';

export const metadata: Metadata = {
  title: 'Shops - Nextall',
  applicationName: 'Nextall',
  authors: [{ name: 'Nextall' }]
};

export default function ShopsPage(): React.JSX.Element {
  return (
    <div>
      <HeaderBreadcrumbs
        admin
        heading="Shops"
        links={[
          {
            name: 'Dashboard',
            href: '/admin/dashboard'
          },
          {
            name: 'Shops'
          }
        ]}
      />
      <ShopsMain />
    </div>
  );
}

