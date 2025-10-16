// App-wide constants

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100]
} as const;

// File Upload
export const FILE_UPLOAD = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_FILES: 10,
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'image/jpeg', 'image/png'],
  ALLOWED_VIDEO_TYPES: ['video/mp4', 'video/avi', 'video/mov'],
  ALLOWED_AUDIO_TYPES: ['audio/mp3', 'audio/wav', 'audio/ogg']
} as const;

// Image Configuration
export const IMAGE_CONFIG = {
  AVATAR: {
    MAX_SIZE: 2 * 1024 * 1024, // 2MB
    MAX_DIMENSIONS: { width: 512, height: 512 },
    ALLOWED_TYPES: ['image/jpeg', 'image/png']
  },
  LOGO: {
    MAX_SIZE: 1 * 1024 * 1024, // 1MB
    MAX_DIMENSIONS: { width: 512, height: 512 },
    ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/svg+xml']
  },
  PRODUCT: {
    MAX_SIZE: 5 * 1024 * 1024, // 5MB
    MAX_DIMENSIONS: { width: 2048, height: 2048 },
    ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  },
  BANNER: {
    MAX_SIZE: 3 * 1024 * 1024, // 3MB
    MAX_DIMENSIONS: { width: 1920, height: 1080 },
    ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp']
  }
} as const;

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  VENDOR: 'vendor',
  CUSTOMER: 'customer'
} as const;

// Product Types
export const PRODUCT_TYPES = {
  SIMPLE: 'simple',
  VARIABLE: 'variable',
  GROUPED: 'grouped'
} as const;

// Product Status
export const PRODUCT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  DRAFT: 'draft'
} as const;

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded',
  RETURNED: 'returned'
} as const;

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  FAILED: 'failed',
  REFUNDED: 'refunded'
} as const;

// Payment Methods
export const PAYMENT_METHODS = {
  CREDIT_CARD: 'credit_card',
  PAYPAL: 'paypal',
  BANK_TRANSFER: 'bank_transfer',
  CASH_ON_DELIVERY: 'cash_on_delivery'
} as const;

// Shop Status
export const SHOP_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  IN_REVIEW: 'in_review',
  ACTION_REQUIRED: 'action_required',
  CANCELLED: 'cancelled',
  CLOSED: 'closed'
} as const;

// Coupon Types
export const COUPON_TYPES = {
  PERCENTAGE: 'percentage',
  FIXED_AMOUNT: 'fixed_amount'
} as const;

// Attribute Types
export const ATTRIBUTE_TYPES = {
  COLOR: 'color',
  SIZE: 'size',
  MATERIAL: 'material',
  BRAND: 'brand',
  CUSTOM: 'custom'
} as const;

// Currency
export const CURRENCY = {
  USD: 'USD',
  EUR: 'EUR',
  GBP: 'GBP',
  JPY: 'JPY',
  CAD: 'CAD',
  AUD: 'AUD'
} as const;

// Locales
export const LOCALES = {
  EN: 'en',
  AR: 'ar',
  FR: 'fr',
  DE: 'de',
  ES: 'es',
  IT: 'it',
  PT: 'pt',
  RU: 'ru',
  ZH: 'zh',
  JA: 'ja',
  KO: 'ko'
} as const;

// Date Formats
export const DATE_FORMATS = {
  SHORT: 'MM/DD/YYYY',
  MEDIUM: 'MMM DD, YYYY',
  LONG: 'MMMM DD, YYYY',
  FULL: 'EEEE, MMMM DD, YYYY',
  ISO: 'YYYY-MM-DD',
  DATETIME: 'MM/DD/YYYY HH:mm',
  TIME: 'HH:mm'
} as const;

// Time Formats
export const TIME_FORMATS = {
  TWELVE_HOUR: '12h',
  TWENTY_FOUR_HOUR: '24h'
} as const;

// Theme
export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
} as const;

// Directions
export const DIRECTIONS = {
  LTR: 'ltr',
  RTL: 'rtl'
} as const;

// Chart Colors
export const CHART_COLORS = {
  PRIMARY: '#1976d2',
  SECONDARY: '#dc004e',
  SUCCESS: '#2e7d32',
  WARNING: '#ed6c02',
  ERROR: '#d32f2f',
  INFO: '#0288d1',
  PALETTE: [
    '#1976d2',
    '#dc004e',
    '#2e7d32',
    '#ed6c02',
    '#d32f2f',
    '#0288d1',
    '#7b1fa2',
    '#388e3c',
    '#f57c00',
    '#c2185b'
  ]
} as const;

