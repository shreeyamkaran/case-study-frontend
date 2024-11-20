import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice.ts";
import taskReducer from "./taskSlice.ts";
import employeeReducer from "./employeeSlice.ts";
import managerReducer from "./managerSlice.ts";

const store = configureStore({
    reducer: {
        counter: counterReducer,
        task: taskReducer,
        employee: employeeReducer,
        manager: managerReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;