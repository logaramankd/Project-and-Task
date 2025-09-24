import { createSlice } from "@reduxjs/toolkit";
import { projects as initialProjects } from "../../utils/projects";

const initialState = {
  projects: JSON.parse(localStorage.getItem("projects")) || initialProjects,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload;
      localStorage.setItem("projects", JSON.stringify(state.projects));
    },
    addProject: (state, action) => {
      state.projects.push(action.payload);
      localStorage.setItem("projects", JSON.stringify(state.projects));
    },
    updateProject: (state, action) => {
      state.projects = state.projects.map(p =>
        p.id === action.payload.id ? action.payload : p
      );
      localStorage.setItem("projects", JSON.stringify(state.projects));
    },
    deleteProject: (state, action) => {
      state.projects = state.projects.filter(p => p.id !== action.payload);
      localStorage.setItem("projects", JSON.stringify(state.projects));
    },
    addTask: (state, action) => {
      const { projectId, task } = action.payload;
      state.projects = state.projects.map(p =>
        p.id === projectId ? { ...p, tasks: [...p.tasks, task] } : p
      );
      localStorage.setItem("projects", JSON.stringify(state.projects));
    },
    updateTask: (state, action) => {
      const { projectId, task } = action.payload;
      state.projects = state.projects.map(p =>
        p.id === projectId
          ? {
            ...p,
            tasks: p.tasks.map(t => (t.id === task.id ? task : t)),
          }
          : p
      );
      localStorage.setItem("projects", JSON.stringify(state.projects));
    },
    deleteTask: (state, action) => {
      const { projectId, taskId } = action.payload;
      state.projects = state.projects.map(p =>
        p.id === projectId
          ? { ...p, tasks: p.tasks.filter(t => t.id !== taskId) }
          : p
      );
      localStorage.setItem("projects", JSON.stringify(state.projects));
    },
  },
});

export const { setProjects, addProject, updateProject, deleteProject, addTask, updateTask, deleteTask } = projectsSlice.actions;
export const selectProjects = (state) => state.projects.projects
export default projectsSlice.reducer;