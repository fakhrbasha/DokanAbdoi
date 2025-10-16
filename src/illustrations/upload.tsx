import React from 'react';
import { Box, SxProps, Theme } from '@mui/material';
import { LuUpload } from 'react-icons/lu';

interface UploadIllustrationProps {
  sx?: SxProps<Theme>;
}

export default function UploadIllustration({ sx }: UploadIllustrationProps): React.JSX.Element {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        ...sx
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 120,
          height: 120,
          borderRadius: '50%',
          bgcolor: 'action.hover',
          mb: 2
        }}
      >
        <LuUpload size={48} color="#9E9E9E" />
      </Box>
    </Box>
  );
}

