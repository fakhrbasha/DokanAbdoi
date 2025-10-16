import React from 'react';
import HeaderBreadcrumbs from '@/components/header-breadcrumbs';
import CouponCodesMain from '@/components/_admin/coupon-codes/coupon-code-list';

export default function CouponCodesPage(): React.JSX.Element {
  return (
    <>
      <HeaderBreadcrumbs
        admin
        heading="Coupon codes"
        links={[{ name: 'Dashboard', href: '/admin/dashboard' }, { name: 'Coupon codes' }]}
        action={{ href: `/admin/coupon-codes/add`, title: 'Add Coupon code' }}
      />
      <CouponCodesMain />
    </>
  );
}

