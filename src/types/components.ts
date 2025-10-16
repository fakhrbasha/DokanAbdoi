// Shared component prop types

import type { ReactNode, ComponentType, CSSProperties } from 'react';
import type { SxProps, Theme } from '@mui/material';
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
  FileUpload,
  DashboardAnalytics
} from './models';

// Generic component props
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
  id?: string;
  style?: CSSProperties;
}

// Loading component props
export interface LoadingProps extends BaseComponentProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'circular' | 'linear';
  color?: 'primary' | 'secondary' | 'inherit';
  sx?: SxProps<Theme>;
}

// Avatar component props
export interface AvatarProps extends BaseComponentProps {
  src?: string;
  alt?: string;
  size?: number;
  variant?: 'circular' | 'rounded' | 'square';
  fallback?: ReactNode;
  onClick?: () => void;
  sx?: SxProps<Theme>;
}

// Logo component props
export interface LogoProps extends BaseComponentProps {
  branding?: {
    logoLight: FileUpload;
    logoDark: FileUpload;
  };
  isDarkMode?: boolean;
  width?: number;
  height?: number;
  href?: string;
  sx?: SxProps<Theme>;
}

// Header breadcrumbs props
export interface HeaderBreadcrumbsProps extends BaseComponentProps {
  links: BreadcrumbLink[];
  action?: BreadcrumbAction | ReactNode;
  icon?: ReactNode;
  heading: string;
  moreLink?: string | string[];
  admin?: boolean;
  isUser?: boolean;
  sx?: SxProps<Theme>;
}

export interface BreadcrumbLink {
  name: string;
  href?: string;
  icon?: ReactNode;
}

export interface BreadcrumbAction {
  href?: string;
  title: string;
  icon?: ReactNode;
}

// Pagination component props
export interface PaginationProps extends BaseComponentProps {
  data?: {
    totalPages?: number;
    currentPage?: number;
  };
  onPageChange?: (page: number) => void;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  maxVisible?: number;
  sx?: SxProps<Theme>;
}

// Search component props
export interface SearchProps extends BaseComponentProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (query: string) => void;
  loading?: boolean;
  disabled?: boolean;
  debounceMs?: number;
  sx?: SxProps<Theme>;
}

// Incrementer component props
export interface IncrementerProps extends BaseComponentProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
}

// Slider component props
export interface SliderProps extends BaseComponentProps {
  slides: any[];
  autoplay?: boolean;
  autoplaySpeed?: number;
  dots?: boolean;
  arrows?: boolean;
  infinite?: boolean;
  slidesToShow?: number;
  slidesToScroll?: number;
  responsive?: SliderResponsive[];
}

export interface SliderResponsive {
  breakpoint: number;
  settings: Partial<SliderProps>;
}

// Scrollbar component props
export interface ScrollbarProps extends BaseComponentProps {
  scrollbarWidth?: number;
  scrollbarHeight?: number;
  scrollbarThumbColor?: string;
  scrollbarTrackColor?: string;
  autoHide?: boolean;
  autoHideTimeout?: number;
}

// Phone input field props
export interface PhoneInputFieldProps extends BaseComponentProps {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  error?: boolean;
  helperText?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  country?: string;
  countries?: Country[];
}

export interface Country {
  code: string;
  name: string;
  phone: string;
  flag: string;
}

// Table component props
export interface TableProps<T = any> extends BaseComponentProps {
  headData: TableColumn<T>[];
  data: {
    data: T[];
    page: number;
    totalPages: number;
    totalCount: number;
  };
  isLoading: boolean;
  row: ComponentType<TableRowProps<T>>;
  mobileRow?: ComponentType<TableRowProps<T>>;
  handleClickOpen?: (id: string) => () => void;
  isSearch?: boolean;
  filters?: TableFilter[];
  index?: number;
}

export interface TableColumn<T = any> {
  id: string;
  label: string;
  alignRight?: boolean;
  sortable?: boolean;
  width?: string | number;
  render?: (value: any, row: T) => ReactNode;
}

export interface TableRowProps<T = any> {
  row: T;
  index: number;
  isLoading: boolean;
  handleClickOpen?: (id: string) => () => void;
}

export interface TableFilter {
  name: string;
  param: string;
  data: Array<{
    name: string;
    slug: string;
    title?: string;
  }>;
}

