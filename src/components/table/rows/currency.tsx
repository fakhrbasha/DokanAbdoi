import React from 'react';
import { useRouter } from 'next/navigation';
import { styled } from '@mui/material/styles';
import { Box, TableRow, Skeleton, TableCell, Typography, Stack, IconButton, Tooltip, Chip } from '@mui/material';
import { fDateShort } from '@/utils/format-time';
import { MdEdit, MdDelete } from 'react-icons/md';
import { Currency } from '@/types/models';

interface CurrencyRowProps {
  isLoading: boolean;
  row: Currency;
  handleClickOpen: (id: string) => () => void;
}

export default function CurrencyRow({ isLoading, row, handleClickOpen }: CurrencyRowProps): React.JSX.Element {
  const router = useRouter();

  return (
    <TableRow hover key={row?._id || Math.random()}>
      {/* Name */}
      <TableCell component="th" scope="row">
        <Typography variant="subtitle2" noWrap>
          {isLoading ? <Skeleton variant="text" width={120} /> : row?.name}
        </Typography>
      </TableCell>

      {/* Code */}
      <TableCell>
        {isLoading ? <Skeleton variant="text" /> : row?.code}
      </TableCell>

      {/* Symbol */}
      <TableCell>
        {isLoading ? <Skeleton variant="text" /> : row?.symbol}
      </TableCell>

      {/* Rate */}
      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          <Typography variant="body2">
            {row?.rate || 0}
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
            color={row?.status === 'active' ? 'success' : 'error'}
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
                <IconButton onClick={() => router.push(`/admin/currencies/${row?._id || ''}`)}>
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

