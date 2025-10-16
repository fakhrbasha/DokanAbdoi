import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Category } from '@/types/models';

// ----------------------------------------------------------------------

interface CategoriesState {
  categories: Category[];
  newCategories: Category[];
  isLoading: boolean;
}

interface SetCategoriesPayload {
  data: Category[];
  newCategories: Category[];
}

const initialState: CategoriesState = {
  categories: [],
  newCategories: [],
  isLoading: true
};

const slice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<SetCategoriesPayload>) {
      state.categories = action.payload.data;
      state.newCategories = action.payload.newCategories;
      state.isLoading = false;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { setCategories } = slice.actions;

// Types
export type { CategoriesState, SetCategoriesPayload };

// ----------------------------------------------------------------------

