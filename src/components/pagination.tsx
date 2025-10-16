import React, { useCallback, useState, useEffect } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Pagination, SxProps, Theme } from '@mui/material';
import type { PaginationProps } from '@/types/components';

export default function PaginationRounded({ 
  data, 
  sx,
  onPageChange,
  ...props 
}: PaginationProps): React.JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const [state, setState] = useState(1);

  const createQueryString = useCallback(
    (name: string, value: string): string => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handleChange = (event: React.ChangeEvent<unknown>, value: number): void => {
    setState(value);
    
    if (onPageChange) {
      onPageChange(value);
    } else {
      router.replace(`${pathname}?${createQueryString('page', value.toString())}`, { scroll: false });
    }
  };

  useEffect(() => {
    if (page) {
      setState(Number(page));
    }
  }, [page]);

  return (
    <Pagination
      count={data?.totalPages || 1}
      page={state}
      onChange={handleChange}
      variant="outlined"
      shape="rounded"
      color="primary"
      sx={{
        mx: 'auto',
        '.MuiPagination-ul': {
          justifyContent: 'center'
        },
        ...sx
      }}
      {...props}
    />
  );
}
