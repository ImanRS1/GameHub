import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
  name: "searchQuery",
  initialState: {
    query: "",
    searchResults: [],
  },

  reducers: {
    setSearchQuery: (state, action) => {
      state.query = action.payload
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload
    },
  },
});

export const {
  setSearchQuery,
  setSearchResults,
} = searchSlice.actions;


export default searchSlice.reducer;