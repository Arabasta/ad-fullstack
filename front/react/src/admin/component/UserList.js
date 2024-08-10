import React, { useState } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Button, Input, Text } from '@chakra-ui/react';
import useUsers from '../hooks/useUsers';

const UserList = () => {
    const [search, setSearch] = useState('');
    const { users, lockUser, unlockUser } = useUsers(search);
    const [message, setMessage] = useState({});

    const handleLock = async (username) => {
        await lockUser(username);
        setMessage((prevState) => ({
            ...prevState,
            [username]: 'User locked successfully',
        }));
    };

    const handleUnlock = async (username) => {
        await unlockUser(username);
        setMessage((prevState) => ({
            ...prevState,
            [username]: 'User unlocked successfully',
        }));
    };

    return (
        <Box>
            <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                mb={4}
                size="md"
            />
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Username</Th>
                        <Th>Email</Th>
                        <Th>Role</Th>
                        <Th>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {users.map((user) => (
                        <Tr key={user.username}>
                            <Td>{user.username}</Td>
                            <Td>{user.email}</Td>
                            <Td>{user.role}</Td>
                            <Td>
                                <Button
                                    colorScheme="red"
                                    size="sm"
                                    onClick={() => handleLock(user.username)}
                                    mr={2}
                                >
                                    Lock
                                </Button>
                                <Button
                                    colorScheme="green"
                                    size="sm"
                                    onClick={() => handleUnlock(user.username)}
                                >
                                    Unlock
                                </Button>
                                {message[user.username] && (
                                    <Text mt={2} color="green.500" fontSize="sm">
                                        {message[user.username]}
                                    </Text>
                                )}
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

export default UserList;
