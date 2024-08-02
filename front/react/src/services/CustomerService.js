import axiosInstance from '../config/axios/axiosInstance';

const getCustomer = async () => {
    return await axiosInstance.get(`/v1/customer/details`);
};


const CustomerService = {
    getCustomer
};
export default CustomerService;
