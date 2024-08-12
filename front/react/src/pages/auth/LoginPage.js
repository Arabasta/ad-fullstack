// import React, { useState } from 'react';
// import useAuth from "../../hooks/useAuth";
// import {useNavigate} from "react-router-dom";
// import LoginForm from "../../components/customer/auth/LoginForm";
// import {useToast} from "@chakra-ui/react";
//
// const LoginPage = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [message, setMessage] = useState('');
//     const { login } = useAuth();
//     const navigate = useNavigate();
//     const toast = useToast()
//
//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             await login(username, password);
//             toast({
//                 title: "Login Successful",
//                 description: "You have successfully logged in.",
//                 status: "success",
//                 duration: 5000,  // 5 seconds
//                 isClosable: true,
//                 position: "top",
//                 onCloseComplete: () => navigate('/')  // Redirect after toast closes
//             });
//         } catch (error) {
//             setMessage('Invalid login please try again');
//
//             toast({
//                 title: "Login Failed",
//                 description: "Invalid credentials, please try again.",
//                 status: "error",
//                 duration: 2000,
//                 isClosable: true,
//                 position: "top"
//             });
//         }
//     };
//
//     return (
//         <LoginForm username={username}
//               password={password}
//               setUsername={setUsername}
//               setPassword={setPassword}
//               method={handleLogin}
//               message={message}/>
//     );
// };
//
// export default LoginPage;

import React, { useState } from 'react';
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/customer/auth/LoginForm";
import { useToast } from "@chakra-ui/react";

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const toast = useToast();

    const handleLogin = async (e, expectedRole) => {
        e.preventDefault();
        try {
            await login(username, password, expectedRole);  // Pass the expected role to login

            toast({
                title: "Login Successful",
                description: `You have successfully logged in as ${expectedRole}.`,
                status: "success",
                duration: 5000,  // 5 seconds
                isClosable: true,
                position: "top",
                onCloseComplete: () => navigate('/customer/')  // Redirect after toast closes
            });
        } catch (error) {
            setMessage('Login failed.');
            toast({
                title: "Login Failed",
                description: "Login failed, please try again.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top"
            });
        }
    };

    return (
        <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            method={handleLogin}  // Pass handleLogin as a prop
            message={message}
        />
    );
};

export default LoginPage;
