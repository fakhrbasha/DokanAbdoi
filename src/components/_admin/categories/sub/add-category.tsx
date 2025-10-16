import React from 'react';
// components
import SubCategoryForm from '@/components/forms/sub-category';
import { Category } from '@/types/models';

interface AddCategoryProps {
  categories: Category[];
}

export default function AddCategory({ categories }: AddCategoryProps): React.JSX.Element {
  return (
    <div>
      <SubCategoryForm categories={categories} />
    </div>
  );
}
