'use client';
import React from 'react';
import { Box, TextField, Button, Stack, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import { shopSchema } from '@/validations';
import * as api from '@/services';
import { useMutation } from '@tanstack/react-query';
import { Shop } from '@/types/models';
import { useUploadSingleFile } from '@/hooks/use-upload-file';

interface ShopFormProps {
  shop?: Shop;
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface ShopFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  description: string;
  status: string;
}

export default function ShopForm({ shop, onSuccess, onCancel }: ShopFormProps): React.JSX.Element {
  const { mutate: addShop, isPending: isAdding } = useMutation({
    mutationFn: (data: ShopFormData) => api.addShopByAdmin(data),
    onSuccess: () => {
      toast.success('Shop added successfully');
      onSuccess?.();
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to add shop');
    }
  });

  const { mutate: updateShop, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: ShopFormData }) => 
      api.updateShopByAdmin(id, data),
    onSuccess: () => {
      toast.success('Shop updated successfully');
      onSuccess?.();
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update shop');
    }
  });

  const { uploadFile, isUploading } = useUploadSingleFile();

  const formik = useFormik<ShopFormData>({
    initialValues: {
      name: shop?.name || '',
      email: shop?.email || '',
      phone: shop?.phone || '',
      address: shop?.address || '',
      description: shop?.description || '',
      status: shop?.status || 'active'
    },
    validationSchema: shopSchema,
    onSubmit: (values) => {
      if (shop) {
        updateShop({ id: shop._id, data: values });
      } else {
        addShop(values);
      }
    }
  });

  const isLoading = isAdding || isUpdating;

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          fullWidth
          label="Shop Name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          disabled={isLoading}
        />

        <TextField
          fullWidth
          label="Email Address"
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          disabled={isLoading}
        />

        <TextField
          fullWidth
          label="Phone Number"
          name="phone"
          type="tel"
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
          disabled={isLoading}
        />

        <TextField
          fullWidth
          label="Address"
          name="address"
          multiline
          rows={3}
          value={formik.values.address}
          onChange={formik.handleChange}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
          disabled={isLoading}
        />

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
          disabled={isLoading}
        />

        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={formik.values.status}
            onChange={(e) => formik.setFieldValue('status', e.target.value)}
            label="Status"
            disabled={isLoading}
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="suspended">Suspended</MenuItem>
          </Select>
        </FormControl>

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          {onCancel && (
            <Button onClick={onCancel} disabled={isLoading}>
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : shop ? 'Update' : 'Create'}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
