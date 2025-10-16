import React from 'react';
import type { Metadata } from 'next';

// Components
import CategoryList from '@/components/_admin/categories/parent/category-list';
import HeaderBreadcrumbs from '@/components/header-breadcrumbs';

// Meta information
export const metadata: Metadata = {
  title: 'Categories - Nextall',
  applicationName: 'Nextall',
};

export default function CategoriesPage(): React.JSX.Element {
  return (
    <>
      <HeaderBreadcrumbs
        admin
        heading="Categories"
        links={[
          {
            name: 'Dashboard',
            href: '/admin/dashboard'
          },
          {
            name: 'Categories'
          }
        ]}
        action={{
          href: `/admin/categories/add`,
          title: 'Add Category'
        }}
      />
      <CategoryList />
    </>
  );
}
