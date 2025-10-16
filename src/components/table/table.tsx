import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import {
  Divider,
  Card,
  Table,
  TableBody,
  TableContainer,
  Stack,
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from '@mui/material';
import NotFound from '@/illustrations/data-not-found';
import Pagination from '@/components/pagination';
import Search from '@/components/search';
import TableHead from './table-head';

interface HeadDataItem {
  id: string;
  label: string;
  alignRight?: boolean;
}

interface FilterData {
  name: string;
  slug?: string;
  title?: string;
}

interface Filter {
  name: string;
  param: string;
  data: FilterData[];
}

interface TableData {
  data: any[];
  page: number;
  totalPages: number;
}

interface CustomTableProps {
  headData: HeadDataItem[];
  data: TableData;
  isLoading: boolean;
  mobileRow?: React.ComponentType<any>;
  row: React.ComponentType<any>;
  index?: number;
  filters?: Filter[];
  isSearch?: boolean;
  [key: string]: any;
}

export default function CustomTable({ 
  headData, 
  data, 
  isLoading, 
  isSearch, 
  row, 
  filters, 
  ...rest 
}: CustomTableProps): React.JSX.Element {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const [state, setState] = useState<Record<string, string>>({});
  const queryString = searchParams.toString();

  const handleChange = (param: string, val: string): void => {
    const params = new URLSearchParams(searchParams);

    if (val === '') {
      params.delete(param);
    } else {
      params.set(param, val);
    }

    setState((prev) => ({ ...prev, [param]: val }));
    replace(`?${params.toString()}`);
  };

  useEffect(() => {
    const params = new URLSearchParams('?' + queryString);
    const paramsObject: Record<string, string> = {};
    for (const [key, value] of params.entries()) {
      paramsObject[key] = value;
    }
    setState({ ...state, ...paramsObject });
  }, []);

  const Component = row;

  return (
    <Card>
      <>
        {(isSearch || Boolean(filters?.length)) && (
          <Stack spacing={2} direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2 }}>
            {isSearch ? <Search /> : null}{' '}
            {filters?.length ? (
              <Stack spacing={2} direction="row">
                {filters?.map((item) => (
                  <FormControl fullWidth key={Math.random()} sx={{ maxWidth: 200, minWidth: 140, width: '100%' }}>
                    <InputLabel id={'select-' + item.name}>{item.name}</InputLabel>
                    <Select
                      labelId={'select-' + item.name}
                      id={'select-' + item.name}
                      value={state[item.param] ?? ''}
                      label={item.name}
                      onChange={(e) => handleChange(item.param, e.target.value)}
                    >
                      <MenuItem value="">None</MenuItem>
                      {item.data.map((v) => (
                        <MenuItem value={v.slug} key={Math.random()}>
                          {v.name || v.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ))}
              </Stack>
            ) : null}
          </Stack>
        )}

        {!isLoading && data?.data?.length === 0 ? (
          <>
            <Divider />
            <NotFound />
          </>
        ) : (
          <>
            <TableContainer>
              <Table size="small" sx={{ minWidth: 650 }}>
                <TableHead headData={headData} />
                <TableBody>
                  {(isLoading ? Array.from({ length: 6 }) : data?.data || []).map((item, index) => {
                    const RowComponent = row;
                    return <RowComponent key={Math.random()} row={item} index={index} isLoading={isLoading} {...rest} />;
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <Divider />
            {!isLoading && (
              <Pagination
                data={data}
                sx={{
                  my: 2
                }}
              />
            )}
          </>
        )}
      </>
    </Card>
  );
}
