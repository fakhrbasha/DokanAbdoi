import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Table, TableHead, TableBody, TableRow, TableCell, Typography, Stack, Chip } from '@mui/material';
import { Order } from '@/types/models';
import { useCurrencyFormat } from '@/hooks/use-currency-format';

interface OrderTableProps {
  data: Order[];
  isLoading?: boolean;
}

const StyledTable = styled(Table)(({ theme }) => ({
  '& .MuiTableCell-head': {
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

export default function OrderTable({ data, isLoading = false }: OrderTableProps): React.JSX.Element {
  const fCurrency = useCurrencyFormat();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      case 'processing':
        return 'info';
      case 'shipped':
        return 'primary';
      case 'delivered':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ width: '100%', overflow: 'auto' }}>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Items</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell><Typography variant="body2">Loading...</Typography></TableCell>
                <TableCell><Typography variant="body2">Loading...</Typography></TableCell>
                <TableCell><Typography variant="body2">Loading...</Typography></TableCell>
                <TableCell><Typography variant="body2">Loading...</Typography></TableCell>
                <TableCell><Typography variant="body2">Loading...</Typography></TableCell>
                <TableCell><Typography variant="body2">Loading...</Typography></TableCell>
              </TableRow>
            ))
          ) : (
            data?.map((order) => (
              <TableRow key={order._id} hover>
                <TableCell>
                  <Typography variant="body2" fontWeight={600}>
                    {order.orderId}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {order.customer?.fullName || 'N/A'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {order.items?.length || 0} items
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight={600}>
                    {fCurrency(order.totalAmount || 0)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    size="small"
                    label={order.status}
                    color={getStatusColor(order.status || 'default')}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {new Date(order.createdAt || '').toLocaleDateString()}
                  </Typography>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </StyledTable>
    </Box>
  );
}

