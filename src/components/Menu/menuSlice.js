import { createSlice } from '@reduxjs/toolkit';

export const menuSlice = createSlice({
    name: 'menu',
    initialState: {
        value: false,
    },
    reducers: {
        toggle: state => {
            state.value = !state.value;
        },
        open: state => {
            state.value = true;
        },
        close: state => {
            state.value = false;
        }
    }
});

export const { toggle, open, close } = menuSlice.actions;
export default menuSlice.reducer;