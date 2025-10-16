// Admin service endpoints

import { api } from './api-client';
import type {
  CreateBrandRequest,
  UpdateBrandRequest,
  GetBrandsRequest,
  GetBrandsResponse,
  GetBrandResponse,
  CreateBrandResponse,
  UpdateBrandResponse,
  CreateCategoryRequest,
  UpdateCategoryRequest,
  GetCategoriesRequest,
  GetCategoriesResponse,
  GetCategoryResponse,
  CreateCategoryResponse,
  UpdateCategoryResponse,
  CreateProductRequest,
  UpdateProductRequest,
  GetProductsRequest,
  GetProductsResponse,
  GetProductResponse,
  CreateProductResponse,
  UpdateProductResponse,
  CreateShopRequest,
  UpdateShopRequest,
  GetShopsRequest,
  GetShopsResponse,
  GetShopResponse,
  CreateShopResponse,
  UpdateShopResponse,
  CreateOrderRequest,
  UpdateOrderRequest,
  GetOrdersRequest,
  GetOrdersResponse,
  GetOrderResponse,
  CreateOrderResponse,
  UpdateOrderResponse,
  UpdateUserRequest,
  UpdateUserRoleRequest,
  GetUsersRequest,
  GetUsersResponse,
  GetUserResponse,
  UpdateUserResponse,
  UpdateUserRoleResponse,
  CreateCouponCodeRequest,
  UpdateCouponCodeRequest,
  GetCouponCodesRequest,
  GetCouponCodesResponse,
  GetCouponCodeResponse,
  CreateCouponCodeResponse,
  UpdateCouponCodeResponse,
  CreateCurrencyRequest,
  UpdateCurrencyRequest,
  GetCurrenciesRequest,
  GetCurrenciesResponse,
  GetCurrencyResponse,
  CreateCurrencyResponse,
  UpdateCurrencyResponse,
  CreateAttributeRequest,
  UpdateAttributeRequest,
  GetAttributesRequest,
  GetAttributesResponse,
  GetAttributeResponse,
  CreateAttributeResponse,
  UpdateAttributeResponse,
  CreateNewsletterRequest,
  GetNewslettersRequest,
  GetNewslettersResponse,
  CreateNewsletterResponse,
  UpdateMainSettingsRequest,
  UpdateHomeSettingsRequest,
  UpdateBrandingSettingsRequest,
  GetMainSettingsResponse,
  UpdateMainSettingsResponse,
  GetHomeSettingsResponse,
  UpdateHomeSettingsResponse,
  GetBrandingSettingsResponse,
  UpdateBrandingSettingsResponse,
  GetDashboardAnalyticsResponse,
  GetVendorDashboardAnalyticsResponse,
  DeleteFileRequest
} from '@/types/api';

