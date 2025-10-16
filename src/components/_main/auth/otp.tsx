'use client';
import React from 'react';
import { Box, Typography, Stack, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { otpSchema } from '@/validations';
import * as api from '@/services';
import { useMutation } from '@tanstack/react-query';

interface OTPFormData {
  otp: string;
}

export default function OTPMain(): React.JSX.Element {
  const router = useRouter();

  const { mutate: verifyOtp, isPending } = useMutation({
    mutationFn: (otp: string) => api.verifyOtp(otp),
    onSuccess: () => {
      toast.success('Email verified successfully!');
      router.push('/');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Invalid OTP');
    }
  });

  const { mutate: resendOtp, isPending: isResending } = useMutation({
    mutationFn: () => api.resendOtp(),
    onSuccess: () => {
      toast.success('OTP resent successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to resend OTP');
    }
  });

  const formik = useFormik<OTPFormData>({
    initialValues: {
      otp: ''
    },
    validationSchema: otpSchema,
    onSubmit: (values) => {
      verifyOtp(values.otp);
    }
  });

  const handleResendOtp = () => {
    resendOtp();
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', p: 3 }}>
      <Stack spacing={3}>
        <Box textAlign="center">
          <Typography variant="h4" sx={{ mb: 1 }}>
            Verify Your Email
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Please enter the 6-digit code sent to your email address
          </Typography>
        </Box>

        <Box component="form" onSubmit={formik.handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Verification Code"
              name="otp"
              value={formik.values.otp}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.otp && Boolean(formik.errors.otp)}
              helperText={formik.touched.otp && formik.errors.otp}
              placeholder="Enter 6-digit code"
              inputProps={{ maxLength: 6 }}
              disabled={isPending}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isPending || formik.values.otp.length !== 6}
            >
              {isPending ? 'Verifying...' : 'Verify Email'}
            </Button>

            <Button
              variant="text"
              onClick={handleResendOtp}
              disabled={isResending}
              sx={{ textTransform: 'none' }}
            >
              {isResending ? 'Resending...' : "Didn't receive the code? Resend"}
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
