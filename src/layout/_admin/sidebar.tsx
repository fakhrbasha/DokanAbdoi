'use client';
import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Box,
  Typography,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { useSelector } from '@/redux';
import { adminNavigation } from './navigation';
import type { RootState } from '@/redux';
import Logo from '@/components/logo';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  variant: 'permanent' | 'persistent' | 'temporary';
  width?: number;
}

export default function Sidebar({ open, onClose, variant, width = 280 }: SidebarProps): React.JSX.Element {
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { direction } = useSelector((state: RootState) => state.settings);

  const drawerContent = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
        borderRight: 1,
        borderColor: 'divider'
      }}
    >
      {/* Logo Section */}
      <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Logo sx={{ height: 40 }} />
      </Box>

      {/* Navigation */}
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        <List sx={{ px: 2, py: 1 }}>
          {adminNavigation.map((item) => {
            const isActive = pathname === item.path || pathname.startsWith(item.path + '/');
            
            return (
              <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
                <Tooltip title={item.title} placement="right" arrow>
                  <ListItemButton
                    component={Link}
                    href={item.path}
                    onClick={isMobile ? onClose : undefined}
                    sx={{
                      borderRadius: 2,
                      mb: 0.5,
                      color: isActive ? 'primary.main' : 'text.primary',
                      bgcolor: isActive ? 'primary.50' : 'transparent',
                      '&:hover': {
                        bgcolor: isActive ? 'primary.100' : 'action.hover'
                      },
                      '& .MuiListItemIcon-root': {
                        color: isActive ? 'primary.main' : 'text.secondary',
                        minWidth: 40
                      },
                      '& .MuiListItemText-primary': {
                        fontWeight: isActive ? 600 : 400,
                        fontSize: '0.875rem'
                      }
                    }}
                  >
                    <ListItemIcon>
                      <item.icon size={20} />
                    </ListItemIcon>
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Footer */}
      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Typography variant="caption" color="text.secondary" align="center" display="block">
          Nextall Admin v1.0
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      sx={{
        width: width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: width,
          boxSizing: 'border-box',
          border: 'none',
          boxShadow: theme.shadows[4]
        }
      }}
      anchor={direction === 'rtl' ? 'right' : 'left'}
    >
      {drawerContent}
    </Drawer>
  );
}
