import React from 'react';
import { Box, Heading, Container } from '@chakra-ui/react';
import UserList from '../component/UserList';

const AdminPage = () => {
    return (
        <Container maxW="container.lg" p={4}>
            <Heading as="h1" size="lg" mb={6} textAlign="center">
                Manage Users
            </Heading>
            <UserList />
        </Container>
    );
};

export default AdminPage;
