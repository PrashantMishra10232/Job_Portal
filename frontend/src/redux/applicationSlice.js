import { createSlice } from "@reduxjs/toolkit";

const initialState={
    allApplications:[],
    searchedApplications:"",


    allApplicants:null,
    appliedJobs:[],
}

const applicationSlice = createSlice({
    name:"applicants",
    initialState,
    reducers:{
        setAllApplicants:(state,action)=>{
            state.allApplicants=action.payload;
        },
        setAppliedJobs:(state,action)=>{
            state.appliedJobs = action.payload;
        },
        setAllApplications:(state,action)=>{
            state.allApplications = action.payload;
        },
        setSearchedApplications:(state,action)=>{
            state.searchedApplications = action.payload;
        }
    }
    
})

export const {setAllApplicants,setAppliedJobs,setAllApplications,searchedApplications} = applicationSlice.actions;
export default applicationSlice.reducer;