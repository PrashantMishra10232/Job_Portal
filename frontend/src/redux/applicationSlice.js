import { createSlice } from "@reduxjs/toolkit";

const initialState={
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
        }
    }
    
})

export const {setAllApplicants,setAppliedJobs} = applicationSlice.actions;
export default applicationSlice.reducer;