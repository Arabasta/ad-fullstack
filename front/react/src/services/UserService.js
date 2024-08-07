import axiosInstance from '../config/axios/axiosInstance';

const getUserDetails = async () => {

        const response = await axiosInstance.get('/v1/user/details');
        return response.data.data;
};

const updateEmail = async (email) => {
        const response = await axiosInstance.put(`/v1/user/update-email`, email);
        return response.data;
};

const updatePassword = async (passwords) => {
        const response = await axiosInstance.put(`/v1/user/update-password`, passwords);
        return response.data;

};

const UserService = {
    getUserDetails,
    updateEmail,
    updatePassword
};

export default UserService;
