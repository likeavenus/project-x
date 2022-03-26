import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@firebase/auth';

export const signIn = createAsyncThunk('auth/signIn', async ({ auth, email, password }) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return {
        accessToken: res.user.accessToken,
        email: res.user.email,
        uid: res.user.uid,
    };
});

export const registration = createAsyncThunk('auth/registration', async ({ auth, email, password }) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    return {
        accessToken: res.user.accessToken,
        email: res.user.email,
        uid: res.user.uid,
    }
});

const initialState = {
    accessToken: null,
    email: '',
    uid: '',
    error: null,
};


export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signIn.fulfilled, (_, action) => {
            console.log('AUTH DATA: ', action.payload)
            return { 
                error: null, 
                accessToken: action.payload.accessToken,
                email: action.payload.email,
                uid: action.payload.uid
             }
        }),
        builder.addCase(signIn.rejected, (_, action) => {
            return { 
                accessToken: null,
                email: '',
                uid: '',
                error: { ...action.error }
             };
        }),
        builder.addCase(registration.fulfilled, (_, action) => {
            return { 
                error: null,
                accessToken: action.payload.accessToken,
                email: action.payload.email,
                uid: action.payload.uid
            }
        }),
        builder.addCase(registration.rejected, (_, action) => {
            console.log('rejected: ', action)
            return { 
                accessToken: null,
                email: '',
                uid: '',
                error: { ...action.error }
             };
        })
    }
});

// export const { getAuthReducer } = authSlice.actions;
export default authSlice.reducer;