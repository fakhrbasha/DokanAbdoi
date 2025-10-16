'use client';
import React from 'react';
import { Box, TextField, Button, Stack, Typography, Link as MuiLink, Checkbox, FormControlLabel } from '@mui/material';
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { signUpSchema } from '@/validations';
import * as api from '@/services';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';

interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
}

export default function SignUpMain(): React.JSX.Element {
  const router = useRouter();

  const { mutate: signUp, isPending } = useMutation({
    mutationFn: (data: SignUpFormData) => api.signUp(data),
    onSuccess: () => {
      toast.success('Account created successfully! Please check your email to verify your account.');
      router.push('/auth/verify-otp');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create account');
    }
  });

  const formik = useFormik<SignUpFormData>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: ''
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      signUp(values);
    }
  });

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', p: 3 }}>
      <Stack spacing={3}>
        <Box textAlign="center">
          <Typography variant="h4" sx={{ mb: 1 }}>
            Create Account
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sign up to get started with your account
          </Typography>
        </Box>

        <Box component="form" onSubmit={formik.handleSubmit}>
          <Stack spacing={3}>
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
                disabled={isPending}
              />
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
                disabled={isPending}
              />
            </Stack>

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

            <TextField
              fullWidth
              label="Phone Number (Optional)"
              name="phone"
              type="tel"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              disabled={isPending}
            />

            <TextField
              fullWidth
              label="Password"
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
              label="Confirm Password"
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
              {isPending ? 'Creating Account...' : 'Create Account'}
            </Button>

            <Box textAlign="center">
              <Typography variant="body2" color="text.secondary">
                Already have an account?{' '}
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
