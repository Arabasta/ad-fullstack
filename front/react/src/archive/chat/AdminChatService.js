import axiosInstance from '../../config/axios/axiosInstance';

const viewAllChats = async () => {
    return await axiosInstance.get(`/v1/chat`);
};

const viewResolvedChats = async () => {
    return await axiosInstance.get(`/v1/chat/resolved-chats`);
};

const resolveChat = async (chatId) => {
    return await axiosInstance.post(`/v1/chat/${chatId}/resolve`);
};

const sendCustomerMessage = async (messageData) => {
    return await axiosInstance.post(`/v1/chat/admin/send`, messageData);
};

const AdminChatService = {
    viewAllChats,
    viewResolvedChats,
    resolveChat,
    sendCustomerMessage,
};

export default AdminChatService;
