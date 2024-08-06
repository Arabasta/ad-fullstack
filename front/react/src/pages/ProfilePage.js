import React, { useEffect, useState } from 'react';
import { ChakraProvider, Box, Flex, Heading, VStack, Text, Divider } from '@chakra-ui/react';
import ProfileButtons from "../components/common/buttons/ProfileButtons";
import CustomerDetailsCard from "../components/common/cards/CustomerDetailsCard";
import CustomerService from "../services/CustomerService";
import InvestorProfileService from "../services/InvestorProfileService";

const ProfilePage = () => {
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [recommendedPortfolioType, setRecommendedPortfolioType] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                const response = await CustomerService.getCustomer();
                setCustomer(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching customer details:', error);
                setLoading(false);
            }
        };

        const fetchInvestorProfile = async () => {
            try {
                const response = await InvestorProfileService.getInvestorProfile();
                const profileData = response.data.data;
                setRecommendedPortfolioType(profileData.recommendedPortfolioType);
            } catch (error) {
                setError('Error fetching investor profile');
            }
        };

        fetchCustomerData();
        fetchInvestorProfile();
    }, []);

    if (loading) {
        return <p>Loading customer details...</p>;
    }

    return (
        <ChakraProvider>
            <Box>
                <Flex direction="column" align="center" mt={4} mb={8}>
                    <Heading as="h2" size="lg" mb={2}>Profile</Heading>
                    <Text>Welcome to the Profile Page!</Text>
                </Flex>

                <Flex direction="row" align="center" justify="center" mt={4} mb={8} w="full" p={4}>
                    <CustomerDetailsCard
                        customer={customer}
                        alertMessage={error ? error : `Your recommended portfolio type is: ${recommendedPortfolioType}`}
                    />

                    <VStack spacing={4} align="flex-start" ml={8}>
                        <ProfileButtons to="/profile/account" label="Email and Password" />
                        <ProfileButtons to="/profile/update-mobile-number" label="Phone Number" />
                        <ProfileButtons to="/profile/address" label="Address" />
                        <ProfileButtons to="/profile/bankDetails" label="Bank Details" />
                        <ProfileButtons to="/profile/financialProfile" label="Financial Profile" />
                        <ProfileButtons to="/profile/investorProfile" label="Investor Profile" />
                        <ProfileButtons to="/profile/notification" label="Notifications" />
                    </VStack>
                </Flex>

                <Divider mb={8} />

            </Box>
        </ChakraProvider>
    );
}

export default ProfilePage;
