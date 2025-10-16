'use client';
import React from 'react';
import * as api from '@/services';
import { useQuery } from '@tanstack/react-query';
import ShopForm from '@/components/forms/shop';

interface AdminShopMainProps {
  slug: string;
}

export default function AdminShopMain({ slug }: AdminShopMainProps): React.JSX.Element {
  const { data, isPending: isLoading } = useQuery({
    queryKey: ['shop-details-by-admin', slug],
    queryFn: () => api.getShopDetailsByAdmin(slug)
  });
  return <ShopForm isShopLoading={isLoading} shop={data?.data} type="admin" />;
}
