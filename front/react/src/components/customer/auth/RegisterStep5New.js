import React  from 'react';
import {
    Box,
    SimpleGrid,
    GridItem,
    chakra,
    Stack,
    FormControl,
    FormLabel,
    Flex
} from '@chakra-ui/react';

import Heading from "../../common/text/Heading";
import Text from "../../common/text/Text";
import Button from "../../common/buttons/Button";
import FormSelect from "../../common/inputFields/FormSelect";

const RegisterStep5Form = ({
                               investmentDurationScore, setInvestmentDurationScore,
                               withdrawalSpendingPlanScore, setWithdrawalSpendingPlanScore,
                               investmentKnowledgeScore, setInvestmentKnowledgeScore,
                               riskRewardScore, setRiskRewardScore,
                               ownedInvestmentsScore, setOwnedInvestmentsScore,
                               investmentPersonalityScore, setInvestmentPersonalityScore,
                               handlePrevious, handleRegister
                           }) => {

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
                                Investor Profile
                            </Heading>
                            <Text
                                mt={1}
                                fontSize="2xl"
                                color="gray.600"
                                _dark={{ color: "gray.400" }}
                            >
                                The end is near.
                            </Text>
                            <Heading color="brand.600" fontSize="2xl" fontWeight="md" lineHeight="10" mt={5}>
                                Find a suitable investment strategy
                            </Heading>
                            <Text
                              mt={2}
                              fontSize="xl"
                              color="gray.600"
                              _dark={{ color: "gray.400" }}
                            >
                                Your investing strategy should reflect the kind of investor you are—your personal investor profile. This quiz will help you determine your profile and then match it to an investment strategy that’s designed for investors like you.
                            </Text>
                            <Heading color="brand.600" fontSize="2xl" fontWeight="md" lineHeight="10" mt={5}>
                                Your time horizon
                            </Heading>
                            <Text
                              mt={2}
                              fontSize="xl"
                              color="gray.600"
                              _dark={{ color: "gray.400" }}
                            >
                                When will you begin withdrawing money from your account and at what rate? If it’s many years away, you may be comfortable with a portfolio that has a greater potential for appreciation and a higher level of risk.
                            </Text>
                            <Heading color="brand.600" fontSize="2xl" fontWeight="md" lineHeight="10" mt={5}>
                                Your risk tolerance
                            </Heading>
                            <Text
                              mt={2}
                              fontSize="xl"
                              color="gray.600"
                              _dark={{ color: "gray.400" }}
                            >
                                How do you feel about risk? Some investments fluctuate more dramatically in value than others but may have the potential for higher returns.
                            </Text>
                        </Box>
                    </GridItem>

                    <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
                        <chakra.form
                            onSubmit={handleRegister}
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
                                            I plan to begin withdrawing money from my investments in:
                                        </FormLabel>
                                        <FormSelect
                                            placeholder="Select option"
                                            mt={1}
                                            focusBorderColor="brand.400"
                                            shadow="sm"
                                            size="sm"
                                            w="full"
                                            rounded="md"
                                            value={investmentDurationScore}
                                            onChange={(value) => setInvestmentDurationScore(value.toString())}
                                            options={optionsForQuestion1}
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
                                            Once I begin withdrawing funds from my investments, I plan to spend all of the funds in:
                                        </FormLabel>
                                        <FormSelect
                                            placeholder="Select option"
                                            mt={1}
                                            focusBorderColor="brand.400"
                                            shadow="sm"
                                            size="sm"
                                            w="full"
                                            rounded="md"
                                            value={withdrawalSpendingPlanScore}
                                            onChange={(value) => setWithdrawalSpendingPlanScore(value.toString())}
                                            options={optionsForQuestion2}
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
                                            I would describe my knowledge of investments as:
                                        </FormLabel>
                                        <FormSelect
                                            placeholder="Select option"
                                            mt={1}
                                            focusBorderColor="brand.400"
                                            shadow="sm"
                                            size="sm"
                                            w="full"
                                            rounded="md"
                                            value={investmentKnowledgeScore}
                                            onChange={(value) => setInvestmentKnowledgeScore(value.toString())}
                                            options={optionsForQuestion3}
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
                                            What amount of financial risk are you willing to take when you invest?
                                        </FormLabel>
                                        <FormSelect
                                            placeholder="Select option"
                                            mt={1}
                                            focusBorderColor="brand.400"
                                            shadow="sm"
                                            size="sm"
                                            w="full"
                                            rounded="md"
                                            value={riskRewardScore}
                                            onChange={(value) => setRiskRewardScore(value.toString())}
                                            options={optionsForQuestion4}
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
                                            Select the investments you currently own or have owned:
                                        </FormLabel>
                                        <FormSelect
                                            placeholder="Select option"
                                            mt={1}
                                            focusBorderColor="brand.400"
                                            shadow="sm"
                                            size="sm"
                                            w="full"
                                            rounded="md"
                                            value={ownedInvestmentsScore}
                                            onChange={(value) => setOwnedInvestmentsScore(value.toString())}
                                            options={optionsForQuestion5}
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
                                            Imagine that in the past three months, the overall stock market lost 25% of its value. An individual stock investment you own also lost 25% of its value. What would you do?
                                        </FormLabel>
                                        <FormSelect
                                            placeholder="Select option"
                                            mt={1}
                                            focusBorderColor="brand.400"
                                            shadow="sm"
                                            size="sm"
                                            w="full"
                                            rounded="md"
                                            value={investmentPersonalityScore}
                                            onChange={(value) => setInvestmentPersonalityScore(value.toString())}
                                            options={optionsForQuestion6}
                                            required
                                        />
                                    </FormControl>
                                </SimpleGrid>
                            </Stack>

                            <Flex justifyContent="space-between" bg="gray.50" _dark={{ bg: "#121212" }} px={{ base: 4, sm: 6 }} py={3}>
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
                                    Register
                                </Button>
                            </Flex>
                        </chakra.form>
                    </GridItem>
                </SimpleGrid>
            </Box>
        </Box>
    );
};

export default RegisterStep5Form;
