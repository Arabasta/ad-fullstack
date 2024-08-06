// import React, { useState } from 'react';
// import useAdminChat from '../../hooks/useAdminChat';
//
// const AdminChatPage = () => {
//     const { chats, resolvedChats, messages, selectedChat, loadMessages, sendMessage, resolveChat } = useAdminChat();
//     const [newMessage, setNewMessage] = useState('');
//
//     const handleSendMessage = (e) => {
//         e.preventDefault();
//         if (newMessage.trim() === '') return;
//         sendMessage(newMessage, selectedChat);
//         setNewMessage('');
//     };
//
//     const handleResolveChat = () => {
//         if (selectedChat) {
//             resolveChat(selectedChat);
//         }
//     };
//
//     const formatDate = (timestamp) => {
//         if (timestamp) {
//             const date = new Date(timestamp);
//             return date.toLocaleString();
//         }
//         return "Invalid Date";
//     };
//
//     return (
//         <div style={styles.container}>
//             <div style={styles.chatList}>
//                 <h3>Customer Chats</h3>
//                 <ul style={styles.chatListItems}>
//                     {chats.map((chat) => (
//                         <li
//                             key={chat.id}
//                             style={selectedChat === chat.id ? styles.activeChat : styles.chatItem}
//                             onClick={() => loadMessages(chat.id)}
//                         >
//                             <span>{chat.user1Username === 'admin' ? chat.user2Username : chat.user1Username}</span>
//                             <span>{formatDate(chat.lastMessageTime)}</span>
//                         </li>
//                     ))}
//                 </ul>
//                 <h3>Resolved Chats</h3>
//                 <ul style={styles.chatListItems}>
//                     {resolvedChats.map((chat) => (
//                         <li
//                             key={chat.id}
//                             style={styles.chatItemResolved}
//                         >
//                             <span>{chat.user1Username === 'admin' ? chat.user2Username : chat.user1Username}</span>
//                             <span>{formatDate(chat.lastMessageTime)}</span>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//             <div style={styles.chatBox}>
//                 <h3>Messages</h3>
//                 {selectedChat ? (
//                     <>
//                         <ul style={styles.messageList}>
//                             {messages.map((message) => (
//                                 <li
//                                     key={message.id}
//                                     style={message.senderUsername === 'admin' ? styles.outgoing : styles.incoming}
//                                 >
//                                     <div>
//                                         <strong>{message.senderUsername === 'admin' ? 'You' : message.senderUsername}</strong>:
//                                     </div>
//                                     <div>{message.messageText}</div>
//                                     <div style={styles.messageTime}>{formatDate(message.timestamp)}</div>
//                                 </li>
//                             ))}
//                         </ul>
//                         <form onSubmit={handleSendMessage} style={styles.messageForm}>
//                             <input
//                                 type="text"
//                                 value={newMessage}
//                                 onChange={(e) => setNewMessage(e.target.value)}
//                                 placeholder="Type your message..."
//                                 style={styles.messageInput}
//                             />
//                             <button type="submit" style={styles.sendButton}>Send</button>
//                         </form>
//                         <button onClick={handleResolveChat} style={styles.resolveButton}>
//                             Resolve Chat
//                         </button>
//                     </>
//                 ) : (
//                     <p>Select a chat to view messages</p>
//                 )}
//             </div>
//         </div>
//     );
// };
//
// const styles = {
//     container: {
//         display: 'flex',
//         height: '100vh',
//     },
//     chatList: {
//         width: '30%',
//         borderRight: '1px solid #ccc',
//         padding: '10px',
//     },
//     chatBox: {
//         width: '70%',
//         padding: '10px',
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'space-between',
//     },
//     chatListItems: {
//         listStyleType: 'none',
//         padding: 0,
//     },
//     chatItem: {
//         padding: '10px',
//         borderBottom: '1px solid #eee',
//         cursor: 'pointer',
//     },
//     chatItemResolved: {
//         padding: '10px',
//         borderBottom: '1px solid #eee',
//         backgroundColor: '#e0e0e0',
//         cursor: 'default',
//     },
//     activeChat: {
//         padding: '10px',
//         borderBottom: '1px solid #eee',
//         backgroundColor: '#f0f0f0',
//         cursor: 'pointer',
//     },
//     messageList: {
//         listStyleType: 'none',
//         padding: 0,
//         flexGrow: 1,
//         overflowY: 'auto',
//     },
//     incoming: {
//         textAlign: 'left',
//         marginBottom: '10px',
//         padding: '10px',
//         backgroundColor: '#e1f5fe',
//         borderRadius: '10px',
//         maxWidth: '70%',
//         alignSelf: 'flex-start',
//     },
//     outgoing: {
//         textAlign: 'right',
//         marginBottom: '10px',
//         padding: '10px',
//         backgroundColor: '#c8e6c9',
//         borderRadius: '10px',
//         maxWidth: '70%',
//         alignSelf: 'flex-end',
//     },
//     messageTime: {
//         fontSize: '0.8em',
//         color: '#666',
//     },
//     messageForm: {
//         display: 'flex',
//         marginTop: '10px',
//     },
//     messageInput: {
//         flexGrow: 1,
//         padding: '10px',
//         borderRadius: '5px',
//         border: '1px solid #ccc',
//     },
//     sendButton: {
//         marginLeft: '10px',
//         padding: '10px 20px',
//         borderRadius: '5px',
//         backgroundColor: '#007bff',
//         color: '#fff',
//         border: 'none',
//         cursor: 'pointer',
//     },
//     resolveButton: {
//         marginTop: '10px',
//         padding: '10px 20px',
//         borderRadius: '5px',
//         backgroundColor: '#28a745',
//         color: '#fff',
//         border: 'none',
//         cursor: 'pointer',
//         alignSelf: 'flex-end',
//     },
// };
//
// export default AdminChatPage;
