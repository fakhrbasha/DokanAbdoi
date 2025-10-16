// react
import React from 'react';
import { useRouter } from 'next/navigation';
// mui
import { IconButton, Stack, Typography, alpha } from '@mui/material';
import { IoMdHeartEmpty } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux';

// ----------------------------------------------------------------------
export default function WishlistWidget(): React.JSX.Element {
  const router = useRouter();

  const { wishlist } = useSelector((state: RootState) => state.wishlist);
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        width="auto"
        sx={{
          cursor: 'pointer',
          '&:hover': {
            button: {
              bgcolor: 'primary.main',
              color: 'white',
              borderColor: 'primary.main'
            }
          }
        }}
        onClick={() => {
          if (!isAuthenticated) {
            router.push('/auth/sign-in');
          } else {
            router.push('/profile/wishlist');
          }
        }}
        spacing={1}
      >
        <IconButton
          name="wishlist"
          color="primary"
          disableRipple
          sx={{
            ml: 1,
            outlineWidth: 1,
            outlineColor: 'primary',
            outlineStyle: 'solid',
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
            transition: 'all 0.2s ease-in-out'
          }}
          onClick={() => {
            if (!isAuthenticated) {
              router.push('/auth/sign-in');
            } else {
              router.push('/profile/wishlist');
            }
          }}
        >
          <IoMdHeartEmpty />
        </IconButton>
        <Stack gap={0.5}>
          <Typography lineHeight={1} variant="subtitle2" color="text.primary">
            Wishlist
          </Typography>
          <Typography lineHeight={1} variant="body1" color="text.secondary">
            {wishlist?.length || 0} {wishlist?.length > 1 ? 'Items' : 'Item'}
          </Typography>
        </Stack>
      </Stack>
    </>
  );
}
