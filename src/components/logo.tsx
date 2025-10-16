import React from 'react';
import Link from 'next/link';
import { Box, useTheme, SxProps, Theme } from '@mui/material';
import Image from 'next/image';
import type { LogoProps } from '@/types/components';

const Logo = ({ 
  branding, 
  sx, 
  href = '/',
  height = 50,
  width = 200 
}: LogoProps): React.JSX.Element => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  
  if (!branding?.logoLight?.url || !branding?.logoDark?.url) {
    return (
      <Box
        component={Link}
        href={href}
        sx={{
          display: 'inline-block',
          height,
          width: 'auto',
          ...sx
        }}
      >
        <Image
          src="/logo.png"
          alt="Logo"
          height={height}
          width={width}
          style={{ height, width: 'auto' }}
        />
      </Box>
    );
  }

  return (
    <Box
      component={Link}
      href={href}
      sx={{
        display: 'inline-block',
        height,
        width: 'auto',
        ...sx
      }}
    >
      <Image
        src={isDarkMode ? branding.logoDark.url : branding.logoLight.url}
        alt="Logo"
        height={height}
        width={width}
        style={{ height, width: 'auto' }}
      />
    </Box>
  );
};

export default Logo;
