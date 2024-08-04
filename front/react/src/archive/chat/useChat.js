import { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import ChatService from './ChatService';

const useChat = (isAdmin = false) => {
    const [chats, setChats] = useState([]);
    const [resolvedChats, setResolvedChats] = useState([]); // Separate state for resolved chats
    const [messages, setMessages] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [client, setClient] = useState(null);

    const loadChats = async () => {
        try {
            const response = await ChatService.getChats();
            setChats(response.data.data);
        } catch (error) {
            console.error('Error fetching chats', error);
        }
    };

    const loadResolvedChats = async () => {
        try {
            const response = await ChatService.getResolvedChats();
            setResolvedChats(response.data.data);
        } catch (error) {
            console.error('Error fetching resolved chats', error);
        }
    };

    const loadMessages = async (chatId) => {
        try {
            const response = await ChatService.getMessages(chatId);
            setMessages(response.data.data);
            setSelectedChat(chatId);
        } catch (error) {
            console.error('Error fetching messages', error);
        }
    };

    const sendMessage = async (messageText, chatId) => {
        try {
            const messageData = { messageText };
            if (isAdmin) {
                const selectedChat = chats.find(chat => chat.id === chatId);
                const receiverUsername = selectedChat.user1Username === 'admin' ? selectedChat.user2Username : selectedChat.user1Username;
                await ChatService.sendAdminMessage({ ...messageData, receiverUsername });
            } else {
                await ChatService.sendCustomerMessage(messageData);
            }
            loadMessages(chatId);  // Reload messages after sending a new one
        } catch (error) {
            console.error('Error sending message', error);
        }
    };

    const resolveChat = async (chatId) => {
        try {
            await ChatService.resolveChat(chatId);
            loadChats(); // Reload chats after resolving
            loadResolvedChats(); // Also load resolved chats
        } catch (error) {
            console.error('Error resolving chat', error);
        }
    };

    useEffect(() => {
        loadChats();
        loadResolvedChats(); // Load resolved chats on mount

        const sock = new SockJS('/ws');
        const stompClient = new Client({
            webSocketFactory: () => sock,
            debug: str => console.log(str),
            onConnect: () => {
                stompClient.subscribe('/topic/chats', message => {
                    const chat = JSON.parse(message.body);
                    setChats(prevChats => {
                        const index = prevChats.findIndex(c => c.id === chat.id);
                        if (index !== -1) {
                            const updatedChats = [...prevChats];
                            updatedChats[index] = chat;
                            return updatedChats;
                        } else {
                            return [...prevChats, chat];
                        }
                    });
                });

                if (selectedChat) {
                    stompClient.subscribe(`/topic/chats/${selectedChat}`, message => {
                        const newMessage = JSON.parse(message.body);
                        setMessages(prevMessages => [...prevMessages, newMessage]);
                    });
                }
            },
            onStompError: frame => {
                console.error('Broker error: ' + frame.headers['message']);
            }
        });

        stompClient.activate();
        setClient(stompClient);

        return () => {
            stompClient.deactivate();
        };
    }, [selectedChat]);

    return { chats, resolvedChats, messages, selectedChat, loadMessages, sendMessage, resolveChat };
};

export default useChat;
