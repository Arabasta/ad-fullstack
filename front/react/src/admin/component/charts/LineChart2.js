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
        datasets:  datasets.length > 0 ? datasets.map((dataset, index) => ({
            ...dataset,
            yAxisID: index === 0 ? "y-axis-1" : "y-axis-2",
            borderWidth: 1.5,  // Thinner line
            pointRadius: 0.5,    // Smaller data point circles
        })) : [{
        label: 'No Data Available',
        data: [0], // Provide a default data point to prevent the chart from shrinking
        borderWidth: 1.5,
        pointRadius: 0.5,
        borderColor: '#000000',
        backgroundColor: '#000000',
    }],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Maintain the chart aspect ratio
        aspectRatio: labels.length < 5 ? 2 : 3, // Adjust aspect ratio based on data points
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
                    callback: (value) => `${value}`,
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
                        if (index === 0 || index === ticks.length - 5) {
                            return this.getLabelForValue(value);
                        } else {
                            return ''; // Return an empty string for all other ticks
                        }
                    },

                     */
                },
            },


        }
    };

    return (
        <div style={{ height: '80vh', width: '70vw' }}> {/* Adjust the height based on your requirement */}
            <Line data={data} options={options} />
        </div>
    );
}

export default LineChart2;

