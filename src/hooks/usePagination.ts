// Pagination logic extraction hook

import { useState, useCallback, useMemo } from 'react';

interface PaginationState {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  startIndex: number;
  endIndex: number;
}

interface PaginationActions {
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setTotal: (total: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
  reset: () => void;
}

interface UsePaginationOptions {
  initialPage?: number;
  initialLimit?: number;
  initialTotal?: number;
  maxLimit?: number;
}

export function usePagination(options: UsePaginationOptions = {}): PaginationState & PaginationActions {
  const {
    initialPage = 1,
    initialLimit = 10,
    initialTotal = 0,
    maxLimit = 100
  } = options;

  const [page, setPageState] = useState(initialPage);
  const [limit, setLimitState] = useState(initialLimit);
  const [total, setTotalState] = useState(initialTotal);

  // Computed values
  const totalPages = useMemo(() => {
    return Math.ceil(total / limit);
  }, [total, limit]);

  const hasNext = useMemo(() => {
    return page < totalPages;
  }, [page, totalPages]);

  const hasPrevious = useMemo(() => {
    return page > 1;
  }, [page]);

  const startIndex = useMemo(() => {
    return (page - 1) * limit;
  }, [page, limit]);

  const endIndex = useMemo(() => {
    return Math.min(startIndex + limit - 1, total - 1);
  }, [startIndex, limit, total]);

  // Actions
  const setPage = useCallback((newPage: number) => {
    setPageState(Math.max(1, Math.min(newPage, totalPages || 1)));
  }, [totalPages]);

  const setLimit = useCallback((newLimit: number) => {
    const validLimit = Math.max(1, Math.min(newLimit, maxLimit));
    setLimitState(validLimit);
    setPageState(1); // Reset to first page when changing limit
  }, [maxLimit]);

  const setTotal = useCallback((newTotal: number) => {
    setTotalState(Math.max(0, newTotal));
    
    // Adjust current page if it exceeds total pages
    const newTotalPages = Math.ceil(newTotal / limit);
    if (page > newTotalPages && newTotalPages > 0) {
      setPageState(newTotalPages);
    }
  }, [limit, page]);

  const nextPage = useCallback(() => {
    if (hasNext) {
      setPage(page + 1);
    }
  }, [hasNext, page, setPage]);

  const previousPage = useCallback(() => {
    if (hasPrevious) {
      setPage(page - 1);
    }
  }, [hasPrevious, page, setPage]);

  const goToFirstPage = useCallback(() => {
    setPage(1);
  }, [setPage]);

  const goToLastPage = useCallback(() => {
    setPage(totalPages);
  }, [setPage, totalPages]);

  const reset = useCallback(() => {
    setPageState(initialPage);
    setLimitState(initialLimit);
    setTotalState(initialTotal);
  }, [initialPage, initialLimit, initialTotal]);

  return {
    // State
    page,
    limit,
    total,
    totalPages,
    hasNext,
    hasPrevious,
    startIndex,
    endIndex,
    
    // Actions
    setPage,
    setLimit,
    setTotal,
    nextPage,
    previousPage,
    goToFirstPage,
    goToLastPage,
    reset
  };
}

// Hook for pagination with URL sync
export function usePaginationWithUrl(
  options: UsePaginationOptions = {},
  syncWithUrl: boolean = true
) {
  const pagination = usePagination(options);
  const [urlParams, setUrlParams] = useState<URLSearchParams | null>(null);

  // Sync with URL on mount
  useState(() => {
    if (syncWithUrl && typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setUrlParams(params);
      
      const page = parseInt(params.get('page') || '1', 10);
      const limit = parseInt(params.get('limit') || options.initialLimit?.toString() || '10', 10);
      
      pagination.setPage(page);
      pagination.setLimit(limit);
    }
  });

  // Update URL when pagination changes
  const updateUrl = useCallback(() => {
    if (!syncWithUrl || typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    
    if (pagination.page > 1) {
      params.set('page', pagination.page.toString());
    } else {
      params.delete('page');
    }
    
    if (pagination.limit !== options.initialLimit) {
      params.set('limit', pagination.limit.toString());
    } else {
      params.delete('limit');
    }

    const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname;
    window.history.replaceState({}, '', newUrl);
  }, [pagination.page, pagination.limit, options.initialLimit, syncWithUrl]);

  // Override setPage and setLimit to update URL
  const setPageWithUrl = useCallback((page: number) => {
    pagination.setPage(page);
    updateUrl();
  }, [pagination, updateUrl]);

  const setLimitWithUrl = useCallback((limit: number) => {
    pagination.setLimit(limit);
    updateUrl();
  }, [pagination, updateUrl]);

  return {
    ...pagination,
    setPage: setPageWithUrl,
    setLimit: setLimitWithUrl
  };
}

// Hook for infinite scroll pagination
export function useInfinitePagination<T>(
  fetchFunction: (page: number, limit: number) => Promise<{ data: T[]; total: number }>,
  options: UsePaginationOptions = {}
) {
  const pagination = usePagination(options);
  const [items, setItems] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<any>(null);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchFunction(pagination.page, pagination.limit);
      
      if (pagination.page === 1) {
        setItems(result.data);
      } else {
        setItems(prev => [...prev, ...result.data]);
      }
      
      pagination.setTotal(result.total);
      setHasMore(pagination.page < pagination.totalPages);
      
      if (hasMore) {
        pagination.setPage(pagination.page + 1);
      }
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, pagination, fetchFunction]);

  const refresh = useCallback(async () => {
    setItems([]);
    setHasMore(true);
    pagination.setPage(1);
    pagination.setTotal(0);
    await loadMore();
  }, [pagination, loadMore]);

  const reset = useCallback(() => {
    setItems([]);
    setHasMore(true);
    setError(null);
    pagination.reset();
  }, [pagination]);

  return {
    ...pagination,
    items,
    isLoading,
    hasMore,
    error,
    loadMore,
    refresh,
    reset
  };
}

// Hook for server-side pagination
export function useServerPagination<T>(
  fetchFunction: (page: number, limit: number, sort?: string, order?: 'asc' | 'desc') => Promise<{ data: T[]; total: number }>,
  options: UsePaginationOptions & { 
    initialSort?: string; 
    initialOrder?: 'asc' | 'desc';
    autoFetch?: boolean;
  } = {}
) {
  const pagination = usePagination(options);
  const [items, setItems] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [sort, setSort] = useState(options.initialSort || '');
  const [order, setOrder] = useState<'asc' | 'desc'>(options.initialOrder || 'asc');

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchFunction(pagination.page, pagination.limit, sort, order);
      setItems(result.data);
      pagination.setTotal(result.total);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [pagination.page, pagination.limit, sort, order, fetchFunction, pagination]);

  // Auto-fetch when dependencies change
  useEffect(() => {
    if (options.autoFetch !== false) {
      fetchData();
    }
  }, [fetchData, options.autoFetch]);

  const handleSort = useCallback((newSort: string) => {
    const newOrder = sort === newSort && order === 'asc' ? 'desc' : 'asc';
    setSort(newSort);
    setOrder(newOrder);
    pagination.setPage(1); // Reset to first page when sorting
  }, [sort, order, pagination]);

  const handlePageChange = useCallback((newPage: number) => {
    pagination.setPage(newPage);
  }, [pagination]);

  const handleLimitChange = useCallback((newLimit: number) => {
    pagination.setLimit(newLimit);
  }, [pagination]);

  return {
    ...pagination,
    items,
    isLoading,
    error,
    sort,
    order,
    fetchData,
    handleSort,
    handlePageChange,
    handleLimitChange
  };
}
