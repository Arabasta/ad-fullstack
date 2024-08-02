import React, { useEffect, useState } from 'react';
import { Box, Flex, Icon, chakra, Spinner } from "@chakra-ui/react";
import { IoMdAlert } from "react-icons/io";
import InvestorProfileService from "../../../../services/InvestorProfileService";

const RecommendedPortfolioType = () => {
    const [recommendedPortfolioType, setRecommendedPortfolioType] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInvestorProfile = async () => {
            try {
                const response = await InvestorProfileService.getInvestorProfile();
                const profileData = response.data.data;
                setRecommendedPortfolioType(profileData.recommendedPortfolioType);
                setLoading(false);
            } catch (error) {
                setError('Error fetching investor profile');
                setLoading(false);
            }
        };

        fetchInvestorProfile();
    }, []);

    if (loading) {
        return (
            <Flex justifyContent="center" alignItems="center" h="100vh">
                <Spinner size="xl" color="blue.500" />
            </Flex>
        );
    }

    if (error) {
        return (
            <Flex
                w="full"
                bg="#edf3f8"
                _dark={{ bg: "#3e3e3e" }}
                p={50}
                alignItems="center"
                justifyContent="center"
            >
                <Flex
                    maxW="sm"
                    w="full"
                    mx="auto"
                    bg="white"
                    _dark={{ bg: "gray.800" }}
                    shadow="md"
                    rounded="lg"
                    overflow="hidden"
                >
                    <Flex justifyContent="center" alignItems="center" w={12} bg="red.500">
                        <Icon as={IoMdAlert} color="white" boxSize={6} />
                    </Flex>

                    <Box mx={-3} py={2} px={4}>
                        <Box mx={3}>
                            <chakra.span color="red.500" _dark={{ color: "red.400" }} fontWeight="bold">
                                Error
                            </chakra.span>
                            <chakra.p color="gray.600" _dark={{ color: "gray.200" }} fontSize="sm">
                                {error}
                            </chakra.p>
                        </Box>
                    </Box>
                </Flex>
            </Flex>
        );
    }

    return (
        <Flex
            w="full"
            bg="#edf3f8"
            _dark={{ bg: "#3e3e3e" }}
            p={50}
            alignItems="center"
            justifyContent="center"
        >
            <Flex
                maxW="sm"
                w="full"
                mx="auto"
                bg="white"
                _dark={{ bg: "gray.800" }}
                shadow="md"
                rounded="lg"
                overflow="hidden"
            >
                <Flex justifyContent="center" alignItems="center" w={12} bg="blue.500">
                    <Icon as={IoMdAlert} color="white" boxSize={6} />
                </Flex>

                <Box mx={-3} py={2} px={4}>
                    <Box mx={3}>
                        <chakra.span color="blue.500" _dark={{ color: "blue.400" }} fontWeight="bold">
                            Info
                        </chakra.span>
                        <chakra.p color="gray.600" _dark={{ color: "gray.200" }} fontSize="sm">
                            Your recommended portfolio type is: {recommendedPortfolioType}
                        </chakra.p>
                    </Box>
                </Box>
            </Flex>
        </Flex>
    );
};

export default RecommendedPortfolioType;
