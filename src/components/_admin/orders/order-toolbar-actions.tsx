'use client';
import React from 'react';
import { toast } from 'react-hot-toast';

// component
import OrderStatus from '@/components/_admin/orders/order-status';
// mui
import { Stack, Box, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
// api
import * as api from '@/services';
import { useMutation } from '@tanstack/react-query';
// icons
import { MdOutlineDeleteOutline } from 'react-icons/md';

interface OrderToolbarActionsProps {
  data: any;
  isVendor?: boolean;
}

export default function OrderToolbarActions({ data, isVendor }: OrderToolbarActionsProps): React.JSX.Element {
  const router = useRouter();
  const { mutate, isPending: deleteLoading } = useMutation({
    mutationFn: api.deleteOrderByAdmin,
    onSuccess: (data) => {
      toast.success(data?.message || 'Order deleted successfully');
      router.push('/admin/orders');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete order');
      router.push('/404');
    }
  });

  return (
    <Box mb={{ sm: 0, xs: 2 }}>
      <Stack direction="row" alignItems="center" spacing={1}>
        {isVendor ? null : (
          <Button
            variant="contained"
            startIcon={<MdOutlineDeleteOutline />}
            onClick={() => mutate(data?._id)}
            loading={deleteLoading}
            loadingPosition="start"
          >
            {'Delete'}
          </Button>
        )}

        <OrderStatus isVendor={isVendor} data={data} />
      </Stack>
    </Box>
  );
}
