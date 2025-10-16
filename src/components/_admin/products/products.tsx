'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Dialog, Stack } from '@mui/material';
import DeleteDialog from '@/components/dialog/delete';
import Table from '@/components/table/table';
import Product from '@/components/table/rows/product';
import * as api from '@/services';
import { useQuery } from '@tanstack/react-query';
import type { Brand, Category, Shop } from '@/types/models';

const TABLE_HEAD = [
  { id: 'name', label: 'Product' },
  { id: 'price', label: 'Price' },
  { id: 'stockQuantity', label: 'Quantity' },
  { id: 'inventoryType', label: 'Status' },
  { id: 'rating', label: 'Rating' },
  { id: 'createdAt', label: 'Date' },
  { id: '', label: 'Actions' }
];

const STATUS_FILTER = {
  name: 'Status',
  param: 'status',
  data: [
    {
      name: 'Low stock',
      key: 'low-stock'
    },
    {
      name: 'Pending',
      slug: 'pending'
    },
    {
      name: 'Draft',
      slug: 'draft'
    },
    {
      name: 'Published',
      slug: 'published'
    }
  ]
};

interface AdminProductsProps {
  brands: Brand[];
  categories: Category[];
  shops: Shop[];
  isVendor?: boolean;
}

export default function AdminProductsMain({ brands, categories, shops, isVendor = false }: AdminProductsProps): React.JSX.Element {
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [apicall, setApicall] = useState(false);
  const [id, setId] = useState<string | null>(null);

  const { data, isPending: isLoading } = useQuery({
    queryKey: ['admin-products', apicall, searchParams.toString(), isVendor],
    queryFn: () => api.getProductsByAdmin({ page: +(searchParams.get('page') || 1), search: searchParams.get('search') || '', category: searchParams.get('category') || '', brand: searchParams.get('brand') || '', shop: searchParams.get('shop') || '', status: searchParams.get('status') || '' })
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
      <Stack spacing={2} direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        {}
      </Stack>
      <Table
        headData={TABLE_HEAD}
        data={data as any}
        isLoading={isLoading}
        row={Product}
        handleClickOpen={handleClickOpen}
        brands={isVendor ? [] : brands}
        categories={isVendor ? [] : categories}
        isVendor={isVendor}
        filters={
          isVendor
            ? [{ ...STATUS_FILTER }]
            : [
                { name: 'Shop', param: 'shop', data: shops },
                { name: 'Category', param: 'category', data: categories },
                { name: 'Brand', param: 'brand', data: brands },
                { ...STATUS_FILTER }
              ]
        }
        isSearch
      />
    </>
  );
}

