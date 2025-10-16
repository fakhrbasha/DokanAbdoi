import React from 'react';
import { useRouter } from 'next/navigation';
import { styled } from '@mui/material/styles';
import { Box, TableRow, Skeleton, TableCell, Typography, Stack, IconButton, Tooltip, Chip, Avatar } from '@mui/material';
import { fDateShort } from '@/utils/format-time';
import { MdEdit, MdDelete } from 'react-icons/md';
import { User } from '@/types/models';

interface UserRowProps {
  isLoading: boolean;
  row: User;
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

export default function UserRow({ isLoading, row, handleClickOpen }: UserRowProps): React.JSX.Element {
  const router = useRouter();

  const getRoleColor = (role: string) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return 'error';
      case 'user':
        return 'primary';
      case 'vendor':
        return 'secondary';
      default:
        return 'default';
    }
  };

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
      {/* User */}
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
              {row?.avatar?.url ? (
                <Avatar
                  src={row.avatar.url}
                  alt={row?.name}
                  sx={{ width: '100%', height: '100%' }}
                />
              ) : (
                <Avatar sx={{ width: '100%', height: '100%' }}>
                  {row?.name?.charAt(0)?.toUpperCase() || row?.email?.charAt(0)?.toUpperCase()}
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

      {/* Role */}
      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          <Chip
            size="small"
            label={row?.role || 'User'}
            color={getRoleColor(row?.role || '')}
          />
        )}
      </TableCell>

      {/* Status */}
      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          <Chip
            size="small"
            label={row?.status || 'Active'}
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
                <IconButton onClick={() => router.push(`/admin/users/${row?._id || ''}`)}>
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

