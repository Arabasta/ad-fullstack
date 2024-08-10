// import React, {useEffect, useState} from "react";
// import { useNavigate } from "react-router-dom";
// import CardComponent from "../../components/common/cards/CardWithChart";
// import Button from "../../components/common/buttons/Button";
// import Heading from "../../components/common/text/Heading";
//
// import usePortfolio from "../../hooks/usePortfolio";
// import portfolioTypes from "../../components/portfolio/portfolioTypes";
// import LineChart2 from "../../admin/component/charts/LineChart2";
//
// export default function PortfolioPage() {
//     const [view, setView] = useState("portfolioValue");
//     const {performanceChart, getPerformanceChart } = usePortfolio("AGGRESSIVE");
//     const { labels = [], datasets = [] } = performanceChart || {};
//     const navigate = useNavigate();
//
//     useEffect(() => {
//         // Fetch performance chart data whenever portfolioType changes
//         getPerformanceChart();
//     }, [getPerformanceChart]);
//
//     const handlePortfolioSelection = (type) => {
//         navigate(`/portfolio/${type.toLowerCase()}`);
//     };
//
//     const handleToggleView = () => {
//         setView(view === "portfolioValue" ? "performance" : "portfolioValue");
//     };
//
//     const formattedLabels = labels.map(label => {
//         const [year, month, day, hour, minute, second, millisecond] = label;
//         return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
//     });
//
//
//     const data = {
//         labels: formattedLabels,
//         datasets: view === 'portfolioValue' ? [
//                 {
//                     label: 'Portfolio value',
//                     data: datasets[0].data,
//                     yAxisID: 'y-axis-1',
//                     borderColor: '#800000',
//                     backgroundColor: '#800000',
//                     tension: 0.4,
//                 }] :
//             [
//                 {
//                     label: 'Performance',
//                     data: datasets[1].data,
//                     yAxisID: 'y-axis-2',
//                     borderColor: '#000080',
//                     backgroundColor: '#000080',
//                     tension: 0.4,
//                 },
//             ],
//     };
//     return (
//         <div>
//             <CardComponent
//                 title={<Heading as="h1" size="lg" color="brand.600" mb={2}>Portfolio Performance</Heading>}
//                 chart={<LineChart2 data={data} labels={formattedLabels}/>}
//                 button={
//                     <Button onClick={handleToggleView}>
//                         Toggle View
//                     </Button>
//                 }
//             />
//
//             {portfolioTypes.map((portfolio) => (
//                 <div key={portfolio.type}>
//                     <button onClick={() => handlePortfolioSelection(portfolio.type)}>
//                         {portfolio.title}
//                     </button>
//                 </div>
//             ))}
//         </div>
//     );
// }

/* SECOND ROUND */

/*
import React, {useState} from "react";
import usePortfolio from "../../hooks/usePortfolio";
import LineChart2 from "../../admin/component/charts/LineChart2";
import CardComponent from "../../components/common/cards/CardWithChart";
import Button from "../../components/common/buttons/Button";
import Heading from "../../components/common/text/Heading";
import portfolioTypes from "../../components/portfolio/portfolioTypes";
import {useNavigate} from "react-router-dom";


export default function PortfolioPage() {
    const { performanceChart } = usePortfolio("AGGRESSIVE");
    const { labels = [], datasets = [] } = performanceChart || {};
    const [view, setView] = useState('portfolioValue');
    const navigate = useNavigate();

    const handlePortfolioSelection = (type) => {
         navigate(`/portfolio/${type.toLowerCase()}`);
     };
    const handleToggle = () => {
        setView(view === 'portfolioValue' ? 'performance' : 'portfolioValue');
    };

    function formatLabels(labels) {
        return labels.map(label => {
            const [year, month, day, hour, minute, second] = label;
            const date = new Date(year, month - 1, day, hour, minute, second);

            // Options for the formatting
            const options = {
                year: 'numeric',
                month: 'short',  // 'short' for abbreviated month name, 'long' for full name
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true, // true for 12-hour time, false for 24-hour time
            };

            return date.toLocaleString('en-SG', options); // Adjust format as needed
        });
    }

    const formattedLabels = formatLabels(labels);

    const data = view === 'portfolioValue'
        ? [datasets[0]]  // Use the first dataset for Portfolio Value
        : [datasets[1]]; // Use the second dataset for Percent Change

    return (

        <div>
            <CardComponent
                title={<Heading as="h1" size="lg" color="brand.600" mb={2}>Portfolio Performance</Heading>}
                chart={<LineChart2 datasets={data} view={view} labels={formattedLabels}/>}
                button={<Button color="brand.600" onClick={handleToggle}>
                    Toggle View
                </Button>}
            />

            {portfolioTypes.map((portfolio) => (
                 <div key={portfolio.type}>
                     <button onClick={() => handlePortfolioSelection(portfolio.type)}>
                         {portfolio.title}
                     </button>
                 </div>
             ))}

        </div>
    );
}
*/

