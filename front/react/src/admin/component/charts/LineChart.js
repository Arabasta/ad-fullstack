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
        maintainAspectRatio: false, // Allow chart to resize with container
        aspectRatio: data.labels.length < 5 ? 2 : 3, // Adjust aspect ratio based on data points
        scales: {
            'y-axis-1': {
                type: 'linear',
                position: 'left',
                display: view === 'capital',
                title: {
                    display: view === 'capital',
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
                    display: view === 'percentChange',
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
                    /*callback: function (value, index, ticks) {
                        // Show only the first and last tick
                        if (index === 0 || index === ticks.length - 1) {
                            return this.getLabelForValue(value);
                        } else {
                            return ''; // Return an empty string for all other ticks
                        }
                    },
                     */
                },
            },
        },
        elements: {
            line: {
                borderWidth: 1, // Make the line thinner
            },
            point: {
                radius: 0.5, // Make the data point circles smaller
                hitRadius: 5,
                hoverRadius: 5,
            }
        },

    };

    return(
        <div style={{ height: '80vh', width: '70vw' }}> {/* Adjust the height based on your requirement */}
            <Line data={data} options={chartOptions} />
        </div>
    );
};

export default LineChart;