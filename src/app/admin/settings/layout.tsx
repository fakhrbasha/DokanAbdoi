'use client';
import React, { ReactNode } from 'react';
import Stack from '@mui/material/Stack';
import SettingTabs from '@/components/_admin/settings/settings-tabs';

interface SettingsLayoutProps {
  children: ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps): React.JSX.Element {
  return (
    <Stack gap={2}>
      <SettingTabs />
      {children}
    </Stack>
  );
}

