'use client';

import React from 'react';
import NextLink from 'next/link';
import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material';

interface LinkProps extends Omit<MuiLinkProps, 'href'> {
  href: string;
  children: React.ReactNode;
  noWrap?: boolean;
  variant?: 'body2' | 'body1' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'caption' | 'overline';
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(({ href, children, noWrap, variant = 'body1', ...other }, ref) => {
  return (
    <MuiLink
      ref={ref}
      component={NextLink}
      href={href}
      variant={variant}
      noWrap={noWrap}
      {...other}
    >
      {children}
    </MuiLink>
  );
});

Link.displayName = 'Link';

export default Link;

