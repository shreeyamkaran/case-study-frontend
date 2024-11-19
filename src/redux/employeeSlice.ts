import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchEmployeeDetails = createAsyncThunk("fetchEmployeeDetails", async (employeeId: number) => {
    const response = await fetch(`http://localhost:8080/api/v1/employees/${ employeeId }`);
    const data = await response.json();
    return data;
});

export const fetchEmployeeProjects = createAsyncThunk("fetchEmployeeProjects", async (employeeId: number) => {
    const response = await fetch(`http://localhost:8080/api/v1/employees/${ employeeId }/projects`);
    const data = await response.json();
    return data;
});

export const fetchEmployeeSkillsAndRatings = createAsyncThunk("fetchEmployeeSkillsAndRatings", async (employeeId: number) => {
    const response = await fetch(`http://localhost:8080/api/v1/employees/skills/ratings/${ employeeId }`);
    const data = await response.json();
    return data;
});

export const employeeSlice = createSlice({
    name: "employee",
    initialState: {
        loading: false,
        error: false,
        employeeDetails: null,
        projects: [],
        skillsAndRatings: []
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchEmployeeDetails.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchEmployeeDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.employeeDetails = action.payload;
        });
        builder.addCase(fetchEmployeeDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
            console.log(action.payload);
        });

        builder.addCase(fetchEmployeeProjects.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchEmployeeProjects.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.projects = action.payload;
        });
        builder.addCase(fetchEmployeeProjects.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
            console.log(action.payload);
        });

        builder.addCase(fetchEmployeeSkillsAndRatings.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchEmployeeSkillsAndRatings.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.skillsAndRatings = action.payload;
        });
        builder.addCase(fetchEmployeeSkillsAndRatings.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
            console.log(action.payload);
        });
    }
});

export default employeeSlice.reducer;