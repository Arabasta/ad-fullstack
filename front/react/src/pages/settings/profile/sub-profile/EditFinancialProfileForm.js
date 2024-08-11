import React, { useContext, useEffect, useState } from 'react';
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
import UpdateFinancialProfileService from "../../../../services/UpdateFinancialProfileService";
import { AuthContext } from "../../../../config/context/AuthContext";
import { Link } from "react-router-dom";

const EditFinancialProfileForm = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const [profile, setProfile] = useState({
        employmentStatus: 0,
        annualIncome: 20000,
        netWorth: 50000,
        sourceOfWealth: 0,
        investmentObjective: 0,
        investmentExperience: 0,
    });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    const employmentStatusOptions = [
        { label: 'Employed', value: 0 },
        { label: 'Self-Employed', value: 1 },
        { label: 'Unemployed', value: 2 },
        { label: 'Retired', value: 3 },
        { label: 'Student', value: 4 },
        { label: 'Other', value: 5 }
    ];

    const incomeOptions = [
        { label: 'Below $20,000', value: 20000 },
        { label: '$20,000 - $50,000', value: 50000 },
        { label: '$50,001 - $100,000', value: 100000 },
        { label: '$100,001 - $200,000', value: 200000 },
        { label: 'Above $200,000', value: 200001 },
    ];

    const netWorthOptions = [
        { label: 'Below $50,000', value: 50000 },
        { label: '$50,000 - $100,000', value: 100000 },
        { label: '$100,001 - $500,000', value: 500000 },
        { label: '$500,001 - $1,000,000', value: 1000000 },
        { label: 'Above $1,000,000', value: 1000001 },
    ];

    const sourceOfWealthOptions = [
        { label: 'Salary', value: 0 },
        { label: 'Business', value: 1 },
        { label: 'Investments', value: 2 },
        { label: 'Inheritance', value: 3 },
        { label: 'Other', value: 4 }
    ];

    const investmentObjectiveOptions = [
        { label: 'Growth', value: 0 },
        { label: 'Income', value: 1 },
        { label: 'Capital Preservation', value: 2 },
        { label: 'Speculation', value: 3 },
        { label: 'Other', value: 4 }
    ];

    const investmentExperienceOptions = [
        { label: 'None', value: 0 },
        { label: 'Limited', value: 1 },
        { label: 'Moderate', value: 2 },
        { label: 'Extensive', value: 3 }
    ];

    useEffect(() => {
        if (!isAuthenticated) {
            setLoading(false);
        } else {
            const fetchProfile = async () => {
                try {
                    const response = await UpdateFinancialProfileService.getFinancialProfile();
                    setProfile(response.data.data);
                    setLoading(false);
                } catch (error) {
                    setMessage('Error fetching financial profile');
                    setLoading(false);
                }
            };

            fetchProfile();
        }
    }, [isAuthenticated]);

    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            const response = await UpdateFinancialProfileService.updateFinancialProfile(profile);
            setMessage('Profile updated successfully');
            setProfile(response.data.data);
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
            bg="brand.400"
            _dark={{ bg: "#111" }}
            p={10}
        >
            <Box
                bg="brand.100"
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
                            <Heading color="brand.600" fontSize="5xl" fontWeight="md" lineHeight="10">
                                Update
                            </Heading>
                            <Text
                                mt={1}
                                fontSize="2xl"
                                color="gray.600"
                                _dark={{ color: "gray.400" }}
                            >
                                your financial profile.
                            </Text>
                        </Box>
                    </GridItem>

                    <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
                        <chakra.form
                            onSubmit={handleUpdate}
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
                                    <FormControl color="brand.600" as={GridItem} colSpan={[6, 3]}>
                                        <FormLabel
                                            fontSize="md"
                                            fontWeight="md"
                                            color="gray.700"
                                            _dark={{ color: "gray.50" }}
                                        >
                                            Employment Status
                                        </FormLabel>
                                        <FormSelect
                                            placeholder="Select option"
                                            mt={1}
                                            focusBorderColor="brand.400"
                                            shadow="sm"
                                            size="sm"
                                            w="full"
                                            rounded="md"
                                            value={profile.employmentStatus}
                                            onChange={(value) => handleChange('employmentStatus', value)}
                                            options={employmentStatusOptions}
                                            required
                                        />
                                    </FormControl>

                                    <FormControl color="brand.600" as={GridItem} colSpan={[6, 3]}>
                                        <FormLabel
                                            fontSize="md"
                                            fontWeight="md"
                                            color="gray.700"
                                            _dark={{ color: "gray.50" }}
                                        >
                                            Annual Income
                                        </FormLabel>
                                        <FormSelect
                                            placeholder="Select option"
                                            mt={1}
                                            focusBorderColor="brand.400"
                                            shadow="sm"
                                            size="sm"
                                            w="full"
                                            rounded="md"
                                            value={profile.annualIncome}
                                            onChange={(value) => handleChange('annualIncome', value)}
                                            options={incomeOptions}
                                            required
                                        />
                                    </FormControl>

                                    <FormControl color="brand.600" as={GridItem} colSpan={[6, 4]}>
                                        <FormLabel
                                            fontSize="md"
                                            fontWeight="md"
                                            color="gray.700"
                                            _dark={{ color: "gray.50" }}
                                        >
                                            Net Worth
                                        </FormLabel>
                                        <FormSelect
                                            placeholder="Select option"
                                            mt={1}
                                            focusBorderColor="brand.400"
                                            shadow="sm"
                                            size="sm"
                                            w="full"
                                            rounded="md"
                                            value={profile.netWorth}
                                            onChange={(value) => handleChange('netWorth', value)}
                                            options={netWorthOptions}
                                            required
                                        />
                                    </FormControl>

                                    <FormControl color="brand.600" as={GridItem} colSpan={[6, 3]}>
                                        <FormLabel
                                            fontSize="md"
                                            fontWeight="md"
                                            color="gray.700"
                                            _dark={{ color: "gray.50" }}
                                        >
                                            Source of Wealth
                                        </FormLabel>
                                        <FormSelect
                                            placeholder="Select option"
                                            mt={1}
                                            focusBorderColor="brand.400"
                                            shadow="sm"
                                            size="sm"
                                            w="full"
                                            rounded="md"
                                            value={profile.sourceOfWealth}
                                            onChange={(value) => handleChange('sourceOfWealth', value)}
                                            options={sourceOfWealthOptions}
                                            required
                                        />
                                    </FormControl>

                                    <FormControl color="brand.600" as={GridItem} colSpan={[6, 3]}>
                                        <FormLabel
                                            fontSize="md"
                                            fontWeight="md"
                                            color="gray.700"
                                            _dark={{ color: "gray.50" }}
                                        >
                                            Investment Objective
                                        </FormLabel>
                                        <FormSelect
                                            placeholder="Select option"
                                            mt={1}
                                            focusBorderColor="brand.400"
                                            shadow="sm"
                                            size="sm"
                                            w="full"
                                            rounded="md"
                                            value={profile.investmentObjective}
                                            onChange={(value) => handleChange('investmentObjective', value)}
                                            options={investmentObjectiveOptions}
                                            required
                                        />
                                    </FormControl>

                                    <FormControl color="brand.600" as={GridItem} colSpan={[6, 3]}>
                                        <FormLabel
                                            fontSize="md"
                                            fontWeight="md"
                                            color="gray.700"
                                            _dark={{ color: "gray.50" }}
                                        >
                                            Investment Experience
                                        </FormLabel>
                                        <FormSelect
                                            placeholder="Select option"
                                            mt={1}
                                            focusBorderColor="brand.400"
                                            shadow="sm"
                                            size="sm"
                                            w="full"
                                            rounded="md"
                                            value={profile.investmentExperience}
                                            onChange={(value) => handleChange('investmentExperience', value)}
                                            options={investmentExperienceOptions}
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
                                    type="submit"
                                    colorScheme="brand"
                                    _focus={{ shadow: "" }}
                                    fontWeight="md"
                                >
                                    Update
                                </Button>

                                <Link to="/settings/profile">
                                    <Button
                                        type="button"
                                        colorScheme="brand"
                                        _focus={{ shadow: "" }}
                                        fontWeight="md"
                                        ml={4}
                                    >
                                        Return
                                    </Button>
                                </Link>

                                {message && <p>{message}</p>}
                            </Box>
                        </chakra.form>
                    </GridItem>
                </SimpleGrid>
            </Box>
        </Box>
    );
};

export default EditFinancialProfileForm;
