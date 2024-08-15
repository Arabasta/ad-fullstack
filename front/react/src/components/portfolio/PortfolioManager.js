import React, {useState} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import Heading from "../../components/common/text/Heading";
import usePortfolio from "../../hooks/usePortfolio";
import PortfolioDetails from "../../components/portfolio/PortfolioDetails";
import portfolioTypes from "./portfolioTypes";
import {Box, Flex, HStack, VStack} from "@chakra-ui/react";
import BoxBorderGray from "../common/modal/Box-BorderGray";
import Text from "../common/text/Text";
import LineChart2 from "../../admin/component/charts/LineChart2";
import CardComponent from "../common/cards/CardWithChart";
import Button from "../common/buttons/Button";
import GrayText from "../common/text/GrayText";
import PortfolioActionPanel from "./PortfolioActionPanel";
import useCombinedPortfolioDetails from "../../hooks/useCombinedPortfolioDetails";

const PortfolioManager = () => {
    const navigate = useNavigate();
    const {portfolioType} = useParams();
    const currentPortfolioType = portfolioTypes.find(allPortfolioTypes => allPortfolioTypes.type.toLowerCase() === portfolioType.toLowerCase());
    const {portfolio, addFunds, withdrawFunds} = usePortfolio(portfolioType.toUpperCase());

    const {portfolios} = useCombinedPortfolioDetails();

    const {state} = useLocation();
    const {view} = state || {};
    const [currentView, setView] = useState(view || 'portfolioValue');

    const handlePortfolioSelection = (type) => {
        navigate(`/portfolio/${type.toLowerCase()}`, {
            state: {view}
        });
    };

    const handleToggle = () => {
        setView(currentView === 'portfolioValue' ? 'performance' : 'portfolioValue');
    };

    function formatLabels(labels) {
        return labels.map(label => {
            const [year, month, day, hour, minute, second] = label;
            const date = new Date(year, month - 1, day, hour, minute, second);
            return date.toLocaleString('en-SG', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            });
        });
    }

    // Extract and format the first label as a date string for the card component
    const firstLabel = portfolios[0].data?.labels?.[0];
    const date = firstLabel ? new Date(firstLabel[0], firstLabel[1] - 1, firstLabel[2]) : null;
    const formattedDate = date ? date.toLocaleDateString('en-SG', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }) : '';

    // Extract and format the first label as a date string for the card component
    const lastLabel = portfolios[0].data?.labels?.[-1];
    const lastDate = lastLabel ? new Date(lastLabel[0], lastLabel[1] - 1, lastLabel[2]) : null;
    const formattedLastDate = lastDate ? lastDate.toLocaleDateString('en-SG', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }) : '';

    const getDataByType = (type) => {
        const datasetIndex = currentView === 'portfolioValue' ? 0 : 1;
        const portfolio = portfolios.find(portfolio => portfolio.type === type);

        return {
            chartData: {
                label: portfolio?.type,
                data: portfolio?.data?.datasets[datasetIndex]?.data || [],
                borderColor: type === 'CONSERVATIVE' ? "#0000FF" : type === 'MODERATE' ? "#FFA500" : "#FF0000",
                backgroundColor: type === 'CONSERVATIVE' ? "#0000FF" : type === 'MODERATE' ? "#FFA500" : "#FF0000",
                yAxisID: currentView === 'portfolioValue' ? 'y-axis-1' : 'y-axis-2',
            },
            labels: portfolio?.data?.labels ? formatLabels(portfolio.data.labels) : [],
        };
    };
    const {chartData, labels} = getDataByType(portfolioType.toUpperCase());


    return (
        <Box>
            <Flex direction={{base: "column", lg: "row"}} // Column on mobile, row on larger screens
                  flex="1">
                {/*Left Panel - Portfolio Header, Portfolio Dashboard*/}
                <VStack className="left-panel" flex="1" mr={4}
                        width="70%" // Set width to 70% of the container on larger screens
                >
                    {/*Portfolio Header*/}
                    <BoxBorderGray p={4} h="maxContent" boxShadow="2xl" bg="white">
                        <HStack justifyContent="space-between">
                            <Box>
                                <Heading as="h1" color="#4B4BB3">
                                    {portfolioType.title}
                                </Heading>
                            </Box>
                            <Box>
                                <PortfolioDetails portfolio={portfolio}/>
                            </Box>
                            <Box>
                                {portfolioTypes.map((portfolio, index) => (
                                    portfolio.type === currentPortfolioType.type ?
                                        <Button mr="1rem"
                                                p={5}
                                                disabled="true"
                                                bg={chartData.borderColor}
                                        >
                                            {currentPortfolioType.title.split(' ')[0]}
                                        </Button>
                                        :
                                        <Button key={index}
                                                mr="1rem"
                                                p={5}
                                                onClick={() => handlePortfolioSelection(portfolio.type)}
                                        >
                                            {portfolio.title.split(' ')[0]}
                                        </Button>
                                ))}
                            </Box>
                        </HStack>
                    </BoxBorderGray>

                    {/* Portfolio Dashboard */}
                    <BoxBorderGray p={4} boxShadow="2xl" bg="white">
                        <Text color="black" pb="1.5rem" fontSize="xl" fontWeight={600}>
                            Dashboard
                        </Text>
                        <Box width="100%" height="40rem" overflow="visible">
                            <CardComponent
                                title={<Heading as="h2" color="brand.10">Portfolio Performance</Heading>}
                                subtitle={<GrayText fontSize="2xl"
                                                    fontWeight="bold">
                                    {formattedDate || 'Date not available'} - {formattedLastDate || 'to date'}
                            </GrayText>}
                                chart={<LineChart2 datasets={[chartData]} labels={labels} view={currentView}
                                                   scaleToFit={true}/>}
                                button={<Button onClick={handleToggle}>Toggle View</Button>}
                                scaleToFit={true}
                            />
                        </Box>
                    </BoxBorderGray>
                </VStack>

                {/*Right Panel - Action Panel*/}
                <PortfolioActionPanel
                    addFunds={addFunds}
                    withdrawFunds={withdrawFunds}
                    portfolio={portfolio}
                    portfolioType={portfolioType.toUpperCase()}
                    modalTitle={portfolioType.title}
                />
            </Flex>
        </Box>
    );
};

export default PortfolioManager;
