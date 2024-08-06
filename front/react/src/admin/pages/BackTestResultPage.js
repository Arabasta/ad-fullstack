import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';
import LineChart from "../component/charts/LineChart";
import '../../assets/styles/BackTestResultPage.css'
import Button from "../../components/common/buttons/Button";
import Heading from "../../components/common/text/Heading";
import CardComponent from "../../components/common/cards/CardWithChart";

const BackTestResultPage = () => {
    const location = useLocation();
    const { labels, datasets } = location.state;
    const [view, setView] = useState('capital');

    // toggle between different views
    const handleToggle = () => {
        setView(view === 'capital' ? 'percentChange' : 'capital');
    };

    const data = {
        labels: labels,
        datasets: view === 'capital' ? [
                {
                    label: 'Capital',
                    data: datasets[0].data,
                    yAxisID: 'y-axis-1',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    tension: 0.4,
                }] :
            [
                {
                    label: 'Percent Change',
                    data: datasets[1].data,
                    yAxisID: 'y-axis-2',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    tension: 0.4,
                },
            ],
    };

    return (
        <div>
            <Heading as="h1" size="lg" color="white" mb={2}>BackTest Performance</Heading>
            <div className="chart-container">
                <LineChart data={data} view={view} labels={labels}/>
            </div>

            <CardComponent
                title={<Heading as="h1" size="lg" color="brand.100" mb={2}>BackTest Performance</Heading>}
                chart={<LineChart data={data} view={view} labels={labels}/>}
                button={<Button color="brand.100" onClick={handleToggle}>
                    Toggle View
                </Button>}
            />
        </div>
    );
};

export default BackTestResultPage;
