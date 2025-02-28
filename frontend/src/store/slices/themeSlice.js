import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkMode: sessionStorage.getItem('darkMode') === 'true' ? true : false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
      sessionStorage.setItem('darkMode', state.darkMode);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;