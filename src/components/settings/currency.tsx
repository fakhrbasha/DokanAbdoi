import React from 'react';
import { FormControl, Typography, Select, MenuItem, CircularProgress, Skeleton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { handleChangeCurrency } from '@/redux/slices/settings';
import { useQuery } from '@tanstack/react-query';
import * as api from '@/services';
import type { Currency } from '@/types/models';

interface CurrencyResponse {
  data: Currency[];
}

export default function CurrencySelect(): React.JSX.Element {
  const dispatch = useDispatch();
  const { currency } = useSelector((state: any) => state.settings);

  const { data, isLoading } = useQuery<CurrencyResponse>({ 
    queryKey: ['get-currencies'], 
    queryFn: () => api.getCurrencies() 
  });

  const handleChange = (e: React.ChangeEvent<{ value: unknown }>): void => {
    const selectedCode = e.target.value as string;
    const selectedCurrency = data?.data?.find((c) => c.code === selectedCode);
    if (selectedCurrency) {
      dispatch(handleChangeCurrency({ 
        currency: selectedCurrency.code, 
        baseCurrency: selectedCurrency.code,
        rate: selectedCurrency.rate 
      }));
    }
  };

  return (
    <FormControl fullWidth size="large" variant="outlined">
      <Typography variant="overline" color="inherit" gutterBottom>
        Currency
      </Typography>
      {isLoading ? (
        <Skeleton variant="rounded" height={56} />
      ) : (
        <Select
          value={currency}
          onChange={handleChange}
          disabled={isLoading}
          MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
        >
          {isLoading ? (
            <MenuItem value="">
              <CircularProgress size={20} />
            </MenuItem>
          ) : (
            data?.data?.map((cur) => (
              <MenuItem key={cur.code} value={cur.code}>
                {cur.name} ({cur.code})
              </MenuItem>
            ))
          )}
        </Select>
      )}
    </FormControl>
  );
}

