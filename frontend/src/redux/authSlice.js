import { USER_API_ENDPOINT } from "@/utils/constant";
import { createSlice } from "@reduxjs/toolkit";
// import store from "@/redux/store"; // Import your Redux store

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
    token: null,
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
        setToken: (state,action)=>{
            state.token = action.payload;
        }
    },
});


export const refreshAccessToken = async()=>{
    try {
        const res = await axios.post(`${USER_API_ENDPOINT}/refresh_token`,{withCredentials: true});
        dispatch(setToken(res.data.data));
    } catch (error) {
        console.error("Refresh Token expired login again")
        dispatch();
    }
}

export const checkAndRefreshToken = async (dispatch, getState) => {
    const { auth } = getState();
    const { token } = auth;
    if (!token) {
        return;
    }
    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
        await refreshAccessToken(dispatch);
    }
};



export const { setLoading, setUser, logout, setToken} = authSlice.actions;
export default authSlice.reducer;
