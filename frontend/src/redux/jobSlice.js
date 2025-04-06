import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    allJobs: [],
    allAdminsJobs: [],
    searchedJobs: "",
    singleJob: {},
    searchedQuery: '',
    savedJobs: [],
    loading: false,
}

const jobSlice = createSlice({
    name:"job",
    initialState,
    reducers:{
        setLoading:(state,action)=>{
            state.loading = action.payload;
        },
        setJobs:(state,action)=>{
            state.allJobs = action.payload;
        },
        setSingleJob:(state,action)=>{
            state.singleJob = action.payload;
        },
        setAllAdminsJobs:(state,action)=>{
            state.allAdminsJobs = action.payload;
        },
        setSearchedJobs:(state,action)=>{
            state.searchedJobs = action.payload;
        },
        setSearchedQuery:(state,action)=>{
            state.searchedQuery = action.payload;
        },
        setSavedJobs:(state,action)=>{
            state.savedJobs = action.payload;
        },
    }
})

export const {setLoading,setJobs,setSingleJob,setAllAdminsJobs,setSearchedJobs,setSearchedQuery,setSavedJobs} = jobSlice.actions;
export default jobSlice.reducer;