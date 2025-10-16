'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

// mui
import { styled } from '@mui/material/styles';
import { Box, TableRow, Skeleton, TableCell, Typography, Stack, IconButton, Tooltip, Chip, Rating } from '@mui/material';

// components
import BlurImage from '@/components/blur-image';

// utils
import { fDateShort } from '@/utils/format-time';
import { useCurrencyFormat } from '@/hooks/use-currency-format';

// icons
import { MdEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';

const ThumbImgStyle = styled(Box)(({ theme }) => ({
  width: 50,
  height: 50,
  minWidth: 50,
  objectFit: 'cover',
  background: theme.palette.background.default,
  marginRight: theme.spacing(2),
  border: '1px solid ' + theme.palette.divider,
  borderRadius: theme.shape.borderRadius,
  position: 'relative',
  overflow: 'hidden'
}));

interface ProductRowProps {
  isLoading: boolean;
  row: {
    name?: string;
    images?: Array<{ url: string }>;
    price?: number;
    salePrice?: number;
    stockQuantity?: number;
    inventoryType?: string;
    status?: string;
    createdAt?: string;
    rating?: number;
    slug?: string;
    _id?: string;
  };
  handleClickOpen: (id: string) => () => void;
}

export default function ProductRow({ isLoading, row, handleClickOpen }: ProductRowProps): React.JSX.Element {
  const router = useRouter();
  const fCurrency = useCurrencyFormat();

  const getStockStatus = (stock: number, inventoryType: string) => {
    if (inventoryType === 'infinite') return { label: 'In Stock', color: 'success' as const };
    if (stock === 0) return { label: 'Out of Stock', color: 'error' as const };
    if (stock <= 10) return { label: 'Low Stock', color: 'warning' as const };
    return { label: 'In Stock', color: 'success' as const };
  };

  const stockStatus = getStockStatus(row?.stockQuantity || 0, row?.inventoryType || '');

  return (
    <TableRow hover key={row?._id || Math.random()}>
      {/* Product */}
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
              <BlurImage 
                priority 
                fill 
                alt={row?.name || 'Product'} 
                src={row?.images?.[0]?.url || '/placeholder.jpg'} 
              />
            </ThumbImgStyle>
          )}
          <Typography variant="subtitle2" noWrap>
            {isLoading ? <Skeleton variant="text" width={120} sx={{ ml: 1 }} /> : row?.name}
          </Typography>
        </Box>
      </TableCell>

      {/* Price */}
      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="subtitle2" color="text.primary">
              {fCurrency(row?.salePrice || row?.price || 0)}
            </Typography>
            {row?.salePrice && row?.salePrice < (row?.price || 0) && (
              <Typography variant="caption" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                {fCurrency(row?.price || 0)}
              </Typography>
            )}
          </Stack>
        )}
      </TableCell>

      {/* Stock */}
      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          <Typography variant="body2">
            {row?.inventoryType === 'infinite' ? '∞' : row?.stockQuantity || 0}
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
            label={stockStatus.label}
            color={stockStatus.color}
          />
        )}
      </TableCell>

      {/* Date */}
      <TableCell>
        {isLoading ? <Skeleton variant="text" /> : <>{fDateShort(row?.createdAt || '')}</>}
      </TableCell>

      {/* Rating */}
      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          <Rating 
            value={row?.rating || 0} 
            readOnly 
            size="small" 
            precision={0.1}
          />
        )}
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
                <IconButton onClick={() => router.push(`/admin/products/${row?.slug || row?._id || ''}`)}>
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
