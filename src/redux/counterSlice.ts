import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface CounterState {
    count: number
}

export const counterSlice = createSlice({
    name: "counter",
    initialState: {
        count: 0
    },
    reducers: {
        increment: (state) => {
            state.count++;
        }
    }
});

export const { increment } = counterSlice.actions;
export const selectCount = (state: RootState) => state.counter.count;
export default counterSlice.reducer;