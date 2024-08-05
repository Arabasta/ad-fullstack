// import React, { useState } from 'react';
// import useCustomerChat from '../../hooks/useCustomerChat';
//
// const CustomerChatPage = () => {
//     const { messages } = useCustomerChat(); // Just receiving messages, no sending in this case
//
//     return (
//         <div style={styles.container}>
//             <div style={styles.chatBox}>
//                 <h3>Messages</h3>
//                 <ul style={styles.messageList}>
//                     {messages.map((message, index) => (
//                         <li
//                             key={index}
//                             style={message.senderUsername === 'admin' ? styles.incoming : styles.outgoing}
//                         >
//                             <div>
//                                 <strong>{message.senderUsername === 'admin' ? 'Admin' : 'You'}</strong>:
//                             </div>
//                             <div>{message.messageText}</div>
//                             <div style={styles.messageTime}>{new Date(message.timestamp).toLocaleString()}</div>
//                         </li>
//                     ))}
//                 </ul>
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
// };
//
// export default CustomerChatPage;
