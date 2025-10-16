import React from 'react';
import { Box, SxProps, Theme } from '@mui/material';

interface NoDataFoundIllustrationProps {
  sx?: SxProps<Theme>;
}

export default function NoDataFoundIllustration({ sx }: NoDataFoundIllustrationProps): React.JSX.Element {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        p: 4,
        ...sx
      }}
    >
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="100" cy="100" r="90" fill="#f5f5f5" stroke="#e0e0e0" strokeWidth="2"/>
        <path
          d="M70 70L130 130M130 70L70 130"
          stroke="#9e9e9e"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <text x="100" y="180" textAnchor="middle" fontSize="14" fill="#9e9e9e">
          No Data Found
        </text>
      </svg>
    </Box>
  );
}