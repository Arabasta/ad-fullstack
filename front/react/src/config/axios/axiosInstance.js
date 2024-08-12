import axios from 'axios';
import { API_BASE_URL } from '../api/base_url';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
});


// request interceptor to add jwt token to every request's header
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// response interceptor to handle errors
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 500) {
            // Check if the error message is "Invalid JWT Token"
            //status should be 401, but i don't know why the error status is 500, so i add another check below
            //if status 401, can remove below
            const errorMessage = error.response.data.message;
            if (errorMessage === "Invalid JWT Token") {
                // JWT is invalid, redirect to login
                localStorage.removeItem('token');
                sessionStorage.removeItem('isAuthenticated');
                window.location.href = '/login'; // Redirect to login page
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
