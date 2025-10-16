import React from 'react';
import { Box, CircularProgress, SxProps, Theme } from '@mui/material';
import type { LoadingProps } from '@/types/components';

export default function LinearIndeterminate({ 
  size = 'large',
  variant = 'circular',
  color = 'primary',
  sx 
}: LoadingProps): React.JSX.Element {
  const sizeValue = size === 'small' ? 24 : size === 'medium' ? 40 : 60;

  return (
    <Box
      sx={{
        position: 'fixed',
        height: { md: 'calc(100vh - 66px)', xs: 'calc(100vh - 55px)' },
        top: { md: 66, xs: 0 },
        bottom: { md: 0, xs: 55 },
        left: 0,
        width: '100%',
        bgcolor: 'background.paper',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 111,
        ...sx
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {variant === 'circular' ? (
          <CircularProgress size={sizeValue} color={color} />
        ) : (
          <Box sx={{ width: '200px' }}>
            {/* LinearProgress could be added here if needed */}
          </Box>
        )}
      </Box>
    </Box>
  );
}
