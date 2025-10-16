'use client';
import React from 'react';
import { Box, TextField, Button, Stack, Typography, FormControl, InputLabel, Select, MenuItem, Chip, Autocomplete } from '@mui/material';
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import { productSchema } from '@/validations';
import * as api from '@/services';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Product, Category, Brand, Shop } from '@/types/models';
import { useUploadSingleFile } from '@/hooks/use-upload-file';

interface ProductFormProps {
  product?: Product;
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  category: string;
  brand: string;
  shop: string;
  status: string;
  inventoryType: string;
  stockQuantity: number;
  tags: string[];
}

export default function ProductForm({ product, onSuccess, onCancel }: ProductFormProps): React.JSX.Element {
  const { mutate: addProduct, isPending: isAdding } = useMutation({
    mutationFn: (data: ProductFormData) => api.addProductByAdmin(data),
    onSuccess: () => {
      toast.success('Product added successfully');
      onSuccess?.();
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to add product');
    }
  });

  const { mutate: updateProduct, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: ProductFormData }) => 
      api.updateProductByAdmin(id, data),
    onSuccess: () => {
      toast.success('Product updated successfully');
      onSuccess?.();
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update product');
    }
  });

  // Fetch categories, brands, and shops
  const { data: categories = [] } = useQuery({
    queryKey: ['categories-by-admin'],
    queryFn: () => api.getCategoriesByAdmin()
  });

  const { data: brands = [] } = useQuery({
    queryKey: ['brands-by-admin'],
    queryFn: () => api.getBrandsByAdmin()
  });

  const { data: shops = [] } = useQuery({
    queryKey: ['shops-by-admin'],
    queryFn: () => api.getShopsByAdmin()
  });

  const { uploadFile, isUploading } = useUploadSingleFile();

  const formik = useFormik<ProductFormData>({
    initialValues: {
      name: product?.name || '',
      description: product?.description || '',
      price: product?.price || 0,
      salePrice: product?.salePrice || undefined,
      category: product?.category?._id || '',
      brand: product?.brand?._id || '',
      shop: product?.shop?._id || '',
      status: product?.status || 'active',
      inventoryType: product?.inventoryType || 'finite',
      stockQuantity: product?.stockQuantity || 0,
      tags: product?.tags || []
    },
    validationSchema: productSchema,
    onSubmit: (values) => {
      if (product) {
        updateProduct({ id: product._id, data: values });
      } else {
        addProduct(values);
      }
    }
  });

  const isLoading = isAdding || isUpdating;

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          fullWidth
          label="Product Name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
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

        <Stack direction="row" spacing={2}>
          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={formik.values.price}
            onChange={formik.handleChange}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
            disabled={isLoading}
          />
          <TextField
            fullWidth
            label="Sale Price (Optional)"
            name="salePrice"
            type="number"
            value={formik.values.salePrice || ''}
            onChange={formik.handleChange}
            error={formik.touched.salePrice && Boolean(formik.errors.salePrice)}
            helperText={formik.touched.salePrice && formik.errors.salePrice}
            disabled={isLoading}
          />
        </Stack>

        <Stack direction="row" spacing={2}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={formik.values.category}
              onChange={(e) => formik.setFieldValue('category', e.target.value)}
              label="Category"
              disabled={isLoading}
            >
              {categories.map((category: Category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Brand</InputLabel>
            <Select
              value={formik.values.brand}
              onChange={(e) => formik.setFieldValue('brand', e.target.value)}
              label="Brand"
              disabled={isLoading}
            >
              {brands.map((brand: Brand) => (
                <MenuItem key={brand._id} value={brand._id}>
                  {brand.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        <FormControl fullWidth>
          <InputLabel>Shop</InputLabel>
          <Select
            value={formik.values.shop}
            onChange={(e) => formik.setFieldValue('shop', e.target.value)}
            label="Shop"
            disabled={isLoading}
          >
            {shops.map((shop: Shop) => (
              <MenuItem key={shop._id} value={shop._id}>
                {shop.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Stack direction="row" spacing={2}>
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
              <MenuItem value="draft">Draft</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Inventory Type</InputLabel>
            <Select
              value={formik.values.inventoryType}
              onChange={(e) => formik.setFieldValue('inventoryType', e.target.value)}
              label="Inventory Type"
              disabled={isLoading}
            >
              <MenuItem value="finite">Finite</MenuItem>
              <MenuItem value="infinite">Infinite</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        {formik.values.inventoryType === 'finite' && (
          <TextField
            fullWidth
            label="Stock Quantity"
            name="stockQuantity"
            type="number"
            value={formik.values.stockQuantity}
            onChange={formik.handleChange}
            error={formik.touched.stockQuantity && Boolean(formik.errors.stockQuantity)}
            helperText={formik.touched.stockQuantity && formik.errors.stockQuantity}
            disabled={isLoading}
          />
        )}

        <Autocomplete
          multiple
          freeSolo
          options={[]}
          value={formik.values.tags}
          onChange={(event, newValue) => {
            formik.setFieldValue('tags', newValue);
          }}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip variant="outlined" label={option} {...getTagProps({ index })} />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Tags"
              placeholder="Add tags..."
              disabled={isLoading}
            />
          )}
        />

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
            {isLoading ? 'Saving...' : product ? 'Update' : 'Create'}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
