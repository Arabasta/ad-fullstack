import React from 'react';
import { Box, Heading, Container, Flex } from '@chakra-ui/react';
import UserList from '../component/UserList';

const AdminPage = () => {
    return (
        <Box bg="#666db3" minH="100vh" py={10}>
            <Container maxW="container.lg" p={4}>
                <Box bg="white" borderRadius="md" p={8} boxShadow="lg">
                    <Heading as="h1" size="lg" mb={6} textAlign="center" color="#4B4BB3">
                        Manage Users
                    </Heading>
                    <UserList />
                </Box>
            </Container>
        </Box>
    );
};

export default AdminPage;
