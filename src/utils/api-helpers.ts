// API error handling and response utilities

import type { ApiError, ApiResponse, PaginatedResponse } from '@/types/api';

// Error handling utilities
export class ApiErrorHandler {
  static handle(error: any): ApiError {
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      return {
        message: data?.message || `Server error (${status})`,
        code: status.toString(),
        details: data
      };
    } else if (error.request) {
      // Request was made but no response received
      return {
        message: 'Network error - please check your connection',
        code: 'NETWORK_ERROR'
      };
    } else {
      // Something else happened
      return {
        message: error.message || 'An unexpected error occurred',
        code: 'UNKNOWN_ERROR'
      };
    }
  }

  static isNetworkError(error: ApiError): boolean {
    return error.code === 'NETWORK_ERROR';
  }

  static isAuthError(error: ApiError): boolean {
    return error.code === '401';
  }

  static isForbiddenError(error: ApiError): boolean {
    return error.code === '403';
  }

  static isNotFoundError(error: ApiError): boolean {
    return error.code === '404';
  }

  static isValidationError(error: ApiError): boolean {
    return error.code === '422';
  }

  static isServerError(error: ApiError): boolean {
    return error.code === '500';
  }

  static isRateLimitError(error: ApiError): boolean {
    return error.code === '429';
  }

  static getErrorMessage(error: ApiError, fallback: string = 'Something went wrong'): string {
    if (error.message) {
      return error.message;
    }

    // Provide user-friendly messages for common errors
    switch (error.code) {
      case '401':
        return 'Please sign in to continue';
      case '403':
        return 'You do not have permission to perform this action';
      case '404':
        return 'The requested resource was not found';
      case '422':
        return 'Please check your input and try again';
      case '429':
        return 'Too many requests. Please try again later';
      case '500':
        return 'Server error. Please try again later';
      case 'NETWORK_ERROR':
        return 'Network error. Please check your connection';
      default:
        return fallback;
    }
  }
}

// Response utilities
export class ApiResponseHandler {
  static isSuccess<T>(response: ApiResponse<T>): boolean {
    return response.success === true;
  }

  static getData<T>(response: ApiResponse<T>): T {
    return response.data;
  }

  static getMessage<T>(response: ApiResponse<T>): string {
    return response.message;
  }

  static handleSuccess<T>(
    response: ApiResponse<T>,
    onSuccess?: (data: T) => void,
    onError?: (message: string) => void
  ): void {
    if (this.isSuccess(response)) {
      onSuccess?.(response.data);
    } else {
      onError?.(response.message);
    }
  }

  static handlePaginatedResponse<T>(
    response: PaginatedResponse<T>,
    onSuccess?: (data: T[], pagination: any) => void,
    onError?: (message: string) => void
  ): void {
    if (response.data && Array.isArray(response.data)) {
      onSuccess?.(response.data, {
        page: response.page,
        totalPages: response.totalPages,
        totalCount: response.totalCount,
        hasNext: response.hasNext,
        hasPrevious: response.hasPrevious
      });
    } else {
      onError?.('Invalid response format');
    }
  }
}

// Request utilities
export class ApiRequestHelper {
  static buildQueryString(params: Record<string, any>): string {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          value.forEach(item => searchParams.append(key, item.toString()));
        } else {
          searchParams.append(key, value.toString());
        }
      }
    });

    return searchParams.toString();
  }

  static buildUrl(baseUrl: string, params?: Record<string, any>): string {
    if (!params || Object.keys(params).length === 0) {
      return baseUrl;
    }

    const queryString = this.buildQueryString(params);
    return `${baseUrl}?${queryString}`;
  }

  static prepareFormData(data: Record<string, any>): FormData {
    const formData = new FormData();
    
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (value instanceof File) {
          formData.append(key, value);
        } else if (Array.isArray(value)) {
          value.forEach((item, index) => {
            if (item instanceof File) {
              formData.append(`${key}[${index}]`, item);
            } else {
              formData.append(`${key}[${index}]`, item.toString());
            }
          });
        } else if (typeof value === 'object') {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value.toString());
        }
      }
    });

    return formData;
  }

  static prepareJsonData(data: Record<string, any>): string {
    return JSON.stringify(data);
  }
}

// Cache utilities
export class ApiCacheHelper {
  private static cache = new Map<string, { data: any; timestamp: number; ttl: number }>();

