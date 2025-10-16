// Settings validation schemas

import * as yup from 'yup';

// Main settings validation schema
export const mainSettingsSchema = yup.object({
  businessName: yup
    .string()
    .min(2, 'Business name must be at least 2 characters')
    .max(100, 'Business name must not exceed 100 characters')
    .required('Business name is required'),
  domainName: yup
    .string()
    .min(3, 'Domain name must be at least 3 characters')
    .max(100, 'Domain name must not exceed 100 characters')
    .matches(/^[a-zA-Z0-9.-]+$/, 'Domain name can only contain letters, numbers, dots, and hyphens')
    .required('Domain name is required'),
  websiteStatus: yup
    .boolean()
    .default(true),
  offlineMessage: yup
    .string()
    .max(500, 'Offline message must not exceed 500 characters')
    .optional(),
  seo: yup.object({
    metaTitle: yup
      .string()
      .max(60, 'Meta title must not exceed 60 characters')
      .required('Meta title is required'),
    description: yup
      .string()
      .min(10, 'Description must be at least 10 characters')
      .max(500, 'Description must not exceed 500 characters')
      .required('Description is required'),
    metaDescription: yup
      .string()
      .max(160, 'Meta description must not exceed 160 characters')
      .required('Meta description is required'),
    tags: yup
      .array()
      .of(yup.string())
      .max(20, 'Maximum 20 tags allowed')
      .default([])
  }),
  gaId: yup
    .string()
    .matches(/^UA-\d{4,10}-\d{1,4}$|^G-[A-Z0-9]+$/, 'Please provide a valid Google Analytics ID')
    .optional(),
  gtmId: yup
    .string()
    .matches(/^GTM-[A-Z0-9]+$/, 'Please provide a valid Google Tag Manager ID')
    .optional(),
  shippingFee: yup
    .number()
    .min(0, 'Shipping fee must be non-negative')
    .required('Shipping fee is required'),
  commission: yup
    .number()
    .min(0, 'Commission must be non-negative')
    .max(100, 'Commission must not exceed 100%')
    .required('Commission is required')
});

// Home settings validation schema
export const homeSettingsSchema = yup.object({
  slides: yup
    .array()
    .of(yup.object({
      link: yup
        .string()
        .url('Please provide a valid URL')
        .required('Slide link is required'),
      image: yup
        .object({
          _id: yup.string().required(),
          url: yup.string().url().required()
        })
        .required('Slide image is required')
    }))
    .min(1, 'At least one slide is required')
    .max(10, 'Maximum 10 slides allowed'),
  banner1: yup.object({
    link: yup
      .string()
      .url('Please provide a valid URL')
      .required('Banner link is required'),
    image: yup
      .object({
        _id: yup.string().required(),
        url: yup.string().url().required()
      })
      .optional()
  }),
  banner2: yup.object({
    link: yup
      .string()
      .url('Please provide a valid URL')
      .required('Banner link is required'),
    image: yup
      .object({
        _id: yup.string().required(),
        url: yup.string().url().required()
      })
      .optional()
  })
});

// Branding settings validation schema
export const brandingSettingsSchema = yup.object({
  logoLight: yup
    .object({
      _id: yup.string().required(),
      url: yup.string().url().required()
    })
    .required('Light logo is required'),
  logoDark: yup
    .object({
      _id: yup.string().required(),
      url: yup.string().url().required()
    })
    .required('Dark logo is required'),
  favicon: yup
    .object({
      _id: yup.string().required(),
      url: yup.string().url().required()
    })
    .optional(),
  primaryColor: yup
    .string()
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Please provide a valid hex color code')
    .required('Primary color is required'),
  secondaryColor: yup
    .string()
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Please provide a valid hex color code')
    .required('Secondary color is required'),
  fontFamily: yup
    .string()
    .optional()
});

// General settings validation schema
export const generalSettingsSchema = yup.object({
  siteName: yup
    .string()
    .min(2, 'Site name must be at least 2 characters')
    .max(100, 'Site name must not exceed 100 characters')
    .required('Site name is required'),
  siteDescription: yup
    .string()
    .min(10, 'Site description must be at least 10 characters')
    .max(500, 'Site description must not exceed 500 characters')
    .required('Site description is required'),
  siteUrl: yup
    .string()
    .url('Please provide a valid URL')
    .required('Site URL is required'),
  adminEmail: yup
    .string()
    .email('Please provide a valid email address')
    .required('Admin email is required'),
  timezone: yup
    .string()
    .required('Timezone is required'),
  dateFormat: yup
    .string()
    .oneOf(['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'], 'Invalid date format')
    .required('Date format is required'),
  timeFormat: yup
    .string()
    .oneOf(['12h', '24h'], 'Invalid time format')
    .required('Time format is required'),
  currency: yup
    .string()
    .required('Currency is required'),
  currencyPosition: yup
    .string()
    .oneOf(['left', 'right'], 'Currency position must be left or right')
    .required('Currency position is required'),
  thousandSeparator: yup
    .string()
    .max(1, 'Thousand separator must be a single character')
    .default(','),
  decimalSeparator: yup
    .string()
    .max(1, 'Decimal separator must be a single character')
    .default('.'),
  numberOfDecimals: yup
    .number()
    .min(0, 'Number of decimals must be non-negative')
    .max(4, 'Number of decimals must not exceed 4')
    .default(2)
});

