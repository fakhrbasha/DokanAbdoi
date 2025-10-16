'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';

// api
import * as api from '@/services';
import { useQuery } from '@tanstack/react-query';
// mui
import { Dialog } from '@mui/material';
// component
import DeleteDialog from '@/components/dialog/delete';
import Table from '@/components/table/table';
import ChildCategory from '@/components/table/rows/child-categories';
import { Category } from '@/types/models';

const TABLE_HEAD = [
  { id: 'name', label: 'Childcategory' },
  { id: 'sub', label: 'Subcategory' },
  { id: 'category', label: 'Category' },
  { id: 'status', label: 'Status' },
  { id: 'createdAt', label: 'Date' },
  { id: '', label: 'Actions' }
];
interface ChildCategoryListProps {
  categories: Category[];
}

export default function ChildCategoryList({ categories }: ChildCategoryListProps): React.JSX.Element {
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);
  const [apicall, setApicall] = useState(false);
  const [id, setId] = useState<string | null>(null);

  const { data, isPending: isLoading } = useQuery({
    queryKey: ['child-categories', apicall, searchParams.toString()],
    queryFn: () => api.getChildCategoryByAdmin(searchParams.toString())
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
          endPoint="deleteChildCategoryByAdmin"
          type={'Category deleted'}
          deleteMessage={
            'This child category is linked to products. Deleting it will remove all related product associations. Are you sure you want to continue?'
          }
        />
      </Dialog>
      <Table
        headData={TABLE_HEAD}
        data={data as any}
        isLoading={isLoading}
        row={ChildCategory}
        handleClickOpen={handleClickOpen}
        isSearch
        filters={[{ name: 'Category', param: 'category', data: categories }, { ...STATUS_FILTER }]}
      />
    </>
  );
}

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
