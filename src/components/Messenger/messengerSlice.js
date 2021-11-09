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
        isMessageOpened: false,
        currentMessage: null,
    },
    reducers: {
        showMessage: (state, action) => ({ ...state, isMessageOpened: true, currentMessage: action.payload }),
        closeMessage: state => ({ ...state, isMessageOpened: false, currentMessage: null }),
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMessages.fulfilled, (state, action) => {
           return { ...state, messages: action.payload }
        }),
        builder.addCase(fetchMessages.rejected, (state, action) => {
            return { ...state, error: action.payload }
        }),
        builder.addCase(fetchMessages.pending, (state) => {
            return { ...state, status: 'loading' }
        }),
        builder.addCase(setMessage.fulfilled, (state, action) => {
            return { ...state, messages: action.payload }
        })
    }
});

export const { showMessage, closeMessage } = messengerSlice.actions;
export default messengerSlice.reducer;