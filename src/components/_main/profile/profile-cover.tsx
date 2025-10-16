import React from 'react';
import { Box, Card, CardContent, Typography, Stack, Avatar, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { User } from '@/types/models';
import BlurImage from '@/components/blur-image';

interface ProfileCoverProps {
  user: User;
  isLoading?: boolean;
}

const RootStyle = styled(Card)(({ theme }) => ({
  position: 'relative',
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  color: theme.palette.common.white,
  '&:before': {
    content: "''",
    position: 'absolute',
    top: '-20%',
    left: '40%',
    transform: 'translateX(-50%)',
    background: theme.palette.primary.light + '50',
    height: 80,
    width: 80,
    borderRadius: '50px',
    zIndex: 1
  },
  '&:after': {
    content: "''",
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    right: '-14%',
    background: theme.palette.primary.light + '50',
    height: 80,
    width: 80,
    borderRadius: '50px',
    zIndex: 1
  }
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  '&:before': {
    content: "''",
    position: 'absolute',
    bottom: '-20%',
    left: '50%',
    transform: 'translateX(-50%)',
    background: theme.palette.primary.light + '50',
    height: 80,
    width: 80,
    borderRadius: '50px',
    zIndex: -1
  }
}));

export default function ProfileCover({ user, isLoading = false }: ProfileCoverProps): React.JSX.Element {
  if (isLoading) {
    return (
      <RootStyle>
        <CardContent>
          <ContentWrapper>
            <Typography variant="h6">Loading...</Typography>
          </ContentWrapper>
        </CardContent>
      </RootStyle>
    );
  }

  return (
    <RootStyle>
      <CardContent>
        <ContentWrapper>
          <Stack direction="row" spacing={3} alignItems="center">
            <Avatar
              sx={{
                width: 80,
                height: 80,
                border: '4px solid white',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }}
            >
              {user.avatar?.url ? (
                <BlurImage
                  src={user.avatar.url}
                  alt={user.fullName}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                user.fullName?.charAt(0)?.toUpperCase()
              )}
            </Avatar>
            
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" sx={{ mb: 1 }}>
                {user.fullName}
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
                {user.email}
              </Typography>
              <Stack direction="row" spacing={1}>
                <Chip
                  label={user.role}
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.3)'
                  }}
                />
                <Chip
                  label={user.status}
                  size="small"
                  color={user.status === 'active' ? 'success' : 'error'}
                  sx={{
                    backgroundColor: user.status === 'active' ? 'rgba(76,175,80,0.2)' : 'rgba(244,67,54,0.2)',
                    color: 'white',
                    border: `1px solid ${user.status === 'active' ? 'rgba(76,175,80,0.3)' : 'rgba(244,67,54,0.3)'}`
                  }}
                />
              </Stack>
            </Box>
          </Stack>
        </ContentWrapper>
      </CardContent>
    </RootStyle>
  );
}
