// Date, currency, text formatting utilities

// Date formatting
export const formatDate = (
  date: string | Date,
  format: 'short' | 'medium' | 'long' | 'full' = 'medium',
  locale: string = 'en-US'
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }

  const options: Intl.DateTimeFormatOptions = {
    short: { month: 'short', day: 'numeric', year: 'numeric' },
    medium: { month: 'short', day: 'numeric', year: 'numeric' },
    long: { month: 'long', day: 'numeric', year: 'numeric' },
    full: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  }[format];

  return new Intl.DateTimeFormat(locale, options).format(dateObj);
};

// Time formatting
export const formatTime = (
  date: string | Date,
  format: '12h' | '24h' = '12h',
  locale: string = 'en-US'
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return 'Invalid Time';
  }

  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: format === '12h'
  };

  return new Intl.DateTimeFormat(locale, options).format(dateObj);
};

// Date and time formatting
export const formatDateTime = (
  date: string | Date,
  dateFormat: 'short' | 'medium' | 'long' = 'medium',
  timeFormat: '12h' | '24h' = '12h',
  locale: string = 'en-US'
): string => {
  const dateStr = formatDate(date, dateFormat, locale);
  const timeStr = formatTime(date, timeFormat, locale);
  return `${dateStr} at ${timeStr}`;
};

// Relative time formatting (e.g., "2 hours ago")
export const formatRelativeTime = (
  date: string | Date,
  locale: string = 'en-US'
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Just now';
  }

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  const intervals = [
    { unit: 'year', seconds: 31536000 },
    { unit: 'month', seconds: 2592000 },
    { unit: 'week', seconds: 604800 },
    { unit: 'day', seconds: 86400 },
    { unit: 'hour', seconds: 3600 },
    { unit: 'minute', seconds: 60 }
  ] as const;

  for (const { unit, seconds } of intervals) {
    const interval = Math.floor(diffInSeconds / seconds);
    if (interval >= 1) {
      return rtf.format(-interval, unit);
    }
  }

  return 'Just now';
};

// Currency formatting
export const formatCurrency = (
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US',
  options?: Intl.NumberFormatOptions
): string => {
  const defaultOptions: Intl.NumberFormatOptions = {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options
  };

  return new Intl.NumberFormat(locale, defaultOptions).format(amount);
};

// Number formatting
export const formatNumber = (
  number: number,
  locale: string = 'en-US',
  options?: Intl.NumberFormatOptions
): string => {
  const defaultOptions: Intl.NumberFormatOptions = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    ...options
  };

  return new Intl.NumberFormat(locale, defaultOptions).format(number);
};

// Percentage formatting
export const formatPercentage = (
  value: number,
  locale: string = 'en-US',
  decimals: number = 1
): string => {
  const options: Intl.NumberFormatOptions = {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  };

  return new Intl.NumberFormat(locale, options).format(value / 100);
};