// Admin service
export const adminService = {
  // Dashboard endpoints
  dashboard: {
    // Get dashboard analytics
    getAnalytics: async (): Promise<GetDashboardAnalyticsResponse> => {
      return api.get<GetDashboardAnalyticsResponse>('/admin/dashboard/analytics');
    },

    // Get vendor dashboard analytics
    getVendorAnalytics: async (): Promise<GetVendorDashboardAnalyticsResponse> => {
      return api.get<GetVendorDashboardAnalyticsResponse>('/admin/dashboard/vendor-analytics');
    },

    // Get low stock products
    getLowStockProducts: async (limit?: number): Promise<any> => {
      const queryParams = new URLSearchParams();
      if (limit) queryParams.append('limit', limit.toString());
      
      const queryString = queryParams.toString();
      const url = queryString ? `/admin/dashboard/low-stock?${queryString}` : '/admin/dashboard/low-stock';
      
      return api.get(url);
    }
  },

  // Brand endpoints
  brands: {
    // Get brands
    get: async (params?: GetBrandsRequest): Promise<GetBrandsResponse> => {
      const queryParams = new URLSearchParams();
      
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.search) queryParams.append('search', params.search);
      if (params?.status) queryParams.append('status', params.status);

      const queryString = queryParams.toString();
      const url = queryString ? `/admin/brands?${queryString}` : '/admin/brands';
      
      return api.get<GetBrandsResponse>(url);
    },

    // Get brand by ID/slug
    getById: async (id: string): Promise<GetBrandResponse> => {
      return api.get<GetBrandResponse>(`/admin/brands/${id}`);
    },

    // Create brand
    create: async (data: CreateBrandRequest): Promise<CreateBrandResponse> => {
      return api.post<CreateBrandResponse>('/admin/brands', data);
    },

    // Update brand
    update: async (id: string, data: UpdateBrandRequest): Promise<UpdateBrandResponse> => {
      return api.put<UpdateBrandResponse>(`/admin/brands/${id}`, data);
    },

    // Delete brand
    delete: async (id: string): Promise<{ message: string }> => {
      return api.delete<{ message: string }>(`/admin/brands/${id}`);
    }
  },

  // Category endpoints
  categories: {
    // Get categories
    get: async (params?: GetCategoriesRequest): Promise<GetCategoriesResponse> => {
      const queryParams = new URLSearchParams();
      
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.search) queryParams.append('search', params.search);
      if (params?.status) queryParams.append('status', params.status);
      if (params?.type) queryParams.append('type', params.type);

      const queryString = queryParams.toString();
      const url = queryString ? `/admin/categories?${queryString}` : '/admin/categories';
      
      return api.get<GetCategoriesResponse>(url);
    },

    // Get category by ID/slug
    getById: async (id: string): Promise<GetCategoryResponse> => {
      return api.get<GetCategoryResponse>(`/admin/categories/${id}`);
    },

    // Create category
    create: async (data: CreateCategoryRequest): Promise<CreateCategoryResponse> => {
      return api.post<CreateCategoryResponse>('/admin/categories', data);
    },

    // Update category
    update: async (id: string, data: UpdateCategoryRequest): Promise<UpdateCategoryResponse> => {
      return api.put<UpdateCategoryResponse>(`/admin/categories/${id}`, data);
    },

    // Delete category
    delete: async (id: string): Promise<{ message: string }> => {
      return api.delete<{ message: string }>(`/admin/categories/${id}`);
    },

    // Get parent categories
    getParents: async (): Promise<GetCategoriesResponse> => {
      return api.get<GetCategoriesResponse>('/admin/categories/parents');
    },

    // Get sub categories
    getSubs: async (parentId: string): Promise<GetCategoriesResponse> => {
      return api.get<GetCategoriesResponse>(`/admin/categories/parents/${parentId}/children`);
    },

    // Get child categories
    getChildren: async (parentId: string): Promise<GetCategoriesResponse> => {
      return api.get<GetCategoriesResponse>(`/admin/categories/parents/${parentId}/grandchildren`);
    }
  },

  // Product endpoints
  products: {
    // Get products
    get: async (params?: GetProductsRequest): Promise<GetProductsResponse> => {
      const queryParams = new URLSearchParams();
      
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.search) queryParams.append('search', params.search);
      if (params?.category) queryParams.append('category', params.category);
      if (params?.brand) queryParams.append('brand', params.brand);
      if (params?.shop) queryParams.append('shop', params.shop);
      if (params?.status) queryParams.append('status', params.status);

      const queryString = queryParams.toString();
      const url = queryString ? `/admin/products?${queryString}` : '/admin/products';
      
      return api.get<GetProductsResponse>(url);
    },

    // Get product by ID/slug
    getById: async (id: string): Promise<GetProductResponse> => {
      return api.get<GetProductResponse>(`/admin/products/${id}`);
    },

    // Create product
    create: async (data: CreateProductRequest): Promise<CreateProductResponse> => {
      return api.post<CreateProductResponse>('/admin/products', data);
    },

    // Update product
    update: async (id: string, data: UpdateProductRequest): Promise<UpdateProductResponse> => {
      return api.put<UpdateProductResponse>(`/admin/products/${id}`, data);
    },

    // Delete product
    delete: async (id: string): Promise<{ message: string }> => {
      return api.delete<{ message: string }>(`/admin/products/${id}`);
    }
  },

  // Shop endpoints
  shops: {
    // Get shops
    get: async (params?: GetShopsRequest): Promise<GetShopsResponse> => {
      const queryParams = new URLSearchParams();
      
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.search) queryParams.append('search', params.search);
      if (params?.status) queryParams.append('status', params.status);

      const queryString = queryParams.toString();
      const url = queryString ? `/admin/shops?${queryString}` : '/admin/shops';
      
      return api.get<GetShopsResponse>(url);
    },

    // Get shop by ID/slug
    getById: async (id: string): Promise<GetShopResponse> => {
      return api.get<GetShopResponse>(`/admin/shops/${id}`);
    },

    // Create shop
    create: async (data: CreateShopRequest): Promise<CreateShopResponse> => {
      return api.post<CreateShopResponse>('/admin/shops', data);
    },

    // Update shop
    update: async (id: string, data: UpdateShopRequest): Promise<UpdateShopResponse> => {
      return api.put<UpdateShopResponse>(`/admin/shops/${id}`, data);
    },

    // Delete shop
    delete: async (id: string): Promise<{ message: string }> => {
      return api.delete<{ message: string }>(`/admin/shops/${id}`);
    },

    // Update shop status
    updateStatus: async (id: string, status: string): Promise<{ message: string }> => {
      return api.patch<{ message: string }>(`/admin/shops/${id}/status`, { status });
    },

    // Get shop analytics
    getAnalytics: async (id: string): Promise<any> => {
      return api.get(`/admin/shops/${id}/analytics`);
    }
  },

  // Order endpoints
  orders: {
    // Get orders
    get: async (params?: GetOrdersRequest): Promise<GetOrdersResponse> => {
      const queryParams = new URLSearchParams();
      
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.search) queryParams.append('search', params.search);
      if (params?.status) queryParams.append('status', params.status);
      if (params?.user) queryParams.append('user', params.user);
      if (params?.shop) queryParams.append('shop', params.shop);
      if (params?.dateFrom) queryParams.append('dateFrom', params.dateFrom);
      if (params?.dateTo) queryParams.append('dateTo', params.dateTo);

      const queryString = queryParams.toString();
      const url = queryString ? `/admin/orders?${queryString}` : '/admin/orders';
      
      return api.get<GetOrdersResponse>(url);
    },

    // Get order by ID
    getById: async (id: string): Promise<GetOrderResponse> => {
      return api.get<GetOrderResponse>(`/admin/orders/${id}`);
    },

    // Update order
    update: async (id: string, data: UpdateOrderRequest): Promise<UpdateOrderResponse> => {
      return api.put<UpdateOrderResponse>(`/admin/orders/${id}`, data);
    },

    // Cancel order
    cancel: async (id: string, reason?: string): Promise<{ message: string }> => {
      return api.patch<{ message: string }>(`/admin/orders/${id}/cancel`, { reason });
    },

    // Refund order
    refund: async (id: string, amount?: number, reason?: string): Promise<{ message: string }> => {
      return api.patch<{ message: string }>(`/admin/orders/${id}/refund`, { amount, reason });
    }
  },

  // User endpoints
  users: {
    // Get users
    get: async (params?: GetUsersRequest): Promise<GetUsersResponse> => {
      const queryParams = new URLSearchParams();
      
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.search) queryParams.append('search', params.search);
      if (params?.role) queryParams.append('role', params.role);
      if (params?.status) queryParams.append('status', params.status);

      const queryString = queryParams.toString();
      const url = queryString ? `/admin/users?${queryString}` : '/admin/users';
      
      return api.get<GetUsersResponse>(url);
    },

    // Get user by ID
    getById: async (id: string): Promise<GetUserResponse> => {
      return api.get<GetUserResponse>(`/admin/users/${id}`);
    },

    // Update user
    update: async (id: string, data: UpdateUserRequest): Promise<UpdateUserResponse> => {
      return api.put<UpdateUserResponse>(`/admin/users/${id}`, data);
    },

    // Update user role
    updateRole: async (id: string, data: UpdateUserRoleRequest): Promise<UpdateUserRoleResponse> => {
      return api.patch<UpdateUserRoleResponse>(`/admin/users/${id}/role`, data);
    },

    // Delete user
    delete: async (id: string): Promise<{ message: string }> => {
      return api.delete<{ message: string }>(`/admin/users/${id}`);
    }
  },

  // Coupon code endpoints
  couponCodes: {
    // Get coupon codes
    get: async (params?: GetCouponCodesRequest): Promise<GetCouponCodesResponse> => {
      const queryParams = new URLSearchParams();
      
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.search) queryParams.append('search', params.search);
      if (params?.status) queryParams.append('status', params.status);

      const queryString = queryParams.toString();
      const url = queryString ? `/admin/coupon-codes?${queryString}` : '/admin/coupon-codes';
      
      return api.get<GetCouponCodesResponse>(url);
    },

    // Get coupon code by ID
    getById: async (id: string): Promise<GetCouponCodeResponse> => {
      return api.get<GetCouponCodeResponse>(`/admin/coupon-codes/${id}`);
    },

    // Create coupon code
    create: async (data: CreateCouponCodeRequest): Promise<CreateCouponCodeResponse> => {
      return api.post<CreateCouponCodeResponse>('/admin/coupon-codes', data);
    },

    // Update coupon code
    update: async (id: string, data: UpdateCouponCodeRequest): Promise<UpdateCouponCodeResponse> => {
      return api.put<UpdateCouponCodeResponse>(`/admin/coupon-codes/${id}`, data);
    },

    // Delete coupon code
    delete: async (id: string): Promise<{ message: string }> => {
      return api.delete<{ message: string }>(`/admin/coupon-codes/${id}`);
    }
  },

  // Currency endpoints
  currencies: {
    // Get currencies
    get: async (params?: GetCurrenciesRequest): Promise<GetCurrenciesResponse> => {
      const queryParams = new URLSearchParams();
      
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.search) queryParams.append('search', params.search);
      if (params?.status) queryParams.append('status', params.status);

      const queryString = queryParams.toString();
      const url = queryString ? `/admin/currencies?${queryString}` : '/admin/currencies';
      
      return api.get<GetCurrenciesResponse>(url);
    },

    // Get currency by ID
    getById: async (id: string): Promise<GetCurrencyResponse> => {
      return api.get<GetCurrencyResponse>(`/admin/currencies/${id}`);
    },

    // Create currency
    create: async (data: CreateCurrencyRequest): Promise<CreateCurrencyResponse> => {
      return api.post<CreateCurrencyResponse>('/admin/currencies', data);
    },

    // Update currency
    update: async (id: string, data: UpdateCurrencyRequest): Promise<UpdateCurrencyResponse> => {
      return api.put<UpdateCurrencyResponse>(`/admin/currencies/${id}`, data);
    },

    // Delete currency
    delete: async (id: string): Promise<{ message: string }> => {
      return api.delete<{ message: string }>(`/admin/currencies/${id}`);
    }
  },

  // Attribute endpoints
  attributes: {
    // Get attributes
    get: async (params?: GetAttributesRequest): Promise<GetAttributesResponse> => {
      const queryParams = new URLSearchParams();
      
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.search) queryParams.append('search', params.search);
      if (params?.status) queryParams.append('status', params.status);
      if (params?.type) queryParams.append('type', params.type);

      const queryString = queryParams.toString();
      const url = queryString ? `/admin/attributes?${queryString}` : '/admin/attributes';
      
      return api.get<GetAttributesResponse>(url);
    },

    // Get attribute by ID
    getById: async (id: string): Promise<GetAttributeResponse> => {
      return api.get<GetAttributeResponse>(`/admin/attributes/${id}`);
    },

    // Create attribute
    create: async (data: CreateAttributeRequest): Promise<CreateAttributeResponse> => {
      return api.post<CreateAttributeResponse>('/admin/attributes', data);
    },

    // Update attribute
    update: async (id: string, data: UpdateAttributeRequest): Promise<UpdateAttributeResponse> => {
      return api.put<UpdateAttributeResponse>(`/admin/attributes/${id}`, data);
    },

    // Delete attribute
    delete: async (id: string): Promise<{ message: string }> => {
      return api.delete<{ message: string }>(`/admin/attributes/${id}`);
    }
  },

  // Newsletter endpoints
  newsletter: {
    // Get newsletter subscriptions
    get: async (params?: GetNewslettersRequest): Promise<GetNewslettersResponse> => {
      const queryParams = new URLSearchParams();
      
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.search) queryParams.append('search', params.search);
      if (params?.status) queryParams.append('status', params.status);

      const queryString = queryParams.toString();
      const url = queryString ? `/admin/newsletter?${queryString}` : '/admin/newsletter';
      
      return api.get<GetNewslettersResponse>(url);
    },

    // Send newsletter
    sendNewsletter: async (data: any): Promise<{ message: string }> => {
      return api.post<{ message: string }>('/admin/newsletter/send', data);
    },

    // Export newsletter subscribers
    exportSubscribers: async (): Promise<Blob> => {
      return api.get('/admin/newsletter/export', {
        responseType: 'blob'
      });
    }
  },

  // Settings endpoints
  settings: {
    // Main settings
    main: {
      get: async (): Promise<GetMainSettingsResponse> => {
        return api.get<GetMainSettingsResponse>('/admin/settings/main');
      },
      update: async (data: UpdateMainSettingsRequest): Promise<UpdateMainSettingsResponse> => {
        return api.put<UpdateMainSettingsResponse>('/admin/settings/main', data);
      }
    },

    // Home settings
    home: {
      get: async (): Promise<GetHomeSettingsResponse> => {
        return api.get<GetHomeSettingsResponse>('/admin/settings/home');
      },
      update: async (data: UpdateHomeSettingsRequest): Promise<UpdateHomeSettingsResponse> => {
        return api.put<UpdateHomeSettingsResponse>('/admin/settings/home', data);
      }
    },

    // Branding settings
    branding: {
      get: async (): Promise<GetBrandingSettingsResponse> => {
        return api.get<GetBrandingSettingsResponse>('/admin/settings/branding');
      },
      update: async (data: UpdateBrandingSettingsRequest): Promise<UpdateBrandingSettingsResponse> => {
        return api.put<UpdateBrandingSettingsResponse>('/admin/settings/branding', data);
      }
    }
  },

  // File management endpoints
  files: {
    // Delete file
    delete: async (data: DeleteFileRequest): Promise<{ message: string }> => {
      return api.delete<{ message: string }>('/admin/files', { data });
    },

    // Get file info
    getInfo: async (publicId: string): Promise<any> => {
      return api.get(`/admin/files/${publicId}`);
    }
  }
};

