// Shop validation schemas

import * as yup from 'yup';

// Shop validation schema
export const shopSchema = yup.object({
  name: yup
    .string()
    .min(3, 'Shop name must be at least 3 characters')
    .max(100, 'Shop name must not exceed 100 characters')
    .required('Shop name is required'),
  email: yup
    .string()
    .email('Please provide a valid email address')
    .required('Email is required'),
  phone: yup
    .string()
    .matches(/^\+?[\d\s-()]+$/, 'Please provide a valid phone number')
    .required('Phone number is required'),
  address: yup
    .string()
    .min(5, 'Address must be at least 5 characters')
    .max(200, 'Address must not exceed 200 characters')
    .required('Address is required'),
  description: yup
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must not exceed 1000 characters')
    .optional(),
  status: yup
    .string()
    .oneOf(['active', 'inactive', 'pending', 'suspended'], 'Invalid status')
    .default('active')
});

// Shop settings validation schema
export const shopSettingsSchema = yup.object({
  name: yup
    .string()
    .min(3, 'Shop name must be at least 3 characters')
    .max(100, 'Shop name must not exceed 100 characters')
    .required('Shop name is required'),
  slug: yup
    .string()
    .min(3, 'Slug must be at least 3 characters')
    .max(100, 'Slug must not exceed 100 characters')
    .matches(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens')
    .required('Slug is required'),
  description: yup
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must not exceed 1000 characters')
    .optional(),
  logo: yup
    .object()
    .optional(),
  banner: yup
    .object()
    .optional(),
  address: yup.object({
    street: yup
      .string()
      .min(5, 'Street address must be at least 5 characters')
      .max(200, 'Street address must not exceed 200 characters')
      .required('Street address is required'),
    city: yup
      .string()
      .min(2, 'City must be at least 2 characters')
      .max(100, 'City must not exceed 100 characters')
      .required('City is required'),
    state: yup
      .string()
      .min(2, 'State must be at least 2 characters')
      .max(100, 'State must not exceed 100 characters')
      .required('State is required'),
    zipCode: yup
      .string()
      .min(3, 'ZIP code must be at least 3 characters')
      .max(20, 'ZIP code must not exceed 20 characters')
      .required('ZIP code is required'),
    country: yup
      .string()
      .min(2, 'Country must be at least 2 characters')
      .max(100, 'Country must not exceed 100 characters')
      .required('Country is required')
  }),
  contact: yup.object({
    email: yup
      .string()
      .email('Please provide a valid email address')
      .required('Contact email is required'),
    phone: yup
      .string()
      .matches(/^\+?[\d\s-()]+$/, 'Please provide a valid phone number')
      .required('Contact phone is required'),
    website: yup
      .string()
      .url('Please provide a valid website URL')
      .optional()
  }),
  settings: yup.object({
    commission: yup
      .number()
      .min(0, 'Commission must be non-negative')
      .max(100, 'Commission must not exceed 100%')
      .required('Commission is required'),
    paymentMethods: yup
      .array()
      .of(yup.string())
      .min(1, 'At least one payment method is required')
      .required('Payment methods are required'),
    shippingMethods: yup
      .array()
      .of(yup.string())
      .min(1, 'At least one shipping method is required')
      .required('Shipping methods are required'),
    returnPolicy: yup
      .string()
      .max(2000, 'Return policy must not exceed 2000 characters')
      .optional(),
    refundPolicy: yup
      .string()
      .max(2000, 'Refund policy must not exceed 2000 characters')
      .optional()
  }),
  verification: yup.object({
    documents: yup
      .array()
      .of(yup.object())
      .min(1, 'At least one verification document is required')
      .required('Verification documents are required')
  })
});

// Shop details validation schema
export const shopDetailsSchema = yup.object({
  name: yup
    .string()
    .min(3, 'Shop name must be at least 3 characters')
    .max(100, 'Shop name must not exceed 100 characters')
    .required('Shop name is required'),
  description: yup
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must not exceed 1000 characters')
    .optional(),
  logo: yup
    .object()
    .optional(),
  banner: yup
    .object()
    .optional()
});

// Identity verification validation schema
export const identityVerificationSchema = yup.object({
  documentType: yup
    .string()
    .oneOf(['passport', 'drivers_license', 'national_id', 'business_license'], 'Invalid document type')
    .required('Document type is required'),
  documentNumber: yup
    .string()
    .min(5, 'Document number must be at least 5 characters')
    .max(50, 'Document number must not exceed 50 characters')
    .required('Document number is required'),
  documentImage: yup
    .object({
      _id: yup.string().required(),
      url: yup.string().url().required()
    })
    .required('Document image is required'),
  businessLicense: yup
    .object({
      _id: yup.string().required(),
      url: yup.string().url().required()
    })
    .when('documentType', {
      is: 'business_license',
      then: (schema) => schema.required('Business license is required for business registration'),
      otherwise: (schema) => schema.optional()
    })
});

// Financial details validation schema
export const financialDetailsSchema = yup.object({
  bankName: yup
    .string()
    .min(2, 'Bank name must be at least 2 characters')
    .max(100, 'Bank name must not exceed 100 characters')
    .required('Bank name is required'),
  accountHolderName: yup
    .string()
    .min(2, 'Account holder name must be at least 2 characters')
    .max(100, 'Account holder name must not exceed 100 characters')
    .required('Account holder name is required'),
  accountNumber: yup
    .string()
    .min(5, 'Account number must be at least 5 characters')
    .max(50, 'Account number must not exceed 50 characters')
    .required('Account number is required'),
  routingNumber: yup
    .string()
    .min(5, 'Routing number must be at least 5 characters')
    .max(20, 'Routing number must not exceed 20 characters')
    .required('Routing number is required'),
  swiftCode: yup
    .string()
    .matches(/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/, 'Please provide a valid SWIFT code')
    .optional(),
  taxId: yup
    .string()
    .min(5, 'Tax ID must be at least 5 characters')
    .max(50, 'Tax ID must not exceed 50 characters')
    .optional(),
  businessType: yup
    .string()
    .oneOf(['individual', 'company', 'partnership'], 'Invalid business type')
    .required('Business type is required')
});

// Operational details validation schema
export const operationalDetailsSchema = yup.object({
  businessHours: yup.object({
    monday: yup.object({
      open: yup.string().required(),
      close: yup.string().required(),
      isOpen: yup.boolean().default(true)
    }),
    tuesday: yup.object({
      open: yup.string().required(),
      close: yup.string().required(),
      isOpen: yup.boolean().default(true)
    }),
    wednesday: yup.object({
      open: yup.string().required(),
      close: yup.string().required(),
      isOpen: yup.boolean().default(true)
    }),
    thursday: yup.object({
      open: yup.string().required(),
      close: yup.string().required(),
      isOpen: yup.boolean().default(true)
    }),
    friday: yup.object({
      open: yup.string().required(),
      close: yup.string().required(),
      isOpen: yup.boolean().default(true)
    }),
    saturday: yup.object({
      open: yup.string().required(),
      close: yup.string().required(),
      isOpen: yup.boolean().default(true)
    }),
    sunday: yup.object({
      open: yup.string().required(),
      close: yup.string().required(),
      isOpen: yup.boolean().default(true)
    })
  }),
  shippingPolicy: yup
    .string()
    .max(2000, 'Shipping policy must not exceed 2000 characters')
    .optional(),
  returnPolicy: yup
    .string()
    .max(2000, 'Return policy must not exceed 2000 characters')
    .optional(),
  warrantyPolicy: yup
    .string()
    .max(2000, 'Warranty policy must not exceed 2000 characters')
    .optional(),
  customerSupportEmail: yup
    .string()
    .email('Please provide a valid email address')
    .required('Customer support email is required'),
  customerSupportPhone: yup
    .string()
    .matches(/^\+?[\d\s-()]+$/, 'Please provide a valid phone number')
    .required('Customer support phone is required')
});

// Customer support validation schema
export const customerSupportSchema = yup.object({
  email: yup
    .string()
    .email('Please provide a valid email address')
    .required('Support email is required'),
  phone: yup
    .string()
    .matches(/^\+?[\d\s-()]+$/, 'Please provide a valid phone number')
    .required('Support phone is required'),
  responseTime: yup
    .string()
    .oneOf(['within_24h', 'within_48h', 'within_72h', 'within_1week'], 'Invalid response time')
    .required('Response time is required'),
  languages: yup
    .array()
    .of(yup.string())
    .min(1, 'At least one language is required')
    .required('Supported languages are required'),
  availability: yup
    .string()
    .oneOf(['24_7', 'business_hours', 'custom'], 'Invalid availability')
    .required('Availability is required'),
  customHours: yup
    .string()
    .when('availability', {
      is: 'custom',
      then: (schema) => schema.required('Custom hours are required when availability is custom'),
      otherwise: (schema) => schema.optional()
    })
});

// Shop status update validation schema
export const shopStatusUpdateSchema = yup.object({
  status: yup
    .string()
    .oneOf(['pending', 'approved', 'in_review', 'action_required', 'cancelled', 'closed'], 'Invalid status')
    .required('Status is required'),
  notes: yup
    .string()
    .max(500, 'Notes must not exceed 500 characters')
    .optional()
});

// Shop commission update validation schema
export const shopCommissionUpdateSchema = yup.object({
  commission: yup
    .number()
    .min(0, 'Commission must be non-negative')
    .max(100, 'Commission must not exceed 100%')
    .required('Commission is required'),
  effectiveDate: yup
    .date()
    .required('Effective date is required'),
  reason: yup
    .string()
    .max(500, 'Reason must not exceed 500 characters')
    .optional()
});
