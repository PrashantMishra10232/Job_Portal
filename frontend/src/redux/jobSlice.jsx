import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    allJobs: [],
    singleJob: {},
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
        }
    }
})

export const {setLoading,setJobs,setSingleJob} = jobSlice.actions;
export default jobSlice.reducer;