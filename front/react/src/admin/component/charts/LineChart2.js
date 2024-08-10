/*
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
*/

import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
);

const LineChart2 = ({ labels, datasets, view }) => {
    const data = {
        labels,
        datasets: datasets.map((dataset, index) => ({
            ...dataset,
            yAxisID: index === 0 ? "y-axis-1" : "y-axis-2",
        })),
    };

    const options = {
        responsive: true,
        scales: {
            "y-axis-1": {
                type: "linear",
                position: "left",
                display: view === 'portfolioValue',
                title: {
                    display: view === 'portfolioValue',
                    text: 'Portfolio Value ($)',
                    color: 'brand.600',
                    font: {
                        size: 14
                    }
                },
                ticks: {
                    callback: (value) => `${value}`,
                },

            },
            "y-axis-2": {
                type: "linear",
                position: "left",
                display: view === 'performance',
                title: {
                    display: view === 'performance',
                    text: 'Performance (%)',
                    color: 'brand.600',
                    font: {
                        size: 14
                    }
                },
                ticks: {
                    callback: (value) => `${value * 100}`,
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
                    callback: function (value, index, ticks) {
                        // Show only the first and last tick
                        if (index === 0 || index === ticks.length - 2) {
                            return this.getLabelForValue(value);
                        } else {
                            return ''; // Return an empty string for all other ticks
                        }
                    },
                },
            },


        }
    };

    return <Line data={data} options={options} />;
}

export default LineChart2;

