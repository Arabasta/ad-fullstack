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

const PortfolioManager = () => {
    const navigate = useNavigate();
    const { portfolioType } = useParams();
    const { portfolio, addFunds, withdrawFunds } = usePortfolio(portfolioType.toUpperCase());

    const selectedPortfolioType = portfolioTypes.find(pt => pt.type.toLowerCase() === portfolioType);
    const otherPortfolioTypes = portfolioTypes.filter(allPortfolioTypes => allPortfolioTypes.type.toLowerCase() !== portfolioType.toLowerCase());

    const { state } = useLocation();
    const { portfolios, combinedData, chartData=[], labels=[], view, toPassDate } = state || {};

    const [currentView, setView] = useState(view || 'portfolioValue');

    function formatLabels(labels) {
        return labels.map(label => {
            const [year, month, day, hour, minute, second] = label;
            const date = new Date(year, month - 1, day, hour, minute, second);
            return date.toLocaleString('en-SG', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            });
        });
    }

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

    const handlePortfolioSelection = (type) => {
        const {chartData, labels} = getDataByType(type);
        navigate(`/portfolio/${type.toLowerCase()}`, {
            state: { portfolios, combinedData, chartData, view, labels, toPassDate }
        });
    };

    const handleToggle = () => {
        setView(currentView === 'portfolioValue' ? 'performance' : 'portfolioValue');
        const { chartData, labels } = getDataByType(portfolioType.toUpperCase());
        navigate(`/portfolio/${portfolioType.toLowerCase()}`, {
            state: { portfolios, combinedData, chartData, view: currentView, labels, toPassDate }
        });
    };

    return (
        <Box>
            <Flex direction={{ base: "column", lg: "row" }} // Column on mobile, row on larger screens
                  flex="1">
                {/*Left Panel - Portfolio Header, Portfolio Dashboard, Portfolio Value*/}
                <VStack className="left-panel" flex="1" mr={4}
                        width="70%" // Set width to 70% of the container on larger screens
                >
                    {/*Portfolio Header*/}
                    <BoxBorderGray p={4} h="maxContent" boxShadow="2xl" bg="white">
                        <HStack justifyContent="space-between">
                            <Box>
                                <Heading as="h1" color="#4B4BB3">
                                    {selectedPortfolioType.title}
                                </Heading>
                            </Box>
                            <Box>
                                <PortfolioDetails portfolio={portfolio}/>
                            </Box>
                            <Box>
                                {otherPortfolioTypes.map((portfolio, index) => (
                                    <Button key={index}
                                            mr="1rem"
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
                                subtitle={<GrayText fontSize="2xl" fontWeight="bold">{toPassDate || 'Date not available'} </GrayText>}
                                chart={<LineChart2 datasets={[chartData]} labels={labels} view={currentView} scaleToFit={true} />}
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
                    modalTitle={selectedPortfolioType.title}
                />
            </Flex>
        </Box>
    );
};

export default PortfolioManager;