import React, {useMemo, useState} from "react";
import usePortfolio from "../../hooks/usePortfolio";
import LineChart2 from "../../admin/component/charts/LineChart2";
import CardComponent from "../../components/common/cards/CardWithChart";
import Button from "../../components/common/buttons/Button";
import Heading from "../../components/common/text/Heading";
import portfolioTypes from "../../components/portfolio/portfolioTypes";
import { useNavigate } from "react-router-dom";
import WhiteBoxCard from "../../components/common/cards/WhiteBoxCard";
import GrayText from "../../components/common/text/GrayText";
import BlackText from "../../components/common/text/BlackText";
import {formatCurrency} from "../../utils/formatCurrency";
import {Flex, HStack, SimpleGrid} from "@chakra-ui/react";

export default function PortfolioPage() {
    const navigate = useNavigate();
    const [view, setView] = useState('portfolioValue');


    // Call usePortfolio for each portfolio type
    const conservativePortfolio = usePortfolio('CONSERVATIVE');
    const moderatePortfolio = usePortfolio('MODERATE');
    const aggressivePortfolio = usePortfolio('AGGRESSIVE');

    // Calculate the sum of currentValues from all portfolios
    const totalCurrentValue = useMemo(() => {
        const aggressiveValue = aggressivePortfolio.portfolio.currentValue || 0;
        const moderateValue = moderatePortfolio.portfolio.currentValue || 0;
        const conservativeValue = conservativePortfolio.portfolio.currentValue || 0;

        return parseFloat(aggressiveValue) + parseFloat(moderateValue) + parseFloat(conservativeValue);
    }, [
        aggressivePortfolio.portfolio.currentValue,
        moderatePortfolio.portfolio.currentValue,
        conservativePortfolio.portfolio.currentValue
    ]);

    const portfolios = [
        { type: 'CONSERVATIVE', data: conservativePortfolio.performanceChart },
        { type: 'MODERATE', data: moderatePortfolio.performanceChart },
        { type: 'AGGRESSIVE', data: aggressivePortfolio.performanceChart },
    ];

    const handlePortfolioSelection = (type) => {
        navigate(`/portfolio/${type.toLowerCase()}`);
    };

    const handleToggle = () => {
        setView(view === 'portfolioValue' ? 'performance' : 'portfolioValue');
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

    const combinedLabels = portfolios[0].data ? formatLabels(portfolios[0].data.labels) : [];

    const combinedData = portfolios.map((portfolio, index) => {
        const datasetIndex = view === 'portfolioValue' ? 0 : 1;
        return {
            label: portfolioTypes[index].title,
            data: portfolio.data?.datasets[datasetIndex]?.data || [],
            borderColor: index === 0 ? "#0000FF" : index === 1 ? "#FFA500" : "#FF0000",
            backgroundColor: index === 0 ? "#0000FF" : index === 1 ? "#FFA500" : "#FF0000",
            yAxisID: view === 'portfolioValue' ? 'y-axis-1' : 'y-axis-2',
        };
    });

    return (
        <div>
            <WhiteBoxCard>
                <GrayText fontSize="2xl" fontWeight="bold">Total Portfolio Value</GrayText>
                <BlackText fontSize="5xl" fontWeight="bold">{formatCurrency(totalCurrentValue)}</BlackText>
            </WhiteBoxCard>

            <CardComponent
                title={<Heading as="h1" size="lg" color="brand.600" mb={2}>Portfolio Performance</Heading>}
                chart={<LineChart2 datasets={combinedData} view={view} labels={combinedLabels} />}
                button={<Button color="brand.600" onClick={handleToggle}>
                    Toggle View
                </Button>}
            />
            <Flex
                p={5}
                w="auto"
                justifyContent="center"
                alignItems="center"
            >
                <SimpleGrid
                    columns={{ base: 3}}
                    spacing={5}
                    px={{ base: 8, lg: 16, xl: 24 }}
                    py={10}
                    mx="auto"
                    bg="white"
                    _dark={{ bg: "gray.800" }}
                    shadow="xl">

                    {portfolioTypes.map((portfolio, index) => (
                        <HStack key={index} title={portfolio.title}  align="center" spacing={0} mb={4}>
                            <Button
                                fontSize="xl" p={10} mr={2}
                                onClick={() => handlePortfolioSelection(portfolio.type)}
                            >{portfolio.title}</Button>
                        </HStack>
                    ))}
                </SimpleGrid>
            </Flex>
        </div>
    );
}
