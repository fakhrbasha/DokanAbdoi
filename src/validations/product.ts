// Product validation schemas

import * as yup from 'yup';

// Product validation schema
export const productSchema = yup.object({
  name: yup
    .string()
    .min(3, 'Product name must be at least 3 characters')
    .max(200, 'Product name must not exceed 200 characters')
    .required('Product name is required'),
  slug: yup
    .string()
    .min(3, 'Slug must be at least 3 characters')
    .max(200, 'Slug must not exceed 200 characters')
    .matches(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens')
    .required('Slug is required'),
  description: yup
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(5000, 'Description must not exceed 5000 characters')
    .optional(),
  shortDescription: yup
    .string()
    .min(10, 'Short description must be at least 10 characters')
    .max(500, 'Short description must not exceed 500 characters')
    .optional(),
  images: yup
    .array()
    .min(1, 'At least one image is required')
    .max(10, 'Maximum 10 images allowed')
    .required('Images are required'),
  category: yup
    .string()
    .required('Category is required'),
  brand: yup
    .string()
    .optional(),
  shop: yup
    .string()
    .optional(),
  type: yup
    .string()
    .oneOf(['simple', 'variable', 'grouped'], 'Invalid product type')
    .required('Product type is required'),
  status: yup
    .string()
    .oneOf(['active', 'inactive', 'pending', 'draft'], 'Invalid status')
    .required('Status is required'),
  featured: yup
    .boolean()
    .default(false),
  tags: yup
    .array()
    .of(yup.string())
    .max(20, 'Maximum 20 tags allowed')
    .default([]),
  variants: yup
    .array()
    .when('type', {
      is: 'variable',
      then: (schema) => schema.min(1, 'At least one variant is required for variable products'),
      otherwise: (schema) => schema.optional()
    }),
  attributes: yup
    .array()
    .optional(),
  pricing: yup.object({
    regularPrice: yup
      .number()
      .min(0, 'Regular price must be positive')
      .required('Regular price is required'),
    salePrice: yup
      .number()
      .min(0, 'Sale price must be positive')
      .optional(),
    costPrice: yup
      .number()
      .min(0, 'Cost price must be positive')
      .optional(),
    currency: yup
      .string()
      .required('Currency is required')
  }),
  inventory: yup.object({
    sku: yup
      .string()
      .max(100, 'SKU must not exceed 100 characters')
      .optional(),
    stock: yup
      .number()
      .min(0, 'Stock must be non-negative')
      .required('Stock is required'),
    lowStockThreshold: yup
      .number()
      .min(0, 'Low stock threshold must be non-negative')
      .optional(),
    manageStock: yup
      .boolean()
      .default(true),
    allowBackorder: yup
      .boolean()
      .default(false)
  }),
  shipping: yup.object({
    weight: yup
      .number()
      .min(0, 'Weight must be positive')
      .optional(),
    dimensions: yup.object({
      length: yup
        .number()
        .min(0, 'Length must be positive')
        .optional(),
      width: yup
        .number()
        .min(0, 'Width must be positive')
        .optional(),
      height: yup
        .number()
        .min(0, 'Height must be positive')
        .optional()
    }).optional(),
    shippingClass: yup
      .string()
      .optional()
  }).optional(),
  seo: yup.object({
    metaTitle: yup
      .string()
      .max(60, 'Meta title must not exceed 60 characters')
      .optional(),
    metaDescription: yup
      .string()
      .max(160, 'Meta description must not exceed 160 characters')
      .optional(),
    keywords: yup
      .array()
      .of(yup.string())
      .max(10, 'Maximum 10 keywords allowed')
      .optional()
  })
});

// Product variant validation schema
export const productVariantSchema = yup.object({
  name: yup
    .string()
    .min(3, 'Variant name must be at least 3 characters')
    .max(200, 'Variant name must not exceed 200 characters')
    .required('Variant name is required'),
  attributes: yup
    .object()
    .required('Variant attributes are required'),
  pricing: yup.object({
    regularPrice: yup
      .number()
      .min(0, 'Regular price must be positive')
      .required('Regular price is required'),
    salePrice: yup
      .number()
      .min(0, 'Sale price must be positive')
      .optional(),
    costPrice: yup
      .number()
      .min(0, 'Cost price must be positive')
      .optional(),
    currency: yup
      .string()
      .required('Currency is required')
  }),
  inventory: yup.object({
    sku: yup
      .string()
      .max(100, 'SKU must not exceed 100 characters')
      .optional(),
    stock: yup
      .number()
      .min(0, 'Stock must be non-negative')
      .required('Stock is required'),
    lowStockThreshold: yup
      .number()
      .min(0, 'Low stock threshold must be non-negative')
      .optional(),
    manageStock: yup
      .boolean()
      .default(true),
    allowBackorder: yup
      .boolean()
      .default(false)
  }),
  images: yup
    .array()
    .max(5, 'Maximum 5 images allowed per variant')
    .optional(),
  status: yup
    .string()
    .oneOf(['active', 'inactive', 'pending', 'draft'], 'Invalid status')
    .required('Status is required')
});

// Product attribute validation schema
export const productAttributeSchema = yup.object({
  attribute: yup
    .string()
    .required('Attribute is required'),
  values: yup
    .array()
    .of(yup.string())
    .min(1, 'At least one value is required')
    .required('Attribute values are required')
});

// Product pricing validation schema
export const productPricingSchema = yup.object({
  regularPrice: yup
    .number()
    .min(0, 'Regular price must be positive')
    .required('Regular price is required'),
  salePrice: yup
    .number()
    .min(0, 'Sale price must be positive')
    .optional(),
  costPrice: yup
    .number()
    .min(0, 'Cost price must be positive')
    .optional(),
  currency: yup
    .string()
    .required('Currency is required')
});

// Product inventory validation schema
export const productInventorySchema = yup.object({
  sku: yup
    .string()
    .max(100, 'SKU must not exceed 100 characters')
    .optional(),
  stock: yup
    .number()
    .min(0, 'Stock must be non-negative')
    .required('Stock is required'),
  lowStockThreshold: yup
    .number()
    .min(0, 'Low stock threshold must be non-negative')
    .optional(),
  manageStock: yup
    .boolean()
    .default(true),
  allowBackorder: yup
    .boolean()
    .default(false)
});

// Product shipping validation schema
export const productShippingSchema = yup.object({
  weight: yup
    .number()
    .min(0, 'Weight must be positive')
    .optional(),
  dimensions: yup.object({
    length: yup
      .number()
      .min(0, 'Length must be positive')
      .optional(),
    width: yup
      .number()
      .min(0, 'Width must be positive')
      .optional(),
    height: yup
      .number()
      .min(0, 'Height must be positive')
      .optional()
  }).optional(),
  shippingClass: yup
    .string()
    .optional()
});

// Product SEO validation schema
export const productSEOSchema = yup.object({
  metaTitle: yup
    .string()
    .max(60, 'Meta title must not exceed 60 characters')
    .optional(),
  metaDescription: yup
    .string()
    .max(160, 'Meta description must not exceed 160 characters')
    .optional(),
  keywords: yup
    .array()
    .of(yup.string())
    .max(10, 'Maximum 10 keywords allowed')
    .optional()
});

// Category validation schema
export const categorySchema = yup.object({
  name: yup
    .string()
    .min(3, 'Category name must be at least 3 characters')
    .max(100, 'Category name must not exceed 100 characters')
    .required('Category name is required'),
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
  image: yup
    .object()
    .optional(),
  metaTitle: yup
    .string()
    .max(60, 'Meta title must not exceed 60 characters')
    .optional(),
  metaDescription: yup
    .string()
    .max(160, 'Meta description must not exceed 160 characters')
    .optional(),
  status: yup
    .string()
    .oneOf(['active', 'inactive', 'pending', 'draft'], 'Invalid status')
    .required('Status is required'),
  parent: yup
    .string()
    .optional()
});

// Sub-category validation schema
export const subCategorySchema = categorySchema.shape({
  parent: yup
    .string()
    .required('Parent category is required for sub-categories')
});

// Child category validation schema
export const childCategorySchema = categorySchema.shape({
  parent: yup
    .string()
    .required('Parent category is required for child categories')
});

// Brand validation schema
export const brandSchema = yup.object({
  name: yup
    .string()
    .min(3, 'Brand name must be at least 3 characters')
    .max(100, 'Brand name must not exceed 100 characters')
    .required('Brand name is required'),
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
  metaTitle: yup
    .string()
    .max(60, 'Meta title must not exceed 60 characters')
    .optional(),
  metaDescription: yup
    .string()
    .max(160, 'Meta description must not exceed 160 characters')
    .optional(),
  status: yup
    .string()
    .oneOf(['active', 'inactive', 'pending', 'draft'], 'Invalid status')
    .required('Status is required')
});

// Attribute validation schema
export const attributeSchema = yup.object({
  name: yup
    .string()
    .min(3, 'Attribute name must be at least 3 characters')
    .max(100, 'Attribute name must not exceed 100 characters')
    .required('Attribute name is required'),
  slug: yup
    .string()
    .min(3, 'Slug must be at least 3 characters')
    .max(100, 'Slug must not exceed 100 characters')
    .matches(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens')
    .required('Slug is required'),
  type: yup
    .string()
    .oneOf(['color', 'size', 'material', 'brand', 'custom'], 'Invalid attribute type')
    .required('Attribute type is required'),
  values: yup
    .array()
    .of(yup.object({
      name: yup
        .string()
        .required('Value name is required'),
      value: yup
        .string()
        .required('Value is required'),
      color: yup
        .string()
        .optional(),
      image: yup
        .object()
        .optional()
    }))
    .min(1, 'At least one value is required')
    .required('Attribute values are required'),
  status: yup
    .string()
    .oneOf(['active', 'inactive', 'pending', 'draft'], 'Invalid status')
    .required('Status is required')
});

// Coupon code validation schema
export const couponCodeSchema = yup.object({
  code: yup
    .string()
    .min(3, 'Coupon code must be at least 3 characters')
    .max(50, 'Coupon code must not exceed 50 characters')
    .matches(/^[A-Z0-9_-]+$/, 'Coupon code can only contain uppercase letters, numbers, underscores, and hyphens')
    .required('Coupon code is required'),
  description: yup
    .string()
    .max(500, 'Description must not exceed 500 characters')
    .optional(),
  type: yup
    .string()
    .oneOf(['percentage', 'fixed'], 'Type must be either percentage or fixed')
    .required('Type is required'),
  value: yup
    .number()
    .min(0, 'Value must be positive')
    .required('Value is required'),
  minimumAmount: yup
    .number()
    .min(0, 'Minimum amount must be positive')
    .optional(),
  maximumAmount: yup
    .number()
    .min(0, 'Maximum amount must be positive')
    .optional(),
  usageLimit: yup
    .number()
    .min(1, 'Usage limit must be at least 1')
    .optional(),
  usageLimitPerUser: yup
    .number()
    .min(1, 'Usage limit per user must be at least 1')
    .optional(),
  startDate: yup
    .date()
    .required('Start date is required'),
  endDate: yup
    .date()
    .min(yup.ref('startDate'), 'End date must be after start date')
    .required('End date is required'),
  status: yup
    .string()
    .oneOf(['active', 'inactive', 'expired'], 'Invalid status')
    .default('active')
});

// Currency validation schema
export const currencySchema = yup.object({
  name: yup
    .string()
    .min(2, 'Currency name must be at least 2 characters')
    .max(50, 'Currency name must not exceed 50 characters')
    .required('Currency name is required'),
  code: yup
    .string()
    .length(3, 'Currency code must be exactly 3 characters')
    .matches(/^[A-Z]{3}$/, 'Currency code must be 3 uppercase letters')
    .required('Currency code is required'),
  symbol: yup
    .string()
    .max(10, 'Currency symbol must not exceed 10 characters')
    .required('Currency symbol is required'),
  rate: yup
    .number()
    .min(0, 'Exchange rate must be positive')
    .required('Exchange rate is required'),
  status: yup
    .string()
    .oneOf(['active', 'inactive'], 'Invalid status')
    .default('active')
});

// Edit payment validation schema
export const editPaymentSchema = yup.object({
  status: yup
    .string()
    .oneOf(['pending', 'completed', 'failed', 'cancelled'], 'Invalid payment status')
    .required('Payment status is required'),
  transactionId: yup
    .string()
    .optional(),
  notes: yup
    .string()
    .max(500, 'Notes must not exceed 500 characters')
    .optional()
});