// Export individual functions for backward compatibility
export const getBrandsByAdmin = adminService.brands.get;
export const getBrandByAdmin = adminService.brands.getById;
export const addBrandByAdmin = adminService.brands.create;
export const updateBrandByAdmin = adminService.brands.update;
export const deleteBrandByAdmin = adminService.brands.delete;

export const getCategoriesByAdmin = adminService.categories.get;
export const getCategoryByAdmin = adminService.categories.getById;
export const addCategoryByAdmin = adminService.categories.create;
export const updateCategoryByAdmin = adminService.categories.update;
export const deleteCategoryByAdmin = adminService.categories.delete;

export const getProductsByAdmin = adminService.products.get;
export const getProductByAdmin = adminService.products.getById;
export const addProductByAdmin = adminService.products.create;
export const updateProductByAdmin = adminService.products.update;
export const deleteProductByAdmin = adminService.products.delete;

export const getShopsByAdmin = adminService.shops.get;
export const getShopByAdmin = adminService.shops.getById;
export const addShopByAdmin = adminService.shops.create;
export const updateShopByAdmin = adminService.shops.update;
export const deleteShopByAdmin = adminService.shops.delete;

export const getOrdersByAdmin = adminService.orders.get;
export const getOrderByAdmin = adminService.orders.getById;
export const updateOrderByAdmin = adminService.orders.update;

