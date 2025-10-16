'use client';
import React from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

// MUI
import {
  Stack,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Divider,
  Alert,
  Box
} from '@mui/material';

// Icons
import { FaBunny } from 'react-icons/fa6';
import { MdStorage, MdKey } from 'react-icons/md';

// Types
import { RootState } from '@/redux';
import { initializeSettings } from '@/redux/slices/settings';

// Validation
import * as Yup from 'yup';

interface BunnyConfigFormData {
  bunnyStorageZone: string;
  bunnyAccessKey: string;
}

const validationSchema = Yup.object().shape({
  bunnyStorageZone: Yup.string()
    .required('Storage Zone is required')
    .min(3, 'Storage Zone must be at least 3 characters'),
  bunnyAccessKey: Yup.string()
    .required('Access Key is required')
    .min(10, 'Access Key must be at least 10 characters')
});

export default function BunnyConfigForm(): React.JSX.Element {
  const dispatch = useDispatch();
  const { bunnyStorageZone, bunnyAccessKey, isInitialized } = useSelector(
    (state: RootState) => state.settings
  );

  const formik = useFormik<BunnyConfigFormData>({
    initialValues: {
      bunnyStorageZone: bunnyStorageZone || '',
      bunnyAccessKey: bunnyAccessKey || ''
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Initialize settings with Bunny.net configuration
        dispatch(
          initializeSettings({
            bunnyStorageZone: values.bunnyStorageZone,
            bunnyAccessKey: values.bunnyAccessKey,
            currency: 'USD', // Default currency
            baseCurrency: 'USD',
            rate: 1
          })
        );
        
        toast.success('Bunny.net configuration saved successfully!');
      } catch (error) {
        toast.error('Failed to save configuration');
      } finally {
        setSubmitting(false);
      }
    }
  });

  const { errors, touched, handleSubmit, getFieldProps, isSubmitting } = formik;

  return (
    <Card>
      <CardContent>
        <Stack spacing={3}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FaBunny size={24} color="#FF6B35" />
            <Typography variant="h6">Bunny.net Configuration</Typography>
          </Box>

          <Alert severity="info">
            Configure your Bunny.net Storage Zone for file uploads. You can get these credentials from your Bunny.net dashboard.
          </Alert>

          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Storage Zone Name"
                  placeholder="e.g., my-storage-zone"
                  {...getFieldProps('bunnyStorageZone')}
                  error={Boolean(touched.bunnyStorageZone && errors.bunnyStorageZone)}
                  helperText={touched.bunnyStorageZone && errors.bunnyStorageZone}
                  InputProps={{
                    startAdornment: <MdStorage style={{ marginRight: 8, color: '#666' }} />
                  }}
                />

                <TextField
                  fullWidth
                  label="Access Key"
                  type="password"
                  placeholder="Enter your Bunny.net access key"
                  {...getFieldProps('bunnyAccessKey')}
                  error={Boolean(touched.bunnyAccessKey && errors.bunnyAccessKey)}
                  helperText={touched.bunnyAccessKey && errors.bunnyAccessKey}
                  InputProps={{
                    startAdornment: <MdKey style={{ marginRight: 8, color: '#666' }} />
                  }}
                />

                <Divider />

                <Stack direction="row" spacing={2} justifyContent="flex-end">
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    sx={{
                      bgcolor: '#FF6B35',
                      '&:hover': {
                        bgcolor: '#E55A2B'
                      }
                    }}
                  >
                    {isSubmitting ? 'Saving...' : 'Save Configuration'}
                  </Button>
                </Stack>

                {isInitialized && (
                  <Alert severity="success">
                    Bunny.net is configured and ready to use!
                  </Alert>
                )}
              </Stack>
            </Form>
          </FormikProvider>
        </Stack>
      </CardContent>
    </Card>
  );
}

