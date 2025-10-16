import { IBM_Plex_Sans_Arabic, Outfit, El_Messiri } from 'next/font/google';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import './globals.css';
import { ReactNode } from 'react';
import { routing } from '@/i18n/routing';
import { NextIntlClientProvider } from 'next-intl';
// Removed theme provider
import { Footer } from './components/footer';
import { Navbar } from './components/navbar';
import { ThemeProvider } from './components/theme-provider';

// Fonts
const outfit = Outfit({ subsets: ['latin'], display: 'swap' });
const elMessiri = El_Messiri({ subsets: ['arabic'], display: 'swap' });

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html dir={locale == 'ar' ? 'rtl' : 'ltr'} lang={locale}>
      <head />
      <body
        className={locale === 'ar' ? elMessiri.className : outfit.className}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Navbar />
            {children}
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
