'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
// components
import Table from '@/components/table/table';
import OrderList from '@/components/table/rows/order';
import DeleteDialog from '@/components/dialog/delete';
// mui
import { Dialog } from '@mui/material';
// api
import * as api from '@/services';
import { useQuery } from '@tanstack/react-query';
import { Shop } from '@/types/models';
const TABLE_HEAD = [
  { id: 'name', label: 'User' },
  { id: 'total', label: 'Total' },
  { id: 'items', label: 'items' },
  { id: 'payment', label: 'Paid Via' },
  { id: 'inventoryType', label: 'status' },
  { id: 'createdAt', label: 'Date' },
  { id: '', label: 'actions' }
];
interface AdminOrdersMainProps {
  isVendor?: boolean;
  shops?: Shop[];
}

export default function AdminOrdersMain({ isVendor, shops }: AdminOrdersMainProps): React.JSX.Element {
  const searchParams = useSearchParams();
  const [apicall, setApicall] = useState(false);
  const { data, isPending: loadingList } = useQuery({
    queryKey: ['orders', apicall, searchParams.toString()],
    queryFn: () => api[isVendor ? 'getOrdersByVendor' : 'getOrdersByAdmin'](searchParams.toString())
  });
  const [open, setOpen] = useState(false);

  const [id, setId] = useState<string | null>(null);

  const handleClickOpen = (props) => () => {
    setId(props);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const isLoading = loadingList;
  return (
    <>
      <Dialog onClose={handleClose} open={open} maxWidth={'xs'}>
        <DeleteDialog
          onClose={handleClose}
          id={id}
          apicall={setApicall}
          endPoint="deleteOrderByAdmin"
          type={'Order deleted'}
        />
      </Dialog>
      <Table
        headData={TABLE_HEAD}
        data={data}
        isLoading={isLoading}
        row={OrderList}
        handleClickOpen={handleClickOpen}
        isVendor={isVendor}
        isSearch
        filters={
          isVendor
            ? [{ ...SHOP_STATUS_FILTERS }]
            : [{ name: 'Shop', param: 'shop', data: shops }, { ...SHOP_STATUS_FILTERS }]
        }
      />
    </>
  );
}
AdminOrdersMain.propTypes = { isVendor: PropTypes.boolean };

const SHOP_STATUS_FILTERS = {
  name: 'Status',
  param: 'status',
  data: [
    {
      name: 'Pending',
      slug: 'pending'
    },
    {
      name: 'On the way',
      slug: 'on-the-way'
    },
    {
      name: 'In Review',
      slug: 'in-review'
    },
    {
      name: 'Delivered',
      slug: 'delivered'
    },
    {
      name: 'Canceled',
      slug: 'canceled'
    },
    {
      name: 'Returned',
      slug: 'returned'
    }
  ]
};
