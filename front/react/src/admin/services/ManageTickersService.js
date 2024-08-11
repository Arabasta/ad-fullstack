import axiosInstance from "../../config/axios/axiosInstance";

const getActiveTickers = async () => {
    const response = await axiosInstance.get('/v1/admin/trading/tickers');
    return response.data;
};

const getAvailableTickers = async () => {
    const response = await axiosInstance.get('/v1/admin/trading/tickers/available');
    return response.data;
};

const addTicker = async (tickerDTO) => {
    const response = await axiosInstance.post('/v1/admin/trading/tickers/create', tickerDTO);
    return response.data;
};

const deleteTicker = async (tickerId) => {
    const response = await axiosInstance.delete(`/v1/admin/trading/tickers/${tickerId}`);
    return response.data;
};

const ManageTickersService = {
    getActiveTickers,
    getAvailableTickers,
    addTicker,
    deleteTicker
};

export default ManageTickersService;
