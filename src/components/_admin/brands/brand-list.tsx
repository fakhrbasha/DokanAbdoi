'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import * as api from '@/services';
import { useQuery } from '@tanstack/react-query';
import { Dialog } from '@mui/material';
import DeleteDialog from '@/components/dialog/delete';
import Table from '@/components/table/table';
import Brand from '@/components/table/rows/brand';

const TABLE_HEAD = [
  { id: 'name', label: 'Brands' },
  { id: 'description', label: 'Description' },
  { id: 'status', label: 'Status' },
  { id: 'createdAt', label: 'Date' },
  { id: '', label: 'Actions' }
];

const STATUS_FILTER = {
  name: 'Status',
  param: 'status',
  data: [
    {
      name: 'Active',
      slug: 'active'
    },
    {
      name: 'Inactive',
      slug: 'inactive'
    }
  ]
};

export default function BrandList(): React.JSX.Element {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const searchParam = searchParams.get('search');
  const [open, setOpen] = useState(false);
  const [apicall, setApicall] = useState(false);
  const [id, setId] = useState<string | null>(null);

  const { data, isPending: isLoading } = useQuery({
    queryKey: ['brands', apicall, searchParam, pageParam],
    queryFn: () => api.getBrandsByAdmin({ page: Number(pageParam) || 1, search: searchParam || '' })
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
          endPoint="deleteBrandByAdmin"
          type={'Brand deleted'}
          deleteMessage={
            'This brand is linked to products. Deleting it will also remove all related data. Are you sure you want to continue?'
          }
        />
      </Dialog>
      <Table
        headData={TABLE_HEAD}
        data={data as any}
        isLoading={isLoading}
        row={Brand}
        handleClickOpen={handleClickOpen}
        isSearch
        filters={[{ ...STATUS_FILTER }]}
      />
    </>
  );
}

