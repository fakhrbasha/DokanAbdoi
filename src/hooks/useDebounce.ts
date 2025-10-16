// Debounce hook for search inputs and API calls

import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Hook for debounced callback
export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const debouncedCallback = ((...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(() => {
      callback(...args);
    }, delay);

    setTimeoutId(newTimeoutId);
  }) as T;

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return debouncedCallback;
}

// Hook for debounced search
export function useDebouncedSearch(
  initialValue: string = '',
  delay: number = 300
) {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const debouncedSearchTerm = useDebounce(searchTerm, delay);

  return {
    searchTerm,
    setSearchTerm,
    debouncedSearchTerm
  };
}

// Hook for debounced API calls
export function useDebouncedApiCall<T>(
  apiCall: (value: T) => Promise<any>,
  delay: number = 500
) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  const debouncedApiCall = useDebouncedCallback(async (value: T) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await apiCall(value);
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, delay);

  return {
    call: debouncedApiCall,
    isLoading,
    data,
    error
  };
}
