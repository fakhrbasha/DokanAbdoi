'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
// api
import * as api from '@/services';
// usequery
import { useQuery } from '@tanstack/react-query';
// mui
import { Button, Dialog } from '@mui/material';
// components
import DeleteDialog from '@/components/dialog/delete';
import Table from '@/components/table/table';
import AttributesRow from '@/components/table/rows/attribute';
import FormDialog from '@/components/dialog/form-dialog';
import AttributesForm from '@/components/forms/attribute';
import HeaderBreadcrumbs from '@/components/header-breadcrumbs';
import { IoMdAdd } from 'react-icons/io';
import { Attribute } from '@/types/models';

const TABLE_HEAD = [
  { id: 'id', label: 'ID' },
  { id: 'name', label: 'Attribute' },
  { id: 'values', label: 'Values' },
  { id: '', label: 'Actions' }
];

export default function AttributesList(): React.JSX.Element {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const searchParam = searchParams.get('search');
  const [apicall, setApicall] = useState(false);
  const [id, setId] = useState<string | null>(null);
  const [selected, setSelected] = useState<Attribute | null>(null);

  const { data, isPending: isLoading } = useQuery({
    queryKey: ['Attributes', apicall, searchParam, pageParam],
    queryFn: () => api.getAttributesByAdmin({ page: +(pageParam || 1), search: searchParam || '' })
  });

  const handleClickOpen = (prop: string) => () => {
    setId(prop);
  };
  const handleClose = () => {
    setId(null);
  };

  const onClickEdit = (attribute: Attribute) => {
    setSelected(attribute);
  };
  return (
    <>
      <HeaderBreadcrumbs
        admin
        heading="Attributes List"
        links={[
          {
            name: 'Admin Dashboard',
            href: '/admin/dashboard'
          },
          {
            name: 'Attributes'
          }
        ]}
        action={
          <Button
            variant="contained"
            color="primary"
            onClick={() => setSelected(null)}
            startIcon={<IoMdAdd size={20} />}
          >
            Add Attribute
          </Button>
        }
      />
      <Dialog onClose={handleClose} open={!!id} maxWidth={'xs'}>
        <DeleteDialog
          onClose={handleClose}
          id={id || ''}
          apicall={setApicall}
          endPoint="deleteAttributeByAdmin"
          type={'Attribute deleted'}
          deleteMessage={
            'Are you sure you want to delete this Attribute? Please consider carefully before making irreversible changes.'
          }
        />
      </Dialog>
      <FormDialog title={'Attributes'} open={!!selected} handleClose={() => setSelected(null)}>
        <AttributesForm
          attribute={selected || undefined}
          onSuccess={() => {
            setApicall(!apicall);
            setSelected(null);
          }}
          onCancel={() => setSelected(null)}
        />
      </FormDialog>
      <Table
        headData={TABLE_HEAD}
        data={data as any}
        isLoading={isLoading}
        row={AttributesRow}
        handleClickOpen={handleClickOpen}
        onClickEdit={onClickEdit}
        isSearch
      />
    </>
  );
}
