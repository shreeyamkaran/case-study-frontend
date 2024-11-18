import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice.ts";
import taskReducer from "./taskSlice.ts";

const store = configureStore({
    reducer: {
        counter: counterReducer,
        task: taskReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;