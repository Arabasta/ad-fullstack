import axiosInstance from "../../config/axios/axiosInstance";

const getUsers = async (search = '') => {
    const url = search ? `/v1/admin/manage-users/all?search=${search}` : '/v1/admin/manage-users/all';
    return await axiosInstance.get(url);
};

const ManageUsersService = {
    getUsers,
};

export default ManageUsersService;