  static set(key: string, data: any, ttl: number = 5 * 60 * 1000): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  static get(key: string): any | null {
    const cached = this.cache.get(key);
    
    if (!cached) {
      return null;
    }

    const isExpired = Date.now() - cached.timestamp > cached.ttl;
    
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  static delete(key: string): void {
    this.cache.delete(key);
  }

  static clear(): void {
    this.cache.clear();
  }

  static generateKey(url: string, params?: Record<string, any>): string {
    const queryString = params ? ApiRequestHelper.buildQueryString(params) : '';
    return `${url}${queryString ? `?${queryString}` : ''}`;
  }
}

// Retry utilities
export class ApiRetryHelper {
  static async retry<T>(
    fn: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = 1000,
    backoff: boolean = true
  ): Promise<T> {
    let lastError: any;

    for (let i = 0; i < maxRetries; i++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error;
        
        // Don't retry for certain error types
        if (this.shouldNotRetry(error)) {
          throw error;
        }

        // Wait before retrying
        if (i < maxRetries - 1) {
          const waitTime = backoff ? delay * Math.pow(2, i) : delay;
          await this.sleep(waitTime);
        }
      }
    }

    throw lastError;
  }

  private static shouldNotRetry(error: any): boolean {
    const errorCode = error.code || error.response?.status;
    return ['401', '403', '404', '422'].includes(errorCode?.toString());
  }

  private static sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Progress tracking utilities
export class ApiProgressHelper {
  static createProgressTracker(onProgress?: (progress: number) => void) {
    return (progressEvent: any) => {
      if (progressEvent.total && onProgress) {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(progress);
      }
    };
  }

  static createUploadProgressHandler(
    onProgress?: (progress: number) => void,
    onComplete?: () => void,
    onError?: (error: any) => void
  ) {
    return {
      onUploadProgress: this.createProgressTracker(onProgress),
      onSuccess: onComplete,
      onError: onError
    };
  }
}

// Batch request utilities
export class ApiBatchHelper {
  static async executeBatch<T>(
    requests: Array<() => Promise<T>>,
    concurrency: number = 5
  ): Promise<T[]> {
    const results: T[] = [];
    const errors: any[] = [];

    for (let i = 0; i < requests.length; i += concurrency) {
      const batch = requests.slice(i, i + concurrency);
      
      try {
        const batchResults = await Promise.all(batch.map(request => request()));
        results.push(...batchResults);
      } catch (error) {
        errors.push(error);
        // Continue with other batches even if one fails
      }
    }

    if (errors.length > 0) {
      console.warn(`${errors.length} batch requests failed:`, errors);
    }

    return results;
  }

  static createBatchRequest<T>(
    requests: Array<() => Promise<T>>,
    onProgress?: (completed: number, total: number) => void
  ): Promise<T[]> {
    return new Promise(async (resolve, reject) => {
      const results: T[] = [];
      let completed = 0;

      try {
        for (const request of requests) {
          const result = await request();
          results.push(result);
          completed++;
          
          onProgress?.(completed, requests.length);
        }

        resolve(results);
      } catch (error) {
        reject(error);
      }
    });
  }
}

// Request cancellation utilities
export class ApiCancellationHelper {
  private static controllers = new Map<string, AbortController>();

  static createController(key: string): AbortController {
    // Cancel existing request with same key
    this.cancelRequest(key);
    
    const controller = new AbortController();
    this.controllers.set(key, controller);
    
    return controller;
  }

  static cancelRequest(key: string): void {
    const controller = this.controllers.get(key);
    if (controller) {
      controller.abort();
      this.controllers.delete(key);
    }
  }

  static cancelAllRequests(): void {
    this.controllers.forEach(controller => controller.abort());
    this.controllers.clear();
  }

  static isCancelled(error: any): boolean {
    return error.name === 'AbortError' || error.code === 'ERR_CANCELED';
  }
}

// Response transformation utilities
export class ApiTransformHelper {
  static transformResponse<T, R>(
    response: ApiResponse<T>,
    transformer: (data: T) => R
  ): ApiResponse<R> {
    return {
      success: response.success,
      message: response.message,
      data: transformer(response.data)
    };
  }

  static transformPaginatedResponse<T, R>(
    response: PaginatedResponse<T>,
    transformer: (item: T) => R
  ): PaginatedResponse<R> {
    return {
      data: response.data.map(transformer),
      page: response.page,
      totalPages: response.totalPages,
      totalCount: response.totalCount,
      hasNext: response.hasNext,
      hasPrevious: response.hasPrevious
    };
  }

  static normalizeResponse<T>(response: any): ApiResponse<T> {
    // Handle different response formats
    if (response.success !== undefined) {
      return response as ApiResponse<T>;
    }

    // Assume success if no success field
    return {
      success: true,
      message: response.message || 'Success',
      data: response.data || response
    };
  }
}

// Export utilities
export const apiUtils = {
  error: ApiErrorHandler,
  response: ApiResponseHandler,
  request: ApiRequestHelper,
  cache: ApiCacheHelper,
  retry: ApiRetryHelper,
  progress: ApiProgressHelper,
  batch: ApiBatchHelper,
  cancellation: ApiCancellationHelper,
  transform: ApiTransformHelper
};
