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

const LineChart = ({ data }) => {
    const chartOptions = {
        responsive: true,
        scales: {
            'y-axis-1': {
                type: 'linear',
                position: 'left',
                title: {
                    display: true,
                    text: 'Capital ($)',
                    color: '#eee',
                    font: {
                        size: 14
                    }
                },

                ticks: {
                    color: '#eee', // Tick color
                    font: {
                        size: 12
                    }
                },
            },
            'y-axis-2': {
                type: 'linear',
                position: 'right',
                title: {
                    display: true,
                    text: 'Percent Change (%)',
                    color: '#eee', // Title color
                    font: {
                        size: 14
                    }
                },

                ticks: {
                    color: '#eee', // Tick color
                    font: {
                        size: 12
                    }
                },
                grid: {
                    drawOnChartArea: false,
                },
            },

            x: {
                title: {
                    display: true,
                    text: 'Elapsed Time',
                    color: '#eee',
                    font: {
                        size: 14
                    }
                },
                ticks: {
                    color: '#eee',
                    font: {
                        size: 12
                    }
                }
            },
        }

    };

    return <Line data={data} options={chartOptions} />;
};

export default LineChart;