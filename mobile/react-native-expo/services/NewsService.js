import axiosInstance from "../config/axios/axiosInstance";

const getAllNews = async () => {
    try {
        const response = await axiosInstance.get('/v1/customer/news');
        console.log('API Response:', response.data);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching news:', error);
        throw error;
    }
};

const newsService = {
    getAllNews,
};

export default newsService;
