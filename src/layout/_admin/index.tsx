'use client';
import React, { useState, useEffect, ReactNode } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import Sidebar from './sidebar';
import Header from './header';
import type { BrandingSettings } from '@/types/models';

interface DashboardLayoutProps {
  children: ReactNode;
  branding?: BrandingSettings;
}

export default function DashboardLayout({ children, branding }: DashboardLayoutProps): React.JSX.Element {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  // Handle sidebar state based on screen size
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  const sidebarWidth = sidebarOpen ? 280 : 80;
  const sidebarVariant = isMobile ? 'temporary' : 'persistent';

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        onClose={handleCloseSidebar}
        variant={sidebarVariant}
        width={sidebarWidth}
      />

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          width: { md: sidebarOpen ? 'calc(100% - 280px)' : 'calc(100% - 80px)' },
          transition: theme.transitions.create(['width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
          }),
          ml: { md: sidebarOpen ? '280px' : '80px' }
        }}
      >
        {/* Header */}
        <Header onToggleSidebar={handleToggleSidebar} sidebarOpen={sidebarOpen} />

        {/* Content */}
        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            mt: 8, // Account for fixed header
            bgcolor: 'background.default',
            minHeight: 'calc(100vh - 64px)'
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}

