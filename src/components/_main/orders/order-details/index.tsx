import React from 'react';
import { Box, Card, CardContent, Typography, Stack, Chip, Divider } from '@mui/material';
import { Order, OrderBilling, Product, User } from '@/types/models';
import { useCurrencyFormat } from '@/hooks/use-currency-format';
import { fDateShort } from '@/utils/format-time';
import BlurImage from '@/components/blur-image';

interface OrderDetailsProps {
  order: Order;
  isLoading?: boolean;
}

export default function OrderDetails({ order, isLoading = false }: OrderDetailsProps): React.JSX.Element {
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

  if (isLoading) {
    return (
      <Box>
        <Card>
          <CardContent>
            <Typography variant="h6">Loading order details...</Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box>
      {/* Order Header */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">Order #{order._id}</Typography>
            <Chip
              label={order.status}
              color={getStatusColor(order.status || 'default')}
              variant="outlined"
            />
          </Stack>
          
          <Stack spacing={1}>
            <Typography variant="body2" color="text.secondary">
              <strong>Order Date:</strong> {fDateShort(order.createdAt || '')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Total Amount:</strong> {fCurrency(order.totals.total || 0)}
            </Typography>
            {order.user && (
              <Typography variant="body2" color="text.secondary">
                <strong>Customer:</strong> {(order.user as User)?.firstName} {(order.user as User)?.lastName} ({(order.user as User)?.email || ''})
              </Typography>
            )}
          </Stack>
        </CardContent>
      </Card>

      {/* Order Items */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>Order Items</Typography>
          <Stack spacing={2}>
            {order.items?.map((item, index) => (
              <Box key={index}>
                <Stack direction="row" spacing={2} alignItems="center">
                  {(item.product as Product)?.images && (item.product as Product)?.images[0]?.url && (
                    <Box sx={{ width: 60, height: 60 }}>
                      <BlurImage
                        src={(item.product as Product)?.images[0]?.url || ''}
                        alt={(item.product as Product)?.name || ''}
                        fill
                        style={{ objectFit: 'cover', borderRadius: 8 }}
                      />
                    </Box>
                  )}
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2">{(item.product as Product)?.name || ''}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Quantity: {item.quantity} × {fCurrency(item.price || 0)}
                    </Typography>
                  </Box>
                  <Typography variant="subtitle2">
                    {fCurrency((item.quantity || 0) * (item.price || 0))}
                  </Typography>
                </Stack>
                {index < (order.items?.length || 0) - 1 && <Divider sx={{ mt: 2 }} />}
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>

      {/* Shipping Address */}
      {order.billing && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>Shipping Address</Typography>
            <Stack spacing={1}>
              <Typography variant="body2">
                {(order.billing as OrderBilling)?.address.firstName} {(order.billing as OrderBilling)?.address.lastName}
              </Typography>
              <Typography variant="body2">
                {(order.billing as OrderBilling)?.address.street}
              </Typography>
              <Typography variant="body2">
                {(order.billing as OrderBilling)?.address.city}, {(order.billing as OrderBilling)?.address.state} {(order.billing as OrderBilling)?.address.zipCode}
              </Typography>
              <Typography variant="body2">
                {(order.billing as OrderBilling)?.address.country}
              </Typography>   567rfb
            </Stack>
          </CardContent>
        </Card>
      )}

      {/* Payment Information */}
      {order.payment && (
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>Payment Information</Typography>
            <Stack spacing={1}>
              <Typography variant="body2">
                <strong>Method:</strong> {order.payment.method}
              </Typography>
              <Typography variant="body2">
                <strong>Status:</strong> {order.payment.status}
              </Typography>
              {order.payment.transactionId && (
                <Typography variant="body2">
                  <strong>Transaction ID:</strong> {order.payment.transactionId}
                </Typography>
              )}
            </Stack>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