// Change password validation schema
export const changePasswordSchema = yup.object({
  currentPassword: yup
    .string()
    .required('Current password is required'),
  newPassword: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
    .notOneOf([yup.ref('currentPassword')], 'New password must be different from current password')
    .required('New password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .required('Please confirm your new password')
});

// Email settings validation schema
export const emailSettingsSchema = yup.object({
  smtpHost: yup
    .string()
    .required('SMTP host is required'),
  smtpPort: yup
    .number()
    .min(1, 'SMTP port must be positive')
    .max(65535, 'SMTP port must not exceed 65535')
    .required('SMTP port is required'),
  smtpUsername: yup
    .string()
    .email('Please provide a valid email address')
    .required('SMTP username is required'),
  smtpPassword: yup
    .string()
    .required('SMTP password is required'),
  smtpEncryption: yup
    .string()
    .oneOf(['none', 'tls', 'ssl'], 'Invalid encryption type')
    .required('SMTP encryption is required'),
  fromEmail: yup
    .string()
    .email('Please provide a valid email address')
    .required('From email is required'),
  fromName: yup
    .string()
    .min(2, 'From name must be at least 2 characters')
    .max(100, 'From name must not exceed 100 characters')
    .required('From name is required')
});

// Payment settings validation schema
export const paymentSettingsSchema = yup.object({
  stripePublishableKey: yup
    .string()
    .matches(/^pk_test_|^pk_live_/, 'Please provide a valid Stripe publishable key')
    .optional(),
  stripeSecretKey: yup
    .string()
    .matches(/^sk_test_|^sk_live_/, 'Please provide a valid Stripe secret key')
    .optional(),
  stripeWebhookSecret: yup
    .string()
    .optional(),
  paypalClientId: yup
    .string()
    .optional(),
  paypalClientSecret: yup
    .string()
    .optional(),
  paypalMode: yup
    .string()
    .oneOf(['sandbox', 'live'], 'PayPal mode must be sandbox or live')
    .optional(),
  cashOnDelivery: yup
    .boolean()
    .default(false),
  bankTransfer: yup
    .boolean()
    .default(false),
  bankDetails: yup
    .string()
    .optional()
});

// Shipping settings validation schema
export const shippingSettingsSchema = yup.object({
  freeShippingThreshold: yup
    .number()
    .min(0, 'Free shipping threshold must be non-negative')
    .optional(),
  flatRateShipping: yup
    .number()
    .min(0, 'Flat rate shipping must be non-negative')
    .optional(),
  weightBasedShipping: yup
    .boolean()
    .default(false),
  shippingZones: yup
    .array()
    .of(yup.object({
      name: yup
        .string()
        .required('Zone name is required'),
      countries: yup
        .array()
        .of(yup.string())
        .min(1, 'At least one country is required'),
      cost: yup
        .number()
        .min(0, 'Shipping cost must be non-negative')
        .required('Shipping cost is required')
    }))
    .optional()
});

// Social media settings validation schema
export const socialMediaSettingsSchema = yup.object({
  facebookUrl: yup
    .string()
    .url('Please provide a valid Facebook URL')
    .optional(),
  twitterUrl: yup
    .string()
    .url('Please provide a valid Twitter URL')
    .optional(),
  instagramUrl: yup
    .string()
    .url('Please provide a valid Instagram URL')
    .optional(),
  linkedinUrl: yup
    .string()
    .url('Please provide a valid LinkedIn URL')
    .optional(),
  youtubeUrl: yup
    .string()
    .url('Please provide a valid YouTube URL')
    .optional(),
  pinterestUrl: yup
    .string()
    .url('Please provide a valid Pinterest URL')
    .optional(),
  tiktokUrl: yup
    .string()
    .url('Please provide a valid TikTok URL')
    .optional()
});

// Notification settings validation schema
export const notificationSettingsSchema = yup.object({
  emailNotifications: yup
    .boolean()
    .default(true),
  smsNotifications: yup
    .boolean()
    .default(false),
  pushNotifications: yup
    .boolean()
    .default(true),
  newOrderNotification: yup
    .boolean()
    .default(true),
  lowStockNotification: yup
    .boolean()
    .default(true),
  customerRegistrationNotification: yup
    .boolean()
    .default(false),
  newsletterSubscriptionNotification: yup
    .boolean()
    .default(false)
});
