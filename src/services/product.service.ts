// Product service endpoints

import { api } from './api-client';
import type {
  CreateProductRequest,
  UpdateProductRequest,
  GetProductsRequest,
  GetProductsResponse,
  GetProductResponse,
  CreateProductResponse,
  UpdateProductResponse,
  AddToCartRequest,
  UpdateCartItemRequest,
  RemoveFromCartRequest,
  CartItem,
  GetCartResponse,
  AddToCartResponse,
  UpdateCartItemResponse,
  RemoveFromCartResponse
} from '@/types/api';

// Product endpoints
export const productService = {
  // Get products
  getProducts: async (params?: GetProductsRequest): Promise<GetProductsResponse> => {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.sort) queryParams.append('sort', params.sort);
    if (params?.order) queryParams.append('order', params.order);
    if (params?.category) queryParams.append('category', params.category);
    if (params?.brand) queryParams.append('brand', params.brand);
    if (params?.shop) queryParams.append('shop', params.shop);
    if (params?.minPrice) queryParams.append('minPrice', params.minPrice.toString());
    if (params?.maxPrice) queryParams.append('maxPrice', params.maxPrice.toString());
    if (params?.featured) queryParams.append('featured', params.featured.toString());
    if (params?.status) queryParams.append('status', params.status);

    const queryString = queryParams.toString();
    const url = queryString ? `/products?${queryString}` : '/products';
    
    return api.get<GetProductsResponse>(url);
  },

  // Get product by ID/slug
  getProduct: async (id: string): Promise<GetProductResponse> => {
    return api.get<GetProductResponse>(`/products/${id}`);
  },

  // Get featured products
  getFeaturedProducts: async (limit?: number): Promise<GetProductsResponse> => {
    const queryParams = new URLSearchParams();
    queryParams.append('featured', 'true');
    if (limit) queryParams.append('limit', limit.toString());
    
    return api.get<GetProductsResponse>(`/products?${queryParams.toString()}`);
  },

  // Get best selling products
  getBestSellingProducts: async (limit?: number): Promise<GetProductsResponse> => {
    const queryParams = new URLSearchParams();
    queryParams.append('sort', 'best-selling');
    if (limit) queryParams.append('limit', limit.toString());
    
    return api.get<GetProductsResponse>(`/products?${queryParams.toString()}`);
  },

  // Get related products
  getRelatedProducts: async (productId: string, limit?: number): Promise<GetProductsResponse> => {
    const queryParams = new URLSearchParams();
    if (limit) queryParams.append('limit', limit.toString());
    
    const queryString = queryParams.toString();
    const url = queryString 
      ? `/products/${productId}/related?${queryString}` 
      : `/products/${productId}/related`;
    
    return api.get<GetProductsResponse>(url);
  },

  // Search products
  searchProducts: async (query: string, filters?: Partial<GetProductsRequest>): Promise<GetProductsResponse> => {
    const queryParams = new URLSearchParams();
    queryParams.append('search', query);
    
    if (filters?.category) queryParams.append('category', filters.category);
    if (filters?.brand) queryParams.append('brand', filters.brand);
    if (filters?.minPrice) queryParams.append('minPrice', filters.minPrice.toString());
    if (filters?.maxPrice) queryParams.append('maxPrice', filters.maxPrice.toString());
    if (filters?.sort) queryParams.append('sort', filters.sort);
    if (filters?.order) queryParams.append('order', filters.order);
    if (filters?.page) queryParams.append('page', filters.page.toString());
    if (filters?.limit) queryParams.append('limit', filters.limit.toString());
    
    return api.get<GetProductsResponse>(`/products/search?${queryParams.toString()}`);
  },

  // Get product reviews
  getProductReviews: async (productId: string, page?: number, limit?: number): Promise<any> => {
    const queryParams = new URLSearchParams();
    if (page) queryParams.append('page', page.toString());
    if (limit) queryParams.append('limit', limit.toString());
    
    const queryString = queryParams.toString();
    const url = queryString 
      ? `/products/${productId}/reviews?${queryString}` 
      : `/products/${productId}/reviews`;
    
    return api.get(url);
  },

  // Add product review
  addProductReview: async (productId: string, data: any): Promise<any> => {
    return api.post(`/products/${productId}/reviews`, data);
  },

  // Update product review
  updateProductReview: async (productId: string, reviewId: string, data: any): Promise<any> => {
    return api.put(`/products/${productId}/reviews/${reviewId}`, data);
  },

  // Delete product review
  deleteProductReview: async (productId: string, reviewId: string): Promise<{ message: string }> => {
    return api.delete(`/products/${productId}/reviews/${reviewId}`);
  },

  // Compare products
  compareProducts: async (productIds: string[]): Promise<any> => {
    return api.post('/products/compare', { productIds });
  },

  // Cart endpoints
  cart: {
    // Get cart
    get: async (): Promise<GetCartResponse> => {
      return api.get<GetCartResponse>('/cart');
    },

    // Add to cart
    add: async (data: AddToCartRequest): Promise<AddToCartResponse> => {
      return api.post<AddToCartResponse>('/cart', data);
    },

    // Update cart item
    update: async (data: UpdateCartItemRequest): Promise<UpdateCartItemResponse> => {
      return api.put<UpdateCartItemResponse>('/cart', data);
    },

    // Remove from cart
    remove: async (data: RemoveFromCartRequest): Promise<RemoveFromCartResponse> => {
      return api.delete<RemoveFromCartResponse>('/cart', { data });
    },

    // Clear cart
    clear: async (): Promise<{ message: string }> => {
      return api.delete<{ message: string }>('/cart/clear');
    },

    // Apply coupon
    applyCoupon: async (code: string): Promise<any> => {
      return api.post('/cart/coupon', { code });
    },

    // Remove coupon
    removeCoupon: async (): Promise<{ message: string }> => {
      return api.delete<{ message: string }>('/cart/coupon');
    },

    // Calculate shipping
    calculateShipping: async (address: any): Promise<any> => {
      return api.post('/cart/shipping', { address });
    }
  },

  // Categories endpoints
  categories: {
    // Get categories
    get: async (params?: any): Promise<any> => {
      const queryParams = new URLSearchParams();
      
      if (params?.type) queryParams.append('type', params.type);
      if (params?.parent) queryParams.append('parent', params.parent);
      if (params?.status) queryParams.append('status', params.status);
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.search) queryParams.append('search', params.search);

      const queryString = queryParams.toString();
      const url = queryString ? `/categories?${queryString}` : '/categories';
      
      return api.get(url);
    },

    // Get category by ID/slug
    getCategory: async (id: string): Promise<any> => {
      return api.get(`/categories/${id}`);
    },

    // Get category tree
    getCategoryTree: async (): Promise<any> => {
      return api.get('/categories/tree');
    },

    // Get parent categories
    getParentCategories: async (): Promise<any> => {
      return api.get('/categories/parents');
    },

    // Get sub categories
    getSubCategories: async (parentId: string): Promise<any> => {
      return api.get(`/categories/parents/${parentId}/children`);
    },

    // Get child categories
    getChildCategories: async (parentId: string): Promise<any> => {
      return api.get(`/categories/parents/${parentId}/grandchildren`);
    }
  },

  // Brands endpoints
  brands: {
    // Get brands
    get: async (params?: any): Promise<any> => {
      const queryParams = new URLSearchParams();
      
      if (params?.status) queryParams.append('status', params.status);
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.search) queryParams.append('search', params.search);

      const queryString = queryParams.toString();
      const url = queryString ? `/brands?${queryString}` : '/brands';
      
      return api.get(url);
    },

    // Get brand by ID/slug
    getBrand: async (id: string): Promise<any> => {
      return api.get(`/brands/${id}`);
    },

    // Get brand products
    getBrandProducts: async (brandId: string, params?: any): Promise<GetProductsResponse> => {
      const queryParams = new URLSearchParams();
      
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.sort) queryParams.append('sort', params.sort);
      if (params?.order) queryParams.append('order', params.order);

      const queryString = queryParams.toString();
      const url = queryString 
        ? `/brands/${brandId}/products?${queryString}` 
        : `/brands/${brandId}/products`;
      
      return api.get<GetProductsResponse>(url);
    }
  },

  // Attributes endpoints
  attributes: {
    // Get attributes
    get: async (params?: any): Promise<any> => {
      const queryParams = new URLSearchParams();
      
      if (params?.type) queryParams.append('type', params.type);
      if (params?.status) queryParams.append('status', params.status);
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.search) queryParams.append('search', params.search);

      const queryString = queryParams.toString();
      const url = queryString ? `/attributes?${queryString}` : '/attributes';
      
      return api.get(url);
    },

    // Get attribute by ID
    getAttribute: async (id: string): Promise<any> => {
      return api.get(`/attributes/${id}`);
    }
  }
};

// Export individual functions for backward compatibility
export const getProducts = productService.getProducts;
export const getProduct = productService.getProduct;
export const getFeaturedProducts = productService.getFeaturedProducts;
export const getBestSellingProducts = productService.getBestSellingProducts;
export const getRelatedProducts = productService.getRelatedProducts;
export const searchProducts = productService.searchProducts;
export const getProductReviews = productService.getProductReviews;
export const addProductReview = productService.addProductReview;
export const updateProductReview = productService.updateProductReview;
export const deleteProductReview = productService.deleteProductReview;
export const compareProducts = productService.compareProducts;
