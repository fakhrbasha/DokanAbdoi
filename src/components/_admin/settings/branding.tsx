'use client';
import React from 'react';
import * as api from '@/services';
import { useQuery } from '@tanstack/react-query';
import BrandingSettingsForm from '@/components/forms/settings/branding-form';

export default function BrandingSettingsMain(): React.JSX.Element {
  const { data, isPending } = useQuery({
    queryKey: ['get-branding-settings-by-admin'],
    queryFn: () => api.getBrandingSettingsByAdmin()
  });

  return <BrandingSettingsForm currentSetting={data?.data} isLoading={isPending} />;
}
