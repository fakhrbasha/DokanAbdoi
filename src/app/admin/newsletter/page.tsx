import React from 'react';
import type { Metadata } from 'next';
import HeaderBreadcrumbs from '@/components/header-breadcrumbs';
import NewsletterMain from '@/components/_admin/newsletter/newsletter';

export const metadata: Metadata = {
  title: 'Newsletter - Nextall',
  applicationName: 'Nextall',
  authors: [{ name: 'Nextall' }]
};

export default function NewsletterPage(): React.JSX.Element {
  return (
    <div>
      <HeaderBreadcrumbs
        admin
        heading="Newsletter List"
        links={[
          {
            name: 'Dashboard',
            href: '/admin/dashboard'
          },
          {
            name: 'newsletter'
          }
        ]}
      />
      <NewsletterMain />
    </div>
  );
}

