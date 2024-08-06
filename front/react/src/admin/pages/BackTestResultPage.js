import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';
import LineChart from "../component/charts/LineChart";
import '../../assets/styles/BackTestResultPage.css'

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
            <h1>BackTest Result</h1>
            <h2>Capital</h2>
            <ul>
                {datasets[0].data.map((value, index) => (
                    <li key={index}>
                        {labels[index]}: {value}
                    </li>
                ))}
            </ul>
            <h2>Percent Change</h2>
            <ul>
                {datasets[1].data.map((value, index) => (
                    <li key={index}>
                        {labels[index]}: {value}%
                    </li>
                ))}
            </ul>

            <button onClick={handleToggle}>
                Toggle to {view === 'capital' ? 'Percent Change' : 'Capital'}
            </button>

            <div className="chart-container">
                <LineChart data={data} view={view} labels={labels}/>
            </div>
        </div>
    );
};

export default BackTestResultPage;
