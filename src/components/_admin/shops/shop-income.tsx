'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

// api
import * as api from '@/services';
import { useQuery } from '@tanstack/react-query';
// components
import Table from '@/components/table/table';
import IncomeList from '@/components/table/rows/payment';
import EditPaymentDialog from '@/components/dialog/edit-payment';

// mui
import { Typography } from '@mui/material';
const TABLE_HEAD = [
  //   { id: 'name', label: 'Shop'},
  { id: 'items', label: 'Sale' },
  { id: 'total', label: 'Total' },
  { id: 'earning', label: 'Total Income' },
  { id: 'commission', label: 'commission' },

  { id: 'status', label: 'status' },
  { id: 'createdAt', label: 'Created' },
  { id: '', label: 'actions', align: 'right' }
];
interface ShopIncomeListProps {
  slug: string;
  onUpdatePayment?: () => void;
  isVendor?: boolean;
}

export default function ShopIncomeList({ slug, onUpdatePayment, isVendor }: ShopIncomeListProps): React.JSX.Element {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const [payment, setPayment] = useState<any>(null);
  const [count, setCount] = useState(0);

  const { data, isPending: loadingList } = useQuery({
    queryKey: ['income', slug, pageParam, count, isVendor], // Added all dependencies
    queryFn: () => api[isVendor ? 'getIncomeByVendor' : 'getShopIncomeByAdmin'](slug, pageParam)
  });

  useEffect(() => {
    if (data) {
      onUpdatePayment(); // Handle success case
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const isLoading = loadingList;

  return (
    <div>
      <Typography variant="h5" color="text.primary" mb={1}>
        Income Report
      </Typography>

      <Table
        headData={TABLE_HEAD}
        data={data}
        isLoading={isLoading}
        row={IncomeList}
        handleClickOpen={(v) => setPayment(v)}
        isVendor={isVendor}
      />

      <EditPaymentDialog
        handleClose={() => setPayment(null)}
        open={Boolean(payment)}
        data={payment}
        setCount={setCount}
      />
    </div>
  );
}
ShopIcomeList.propTypes = { isVendor: PropTypes.boolean, slug: PropTypes.string, onUpdatePayment: PropTypes.func };
