// Form data types and validation schemas

import type { 
  User, 
  Brand, 
  Category, 
  Product, 
  Shop, 
  Order, 
  CouponCode, 
  Currency, 
  Attribute,
  Address,
  ProductVariant,
  FileUpload
} from './models';

// Generic form types
export interface FormFieldError {
  field: string;
  message: string;
}

export interface FormState<T = any> {
  values: T;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isValid: boolean;
  isSubmitting: boolean;
  isDirty: boolean;
}

// Auth form types
export interface SignInFormData {
  email: string;
  password: string;
  remember: boolean;
}

export interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

export interface OtpFormData {
  email: string;
  otp: string;
}

// Profile form types
export interface ProfileFormData {
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: FileUpload;
  addresses?: AddressFormData[];
}

export interface AddressFormData {
  type: 'billing' | 'shipping';
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
  isDefault?: boolean;
}

export interface ChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Brand form types
export interface BrandFormData {
  name: string;
  slug: string;
  description?: string;
  logo?: FileUpload;
  metaTitle?: string;
  metaDescription?: string;
  status: string;
}

// Category form types
export interface CategoryFormData {
  name: string;
  slug: string;
  description?: string;
  image?: FileUpload;
  metaTitle?: string;
  metaDescription?: string;
  status: string;
  parent?: string;
}

export interface SubCategoryFormData extends CategoryFormData {
  parent: string;
}

export interface ChildCategoryFormData extends CategoryFormData {
  parent: string;
}

// Product form types
export interface ProductFormData {
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
  variants?: ProductVariantFormData[];
  attributes?: ProductAttributeFormData[];
  pricing: ProductPricingFormData;
  inventory: ProductInventoryFormData;
  shipping?: ProductShippingFormData;
  seo: ProductSEOFormData;
}

export interface ProductVariantFormData {
  name: string;
  attributes: Record<string, string>;
  pricing: ProductPricingFormData;
  inventory: ProductInventoryFormData;
  images?: FileUpload[];
  status: string;
}

export interface ProductAttributeFormData {
  attribute: string;
  values: string[];
}

export interface ProductPricingFormData {
  regularPrice: number;
  salePrice?: number;
  costPrice?: number;
  currency: string;
}

export interface ProductInventoryFormData {
  sku?: string;
  stock: number;
  lowStockThreshold?: number;
  manageStock: boolean;
  allowBackorder: boolean;
}

export interface ProductShippingFormData {
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  shippingClass?: string;
}

export interface ProductSEOFormData {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
}

// Shop form types
export interface ShopFormData {
  name: string;
  slug: string;
  description?: string;
  logo?: FileUpload;
  banner?: FileUpload;
  address: ShopAddressFormData;
  contact: ShopContactFormData;
  settings: ShopSettingsFormData;
  verification: ShopVerificationFormData;
}

export interface ShopAddressFormData {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface ShopContactFormData {
  email: string;
  phone: string;
  website?: string;
}

export interface ShopSettingsFormData {
  commission: number;
  paymentMethods: string[];
  shippingMethods: string[];
  returnPolicy?: string;
  refundPolicy?: string;
}

export interface ShopVerificationFormData {
  documents: FileUpload[];
}

// Order form types
export interface OrderFormData {
  items: OrderItemFormData[];
  shippingAddress: AddressFormData;
  billingAddress?: AddressFormData;
  paymentMethod: string;
  notes?: string;
}

export interface OrderItemFormData {
  product: string;
  variant?: string;
  quantity: number;
}

// Coupon Code form types
export interface CouponCodeFormData {
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

// Currency form types
export interface CurrencyFormData {
  name: string;
  code: string;
  symbol: string;
  rate: number;
  isDefault: boolean;
  status: string;
}

// Attribute form types
export interface AttributeFormData {
  name: string;
  slug: string;
  type: string;
  values: AttributeValueFormData[];
  status: string;
}

export interface AttributeValueFormData {
  name: string;
  value: string;
  color?: string;
  image?: FileUpload;
}

// Settings form types
export interface MainSettingsFormData {
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

export interface HomeSettingsFormData {
  slides: HomeSlideFormData[];
  banner1: HomeBannerFormData;
  banner2: HomeBannerFormData;
}

export interface HomeSlideFormData {
  link: string;
  image: FileUpload;
}

export interface HomeBannerFormData {
  link: string;
  image?: FileUpload;
}

export interface BrandingSettingsFormData {
  logoLight: FileUpload;
  logoDark: FileUpload;
  favicon?: FileUpload;
  primaryColor: string;
  secondaryColor: string;
  fontFamily?: string;
}

// Contact form types
export interface ContactUsFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

// Review form types
export interface ReviewFormData {
  rating: number;
  title?: string;
  comment?: string;
}

// Checkout form types
export interface CheckoutFormData {
  shippingAddress: AddressFormData;
  billingAddress?: AddressFormData;
  paymentMethod: string;
  shippingMethod: string;
  couponCode?: string;
  notes?: string;
}

// Shipment address form types
export interface ShipmentAddressFormData {
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
  isDefault?: boolean;
}

// File upload form types
export interface FileUploadFormData {
  file: File;
  preview?: string;
  progress?: number;
}

// Form validation error types
export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

export interface FormValidationState {
  isValid: boolean;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
}

// Form submission types
export interface FormSubmissionState {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
  data: any;
}

// Multi-step form types
export interface MultiStepFormState<T = any> {
  currentStep: number;
  totalSteps: number;
  data: T;
  completedSteps: number[];
  isValid: boolean;
  canProceed: boolean;
}

// Table form types (for inline editing)
export interface TableFormData {
  id: string;
  [key: string]: any;
}

export interface TableFormState {
  editingId: string | null;
  formData: TableFormData | null;
  isEditing: boolean;
  isSubmitting: boolean;
}

// Search form types
export interface SearchFormData {
  query: string;
  category?: string;
  brand?: string;
  shop?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

// Filter form types
export interface FilterFormData {
  status?: string;
  category?: string;
  brand?: string;
  shop?: string;
  dateFrom?: string;
  dateTo?: string;
  minPrice?: number;
  maxPrice?: number;
}

// Pagination form types
export interface PaginationFormData {
  page: number;
  limit: number;
  total: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// Dialog form types
export interface DialogFormData<T = any> {
  isOpen: boolean;
  data: T | null;
  mode: 'create' | 'edit' | 'view';
  title: string;
  isLoading: boolean;
}

// Bulk action form types
export interface BulkActionFormData {
  selectedIds: string[];
  action: string;
  data?: Record<string, any>;
}

// Import/Export form types
export interface ImportFormData {
  file: File;
  type: 'csv' | 'excel' | 'json';
  mapping?: Record<string, string>;
  options?: Record<string, any>;
}

export interface ExportFormData {
  type: 'csv' | 'excel' | 'json';
  filters?: FilterFormData;
  fields?: string[];
  format?: Record<string, any>;
}
