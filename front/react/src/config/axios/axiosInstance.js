import axios from 'axios';
import { API_BASE_URL } from '../api/base';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
});

// request interceptor to add jwt token to every request's header
axiosInstance.interceptors.request.use(
    (config) => {
        // Get jwt token from localStorage
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

export default axiosInstance;
