import React from 'react';
import type { Metadata } from 'next';
import SimpleGuestGuard from '@/guards/simple-guest-guard';
import { Card, Stack, Container, Typography } from '@mui/material';
import SimpleSignInForm from '@/components/forms/simple-sign-in';
import Providers from '@/providers';

// Meta information
export const metadata: Metadata = {
  title: 'Sign in to Nextall | Your Gateway to Seamless Shopping and Secure Transactions',
  description:
    'Log in to Nextall for secure access to your account. Enjoy seamless shopping, personalized experiences, and hassle-free transactions. Your trusted portal to a world of convenience awaits. Login now!',
  applicationName: 'Nextall',
  authors: [{ name: 'Nextall' }],
  keywords: 'ecommerce, Nextall, Commerce, Login Nextall, LoginFrom Nextall'
};

export default function SignIn(): React.JSX.Element {
  return (
    <Providers>
      <SimpleGuestGuard>
        <Container maxWidth="sm">
          <Card
            sx={{
              maxWidth: 560,
              m: 'auto',
              my: '80px',
              flexDirection: 'column',
              justifyContent: 'center',
              p: 3
            }}
          >
            <Stack mb={5}>
              <Typography textAlign="center" variant="h4" component="h1" gutterBottom>
                Sign in
              </Typography>
              <Typography textAlign="center" color="text.secondary">
                Sign in to your account to continue
              </Typography>
            </Stack>

            <SimpleSignInForm />
          </Card>
        </Container>
      </SimpleGuestGuard>
    </Providers>
  );
}
