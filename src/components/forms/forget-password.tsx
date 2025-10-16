'use client';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Form, FormikProvider, useFormik } from 'formik';
import { TextField, Stack, InputAdornment, Button, Typography } from '@mui/material';
import { IoMdMail } from 'react-icons/io';
import * as api from '@/services';
import { useMutation } from '@tanstack/react-query';
import { forgetPasswordSchema } from '@/validations';

interface ForgetPasswordFormProps {
  onSent: () => void;
  onGetEmail: (email: string) => void;
}

export default function ForgetPasswordForm({ onSent, onGetEmail }: ForgetPasswordFormProps): React.JSX.Element {
  const [loading, setloading] = useState(false);

  const { mutate } = useMutation({
    mutationFn: api.forgetPassword,
    onSuccess: () => {
      onSent();
      toast.success('Email sent, check inbox');
      setloading(false);
    },
    onError: (err: any) => {
      setloading(false);
      const message = err?.response?.data?.message;
      toast.error(message || 'Email incorrect, please try again.');
    }
  });

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: forgetPasswordSchema,
    onSubmit: async (values) => {
      try {
        setloading(true);
        onGetEmail(values.email);
        await mutate({ email: values.email, origin: window.location.origin });
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack gap={0.5} width={1}>
            <Typography variant="overline" color="text.primary" htmlFor="email" component={'label'}>
              Email
            </Typography>
            <TextField
              id="email"
              fullWidth
              type={'text'}
              {...getFieldProps('email')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IoMdMail size={24} />
                  </InputAdornment>
                )
              }}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
          </Stack>

          <Button fullWidth size="large" type="submit" variant="contained" disabled={loading}>
            Send Email
          </Button>
        </Stack>
      </Form>
    </FormikProvider>
  );
}

