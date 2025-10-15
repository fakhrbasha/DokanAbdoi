'use client';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export function CategoryNav() {
  const [open, setOpen] = useState(false);
  const t = useTranslations('Navbar');

  return (
    <div className="relative border-t flex">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-5 py-3 text-sm font-medium hover:text-primary transition-colors md:hidden"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <nav
        className={`${
          open ? 'flex' : 'hidden md:flex'
        } flex-col md:flex md:flex-row items-start md:items-center gap-4 md:gap-6 py-3 px-5 text-sm bg-white md:bg-transparent absolute md:static top-full left-0 w-full border-t md:border-0 shadow-md md:shadow-none z-40`}
      >
        <Link href="/" className="hover:text-primary transition-colors">
          {t('home')}
        </Link>
        <a href="#" className="hover:text-primary transition-colors">
          {t('electronics')}
        </a>
        <a href="#" className="hover:text-primary transition-colors">
          {t('appliances')}
        </a>
        <a href="#" className="hover:text-primary transition-colors">
          {t('kitchen')}
        </a>
        <a href="#" className="hover:text-primary transition-colors">
          {t('tvs')}
        </a>
        <a href="#" className="hover:text-primary transition-colors">
          {t('offers')}
        </a>
        <a href="#" className="hover:text-primary transition-colors">
          {t('contact')}
        </a>
      </nav>
    </div>
  );
}
