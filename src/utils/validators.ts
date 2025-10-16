// Common validation functions

import * as yup from 'yup';

// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone validation
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s-()]+$/;
  return phoneRegex.test(phone);
};

// URL validation
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Slug validation
export const isValidSlug = (slug: string): boolean => {
  const slugRegex = /^[a-z0-9-]+$/;
  return slugRegex.test(slug);
};

// Password strength validation
export const isStrongPassword = (password: string): boolean => {
  // At least 8 characters, one uppercase, one lowercase, one number
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return strongPasswordRegex.test(password);
};

// Credit card validation (Luhn algorithm)
export const isValidCreditCard = (cardNumber: string): boolean => {
  const cleanNumber = cardNumber.replace(/\D/g, '');
  
  if (cleanNumber.length < 13 || cleanNumber.length > 19) {
    return false;
  }

  let sum = 0;
  let isEven = false;

  for (let i = cleanNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanNumber.charAt(i), 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

// Credit card type detection
export const getCreditCardType = (cardNumber: string): string => {
  const cleanNumber = cardNumber.replace(/\D/g, '');
  
  if (/^4/.test(cleanNumber)) return 'visa';
  if (/^5[1-5]/.test(cleanNumber)) return 'mastercard';
  if (/^3[47]/.test(cleanNumber)) return 'amex';
  if (/^6/.test(cleanNumber)) return 'discover';
  if (/^3[0689]/.test(cleanNumber)) return 'diners';
  
  return 'unknown';
};

// CVV validation
export const isValidCVV = (cvv: string, cardType: string): boolean => {
  const cleanCVV = cvv.replace(/\D/g, '');
  
  if (cardType === 'amex') {
    return cleanCVV.length === 4;
  }
  
  return cleanCVV.length === 3;
};

// Expiry date validation
export const isValidExpiryDate = (month: string, year: string): boolean => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  
  const expiryYear = parseInt(year, 10);
  const expiryMonth = parseInt(month, 10);
  
  if (expiryYear < currentYear) return false;
  if (expiryYear === currentYear && expiryMonth < currentMonth) return false;
  if (expiryMonth < 1 || expiryMonth > 12) return false;
  
  return true;
};

// File size validation
export const isValidFileSize = (file: File, maxSizeInMB: number): boolean => {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  return file.size <= maxSizeInBytes;
};

// File type validation
export const isValidFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.includes(file.type);
};

// Image dimensions validation
export const isValidImageDimensions = (
  file: File,
  maxWidth: number,
  maxHeight: number
): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    
    img.onload = () => {
      resolve(img.width <= maxWidth && img.height <= maxHeight);
    };
    
    img.onerror = () => {
      resolve(false);
    };
    
    img.src = URL.createObjectURL(file);
  });
};

// Color validation (hex)
export const isValidHexColor = (color: string): boolean => {
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return hexRegex.test(color);
};

// IP address validation
export const isValidIPAddress = (ip: string): boolean => {
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return ipv4Regex.test(ip);
};

// Postal code validation (generic)
export const isValidPostalCode = (postalCode: string, country?: string): boolean => {
  const patterns: Record<string, RegExp> = {
    US: /^\d{5}(-\d{4})?$/,
    CA: /^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/,
    UK: /^[A-Za-z]{1,2}\d[A-Za-z\d]? ?\d[A-Za-z]{2}$/,
    DE: /^\d{5}$/,
    FR: /^\d{5}$/,
    AU: /^\d{4}$/,
    JP: /^\d{3}-\d{4}$/,
  };

  if (country && patterns[country]) {
    return patterns[country].test(postalCode);
  }

  // Generic validation for any alphanumeric postal code
  return /^[A-Za-z0-9\s-]{3,10}$/.test(postalCode);
};

// ISBN validation
export const isValidISBN = (isbn: string): boolean => {
  const cleanISBN = isbn.replace(/[-\s]/g, '');
  
  if (cleanISBN.length === 10) {
    return isValidISBN10(cleanISBN);
  } else if (cleanISBN.length === 13) {
    return isValidISBN13(cleanISBN);
  }
  
  return false;
};

