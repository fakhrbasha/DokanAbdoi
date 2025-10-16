import React from 'react';
import { useRouter } from 'next/navigation';
import { styled } from '@mui/material/styles';
import { Box, TableRow, Skeleton, TableCell, Typography, Stack, IconButton, Tooltip, Chip } from '@mui/material';
import { fDateShort } from '@/utils/format-time';
import { MdEdit, MdDelete } from 'react-icons/md';
import { Category } from '@/types/models';

interface ChildCategoryRowProps {
  isLoading: boolean;
  row: Category;
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

export default function ChildCategoryRow({ isLoading, row, handleClickOpen }: ChildCategoryRowProps): React.JSX.Element {
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
            <Skeleton variant="rectangular" width={50} height={50} sx={{ borderRadius: 1 }} />
          ) : (
            <ThumbImgStyle>
              <img 
                src={row?.cover?.url || '/placeholder-category.png'} 
                alt={row?.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </ThumbImgStyle>
          )}
          <Typography variant="subtitle2" noWrap>
            {isLoading ? <Skeleton variant="text" width={120} sx={{ ml: 1 }} /> : row?.name}
          </Typography>
        </Box>
      </TableCell>

      {/* Parent Category */}
      <TableCell>
        {isLoading ? <Skeleton variant="text" /> : row?.parent?.name || 'N/A'}
      </TableCell>

      {/* Sub Category */}
      <TableCell>
        {isLoading ? <Skeleton variant="text" /> : row?.subCategory?.name || 'N/A'}
      </TableCell>

      {/* Status */}
      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          <Chip
            size="small"
            label={row?.status}
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
                <IconButton onClick={() => router.push(`/admin/categories/child-categories/${row?.slug || row?._id || ''}`)}>
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
