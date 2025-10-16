import React from 'react';
import { styled, Typography, Stack, IconButton } from '@mui/material';
import { IoIosRemove, IoIosAdd } from 'react-icons/io';

const IncrementerStyle = styled('div')(({ theme }) => ({
  border: '1px solid ' + theme.palette.divider,
  borderRadius: 27,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  svg: {
    fontSize: 22
  }
}));

interface IncrementerProps {
  stockQuantity: number;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  cart?: boolean;
}

function Incrementer({ stockQuantity, quantity, onIncrease, onDecrease, cart }: IncrementerProps): React.JSX.Element {
  return (
    <Stack gap={0.5}>
      <IncrementerStyle
        sx={{
          gap: cart ? 0.5 : 1,
          p: cart ? 0.2 : 0.5
        }}
      >
        <IconButton size="small" color="primary" onClick={onDecrease} disabled={quantity <= 1}>
          <IoIosRemove />
        </IconButton>
        <Typography variant="subtitle1" color="text.primary">
          {quantity}
        </Typography>

        <IconButton size="small" color="primary" onClick={onIncrease} disabled={quantity >= stockQuantity}>
          <IoIosAdd />
        </IconButton>
      </IncrementerStyle>
      {cart && (
        <Typography variant="caption" color="text.secondary">
          Available: {stockQuantity}
        </Typography>
      )}
    </Stack>
  );
}

export default Incrementer;

