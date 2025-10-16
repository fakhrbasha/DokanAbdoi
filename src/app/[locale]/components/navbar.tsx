'use client';

import { ShoppingCart, Heart, Search, Menu, User } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
// Removed theme toggle
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { useCartStore, useWishlistStore } from '../lib/store';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import { CategoryNav } from './CategoryNav';
import Image from 'next/image';

export function Navbar() {
  const cartCount = useCartStore((state: any) => state.getTotalItems());
  const wishlistCount = useWishlistStore((state: any) => state.items.length);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  // const t = useTranslations('Navbar');

  const toggleLocale = () => {
    const nextLocale = locale === 'en' ? 'ar' : 'en';
    router.push(pathname, { locale: nextLocale });
  };

  return (
    <>
      {/* Header */}
      <section className="bg-transparent border-b py-2 text-sm">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <button
            onClick={toggleLocale}
            className="flex items-center gap-2 font-medium text-gray-700 hover:text-blue-600 transition"
          >
            {locale === 'ar' ? 'العربية' : 'English'}
          </button>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              تسجيل الدخول
            </Link>
            <span className="text-gray-400">أو</span>
            <Link
              href="/register"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              إنشاء حساب
            </Link>
          </div>
        </div>
      </section>

      <header className="relative top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* 🔹 Logo */}
            <Link
              href="/"
              className="flex items-center space-x-2 flex-shrink-0 overflow-hidden"
            >
              <img
                src={'/logo.png'}
                alt="logo"
                width={500}
                height={500}
                className="w-44 h-24"
              />
            </Link>

            {/* 🔹 Search (يتوسع وياخد النص كله) */}
            <div className="flex-1 mx-4">
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full"
              />
            </div>

            {/* 🔹 Icons */}
            <div className="flex items-center space-x-2 flex-shrink-0">
              {/* Removed theme toggle */}

              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </Link>

              <Sheet>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <nav className="flex flex-col space-y-4 mt-8">
                    {[
                      { name: 'Home', href: '/' },
                      { name: 'Products', href: '/products' },
                      { name: 'Brands', href: '/brands' },
                      { name: 'Shops', href: '/shops' },
                      { name: 'Contact', href: '/contact' },
                    ].map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-lg font-medium hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Category Bar */}
      <CategoryNav />
    </>
  );
}