// Status Colors
export const STATUS_COLORS = {
  SUCCESS: '#2e7d32',
  WARNING: '#ed6c02',
  ERROR: '#d32f2f',
  INFO: '#0288d1',
  PENDING: '#757575',
  ACTIVE: '#2e7d32',
  INACTIVE: '#757575',
  DRAFT: '#ed6c02'
} as const;

// Breakpoints
export const BREAKPOINTS = {
  XS: 0,
  SM: 600,
  MD: 900,
  LG: 1200,
  XL: 1536
} as const;

// Animation Durations
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500
} as const;

// Z-Index Layers
export const Z_INDEX = {
  MODAL: 1300,
  DRAWER: 1200,
  APP_BAR: 1100,
  POPOVER: 1000,
  TOOLTIP: 900,
  SNACKBAR: 800,
  FAB: 700,
  SPEED_DIAL: 600
} as const;

// Form Validation
export const VALIDATION = {
  PASSWORD: {
    MIN_LENGTH: 8,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBER: true,
    REQUIRE_SPECIAL: false
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  PHONE: {
    PATTERN: /^\+?[\d\s-()]+$/
  },
  SLUG: {
    PATTERN: /^[a-z0-9-]+$/
  },
  SKU: {
    PATTERN: /^[A-Za-z0-9-_]{3,50}$/
  }
} as const;

// Search Configuration
export const SEARCH_CONFIG = {
  MIN_QUERY_LENGTH: 2,
  MAX_QUERY_LENGTH: 100,
  DEBOUNCE_DELAY: 300,
  MAX_RESULTS: 50,
  MAX_SUGGESTIONS: 10
} as const;

// Cache Configuration
export const CACHE_CONFIG = {
  DEFAULT_TTL: 5 * 60 * 1000, // 5 minutes
  LONG_TTL: 30 * 60 * 1000, // 30 minutes
  SHORT_TTL: 1 * 60 * 1000, // 1 minute
  MAX_SIZE: 100
} as const;

// Notification Configuration
export const NOTIFICATION_CONFIG = {
  DURATION: 5000,
  MAX_NOTIFICATIONS: 5,
  POSITIONS: {
    TOP_RIGHT: 'top-right',
    TOP_LEFT: 'top-left',
    TOP_CENTER: 'top-center',
    BOTTOM_RIGHT: 'bottom-right',
    BOTTOM_LEFT: 'bottom-left',
    BOTTOM_CENTER: 'bottom-center'
  }
} as const;

// Table Configuration
export const TABLE_CONFIG = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
  MAX_PAGE_SIZE: 1000,
  DEFAULT_SORT_ORDER: 'asc',
  SORT_ORDERS: ['asc', 'desc'] as const
} as const;

// Form Configuration
export const FORM_CONFIG = {
  AUTO_SAVE_DELAY: 2000,
  VALIDATION_DEBOUNCE: 300,
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_FILES: 10
} as const;

// Export Configuration
export const EXPORT_CONFIG = {
  MAX_ROWS: 10000,
  FORMATS: ['csv', 'excel', 'pdf', 'json'] as const,
  DEFAULT_FORMAT: 'csv'
} as const;

// Import Configuration
export const IMPORT_CONFIG = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  SUPPORTED_FORMATS: ['csv', 'excel', 'json'] as const,
  MAX_ROWS: 5000
} as const;

// Social Media Platforms
export const SOCIAL_PLATFORMS = {
  FACEBOOK: 'facebook',
  TWITTER: 'twitter',
  INSTAGRAM: 'instagram',
  LINKEDIN: 'linkedin',
  YOUTUBE: 'youtube',
  PINTEREST: 'pinterest',
  TIKTOK: 'tiktok'
} as const;

// Business Hours
export const BUSINESS_HOURS = {
  DAYS: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const,
  TIME_FORMAT: 'HH:mm',
  DEFAULT_OPEN: '09:00',
  DEFAULT_CLOSE: '17:00'
} as const;

// Shipping Methods
export const SHIPPING_METHODS = {
  STANDARD: 'standard',
  EXPRESS: 'express',
  OVERNIGHT: 'overnight',
  PICKUP: 'pickup'
} as const;

// Tax Configuration
export const TAX_CONFIG = {
  DEFAULT_RATE: 0.08, // 8%
  MAX_RATE: 0.25, // 25%
  MIN_RATE: 0.00 // 0%
} as const;

// Commission Configuration
export const COMMISSION_CONFIG = {
  DEFAULT_RATE: 0.05, // 5%
  MAX_RATE: 0.15, // 15%
  MIN_RATE: 0.01 // 1%
} as const;

// Inventory Configuration
export const INVENTORY_CONFIG = {
  LOW_STOCK_THRESHOLD: 10,
  OUT_OF_STOCK_THRESHOLD: 0,
  MAX_STOCK: 99999
} as const;

