import { configureStore } from '@reduxjs/toolkit';

import menuReducer from './components/Menu/menuSlice';
import messengerReducer from './components/Messenger/messengerSlice';
import authReducer from './containers/Auth/authSlice';

export default configureStore({
  reducer: {
      menu: menuReducer,
      messenger: messengerReducer,
      auth: authReducer,
  },
  // middleware: (getDefaultMiddleware) => 
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       // ignoredActions: ['auth/signIn/fulfilled'],
  //       // ignoredPaths: ['auth.proactiveRefresh', 'auth.auth']
  //     },
  //   })
});