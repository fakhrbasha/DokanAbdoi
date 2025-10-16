'use client';
import React from 'react';
import Link from '@mui/material/Link';
import { Box, Button, Stack, Typography, alpha, useTheme, Breadcrumbs, SxProps, Theme } from '@mui/material';
import { IoMdAdd } from 'react-icons/io';
// Removed theme dependency
import type { HeaderBreadcrumbsProps, BreadcrumbLink, BreadcrumbAction } from '@/types/components';

interface LinkItemProps {
  link: BreadcrumbLink;
  admin: boolean;
}

function LinkItem({ link, admin }: LinkItemProps): React.JSX.Element {
  const { href, name, icon } = link;
  
  return (
    <Typography
      component={Link as any}
      key={name}
      href={href || ''}
      variant={admin ? 'subtitle1' : 'subtitle2'}
      sx={{
        lineHeight: 2,
        display: 'flex',
        alignItems: 'center',
        color: admin ? 'text.primary' : 'common.white',
        '& > div': { display: 'inherit' }
      }}
    >
      {icon && (
        <Box
          sx={{
            mr: 1,
            '& svg': {
              width: admin ? 30 : 20,
              height: admin ? 30 : 20,
              color: admin ? 'text.primary' : 'common.white'
            }
          }}
        >
          {icon}
        </Box>
      )}
      {name}
    </Typography>
  );
}

interface MBreadcrumbsProps {
  links: BreadcrumbLink[];
  admin: boolean;
  activeLast?: boolean;
  icon?: React.ReactNode;
  [key: string]: any;
}

function MBreadcrumbs({ links, admin, activeLast = false, ...other }: MBreadcrumbsProps): React.JSX.Element {
  const currentLink = links.length > 0 ? links[links.length - 1].name : '';

  const listDefault = links.map((link) => <LinkItem key={link.name} link={link} admin={admin} />);
  const listActiveLast = links.map((link) => (
    <div key={link.name}>
      {link.name !== currentLink ? (
        <LinkItem link={link} admin={admin} />
      ) : (
        <Typography
          variant={admin ? 'subtitle1' : 'subtitle2'}
          sx={{
            maxWidth: 260,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            color: (theme) => theme.palette.grey[400],
            textOverflow: 'ellipsis'
          }}
        >
          {currentLink}
        </Typography>
      )}
    </div>
  ));

  return (
    <Breadcrumbs separator="›" {...other}>
      {activeLast ? listDefault : listActiveLast}
    </Breadcrumbs>
  );
}

export default function HeaderBreadcrumbs({ 
  links, 
  action, 
  icon, 
  heading, 
  moreLink = '', 
  sx, 
  admin, 
  isUser,
  ...other 
}: HeaderBreadcrumbsProps): React.JSX.Element {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...sx,
        width: '100%',
        ...(admin && {
          mb: 3
        }),
        ...(!admin && {
          p: 3,
          mt: 3,
          color: 'common.white',
          position: 'relative',
          overflow: 'hidden',
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          borderRadius: '8px',
          border: `1px solid ${theme.palette.primary.main}`,
          '&:before': {
            content: "''",
            position: 'absolute',
            top: '-23%',
            left: '20%',
            transform: 'translateX(-50%)',
            bgcolor: alpha(theme.palette.primary.light, 0.5),
            height: { xs: 60, md: 80 },
            width: { xs: 60, md: 80 },
            borderRadius: '50px',
            zIndex: 0
          },
          '&:after': {
            content: "''",
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            right: '-3%',
            bgcolor: alpha(theme.palette.primary.light, 0.5),
            height: { xs: 60, md: 80 },
            width: { xs: 60, md: 80 },
            borderRadius: '50px',
            zIndex: 0
          },
          '& .MuiBreadcrumbs-separator': {
            color: 'common.white'
          }
        })
      }}
    >
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          ...(!admin && {
            '&:before': {
              content: "''",
              position: 'absolute',
              bottom: '-30%',
              left: '50%',
              transform: 'translateX(-50%)',
              bgcolor: alpha(theme.palette.primary.light, 0.5),
              height: { xs: 60, md: 80 },
              width: { xs: 60, md: 80 },
              borderRadius: '50px',
              zIndex: 0
            }
          })
        }}
      >
        <Box
          sx={{
            width: { sm: '50%', xs: '100%' }
          }}
        >
          <Typography variant="h3" gutterBottom sx={{ textTransform: 'capitalize', width: '80vw' }} noWrap>
            {heading}
          </Typography>

          <MBreadcrumbs icon={icon} admin={admin || true} links={links} {...other} />
        </Box>

        {action ? (
          typeof action === 'object' && 'href' in action ? (
            <Box sx={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                href={action.href}
                startIcon={action.icon ? action.icon : <IoMdAdd size={20} />}
              >
                {action.title}
              </Button>
            </Box>
          ) : (
            action as React.ReactNode
          )
        ) : null}
      </Stack>

      <Box>
        {typeof moreLink === 'string' ? (
          <Link href={moreLink} target="_blank" variant={'h1'} sx={{ color: 'common.white' }}>
            {moreLink}
          </Link>
        ) : (
          Array.isArray(moreLink) && moreLink.map((href) => (
            <Link
              noWrap
              key={href}
              href={href}
              variant="subtitle2"
              target="_blank"
              sx={{ display: 'table', color: 'common.white' }}
            >
              {href}
            </Link>
          ))
        )}
      </Box>
    </Box>
  );
}
