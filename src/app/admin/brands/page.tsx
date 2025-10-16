import React from 'react';
import type { Metadata } from 'next';

// Components
import BrandList from '@/components/_admin/brands/brand-list';
import HeaderBreadcrumbs from '@/components/header-breadcrumbs';

// Meta information
export const metadata: Metadata = {
  title: 'Brands - Nextall',
  applicationName: 'Nextall'
};

export default function BrandsPage(): React.JSX.Element {
  return (
    <>
      <HeaderBreadcrumbs
        admin
        heading="Brands"
        links={[
          {
            name: 'Admin Dashboard',
            href: '/admin/dashboard'
          },
          {
            name: 'Brands'
          }
        ]}
        action={{
          href: `/admin/brands/add`,
          title: 'Add brand'
        }}
      />
      <BrandList />
    </>
  );
}
