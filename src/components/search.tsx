import React, { useState, useEffect, useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { styled, Box, OutlinedInput, InputAdornment, SxProps, Theme } from '@mui/material';
import { IoIosSearch } from 'react-icons/io';
import type { SearchProps } from '@/types/components';

const RootStyle = styled(Box)(() => ({
  maxHeight: 96,
  display: 'flex',
  justifyContent: 'space-between'
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 250,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),

  '&.Mui-focused': { width: 300 },
  [theme.breakpoints.down('sm')]: {
    width: 150,
    '&.Mui-focused': { width: 150 }
  }
}));

export default function Search({
  placeholder = 'Search',
  value: controlledValue,
  onChange: controlledOnChange,
  onSearch,
  debounceMs = 1000,
  sx,
  ...props
}: SearchProps): React.JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const usedSearch = searchParams.get('search');
  
  const [internalSearch, setInternalSearch] = useState(usedSearch || '');
  const [initial, setInitial] = useState(false);
  
  const search = controlledValue !== undefined ? controlledValue : internalSearch;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const val = e.target.value;
    
    if (controlledOnChange) {
      controlledOnChange(val);
    } else {
      setInternalSearch(val);
    }
  };

  const createQueryString = useCallback(
    (name: string, value: string): string => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      params.delete('page');
      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (Boolean(search)) {
        setInitial(true);
        
        if (onSearch) {
          onSearch(search);
        } else {
          router.push(`${pathname}?${createQueryString('search', search)}`);
        }
      } else {
        if (initial) {
          if (onSearch) {
            onSearch('');
          } else {
            router.push(`${pathname}`);
          }
        }
      }
    }, debounceMs);

    return () => clearTimeout(delayDebounceFn);
  }, [search, debounceMs, initial, onSearch, router, pathname, createQueryString]);

  return (
    <RootStyle sx={sx}>
      <SearchStyle
        value={search}
        onChange={onChange}
        placeholder={placeholder}
        startAdornment={
          <InputAdornment position="start">
            <IoIosSearch size={20} style={{ color: 'text.disabled' }} />
          </InputAdornment>
        }
        {...props}
      />
    </RootStyle>
  );
}
