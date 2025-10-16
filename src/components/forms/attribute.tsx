import React from 'react';
import { Box, TextField, Button, Stack, Chip, IconButton } from '@mui/material';
import { useFormik } from 'formik';
import { MdAdd, MdDelete } from 'react-icons/md';
import { attributeSchema } from '@/validations';
import { Attribute } from '@/types/models';
import { toast } from 'react-hot-toast';
import * as api from '@/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface AttributeFormProps {
  attribute?: Attribute;
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface AttributeFormData {
  name: string;
  type: string;
  values: string[];
  status: string;
}

export default function AttributeForm({ attribute, onSuccess, onCancel }: AttributeFormProps): React.JSX.Element {
  const queryClient = useQueryClient();

  const { mutate: addAttribute, isPending: isAdding } = useMutation({
    mutationFn: (data: AttributeFormData) => api.addAttributeByAdmin(data),
    onSuccess: () => {
      toast.success('Attribute added successfully');
      queryClient.invalidateQueries({ queryKey: ['attributes-by-admin'] });
      onSuccess?.();
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to add attribute');
    }
  });

  const { mutate: updateAttribute, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: AttributeFormData }) => 
      api.updateAttributeByAdmin(id, data),
    onSuccess: () => {
      toast.success('Attribute updated successfully');
      queryClient.invalidateQueries({ queryKey: ['attributes-by-admin'] });
      onSuccess?.();
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update attribute');
    }
  });

  const formik = useFormik<AttributeFormData>({
    initialValues: {
      name: attribute?.name || '',
      type: attribute?.type || 'text',
      values: attribute?.values || [],
      status: attribute?.status || 'active'
    },
    validationSchema: attributeSchema,
    onSubmit: (values) => {
      if (attribute) {
        updateAttribute({ id: attribute._id, data: values });
      } else {
        addAttribute(values);
      }
    }
  });

  const handleAddValue = () => {
    const newValue = prompt('Enter attribute value:');
    if (newValue && newValue.trim()) {
      formik.setFieldValue('values', [...formik.values.values, newValue.trim()]);
    }
  };

  const handleRemoveValue = (index: number) => {
    const newValues = formik.values.values.filter((_, i) => i !== index);
    formik.setFieldValue('values', newValues);
  };

  const isLoading = isAdding || isUpdating;

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          fullWidth
          label="Attribute Name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          disabled={isLoading}
        />

        <TextField
          fullWidth
          select
          label="Attribute Type"
          name="type"
          value={formik.values.type}
          onChange={formik.handleChange}
          error={formik.touched.type && Boolean(formik.errors.type)}
          helperText={formik.touched.type && formik.errors.type}
          disabled={isLoading}
        >
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="color">Color</option>
          <option value="size">Size</option>
          <option value="material">Material</option>
          <option value="brand">Brand</option>
        </TextField>

        <Box>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <Button
              variant="outlined"
              startIcon={<MdAdd />}
              onClick={handleAddValue}
              disabled={isLoading}
              size="small"
            >
              Add Value
            </Button>
          </Stack>
          
          {formik.values.values.length > 0 && (
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {formik.values.values.map((value, index) => (
                <Chip
                  key={index}
                  label={value}
                  onDelete={() => handleRemoveValue(index)}
                  deleteIcon={<MdDelete />}
                  disabled={isLoading}
                />
              ))}
            </Stack>
          )}
        </Box>

        <TextField
          fullWidth
          select
          label="Status"
          name="status"
          value={formik.values.status}
          onChange={formik.handleChange}
          error={formik.touched.status && Boolean(formik.errors.status)}
          helperText={formik.touched.status && formik.errors.status}
          disabled={isLoading}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </TextField>

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
            {isLoading ? 'Saving...' : attribute ? 'Update' : 'Create'}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
