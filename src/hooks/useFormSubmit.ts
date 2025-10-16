// Generic form submission with mutations hook

import { useState, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import type { ApiResponse } from '@/types/api';

interface UseFormSubmitOptions<TData, TVariables> {
  mutationFn: (variables: TVariables) => Promise<ApiResponse<TData>>;
  onSuccess?: (data: TData) => void;
  onError?: (error: any) => void;
  successMessage?: string;
  errorMessage?: string;
  redirectTo?: string;
  invalidateQueries?: string[];
  showToast?: boolean;
}

interface FormSubmitState {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
}

interface FormSubmitActions<TData, TVariables> {
  submit: (variables: TVariables) => Promise<TData>;
  reset: () => void;
  clearError: () => void;
}

export function useFormSubmit<TData = any, TVariables = any>(
  options: UseFormSubmitOptions<TData, TVariables>
): FormSubmitState & FormSubmitActions<TData, TVariables> {
  const {
    mutationFn,
    onSuccess,
    onError,
    successMessage = 'Operation completed successfully',
    errorMessage = 'Operation failed. Please try again.',
    redirectTo,
    invalidateQueries = [],
    showToast = true
  } = options;

  const router = useRouter();
  const queryClient = useQueryClient();
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn,
    onSuccess: (response) => {
      setIsSuccess(true);
      setError(null);
      
      if (showToast && successMessage) {
        toast.success(successMessage);
      }
      
      // Invalidate specified queries
      invalidateQueries.forEach(queryKey => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      });
      
      // Call custom success handler
      onSuccess?.(response.data);
      
      // Redirect if specified
      if (redirectTo) {
        router.push(redirectTo);
      }
    },
    onError: (error: any) => {
      setIsSuccess(false);
      const message = error?.response?.data?.message || errorMessage;
      setError(message);
      
      if (showToast) {
        toast.error(message);
      }
      
      // Call custom error handler
      onError?.(error);
    }
  });

  const submit = useCallback(async (variables: TVariables): Promise<TData> => {
    setError(null);
    setIsSuccess(false);
    
    const response = await mutation.mutateAsync(variables);
    return response.data;
  }, [mutation]);

  const reset = useCallback(() => {
    setIsSuccess(false);
    setError(null);
    mutation.reset();
  }, [mutation]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    // State
    isSubmitting: mutation.isPending,
    isSuccess,
    error,
    
    // Actions
    submit,
    reset,
    clearError
  };
}

// Hook for delete operations
interface UseDeleteOptions {
  mutationFn: (id: string) => Promise<ApiResponse<any>>;
  onSuccess?: () => void;
  onError?: (error: any) => void;
  successMessage?: string;
  errorMessage?: string;
  invalidateQueries?: string[];
  showToast?: boolean;
}

export function useDelete(options: UseDeleteOptions) {
  const {
    mutationFn,
    onSuccess,
    onError,
    successMessage = 'Deleted successfully',
    errorMessage = 'Failed to delete. Please try again.',
    invalidateQueries = [],
    showToast = true
  } = options;

  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      if (showToast) {
        toast.success(successMessage);
      }
      
      // Invalidate specified queries
      invalidateQueries.forEach(queryKey => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      });
      
      onSuccess?.();
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || errorMessage;
      
      if (showToast) {
        toast.error(message);
      }
      
      onError?.(error);
    }
  });

  const deleteItem = useCallback(async (id: string) => {
    await mutation.mutateAsync(id);
  }, [mutation]);

  return {
    deleteItem,
    isDeleting: mutation.isPending,
    error: mutation.error
  };
}

// Hook for bulk operations
interface UseBulkOperationOptions<TVariables> {
  mutationFn: (variables: TVariables) => Promise<ApiResponse<any>>;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  successMessage?: string;
  errorMessage?: string;
  invalidateQueries?: string[];
  showToast?: boolean;
}

export function useBulkOperation<TVariables = any>(options: UseBulkOperationOptions<TVariables>) {
  const {
    mutationFn,
    onSuccess,
    onError,
    successMessage = 'Bulk operation completed successfully',
    errorMessage = 'Bulk operation failed. Please try again.',
    invalidateQueries = [],
    showToast = true
  } = options;

  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn,
    onSuccess: (response) => {
      if (showToast) {
        toast.success(successMessage);
      }
      
      // Invalidate specified queries
      invalidateQueries.forEach(queryKey => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      });
      
      onSuccess?.(response.data);
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || errorMessage;
      
      if (showToast) {
        toast.error(message);
      }
      
      onError?.(error);
    }
  });

  const executeBulkOperation = useCallback(async (variables: TVariables) => {
    await mutation.mutateAsync(variables);
  }, [mutation]);

  return {
    executeBulkOperation,
    isProcessing: mutation.isPending,
    error: mutation.error
  };
}

// Hook for status updates
interface UseStatusUpdateOptions {
  mutationFn: (id: string, status: string) => Promise<ApiResponse<any>>;
  onSuccess?: () => void;
  onError?: (error: any) => void;
  successMessage?: string;
  errorMessage?: string;
  invalidateQueries?: string[];
  showToast?: boolean;
}

export function useStatusUpdate(options: UseStatusUpdateOptions) {
  const {
    mutationFn,
    onSuccess,
    onError,
    successMessage = 'Status updated successfully',
    errorMessage = 'Failed to update status. Please try again.',
    invalidateQueries = [],
    showToast = true
  } = options;

  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => 
      mutationFn(id, status),
    onSuccess: () => {
      if (showToast) {
        toast.success(successMessage);
      }
      
      // Invalidate specified queries
      invalidateQueries.forEach(queryKey => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      });
      
      onSuccess?.();
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || errorMessage;
      
      if (showToast) {
        toast.error(message);
      }
      
      onError?.(error);
    }
  });

  const updateStatus = useCallback(async (id: string, status: string) => {
    await mutation.mutateAsync({ id, status });
  }, [mutation]);

  return {
    updateStatus,
    isUpdating: mutation.isPending,
    error: mutation.error
  };
}

// Hook for file uploads
interface UseFileUploadOptions {
  mutationFn: (file: File) => Promise<ApiResponse<any>>;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  successMessage?: string;
  errorMessage?: string;
  showToast?: boolean;
}

export function useFileUpload(options: UseFileUploadOptions) {
  const {
    mutationFn,
    onSuccess,
    onError,
    successMessage = 'File uploaded successfully',
    errorMessage = 'Failed to upload file. Please try again.',
    showToast = true
  } = options;
  
  const [progress, setProgress] = useState(0);
  
  const mutation = useMutation({
    mutationFn,
    onSuccess: (response) => {
      setProgress(100);
      
      if (showToast) {
        toast.success(successMessage);
      }
      
      onSuccess?.(response.data);
    },
    onError: (error: any) => {
      setProgress(0);
      const message = error?.response?.data?.message || errorMessage;
      
      if (showToast) {
        toast.error(message);
      }
      
      onError?.(error);
    }
  });

  const uploadFile = useCallback(async (file: File, onProgress?: (progress: number) => void) => {
    setProgress(0);
    
    // Simulate progress for better UX
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.random() * 30;
        onProgress?.(next);
        return next;
      });
    }, 200);
    
    try {
      const response = await mutation.mutateAsync(file);
      clearInterval(progressInterval);
      setProgress(100);
      onProgress?.(100);
      return response.data;
    } catch (error) {
      clearInterval(progressInterval);
      setProgress(0);
      onProgress?.(0);
      throw error;
    }
  }, [mutation]);

  return {
    uploadFile,
    isUploading: mutation.isPending,
    progress,
    error: mutation.error
  };
}
