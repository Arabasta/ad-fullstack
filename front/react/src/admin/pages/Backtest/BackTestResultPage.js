import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import LineChart from "../../component/charts/LineChart";
import '../../../assets/styles/BackTestResultPage.css';
import Button from "../../../components/common/buttons/Button";
import Heading from "../../../components/common/text/Heading";
import CardComponent from "../../../components/common/cards/CardWithChart";
import Text from "../../../components/common/text/Text";

const BackTestResultPage = () => {
    const location = useLocation();
    const { labels, datasets, tickerName, portfolioType, algorithmType } = location.state;
    const [view, setView] = useState('capital');

    const handleToggle = () => {
        setView(view === 'capital' ? 'percentChange' : 'capital');
    };

    function formatLabels(labels) {
        return labels.map(label => {
            const [year, month, day, hour, minute] = label;
            const date = new Date(year, month - 1, day, hour, minute);
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

    const formattedLabels = formatLabels(labels);

    const data = {
        labels: formattedLabels,
        datasets: view === 'capital' ? [
            {
                label: 'Capital',
                data: datasets[0].data,
                yAxisID: 'y-axis-1',
                borderColor: '#800000',
                backgroundColor: '#800000',
                tension: 0.4,
            }] : [
            {
                label: 'Percent Change',
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
                title={<Heading as="h1" color="brand.10" mb={2}>BackTesting {tickerName}</Heading>}
                subtitle={<Text variant="h3"> Portfolio: {portfolioType}</Text>}
                subtitle2={<Text variant="h3"> Algorithm: {algorithmType}</Text>}
                chart={<LineChart data={data} labels={formattedLabels} view={view} />}
                button={<Button onClick={handleToggle}>Toggle View</Button>}
                maxWidth="600px"  // Set maxWidth or width
                margin="0 auto"  // Center the card
            />
        </div>
    );
};

export default BackTestResultPage;