const isValidISBN10 = (isbn: string): boolean => {
  let sum = 0;
  
  for (let i = 0; i < 9; i++) {
    sum += parseInt(isbn[i], 10) * (10 - i);
  }
  
  const checkDigit = isbn[9];
  if (checkDigit === 'X') {
    sum += 10;
  } else {
    sum += parseInt(checkDigit, 10);
  }
  
  return sum % 11 === 0;
};

const isValidISBN13 = (isbn: string): boolean => {
  let sum = 0;
  
  for (let i = 0; i < 12; i++) {
    const digit = parseInt(isbn[i], 10);
    sum += (i % 2 === 0) ? digit : digit * 3;
  }
  
  const checkDigit = (10 - (sum % 10)) % 10;
  return checkDigit === parseInt(isbn[12], 10);
};

// UUID validation
export const isValidUUID = (uuid: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

// JSON validation
export const isValidJSON = (jsonString: string): boolean => {
  try {
    JSON.parse(jsonString);
    return true;
  } catch {
    return false;
  }
};

// Base64 validation
export const isValidBase64 = (base64String: string): boolean => {
  const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
  return base64Regex.test(base64String) && base64String.length % 4 === 0;
};

// Date validation
export const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
};

// Age validation
export const isValidAge = (birthDate: string, minAge: number, maxAge?: number): boolean => {
  const birth = new Date(birthDate);
  const today = new Date();
  const age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  if (age < minAge) return false;
  if (maxAge && age > maxAge) return false;
  
  return true;
};

// Business hours validation
export const isValidBusinessHours = (hours: Record<string, any>): boolean => {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  
  for (const day of days) {
    if (hours[day]) {
      const { isOpen, open, close } = hours[day];
      
      if (isOpen) {
        if (!open || !close) return false;
        if (!isValidTime(open) || !isValidTime(close)) return false;
      }
    }
  }
  
  return true;
};

// Time validation (HH:MM format)
export const isValidTime = (time: string): boolean => {
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
};

// Price validation
export const isValidPrice = (price: number, minPrice?: number, maxPrice?: number): boolean => {
  if (price < 0) return false;
  if (minPrice !== undefined && price < minPrice) return false;
  if (maxPrice !== undefined && price > maxPrice) return false;
  return true;
};

// Percentage validation
export const isValidPercentage = (percentage: number): boolean => {
  return percentage >= 0 && percentage <= 100;
};

// Stock validation
export const isValidStock = (stock: number): boolean => {
  return Number.isInteger(stock) && stock >= 0;
};

// SKU validation
export const isValidSKU = (sku: string): boolean => {
  // SKU should be alphanumeric, 3-50 characters
  const skuRegex = /^[A-Za-z0-9-_]{3,50}$/;
  return skuRegex.test(sku);
};

// Domain validation
export const isValidDomain = (domain: string): boolean => {
  const domainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return domainRegex.test(domain);
};

// Social media handle validation
export const isValidSocialHandle = (handle: string, platform?: string): boolean => {
  if (!handle) return false;
  
  const patterns: Record<string, RegExp> = {
    twitter: /^[a-zA-Z0-9_]{1,15}$/,
    instagram: /^[a-zA-Z0-9._]{1,30}$/,
    facebook: /^[a-zA-Z0-9.]{5,50}$/,
    linkedin: /^[a-zA-Z0-9-]{3,100}$/,
  };
  
  if (platform && patterns[platform]) {
    return patterns[platform].test(handle);
  }
  
  // Generic validation
  return /^[a-zA-Z0-9._-]{1,50}$/.test(handle);
};

// Currency code validation
export const isValidCurrencyCode = (code: string): boolean => {
  const currencyRegex = /^[A-Z]{3}$/;
  return currencyRegex.test(code);
};

// Language code validation
export const isValidLanguageCode = (code: string): boolean => {
  const languageRegex = /^[a-z]{2}(-[A-Z]{2})?$/;
  return languageRegex.test(code);
};

// Timezone validation
export const isValidTimezone = (timezone: string): boolean => {
  try {
    Intl.DateTimeFormat(undefined, { timeZone: timezone });
    return true;
  } catch {
    return false;
  }
};