export const getUsersByAdmin = adminService.users.get;
export const getUserByAdmin = adminService.users.getById;
export const updateUserByAdmin = adminService.users.update;
export const updateUserRoleByAdmin = adminService.users.updateRole;
export const deleteUserByAdmin = adminService.users.delete;

export const getCouponCodesByAdmin = adminService.couponCodes.get;
export const getCouponCodeByAdmin = adminService.couponCodes.getById;
export const addCouponCodeByAdmin = adminService.couponCodes.create;
export const updateCouponCodeByAdmin = adminService.couponCodes.update;
export const deleteCouponCodeByAdmin = adminService.couponCodes.delete;

export const getCurrenciesByAdmin = adminService.currencies.get;
export const getCurrencyByAdmin = adminService.currencies.getById;
export const addCurrencyByAdmin = adminService.currencies.create;
export const updateCurrencyByAdmin = adminService.currencies.update;
export const deleteCurrencyByAdmin = adminService.currencies.delete;

export const getAttributesByAdmin = adminService.attributes.get;
export const getAttributeByAdmin = adminService.attributes.getById;
export const addAttributeByAdmin = adminService.attributes.create;
export const updateAttributeByAdmin = adminService.attributes.update;
export const deleteAttributeByAdmin = adminService.attributes.delete;

