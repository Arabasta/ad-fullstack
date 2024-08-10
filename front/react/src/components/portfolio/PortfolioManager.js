import React, {useState} from 'react';
import {useLocation, useParams} from 'react-router-dom';
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
import LineChart2 from "../../admin/component/charts/LineChart2";
import CardComponent from "../common/cards/CardWithChart";
import Button from "../common/buttons/Button";
import GrayText from "../common/text/GrayText";
import PortfolioTransactionHistoryPage from "../../pages/portfolio/PortfolioTransactionHistoryPage";

const PortfolioManager = () => {
    const { portfolioType } = useParams();
    const { portfolio, addFunds, withdrawFunds } = usePortfolio(portfolioType.toUpperCase());

    const selectedPortfolioType = portfolioTypes.find(pt => pt.type.toLowerCase() === portfolioType);
    const title = selectedPortfolioType ? selectedPortfolioType.title : 'Portfolio';

    const { state } = useLocation();
    const { chartData=[], labels=[], view, toPassDate } = state || {};

    const [currentView, setView] = useState(view || 'portfolioValue');

    const handleToggle = () => {
        setView(currentView === 'portfolioValue' ? 'performance' : 'portfolioValue');
    };


    return (
        <>
            <CardComponent
                title={<Heading as="h2" color="brand.10">Portfolio Performance</Heading>}
                subtitle={<GrayText fontSize="2xl" fontWeight="bold">{toPassDate || 'Date not available'} </GrayText>}
                chart={<LineChart2 datasets={[chartData]} labels={labels} view={currentView} />}
                button={<Button onClick={handleToggle}>Toggle View</Button>}
            />
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
                    <BoxBorderGray p={4} h="maxContent" boxShadow="2xl" bg="white"
                                   flexGrow={2}>
                        <Text color="black" pb="1.5rem" fontSize="xl" fontWeight={500} w={800}>
                            Dashboard
                        </Text>
                        <Box h="400" bg="lightgray">
                            {/*todo: alvin: add portfolio dashboard*/}
                            Simulated Dashboard
                        </Box>
                    </BoxBorderGray>

                    {/*Portfolio Value*/}
                    <BoxBorderGray p={4} h="maxContent" boxShadow="2xl"
                                   bg="white">
                        <HStack alignContent="center">
                            <PortfolioDetails portfolio={portfolio}/>
                        </HStack>
                    </BoxBorderGray>
                </VStack>

                {/*Right Panel - Action Panel*/}
                <BoxBorderGray className="right-panel" p={4} bg="gray.200" w="max-content"
                               boxShadow="2xl" height="full"
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
                                {/*todo: alvin: transaction history not showing. to debug.*/}
                                <PortfolioTransactionHistoryPage portfolioType={portfolioType.toUpperCase()}/>
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
        </>

    );
};

export default PortfolioManager;
