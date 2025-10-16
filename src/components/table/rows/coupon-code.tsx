import React from 'react';
import { useRouter } from 'next/navigation';
import { styled } from '@mui/material/styles';
import { Box, TableRow, Skeleton, TableCell, Typography, Stack, IconButton, Tooltip, Chip } from '@mui/material';
import { fDateShort } from '@/utils/format-time';
import { MdEdit, MdDelete } from 'react-icons/md';
import { CouponCode } from '@/types/models';
import { useCurrencyFormat } from '@/hooks/use-currency-format';

interface CouponCodeRowProps {
  isLoading: boolean;
  row: CouponCode;
  handleClickOpen: (id: string) => () => void;
}

export default function CouponCodeRow({ isLoading, row, handleClickOpen }: CouponCodeRowProps): React.JSX.Element {
  const router = useRouter();
  const fCurrency = useCurrencyFormat();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'error';
      case 'expired':
        return 'warning';
      default:
        return 'default';
    }
  };

  const formatValue = (type: string, value: number) => {
    if (type === 'percentage') {
      return `${value}%`;
    }
    return fCurrency(value);
  };

  return (
    <TableRow hover key={row?._id || Math.random()}>
      {/* Code */}
      <TableCell component="th" scope="row">
        <Typography variant="subtitle2" noWrap>
          {isLoading ? <Skeleton variant="text" width={100} /> : row?.code}
        </Typography>
      </TableCell>

      {/* Description */}
      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
            {row?.description || 'No description'}
          </Typography>
        )}
      </TableCell>

      {/* Type & Value */}
      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          <Typography variant="body2">
            {row?.type && row?.value ? formatValue(row.type, row.value) : 'N/A'}
          </Typography>
        )}
      </TableCell>

      {/* Usage */}
      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          <Typography variant="body2">
            {row?.usageCount || 0} / {row?.usageLimit || '∞'}
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
            label={row?.status || 'active'}
            color={getStatusColor(row?.status || 'active')}
          />
        )}
      </TableCell>

      {/* Expiry Date */}
      <TableCell>
        {isLoading ? <Skeleton variant="text" /> : <>{fDateShort(row?.endDate || '')}</>}
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
                <IconButton onClick={() => router.push(`/admin/coupon-codes/${row?._id || ''}`)}>
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

