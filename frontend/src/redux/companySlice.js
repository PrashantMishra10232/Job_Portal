import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    singleCompany:null,
    allCompanies:[],
    searchedCompanies:"",
}

const companyslice = createSlice({
    name:"company",
    initialState,
    reducers:{
        setSingleCompany:(state,action)=>{
            state.singleCompany = action.payload;
        },
        setAllCompanies:(state,action)=>{
            state.allCompanies = action.payload;
        },
        setSearchedCompanies:(state,action)=>{
            state.searchedCompanies = action.payload;
        },
    }
})

export const {setSingleCompany,setAllCompanies,setSearchedCompanies} = companyslice.actions;
export default companyslice.reducer;