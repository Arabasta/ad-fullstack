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

const LineChart2 = ({ labels, datasets, view, scaleToFit }) => {
    const data = {
        labels,
        datasets: datasets.map((dataset, index) => ({
            ...dataset,
            yAxisID: view === 'portfolioValue' ? `y-axis-1-${index + 1}` : `y-axis-2`,
            borderWidth: 1.5,  // Thinner line
            pointRadius: 0.5,  // Smaller data point circles
        })),
    };

    const options = {
        responsive: true,
        maintainAspectRatio: !scaleToFit, // If scaleToFit is true, don't maintain aspect ratio
        aspectRatio: labels.length < 5 ? 2 : 3, // Adjust aspect ratio based on data points
        scales: {
            ...datasets.reduce((acc, dataset, index) => {
                const yAxisID = view === 'portfolioValue' ? `y-axis-1-${index + 1}` : `y-axis-2`;
                acc[yAxisID] = {
                    type: "linear",
                    position: view === 'portfolioValue' ? (index % 2 === 0 ? "left" : "right") : "left", // Only one y-axis-2 on the right
                    display: true,
                    title: {
                        display: true,
                        text: view === 'portfolioValue'
                            ? `${dataset.label} Value ($)`
                            : `Performance (%)`,
                        color: view === 'portfolioValue' ? dataset.borderColor : '#000', // Use black color for shared y-axis-2 title
                        font: {
                            size: 14
                        }
                    },
                    ticks: {
                        callback: (value) => `${value.toLocaleString()}`, // Format tick labels
                    },
                    grid: {
                        drawOnChartArea: index === 0, // Only draw grid lines for the first y-axis
                    },
                };
                return acc;
            }, {}),
            x: {
                title: {
                    display: true,
                    text: `Time`,
                    color: 'brand.600',
                    font: {
                        size: 14
                    }
                },
                grid: {
                    display: true,
                },
            },
        },
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
    };

    return (
        <div style={{ height: scaleToFit ? '100%' : '80vh', width: scaleToFit ? '100%' : '70vw' }}>
            <Line data={data} options={options} />
        </div>
    );
};

export default LineChart2;

