'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import * as api from '@/services';
import { useQuery } from '@tanstack/react-query';
import { Dialog } from '@mui/material';
import DeleteDialog from '@/components/dialog/delete';
import Table from '@/components/table/table';
import Category from '@/components/table/rows/category';

const TABLE_HEAD = [
  { id: 'name', label: 'Category' },
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

export default function CategoryList(): React.JSX.Element {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const searchParam = searchParams.get('search');
  const [open, setOpen] = useState(false);
  const [apicall, setApicall] = useState(false);
  const [id, setId] = useState<string | null>(null);

  const { data, isPending: isLoading } = useQuery({
    queryKey: ['categories', apicall, searchParam, pageParam],
    queryFn: () => api.getCategoriesByAdmin({ page: Number(pageParam) || 1, search: searchParam || '' })
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
          endPoint="deleteCategoryByAdmin"
          type={'Category deleted'}
          deleteMessage={
            'This category is linked to products, subcategories, and child categories. Deleting it will also remove all related data. Are you sure you want to continue?'
          }
        />
      </Dialog>
      <Table
        headData={TABLE_HEAD}
        data={data as any}
        isLoading={isLoading}
        row={Category}
        handleClickOpen={handleClickOpen}
        isSearch
        filters={[{ ...STATUS_FILTER }]}
      />
    </>
  );
}

