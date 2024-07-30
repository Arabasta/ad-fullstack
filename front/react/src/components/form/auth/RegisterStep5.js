import React from 'react';
import {
    Stack,
    FormControl,
    FormLabel,
    Button,
    Heading,
    ButtonGroup,
    Box,
    Text,
    VStack,
    Tooltip,
} from '@chakra-ui/react';

const RegisterStep5 = ({
                           investmentDurationScore, setInvestmentDurationScore,
                           withdrawalSpendingPlanScore, setWithdrawalSpendingPlanScore,
                           investmentKnowledgeScore, setInvestmentKnowledgeScore,
                           riskRewardScore, setRiskRewardScore,
                           ownedInvestmentsScore, setOwnedInvestmentsScore,
                           investmentPersonalityScore, setInvestmentPersonalityScore,
                           handlePrevious, handleRegister, message
                       }) => {
    const handleButtonChange = (setter, value) => {
        setter(value);
    };

    const renderButtons = (setter, value, min, max, labels, descriptions) => {
        let buttons = [];
        for (let i = min; i <= max; i++) {
            buttons.push(
                <Tooltip key={i} label={descriptions[i - 1]} fontSize="md">
                    <Button
                        colorScheme={i === value ? 'teal' : 'gray'}
                        onClick={() => handleButtonChange(setter, i)}
                        m={1}
                    >
                        {i}
                    </Button>
                </Tooltip>
            );
        }
        return (
            <VStack>
                <ButtonGroup isAttached>
                    {buttons}
                </ButtonGroup>
                <Text color="gray.500">{labels[value - 1]}</Text>
            </VStack>
        );
    };

    const durationLabels = [
        "Less than 3 years",
        "3-5 years",
        "6-10 years",
        "11 years or more"
    ];

    const durationDescriptions = [
        "You plan to begin withdrawing money from your investments in less than 3 years.",
        "You plan to begin withdrawing money from your investments in 3-5 years.",
        "You plan to begin withdrawing money from your investments in 6-10 years.",
        "You plan to begin withdrawing money from your investments in 11 years or more."
    ];

    const spendingPlanLabels = [
        "Less than 2 years",
        "2-5 years",
        "6-10 years",
        "11 years or more"
    ];

    const spendingPlanDescriptions = [
        "Once you begin withdrawing funds, you plan to spend all the funds in less than 2 years.",
        "Once you begin withdrawing funds, you plan to spend all the funds in 2-5 years.",
        "Once you begin withdrawing funds, you plan to spend all the funds in 6-10 years.",
        "Once you begin withdrawing funds, you plan to spend all the funds in 11 years or more."
    ];

    const knowledgeLabels = [
        "No Knowledge",
        "Limited Knowledge",
        "Moderate Knowledge",
        "Extensive Knowledge"
    ];

    const knowledgeDescriptions = [
        "You have no prior knowledge about investments.",
        "You have limited knowledge about investments.",
        "You have moderate knowledge about investments.",
        "You have extensive knowledge about investments."
    ];

    const riskLabels = [
        "Take lower than average risks expecting to earn lower than average returns",
        "Take average risks expecting to earn average returns",
        "Take above average risks expecting to earn above average returns"
    ];

    const riskDescriptions = [
        "You prefer minimal risk with lower returns.",
        "You are comfortable with moderate risk for higher returns.",
        "You are very comfortable with very high risk for maximum returns."
    ];

    const experienceLabels = [
        "Bonds and/or bond funds",
        "Stocks and/or stock funds",
        "International securities and/or international funds"
    ];

    const experienceDescriptions = [
        "You currently own or have owned bonds and/or bond funds.",
        "You currently own or have owned stocks and/or stock funds.",
        "You currently own or have owned international securities and/or international funds."
    ];

    const personalityLabels = [
        "Sell all of my shares",
        "Sell some of my shares",
        "Do nothing",
        "Buy more shares"
    ];

    const personalityDescriptions = [
        "You would sell all of your shares if the stock market lost 25% of its value.",
        "You would sell some of your shares if the stock market lost 25% of its value.",
        "You would do nothing if the stock market lost 25% of its value.",
        "You would buy more shares if the stock market lost 25% of its value."
    ];

    return (
        <Stack spacing={6}>
            <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
                Investor Profile
            </Heading>
            <FormControl id="investmentDurationScore" isRequired>
                <FormLabel>1. I plan to begin withdrawing money from my investments in:</FormLabel>
                {renderButtons(setInvestmentDurationScore, investmentDurationScore, 1, 4, durationLabels, durationDescriptions)}
            </FormControl>
            <FormControl id="withdrawalSpendingPlanScore" isRequired>
                <FormLabel>2. Once I begin withdrawing funds from my investments, I plan to spend all of the funds in:</FormLabel>
                {renderButtons(setWithdrawalSpendingPlanScore, withdrawalSpendingPlanScore, 1, 4, spendingPlanLabels, spendingPlanDescriptions)}
            </FormControl>
            <FormControl id="investmentKnowledgeScore" isRequired>
                <FormLabel>3. I would describe my knowledge of investments as:</FormLabel>
                {renderButtons(setInvestmentKnowledgeScore, investmentKnowledgeScore, 1, 4, knowledgeLabels, knowledgeDescriptions)}
            </FormControl>
            <FormControl id="riskRewardScore" isRequired>
                <FormLabel>4. What amount of financial risk are you willing to take when you invest?</FormLabel>
                {renderButtons(setRiskRewardScore, riskRewardScore, 1, 3, riskLabels, riskDescriptions)}
            </FormControl>
            <FormControl id="ownedInvestmentsScore" isRequired>
                <FormLabel>5. Select the investments you currently own or have owned:</FormLabel>
                {renderButtons(setOwnedInvestmentsScore, ownedInvestmentsScore, 1, 3, experienceLabels, experienceDescriptions)}
            </FormControl>
            <FormControl id="investmentPersonalityScore" isRequired>
                <FormLabel>6. Consider this scenario: Imagine that in the past three months, the overall stock market lost 25% of its value. An individual stock investment you own also lost 25% of its value. What would you do?</FormLabel>
                {renderButtons(setInvestmentPersonalityScore, investmentPersonalityScore, 1, 4, personalityLabels, personalityDescriptions)}
            </FormControl>
            <ButtonGroup mt="5%" w="100%">
                <Button onClick={handlePrevious} colorScheme="teal" variant="solid" w="7rem" mr="5%">
                    Back
                </Button>
                <Button onClick={handleRegister} colorScheme="teal" variant="solid" w="7rem">
                    Register
                </Button>
            </ButtonGroup>
            {message && (
                <Box mt={4}>
                    <Text color="red.500" textAlign="center">
                        {message}
                    </Text>
                </Box>
            )}
        </Stack>
    );
};

export default RegisterStep5;
