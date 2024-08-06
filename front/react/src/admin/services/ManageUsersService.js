import axiosInstance from "../../config/axios/axiosInstance";

// get user list
const getUsers = async (search = '') => {
    const url = search ? `/v1/admin/manage-users/all?search=${search}` : '/v1/admin/manage-users/all';
    return await axiosInstance.get(url);
};

// lock user
const lockUser = async (username) => {
    const url = `/v1/admin/manage-users/lock?username=${username}`;
    return await axiosInstance.post(url);
};

// unlock user
const unlockUser = async (username) => {
    const url = `/v1/admin/manage-users/unlock?username=${username}`;
    return await axiosInstance.post(url);
};


const ManageUsersService = {
    getUsers,
    lockUser,
    unlockUser,
};

export default ManageUsersService;
