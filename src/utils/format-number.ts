/**
 * Format a number as file size
 */
export function fData(number: number | string): string {
  if (!number || number === 0) return '0 B';

  const num = typeof number === 'string' ? parseFloat(number) : number;
  
  if (isNaN(num)) return '0 B';

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = num;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`;
}

/**
 * Format a number with thousand separators
 */
export function fNumber(number: number | string): string {
  if (!number || number === 0) return '0';
  
  const num = typeof number === 'string' ? parseFloat(number) : number;
  
  if (isNaN(num)) return '0';

  return new Intl.NumberFormat('en-US').format(num);
}

/**
 * Format a number as percentage
 */
export function fPercent(number: number | string): string {
  if (!number || number === 0) return '0%';
  
  const num = typeof number === 'string' ? parseFloat(number) : number;
  
  if (isNaN(num)) return '0%';

  return `${num.toFixed(1)}%`;
}

/**
 * Format a number as currency
 */
export function fCurrency(
  number: number | string,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  if (!number || number === 0) return `0 ${currency}`;
  
  const num = typeof number === 'string' ? parseFloat(number) : number;
  
  if (isNaN(num)) return `0 ${currency}`;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(num);
}

/**
 * Format a number as compact notation (e.g., 1.2K, 1.5M)
 */
export function fShortenNumber(number: number | string): string {
  if (!number || number === 0) return '0';
  
  const num = typeof number === 'string' ? parseFloat(number) : number;
  
  if (isNaN(num)) return '0';

  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(num);
}

