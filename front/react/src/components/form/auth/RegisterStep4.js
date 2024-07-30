import React from 'react';
import {
    Stack,
    FormControl,
    FormLabel,
    Select,
    Button,
    Heading,
    ButtonGroup,
    Tooltip,
    VStack,
    Box,
    Text,
} from '@chakra-ui/react';

const RegisterStep4 = ({
                           employmentStatus, setEmploymentStatus, annualIncome, setAnnualIncome, netWorth, setNetWorth,
                           sourceOfWealth, setSourceOfWealth, investmentObjective, setInvestmentObjective, investmentExperience,
                           setInvestmentExperience, handlePrevious, handleNext
                       }) => {
    const incomeRanges = [
        { label: "Less than $20,000", value: "20000" },
        { label: "$20,000 - $50,000", value: "50000" },
        { label: "$50,000 - $100,000", value: "100000" },
        { label: "$100,000 - $200,000", value: "200000" },
        { label: "$200,000 - $500,000", value: "500000" },
        { label: "More than $500,000", value: "500001" }
    ];

    const netWorthRanges = [
        { label: "Less than $50,000", value: "50000" },
        { label: "$50,000 - $100,000", value: "100000" },
        { label: "$100,000 - $500,000", value: "500000" },
        { label: "$500,000 - $1,000,000", value: "1000000" },
        { label: "More than $1,000,000", value: "1000001" }
    ];

    const descriptions = {
        employmentStatus: [
            "Full-time or part-time employed.",
            "Self-employed or freelancer.",
            "Currently not employed.",
            "Retired from work.",
            "Currently a student.",
            "Other employment status."
        ],
        sourceOfWealth: [
            "Income from salary or wages.",
            "Income from business activities.",
            "Income from investments.",
            "Income from inheritance.",
            "Other sources of wealth."
        ],
        investmentObjective: [
            "Focus on growing your investments.",
            "Focus on generating income.",
            "Focus on preserving capital.",
            "Focus on speculative investments.",
            "Other investment objectives."
        ],
        investmentExperience: [
            "No prior investment experience.",
            "Limited investment experience.",
            "Moderate investment experience.",
            "Extensive investment experience."
        ]
    };

    return (
        <Stack spacing={6}>
            <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
                Financial Profile
            </Heading>
            <FormControl id="employmentStatus" isRequired>
                <FormLabel>Employment Status</FormLabel>
                <Tooltip label={descriptions.employmentStatus[employmentStatus]} fontSize="md">
                    <Select value={employmentStatus} onChange={(e) => setEmploymentStatus(e.target.value)}>
                        <option value="EMPLOYED">Employed</option>
                        <option value="SELF_EMPLOYED">Self-Employed</option>
                        <option value="UNEMPLOYED">Unemployed</option>
                        <option value="RETIRED">Retired</option>
                        <option value="STUDENT">Student</option>
                        <option value="OTHER">Other</option>
                    </Select>
                </Tooltip>
            </FormControl>
            <FormControl id="annualIncome" isRequired>
                <FormLabel>Annual Income</FormLabel>
                <Select value={annualIncome} onChange={(e) => setAnnualIncome(e.target.value)}>
                    {incomeRanges.map(range => (
                        <option key={range.value} value={range.value}>{range.label}</option>
                    ))}
                </Select>
            </FormControl>
            <FormControl id="netWorth" isRequired>
                <FormLabel>Net Worth</FormLabel>
                <Select value={netWorth} onChange={(e) => setNetWorth(e.target.value)}>
                    {netWorthRanges.map(range => (
                        <option key={range.value} value={range.value}>{range.label}</option>
                    ))}
                </Select>
            </FormControl>
            <FormControl id="sourceOfWealth" isRequired>
                <FormLabel>Source of Wealth</FormLabel>
                <Tooltip label={descriptions.sourceOfWealth[sourceOfWealth]} fontSize="md">
                    <Select value={sourceOfWealth} onChange={(e) => setSourceOfWealth(e.target.value)}>
                        <option value="SALARY">Salary</option>
                        <option value="BUSINESS">Business</option>
                        <option value="INVESTMENTS">Investments</option>
                        <option value="INHERITANCE">Inheritance</option>
                        <option value="OTHER">Other</option>
                    </Select>
                </Tooltip>
            </FormControl>
            <FormControl id="investmentObjective" isRequired>
                <FormLabel>Investment Objective</FormLabel>
                <Tooltip label={descriptions.investmentObjective[investmentObjective]} fontSize="md">
                    <Select value={investmentObjective} onChange={(e) => setInvestmentObjective(e.target.value)}>
                        <option value="GROWTH">Growth</option>
                        <option value="INCOME">Income</option>
                        <option value="CAPITAL_PRESERVATION">Capital Preservation</option>
                        <option value="SPECULATION">Speculation</option>
                        <option value="OTHER">Other</option>
                    </Select>
                </Tooltip>
            </FormControl>
            <FormControl id="investmentExperience" isRequired>
                <FormLabel>Investment Experience</FormLabel>
                <Tooltip label={descriptions.investmentExperience[investmentExperience]} fontSize="md">
                    <Select value={investmentExperience} onChange={(e) => setInvestmentExperience(e.target.value)}>
                        <option value="NONE">None</option>
                        <option value="LIMITED">Limited</option>
                        <option value="MODERATE">Moderate</option>
                        <option value="EXTENSIVE">Extensive</option>
                    </Select>
                </Tooltip>
            </FormControl>
            <ButtonGroup mt="5%" w="100%">
                <Button onClick={handlePrevious} colorScheme="teal" variant="solid" w="7rem" mr="5%">
                    Back
                </Button>
                <Button onClick={handleNext} colorScheme="teal" variant="outline" w="7rem">
                    Next
                </Button>
            </ButtonGroup>
        </Stack>
    );
};

export default RegisterStep4;
