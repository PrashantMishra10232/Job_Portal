import axios from "axios";
import { USER_API_ENDPOINT } from "./constant";
import store from "@/redux/store";
import { setToken, logout } from "@/redux/authSlice";

const axiosInstance = axios.create({
    baseURL: USER_API_ENDPOINT,
    withCredentials: true,
});

axiosInstance.interceptors.request.use(async (config) => {
    const token = store.getState().auth.token;
    console.log("token",token);
    
    if(token){
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(
    (response)=>response,
    async(error)=>{
        const originalRequest = error.config;

        //if access token expired
        if(error.response && error.response.status === 401 && !originalRequest._retry){
            originalRequest._retry = true;

            try {
                //calling the refresh token endpoint
                const res = await axios.post(`${USER_API_ENDPOINT}/refresh_token`,{},{withCredentials:true})

                //store the new access token
                const{accessToken} = res.data.data;
                console.log("accessToken",accessToken);
                

                store.dispatch(setToken(accessToken)) //stored in redux
                // localStorage.setItem('AccessToken',accessToken); //stored in local storage

                //set the new access token in authorization header
                originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

                //retry the original request with the new token
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error('Refresh Token Error:' ,refreshError);
                // localStorage.removeItem('AccessToken');
                store.dispatch(logout());
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
)

export default axiosInstance;