import React from 'react';
// components
import CategoryForm from '@/components/forms/category';
import { Category } from '@/types/models';

interface EditCategoryProps {
  data: Category;
  isLoading: boolean;
}

export default function EditCategory({ data, isLoading }: EditCategoryProps): React.JSX.Element {
  return (
    <div>
      <CategoryForm data={data} isLoading={isLoading} />
    </div>
  );
}
