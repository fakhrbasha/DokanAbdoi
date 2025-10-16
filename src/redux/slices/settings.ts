import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// ----------------------------------------------------------------------

interface SettingsState {
  direction: 'ltr' | 'rtl';
  openSidebar: boolean;
  currency: string;
  baseCurrency: string;
  rate: number;
  bunnyStorageZone: string;
  bunnyAccessKey: string;
  isInitialized: boolean;
}

interface ChangeCurrencyPayload {
  currency: string;
  baseCurrency: string;
  rate: number;
}

interface InitializeSettingsPayload {
  bunnyStorageZone: string;
  bunnyAccessKey: string;
  currency: string;
  baseCurrency: string;
  rate: number;
}

const initialState: SettingsState = {
  direction: 'ltr',
  openSidebar: false,
  currency: '',
  baseCurrency: '',
  rate: 1,
  bunnyStorageZone: '',
  bunnyAccessKey: '',
  isInitialized: false
};

const slice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    // Removed theme mode reducer
    toggleSidebar(state) {
      state.openSidebar = !state.openSidebar;
    },
    setDirection(state, action: PayloadAction<SettingsState['direction']>) {
      state.direction = action.payload;
    },
    handleChangeCurrency(state, action: PayloadAction<ChangeCurrencyPayload>) {
      state.currency = action.payload.currency;
      state.baseCurrency = action.payload.baseCurrency;
      state.rate = action.payload.rate;
    },
    initializeSettings(state, action: PayloadAction<InitializeSettingsPayload>) {
      state.bunnyStorageZone = action.payload.bunnyStorageZone;
      state.bunnyAccessKey = action.payload.bunnyAccessKey;
      state.currency = action.payload.currency;
      state.baseCurrency = action.payload.baseCurrency;
      state.rate = action.payload.rate;
      state.isInitialized = true;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const {
  setDirection,
  toggleSidebar,
  handleChangeCurrency,
  initializeSettings
} = slice.actions;

// Types
export type { SettingsState, ChangeCurrencyPayload, InitializeSettingsPayload };

// ----------------------------------------------------------------------
