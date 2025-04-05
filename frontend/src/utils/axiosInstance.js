import axios from "axios";
import store from "@/redux/store";
import { checkAndRefreshToken } from "@/redux/authSlice";

const apiClient = axios.create({
    baseURL: USER_API_ENDPOINT,
    withCredentials: true,
});

apiClient.interceptors.request.use(async (config) => {
    const { dispatch, getState } = store;
    await checkAndRefreshToken(dispatch, getState); // Ensure token is valid before each request
    const state = store.getState().auth;
    if (state.token) {
        config.headers.Authorization = `Bearer ${state.token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default apiClient;