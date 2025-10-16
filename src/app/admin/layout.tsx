'use client';
import React, { ReactNode } from 'react';
import SimpleAdminGuard from '@/guards/simple-admin-guard';
import DashboardLayout from '@/layout/_admin';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps): React.JSX.Element {
  return (
    <SimpleAdminGuard>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </SimpleAdminGuard>
  );
}
