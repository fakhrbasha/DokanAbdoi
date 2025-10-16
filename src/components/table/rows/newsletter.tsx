import React from 'react';
import { useRouter } from 'next/navigation';
import { styled } from '@mui/material/styles';
import { Box, TableRow, Skeleton, TableCell, Typography, Stack, IconButton, Tooltip, Chip } from '@mui/material';
import { fDateShort } from '@/utils/format-time';
import { MdEdit, MdDelete } from 'react-icons/md';

interface NewsletterRowProps {
  isLoading: boolean;
  row: any;
  handleClickOpen: (id: string) => () => void;
}

export default function NewsletterRow({ isLoading, row, handleClickOpen }: NewsletterRowProps): React.JSX.Element {
  const router = useRouter();

  return (
    <TableRow hover key={row?._id || Math.random()}>
      {/* Email */}
      <TableCell component="th" scope="row">
        <Typography variant="subtitle2" noWrap>
          {isLoading ? <Skeleton variant="text" width={150} /> : row?.email}
        </Typography>
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

