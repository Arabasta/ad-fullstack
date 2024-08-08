import React, {useEffect, useState} from 'react';
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
import {Link} from "react-router-dom";

const EditFinancialProfileForm = ({ financialProfile, onSubmit }) => {
    const [employmentStatus, setEmploymentStatus] = useState(financialProfile.employmentStatus);

    const [annualIncome, setAnnualIncome] = useState(financialProfile.annualIncome);
    const [netWorth, setNetWorth] = useState(financialProfile.netWorth);

    const [sourceOfWealth, setSourceOfWealth] = useState(financialProfile.sourceOfWealth);
    const [investmentObjective, setInvestmentObjective] = useState(financialProfile.investmentObjective);
    const [investmentExperience, setInvestmentExperience] = useState(financialProfile.investmentExperience);

    useEffect(() => {
        setEmploymentStatus(financialProfile.employmentStatus);
        setAnnualIncome(financialProfile.annualIncome);
        setNetWorth(financialProfile.netWorth);
        setSourceOfWealth(financialProfile.sourceOfWealth);
        setInvestmentObjective(financialProfile.investmentObjective);
        setInvestmentExperience(financialProfile.investmentExperience);
    }, [financialProfile]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            employmentStatus,
            annualIncome,
            netWorth,
            sourceOfWealth,
            investmentObjective,
            investmentExperience,
        });
    };

    /*
    const employmentStatusOptions = [
        { label: 'Employed', value: 1 },
        { label: 'Self-Employed', value: 2 },
        { label: 'Unemployed', value: 3 },
        { label: 'Retired', value: 4 },
        { label: 'Student', value: 5 },
        { label: 'Other', value: 6 }
    ]

     */

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

    /*
    const sourceOfWealthOptions = [
        { label: 'Salary', value: 1 },
        { label: 'Business', value: 2 },
        { label: 'Investments', value: 3 },
        { label: 'Inheritance', value: 4 },
        { label: 'Other', value: 5 }
    ]
     */

    const investmentExperienceOptions = [
        { label: 'None', value: 1 },
        { label: 'Limited', value: 2 },
        { label: 'Moderate', value: 3 },
        { label: 'Extensive', value: 4 }
    ]

    const investmentObjectiveOptions = [
        { label: 'Growth', value: 1 },
        { label: 'Income', value: 2 },
        { label: 'Capital Preservation', value: 3 },
        { label: 'Speculation', value: 4 },
        { label: 'Other', value: 5 }
    ]

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
                                your details.
                            </Text>
                        </Box>
                    </GridItem>

                    <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
                        <chakra.form
                            onsubmit={handleSubmit}
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
                                    <FormControl
                                        color="brand.600"
                                        borderColor="brand.300"
                                        as={GridItem} colSpan={[6, 3]}>
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
                                            shadow="sm"
                                            size="sm"
                                            w="full"
                                            rounded="md"
                                            value={employmentStatus}
                                            onChange={(value) => setEmploymentStatus(value.toString())}
                                            options={[
                                                { label: 'Employed', value: 0 },
                                                { label: 'Self-Employed', value: 1 },
                                                { label: 'Unemployed', value: 2 },
                                                { label: 'Retired', value: 3 },
                                                { label: 'Student', value: 4 },
                                                { label: 'Other', value: 5 }
                                            ]}
                                            required

                                        />
                                    </FormControl>

                                    <FormControl
                                        color="brand.600"
                                        as={GridItem} colSpan={[6, 3]}>
                                        <FormLabel
                                            fontSize="md"
                                            fontWeight="md"
                                            color="gray.700"
                                            _dark={{ color: "gray.50" }}
                                        >
                                            Annual Income
                                        </FormLabel>
                                        <FormSelect
                                            mt={1}
                                            focusBorderColor="brand.400"
                                            shadow="sm"
                                            size="sm"
                                            w="full"
                                            rounded="md"
                                            value={annualIncome}
                                            onChange={setAnnualIncome}
                                            options={incomeOptions}
                                            required
                                        />
                                    </FormControl>

                                    <FormControl color="brand.600"
                                                 as={GridItem} colSpan={[6, 4]}>
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
                                            value={netWorth}
                                            onChange={setNetWorth}
                                            options={netWorthOptions}
                                            required
                                        />
                                    </FormControl>

                                    <FormControl color="brand.600"
                                                 as={GridItem} colSpan={[6, 3]}>
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
                                            value={sourceOfWealth}
                                            onChange={setSourceOfWealth}
                                            options={[
                                                { label: 'Salary', value: 0 },
                                                { label: 'Business', value: 1 },
                                                { label: 'Investments', value: 2 },
                                                { label: 'Inheritance', value: 3 },
                                                { label: 'Other', value: 4 }
                                            ]}
                                            required
                                        />
                                    </FormControl>

                                    <FormControl color="brand.600"
                                                 as={GridItem} colSpan={[6, 3]}>
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
                                            value={investmentObjective}
                                            onChange={setInvestmentObjective}
                                            options={ investmentObjectiveOptions}
                                            required
                                        />
                                    </FormControl>

                                    <FormControl color="brand.600"
                                                 as={GridItem} colSpan={[6, 3]}>
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
                                            value={investmentExperience}
                                            onChange={setInvestmentExperience}
                                            options={investmentExperienceOptions}
                                            required
                                        />
                                        <Button
                                            onClick={handleSubmit}
                                            colorScheme="brand"
                                            _focus={{ shadow: "" }}
                                            fontWeight="md"
                                        >
                                            Update
                                        </Button>
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

                            </Box>
                        </chakra.form>
                    </GridItem>
                </SimpleGrid>
            </Box>
        </Box>
    );
};

export default EditFinancialProfileForm;