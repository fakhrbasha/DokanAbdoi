import React from 'react';
import type { Metadata } from 'next';

// components
import HeaderBreadcrumbs from '@/components/header-breadcrumbs';
import UsersList from '@/components/_admin/users/users';

// Meta information
export const metadata: Metadata = {
  title: 'User - Nextall',
  applicationName: 'Nextall',
};

export default function UsersPage(): React.JSX.Element {
  return (
    <div>
      <HeaderBreadcrumbs
        admin
        heading="Users List"
        links={[
          {
            name: 'Dashboard',
            href: '/admin/dashboard'
          },
          {
            name: 'Users'
          }
        ]}
      />
      <UsersList />
    </div>
  );
}
