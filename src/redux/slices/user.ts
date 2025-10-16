import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@/types/models';

// ----------------------------------------------------------------------

interface UserState {
  isAuthenticated: boolean;
  user: User | null;
  count: number;
  isInitialized: boolean;
}

// initial state
const initialState: UserState = {
  isAuthenticated: false,
  user: null,
  count: 0,
  isInitialized: false
};

// slice
const slice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    signIn(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setLogout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
    setCount(state) {
      state.count = state.count + 1;
    },
    setInitialize(state) {
      state.isInitialized = true;
    },
    updateStatus(state, action: PayloadAction<string>) {
      if (state.user) {
        state.user.status = action.payload;
      }
    },
    verifyUser(state) {
      if (state.user) {
        state.user.isVerified = true;
      }
    },
    updateUserRole(state, action: PayloadAction<string>) {
      if (state.user) {
        state.user.role = action.payload;
      }
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { 
  signIn, 
  setLogout, 
  setCount, 
  setInitialize, 
  updateStatus, 
  verifyUser, 
  updateUserRole 
} = slice.actions;

// Types
export type { UserState };

// ----------------------------------------------------------------------
