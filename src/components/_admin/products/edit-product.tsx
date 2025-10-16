'use client';
import React from 'react';
// components
import ProductForm from '@/components/forms/product';
// api
import * as api from '@/services';
import { useQuery } from '@tanstack/react-query';
import { Brand, Category, Shop } from '@/types/models';

interface EditProductProps {
  brands: Brand[];
  categories: Category[];
  slug: string;
  shops?: Shop[];
  isVendor?: boolean;
}

export default function EditProduct({ brands, categories, slug, shops, isVendor }: EditProductProps): React.JSX.Element {
  const { data, isPending: isLoading } = useQuery({
    queryKey: ['coupon-codes', slug, isVendor], // Added slug and isVendor as dependencies
    queryFn: () => api[isVendor ? 'getVendorProductBySlug' : 'getProductBySlug'](slug)
  });
  return (
    <ProductForm
      shops={shops}
      brands={brands}
      categories={categories}
      currentProduct={data?.data}
      isLoading={isLoading}
      isVendor={isVendor}
    />
  );
}
