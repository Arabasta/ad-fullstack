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
    TimeScale
} from "chart.js";

import 'chartjs-adapter-date-fns';


ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    TimeScale
);

const LineChart2 = ({ labels, datasets, view, scaleToFit }) => {
    // Get the first and last ticker
    const firstLabel = new Date(labels[0]);
    const lastLabel = new Date(labels[labels.length - 1]);

    // Calculate the total time difference (in milliseconds)
    const totalTimeDifference = lastLabel - firstLabel;

    // Calculate the increment size (in milliseconds)
    const incrementSize = totalTimeDifference / (labels.length - 1);

    // Generate new set of x-tickers
    const newXTickers = [];
    for (let i = 0; i < labels.length; i++) {
        //const newTickerTime = new Date(firstLabel.getTime() + i * incrementSize);
        const newTickerMinutes = Math.ceil((i * incrementSize) / (60000));
        newXTickers.push(newTickerMinutes);
        //newXTickers.push(newTickerTime);
        //newXTickers.push(newTickerTime.toISOString());
    }

    // Debugging: Log the original and new x-tickers
    console.log("Original Labels:", labels);
    console.log("New X-Tickers:", newXTickers);

    const data = {
        labels,
        datasets: datasets.length > 0 ? datasets.map((dataset, index) => ({
            ...dataset,
            yAxisID: index === 0 ? "y-axis-1" : "y-axis-2",
            borderWidth: 1.5,  // Thinner line
            pointRadius: 0.5,  // Smaller data point circles
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
        maintainAspectRatio: false, // If scaleToFit is true, don't maintain aspect ratio
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
                    callback: function(value, index, values) {
                        return newXTickers[index]; // Display increment values as tickers
                    }
                }
            },
        },
    };

    return (
        <div style={{ height: scaleToFit ? '100%' : '80vh', width: scaleToFit ? '100%' : '70vw' }}>
            <Line data={data} options={options} />
        </div>
    );
}

export default LineChart2;
