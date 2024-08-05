import axiosInstance from '../../config/axios/axiosInstance';

const getChats = async () => {
    return await axiosInstance.get(`/v1/chat`);
};

const getMessages = async (chatId) => {
    return await axiosInstance.get(`/v1/chat/${chatId}/messages`);
};

const sendCustomerMessage = async (messageData) => {
    return await axiosInstance.post(`/v1/chat/customer/send`, messageData);
};

const sendAdminMessage = async (messageData) => {
    return await axiosInstance.post(`/v1/chat/admin/send`, messageData);
};

const resolveChat = async (chatId) => {
    return await axiosInstance.post(`/v1/chat/${chatId}/resolve`);
};

const ChatService = {
    getChats,
    getMessages,
    sendCustomerMessage,
    sendAdminMessage,
    resolveChat,
};

export default ChatService;
