import React from 'react';
import { useParams } from 'react-router-dom';
import PortfolioAddFunds from "../../components/portfolio/PortfolioAddFunds";
import PortfolioRemoveFunds from "./PortfolioRemoveFunds";
import Heading from "../../components/common/text/Heading";
import usePortfolio from "../../hooks/usePortfolio";
import PortfolioDetails from "../../components/portfolio/PortfolioDetails";
import portfolioTypes from "./portfolioTypes";
import RulesModal from "../rules/RulesModal";
import {Box, Center, Flex, HStack, VStack} from "@chakra-ui/react";
import BoxBorderGray from "../common/modal/Box-BorderGray";
import Text from "../common/text/Text";
import ButtonBlack from "../common/buttons/ButtonBlack";

const PortfolioManager = () => {
    const { portfolioType } = useParams();
    const { portfolio, addFunds, withdrawFunds } = usePortfolio(portfolioType.toUpperCase());

    const selectedPortfolioType = portfolioTypes.find(pt => pt.type.toLowerCase() === portfolioType);
    const title = selectedPortfolioType ? selectedPortfolioType.title : 'Portfolio';

    return (
        <Center bg="#666db3" p="2rem">
            <Flex direction="row" flex="1" maxWidth="70%">
                {/*Left Panel - Portfolio Header, Portfolio Dashboard, Portfolio Value*/}
                <VStack className="left-panel" flex="1" flex-direction="column" mr={4}
                        width="70%" // Set width to 70% of the container on larger screens
                >
                    {/*Portfolio Header*/}
                    <BoxBorderGray p={4} h="maxContent" boxShadow="md" bg="white"
                                   flexGrow={0} flexShrink={0}>
                        <Heading as="h1" color="#4B4BB3">
                            {title}
                        </Heading>
                    </BoxBorderGray>

                    {/*Portfolio Dashboard*/}
                    <BoxBorderGray p={4} h="maxContent" boxShadow="md" bg="white"
                                   flexGrow={2}>
                        <Text color="black" pb="1.5rem" fontSize="xl" fontWeight={500} w={800}>
                            Dashboard
                        </Text>
                        <Box h="400" bg="lightgray">
                            Simulated Dashboard
                        </Box>
                    </BoxBorderGray>

                    {/*Portfolio Value*/}
                    <BoxBorderGray p={4} h="maxContent" boxShadow="md"
                                   bg="white">
                        <HStack alignContent="center">
                            <PortfolioDetails portfolio={portfolio}/>
                        </HStack>
                    </BoxBorderGray>
                </VStack>

                {/*Right Panel - Action Panel*/}
                <BoxBorderGray className="right-panel" p={4} bg="gray.200" w="max-content"
                               boxShadow="md" height="full"
                               flexDirection="column" justifyContent="space-between">
                    <VStack>
                        <Text color="black" pb="1.5rem" fontSize="xl" fontWeight={700}>
                            Action Panel
                        </Text>

                        {/*Portfolio Fund Action*/}
                        <BoxBorderGray p={4} mb={4} boxShadow="md" bg="white">
                            <Text color="black" fontSize="lg" fontWeight={500}>
                                Portfolio Fund Action
                            </Text>
                            <VStack p="1rem">
                                <PortfolioAddFunds addFunds={addFunds}/>
                                <PortfolioRemoveFunds withdrawFunds={withdrawFunds} currentBalance={portfolio.allocatedBalance}/>
                                <ButtonBlack>
                                    Transaction History
                                </ButtonBlack>
                            </VStack>
                        </BoxBorderGray>

                        {/*Portfolio Rules*/}
                        <BoxBorderGray p={4} mb={4} boxShadow="md" bg="gray.50">
                            <Text color="black" pb="1.5rem" fontSize="lg" fontWeight={500}>
                                Portfolio Rules
                            </Text>
                            {/* Manage Rules Modal Button */}
                            <RulesModal triggerText="Manage Rules"
                                        modalTitle={title}
                                        portfolioType={portfolioType.toUpperCase()}
                                        p={5}/>
                        </BoxBorderGray>
                    </VStack>
                </BoxBorderGray>
            </Flex>
        </Center>
    );
};

export default PortfolioManager;
