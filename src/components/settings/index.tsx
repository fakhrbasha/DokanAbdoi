'use client';
import React, { useState } from 'react';
import { Stack, Drawer, IconButton, Fab, Card, Typography, Divider, Box } from '@mui/material';
import { SlSettings } from 'react-icons/sl';
import { CgClose } from 'react-icons/cg';
// Removed theme mode component
import CurrencySelect from '@/components/settings/currency';
import DirectionToggle from '@/components/settings/direction';

interface SettingsProps {
  direction: 'ltr' | 'rtl';
}

export default function Settings({ direction }: SettingsProps): React.JSX.Element {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 320 }} dir={direction}>
      <Stack direction="row" justifyContent={'space-between'} alignItems={'center'} sx={{ p: 2 }}>
        <Typography variant="h5" color="inherit">
          Settings
        </Typography>
        <IconButton aria-label="close" onClick={toggleDrawer(false)}>
          <CgClose />
        </IconButton>
      </Stack>
      <Divider />
      <Stack gap={3} sx={{ mt: 1, p: 2 }}>
        <CurrencySelect />
        <DirectionToggle />
      </Stack>
    </Box>
  );

  return (
    <Card
      sx={{
        position: 'fixed',
        top: 180,
        right: 0,
        p: 0.5,
        pr: 1.5,
        borderRadius: '27px 0px 0px 27px',
        borderRightWidth: '0!important',
        zIndex: 999
      }}
    >
      <Fab
        name="wishlist"
        color="primary"
        size="small"
        sx={{
          svg: { fontSize: 22, animation: 'spin 4s linear infinite' },
          '@keyframes spin': { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } }
        }}
        onClick={toggleDrawer(true)}
      >
        <SlSettings />
      </Fab>

      <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
        {DrawerList}
      </Drawer>
    </Card>
  );
}
