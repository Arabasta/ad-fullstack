import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOGIN_URL, REGISTER_URL } from '../config/api-url/auth_url';

const register = (registrationData) => {
    return axios.post(REGISTER_URL, registrationData).then(response => {
        const token = response.data.data.jwtToken;
        if (token) {
            setToken(token);
        }
        return response.data;
    });
};

const login = (username, password) => {
    return axios.post(LOGIN_URL, {
        username,
        password,
    }).then(response => {
        const token = response.data.data.jwtToken;
        if (token) {
            setToken(token);
        }
        return response.data;
    });
};

const logout = () => {
    AsyncStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
};

const setToken = (token) => {
    AsyncStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const authenticationService = {
    register,
    login,
    logout,
};

export default authenticationService;