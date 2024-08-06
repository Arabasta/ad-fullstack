'use client';

import React, { useEffect, useState } from 'react';
import { IoMdAlert } from "react-icons/io";
import InvestorProfileService from "../../services/InvestorProfileService";
import {
    Box,
    Flex,
    Avatar,
    chakra,
    Center,
} from '@chakra-ui/react';

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
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div>Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <Center py={6}>
                <Flex
                    w="full"
                    bg="#edf3f8"
                    _dark={{
                        bg: "#3e3e3e",
                    }}
                    p={50}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Flex
                        maxW="sm"
                        w="full"
                        mx="auto"
                        bg="white"
                        _dark={{
                            bg: "gray.800",
                        }}
                        shadow="md"
                        rounded="lg"
                        overflow="hidden"
                    >
                        <Flex
                            w={2}
                            bg="red.500"
                            _dark={{
                                bg: "red.600",
                            }}
                        ></Flex>

                        <Flex alignItems="center" px={2} py={3}>
                            <Avatar boxSize={10} icon={<IoMdAlert />} />
                            <Box mx={3}>
                                <chakra.p
                                    color="gray.600"
                                    _dark={{
                                        color: "gray.200",
                                    }}
                                >
                                    {error}
                                </chakra.p>
                            </Box>
                        </Flex>
                    </Flex>
                </Flex>
            </Center>
        );
    }

    return (
        <Center py={6}>
            <Flex
                w="full"
                bg="#edf3f8"
                _dark={{
                    bg: "#3e3e3e",
                }}
                p={50}
                alignItems="center"
                justifyContent="center"
            >
                <Flex
                    maxW="sm"
                    w="full"
                    mx="auto"
                    bg="white"
                    _dark={{
                        bg: "gray.800",
                    }}
                    shadow="md"
                    rounded="lg"
                    overflow="hidden"
                >
                    <Flex
                        w={2}
                        bg="gray.800"
                        _dark={{
                            bg: "gray.900",
                        }}
                    ></Flex>

                    <Flex alignItems="center" px={2} py={3}>
                        <Avatar boxSize={10} icon={<IoMdAlert />} />
                        <Box mx={3}>
                            <chakra.p
                                color="gray.600"
                                _dark={{
                                    color: "gray.200",
                                }}
                            >
                                Your recommended portfolio type is: {recommendedPortfolioType}
                            </chakra.p>
                        </Box>
                    </Flex>
                </Flex>
            </Flex>
        </Center>
    );
};

export default RecommendedPortfolioType;
