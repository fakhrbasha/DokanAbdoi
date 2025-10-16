import React from 'react';
import { Avatar as MuiAvatar, AvatarProps as MuiAvatarProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import BlurImage from './blur-image';

interface AvatarProps extends MuiAvatarProps {
  src?: string;
  alt?: string;
  name?: string;
}

const StyledAvatar = styled(MuiAvatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

export default function Avatar({ src, alt, name, children, ...other }: AvatarProps): React.JSX.Element {
  const getInitials = (name?: string) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <StyledAvatar {...other}>
      {src ? (
        <BlurImage
          src={src}
          alt={alt || name || 'Avatar'}
          fill
          style={{ objectFit: 'cover' }}
        />
      ) : children || getInitials(name)}
    </StyledAvatar>
  );
}
