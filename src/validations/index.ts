// Export all validation schemas

// Auth schemas
export {
  signInSchema,
  signUpSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  otpSchema,
  changePasswordSchema,
  profileSchema,
  addressSchema,
  contactUsSchema,
  reviewSchema
} from './auth';

// Product schemas
export {
  productSchema,
  productVariantSchema,
  productAttributeSchema,
  productPricingSchema,
  productInventorySchema,
  productShippingSchema,
  productSEOSchema,
  categorySchema,
  subCategorySchema,
  childCategorySchema,
  brandSchema,
  attributeSchema,
  couponCodeSchema,
  currencySchema,
  editPaymentSchema
} from './product';

// Settings schemas
export {
  mainSettingsSchema,
  homeSettingsSchema,
  brandingSettingsSchema,
  generalSettingsSchema,
  changePasswordSchema as settingsChangePasswordSchema,
  emailSettingsSchema,
  paymentSettingsSchema,
  shippingSettingsSchema,
  socialMediaSettingsSchema,
  notificationSettingsSchema
} from './settings';

// Shop schemas
export {
  shopSchema,
  shopSettingsSchema,
  shopDetailsSchema,
  identityVerificationSchema,
  financialDetailsSchema,
  operationalDetailsSchema,
  customerSupportSchema,
  shopStatusUpdateSchema,
  shopCommissionUpdateSchema
} from './shop';

// Additional common schemas
export const commonSchemas = {
  // File upload validation
  fileUploadSchema: {
    image: {
      maxSize: 5 * 1024 * 1024, // 5MB
      allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
      maxDimensions: { width: 2048, height: 2048 }
    },
    document: {
      maxSize: 10 * 1024 * 1024, // 10MB
      allowedTypes: ['application/pdf', 'image/jpeg', 'image/png'],
      maxDimensions: { width: 4096, height: 4096 }
    }
  },

  // Search and filter schemas
  searchSchema: {
    query: {
      minLength: 2,
      maxLength: 100
    },
    filters: {
      maxCategories: 10,
      maxBrands: 10,
      maxPriceRange: 1000000
    }
  },

  // Pagination schemas
  paginationSchema: {
    page: {
      min: 1,
      max: 1000
    },
    limit: {
      min: 1,
      max: 100
    }
  }
};
