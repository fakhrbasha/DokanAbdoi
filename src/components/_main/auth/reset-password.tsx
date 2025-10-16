'use client';
import React from 'react';
import { Box, TextField, Button, Stack, Typography, Link as MuiLink } from '@mui/material';
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { resetPasswordSchema } from '@/validations';
import * as api from '@/services';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';

interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

interface ResetPasswordMainProps {
  token: string;
}

export default function ResetPasswordMain({ token }: ResetPasswordMainProps): React.JSX.Element {
  const router = useRouter();

  const { mutate: resetPassword, isPending } = useMutation({
    mutationFn: ({ password, token }: { password: string; token: string }) => 
      api.resetPassword({ password, token: token, confirmPassword: password }),
    onSuccess: () => {
      toast.success('Password reset successfully!');
      router.push('/auth/sign-in');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to reset password');
    }
  });

  const formik = useFormik<ResetPasswordFormData>({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validationSchema: resetPasswordSchema,
    onSubmit: (values) => {
      resetPassword({ password: values.password, token });
    }
  });

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', p: 3 }}>
      <Stack spacing={3}>
        <Box textAlign="center">
          <Typography variant="h4" sx={{ mb: 1 }}>
            Reset Password
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Enter your new password below
          </Typography>
        </Box>

        <Box component="form" onSubmit={formik.handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="New Password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              disabled={isPending}
            />

            <TextField
              fullWidth
              label="Confirm New Password"
              name="confirmPassword"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              disabled={isPending}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isPending}
            >
              {isPending ? 'Resetting...' : 'Reset Password'}
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
