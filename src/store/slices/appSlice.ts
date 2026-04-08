import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projects: [],
  isLoadingProjects: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
    setLoadingProjects: (state, action) => {
      state.isLoadingProjects = action.payload;
    },
  },
});

export const { setProjects, setLoadingProjects } = appSlice.actions;

export default appSlice.reducer;
