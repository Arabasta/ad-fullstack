import React, { useEffect } from 'react';
import {
    Box,
    SimpleGrid,
    GridItem,
    chakra,
    Stack,
    FormControl,
    FormLabel
} from '@chakra-ui/react';

import Heading from "../../common/text/Heading";
import Text from "../../common/text/Text";
import Button from "../../common/buttons/Button";
import FormSelect from "../../common/inputFields/FormSelect";

// 定义 incomeOptions 和 netWorthOptions 作为常量
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

const RegisterStep4Form = ({
                               employmentStatus, setEmploymentStatus,
                               annualIncome, setAnnualIncome,
                               netWorth, setNetWorth,
                               sourceOfWealth, setSourceOfWealth,
                               investmentObjective, setInvestmentObjective,
                               investmentExperience, setInvestmentExperience,
                               handlePrevious, handleNext
                           }) => {

    useEffect(() => {
        // 确保如果尚未设置值，则为其设置默认值
        if (!employmentStatus) setEmploymentStatus('EMPLOYED');
        if (!annualIncome) setAnnualIncome(incomeOptions[0].value); // 设置第一个选项为默认值
        if (!netWorth) setNetWorth(netWorthOptions[0].value); // 设置第一个选项为默认值
        if (!sourceOfWealth) setSourceOfWealth('SALARY');
        if (!investmentObjective) setInvestmentObjective('GROWTH');
        if (!investmentExperience) setInvestmentExperience('NONE');
    }, [employmentStatus, annualIncome, netWorth, sourceOfWealth, investmentObjective, investmentExperience, setEmploymentStatus, setAnnualIncome, setNetWorth, setSourceOfWealth, setInvestmentObjective, setInvestmentExperience]);

    return (
        <Box bg="brand.400" _dark={{ bg: "#111" }} p={10}>
            <Box bg="brand.100" _dark={{ bg: "#111" }} p={30}>
                <SimpleGrid display={{ base: "initial", md: "grid" }} columns={{ md: 3 }} spacing={{ md: 6 }}>
                    <GridItem colSpan={{ md: 1 }}>
                        <Box px={[4, 0]}>
                            <Heading color="brand.100" fontSize="5xl" fontWeight="md" lineHeight="10">
                                Register
                            </Heading>
                            <Text mt={1} fontSize="2xl" color="gray.600" _dark={{ color: "gray.400" }}>
                                Almost there.
                            </Text>
                        </Box>
                    </GridItem>

                    <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
                        <chakra.form onSubmit={handleNext} shadow="base" rounded={[null, "md"]} overflow={{ lg: "hidden" }} color="brand.100">
                            <Stack px={4} py={8} bg="white" _dark={{ bg: "#141517" }} spacing={6} p={{ sm: 6 }}>
                                <SimpleGrid columns={6} spacing={6}>
                                    <FormControl color="brand.600" as={GridItem} colSpan={[6, 3]}>
                                        <FormLabel fontSize="md" fontWeight="md" color="gray.700" _dark={{ color: "gray.50" }}>
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
                                            value={employmentStatus}
                                            onChange={(value) => setEmploymentStatus(value.toString())}
                                            options={[
                                                { label: 'Employed', value: 'EMPLOYED' },
                                                { label: 'Self-Employed', value: 'SELF_EMPLOYED' },
                                                { label: 'Unemployed', value: 'UNEMPLOYED' },
                                                { label: 'Retired', value: 'RETIRED' },
                                                { label: 'Student', value: 'STUDENT' },
                                                { label: 'Other', value: 'OTHER' }
                                            ]}
                                            required
                                        />
                                    </FormControl>

                                    <FormControl color="brand.600" as={GridItem} colSpan={[6, 3]}>
                                        <FormLabel fontSize="md" fontWeight="md" color="gray.700" _dark={{ color: "gray.50" }}>
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
                                            value={annualIncome}
                                            onChange={(value) => setAnnualIncome(value.toString())}
                                            options={incomeOptions}
                                            required
                                        />
                                    </FormControl>

                                    <FormControl color="brand.600" as={GridItem} colSpan={[6, 4]}>
                                        <FormLabel fontSize="md" fontWeight="md" color="gray.700" _dark={{ color: "gray.50" }}>
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
                                            value={netWorth}
                                            onChange={(value) => setNetWorth(value.toString())}
                                            options={netWorthOptions}
                                            required
                                        />
                                    </FormControl>

                                    <FormControl color="brand.600" as={GridItem} colSpan={[6, 3]}>
                                        <FormLabel fontSize="md" fontWeight="md" color="gray.700" _dark={{ color: "gray.50" }}>
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
                                            value={sourceOfWealth}
                                            onChange={(value) => setSourceOfWealth(value.toString())}
                                            options={[
                                                { label: 'Salary', value: 'SALARY' },
                                                { label: 'Business', value: 'BUSINESS' },
                                                { label: 'Investments', value: 'INVESTMENTS' },
                                                { label: 'Inheritance', value: 'INHERITANCE' },
                                                { label: 'Other', value: 'OTHER' }
                                            ]}
                                            required
                                        />
                                    </FormControl>

                                    <FormControl color="brand.600" as={GridItem} colSpan={[6, 3]}>
                                        <FormLabel fontSize="md" fontWeight="md" color="gray.700" _dark={{ color: "gray.50" }}>
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
                                            value={investmentObjective}
                                            onChange={(value) => setInvestmentObjective(value.toString())}
                                            options={[
                                                { label: 'Growth', value: 'GROWTH' },
                                                { label: 'Income', value: 'INCOME' },
                                                { label: 'Capital Preservation', value: 'CAPITAL_PRESERVATION' },
                                                { label: 'Speculation', value: 'SPECULATION' },
                                                { label: 'Other', value: 'OTHER' }
                                            ]}
                                            required
                                        />
                                    </FormControl>

                                    <FormControl color="brand.600" as={GridItem} colSpan={[6, 3]}>
                                        <FormLabel fontSize="md" fontWeight="md" color="gray.700" _dark={{ color: "gray.50" }}>
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
                                            value={investmentExperience}
                                            onChange={(value) => setInvestmentExperience(value.toString())}
                                            options={[
                                                { label: 'None', value: 'NONE' },
                                                { label: 'Limited', value: 'LIMITED' },
                                                { label: 'Moderate', value: 'MODERATE' },
                                                { label: 'Extensive', value: 'EXTENSIVE' }
                                            ]}
                                            required
                                        />
                                    </FormControl>
                                </SimpleGrid>
                            </Stack>

                            <Box px={{ base: 4, sm: 6 }} py={3} bg="gray.50" _dark={{ bg: "#121212" }} textAlign="right">
                                <Button type="button" onClick={handlePrevious} colorScheme="brand" _focus={{ shadow: "" }} fontWeight="md">
                                    Back
                                </Button>
                                <Button type="submit" colorScheme="brand" _focus={{ shadow: "" }} fontWeight="md">
                                    Next
                                </Button>
                            </Box>
                        </chakra.form>
                    </GridItem>
                </SimpleGrid>
            </Box>
        </Box>
    );
};

export default RegisterStep4Form;
