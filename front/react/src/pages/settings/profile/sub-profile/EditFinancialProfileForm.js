import React, { useState, useEffect } from 'react';
import {
    Box,
    SimpleGrid,
    GridItem,
    chakra,
    Stack,
    FormControl,
    FormLabel,
    Select,
    Button,
    Text,
    Flex,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import useFinancialProfile from "../../../../hooks/useFinancialProfile";

const employmentStatusOptions = [
    'EMPLOYED',
    'SELF_EMPLOYED',
    'UNEMPLOYED',
    'RETIRED',
    'STUDENT',
    'OTHER'
];

const sourceOfWealthOptions = [
    'SALARY',
    'BUSINESS',
    'INVESTMENTS',
    'INHERITANCE',
    'OTHER'
];

const investmentObjectiveOptions = [
    'GROWTH',
    'INCOME',
    'CAPITAL_PRESERVATION',
    'SPECULATION',
    'OTHER'
];

const investmentExperienceOptions = [
    'NONE',
    'LIMITED',
    'MODERATE',
    'EXTENSIVE'
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

const FinancialProfileForm = () => {
    const { financialProfile, loading, error, updateFinancialProfile } = useFinancialProfile();
    const [formData, setFormData] = useState({
        employmentStatus: '',
        annualIncome: '',
        netWorth: '',
        sourceOfWealth: '',
        investmentObjective: '',
        investmentExperience: ''
    });

    const [message, setMessage] = useState('');

    useEffect(() => {
        if (financialProfile) {
            setFormData({
                employmentStatus: financialProfile.employmentStatus,
                annualIncome: financialProfile.annualIncome,
                netWorth: financialProfile.netWorth,
                sourceOfWealth: financialProfile.sourceOfWealth,
                investmentObjective: financialProfile.investmentObjective,
                investmentExperience: financialProfile.investmentExperience
            });
        }
    }, [financialProfile]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateFinancialProfile(formData);
            setMessage('Profile updated successfully!');
        } catch (err) {
            setMessage('Error updating profile.');
        }
    };

    const renderOptions = (options) => {
        return options.map(option => (
            <option key={option} value={option}>
                {option.replace('_', ' ')}
            </option>
        ));
    };

    const renderLabeledOptions = (options) => {
        return options.map(option => (
            <option key={option.value} value={option.value}>
                {option.label}
            </option>
        ));
    };

    if (loading) return <Box>Loading...</Box>;
    if (error) return <Box>Error: {error.message}</Box>;

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
                            <Text color="brand.600" fontSize="5xl" fontWeight="md" lineHeight="10">
                                Update Financial Profile
                            </Text>
                            <Text
                                mt={1}
                                fontSize="2xl"
                                color="gray.600"
                                _dark={{ color: "gray.400" }}
                            >
                                Review and update your financial details.
                            </Text>
                        </Box>
                    </GridItem>

                    <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
                        <chakra.form
                            onSubmit={handleSubmit}
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
                                        <Select
                                            name="employmentStatus"
                                            mt={1}
                                            focusBorderColor="brand.400"
                                            shadow="sm"
                                            size="sm"
                                            w="full"
                                            rounded="md"
                                            value={formData.employmentStatus}
                                            onChange={handleChange}
                                            required
                                        >
                                            {renderOptions(employmentStatusOptions)}
                                        </Select>
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
                                        <Select
                                            name="annualIncome"
                                            mt={1}
                                            focusBorderColor="brand.400"
                                            shadow="sm"
                                            size="sm"
                                            w="full"
                                            rounded="md"
                                            value={formData.annualIncome}
                                            onChange={handleChange}
                                            required
                                        >
                                            {renderLabeledOptions(incomeOptions)}
                                        </Select>
                                    </FormControl>

                                    <FormControl color="brand.600" as={GridItem} colSpan={[6, 3]}>
                                        <FormLabel
                                            fontSize="md"
                                            fontWeight="md"
                                            color="gray.700"
                                            _dark={{ color: "gray.50" }}
                                        >
                                            Net Worth
                                        </FormLabel>
                                        <Select
                                            name="netWorth"
                                            mt={1}
                                            focusBorderColor="brand.400"
                                            shadow="sm"
                                            size="sm"
                                            w="full"
                                            rounded="md"
                                            value={formData.netWorth}
                                            onChange={handleChange}
                                            required
                                        >
                                            {renderLabeledOptions(netWorthOptions)}
                                        </Select>
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
                                        <Select
                                            name="sourceOfWealth"
                                            mt={1}
                                            focusBorderColor="brand.400"
                                            shadow="sm"
                                            size="sm"
                                            w="full"
                                            rounded="md"
                                            value={formData.sourceOfWealth}
                                            onChange={handleChange}
                                            required
                                        >
                                            {renderOptions(sourceOfWealthOptions)}
                                        </Select>
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
                                        <Select
                                            name="investmentObjective"
                                            mt={1}
                                            focusBorderColor="brand.400"
                                            shadow="sm"
                                            size="sm"
                                            w="full"
                                            rounded="md"
                                            value={formData.investmentObjective}
                                            onChange={handleChange}
                                            required
                                        >
                                            {renderOptions(investmentObjectiveOptions)}
                                        </Select>
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
                                        <Select
                                            name="investmentExperience"
                                            mt={1}
                                            focusBorderColor="brand.400"
                                            shadow="sm"
                                            size="sm"
                                            w="full"
                                            rounded="md"
                                            value={formData.investmentExperience}
                                            onChange={handleChange}
                                            required
                                        >
                                            {renderOptions(investmentExperienceOptions)}
                                        </Select>
                                    </FormControl>
                                </SimpleGrid>
                            </Stack>

                            <Flex
                                px={{ base: 4, sm: 6 }}
                                py={3}
                                bg="gray.50"
                                _dark={{ bg: "#121212" }}
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Link to="/settings/profile">
                                    <Button
                                        type="button"
                                        colorScheme="brand"
                                        _focus={{ shadow: "" }}
                                        fontWeight="md"
                                    >
                                        Return
                                    </Button>
                                </Link>

                                <Button
                                    type="submit"
                                    colorScheme="brand"
                                    _focus={{ shadow: "" }}
                                    fontWeight="md"
                                >
                                    Update Profile
                                </Button>
                            </Flex>

                            <Box
                                px={{ base: 4, sm: 6 }}
                                py={3}
                                bg="gray.50"
                                _dark={{ bg: "#121212" }}
                                textAlign="right"
                            >
                                {message && <Text mt={3} color="black">{message}</Text>}
                            </Box>
                        </chakra.form>
                    </GridItem>
                </SimpleGrid>
            </Box>
        </Box>
    );
};

export default FinancialProfileForm;
