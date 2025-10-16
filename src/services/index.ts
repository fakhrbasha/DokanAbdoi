// Export all service functions

// API client
export { default as apiClient, api, uploadFile, downloadFile, batchRequest, retryRequest, RequestCanceller } from './api-client';

// Auth service
export {
  authService,
  signIn,
  signUp,
  forgotPassword,
  resetPassword,
  verifyOtp,
  resendOtp,
  signOut,
  refreshToken,
  getCurrentUser,
  updateProfile,
  changePassword,
  uploadAvatar,
  deleteAccount,
  getCurrencies
} from './auth.service';

// Product service
export {
  productService,
  getProducts,
  getProduct,
  getFeaturedProducts,
  getBestSellingProducts,
  getRelatedProducts,
  searchProducts,
  getProductReviews,
  addProductReview,
  updateProductReview,
  deleteProductReview,
  compareProducts
} from './product.service';

// Admin service
export {
  adminService,
  // Brands
  getBrandsByAdmin,
  getBrandByAdmin,
  addBrandByAdmin,
  updateBrandByAdmin,
  deleteBrandByAdmin,
  getAllBrandsByAdmin,
  // Categories
  getCategoriesByAdmin,
  getCategoryByAdmin,
  addCategoryByAdmin,
  updateCategoryByAdmin,
  deleteCategoryByAdmin,
  getAllCategories,
  // Child Categories (aliases to category functions)
  addChildCategoryByAdmin,
  updateChildCategoryByAdmin,
  getChildCategoryByAdmin,
  // Sub Categories (aliases to category functions)
  addSubCategoryByAdmin,
  updateSubCategoryByAdmin,
  getSubCategoryByAdmin,
  // Products
  getProductsByAdmin,
  getProductByAdmin,
  addProductByAdmin,
  updateProductByAdmin,
  deleteProductByAdmin,
  // Shops
  getShopsByAdmin,
  getShopByAdmin,
  getShopDetailsByAdmin,
  addShopByAdmin,
  updateShopByAdmin,
  deleteShopByAdmin,
  getAllShopsByAdmin,
  getIncomeDetailsByAdmin,
  // Orders
  getOrdersByAdmin,
  getOrderByAdmin,
  updateOrderByAdmin,
  updateOrderStatus,
  updateOrderStatusByVendor,
  deleteOrderByAdmin,
  // Users
  getUsersByAdmin,
  getUserByAdmin,
  getUserByAdminsByAdmin,
  updateUserByAdmin,
  updateUserRoleByAdmin,
  deleteUserByAdmin,
  // Coupon codes
  getCouponCodesByAdmin,
  getCouponCodeByAdmin,
  addCouponCodeByAdmin,
  updateCouponCodeByAdmin,
  deleteCouponCodeByAdmin,
  // Currencies
  getCurrenciesByAdmin,
  getCurrencyByAdmin,
  addCurrencyByAdmin,
  updateCurrencyByAdmin,
  deleteCurrencyByAdmin,
  // Payments
  getPaymentsByAdmin,
  getPaymentByAdmin,
  addPaymentByAdmin,
  updatePaymentByAdmin,
  deletePaymentByAdmin,
  getPayoutsByAdmin,
  // Courier
  createCourierInfo,
  updateCourierInfo,
  // Attributes
  getAttributesByAdmin,
  getAttributeByAdmin,
  addAttributeByAdmin,
  updateAttributeByAdmin,
  deleteAttributeByAdmin,
  // Newsletter
  getNewslettersByAdmin,
  sendNewsletterByAdmin,
  getNewsletter,
  // Settings
  getMainSettingsByAdmin,
  updateMainSettingsByAdmin,
  getHomeSettingsByAdmin,
  updateHomeSettingsByAdmin,
  getBrandingSettingsByAdmin,
  updateBrandingSettingsByAdmin,
  // Files
  singleDeleteFile,
  getFileInfo,
  // Dashboard
  adminDashboardAnalytics,
  vendorDashboardAnalytics,
  getLowStockProductsByAdmin
} from './admin.service';

// Legacy exports for backward compatibility
export * as auth from './auth.service';
export * as product from './product.service';
export * as admin from './admin.service';
