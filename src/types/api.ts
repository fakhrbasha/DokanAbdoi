// API request and response types

import type { 
  User, 
  Brand, 
  Category, 
  Product, 
  Shop, 
  Order, 
  CouponCode, 
  Currency, 
  Newsletter, 
  Attribute,
  ApiResponse, 
  PaginatedResponse,
  DashboardAnalytics,
  MainSettings,
  HomeSettings,
  BrandingSettings,
  FileUpload,
  ProductVariant
} from './models';

// Generic API types
export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, any>;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface FilterParams {
  status?: string;
  category?: string;
  brand?: string;
  shop?: string;
  dateFrom?: string;
  dateTo?: string;
}

// Auth API types
export interface SignInRequest {
  email: string;
  password: string;
  remember?: boolean;
}

export interface SignInResponse {
  user: User;
  token: string;
}

export interface SignUpRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

// Brand API types
export interface CreateBrandRequest {
  name: string;
  slug: string;
  description?: string;
  logo?: FileUpload;
  metaTitle?: string;
  metaDescription?: string;
  status: string;
}

export interface UpdateBrandRequest extends CreateBrandRequest {
  currentSlug: string;
}

export interface GetBrandsRequest extends PaginationParams, FilterParams {}

export type GetBrandsResponse = PaginatedResponse<Brand>;
export type GetBrandResponse = ApiResponse<Brand>;
export type CreateBrandResponse = ApiResponse<Brand>;
export type UpdateBrandResponse = ApiResponse<Brand>;

// Category API types
export interface CreateCategoryRequest {
  name: string;
  slug: string;
  description?: string;
  image?: FileUpload;
  metaTitle?: string;
  metaDescription?: string;
  status: string;
  parent?: string;
}

export interface UpdateCategoryRequest extends CreateCategoryRequest {
  currentSlug: string;
}

export interface GetCategoriesRequest extends PaginationParams, FilterParams {}

export type GetCategoriesResponse = PaginatedResponse<Category>;
export type GetCategoryResponse = ApiResponse<Category>;
export type CreateCategoryResponse = ApiResponse<Category>;
export type UpdateCategoryResponse = ApiResponse<Category>;

// Product API types
export interface CreateProductRequest {
  name: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  images: FileUpload[];
  category: string;
  brand?: string;
  shop?: string;
  type: string;
  status: string;
  featured: boolean;
  tags: string[];
  variants?: CreateProductVariantRequest[];
  attributes?: ProductAttributeRequest[];
  pricing: ProductPricingRequest;
  inventory: ProductInventoryRequest;
  shipping?: ProductShippingRequest;
  seo: ProductSEORequest;
}

export interface UpdateProductRequest extends CreateProductRequest {
  currentSlug: string;
}

export interface CreateProductVariantRequest {
  name: string;
  attributes: Record<string, string>;
  pricing: ProductPricingRequest;
  inventory: ProductInventoryRequest;
  images?: FileUpload[];
  status: string;
}

export interface ProductAttributeRequest {
  attribute: string;
  values: string[];
}

export interface ProductPricingRequest {
  regularPrice: number;
  salePrice?: number;
  costPrice?: number;
  currency: string;
}

export interface ProductInventoryRequest {
  sku?: string;
  stock: number;
  lowStockThreshold?: number;
  manageStock: boolean;
  allowBackorder: boolean;
}

export interface ProductShippingRequest {
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  shippingClass?: string;
}

export interface ProductSEORequest {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
}

export interface GetProductsRequest extends PaginationParams, FilterParams {
  category?: string;
  brand?: string;
  shop?: string;
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
}

export type GetProductsResponse = PaginatedResponse<Product>;
export type GetProductResponse = ApiResponse<Product>;
export type CreateProductResponse = ApiResponse<Product>;
export type UpdateProductResponse = ApiResponse<Product>;

// Shop API types
export interface CreateShopRequest {
  name: string;
  slug: string;
  description?: string;
  logo?: FileUpload;
  banner?: FileUpload;
  address: ShopAddressRequest;
  contact: ShopContactRequest;
  settings: ShopSettingsRequest;
  verification: ShopVerificationRequest;
}

