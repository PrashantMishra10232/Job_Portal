import { createSlice } from "@reduxjs/toolkit";

export const storedJobData = () => {
  try {
    const storedData = localStorage.getItem("savedJobs");

    if (!storedData || storedData === "undefined" || storedData === "null") {
      return null;
    }
    return JSON.parse(storedData);
  } catch (error) {
    console.error("Error parsing stored job data:", error);
    localStorage.removeItem("savedJobs"); // Remove corrupt data
    return null;
  }
};
const initialState = {
  allJobs: [],
  allAdminsJobs: [],
  searchedJobs: "",
  singleJob: {},
  searchedQuery: "",
  savedJobs: storedJobData() || [],
  loading: false,
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAllAdminsJobs: (state, action) => {
      state.allAdminsJobs = action.payload;
    },
    setSearchedJobs: (state, action) => {
      state.searchedJobs = action.payload;
    },
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
    setSavedJobs: (state, action) => {
      if (!Array.isArray(state.savedJobs)) {
        state.savedJobs = [];
      }
      const alreadySaved = state.savedJobs.find(
        (job) => job._id === action.payload._id
      );
      if (!alreadySaved) {
        state.savedJobs.push(action.payload);
      }
    },
  },
});

export const {
  setLoading,
  setJobs,
  setSingleJob,
  setAllAdminsJobs,
  setSearchedJobs,
  setSearchedQuery,
  setSavedJobs,
} = jobSlice.actions;
export default jobSlice.reducer;
