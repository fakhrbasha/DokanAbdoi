import React from 'react';
import AdminBestSelling from '@/components/cards/best-selling';

interface BestSellingProps {
  data?: any[];
  loading: boolean;
  isVendor?: boolean;
}

export default function BestSelling({ data, loading, isVendor }: BestSellingProps): React.JSX.Element {
  return <AdminBestSelling data={data || []} loading={loading} isVendor={isVendor} />;
}

