import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const fetchEmployeesUnderManager = createAsyncThunk("fetchEmployeesUnderManager", async (managerId: number) => {
    const response = await fetch(`http://localhost:8080/api/v1/employees/managers/${ managerId }`);
    const data = await response.json();
    return data;
});

interface ManagerState {
    loading: boolean,
    error: boolean,
    employeesUnderManager: Employee[]
}

interface Employee {
    id: number,
    name: string,
    username: string,
    designation: {
        id: number,
        name: string,
        skills: [{
            id: number,
            name: string,
            category: string
        }]
    },
    dob: string,
    gender: string,
    doj: string,
    ratings: number,
    location: string
}

const initialState: ManagerState = {
    loading: false,
    error: false,
    employeesUnderManager: []
}

export const managerSlice = createSlice({
    name: "manager",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchEmployeesUnderManager.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchEmployeesUnderManager.fulfilled, (state, action: PayloadAction<Employee[]>) => {
            state.loading = false;
            state.error = false;
            state.employeesUnderManager = action.payload;
        });
        builder.addCase(fetchEmployeesUnderManager.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
            console.log(action.payload);
        });
    }
});

export default managerSlice.reducer;