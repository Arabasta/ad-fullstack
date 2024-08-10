import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Title,
    Tooltip,
    Legend
);


const LineChart = ({ data , view }) => {

    if (!data || !data.datasets) {
        console.error('Invalid data format:', data);
        return null;
    }

    const chartOptions = {
        responsive: true,
        scales: {
            'y-axis-1': {
                type: 'linear',
                position: 'left',
                display: view === 'capital',
                title: {
                    display: true,
                    text: 'Capital ($)',
                    color: 'brand.600',
                    font: {
                        size: 14
                    }
                },
                ticks: {
                    color: 'brand.600', // Tick color
                    font: {
                        size: 12
                    }
                },
            },
            'y-axis-2': {
                type: 'linear',
                position: 'left',
                display: view === 'percentChange',
                title: {
                    display: true,
                    text: 'Percent Change (%)',
                    color: 'brand.600', // Title color
                    font: {
                        size: 14
                    }
                },

                ticks: {
                    color: 'brand.600', // Tick color
                    font: {
                        size: 12
                    }
                },
            },

            x: {
                title: {
                    display: true,
                    text: `Time`,
                    color: 'brand.600',
                    font: {
                        size: 14
                    }
                },
                ticks: {
                    font: {
                        size: 12
                    }
                },
            },
        }

    };

    return <Line data={data} options={chartOptions} />;
};

export default LineChart;