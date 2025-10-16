import React from 'react';
// components
import BrandsForm from '@/components/forms/brand';
import { Brand } from '@/types/models';

interface EditBrandProps {
  data?: Brand;
  isLoading?: boolean;
}

export default function EditBrand({ data, isLoading }: EditBrandProps): React.JSX.Element {
  return (
    <div>
      <BrandsForm data={data} isLoading={isLoading} />
    </div>
  );
}
