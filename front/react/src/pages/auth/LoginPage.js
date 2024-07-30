import React from 'react';
import { Flex, Stack, Box, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import LoginForm from '../../components/form/auth/LoginForm';

const LoginPage = () => {
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.900')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} fontWeight="bold">Login</Heading>
                    <Text fontSize={'lg'} color={useColorModeValue('gray.600', 'gray.300')}>
                        Welcome back! Please login to your account.
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.800')}
                    boxShadow={'lg'}
                    p={8}>
                    <LoginForm />
                </Box>
            </Stack>
        </Flex>
    );
};

export default LoginPage;
