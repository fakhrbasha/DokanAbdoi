'use client';
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Badge,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  LuMenu,
  LuBell,
  LuUser,
  LuSettings,
  LuLogOut,
} from 'react-icons/lu';
import { SlHome } from 'react-icons/sl';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from '@/redux';
import { setLogout } from '@/redux/slices/user';
import { deleteCookie } from '@/hooks/use-cookies';
import type { RootState } from '@/redux';

interface HeaderProps {
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

export default function Header({ onToggleSidebar, sidebarOpen }: HeaderProps): React.JSX.Element {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await deleteCookie('token');
    dispatch(setLogout());
    handleProfileMenuClose();
    router.push('/auth/sign-in');
  };

  const handleGoHome = () => {
    handleProfileMenuClose();
    router.push('/');
  };

  const handleSettings = () => {
    handleProfileMenuClose();
    router.push('/admin/settings');
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: sidebarOpen ? 'calc(100% - 280px)' : 'calc(100% - 80px)' },
        ml: { md: sidebarOpen ? '280px' : '80px' },
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        }),
        bgcolor: 'background.paper',
        color: 'text.primary',
        boxShadow: theme.shadows[1],
        borderBottom: 1,
        borderColor: 'divider'
      }}
    >
      <Toolbar>
        {/* Sidebar Toggle */}
        <IconButton
          color="inherit"
          aria-label="toggle sidebar"
          onClick={onToggleSidebar}
          edge="start"
          sx={{ mr: 2 }}
        >
          <LuMenu />
        </IconButton>

        {/* Page Title */}
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
          Admin Dashboard
        </Typography>

        {/* Notifications */}
        <IconButton color="inherit" sx={{ mr: 1 }}>
          <Badge badgeContent={4} color="error">
            <LuBell />
          </Badge>
        </IconButton>

        {/* User Profile Menu */}
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <Avatar
            sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}
            src={user?.avatar?.url || ''}
          >
            {user?.firstName?.charAt(0)?.toUpperCase()}
          </Avatar>
        </IconButton>

        <Menu
          id="primary-search-account-menu"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={Boolean(anchorEl)}
          onClose={handleProfileMenuClose}
          PaperProps={{
            sx: { mt: 1, minWidth: 200 }
          }}
        >
          {/* User Info */}
          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="subtitle2" noWrap>
              {user?.firstName} {user?.lastName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {user?.email}
            </Typography>
          </Box>
          <Divider />

          {/* Menu Items */}
          <MenuItem onClick={handleGoHome}>
            <ListItemIcon>
              <SlHome size={20} />
            </ListItemIcon>
            <ListItemText>Go to Site</ListItemText>
          </MenuItem>

          <MenuItem onClick={handleSettings}>
            <ListItemIcon>
              <LuSettings size={20} />
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </MenuItem>

          <Divider />

          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LuLogOut size={20} />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

