import React from 'react';
// components
import ChildCategoryForm from '@/components/forms/child-category';
import { Category } from '@/types/models';

interface AddCategoryProps {
  categories: Category[];
}

export default function AddCategory({ categories }: AddCategoryProps): React.JSX.Element {
  return (
    <div>
      <ChildCategoryForm categories={categories} />
    </div>
  );
}
