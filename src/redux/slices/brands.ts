import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Brand } from '@/types/models';

// ----------------------------------------------------------------------

interface BrandsState {
  brands: Brand[];
  isLoading: boolean;
}

const initialState: BrandsState = {
  brands: [],
  isLoading: true
};

const slice = createSlice({
  name: 'brands',
  initialState,
  reducers: {
    setBrands(state, action: PayloadAction<Brand[]>) {
      state.brands = action.payload;
      state.isLoading = false;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { setBrands } = slice.actions;

// Types
export type { BrandsState };

// ----------------------------------------------------------------------

