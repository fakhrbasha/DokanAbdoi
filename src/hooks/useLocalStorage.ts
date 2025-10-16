// Type-safe local storage hook

import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  // Get from local storage then parse stored json or return initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  // Remove from localStorage
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}

// Hook for session storage
export function useSessionStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  // Get from session storage then parse stored json or return initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading sessionStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to sessionStorage
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to session storage
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting sessionStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  // Remove from sessionStorage
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.sessionStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Error removing sessionStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}

// Hook for managing multiple localStorage values
export function useLocalStorageMulti<T extends Record<string, any>>(
  initialValues: T
): [T, (updates: Partial<T>) => void, (keys?: (keyof T)[]) => void] {
  const [values, setValues] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValues;
    }

    const result = { ...initialValues };
    
    Object.keys(initialValues).forEach(key => {
      try {
        const item = window.localStorage.getItem(key);
        if (item) {
          result[key as keyof T] = JSON.parse(item);
        }
      } catch (error) {
        console.error(`Error reading localStorage key "${key}":`, error);
      }
    });

    return result;
  });

  const setValues = useCallback((updates: Partial<T>) => {
    setValues(prev => {
      const newValues = { ...prev, ...updates };
      
      // Update localStorage for each changed key
      Object.keys(updates).forEach(key => {
        try {
          if (typeof window !== 'undefined') {
            window.localStorage.setItem(key, JSON.stringify(updates[key as keyof T]));
          }
        } catch (error) {
          console.error(`Error setting localStorage key "${key}":`, error);
        }
      });

      return newValues;
    });
  }, []);

  const clearValues = useCallback((keys?: (keyof T)[]) => {
    const keysToClear = keys || (Object.keys(initialValues) as (keyof T)[]);
    
    setValues(prev => {
      const newValues = { ...prev };
      
      keysToClear.forEach(key => {
        newValues[key] = initialValues[key];
        
        try {
          if (typeof window !== 'undefined') {
            window.localStorage.removeItem(key as string);
          }
        } catch (error) {
          console.error(`Error removing localStorage key "${key}":`, error);
        }
      });

      return newValues;
    });
  }, [initialValues]);

  return [values, setValues, clearValues];
}

// Hook for localStorage with expiration
export function useLocalStorageWithExpiry<T>(
  key: string,
  initialValue: T,
  expiryInMinutes: number = 60
): [T, (value: T) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        const parsed = JSON.parse(item);
        
        // Check if the item has expired
        if (parsed.expiry && new Date().getTime() > parsed.expiry) {
          window.localStorage.removeItem(key);
          return initialValue;
        }
        
        return parsed.value;
      }
      return initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T) => {
    try {
      const now = new Date();
      const expiry = now.getTime() + (expiryInMinutes * 60 * 1000);
      
      const item = {
        value,
        expiry
      };

      setStoredValue(value);
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(item));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, expiryInMinutes]);

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}

// Hook for detecting localStorage availability
export function useLocalStorageAvailable(): boolean {
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      setIsAvailable(false);
      return;
    }

    try {
      const testKey = '__localStorage_test__';
      window.localStorage.setItem(testKey, 'test');
      window.localStorage.removeItem(testKey);
      setIsAvailable(true);
    } catch (error) {
      setIsAvailable(false);
    }
  }, []);

  return isAvailable;
}
