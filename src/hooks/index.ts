// Export all custom hooks

// Auth hooks
export { useAuth, usePermissions, useProtectedRoute } from './useAuth';

// Form submission hooks
export { 
  useFormSubmit, 
  useDelete, 
  useBulkOperation, 
  useStatusUpdate, 
  useFileUpload 
} from './useFormSubmit';

// Table management hooks
export { 
  useTable, 
  useRowSelection, 
  useTableSort, 
  useTableFilter 
} from './useTable';

// Dialog management hooks
export { 
  useDialog, 
  useDeleteDialog, 
  useConfirmationDialog, 
  useMultiStepDialog, 
  useDrawer 
} from './useDialog';

// Utility hooks
export { 
  useDebounce, 
  useDebouncedCallback, 
  useDebouncedSearch, 
  useDebouncedApiCall 
} from './useDebounce';

export { 
  useLocalStorage, 
  useSessionStorage, 
  useLocalStorageMulti, 
  useLocalStorageWithExpiry, 
  useLocalStorageAvailable 
} from './useLocalStorage';

export { 
  usePagination, 
  usePaginationWithUrl, 
  useInfinitePagination, 
  useServerPagination 
} from './usePagination';

// Currency hooks
export { useCurrencyConvert } from './use-currency';
export { useCurrencyFormat } from './use-currency-format';

// Upload hooks
export { useUploadSingleFile, useUploadMultiFiles } from './use-upload-file';

// Cookie hooks
export { setCookie, deleteCookie } from './use-cookies';
