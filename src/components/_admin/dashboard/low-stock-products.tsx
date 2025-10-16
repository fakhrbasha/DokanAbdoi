'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Dialog } from '@mui/material';
import DeleteDialog from '@/components/dialog/delete';
import Table from '@/components/table/table';
import ProductRow from '@/components/table/rows/product';
import * as api from '@/services';
import { useQuery } from '@tanstack/react-query';

const TABLE_HEAD = [
  { id: 'name', label: 'Product' },
  { id: 'price', label: 'Price' },
  { id: 'stock', label: 'Stock' },
  { id: 'inventoryType', label: 'Status' },
  { id: 'createdAt', label: 'Date' },
  { id: 'rating', label: 'Rating' },
  { id: '', label: 'Actions' }
];

interface LowStockProductsProps {
  isVendor?: boolean;
}

export default function LowStockProducts({ isVendor = false }: LowStockProductsProps): React.JSX.Element {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const [open, setOpen] = useState(false);
  const [apicall, setApicall] = useState(false);
  const [id, setId] = useState<string | null>(null);

  const { data, isPending: isLoading } = useQuery({
    queryKey: ['admin-products', apicall, pageParam],
    queryFn: () => api.getLowStockProductsByAdmin(Number(pageParam) || 1)
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
          endPoint={isVendor ? 'deleteVendorProduct' : 'deleteProductByAdmin'}
          type={'Product deleted'}
          deleteMessage={
            'Are you really sure you want to remove this product? Just making sure before we go ahead with it.'
          }
        />
      </Dialog>
      {(isLoading || Boolean(data?.data?.length)) && (
        <Table
          heading={'Low Stock Products'}
          isDashboard
          headData={TABLE_HEAD}
          data={data}
          isLoading={isLoading}
          row={ProductRow}
          handleClickOpen={handleClickOpen}
          isVendor={isVendor}
        />
      )}
    </>
  );
}
