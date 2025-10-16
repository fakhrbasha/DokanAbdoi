import React from 'react';
import { useRouter } from 'next/navigation';
import { styled } from '@mui/material/styles';
import { Box, TableRow, Skeleton, TableCell, Typography, Stack, IconButton, Tooltip, Chip, Avatar } from '@mui/material';
import { fDateShort } from '@/utils/format-time';
import { MdEdit, MdDelete } from 'react-icons/md';
import { useCurrencyFormat } from '@/hooks/use-currency-format';

interface OrderRowProps {
  isLoading: boolean;
  row: any; // You may want to define a proper Order type
  handleClickOpen: (slug: string) => () => void;
}

const ThumbImgStyle = styled(Box)(({ theme }) => ({
  width: 50,
  height: 50,
  minWidth: 50,
  objectFit: 'cover',
  background: theme.palette.background.default,
  marginRight: theme.spacing(2),
  border: '1px solid ' + theme.palette.divider,
  borderRadius: theme.shape.borderRadiusSm,
  position: 'relative',
  overflow: 'hidden'
}));

export function OrderList({ isLoading, row, handleClickOpen }: OrderRowProps): React.JSX.Element {
  const router = useRouter();
  const fCurrency = useCurrencyFormat();

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'processing': return 'info';
      case 'shipped': return 'primary';
      case 'delivered': return 'success';
      case 'cancelled': return 'error';
      case 'refunded': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <TableRow hover key={row?._id || Math.random()}>
      {/* Order ID */}
      <TableCell component="th" scope="row">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {isLoading ? (
            <Skeleton variant="rectangular" width={50} height={50} sx={{ borderRadius: 1 }} />
          ) : (
            <ThumbImgStyle>
              <Avatar sx={{ width: '100%', height: '100%' }}>
                #{row?.orderNumber?.slice(-4) || '0000'}
              </Avatar>
            </ThumbImgStyle>
          )}
          <Typography variant="subtitle2" noWrap>
            {isLoading ? <Skeleton variant="text" width={120} sx={{ ml: 1 }} /> : `#${row?.orderNumber || 'N/A'}`}
          </Typography>
        </Box>
      </TableCell>

      {/* Customer */}
      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          <Typography variant="subtitle2" noWrap>
            {row?.customer?.name || 'Guest'}
          </Typography>
        )}
      </TableCell>

      {/* Amount */}
      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          <Typography variant="subtitle2" color="text.primary">
            {fCurrency(row?.total || 0)}
          </Typography>
        )}
      </TableCell>

      {/* Status */}
      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          <Chip
            size="small"
            label={row?.status || 'Unknown'}
            color={getStatusColor(row?.status) as any}
          />
        )}
      </TableCell>

      {/* Date */}
      <TableCell>
        {isLoading ? <Skeleton variant="text" /> : <>{fDateShort(row?.createdAt || '')}</>}
      </TableCell>

      {/* Actions */}
      <TableCell align="right">
        <Stack direction="row" justifyContent="flex-end">
          {isLoading ? (
            <>
              <Skeleton variant="circular" width={34} height={34} sx={{ mr: 1 }} />
              <Skeleton variant="circular" width={34} height={34} />
            </>
          ) : (
            <>
              <Tooltip title="View">
                <IconButton onClick={() => router.push(`/admin/orders/${row?._id || ''}`)}>
                  <MdEdit />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton onClick={handleClickOpen(row?._id || '')}>
                  <MdDelete />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Stack>
      </TableCell>
    </TableRow>
  );
}

export default OrderList;

