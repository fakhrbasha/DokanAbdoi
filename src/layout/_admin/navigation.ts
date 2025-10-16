import {
  LuLayoutDashboard,
  LuPackage,
  LuShoppingBag,
  LuUsers,
  LuTag,
  LuBuilding2,
  LuTicket,
  LuCoins,
  LuSettings,
  LuMail,
  LuReceipt,
  LuShield
} from 'react-icons/lu';
import { IconType } from 'react-icons';

export interface NavigationItem {
  title: string;
  path: string;
  icon: IconType;
  children?: NavigationItem[];
}

export const adminNavigation: NavigationItem[] = [
  {
    title: 'Dashboard',
    path: '/admin/dashboard',
    icon: LuLayoutDashboard
  },
  {
    title: 'Products',
    path: '/admin/products',
    icon: LuPackage
  },
  {
    title: 'Orders',
    path: '/admin/orders',
    icon: LuShoppingBag
  },
  {
    title: 'Users',
    path: '/admin/users',
    icon: LuUsers
  },
  {
    title: 'Categories',
    path: '/admin/categories',
    icon: LuTag
  },
  {
    title: 'Brands',
    path: '/admin/brands',
    icon: LuBuilding2
  },
  {
    title: 'Shops',
    path: '/admin/shops',
    icon: LuShield
  },
  {
    title: 'Coupon Codes',
    path: '/admin/coupon-codes',
    icon: LuTicket
  },
  {
    title: 'Currencies',
    path: '/admin/currencies',
    icon: LuCoins
  },

  {
    title: 'Newsletter',
    path: '/admin/newsletter',
    icon: LuMail
  },
  {
    title: 'Payments',
    path: '/admin/payments',
    icon: LuReceipt
  },
  {
    title: 'Payouts',
    path: '/admin/payouts',
    icon: LuReceipt
  },
  {
    title: 'Settings',
    path: '/admin/settings',
    icon: LuSettings
  }
];
