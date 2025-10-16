'use client';
import React from 'react';
import * as api from '@/services';
import { useQuery } from '@tanstack/react-query';
import GeneralSettingsForm from '@/components/forms/settings/general-form';

export default function GeneralSettingsMain(): React.JSX.Element {
  const { data, isPending } = useQuery({
    queryKey: ['get-general-settings-by-admin'],
    queryFn: () => api.getGeneralSettingsByAdmin()
  });

  return <GeneralSettingsForm currentSetting={data?.data} isLoading={isPending} />;
}
