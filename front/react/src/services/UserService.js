import axiosInstance from '../config/axios/axiosInstance';

const getUserDetails = async () => {
    try {
        const response = await axiosInstance.get('/v1/user/details');
        return response.data.data; // 假设API返回的数据在data属性中
    } catch (error) {
        console.error('Error fetching user details', error);
        throw error;
    }
};

const updateEmail = async (username, emailDTO) => {
    try {
        const response = await axiosInstance.put(`/v1/user/update-email`, emailDTO);
        return response.data;
    } catch (error) {
        console.error('Error updating email', error);
        throw error;
    }
};

const updatePassword = async (username, updatePasswordDTO) => {
    try {
        console.log('Sending update password request for user:', username);
        const response = await axiosInstance.put(`/v1/user/update-password`, updatePasswordDTO);
        return response.data;
    } catch (error) {
        console.error('Error updating password', error);
        throw error;
    }
};

const UserService = {
    getUserDetails,
    updateEmail,
    updatePassword
};

export default UserService;