// Review Configuration
export const REVIEW_CONFIG = {
  MIN_RATING: 1,
  MAX_RATING: 5,
  DEFAULT_RATING: 5,
  REQUIRE_VERIFICATION: false
} as const;

// Newsletter Configuration
export const NEWSLETTER_CONFIG = {
  DOUBLE_OPT_IN: true,
  WELCOME_EMAIL: true,
  UNSUBSCRIBE_REQUIRED: true
} as const;

// Security Configuration
export const SECURITY_CONFIG = {
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutes
  PASSWORD_RESET_EXPIRY: 60 * 60 * 1000, // 1 hour
  SESSION_TIMEOUT: 24 * 60 * 60 * 1000, // 24 hours
  REFRESH_TOKEN_EXPIRY: 7 * 24 * 60 * 60 * 1000 // 7 days
} as const;

// Feature Flags
export const FEATURES = {
  MULTI_LANGUAGE: true,
  DARK_MODE: true,
  PWA: false,
  ANALYTICS: true,
  NOTIFICATIONS: true,
  CHAT_SUPPORT: false,
  LIVE_CHAT: false,
  VIDEO_CALLS: false,
  AI_ASSISTANT: false
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  AUTHENTICATION_ERROR: 'Please sign in to continue.',
  AUTHORIZATION_ERROR: 'You do not have permission to perform this action.',
  NOT_FOUND_ERROR: 'The requested resource was not found.',
  RATE_LIMIT_ERROR: 'Too many requests. Please try again later.',
  FILE_TOO_LARGE: 'File is too large. Please choose a smaller file.',
  INVALID_FILE_TYPE: 'Invalid file type. Please choose a supported file type.',
  UPLOAD_FAILED: 'File upload failed. Please try again.',
  GENERIC_ERROR: 'Something went wrong. Please try again.'
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  SAVED: 'Changes saved successfully.',
  CREATED: 'Created successfully.',
  UPDATED: 'Updated successfully.',
  DELETED: 'Deleted successfully.',
  UPLOADED: 'File uploaded successfully.',
  SENT: 'Message sent successfully.',
  SUBMITTED: 'Form submitted successfully.',
  LOGGED_IN: 'Logged in successfully.',
  LOGGED_OUT: 'Logged out successfully.',
  REGISTERED: 'Account created successfully.',
  PASSWORD_RESET: 'Password reset email sent.',
  EMAIL_VERIFIED: 'Email verified successfully.'
} as const;

// Loading Messages
export const LOADING_MESSAGES = {
  LOADING: 'Loading...',
  SAVING: 'Saving...',
  UPLOADING: 'Uploading...',
  PROCESSING: 'Processing...',
  SENDING: 'Sending...',
  SUBMITTING: 'Submitting...',
  DELETING: 'Deleting...',
  UPDATING: 'Updating...',
  CREATING: 'Creating...'
} as const;

// Placeholder Text
export const PLACEHOLDERS = {
  SEARCH: 'Search...',
  EMAIL: 'Enter your email',
  PASSWORD: 'Enter your password',
  NAME: 'Enter your name',
  PHONE: 'Enter your phone number',
  MESSAGE: 'Enter your message',
  COMMENT: 'Write a comment...',
  REVIEW: 'Write a review...',
  DESCRIPTION: 'Enter description...',
  TITLE: 'Enter title...',
  ADDRESS: 'Enter address...',
  CITY: 'Enter city...',
  STATE: 'Enter state...',
  ZIP_CODE: 'Enter ZIP code...',
  COUNTRY: 'Select country...',
  COMPANY: 'Enter company name...',
  WEBSITE: 'Enter website URL...',
  SKU: 'Enter SKU...',
  PRICE: 'Enter price...',
  QUANTITY: 'Enter quantity...',
  COUPON_CODE: 'Enter coupon code...',
  DISCOUNT: 'Enter discount...'
} as const;

// Default Values
export const DEFAULTS = {
  PAGE_SIZE: 10,
  CURRENCY: 'USD',
  LOCALE: 'en',
  TIMEZONE: 'UTC',
  DATE_FORMAT: DATE_FORMATS.MEDIUM,
  TIME_FORMAT: TIME_FORMATS.TWELVE_HOUR,
  THEME: THEME.LIGHT,
  DIRECTION: DIRECTIONS.LTR,
  LANGUAGE: LOCALES.EN,
  COUNTRY: 'US',
  TAX_RATE: TAX_CONFIG.DEFAULT_RATE,
  COMMISSION_RATE: COMMISSION_CONFIG.DEFAULT_RATE,
  SHIPPING_FEE: 0,
  LOW_STOCK_THRESHOLD: INVENTORY_CONFIG.LOW_STOCK_THRESHOLD
} as const;
