import axiosInstance from '../config/axios/axiosInstance';

const getAddress = async () => {
    return await axiosInstance.get(`/v1/customer/address`);
};

const updateAddress = async (address) => {
    return await axiosInstance.post(`/v1/customer/address/update`, address);
};

const AddressService = {
    getAddress,
    updateAddress
};

export default AddressService;