'use client';
import React from 'react';
import { Box, TextField, Button, Stack, Typography, Link as MuiLink } from '@mui/material';
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { forgotPasswordSchema } from '@/validations';
import * as api from '@/services';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';

interface ForgetPasswordFormData {
  email: string;
}

export default function ForgetPasswordMain(): React.JSX.Element {
  const router = useRouter();

  const { mutate: forgotPassword, isPending } = useMutation({
    mutationFn: (email: string) => api.forgotPassword({ email }),
    onSuccess: () => {
      toast.success('Password reset email sent successfully!');
      router.push('/auth/verify-otp');
    }
  });

  const formik = useFormik<ForgetPasswordFormData>({
    initialValues: {
      email: ''
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: (values) => {
      forgotPassword(values.email);
    }
  });

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', p: 3 }}>
      <Stack spacing={3}>
        <Box textAlign="center">
          <Typography variant="h4" sx={{ mb: 1 }}>
            Forgot Password?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Enter your email address and we'll send you a link to reset your password
          </Typography>
        </Box>

        <Box component="form" onSubmit={formik.handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              disabled={isPending}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isPending}
            >
              {isPending ? 'Sending...' : 'Send Reset Link'}
            </Button>

            <Box textAlign="center">
              <Typography variant="body2" color="text.secondary">
                Remember your password?{' '}
                <MuiLink component={Link} href="/auth/sign-in">
                  Sign in
                </MuiLink>
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
