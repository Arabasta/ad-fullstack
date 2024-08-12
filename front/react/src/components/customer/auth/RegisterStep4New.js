import React from 'react';
import {
    Box,
    SimpleGrid,
    GridItem,
    chakra,
    Stack,
    FormControl,
    FormLabel,
    Flex,
} from '@chakra-ui/react';

import Heading from "../../common/text/Heading";
import Text from "../../common/text/Text";
import Button from "../../common/buttons/Button";
import FormSelect from "../../common/inputFields/FormSelect";

const RegisterStep4Form = ({
                               employmentStatus, setEmploymentStatus,
                               annualIncome, setAnnualIncome,
                               netWorth, setNetWorth,
                               sourceOfWealth, setSourceOfWealth,
                               investmentObjective, setInvestmentObjective,
                               investmentExperience, setInvestmentExperience,
                               handlePrevious, handleNext
                           }) => {

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
                                Financial Profile
                            </Heading>
                            <Text
                                mt={1}
                                fontSize="2xl"
                                color="gray.600"
                                _dark={{ color: "gray.400" }}
                            >
                                Almost there.
                            </Text>
                            <Heading color="brand.600" fontSize="2xl" fontWeight="md" lineHeight="10" mt={5}>
                                Why we collect this information?
                            </Heading>
                            <Text
                              mt={1}
                              fontSize="xl"
                              color="gray.600"
                              _dark={{ color: "gray.400" }}
                            >
                                In the financial services industry, adherence to regulatory standards is paramount to maintaining the trust of our users and ensuring the integrity of our operations. FourQuant is committed to full compliance with all relevant laws and regulations governing financial services, data privacy, and consumer protection.
                            </Text>
                        </Box>
                    </GridItem>

                    <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
                        <chakra.form
                            onSubmit={handleNext}
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
                                            value={employmentStatus !== undefined ? employmentStatus : employmentStatusOptions[0].value}
                                            onChange={(value) => setEmploymentStatus(value.toString())}
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
                                            value={annualIncome !== undefined ? annualIncome : incomeOptions[0].value}
                                            onChange={(value) => setAnnualIncome(value.toString())}
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
                                            value={netWorth !== undefined ? netWorth : netWorthOptions[0].value}
                                            onChange={(value) => setNetWorth(value.toString())}
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
                                            value={sourceOfWealth !== undefined ? sourceOfWealth : sourceOfWealthOptions[0].value}
                                            onChange={(value) => setSourceOfWealth(value.toString())}
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
                                            value={investmentObjective !== undefined ? investmentObjective : investmentObjectiveOptions[0].value}
                                            onChange={(value) => setInvestmentObjective(value.toString())}
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
                                            value={investmentExperience !== undefined ? investmentExperience : investmentExperienceOptions[0].value}
                                            onChange={(value) => setInvestmentExperience(value.toString())}
                                            options={investmentExperienceOptions}
                                            required
                                        />
                                    </FormControl>
                                </SimpleGrid>
                            </Stack>

                            <Flex
                                px={{ base: 4, sm: 6 }}
                                py={3}
                                bg="gray.50"
                                _dark={{ bg: "#121212" }}
                                justifyContent="space-between"
                            >
                                <Button
                                    type="button"
                                    onClick={handlePrevious}
                                    _focus={{ shadow: "" }}
                                    fontWeight="md"
                                >
                                    Back
                                </Button>
                                <Button
                                    type="submit"
                                    _focus={{ shadow: "" }}
                                    fontWeight="md"
                                >
                                    Next
                                </Button>
                            </Flex>
                        </chakra.form>
                    </GridItem>
                </SimpleGrid>
            </Box>
        </Box>
    );
};

export default RegisterStep4Form;
