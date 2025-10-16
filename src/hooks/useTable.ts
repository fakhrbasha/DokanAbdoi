// Table state management hook (pagination, filters, search)

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { PaginationParams, FilterParams } from '@/types/api';

interface TableState {
  page: number;
  limit: number;
  search: string;
  sort: string;
  order: 'asc' | 'desc';
  filters: Record<string, any>;
}

interface TableActions {
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setSearch: (search: string) => void;
  setSort: (sort: string) => void;
  setOrder: (order: 'asc' | 'desc') => void;
  setFilter: (key: string, value: any) => void;
  setFilters: (filters: Record<string, any>) => void;
  clearFilters: () => void;
  resetTable: () => void;
  updateUrl: () => void;
}

interface UseTableOptions {
  initialPage?: number;
  initialLimit?: number;
  initialSearch?: string;
  initialSort?: string;
  initialOrder?: 'asc' | 'desc';
  initialFilters?: Record<string, any>;
  syncWithUrl?: boolean;
  debounceSearch?: boolean;
  debounceDelay?: number;
}

export function useTable(options: UseTableOptions = {}): TableState & TableActions {
  const {
    initialPage = 1,
    initialLimit = 10,
    initialSearch = '',
    initialSort = '',
    initialOrder = 'asc',
    initialFilters = {},
    syncWithUrl = true,
    debounceSearch = true,
    debounceDelay = 300
  } = options;

  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [state, setState] = useState<TableState>({
    page: initialPage,
    limit: initialLimit,
    search: initialSearch,
    sort: initialSort,
    order: initialOrder,
    filters: initialFilters
  });

  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);

  // Debounce search input
  useEffect(() => {
    if (!debounceSearch) {
      setDebouncedSearch(state.search);
      return;
    }

    const timer = setTimeout(() => {
      setDebouncedSearch(state.search);
    }, debounceDelay);

    return () => clearTimeout(timer);
  }, [state.search, debounceDelay, debounceSearch]);

  // Sync with URL params
  useEffect(() => {
    if (!syncWithUrl) return;

    const urlParams = new URLSearchParams();
    
    if (state.page > 1) urlParams.set('page', state.page.toString());
    if (state.limit !== initialLimit) urlParams.set('limit', state.limit.toString());
    if (state.search) urlParams.set('search', state.search);
    if (state.sort) urlParams.set('sort', state.sort);
    if (state.order !== initialOrder) urlParams.set('order', state.order);
    
    // Add filters to URL
    Object.entries(state.filters).forEach(([key, value]) => {
      if (value !== '' && value !== null && value !== undefined) {
        urlParams.set(key, value.toString());
      }
    });

    const newUrl = urlParams.toString() ? `?${urlParams.toString()}` : '';
    const currentUrl = window.location.pathname + window.location.search;
    
    if (currentUrl !== window.location.pathname + newUrl) {
      router.replace(window.location.pathname + newUrl, { scroll: false });
    }
  }, [state, router, syncWithUrl, initialLimit, initialOrder]);

  // Load state from URL on mount
  useEffect(() => {
    if (!syncWithUrl) return;

    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || initialLimit.toString(), 10);
    const search = searchParams.get('search') || '';
    const sort = searchParams.get('sort') || '';
    const order = (searchParams.get('order') as 'asc' | 'desc') || initialOrder;
    
    const filters: Record<string, any> = {};
    searchParams.forEach((value, key) => {
      if (!['page', 'limit', 'search', 'sort', 'order'].includes(key)) {
        filters[key] = value;
      }
    });

    setState(prev => ({
      ...prev,
      page,
      limit,
      search,
      sort,
      order,
      filters
    }));
  }, [searchParams, syncWithUrl, initialLimit, initialOrder]);

  // Actions
  const setPage = useCallback((page: number) => {
    setState(prev => ({ ...prev, page }));
  }, []);

  const setLimit = useCallback((limit: number) => {
    setState(prev => ({ ...prev, limit, page: 1 })); // Reset to first page when changing limit
  }, []);

  const setSearch = useCallback((search: string) => {
    setState(prev => ({ ...prev, search, page: 1 })); // Reset to first page when searching
  }, []);

  const setSort = useCallback((sort: string) => {
    setState(prev => ({ 
      ...prev, 
      sort,
      order: prev.sort === sort && prev.order === 'asc' ? 'desc' : 'asc' // Toggle order if same sort
    }));
  }, []);

  const setOrder = useCallback((order: 'asc' | 'desc') => {
    setState(prev => ({ ...prev, order }));
  }, []);

  const setFilter = useCallback((key: string, value: any) => {
    setState(prev => ({ 
      ...prev, 
      filters: { ...prev.filters, [key]: value },
      page: 1 // Reset to first page when filtering
    }));
  }, []);

  const setFilters = useCallback((filters: Record<string, any>) => {
    setState(prev => ({ 
      ...prev, 
      filters: { ...prev.filters, ...filters },
      page: 1 // Reset to first page when filtering
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      filters: {},
      page: 1
    }));
  }, []);

  const resetTable = useCallback(() => {
    setState({
      page: initialPage,
      limit: initialLimit,
      search: initialSearch,
      sort: initialSort,
      order: initialOrder,
      filters: initialFilters
    });
  }, [initialPage, initialLimit, initialSearch, initialSort, initialOrder, initialFilters]);

  const updateUrl = useCallback(() => {
    // This is handled automatically by the useEffect above
    // But we can provide a manual trigger if needed
  }, []);

  // Computed values
  const paginationParams: PaginationParams = useMemo(() => ({
    page: state.page,
    limit: state.limit,
    search: debouncedSearch,
    sort: state.sort,
    order: state.order
  }), [state.page, state.limit, debouncedSearch, state.sort, state.order]);

  const filterParams: FilterParams = useMemo(() => state.filters, [state.filters]);

  return {
    // State
    ...state,
    search: debouncedSearch, // Use debounced search
    
    // Actions
    setPage,
    setLimit,
    setSearch,
    setSort,
    setOrder,
    setFilter,
    setFilters,
    clearFilters,
    resetTable,
    updateUrl,
    
    // Computed params
    paginationParams,
    filterParams
  };
}

