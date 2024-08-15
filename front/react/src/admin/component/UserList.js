import React, { useState } from 'react';
import {Box, Table, Thead, Tbody, Tr, Th, Td, Button, Input, useToast} from '@chakra-ui/react';
import useUsers from '../hooks/useUsers';

const UserList = () => {
    const [search, setSearch] = useState('');
    const { users, lockUser, unlockUser } = useUsers(search);
    const toast = useToast();

    const handleLock = async (username) => {
        await lockUser(username);
        toast({
            title: "User has been locked",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
        });
    };

    const handleUnlock = async (username) => {
        await unlockUser(username);
        toast({
            title: "User has been unlocked",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
        });
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
                                {user.role !== "ROLE_LOCKED" && ( <Button
                                    colorScheme="red"
                                    size="sm"
                                    onClick={() => handleLock(user.username)}
                                    mr={2}
                                >
                                    Lock
                                </Button>
                                )}
                                {user.role === "ROLE_LOCKED" && ( <Button
                                    colorScheme="green"
                                    size="sm"
                                    onClick={() => handleUnlock(user.username)}
                                >
                                    Unlock
                                </Button>
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