// File size formatting
export const formatFileSize = (
  bytes: number,
  locale: string = 'en-US'
): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(bytes / Math.pow(k, i))} ${sizes[i]}`;
};

// Phone number formatting
export const formatPhoneNumber = (
  phone: string,
  locale: string = 'en-US'
): string => {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');
  
  // Basic US phone number formatting
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  
  // International format with country code
  if (digits.length === 11 && digits[0] === '1') {
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  
  return phone; // Return original if can't format
};

// Text formatting
export const formatText = {
  // Capitalize first letter
  capitalize: (text: string): string => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  },

  // Title case
  titleCase: (text: string): string => {
    return text.replace(/\w\S*/g, (txt) => 
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  },

  // Snake case to title case
  snakeToTitle: (text: string): string => {
    return text
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  },

  // Camel case to title case
  camelToTitle: (text: string): string => {
    return text
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  },

  // Kebab case to title case
  kebabToTitle: (text: string): string => {
    return text
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  },

  // Truncate text
  truncate: (text: string, maxLength: number, suffix: string = '...'): string => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength - suffix.length) + suffix;
  },

  // Remove HTML tags
  stripHtml: (html: string): string => {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || '';
  },

  // Extract initials
  getInitials: (name: string, maxInitials: number = 2): string => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .slice(0, maxInitials)
      .join('');
  },

  // Format name
  formatName: (firstName: string, lastName: string): string => {
    return `${formatText.capitalize(firstName)} ${formatText.capitalize(lastName)}`;
  },

  // Format full name
  formatFullName: (firstName: string, lastName: string, middleName?: string): string => {
    const first = formatText.capitalize(firstName);
    const last = formatText.capitalize(lastName);
    const middle = middleName ? ` ${formatText.capitalize(middleName)}` : '';
    return `${first}${middle} ${last}`;
  }
};

// Address formatting
export const formatAddress = (address: {
  street: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}): string => {
  const { street, apartment, city, state, zipCode, country } = address;
  
  let formattedAddress = street;
  if (apartment) {
    formattedAddress += `, ${apartment}`;
  }
  formattedAddress += `, ${city}, ${state} ${zipCode}, ${country}`;
  
  return formattedAddress;
};

// Order status formatting
export const formatOrderStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    pending: 'Pending',
    confirmed: 'Confirmed',
    processing: 'Processing',
    shipped: 'Shipped',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
    refunded: 'Refunded',
    returned: 'Returned'
  };

  return statusMap[status] || formatText.capitalize(status);
};

// Payment status formatting
export const formatPaymentStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    pending: 'Pending',
    paid: 'Paid',
    failed: 'Failed',
    refunded: 'Refunded'
  };

  return statusMap[status] || formatText.capitalize(status);
};

// User role formatting
export const formatUserRole = (role: string): string => {
  const roleMap: Record<string, string> = {
    admin: 'Administrator',
    vendor: 'Vendor',
    customer: 'Customer'
  };

  return roleMap[role] || formatText.capitalize(role);
};

// Product status formatting
export const formatProductStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    active: 'Active',
    inactive: 'Inactive',
    pending: 'Pending Review',
    draft: 'Draft'
  };

  return statusMap[status] || formatText.capitalize(status);
};

// Shop status formatting
export const formatShopStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    pending: 'Pending Approval',
    approved: 'Approved',
    in_review: 'In Review',
    action_required: 'Action Required',
    cancelled: 'Cancelled',
    closed: 'Closed'
  };

  return statusMap[status] || formatText.capitalize(status);
};

// Duration formatting
export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`;
  } else {
    return `${remainingSeconds}s`;
  }
};

// Rating formatting
export const formatRating = (rating: number, maxRating: number = 5): string => {
  return `${rating.toFixed(1)}/${maxRating}`;
};

// Slug generation
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

// URL formatting
export const formatUrl = (url: string): string => {
  // Add protocol if missing
  if (!url.match(/^https?:\/\//)) {
    return `https://${url}`;
  }
  return url;
};

// Social media handle formatting
export const formatSocialHandle = (handle: string, platform: string): string => {
  // Remove @ symbol if present
  const cleanHandle = handle.replace(/^@/, '');
  
  const prefixes: Record<string, string> = {
    twitter: '@',
    instagram: '@',
    facebook: '@',
    linkedin: '',
    youtube: '@'
  };

  const prefix = prefixes[platform.toLowerCase()] || '';
  return `${prefix}${cleanHandle}`;
};

// Price range formatting
export const formatPriceRange = (
  minPrice: number,
  maxPrice: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string => {
  const formattedMin = formatCurrency(minPrice, currency, locale);
  const formattedMax = formatCurrency(maxPrice, currency, locale);
  return `${formattedMin} - ${formattedMax}`;
};

// Discount formatting
export const formatDiscount = (
  originalPrice: number,
  salePrice: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string => {
  const discount = originalPrice - salePrice;
  const discountPercentage = Math.round((discount / originalPrice) * 100);
  const formattedDiscount = formatCurrency(discount, currency, locale);
  
  return `${formattedDiscount} (${discountPercentage}% off)`;
};

// Inventory status formatting
export const formatInventoryStatus = (stock: number, lowStockThreshold?: number): string => {
  if (stock === 0) return 'Out of Stock';
  if (lowStockThreshold && stock <= lowStockThreshold) return 'Low Stock';
  return 'In Stock';
};

// Weight formatting
export const formatWeight = (weight: number, unit: 'kg' | 'lb' = 'kg'): string => {
  return `${weight} ${unit}`;
};

// Dimension formatting
export const formatDimensions = (
  length: number,
  width: number,
  height: number,
  unit: 'cm' | 'in' = 'cm'
): string => {
  return `${length} × ${width} × ${height} ${unit}`;
};
