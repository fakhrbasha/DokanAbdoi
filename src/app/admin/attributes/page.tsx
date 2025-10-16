import React from 'react';
import type { Metadata } from 'next';
import AttributesList from '@/components/_admin/attributes/attributes-list';

export const metadata: Metadata = {
  title: 'Attributes - Nextall',
  applicationName: 'Nextall',
  authors: [{ name: 'Nextall' }]
};

export default function AttributesPage(): React.JSX.Element {
  return <AttributesList />;
}

