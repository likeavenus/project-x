import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMessages, setMessageById } from '../../api';

export const fetchMessages = createAsyncThunk('messages/getMessages', async () => {
    const response = await getMessages();
    return response;
});

export const setMessage = createAsyncThunk('message/setMessageById', async (id) => {
    await setMessageById(id);
    const response = await getMessages();
    return response;
});

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
        }),
        builder.addCase(setMessage.fulfilled, (state, action) => {
            return state = {
                messages: action.payload,
                status: 'idle',
                error: null,
            }
        })
    }
});

// export const { setMessages, setMessageById } = messengerSlice.actions;
export default messengerSlice.reducer;