import React from 'react';
import { Stack, FormControl, FormLabel, Input, Button, Heading, InputGroup, InputRightElement, Tooltip } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const RegisterStep1 = ({ email, setEmail, username, setUsername, password, setPassword, handleNext }) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClick = () => setShowPassword(!showPassword);

    return (
        <Stack spacing={6}>
            <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
                User Registration
            </Heading>
            <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Tooltip label="Please enter a valid email address" fontSize="md">
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@domain.com"
                        _placeholder={{ color: 'gray.400' }}
                    />
                </Tooltip>
            </FormControl>
            <FormControl id="username" isRequired>
                <FormLabel>Username</FormLabel>
                <Tooltip label="Username must be 3-20 characters long" fontSize="md">
                    <Input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        _placeholder={{ color: 'gray.400' }}
                    />
                </Tooltip>
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Tooltip label="Password must be at least 6 characters long" fontSize="md">
                    <InputGroup size="md">
                        <Input
                            pr="4.5rem"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            _placeholder={{ color: 'gray.400' }}
                        />
                        <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" onClick={handleClick}>
                                {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </Tooltip>
            </FormControl>
            <Button colorScheme="teal" onClick={handleNext}>
                Next
            </Button>
        </Stack>
    );
};

export default RegisterStep1;
