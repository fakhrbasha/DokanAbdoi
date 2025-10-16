import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '@/types/models';

// ----------------------------------------------------------------------

interface CompareState {
  products: Product[];
}

const initialState: CompareState = {
  products: []
};

const slice = createSlice({
  name: 'compare',
  initialState,
  reducers: {
    addCompareProduct(state, action: PayloadAction<Product>) {
      state.products = [...state.products, action.payload];
    },
    removeCompareProduct(state, action: PayloadAction<Product>) {
      const filtered = state.products.filter((p) => p.id !== action.payload.id);
      state.products = filtered;
    },
    resetCompareProducts(state) {
      state.products = [];
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { addCompareProduct, removeCompareProduct, resetCompareProducts } = slice.actions;

// Types
export type { CompareState };

// ----------------------------------------------------------------------

