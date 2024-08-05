import axiosInstance from '../config/axios/axiosInstance';

const getRule = async (portfolioType) => {
    const response = await axiosInstance.get(`/v1/customer/rule?portfolioType=${portfolioType}`);
    return response.data.data;
};

const updateRule = async (ruleData) => {
    const response = await axiosInstance.post('/v1/customer/rule/update', ruleData);
    return response.data.data;
};

const resetStopLoss = async (portfolioType) => {
    const response = await axiosInstance.post('/v1/customer/rule/reset-stop-loss', { portfolioType, resetStopLossTrigger: true });
    return response.data.data;
};

const RuleService = {
    getRule,
    updateRule,
    resetStopLoss
};

export default RuleService;

