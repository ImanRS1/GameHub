import { configureStore } from '@reduxjs/toolkit';
import dataSliceReducer from '../slices/slice';

export default configureStore({
  reducer: {
    query: dataSliceReducer,
    searchResults: dataSliceReducer,
  },
});
