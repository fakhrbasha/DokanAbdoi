// API client with interceptors and proper typing

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import type { ApiError } from '@/types/api';

// Base API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
const API_TIMEOUT = 30000; // 30 seconds

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // Authorization was removed from backend, so we don't send tokens
    // If you re-enable backend auth, uncomment the following lines:
    // const token = getAuthToken();
    // if (token && config.headers) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    // Add request timestamp for debugging
    config.metadata = { startTime: new Date().getTime() };

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(handleApiError(error));
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response time for debugging
    const endTime = new Date().getTime();
    const startTime = response.config.metadata?.startTime;
    if (startTime) {
      console.log(`API Request to ${response.config.url} took ${endTime - startTime}ms`);
    }

    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(handleApiError(error));
  }
);

// Helper function to get auth token
function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  
  try {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
}

// Helper function to handle API errors
function handleApiError(error: AxiosError): ApiError {
  const apiError: ApiError = {
    message: 'An unexpected error occurred',
  };

  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    
    apiError.message = (data as any)?.message || `Server error (${status})`;
    apiError.code = status.toString();
    apiError.details = data as any;
    
    // Handle specific status codes
    switch (status) {
      case 401:
        apiError.message = 'Authentication required';
        // Clear invalid token
        clearAuthToken();
        break;
      case 403:
        apiError.message = 'Access denied';
        break;
      case 404:
        apiError.message = 'Resource not found';
        break;
      case 422:
        apiError.message = 'Validation error';
        break;
      case 429:
        apiError.message = 'Too many requests';
        break;
      case 500:
        apiError.message = 'Internal server error';
        break;
    }
  } else if (error.request) {
    // Request was made but no response received
    apiError.message = 'Network error - please check your connection';
    apiError.code = 'NETWORK_ERROR';
  } else {
    // Something else happened
    apiError.message = error.message || 'An unexpected error occurred';
    apiError.code = 'UNKNOWN_ERROR';
  }

  return apiError;
}

// Helper function to clear auth token
function clearAuthToken(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  } catch (error) {
    console.error('Error clearing auth token:', error);
  }
}

// Generic API request function
export async function apiRequest<T = any>(
  config: AxiosRequestConfig
): Promise<T> {
  try {
    const response = await apiClient.request<T>(config);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// HTTP method helpers
export const api = {
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    apiRequest<T>({ ...config, method: 'GET', url }),
    
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    apiRequest<T>({ ...config, method: 'POST', url, data }),
    
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    apiRequest<T>({ ...config, method: 'PUT', url, data }),
    
  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    apiRequest<T>({ ...config, method: 'PATCH', url, data }),
    
  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    apiRequest<T>({ ...config, method: 'DELETE', url }),
};

// File upload helper
export async function uploadFile(
  file: File,
  uploadPreset: string = 'my-uploads',
  onProgress?: (progress: number) => void
): Promise<any> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  try {
    const response = await apiClient.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(progress);
        }
      },
    });

    return response.data;
  } catch (error) {
    throw handleApiError(error as AxiosError);
  }
}

// Download file helper
export async function downloadFile(url: string, filename?: string): Promise<void> {
  try {
    const response = await apiClient.get(url, {
      responseType: 'blob',
    });

    const blob = new Blob([response.data]);
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename || 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    throw handleApiError(error as AxiosError);
  }
}

// Batch request helper
export async function batchRequest<T = any>(
  requests: AxiosRequestConfig[]
): Promise<T[]> {
  try {
    const promises = requests.map(config => apiRequest<T>(config));
    return await Promise.all(promises);
  } catch (error) {
    throw error;
  }
}

// Retry helper for failed requests
export async function retryRequest<T = any>(
  requestFn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: any;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await requestFn();
    } catch (error) {
      lastError = error;
      
      // Don't retry for certain error types
      if (error.code === '401' || error.code === '403' || error.code === '404') {
        throw error;
      }

      // Wait before retrying
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
      }
    }
  }

  throw lastError;
}

// Request cancellation helper
export class RequestCanceller {
  private cancelTokenSource = axios.CancelToken.source();

  get cancelToken() {
    return this.cancelTokenSource.token;
  }

  cancel(message?: string) {
    this.cancelTokenSource.cancel(message);
  }

  reset() {
    this.cancelTokenSource = axios.CancelToken.source();
  }
}

// Export the configured client
export default apiClient;
