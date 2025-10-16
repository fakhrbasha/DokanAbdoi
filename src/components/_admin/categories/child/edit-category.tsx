import React from 'react';
// components
import ChildCategoryForm from '@/components/forms/child-category';
import { Category } from '@/types/models';

interface EditCategoryProps {
  data: Category;
  categories: Category[];
  isLoading: boolean;
}

export default function EditCategory({ data, categories, isLoading }: EditCategoryProps): React.JSX.Element {
  return <ChildCategoryForm data={data} categories={categories} isLoading={isLoading} />;
}
