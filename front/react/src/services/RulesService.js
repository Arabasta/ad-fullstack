import axiosInstance from '../config/axios/axiosInstance';

const getRules = async () => {
    return await axiosInstance.get(`/v1/customer/rule`);
};

const updateRules = async (portfolioRules) => {
    return await axiosInstance.post(`/v1/customer/rule/update`, {portfolioRules});
};

const resetStopLoss = async (toReset) => {
    return await axiosInstance.post(`/v1/customer/rule/reset-stop-loss`, {toReset});
};

const RulesService = {
    getRules,
    updateRules,
    resetStopLoss
};

export default RulesService;
