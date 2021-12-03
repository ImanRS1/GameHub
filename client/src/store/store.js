import { configureStore } from '@reduxjs/toolkit';
import searchSliceReducer from '../slices/SearchSlice';
import userSliceReducer from '../slices/UserSlice'

export default configureStore({
  reducer: {
    search: searchSliceReducer,
    user: userSliceReducer
  },
});
