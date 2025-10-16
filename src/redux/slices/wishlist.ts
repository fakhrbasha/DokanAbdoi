import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '@/types/models';

// ----------------------------------------------------------------------

interface WishlistState {
  wishlist: Product[];
}

const initialState: WishlistState = {
  wishlist: []
};

const slice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setWishlist(state, action: PayloadAction<Product[]>) {
      state.wishlist = action.payload;
    },
    resetWishlist(state) {
      state.wishlist = [];
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { setWishlist, resetWishlist } = slice.actions;

// Types
export type { WishlistState };

// ----------------------------------------------------------------------
