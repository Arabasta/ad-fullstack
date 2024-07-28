import React from 'react';
import { FormControl, FormLabel, Input, Button, Stack, Heading, Flex } from '@chakra-ui/react';

const RegisterStep1 = ({ email, setEmail, username, setUsername, password, setPassword, handleNext }) => {
    return (
        <>
            <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
                User Registration
            </Heading>
            <Stack spacing={4}>
                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Username</FormLabel>
                    <Input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormControl>
                <Flex justify="flex-end">
                    <Button type="button" colorScheme="teal" onClick={handleNext}>Next</Button>
                </Flex>
            </Stack>
        </>
    );
};

export default RegisterStep1;
