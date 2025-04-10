import { createSlice } from "@reduxjs/toolkit";

export const storedAuthData = () => {
    try {
        const storedData = localStorage.getItem("loggedInUser");
        
        
        if (!storedData || storedData === "undefined" || storedData === "null") {
            return null;
        }
        return JSON.parse(storedData);
        
    } catch (error) {
        console.error("Error parsing stored auth data:", error);
        localStorage.removeItem("loggedInUser"); // Remove corrupt data
        return null;
    }
};

const initialState = {
    user:storedAuthData() || null,
    token: localStorage.getItem('AccessToken') || null,
    loading: false, 
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("loggedInUser");
            localStorage.removeItem("AccessToken");
        },
        setToken:(state,action)=>{
            state.token=action.payload;
        }
          
    },
});

export const { setLoading, setUser, logout, setToken} = authSlice.actions;
export default authSlice.reducer;
