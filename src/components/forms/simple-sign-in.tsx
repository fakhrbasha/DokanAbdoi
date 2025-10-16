'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useFormik, Form, FormikProvider } from 'formik';
import { useAuth } from '@/components/auth/simple-auth-provider';
import {
  Typography,
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Button,
  Alert,
  AlertTitle
} from '@mui/material';
import Link from '@/utils/link';
import { signInSchema } from '@/validations';
import { IoMdMail } from 'react-icons/io';
import { MdLock, MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md';
import type { SignInFormData } from '@/types/forms';

export default function SimpleSignInForm(): React.JSX.Element {
  const { push } = useRouter();
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik<SignInFormData>({
    initialValues: { 
      email: '', 
      password: '', 
      remember: true 
    },
    validationSchema: signInSchema,
    onSubmit: async (values) => {
      setLoading(true);
      
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For development - accept any credentials
        const mockUser = {
          _id: '1',
          fullName: 'Admin User',
          email: values.email,
          role: values.email.includes('admin') ? ['admin'] : ['vendor'],
          status: 'active',
          isVerified: true,
          avatar: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        signIn(mockUser, 'dev-token-123');
        localStorage.setItem('token', 'dev-token-123');
        toast.success('Logged in successfully!');

        // Redirect based on role
        const isAdmin = mockUser.role.includes('admin');
        const isVendor = mockUser.role.includes('vendor');
        const redirectPath = isAdmin ? '/admin/dashboard' : isVendor ? '/vendor/dashboard' : '/';
        push(redirectPath);
        
      } catch (error) {
        toast.error('Sign in failed, please try again.');
      } finally {
        setLoading(false);
      }
    }
  });

  const { errors, touched, setFieldValue, values, handleSubmit, getFieldProps } = formik;

  return (
    <>
      <Stack mb={3} gap={2} sx={{ '& .MuiAlert-action': { alignItems: 'center' } }}>
        <Alert
          severity="info"
          variant="filled"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => {
                setFieldValue('email', 'admin@test.com');
                setFieldValue('password', 'test1234');
              }}
            >
              Copy
            </Button>
          }
        >
          <AlertTitle>Admin</AlertTitle>
          <b>Email:</b> admin@test.com | <b>password:</b> test1234
        </Alert>
        <Alert
          variant="filled"
          severity="warning"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => {
                setFieldValue('email', 'vendor@nextall.com');
                setFieldValue('password', 'test1234');
              }}
            >
              Copy
            </Button>
          }
        >
          <AlertTitle>Vendor</AlertTitle>
          <b>Email:</b> vendor@nextall.com | <b>password:</b> test1234
        </Alert>
      </Stack>

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
                autoComplete="username"
                type="email"
                {...getFieldProps('email')}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IoMdMail size={24} />
                    </InputAdornment>
                  )
                }}
              />
            </Stack>

            <Stack gap={0.5} width={1}>
              <Typography variant="overline" color="text.primary" htmlFor="password" component={'label'}>
                Password
              </Typography>
              <TextField
                id="password"
                fullWidth
                autoComplete="current-password"
                type={showPassword ? 'text' : 'password'}
                {...getFieldProps('password')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MdLock size={24} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                        {showPassword ? <MdOutlineVisibility size={24} /> : <MdOutlineVisibilityOff size={24} />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />
            </Stack>
          </Stack>
          
          <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 2 }}>
            <Link variant="subtitle2" href="/auth/forget-password">
              Forgot password
            </Link>
          </Stack>
          
          <Button fullWidth size="large" type="submit" variant="contained" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>
          
          <Typography variant="subtitle2" mt={3} textAlign="center">
            Don&apos;t you have an account? &nbsp;
            <Link href="/auth/sign-up">Sign up</Link>
          </Typography>
        </Form>
      </FormikProvider>
    </>
  );
}
