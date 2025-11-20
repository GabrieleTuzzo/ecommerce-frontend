import { createSlice } from "@reduxjs/toolkit";

const errorHandlerSlice = createSlice({
    name: "errorHandler",
    initialState: { error: null, isVisible: false },
    reducers: {
        setError(state, action) {
            state.error = action.payload;
            state.isVisible = true;
        },
        clearError(state) {
            state.error = null;
            state.isVisible = false;
        }
    },
});

export const { setError, clearError } = errorHandlerSlice.actions;

export default errorHandlerSlice.reducer;