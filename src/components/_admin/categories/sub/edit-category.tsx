import React from 'react';
// components
import SubCategoryForm from '@/components/forms/sub-category';
import { Category } from '@/types/models';

interface EditCategoryProps {
  data: Category;
  categories: Category[];
  isLoading: boolean;
}

export default function EditCategory({ data, categories, isLoading }: EditCategoryProps): React.JSX.Element {
  return <SubCategoryForm data={data} categories={categories} isLoading={isLoading} />;
}
