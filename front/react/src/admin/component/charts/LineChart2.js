import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const LineChart2 = ({ data, labels }) => {
    const chartData = {
        labels,
        datasets: data.datasets
    };

    const options = {
        responsive: true,
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'minute', // Adjust time unit as needed
                    tooltipFormat: 'll HH:mm'
                },
                title: {
                    display: true,
                    text: 'Time'
                }
            },
            'y-axis-1': {
                type: 'linear',
                position: 'left',
                title: {
                    display: true,
                    text: 'Portfolio Value ($)'
                }
            },
            'y-axis-2': {
                type: 'linear',
                position: 'right',
                title: {
                    display: true,
                    text: 'Performance (%)'
                },
                grid: {
                    drawOnChartArea: false
                }
            }
        }
    };

    return <Line data={chartData} options={options} />;
};

export default LineChart2;
