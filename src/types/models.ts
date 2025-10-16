// Domain models for the e-commerce application

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: FileUpload;
  role: UserRole[];
  isEmailVerified: boolean;
  wishlist: Product[];
  addresses?: Address[];
  createdAt: string;
  updatedAt: string;
}

export type UserRole = 'admin' | 'vendor' | 'customer';

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  logo?: FileUpload;
  metaTitle?: string;
  metaDescription?: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: FileUpload;
  metaTitle?: string;
  metaDescription?: string;
  status: Status;
  parent?: string; // Category ID for parent category
  children?: Category[];
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  images: FileUpload[];
  category: string | Category;
  brand?: string | Brand;
  shop?: string | Shop;
  type: ProductType;
  status: Status;
  featured: boolean;
  tags: string[];
  variants?: ProductVariant[];
  attributes?: ProductAttribute[];
  pricing: ProductPricing;
  inventory: ProductInventory;
  shipping: ProductShipping;
  seo: ProductSEO;
  reviews?: ProductReview[];
  createdAt: string;
  updatedAt: string;
}

export type ProductType = 'simple' | 'variable' | 'grouped';

export interface ProductVariant {
  _id: string;
  name: string;
  attributes: Record<string, string>; // e.g., { color: 'red', size: 'L' }
  pricing: ProductPricing;
  inventory: ProductInventory;
  images?: FileUpload[];
  status: Status;
}

export interface ProductAttribute {
  _id: string;
  name: string;
  values: string[];
}

export interface ProductPricing {
  regularPrice: number;
  salePrice?: number;
  costPrice?: number;
  currency: string;
}

export interface ProductInventory {
  sku?: string;
  stock: number;
  lowStockThreshold?: number;
  manageStock: boolean;
  allowBackorder: boolean;
}

export interface ProductShipping {
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  shippingClass?: string;
}

export interface ProductSEO {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
}

export interface ProductReview {
  _id: string;
  user: string | User;
  product: string | Product;
  rating: number;
  title?: string;
  comment?: string;
  verified: boolean;
  createdAt: string;
}

export interface Shop {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  logo?: FileUpload;
  banner?: FileUpload;
  owner: string | User;
  status: ShopStatus;
  address: ShopAddress;
  contact: ShopContact;
  settings: ShopSettings;
  verification: ShopVerification;
  createdAt: string;
  updatedAt: string;
}

export type ShopStatus = 'pending' | 'approved' | 'in_review' | 'action_required' | 'cancelled' | 'closed';

export interface ShopAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface ShopContact {
  email: string;
  phone: string;
  website?: string;
}

export interface ShopSettings {
  commission: number;
  paymentMethods: string[];
  shippingMethods: string[];
  returnPolicy?: string;
  refundPolicy?: string;
}

export interface ShopVerification {
  documents: FileUpload[];
  status: 'pending' | 'approved' | 'rejected';
  notes?: string;
  verifiedAt?: string;
}

export interface Order {
  _id: string;
  orderNumber: string;
  user: string | User;
  shop?: string | Shop;
  items: OrderItem[];
  status: OrderStatus;
  payment: OrderPayment;
  shipping: OrderShipping;
  billing: OrderBilling;
  totals: OrderTotals;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded'
  | 'returned';

export interface OrderItem {
  product: string | Product;
  variant?: string | ProductVariant;
  quantity: number;
  price: number;
  total: number;
}

export interface OrderPayment {
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  amount: number;
  paidAt?: string;
}

export type PaymentMethod = 'credit_card' | 'paypal' | 'bank_transfer' | 'cash_on_delivery';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface OrderShipping {
  method: string;
  trackingNumber?: string;
  carrier?: string;
  address: Address;
  estimatedDelivery?: string;
  shippedAt?: string;
  deliveredAt?: string;
}

export interface OrderBilling {
  address: Address;
  company?: string;
  taxId?: string;
}

export interface OrderTotals {
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  currency: string;
}

export interface Address {
  _id?: string;
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

export interface CouponCode {
  _id: string;
  code: string;
  type: CouponType;
  value: number;
  minimumAmount?: number;
  maximumDiscount?: number;
  usageLimit?: number;
  usedCount: number;
  status: Status;
  validFrom: string;
  validUntil: string;
  applicableProducts?: string[];
  applicableCategories?: string[];
  createdAt: string;
  updatedAt: string;
}

export type CouponType = 'percentage' | 'fixed_amount';

export interface Currency {
  _id: string;
  name: string;
  code: string;
  symbol: string;
  rate: number;
  isDefault: boolean;
  status: Status;
}

export interface Newsletter {
  _id: string;
  email: string;
  status: 'active' | 'unsubscribed';
  subscribedAt: string;
  unsubscribedAt?: string;
}

export interface Attribute {
  _id: string;
  name: string;
  slug: string;
  type: AttributeType;
  values: AttributeValue[];
  status: Status;
  createdAt: string;
  updatedAt: string;
}

export type AttributeType = 'color' | 'size' | 'material' | 'brand' | 'custom';

export interface AttributeValue {
  _id: string;
  name: string;
  value: string;
  color?: string; // For color attributes
  image?: FileUpload; // For image attributes
}

export interface FileUpload {
  _id: string;
  url: string;
  public_id?: string;
  format?: string;
  size?: number;
  width?: number;
  height?: number;
}

export type Status = 'active' | 'inactive' | 'pending' | 'draft';

// Analytics and Dashboard types
export interface DashboardAnalytics {
  dailyEarning: number;
  dailyOrders: number;
  totalUsers: number;
  totalProducts: number;
  totalVendors: number;
  totalPendingOrders: number;
  salesReport: ChartData[];
  incomeReport: ChartData[];
  commissionReport: ChartData[];
  ordersReport: ChartData[];
  bestSellingProducts: BestSellingProduct[];
}

export interface ChartData {
  date: string;
  value: number;
  label?: string;
}

export interface BestSellingProduct {
  _id: string;
  name: string;
  image?: FileUpload;
  totalSold: number;
  revenue: number;
}

// API Response wrappers
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T = any> {
  data: T[];
  page: number;
  totalPages: number;
  totalCount: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// Settings types
export interface MainSettings {
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

export interface HomeSettings {
  _id: string;
  slides: HomeSlide[];
  banner1: HomeBanner;
  banner2: HomeBanner;
}

export interface HomeSlide {
  link: string;
  image: FileUpload;
}

export interface HomeBanner {
  link: string;
  image?: FileUpload;
}

export interface BrandingSettings {
  _id: string;
  logoLight: FileUpload;
  logoDark: FileUpload;
  favicon?: FileUpload;
  primaryColor: string;
  secondaryColor: string;
  fontFamily?: string;
}
