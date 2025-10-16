import React from 'react';
import { useRouter } from 'next/navigation';
import { styled } from '@mui/material/styles';
import { Box, TableRow, Skeleton, TableCell, Typography, Stack, IconButton, Tooltip, Chip } from '@mui/material';
import BlurImage from '@/components/blur-image';
import { fDateShort } from '@/utils/format-time';
import { MdEdit, MdDelete } from 'react-icons/md';
import { Category } from '@/types/models';

interface CategoryRowProps {
  isLoading: boolean;
  row: Category;
  handleClickOpen: (id: string) => () => void;
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

export default function CategoryRow({ isLoading, row, handleClickOpen }: CategoryRowProps): React.JSX.Element {
  const router = useRouter();

  return (
    <TableRow hover key={row?._id || Math.random()}>
      {/* Category */}
      <TableCell component="th" scope="row">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {isLoading ? (
            <Skeleton variant="rectangular" width={50} height={50} sx={{ borderRadius: 1, mr: 2 }} />
          ) : (
            <ThumbImgStyle>
              <BlurImage priority fill alt={row?.name} src={row?.icon?.url} />
            </ThumbImgStyle>
          )}
          <Typography variant="subtitle2" noWrap>
            {isLoading ? <Skeleton variant="text" width={120} /> : row?.name}
          </Typography>
        </Box>
      </TableCell>

      {/* Parent */}
      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          <Typography variant="body2">
            {row?.parent?.name || 'Root Category'}
          </Typography>
        )}
      </TableCell>

      {/* Sub Categories Count */}
      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          <Typography variant="body2">
            {row?.subCategories?.length || 0}
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
                <IconButton onClick={() => router.push(`/admin/categories/${row?.slug || row?._id || ''}`)}>
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