export const getNewslettersByAdmin = adminService.newsletter.get;
export const sendNewsletterByAdmin = adminService.newsletter.sendNewsletter;

export const getMainSettingsByAdmin = adminService.settings.main.get;
export const updateMainSettingsByAdmin = adminService.settings.main.update;
export const getHomeSettingsByAdmin = adminService.settings.home.get;
export const updateHomeSettingsByAdmin = adminService.settings.home.update;
export const getBrandingSettingsByAdmin = adminService.settings.branding.get;
export const updateBrandingSettingsByAdmin = adminService.settings.branding.update;

export const singleDeleteFile = adminService.files.delete;
export const getFileInfo = adminService.files.getInfo;

export const adminDashboardAnalytics = adminService.dashboard.getAnalytics;
export const vendorDashboardAnalytics = adminService.dashboard.getVendorAnalytics;
export const getLowStockProductsByAdmin = adminService.dashboard.getLowStockProducts;

// Additional exports for backward compatibility
export const getAllBrandsByAdmin = getBrandsByAdmin;
export const getAllCategories = getCategoriesByAdmin;
export const getAllShopsByAdmin = getShopsByAdmin;
export const getIncomeDetailsByAdmin = getShopByAdmin;
export const getNewsletter = getNewslettersByAdmin;

