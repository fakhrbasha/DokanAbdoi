// Authentication service endpoints

import { api } from './api-client';
import type {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  VerifyOtpRequest,
  UpdateProfileRequest,
  ChangePasswordRequest,
  UpdateProfileResponse,
  ChangePasswordResponse,
  AddToWishlistRequest,
  RemoveFromWishlistRequest,
  GetWishlistResponse,
  AddToWishlistResponse,
  RemoveFromWishlistResponse,
  GetCurrenciesResponse
} from '@/types/api';

// Authentication endpoints
export const authService = {
  // Sign in
  signIn: async (data: SignInRequest): Promise<SignInResponse> => {
    return api.post<SignInResponse>('/auth/sign-in', data);
  },

  // Sign up
  signUp: async (data: SignUpRequest): Promise<SignInResponse> => {
    return api.post<SignInResponse>('/auth/sign-up', data);
  },

  // Forgot password
  forgotPassword: async (data: ForgotPasswordRequest): Promise<{ message: string }> => {
    return api.post<{ message: string }>('/auth/forgot-password', data);
  },

  // Reset password
  resetPassword: async (data: ResetPasswordRequest): Promise<{ message: string }> => {
    return api.post<{ message: string }>('/auth/reset-password', data);
  },

  // Verify OTP
  verifyOtp: async (data: VerifyOtpRequest): Promise<{ message: string }> => {
    return api.post<{ message: string }>('/auth/verify-otp', data);
  },

  // Resend OTP
  resendOtp: async (email: string): Promise<{ message: string }> => {
    return api.post<{ message: string }>('/auth/resend-otp', { email });
  },

  // Sign out
  signOut: async (): Promise<{ message: string }> => {
    return api.post<{ message: string }>('/auth/signout');
  },

  // Refresh token
  refreshToken: async (): Promise<SignInResponse> => {
    return api.post<SignInResponse>('/auth/refresh-token');
  },

  // Get current user
  getCurrentUser: async (): Promise<{ user: any }> => {
    return api.get<{ user: any }>('/auth/me');
  },

  // Update profile
  updateProfile: async (data: UpdateProfileRequest): Promise<UpdateProfileResponse> => {
    return api.put<UpdateProfileResponse>('/auth/profile', data);
  },

  // Change password
  changePassword: async (data: ChangePasswordRequest): Promise<ChangePasswordResponse> => {
    return api.put<ChangePasswordResponse>('/auth/change-password', data);
  },

  // Upload avatar
  uploadAvatar: async (file: File): Promise<{ avatar: any }> => {
    const formData = new FormData();
    formData.append('avatar', file);
    
    return api.post<{ avatar: any }>('/auth/upload-avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Delete account
  deleteAccount: async (password: string): Promise<{ message: string }> => {
    return api.delete<{ message: string }>('/auth/account', {
      data: { password }
    });
  },

  // Wishlist endpoints
  wishlist: {
    // Get wishlist
    get: async (): Promise<GetWishlistResponse> => {
      return api.get<GetWishlistResponse>('/auth/wishlist');
    },

    // Add to wishlist
    add: async (data: AddToWishlistRequest): Promise<AddToWishlistResponse> => {
      return api.post<AddToWishlistResponse>('/auth/wishlist', data);
    },

    // Remove from wishlist
    remove: async (data: RemoveFromWishlistRequest): Promise<RemoveFromWishlistResponse> => {
      return api.delete<RemoveFromWishlistResponse>('/auth/wishlist', {
        data
      });
    },

    // Clear wishlist
    clear: async (): Promise<{ message: string }> => {
      return api.delete<{ message: string }>('/auth/wishlist/clear');
    }
  },

  // Address endpoints
  addresses: {
    // Get addresses
    get: async (): Promise<{ addresses: any[] }> => {
      return api.get<{ addresses: any[] }>('/auth/addresses');
    },

    // Add address
    add: async (data: any): Promise<{ address: any }> => {
      return api.post<{ address: any }>('/auth/addresses', data);
    },

    // Update address
    update: async (id: string, data: any): Promise<{ address: any }> => {
      return api.put<{ address: any }>(`/auth/addresses/${id}`, data);
    },

    // Delete address
    delete: async (id: string): Promise<{ message: string }> => {
      return api.delete<{ message: string }>(`/auth/addresses/${id}`);
    },

    // Set default address
    setDefault: async (id: string): Promise<{ message: string }> => {
      return api.patch<{ message: string }>(`/auth/addresses/${id}/default`);
    }
  },

  // Get currencies for frontend
  getCurrencies: async (): Promise<GetCurrenciesResponse> => {
    return api.get<GetCurrenciesResponse>('/currencies');
  }
};

// Export individual functions for backward compatibility
export const signIn = authService.signIn;
export const signUp = authService.signUp;
export const forgotPassword = authService.forgotPassword;
export const resetPassword = authService.resetPassword;
export const verifyOtp = authService.verifyOtp;
export const resendOtp = authService.resendOtp;
export const signOut = authService.signOut;
export const refreshToken = authService.refreshToken;
export const getCurrentUser = authService.getCurrentUser;
export const updateProfile = authService.updateProfile;
export const changePassword = authService.changePassword;
export const uploadAvatar = authService.uploadAvatar;
export const deleteAccount = authService.deleteAccount;
export const getCurrencies = authService.getCurrencies;
