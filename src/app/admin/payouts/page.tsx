import React from 'react';
import type { Metadata } from 'next';
import HeaderBreadcrumbs from '@/components/header-breadcrumbs';
import PayoutsMain from '@/components/_admin/payouts';
import * as api from '@/services';
import type { Shop } from '@/types/models';

export const metadata: Metadata = {
  title: 'Payouts - Nextall',
  applicationName: 'Nextall',
  authors: [{ name: 'Nextall' }]
};

export default async function PayoutsPage(): Promise<React.JSX.Element> {
  const { data: shops }: { data: Shop[] } = await api.getAllShopsByAdmin();
  
  return (
    <div>
      <HeaderBreadcrumbs
        admin
        heading="Payouts"
        links={[
          {
            name: 'Dashboard',
            href: '/admin/dashboard'
          },
          {
            name: 'Payouts'
          }
        ]}
      />
      <PayoutsMain shops={shops} />
    </div>
  );
}

