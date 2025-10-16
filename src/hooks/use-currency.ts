import { useSelector } from 'react-redux';

export const useCurrencyConvert = (): ((number: number) => number) => {
  const { rate } = useSelector((state: any) => state.settings);
  
  const convertCurrency = (number: number): number => {
    return Number((number * rate).toFixed(1));
  };
  
  return convertCurrency;
};

