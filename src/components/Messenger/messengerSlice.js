import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMessages } from '../../api';

export const fetchMessages = createAsyncThunk('messages/setMessages', async () => {
    const response = await getMessages();
    return response;
})
export const messengerSlice = createSlice({
    name: 'messenger',
    initialState: {
        messages: [],
        status: 'idle',
        error: {},
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMessages.fulfilled, (state, action) => {
           return state = {
            messages: action.payload,
            status: 'idle',
            error: null,
           }
        }),
        builder.addCase(fetchMessages.rejected, (state, action) => {
            return state = {
                messages: [],
                status: 'idle',
                error: action.payload,
            }
        }),
        builder.addCase(fetchMessages.pending, (state) => {
             return state = {
                messages: [],
                status: 'loading',
                error: null,
            }
        })
    }
});

export const { setMessages } = messengerSlice.actions;
export default messengerSlice.reducer;