// Card component props
export interface CardProps extends BaseComponentProps {
  title?: string;
  subtitle?: string;
  content?: ReactNode;
  actions?: ReactNode;
  image?: FileUpload;
  elevation?: number;
  variant?: 'elevation' | 'outlined';
  onClick?: () => void;
  hoverable?: boolean;
}

// Product card props
export interface ProductCardProps extends BaseComponentProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
  onRemoveFromWishlist?: (product: Product) => void;
  isInWishlist?: boolean;
  showActions?: boolean;
  variant?: 'grid' | 'list' | 'featured';
}

// Brand card props
export interface BrandCardProps extends BaseComponentProps {
  brand: Brand;
  onClick?: (brand: Brand) => void;
  variant?: 'grid' | 'list';
}

// Category card props
export interface CategoryCardProps extends BaseComponentProps {
  category: Category;
  onClick?: (category: Category) => void;
  variant?: 'grid' | 'list';
  showImage?: boolean;
}

// Order card props
export interface OrderCardProps extends BaseComponentProps {
  order: Order;
  onViewDetails?: (order: Order) => void;
  onCancel?: (order: Order) => void;
  variant?: 'grid' | 'list';
}

// Dashboard card props
export interface DashboardCardProps extends BaseComponentProps {
  color?: string;
  title: string;
  value: string | number;
  icon?: ReactNode;
  isAmount?: boolean;
  isLoading?: boolean;
  trend?: {
    value: number;
    isPositive: boolean;
    period: string;
  };
  onClick?: () => void;
}

// Dialog component props
export interface DialogProps extends BaseComponentProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  content?: ReactNode;
  actions?: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  fullWidth?: boolean;
  fullScreen?: boolean;
  scroll?: 'body' | 'paper';
}

// Delete dialog props
export interface DeleteDialogProps extends BaseComponentProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  loading?: boolean;
  confirmText?: string;
  cancelText?: string;
}

// Form dialog props
export interface FormDialogProps<T = any> extends BaseComponentProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: T) => void;
  title: string;
  data?: T | null;
  mode: 'create' | 'edit' | 'view';
  loading?: boolean;
  validationSchema?: any;
}

// List component props
export interface ListProps<T = any> extends BaseComponentProps {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  emptyMessage?: string;
  loading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
  variant?: 'vertical' | 'horizontal';
}

// Cart items list props
export interface CartItemsListProps extends BaseComponentProps {
  items: any[];
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onRemoveItem?: (id: string) => void;
  loading?: boolean;
  editable?: boolean;
}

// Wishlist items list props
export interface WishlistItemsListProps extends BaseComponentProps {
  items: Product[];
  onRemoveItem?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  loading?: boolean;
  variant?: 'grid' | 'list';
}

// User list props
export interface UserListProps extends BaseComponentProps {
  users: User[];
  onSelectUser?: (user: User) => void;
  onEditUser?: (user: User) => void;
  onDeleteUser?: (user: User) => void;
  loading?: boolean;
  showActions?: boolean;
}

// Reviews list props
export interface ReviewsListProps extends BaseComponentProps {
  reviews: any[];
  loading?: boolean;
  showActions?: boolean;
  onEdit?: (review: any) => void;
  onDelete?: (review: any) => void;
}

// Chart component props
export interface ChartProps extends BaseComponentProps {
  data: any[];
  type: 'line' | 'bar' | 'pie' | 'area' | 'scatter';
  xAxisKey?: string;
  yAxisKey?: string;
  colors?: string[];
  height?: number;
  width?: number;
  showLegend?: boolean;
  showTooltip?: boolean;
  loading?: boolean;
}

