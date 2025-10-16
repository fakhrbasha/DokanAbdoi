import React from 'react';
import type { Metadata } from 'next';

// components
import ProductsMain from '@/components/_admin/products/products';
import HeaderBreadcrumbs from '@/components/header-breadcrumbs';

// api
import * as api from '@/services';
import type { Category, Brand, Shop } from '@/types/models';

// Meta information
export const metadata: Metadata = {
  title: 'Products - Nextall',
  applicationName: 'Nextall',
};
export const dynamic = 'force-dynamic';

export default async function AdminProductsPage(): Promise<React.JSX.Element> {
  const { data: categories }: { data: Category[] } = await api.getCategoriesByAdmin();
  const { data: brands }: { data: Brand[] } = await api.getBrandsByAdmin();
  const { data: shops }: { data: Shop[] } = await api.getShopsByAdmin();

  return (
    <div>
      <HeaderBreadcrumbs
        admin
        heading="Products List"
        links={[
          {
            name: 'Dashboard',
            href: '/admin/dashboard'
          },
          {
            name: 'Products'
          }
        ]}
        action={{
          href: `/admin/products/add`,
          title: 'Add Product'
        }}
      />
      <ProductsMain categories={categories} shops={shops} brands={brands} />
    </div>
  );
}
