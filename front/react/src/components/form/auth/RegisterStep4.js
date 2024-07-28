import React from 'react';
import { FormControl, FormLabel, Input, Button, Stack, Flex, Textarea } from '@chakra-ui/react';

const RegisterStep4 = ({
                           employmentStatus, setEmploymentStatus, annualIncome, setAnnualIncome, netWorth, setNetWorth,
                           sourceOfWealth, setSourceOfWealth, investmentObjective, setInvestmentObjective, investmentExperience,
                           setInvestmentExperience, handlePrevious, handleRegister, message
                       }) => {
    return (
        <Stack spacing={4}>
            <FormControl>
                <FormLabel>Employment Status</FormLabel>
                <Input
                    type="text"
                    value={employmentStatus}
                    onChange={(e) => setEmploymentStatus(e.target.value)}
                />
            </FormControl>
            <FormControl>
                <FormLabel>Annual Income</FormLabel>
                <Input
                    type="number"
                    value={annualIncome}
                    onChange={(e) => setAnnualIncome(e.target.value)}
                />
            </FormControl>
            <FormControl>
                <FormLabel>Net Worth</FormLabel>
                <Input
                    type="number"
                    value={netWorth}
                    onChange={(e) => setNetWorth(e.target.value)}
                />
            </FormControl>
            <FormControl>
                <FormLabel>Source of Wealth</FormLabel>
                <Input
                    type="text"
                    value={sourceOfWealth}
                    onChange={(e) => setSourceOfWealth(e.target.value)}
                />
            </FormControl>
            <FormControl>
                <FormLabel>Investment Objective</FormLabel>
                <Input
                    type="text"
                    value={investmentObjective}
                    onChange={(e) => setInvestmentObjective(e.target.value)}
                />
            </FormControl>
            <FormControl>
                <FormLabel>Investment Experience</FormLabel>
                <Input
                    type="text"
                    value={investmentExperience}
                    onChange={(e) => setInvestmentExperience(e.target.value)}
                />
            </FormControl>
            <Flex justify="space-between">
                <Button onClick={handlePrevious} colorScheme="teal" variant="outline">Previous</Button>
                <Button onClick={handleRegister} colorScheme="teal" type="submit">Register</Button>
            </Flex>
            {message && <p>{message}</p>}
        </Stack>
    );
};

export default RegisterStep4;
