import React from 'react';
import { Card, CardContent, Box, Typography, Skeleton, alpha } from '@mui/material';
import { styled } from '@mui/material/styles';

interface DashboardCardProps {
  color: string;
  title: string;
  value: number | string | undefined;
  icon: React.ReactNode;
  isLoading?: boolean;
  isAmount?: boolean;
}

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-2px)',
    transition: 'transform 0.2s ease-in-out',
    boxShadow: theme.shadows[8]
  }
}));

const IconWrapper = styled(Box)<{ color: string }>(({ theme, color }) => ({
  width: 56,
  height: 56,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: alpha(color === 'primary' ? theme.palette.primary.main : 
                        color === 'secondary' ? theme.palette.secondary.main :
                        color === 'warning' ? theme.palette.warning.main :
                        color === 'error' ? theme.palette.error.main :
                        color === 'success' ? theme.palette.success.main :
                        color, 0.1),
  color: color === 'primary' ? theme.palette.primary.main : 
         color === 'secondary' ? theme.palette.secondary.main :
         color === 'warning' ? theme.palette.warning.main :
         color === 'error' ? theme.palette.error.main :
         color === 'success' ? theme.palette.success.main :
         color,
  marginBottom: theme.spacing(2)
}));

const formatValue = (value: number | string | undefined, isAmount: boolean): string => {
  if (value === undefined || value === null) return '0';
  
  if (isAmount && typeof value === 'number') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }
  
  return typeof value === 'number' ? value.toLocaleString() : String(value);
};

export default function DashboardCard({ 
  color, 
  title, 
  value, 
  icon, 
  isLoading = false,
  isAmount = false 
}: DashboardCardProps): React.JSX.Element {
  return (
    <StyledCard>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" component="div" sx={{ fontWeight: 600, mt: 1 }}>
              {isLoading ? (
                <Skeleton variant="text" width={80} height={32} />
              ) : (
                formatValue(value, isAmount)
              )}
            </Typography>
          </Box>
          <IconWrapper color={color}>
            {isLoading ? (
              <Skeleton variant="circular" width={24} height={24} />
            ) : (
              icon
            )}
          </IconWrapper>
        </Box>
      </CardContent>
    </StyledCard>
  );
}

