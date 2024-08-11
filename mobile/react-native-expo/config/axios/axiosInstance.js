import axios from 'axios';
import { API_BASE_URL } from '../api-url/base_url';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
});

// request interceptor to add jwt token to every request's header
axiosInstance.interceptors.request.use(
    async (config) => {
        try {
            // Get jwt token from AsyncStorage
            const token = await AsyncStorage.getItem('token');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        } catch (error) {
            console.error('Error getting token from AsyncStorage', error);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
