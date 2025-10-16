'use client';
import React from 'react';
import { Box, TextField, Button, Stack, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import { changePasswordSchema } from '@/validations';
import * as api from '@/services';
import { useMutation } from '@tanstack/react-query';

interface ChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ChangePasswordForm(): React.JSX.Element {
  const { mutate: changePassword, isPending } = useMutation({
    mutationFn: ({ currentPassword, newPassword }: { currentPassword: string; newPassword: string }) => 
      api.changePassword(currentPassword, newPassword),
    onSuccess: () => {
      toast.success('Password changed successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to change password');
    }
  });

  const formik = useFormik<ChangePasswordFormData>({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    validationSchema: changePasswordSchema,
    onSubmit: (values) => {
      changePassword({ 
        currentPassword: values.currentPassword, 
        newPassword: values.newPassword 
      });
    }
  });

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', p: 3 }}>
      <Stack spacing={3}>
        <Box textAlign="center">
          <Typography variant="h5" sx={{ mb: 1 }}>
            Change Password
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Update your account password
          </Typography>
        </Box>

        <Box component="form" onSubmit={formik.handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Current Password"
              name="currentPassword"
              type="password"
              value={formik.values.currentPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
              helperText={formik.touched.currentPassword && formik.errors.currentPassword}
              disabled={isPending}
            />

            <TextField
              fullWidth
              label="New Password"
              name="newPassword"
              type="password"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
              helperText={formik.touched.newPassword && formik.errors.newPassword}
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
              {isPending ? 'Changing Password...' : 'Change Password'}
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
