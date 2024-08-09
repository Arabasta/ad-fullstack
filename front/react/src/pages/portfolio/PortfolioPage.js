import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import CardComponent from "../../components/common/cards/CardWithChart";
import Button from "../../components/common/buttons/Button";
import Heading from "../../components/common/text/Heading";

import usePortfolio from "../../hooks/usePortfolio";
import portfolioTypes from "../../components/portfolio/portfolioTypes";
import LineChart2 from "../../admin/component/charts/LineChart2";

export default function PortfolioPage() {
    const [view, setView] = useState("portfolioValue");
    const {performanceChart, getPerformanceChart } = usePortfolio("AGGRESSIVE");
    const { labels, datasets } = performanceChart;
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch performance chart data whenever portfolioType changes
        getPerformanceChart();
    }, [getPerformanceChart]);

    const handlePortfolioSelection = (type) => {
        navigate(`/portfolio/${type.toLowerCase()}`);
    };

    const handleToggleView = () => {
        setView(view === "portfolioValue" ? "performance" : "portfolioValue");
    };

    const formattedLabels = labels.map(label => {
        const [year, month, day, hour, minute, second, millisecond] = label;
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    });


    const data = {
        labels: formattedLabels,
        datasets: view === 'portfolioValue' ? [
                {
                    label: 'Portfolio value',
                    data: datasets[0].data,
                    yAxisID: 'y-axis-1',
                    borderColor: '#800000',
                    backgroundColor: '#800000',
                    tension: 0.4,
                }] :
            [
                {
                    label: 'Performance',
                    data: datasets[1].data,
                    yAxisID: 'y-axis-2',
                    borderColor: '#000080',
                    backgroundColor: '#000080',
                    tension: 0.4,
                },
            ],
    };
    return (
        <div>
            <CardComponent
                title={<Heading as="h1" size="lg" color="brand.600" mb={2}>Portfolio Performance</Heading>}
                chart={<LineChart2 data={data} labels={formattedLabels}/>}
                button={
                    <Button onClick={handleToggleView}>
                        Toggle View
                    </Button>
                }
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
