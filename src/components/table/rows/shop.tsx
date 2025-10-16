import React from 'react';
import { useRouter } from 'next/navigation';
import { styled } from '@mui/material/styles';
import { Box, TableRow, Skeleton, TableCell, Typography, Stack, IconButton, Tooltip, Chip, Avatar } from '@mui/material';
import { fDateShort } from '@/utils/format-time';
import { MdEdit, MdDelete } from 'react-icons/md';
import { Shop } from '@/types/models';

interface ShopRowProps {
  isLoading: boolean;
  row: Shop;
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

export default function ShopRow({ isLoading, row, handleClickOpen }: ShopRowProps): React.JSX.Element {
  const router = useRouter();

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <TableRow hover key={row?._id || Math.random()}>
      {/* Shop */}
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
              {row?.logo?.url ? (
                <Avatar
                  src={row.logo.url}
                  alt={row?.name}
                  sx={{ width: '100%', height: '100%' }}
                />
              ) : (
                <Avatar sx={{ width: '100%', height: '100%' }}>
                  {row?.name?.charAt(0)?.toUpperCase()}
                </Avatar>
              )}
            </ThumbImgStyle>
          )}
          <Box>
            <Typography variant="subtitle2" noWrap>
              {isLoading ? <Skeleton variant="text" width={120} sx={{ ml: 1 }} /> : row?.name}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              {isLoading ? <Skeleton variant="text" width={80} sx={{ ml: 1 }} /> : row?.email}
            </Typography>
          </Box>
        </Box>
      </TableCell>

      {/* Owner */}
      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          <Typography variant="body2">
            {row?.owner?.name || row?.owner?.email || 'N/A'}
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
            color={getStatusColor(row?.status || '')}
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
                <IconButton onClick={() => router.push(`/admin/shops/${row?.slug || row?._id || ''}`)}>
                  <MdEdit />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton onClick={handleClickOpen(row?.slug || row?._id || '')}>
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

