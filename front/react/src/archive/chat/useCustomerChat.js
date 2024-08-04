import { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const useCustomerChat = () => {
    const [messages, setMessages] = useState([]);
    const [client, setClient] = useState(null);

    useEffect(() => {
        // Get the token from localStorage
        const token = localStorage.getItem('token');

        // Include the token in the WebSocket URL
        const sock = new SockJS(`/ws?token=${token}`);

        const stompClient = new Client({
            webSocketFactory: () => sock,
            debug: str => console.log(str),
            onConnect: () => {
                // Subscribe to the topic where the admin sends messages
                stompClient.subscribe('/topic/chats/customer', message => {
                    const newMessage = JSON.parse(message.body);
                    setMessages(prevMessages => [...prevMessages, newMessage]);
                });
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
    }, []);

    return { messages };
};

export default useCustomerChat;
