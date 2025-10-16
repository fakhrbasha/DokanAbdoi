import React from 'react';
import type { Metadata } from 'next';

// components
import HeaderBreadcrumbs from '@/components/header-breadcrumbs';
import OrdersMain from '@/components/_admin/orders/orders';

// api
import * as api from '@/services';
import type { Shop } from '@/types/models';

// Meta information
export const metadata: Metadata = {
  title: 'Order - Nextall',
  applicationName: 'Nextall',
};

export default async function OrdersPage(): Promise<React.JSX.Element> {
  const { data: shops }: { data: Shop[] } = await api.getAllShopsByAdmin();
  
  return (
    <div>
      <HeaderBreadcrumbs
        admin
        heading="Orders List"
        links={[
          {
            name: 'Dashboard',
            href: '/admin/dashboard'
          },
          {
            name: 'Orders'
          }
        ]}
      />
      <OrdersMain shops={shops} />
    </div>
  );
}
