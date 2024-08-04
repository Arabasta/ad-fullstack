import axiosInstance from "../config/axios/axiosInstance";

const makePayment = async (paymentDetails) => {
    return await axiosInstance.post(`/v1/payment/process`, { paymentDetails });
};