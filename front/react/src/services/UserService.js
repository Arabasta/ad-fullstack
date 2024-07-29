import axiosInstance from '../config/axios/axiosInstance';

const getUserDetails = async () => {
    try {
        const response = await axiosInstance.get('/api/v1/user/details');
        return response.data;
    } catch (error) {
        console.error('Error fetching user details', error);
        throw error;
    }
};

const updateEmail = async (username, emailDTO) => {
    return await axiosInstance.put(`/api/v1/user/update-email`, emailDTO);
};

const updatePassword = async (username, updatePasswordDTO) => {
    return await axiosInstance.put(`/api/v1/user/update-password`, updatePasswordDTO);
};

const UserService = {
    getUserDetails,
    updateEmail,
    updatePassword
};

export default UserService;
