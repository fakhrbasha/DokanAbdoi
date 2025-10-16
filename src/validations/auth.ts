// Authentication validation schemas

import * as yup from 'yup';

// Sign in validation schema
export const signInSchema = yup.object({
  email: yup
    .string()
    .email('Please provide a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  remember: yup.boolean().default(false)
});

// Sign up validation schema
export const signUpSchema = yup.object({
  firstName: yup
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must not exceed 50 characters')
    .required('First name is required'),
  lastName: yup
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must not exceed 50 characters')
    .required('Last name is required'),
  email: yup
    .string()
    .email('Please provide a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  phone: yup
    .string()
    .matches(/^\+?[\d\s-()]+$/, 'Please provide a valid phone number')
    .optional()
});

// Forgot password validation schema
export const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .email('Please provide a valid email address')
    .required('Email is required')
});

// Reset password validation schema
export const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password')
});

// OTP validation schema
export const otpSchema = yup.object({
  otp: yup
    .string()
    .length(6, 'OTP must be exactly 6 digits')
    .matches(/^\d{6}$/, 'OTP must contain only numbers')
    .required('OTP is required')
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

// Profile update validation schema
export const profileSchema = yup.object({
  firstName: yup
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must not exceed 50 characters')
    .required('First name is required'),
  lastName: yup
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must not exceed 50 characters')
    .required('Last name is required'),
  phone: yup
    .string()
    .matches(/^\+?[\d\s-()]+$/, 'Please provide a valid phone number')
    .optional()
});

// Address validation schema
export const addressSchema = yup.object({
  type: yup
    .string()
    .oneOf(['billing', 'shipping'], 'Address type must be billing or shipping')
    .required('Address type is required'),
  firstName: yup
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must not exceed 50 characters')
    .required('First name is required'),
  lastName: yup
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must not exceed 50 characters')
    .required('Last name is required'),
  company: yup
    .string()
    .max(100, 'Company name must not exceed 100 characters')
    .optional(),
  street: yup
    .string()
    .min(5, 'Street address must be at least 5 characters')
    .max(200, 'Street address must not exceed 200 characters')
    .required('Street address is required'),
  apartment: yup
    .string()
    .max(50, 'Apartment/Unit must not exceed 50 characters')
    .optional(),
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
    .required('Country is required'),
  phone: yup
    .string()
    .matches(/^\+?[\d\s-()]+$/, 'Please provide a valid phone number')
    .optional(),
  isDefault: yup.boolean().default(false)
});

// Contact us validation schema
export const contactUsSchema = yup.object({
  firstName: yup
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must not exceed 50 characters')
    .required('First name is required'),
  lastName: yup
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must not exceed 50 characters')
    .required('Last name is required'),
  email: yup
    .string()
    .email('Please provide a valid email address')
    .required('Email is required'),
  phone: yup
    .string()
    .matches(/^\+?[\d\s-()]+$/, 'Please provide a valid phone number')
    .required('Phone number is required'),
  subject: yup
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject must not exceed 200 characters')
    .required('Subject is required'),
  message: yup
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must not exceed 1000 characters')
    .required('Message is required')
});

// Review validation schema
export const reviewSchema = yup.object({
  rating: yup
    .number()
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating must not exceed 5')
    .required('Rating is required'),
  title: yup
    .string()
    .min(5, 'Title must be at least 5 characters')
    .max(200, 'Title must not exceed 200 characters')
    .optional(),
  comment: yup
    .string()
    .min(10, 'Comment must be at least 10 characters')
    .max(1000, 'Comment must not exceed 1000 characters')
    .optional()
});