// Payment functions (placeholder implementations)
export const getPaymentsByAdmin = async (): Promise<any> => {
  const response = await api.get('/admin/payments');
  return response.data;
};

export const getPaymentByAdmin = async (id: string): Promise<any> => {
  const response = await api.get(`/admin/payments/${id}`);
  return response.data;
};

export const addPaymentByAdmin = async (data: any): Promise<any> => {
  const response = await api.post('/admin/payments', data);
  return response.data;
};

export const updatePaymentByAdmin = async (id: string, data: any): Promise<any> => {
  const response = await api.put(`/admin/payments/${id}`, data);
  return response.data;
};

export const deletePaymentByAdmin = async (id: string): Promise<any> => {
  const response = await api.delete(`/admin/payments/${id}`);
  return response.data;
};

export const getPayoutsByAdmin = getPaymentsByAdmin;

// Courier functions (placeholder implementations)
export const createCourierInfo = async (data: any): Promise<any> => {
  const response = await api.post('/admin/orders/courier-info', data);
  return response.data;
};

export const updateCourierInfo = async (data: any): Promise<any> => {
  const response = await api.put('/admin/orders/courier-info', data);
  return response.data;
};

// Alias functions for backward compatibility
export const addChildCategoryByAdmin = addCategoryByAdmin;
export const updateChildCategoryByAdmin = updateCategoryByAdmin;
export const getChildCategoryByAdmin = getCategoryByAdmin;
export const addSubCategoryByAdmin = addCategoryByAdmin;
export const updateSubCategoryByAdmin = updateCategoryByAdmin;
export const getSubCategoryByAdmin = getCategoryByAdmin;
export const updateOrderStatus = updateOrderByAdmin;
export const updateOrderStatusByVendor = updateOrderByAdmin;
export const deleteOrderByAdmin = async (id: string): Promise<any> => {
  const response = await api.delete(`/admin/orders/${id}`);
  return response.data;
};
export const getUserByAdminsByAdmin = getUsersByAdmin;
export const getShopDetailsByAdmin = getShopByAdmin;
