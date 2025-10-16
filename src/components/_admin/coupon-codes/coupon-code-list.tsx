'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';

// api
import * as api from '@/services';
import { useQuery } from '@tanstack/react-query';

// mui
import { Dialog } from '@mui/material';

// components
import DeleteDialog from '@/components/dialog/delete';
import Table from '@/components/table/table';
import CouponCode from '@/components/table/rows/coupon-code';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name' },
  { id: 'coupon', label: 'Coupon code' },
  { id: 'type', label: 'Type' },
  { id: 'discount', label: 'Discount' },
  { id: 'expire', label: 'Expire' },
  { id: '', label: 'actions' }
];

// ----------------------------------------------------------------------
export default function CouponCodesMain(): React.JSX.Element {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const searchParam = searchParams.get('search');
  const [open, setOpen] = useState(false);
  const [apicall, setApicall] = useState(false);
  const [id, setId] = useState<string | null>(null);

  const { data, isPending: isLoading } = useQuery({
    queryKey: ['coupon-codes', apicall, searchParam, pageParam],
    queryFn: () => api.getCouponCodesByAdmin({ page: +(pageParam || 1), search: searchParam || '' })
  });

  const handleClickOpen = (prop: string) => () => {
    setId(prop);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog onClose={handleClose} open={open} maxWidth={'xs'}>
        <DeleteDialog
          onClose={handleClose}
          id={id || ''}
          apicall={setApicall}
          endPoint="deleteCouponCodeByAdmin"
          type={'Coupon code deleted'}
          deleteMessage={'Are you sure you want Delete to Coupon Code!'}
        />
      </Dialog>
      <Table
        headData={TABLE_HEAD}
        data={data as any}
        isLoading={isLoading}
        row={CouponCode}
        handleClickOpen={handleClickOpen}
        isSearch
      />
    </>
  );
}
