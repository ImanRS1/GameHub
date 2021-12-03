import { createSlice } from '@reduxjs/toolkit';

export const dataSlice = createSlice({
  name: "searchQuery",
  initialState: {
    query: "",
    searchResults: []
  },

  reducers: {
    setSearchQuery: (state, action) => {
      state.query = action.payload
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload
    }
  },
});

export const {
  setSearchQuery,
  setSearchResults
} = dataSlice.actions;

export default dataSlice.reducer;
