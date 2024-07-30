import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from "react-router-dom";
import {
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Text as ChakraText,
    InputGroup,
    InputRightElement,
    IconButton,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
            navigate('/dashboard');
        } catch (error) {
            setMessage('Invalid login, please try again');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <Stack spacing={4}>
                <FormControl id="username" isRequired>
                    <FormLabel>Username</FormLabel>
                    <Input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </FormControl>
                <FormControl id="password" isRequired>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <InputRightElement h={'full'}>
                            <IconButton
                                variant={'ghost'}
                                onClick={() => setShowPassword(!showPassword)}
                                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                            />
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <Button
                    type="submit"
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                        bg: 'blue.500',
                    }}>
                    Login
                </Button>
                {message && (
                    <ChakraText color={'red.500'} align={'center'}>
                        {message}
                    </ChakraText>
                )}
            </Stack>
        </form>
    );
};

export default LoginForm;
