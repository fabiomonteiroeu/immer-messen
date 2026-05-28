import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type UiState = {
  locale: string;
  mobileMenuOpen: boolean;
  lgpdAccepted: boolean;
};

const initialState: UiState = {
  locale: "pt-BR",
  mobileMenuOpen: false,
  lgpdAccepted: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLocale(state, action: PayloadAction<string>) {
      state.locale = action.payload;
    },
    setMobileMenuOpen(state, action: PayloadAction<boolean>) {
      state.mobileMenuOpen = action.payload;
    },
    setLgpdAccepted(state, action: PayloadAction<boolean>) {
      state.lgpdAccepted = action.payload;
    },
  },
});

export const { setLocale, setMobileMenuOpen, setLgpdAccepted } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
