import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword } from '@firebase/auth';

export const signIn = createAsyncThunk('auth/signIn', async ({ auth, email, password }) => {
    return await signInWithEmailAndPassword(auth, email, password);
});

export const authSlice = createSlice({
    name: 'auth',
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signIn.fulfilled, (_, action) => {
            return { ...action.payload.user }
        }),
        builder.addCase(signIn.rejected, (_, action) => {
            return action.error;
        })
    }
});

// export const { getAuthReducer } = authSlice.actions;
export default authSlice.reducer;