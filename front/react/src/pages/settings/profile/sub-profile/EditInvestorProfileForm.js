import React, {useContext, useEffect, useState} from 'react';
import {
    Box,
    SimpleGrid,
    GridItem,
    chakra,
    Stack,
    FormControl,
    FormLabel
} from '@chakra-ui/react';
import Heading from "../../../../components/common/text/Heading";
import Text from "../../../../components/common/text/Text";
import Button from "../../../../components/common/buttons/Button";
import FormSelect from "../../../../components/common/inputFields/FormSelect";
import InvestorProfileService from "../../../../services/InvestorProfileService";
import {AuthContext} from "../../../../config/context/AuthContext";

const EditInvestorProfileForm = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const [profile, setProfile] = useState({
        investmentDurationScore: 1,
        withdrawalSpendingPlanScore: 1,
        investmentKnowledgeScore: 1,
        riskRewardScore: 1,
        ownedInvestmentsScore: 1,
        investmentPersonalityScore: 1,
    });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [recommendedPortfolioType, setRecommendedPortfolioType] = useState('');

    const optionsForQuestion1 = [
        { label: "Less than 3 years", value: 1 },
        { label: "3-5 years", value: 2 },
        { label: "6-10 years", value: 3 },
        { label: "11 years or more", value: 4 }
    ];
    const optionsForQuestion2 = [
        { label: "Less than 2 years", value: 1 },
        { label: "2-5 years", value: 2 },
        { label: "6-10 years", value: 3 },
        { label: "11 years or more", value: 4 }
    ];
    const optionsForQuestion3 = [
        { label: "None", value: 1 },
        { label: "Limited", value: 2 },
        { label: "Good", value: 3 },
        { label: "Extensive", value: 4 }
    ];
    const optionsForQuestion4 = [
        { label: "Take less risk, expect less returns", value: 1 },
        { label: "Take average risk, expect average returns", value: 2 },
        { label: "Take more risks, expect more returns", value: 3 }
    ];
    const optionsForQuestion5 = [
        { label: "Bonds and/or bonds funds", value: 1 },
        { label: "Stocks and/or stocks funds", value: 2 },
        { label: "International securities and/or funds", value: 3 }
    ];
    const optionsForQuestion6 = [
        { label: "Sell all my shares", value: 1 },
        { label: "Sell some of my shares", value: 2 },
        { label: "Do nothing", value: 3 },
        { label: "Buy more shares", value: 4 }
    ];

    useEffect(() => {
        if (!isAuthenticated) {
            setLoading(false);
        } else {
            const fetchProfile = async () => {
                try {
                    const response = await InvestorProfileService.getInvestorProfile();
                    setProfile(response.data.data);
                    setRecommendedPortfolioType(response.data.data.recommendedPortfolioType); // 设置之前的推荐投资组合
                    setLoading(false);
                } catch (error) {
                    setMessage('Error fetching investor profile');
                    setLoading(false);
                }
            };

            fetchProfile();
        }
    }, [isAuthenticated]);


    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            const response = await InvestorProfileService.updateInvestorProfile(profile);
            console.log("Updated profile:", profile);
            setMessage('Profile updated successfully');
            setProfile(response.data.data);
            setRecommendedPortfolioType(response.data.data.recommendedPortfolioType);
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage('Error updating profile');
        }
    };

    const handleChange = (field, value) => {
        setProfile({
            ...profile,
            [field]: value
        });
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!isAuthenticated) {
        return <p>Please log in to view this page.</p>;
    }

    return (
        <Box
            bg="brand.600"
            _dark={{ bg: "#111" }}
            p={10}
        >
            <Box
                bg="brand.400"
                _dark={{ bg: "#111" }}
                p={30}
            >
                <SimpleGrid
                    display={{ base: "initial", md: "grid" }}
                    columns={{ md: 3 }}
                    spacing={{ md: 6 }}
                >
                    <GridItem colSpan={{ md: 1 }}>
                        <Box px={[4, 0]}>
                            <Heading color="brand.100" fontSize="5xl" fontWeight="md" lineHeight="10">
                                Update
                            </Heading>
                            <Text
                                mt={1}
                                fontSize="2xl"
                                color="gray.600"
                                _dark={{ color: "gray.400" }}
                            >
                                details.
                            </Text>
                        </Box>
                    </GridItem>

                    <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
                        <chakra.form
                            onsubmit={handleUpdate}
                            shadow="base"
                            rounded={[null, "md"]}
                            overflow={{ lg: "hidden" }}
                            color="brand.100"

                        >
                            <Stack
                                px={4}
                                py={8}
                                bg="white"
                                _dark={{ bg: "#141517" }}
                                spacing={6}
                                p={{ sm: 6 }}
                            >
                                <SimpleGrid columns={6} spacing={6}>
                                    <FormControl as={GridItem} colSpan={[6, 3]}>
                                        <FormLabel
                                            fontSize="md"
                                            fontWeight="md"
                                            color="gray.700"
                                            _dark={{ color: "gray.50" }}
                                        >
                                            Investment Duration Score
                                        </FormLabel>
                                        <FormSelect
                                            placeholder="Select option"
                                            mt={1}
                                            focusBorderColor="brand.400"
                                            shadow="sm"
                                            size="sm"
                                            w="full"
                                            rounded="md"
                                            value={profile.investmentDurationScore}
                                            onChange={(value) => handleChange('investmentDurationScore', value)}
                                            options={optionsForQuestion1}
                                            required
                                        />
                                    </FormControl>

                                    <FormControl as={GridItem} colSpan={[6, 3]}>
                                        <FormLabel
                                            fontSize="md"
                                            fontWeight="md"
                                            color="gray.700"
                                            _dark={{ color: "gray.50" }}
                                        >
                                            Withdrawal Spending Plan Score
                                        </FormLabel>
                                        <FormSelect
                                            mt={1}
                                            focusBorderColor="brand.400"
                                            shadow="sm"
                                            size="sm"
                                            w="full"
                                            rounded="md"
                                            value={profile.withdrawalSpendingPlanScore}
                                            onChange={(value) => handleChange('withdrawalSpendingPlanScore', value)}
                                            options={optionsForQuestion2}
                                            required
                                        />
                                    </FormControl>

                                    <FormControl as={GridItem} colSpan={[6, 4]}>
                                        <FormLabel
                                            fontSize="md"
                                            fontWeight="md"
                                            color="gray.700"
                                            _dark={{ color: "gray.50" }}
                                        >
                                            Investment Knowledge Score
                                        </FormLabel>
                                        <FormSelect
                                            placeholder="Select option"
                                            mt={1}
                                            focusBorderColor="brand.400"
                                            shadow="sm"
                                            size="sm"
                                            w="full"
                                            rounded="md"
                                            value={profile.investmentKnowledgeScore}
                                            onChange={(value) => handleChange('investmentKnowledgeScore', value)}
                                            options={optionsForQuestion3}
                                            required
                                        />
                                    </FormControl>

                                    <FormControl as={GridItem} colSpan={[6, 3]}>
                                        <FormLabel
                                            fontSize="md"
                                            fontWeight="md"
                                            color="gray.700"
                                            _dark={{ color: "gray.50" }}
                                        >
                                            Risk Reward Score
                                        </FormLabel>
                                        <FormSelect
                                            placeholder="Select option"
                                            mt={1}
                                            focusBorderColor="brand.400"
                                            shadow="sm"
                                            size="sm"
                                            w="full"
                                            rounded="md"
                                            value={profile.riskRewardScore}
                                            onChange={(value) => handleChange('riskRewardScore', value)}
                                            options={optionsForQuestion4}
                                            required
                                        />
                                    </FormControl>

                                    <FormControl as={GridItem} colSpan={[6, 3]}>
                                        <FormLabel
                                            fontSize="md"
                                            fontWeight="md"
                                            color="gray.700"
                                            _dark={{ color: "gray.50" }}
                                        >
                                            Owned Investments Score
                                        </FormLabel>
                                        <FormSelect
                                            placeholder="Select option"
                                            mt={1}
                                            focusBorderColor="brand.400"
                                            shadow="sm"
                                            size="sm"
                                            w="full"
                                            rounded="md"
                                            value={profile.ownedInvestmentsScore}
                                            onChange={(value) => handleChange('ownedInvestmentsScore', value)}
                                            options={optionsForQuestion5}
                                            required
                                        />
                                    </FormControl>

                                    <FormControl as={GridItem} colSpan={[6, 3]}>
                                        <FormLabel
                                            fontSize="md"
                                            fontWeight="md"
                                            color="gray.700"
                                            _dark={{ color: "gray.50" }}
                                        >
                                            Investment Personality Score
                                        </FormLabel>
                                        <FormSelect
                                            placeholder="Select option"
                                            mt={1}
                                            focusBorderColor="brand.400"
                                            shadow="sm"
                                            size="sm"
                                            w="full"
                                            rounded="md"
                                            value={profile.investmentPersonalityScore}
                                            onChange={(value) => handleChange('investmentPersonalityScore', value)}
                                            options={optionsForQuestion6}
                                            required
                                        />
                                    </FormControl>
                                </SimpleGrid>
                            </Stack>

                            <Box
                                px={{ base: 4, sm: 6 }}
                                py={3}
                                bg="gray.50"
                                _dark={{ bg: "#121212" }}
                                textAlign="right"
                            >
                                <Button
                                    onClick={handleUpdate}
                                    colorScheme="brand"
                                    _focus={{ shadow: "" }}
                                    fontWeight="md"
                                >
                                    Update
                                </Button>
                                {message && <p>{message}</p> && <p>Updated Recommend Portfolio Type: {recommendedPortfolioType}</p>}

                            </Box>
                        </chakra.form>
                    </GridItem>
                </SimpleGrid>
            </Box>
        </Box>
    );
};

export default EditInvestorProfileForm;