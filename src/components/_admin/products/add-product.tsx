import React from 'react';
// components
import ProductForm from '@/components/forms/product';

interface AddProductProps {
  [key: string]: any;
}

export default function AddProduct(props: AddProductProps): React.JSX.Element {
  return <ProductForm {...props} />;
}
