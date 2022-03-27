import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from '@firebase/auth';

export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({ auth, email, password }) => {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const { accessToken, displayName, photoUrl } = user;
    return { accessToken, displayName, email, photoUrl };
  },
);

export const registration = createAsyncThunk(
  'auth/registration',
  async ({ auth, email, password }) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    return res.user;
  },
);

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? {
      ...user,
      isLoggedIn: true,
    }
  : {
      accessToken: null,
      displayName: null,
      email: null,
      photoUrl: null,
      isLoggedIn: false,
    };

export const authSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (_, action) => {
      console.log('AUTH DATA: ', action.payload);
      const { accessToken, displayName, email, photoUrl } = action.payload;
      return {
        accessToken,
        displayName,
        email,
        photoUrl,
        isLoggedIn: true,
      };
    }),
      builder.addCase(signIn.rejected, (_, action) => {
        return {
          accessToken: null,
          displayName: null,
          email: null,
          photoUrl: null,
          isLoggedIn: false,
        };
      }),
      builder.addCase(registration.fulfilled, (_, action) => {
        const { accessToken, displayName, email, photoUrl } = action.payload;
        return {
          accessToken,
          displayName,
          email,
          photoUrl,
          isLoggedIn: true,
        };
      }),
      builder.addCase(registration.rejected, (_, action) => {
        console.log('rejected: ', action);
        return {
          user: null,
          isLoggedIn: false,
        };
      });
  },
});

// export const { getAuthReducer } = authSlice.actions;
export default authSlice.reducer;
