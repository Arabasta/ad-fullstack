import axiosInstance from '../config/axios/axiosInstance';

const getRulesByPortfolioType = async (portfolioType) => {
    return await axiosInstance.get(`/v1/customer/rule`, {
        params: {portfolioType},
    });
};

const updateRulesByPortfolio = async (thisPortfolioRules) => {
    return await axiosInstance.post(`/v1/customer/rule/update`, {thisPortfolioRules});
};

const resetStopLoss = async (toReset) => {
    return await axiosInstance.post(`/v1/customer/rule/reset-stop-loss`, {toReset});
};

const RulesService = {
    getRulesByPortfolioType,
    updateRulesByPortfolio,
    resetStopLoss
};

export default RulesService;
