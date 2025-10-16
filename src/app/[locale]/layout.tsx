import { IBM_Plex_Sans_Arabic, Outfit, El_Messiri } from 'next/font/google';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import './globals.css';
import { ReactNode } from 'react';
import { routing } from '@/i18n/routing';
import { NextIntlClientProvider } from 'next-intl';
// Removed theme provider
import { Footer } from './components/footer';

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
    <div dir={locale == 'ar' ? 'rtl' : 'ltr'} className={locale === 'ar' ? elMessiri.className : outfit.className}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
        <Footer />
      </NextIntlClientProvider>
    </div>
  );
}