// Hook for table row selection
interface UseRowSelectionOptions {
  initialSelectedRows?: string[];
  onSelectionChange?: (selectedRows: string[]) => void;
}

export function useRowSelection(options: UseRowSelectionOptions = {}) {
  const { initialSelectedRows = [], onSelectionChange } = options;
  
  const [selectedRows, setSelectedRows] = useState<string[]>(initialSelectedRows);

  const selectRow = useCallback((id: string) => {
    setSelectedRows(prev => {
      const newSelection = prev.includes(id) 
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id];
      
      onSelectionChange?.(newSelection);
      return newSelection;
    });
  }, [onSelectionChange]);

  const selectAllRows = useCallback((rowIds: string[]) => {
    setSelectedRows(prev => {
      const allSelected = rowIds.every(id => prev.includes(id));
      const newSelection = allSelected ? [] : rowIds;
      
      onSelectionChange?.(newSelection);
      return newSelection;
    });
  }, [onSelectionChange]);

  const clearSelection = useCallback(() => {
    setSelectedRows([]);
    onSelectionChange?.([]);
  }, [onSelectionChange]);

  const isRowSelected = useCallback((id: string) => {
    return selectedRows.includes(id);
  }, [selectedRows]);

  const isAllSelected = useCallback((rowIds: string[]) => {
    return rowIds.length > 0 && rowIds.every(id => selectedRows.includes(id));
  }, [selectedRows]);

  const isIndeterminate = useCallback((rowIds: string[]) => {
    const selectedCount = rowIds.filter(id => selectedRows.includes(id)).length;
    return selectedCount > 0 && selectedCount < rowIds.length;
  }, [selectedRows]);

  return {
    selectedRows,
    selectRow,
    selectAllRows,
    clearSelection,
    isRowSelected,
    isAllSelected,
    isIndeterminate,
    selectedCount: selectedRows.length
  };
}

// Hook for table sorting
interface UseTableSortOptions {
  initialSort?: string;
  initialOrder?: 'asc' | 'desc';
  onSortChange?: (sort: string, order: 'asc' | 'desc') => void;
}

export function useTableSort(options: UseTableSortOptions = {}) {
  const { initialSort = '', initialOrder = 'asc', onSortChange } = options;
  
  const [sort, setSort] = useState(initialSort);
  const [order, setOrder] = useState<'asc' | 'desc'>(initialOrder);

  const handleSort = useCallback((newSort: string) => {
    const newOrder = sort === newSort && order === 'asc' ? 'desc' : 'asc';
    
    setSort(newSort);
    setOrder(newOrder);
    
    onSortChange?.(newSort, newOrder);
  }, [sort, order, onSortChange]);

  const resetSort = useCallback(() => {
    setSort(initialSort);
    setOrder(initialOrder);
    onSortChange?.(initialSort, initialOrder);
  }, [initialSort, initialOrder, onSortChange]);

  return {
    sort,
    order,
    handleSort,
    resetSort
  };
}

// Hook for table filtering
interface UseTableFilterOptions {
  initialFilters?: Record<string, any>;
  onFiltersChange?: (filters: Record<string, any>) => void;
}

export function useTableFilter(options: UseTableFilterOptions = {}) {
  const { initialFilters = {}, onFiltersChange } = options;
  
  const [filters, setFilters] = useState<Record<string, any>>(initialFilters);

  const setFilter = useCallback((key: string, value: any) => {
    setFilters(prev => {
      const newFilters = { ...prev, [key]: value };
      onFiltersChange?.(newFilters);
      return newFilters;
    });
  }, [onFiltersChange]);

  const setFilters = useCallback((newFilters: Record<string, any>) => {
    setFilters(prev => {
      const updatedFilters = { ...prev, ...newFilters };
      onFiltersChange?.(updatedFilters);
      return updatedFilters;
    });
  }, [onFiltersChange]);

  const removeFilter = useCallback((key: string) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[key];
      onFiltersChange?.(newFilters);
      return newFilters;
    });
  }, [onFiltersChange]);

  const clearFilters = useCallback(() => {
    setFilters({});
    onFiltersChange?.({});
  }, [onFiltersChange]);

  const hasActiveFilters = useCallback(() => {
    return Object.values(filters).some(value => 
      value !== '' && value !== null && value !== undefined
    );
  }, [filters]);

  return {
    filters,
    setFilter,
    setFilters,
    removeFilter,
    clearFilters,
    hasActiveFilters
  };
}
