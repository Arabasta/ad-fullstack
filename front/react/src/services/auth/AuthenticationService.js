import axios from 'axios';
import { LOGIN_URL, REGISTER_URL } from '../../config/api/auth';
import {API_BASE_URL} from "../../config/api/base";

const register = (username, password, email) => {
    return axios.post(REGISTER_URL, {
        username,
        password,
        email
    });
};

const login = (username, password) => {
    return axios.post(LOGIN_URL, {
        username,
        password,
    }).then(response => {
        if (response.data.jwtToken) {
            setToken(response.data.jwtToken);
        }
        return response.data;
    });
};

const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
};

const setToken = (token) => {
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const refreshToken = async () => {
    const response = await axios.post(`${API_BASE_URL}/refresh-token`);
    setToken(response.data.token);
};

const authenticationService = {
    register,
    login,
    logout,
    refreshToken,
};

export default authenticationService;