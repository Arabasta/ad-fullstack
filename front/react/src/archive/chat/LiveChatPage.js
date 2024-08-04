// import React, { useState } from 'react';
// import useCustomerChat from '../../hooks/useCustomerChat';
//
// const LiveChatPage = () => {
//     const { messages, selectedChat, sendMessage, startNewChat } = useCustomerChat(); // Remove `chat` and `loadMessages`
//     const [newMessage, setNewMessage] = useState('');
//
//     const handleSendMessage = (e) => {
//         e.preventDefault();
//         if (newMessage.trim() === '') return;
//         sendMessage(newMessage);
//         setNewMessage('');
//     };
//
//     const handleStartNewChat = async () => {
//         await startNewChat();
//     };
//
//     const formatDate = (timestampArray) => {
//         if (Array.isArray(timestampArray)) {
//             const [year, month, day, hour, minute, second] = timestampArray;
//             const date = new Date(year, month - 1, day, hour, minute, second); // month - 1 because JS months are 0-indexed
//             return date.toLocaleString();
//         }
//         return "Invalid Date";
//     };
//
//     return (
//         <div style={styles.container}>
//             <div style={styles.chatBox}>
//                 <h3>Messages</h3>
//                 {selectedChat ? (
//                     <>
//                         <ul style={styles.messageList}>
//                             {messages.map((message) => (
//                                 <li
//                                     key={message.id}
//                                     style={message.senderUsername === 'You' ? styles.outgoing : styles.incoming}
//                                 >
//                                     <div>
//                                         <strong>{message.senderUsername === 'You' ? 'You' : message.senderUsername}</strong>:
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
//                     </>
//                 ) : (
//                     <div style={styles.newChatContainer}>
//                         <p>You currently have no active chats.</p>
//                         <button onClick={handleStartNewChat} style={styles.newChatButton}>Start New Chat</button>
//                     </div>
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
//     chatBox: {
//         width: '100%',
//         padding: '10px',
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'space-between',
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
//     newChatContainer: {
//         textAlign: 'center',
//         marginTop: '50px',
//     },
//     newChatButton: {
//         padding: '10px 20px',
//         borderRadius: '5px',
//         backgroundColor: '#007bff',
//         color: '#fff',
//         border: 'none',
//         cursor: 'pointer',
//     },
// };
//
// export default LiveChatPage;
