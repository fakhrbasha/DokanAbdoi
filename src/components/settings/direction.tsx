import React from 'react';
import { useSelector, useDispatch } from '@/redux';
import { setDirection } from '@/redux/slices/settings';
import { Stack, Tooltip, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { FiAlignRight, FiAlignLeft } from 'react-icons/fi';

type Direction = 'ltr' | 'rtl';

interface DirectionOption {
  value: Direction;
  icon: React.ReactElement;
}

const modes: DirectionOption[] = [
  { value: 'ltr', icon: <FiAlignLeft /> },
  { value: 'rtl', icon: <FiAlignRight /> }
];

export default function DirectionToggle(): React.JSX.Element {
  const dispatch = useDispatch();
  const { direction } = useSelector((state: any) => state.settings);
  
  const handleChange = (event: React.MouseEvent<HTMLElement>, val: Direction | null): void => {
    dispatch(setDirection(Boolean(val) ? val : direction));
  };

  return (
    <div>
      <Typography variant="overline" color="inherit" gutterBottom>
        Direction
      </Typography>

      <Stack direction="row" gap={1}>
        <ToggleButtonGroup
          value={direction}
          exclusive
          size="large"
          fullWidth
          onChange={handleChange}
          aria-label="text alignment"
          sx={{ height: 56, svg: { fontSize: 30 } }}
        >
          {modes.map(({ value, icon }) => {
            return (
              <Tooltip key={value} title={value === 'ltr' ? 'Left To Right' : 'Right To Left'}>
                <ToggleButton value={value} aria-label="left aligned" color="primary" variant="contained">
                  {icon}
                </ToggleButton>
              </Tooltip>
            );
          })}
        </ToggleButtonGroup>
      </Stack>
    </div>
  );
}

