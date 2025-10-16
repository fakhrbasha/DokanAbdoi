import React from 'react';
import { useRouter } from 'next/navigation';
import { styled } from '@mui/material/styles';
import { Box, TableRow, Skeleton, TableCell, Typography, Stack, IconButton, Tooltip, Chip, Avatar } from '@mui/material';
import { fDateShort } from '@/utils/format-time';
import { MdEdit, MdDelete } from 'react-icons/md';
import { useCurrencyFormat } from '@/hooks/use-currency-format';

interface PaymentRowProps {
  isLoading: boolean;
  row: any; // You may want to define a proper Payment type
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

// Payment row component for payouts
export function PayoutsListRow({ isLoading, row, handleClickOpen }: PaymentRowProps): React.JSX.Element {
  const router = useRouter();
  const fCurrency = useCurrencyFormat();

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  return (
    <TableRow hover key={row?._id || Math.random()}>
      {/* Payment ID */}
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
                #{row?._id?.slice(-4) || '0000'}
              </Avatar>
            </ThumbImgStyle>
          )}
          <Typography variant="subtitle2" noWrap>
            {isLoading ? <Skeleton variant="text" width={120} sx={{ ml: 1 }} /> : `#${row?._id || 'N/A'}`}
          </Typography>
        </Box>
      </TableCell>

      {/* Amount */}
      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          <Typography variant="subtitle2" color="text.primary">
            {fCurrency(row?.amount || 0)}
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
              <Tooltip title="Edit">
                <IconButton onClick={() => router.push(`/admin/payments/${row?._id || ''}`)}>
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

// Income list component for shop income
export function IncomeList({ isLoading, row, handleClickOpen }: PaymentRowProps): React.JSX.Element {
  const router = useRouter();
  const fCurrency = useCurrencyFormat();

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
                #{row?.orderId?.slice(-4) || '0000'}
              </Avatar>
            </ThumbImgStyle>
          )}
          <Typography variant="subtitle2" noWrap>
            {isLoading ? <Skeleton variant="text" width={120} sx={{ ml: 1 }} /> : `#${row?.orderId || 'N/A'}`}
          </Typography>
        </Box>
      </TableCell>

      {/* Income */}
      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          <Typography variant="subtitle2" color="text.primary">
            {fCurrency(row?.income || 0)}
          </Typography>
        )}
      </TableCell>

      {/* Commission */}
      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          <Typography variant="subtitle2" color="text.secondary">
            {fCurrency(row?.commission || 0)}
          </Typography>
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
                <IconButton onClick={() => router.push(`/admin/orders/${row?.orderId || ''}`)}>
                  <MdEdit />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Stack>
      </TableCell>
    </TableRow>
  );
}

export default PayoutsListRow;

