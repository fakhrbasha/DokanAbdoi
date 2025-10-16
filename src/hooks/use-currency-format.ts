import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

type CurrencyMode = 'selected' | 'base' | 'custom';

export const useCurrencyFormat = (mode: CurrencyMode = 'selected', customCurrency: string = ''): ((number: number | string) => string | number) => {
  const { currency, baseCurrency } = useSelector((state: any) => state.settings);
  const [formatter, setFormatter] = useState<Intl.NumberFormat | null>(null);
  const locale = 'en-US';

  useEffect(() => {
    let selectedCurrency: string;

    switch (mode) {
      case 'base':
        selectedCurrency = baseCurrency;
        break;
      case 'custom':
        selectedCurrency = customCurrency;
        break;
      case 'selected':
      default:
        selectedCurrency = currency;
        break;
    }

    if (selectedCurrency && locale) {
      setFormatter(
        new Intl.NumberFormat(locale, {
          style: 'currency',
          currency: selectedCurrency
        })
      );
    }
  }, [currency, baseCurrency, locale, mode, customCurrency]);

  const formatCurrency = (number: number | string): string | number => {
    if (!formatter) return number;
    return formatter.format(Number(number)).slice(0, -1);
  };

  return formatCurrency;
};