export interface UpdateShopRequest extends CreateShopRequest {
  currentSlug: string;
}

export interface ShopAddressRequest {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface ShopContactRequest {
  email: string;
  phone: string;
  website?: string;
}

export interface ShopSettingsRequest {
  commission: number;
  paymentMethods: string[];
  shippingMethods: string[];
  returnPolicy?: string;
  refundPolicy?: string;
}

export interface ShopVerificationRequest {
  documents: FileUpload[];
}

export interface GetShopsRequest extends PaginationParams, FilterParams {}

export type GetShopsResponse = PaginatedResponse<Shop>;
export type GetShopResponse = ApiResponse<Shop>;
export type CreateShopResponse = ApiResponse<Shop>;
export type UpdateShopResponse = ApiResponse<Shop>;

// Order API types
export interface CreateOrderRequest {
  items: CreateOrderItemRequest[];
  shippingAddress: AddressRequest;
  billingAddress?: AddressRequest;
  paymentMethod: string;
  notes?: string;
}

export interface CreateOrderItemRequest {
  product: string;
  variant?: string;
  quantity: number;
}

export interface AddressRequest {
  firstName: string;
  lastName: string;
  company?: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
}

export interface UpdateOrderRequest {
  status?: string;
  trackingNumber?: string;
  carrier?: string;
  notes?: string;
}

export interface GetOrdersRequest extends PaginationParams, FilterParams {
  user?: string;
  shop?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
}

export type GetOrdersResponse = PaginatedResponse<Order>;
export type GetOrderResponse = ApiResponse<Order>;
export type CreateOrderResponse = ApiResponse<Order>;
export type UpdateOrderResponse = ApiResponse<Order>;

// User API types
export interface UpdateUserRequest {
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: FileUpload;
  addresses?: AddressRequest[];
}

export interface UpdateUserRoleRequest {
  role: string[];
}

export interface GetUsersRequest extends PaginationParams, FilterParams {
  role?: string;
}

export type GetUsersResponse = PaginatedResponse<User>;
export type GetUserResponse = ApiResponse<User>;
export type UpdateUserResponse = ApiResponse<User>;
export type UpdateUserRoleResponse = ApiResponse<User>;

// Coupon Code API types
export interface CreateCouponCodeRequest {
  code: string;
  type: string;
  value: number;
  minimumAmount?: number;
  maximumDiscount?: number;
  usageLimit?: number;
  status: string;
  validFrom: string;
  validUntil: string;
  applicableProducts?: string[];
  applicableCategories?: string[];
}

export interface UpdateCouponCodeRequest extends CreateCouponCodeRequest {
  _id: string;
}

export interface GetCouponCodesRequest extends PaginationParams, FilterParams {}

export type GetCouponCodesResponse = PaginatedResponse<CouponCode>;
export type GetCouponCodeResponse = ApiResponse<CouponCode>;
export type CreateCouponCodeResponse = ApiResponse<CouponCode>;
export type UpdateCouponCodeResponse = ApiResponse<CouponCode>;

// Currency API types
export interface CreateCurrencyRequest {
  name: string;
  code: string;
  symbol: string;
  rate: number;
  isDefault: boolean;
  status: string;
}

export interface UpdateCurrencyRequest extends CreateCurrencyRequest {
  _id: string;
}

export interface GetCurrenciesRequest extends PaginationParams, FilterParams {}

export type GetCurrenciesResponse = PaginatedResponse<Currency>;
export type GetCurrencyResponse = ApiResponse<Currency>;
export type CreateCurrencyResponse = ApiResponse<Currency>;
export type UpdateCurrencyResponse = ApiResponse<Currency>;

// Attribute API types
export interface CreateAttributeRequest {
  name: string;
  slug: string;
  type: string;
  values: AttributeValueRequest[];
  status: string;
}

export interface UpdateAttributeRequest extends CreateAttributeRequest {
  _id: string;
}

export interface AttributeValueRequest {
  name: string;
  value: string;
  color?: string;
  image?: FileUpload;
}

export interface GetAttributesRequest extends PaginationParams, FilterParams {}

export type GetAttributesResponse = PaginatedResponse<Attribute>;
export type GetAttributeResponse = ApiResponse<Attribute>;
export type CreateAttributeResponse = ApiResponse<Attribute>;
export type UpdateAttributeResponse = ApiResponse<Attribute>;

// Newsletter API types
export interface CreateNewsletterRequest {
  email: string;
}

export interface GetNewslettersRequest extends PaginationParams, FilterParams {}

export type GetNewslettersResponse = PaginatedResponse<Newsletter>;
export type CreateNewsletterResponse = ApiResponse<Newsletter>;

// File Upload API types
export interface FileUploadRequest {
  file: File;
  upload_preset: string;
}

export interface FileUploadResponse {
  public_id: string;
  secure_url: string;
  format: string;
  size: number;
  width?: number;
  height?: number;
}

export interface DeleteFileRequest {
  public_id: string;
}

// Settings API types
export interface UpdateMainSettingsRequest {
  _id: string;
  businessName: string;
  domainName: string;
  websiteStatus: boolean;
  offlineMessage: string;
  seo: {
    metaTitle: string;
    description: string;
    metaDescription: string;
    tags: string[];
  };
  gaId?: string;
  gtmId?: string;
  shippingFee: number;
  commission: number;
}

export interface UpdateHomeSettingsRequest {
  _id: string;
  slides: HomeSlideRequest[];
  banner1: HomeBannerRequest;
  banner2: HomeBannerRequest;
}

export interface HomeSlideRequest {
  link: string;
  image: FileUpload;
}

export interface HomeBannerRequest {
  link: string;
  image?: FileUpload;
}

export interface UpdateBrandingSettingsRequest {
  _id: string;
  logoLight: FileUpload;
  logoDark: FileUpload;
  favicon?: FileUpload;
  primaryColor: string;
  secondaryColor: string;
  fontFamily?: string;
}

export type GetMainSettingsResponse = ApiResponse<MainSettings>;
export type UpdateMainSettingsResponse = ApiResponse<MainSettings>;
export type GetHomeSettingsResponse = ApiResponse<HomeSettings>;
export type UpdateHomeSettingsResponse = ApiResponse<HomeSettings>;
export type GetBrandingSettingsResponse = ApiResponse<BrandingSettings>;
export type UpdateBrandingSettingsResponse = ApiResponse<BrandingSettings>;

// Dashboard API types
export type GetDashboardAnalyticsResponse = ApiResponse<DashboardAnalytics>;
export type GetVendorDashboardAnalyticsResponse = ApiResponse<DashboardAnalytics>;

// Contact API types
export interface ContactUsRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export type ContactUsResponse = ApiResponse<{ message: string }>;

// Profile API types
export interface UpdateProfileRequest {
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: FileUpload;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export type UpdateProfileResponse = ApiResponse<User>;
export type ChangePasswordResponse = ApiResponse<{ message: string }>;

// Wishlist API types
export interface AddToWishlistRequest {
  product: string;
}

export interface RemoveFromWishlistRequest {
  product: string;
}

export type GetWishlistResponse = ApiResponse<Product[]>;
export type AddToWishlistResponse = ApiResponse<{ message: string }>;
export type RemoveFromWishlistResponse = ApiResponse<{ message: string }>;

// Cart API types
export interface AddToCartRequest {
  product: string;
  variant?: string;
  quantity: number;
}

export interface UpdateCartItemRequest {
  product: string;
  variant?: string;
  quantity: number;
}

export interface RemoveFromCartRequest {
  product: string;
  variant?: string;
}

export interface CartItem {
  product: Product;
  variant?: ProductVariant;
  quantity: number;
  price: number;
  total: number;
}

export type GetCartResponse = ApiResponse<CartItem[]>;
export type AddToCartResponse = ApiResponse<{ message: string }>;
export type UpdateCartItemResponse = ApiResponse<{ message: string }>;
export type RemoveFromCartResponse = ApiResponse<{ message: string }>;
