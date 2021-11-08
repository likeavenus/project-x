import { configureStore } from '@reduxjs/toolkit';

import menuReducer from './components/Menu/menuSlice';
import messengerReducer from './components/Messenger/messengerSlice';

export default configureStore({
  reducer: {
      menu: menuReducer,
      messenger: messengerReducer,
  }
});