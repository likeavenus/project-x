import { configureStore } from '@reduxjs/toolkit';

import menuReducer from './components/Menu/menuSlice';

export default configureStore({
  reducer: {
      menu: menuReducer,
  }
});