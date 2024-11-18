import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface TaskState {
    loading: boolean,
    error: boolean,
    tasks: Task[],
    projects: Project[]
}

interface Task {
    id: number,
    title: string,
    description: string,
    date: string,
    duration: number,
    projectId: number,
    projectName: string,
    appraisalStatus: string,
}

interface Project {
    id: number,
    name: string
}

export const fetchTasks = createAsyncThunk("fetchTasks", async () => {
    const response = await fetch(`http://localhost:8080/api/v1/employees/1/tasks`);
    const tasks = await response.json();
    return tasks;
});

export const fetchProjects = createAsyncThunk("fetchProjects", async () => {
    const response = await fetch(`http://localhost:8080/api/v1/employees/1/projects`);
    const projects = await response.json();
    return projects;
});

export const taskSlice = createSlice({
    name: "task",
    initialState: {
        loading: false,
        error: false,
        tasks: [],
        projects: []
    },
    reducers: {
        createTask: (state, action) => {
            const task = action.payload;
            state.tasks.push(task);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTasks.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.tasks = action.payload;
        });
        builder.addCase(fetchTasks.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
            console.log(action.payload);
        });

        builder.addCase(fetchProjects.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchProjects.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.projects = action.payload;
        });
        builder.addCase(fetchProjects.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
            console.log(action.payload);
        });
    }
});

export const { createTask } = taskSlice.actions;
export default taskSlice.reducer;