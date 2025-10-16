import React, { ReactNode } from 'react';
import Slider, { SliderThumb, SliderProps } from '@mui/material/Slider';
import { styled, Box, Tooltip } from '@mui/material/styles';
import { useCurrencyFormat } from '@/hooks/use-currency-format';
import { useCurrencyConvert } from '@/hooks/use-currency';

interface ValueLabelComponentProps {
  children: ReactNode;
  value: number;
}

function ValueLabelComponent({ children, value }: ValueLabelComponentProps): React.JSX.Element {
  return (
    <Tooltip enterTouchDelay={0} placement="top" title={value} size="small">
      {children}
    </Tooltip>
  );
}

const AirbnbSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginTop: 20,
  height: 27,
  padding: '13px 0',
  '& .MuiSlider-thumb': {
    height: 27,
    width: 27,
    borderRadius: '8px',
    backgroundColor: '#fff',
    border: '1px solid currentColor',

    '& .airbnb-bar': {
      height: 9,
      width: 1,
      backgroundColor: 'currentColor',
      marginLeft: 1,
      marginRight: 1
    }
  },
  '& .MuiSlider-track': {
    height: 27,
    borderRadius: '8px',
    backgroundColor: theme.palette.primary.main
  },
  '& .MuiSlider-rail': {
    color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
    opacity: theme.palette.mode === 'dark' ? undefined : 1,
    height: 27,
    borderRadius: '8px'
  }
}));

interface AirbnbThumbComponentProps {
  children: ReactNode;
  [key: string]: any;
}

function AirbnbThumbComponent({ children, ...other }: AirbnbThumbComponentProps): React.JSX.Element {
  return (
    <SliderThumb {...other}>
      {children}
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
    </SliderThumb>
  );
}

interface CustomizedSliderProps {
  filterPrices: number[];
  onChangeCommitted?: (event: Event | React.SyntheticEvent, value: number | number[]) => void;
  onChange?: (event: Event, value: number | number[]) => void;
  value: number | number[];
}

export default function CustomizedSlider({ 
  filterPrices, 
  onChangeCommitted, 
  onChange, 
  value 
}: CustomizedSliderProps): React.JSX.Element {
  const cCurrency = useCurrencyConvert();
  const fCurrency = useCurrencyFormat();

  return (
    <>
      <Box px={1} mt={1}>
        <AirbnbSlider
          valueLabelDisplay="on"
          onChangeCommitted={onChangeCommitted}
          valueLabelFormat={(x: number) => fCurrency(x)}
          max={cCurrency(filterPrices[1])}
          components={{ Thumb: AirbnbThumbComponent }}
          value={value}
          onChange={onChange}
          disableSwap
        />
      </Box>
    </>
  );
}

