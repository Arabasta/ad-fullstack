import axios from 'axios';
import { LOGIN_URL, REGISTER_URL } from '../../config/api/auth';

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
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
};

const setToken = (token) => {
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// for future reference, no refresh token endpoint rn
// const refreshToken = async () => {
//     const response = await axios.post(`${API_BASE_URL}/refresh-token`);
//     setToken(response.data.token);
// };

const authenticationService = {
    register,
    login,
    logout,
};

export default authenticationService;