// Sale chart props
export interface SaleChartProps extends BaseComponentProps {
  data: any[];
  isLoading?: boolean;
  period?: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

// Order chart props
export interface OrderChartProps extends BaseComponentProps {
  data: any[];
  isLoading?: boolean;
  period?: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

// Income chart props
export interface IncomeChartProps extends BaseComponentProps {
  income: any[];
  commission: any[];
  isVendor?: boolean;
  isLoading?: boolean;
  period?: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

// Best selling component props
export interface BestSellingProps extends BaseComponentProps {
  data: any[];
  loading?: boolean;
  isVendor?: boolean;
  limit?: number;
}

// Low stock products props
export interface LowStockProductsProps extends BaseComponentProps {
  isVendor?: boolean;
  limit?: number;
  threshold?: number;
}

// Upload component props
export interface UploadSingleFileProps extends BaseComponentProps {
  file?: FileUpload;
  onDrop: (acceptedFiles: File[]) => void;
  error?: boolean;
  helperText?: string;
  category?: boolean;
  accept?: string;
  loading?: boolean;
  maxSize?: number;
  disabled?: boolean;
}

export interface UploadMultiFilesProps extends BaseComponentProps {
  files: FileUpload[];
  onDrop: (acceptedFiles: File[]) => void;
  onRemove: (file: FileUpload) => void;
  error?: boolean;
  helperText?: string;
  accept?: string;
  maxFiles?: number;
  maxSize?: number;
  disabled?: boolean;
}

export interface UploadAvatarProps extends BaseComponentProps {
  file?: FileUpload;
  onDrop: (acceptedFiles: File[]) => void;
  error?: boolean;
  helperText?: string;
  loading?: boolean;
  disabled?: boolean;
}

// Widget component props
export interface WidgetProps extends BaseComponentProps {
  title: string;
  icon?: ReactNode;
  value?: string | number;
  trend?: {
    value: number;
    isPositive: boolean;
    period: string;
  };
  actions?: ReactNode;
  loading?: boolean;
  onClick?: () => void;
}

// Cart widget props
export interface CartWidgetProps extends BaseComponentProps {
  items: any[];
  onViewCart?: () => void;
  onCheckout?: () => void;
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onRemoveItem?: (id: string) => void;
}

// Wishlist widget props
export interface WishlistWidgetProps extends BaseComponentProps {
  items: Product[];
  onViewWishlist?: () => void;
  onRemoveItem?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

// Compare widget props
export interface CompareWidgetProps extends BaseComponentProps {
  items: Product[];
  onViewCompare?: () => void;
  onRemoveItem?: (product: Product) => void;
  maxItems?: number;
}

// Search widget props
export interface SearchWidgetProps extends BaseComponentProps {
  onSearch?: (query: string) => void;
  suggestions?: string[];
  recentSearches?: string[];
  onClearRecent?: () => void;
}

// Notification popover props
export interface NotificationPopoverProps extends BaseComponentProps {
  notifications: any[];
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
  onViewAll?: () => void;
  unreadCount?: number;
}

// Settings component props
export interface SettingsProps extends BaseComponentProps {
  settings: any;
  onSave: (settings: any) => void;
  loading?: boolean;
  sections?: string[];
}

// Currency select props
export interface CurrencySelectProps extends BaseComponentProps {
  value: string;
  onChange: (currency: string) => void;
  currencies: Currency[];
  disabled?: boolean;
}

// Theme mode props
export interface ThemeModeProps extends BaseComponentProps {
  mode: 'light' | 'dark' | 'system';
  onChange: (mode: 'light' | 'dark' | 'system') => void;
}

// Direction props
export interface DirectionProps extends BaseComponentProps {
  direction: 'ltr' | 'rtl';
  onChange: (direction: 'ltr' | 'rtl') => void;
}

// Select component props
export interface SelectProps extends BaseComponentProps {
  options: Array<{
    value: string | number;
    label: string;
    disabled?: boolean;
  }>;
  value: string | number | string[] | number[];
  onChange: (value: any) => void;
  placeholder?: string;
  multiple?: boolean;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  label?: string;
  required?: boolean;
}

// User select props
export interface UserSelectProps extends BaseComponentProps {
  users: User[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  label?: string;
  required?: boolean;
  showAvatar?: boolean;
}

// Popover component props
export interface PopoverProps extends BaseComponentProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  content?: ReactNode;
  placement?: 'bottom' | 'top' | 'left' | 'right';
  transformOrigin?: {
    horizontal: 'left' | 'center' | 'right';
    vertical: 'top' | 'center' | 'bottom';
  };
}

// Tip tap editor props
export interface TipTapEditorProps extends BaseComponentProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  editable?: boolean;
  error?: boolean;
  helperText?: string;
  minHeight?: number;
  maxHeight?: number;
  toolbar?: boolean;
  extensions?: any[];
}
