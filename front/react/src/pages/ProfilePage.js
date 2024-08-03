import React, { useEffect, useState } from 'react';
import { ChakraProvider, Box, Flex, Heading, VStack, Text } from '@chakra-ui/react';
import Header from "../components/pageSections/headers/Header";
import RecommendedPortfolioType from "../components/elements/alerts/info/RecommendedPortfolioTypeInfoAlert";
import ProfileButtons from "../components/elements/buttons/ProfileButtons";
import Footer from "../components/pageSections/footers/Footer";
import CustomerDetailsCard from "../components/elements/cards/CustomerDetailsCard";
import CustomerService from "../services/CustomerService";

const ProfilePage = () => {
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                const response = await CustomerService.getCustomer()
                setCustomer(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching customer details:', error);
                setLoading(false);
            }
        };

        fetchCustomerData();
    }, []);

    if (loading) {
        return <p>Loading customer details...</p>;
    }

    return (
        <ChakraProvider>
            <Box>
                <Header />
                <Flex direction="column" align="center" mt={4}>
                    <Heading as="h2" size="lg" mb={2}>Profile</Heading>
                    <Text>Welcome to the Profile Page!</Text>
                </Flex>

                <Flex direction="column" align="center" mt={4} mb={8}>
                    <CustomerDetailsCard customer={customer} />
                </Flex>

                <Flex direction="column" align="center" mb={8}>
                    <RecommendedPortfolioType />
                </Flex>

                <Flex direction="column" align="center" mb={8}>
                    <VStack spacing={4}>
                        <ProfileButtons to="/profile/account" label="Update Email and Password" />
                        <ProfileButtons to="/profile/financialProfile" label="Update Financial Profile" />
                        <ProfileButtons to="/profile/address" label="Update Address" />
                        <ProfileButtons to="/profile/investorProfile" label="Update Investor Profile" />
                        <ProfileButtons to="/profile/notification" label="Notification Settings" />
                    </VStack>
                </Flex>

                <Footer />
            </Box>
        </ChakraProvider>
    );
}

export default ProfilePage;
