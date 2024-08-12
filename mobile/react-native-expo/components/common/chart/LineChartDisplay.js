import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

// Get screen dimensions for responsive sizing
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const LineChartDisplay = ({ labels, datasets, view, scaleToFit }) => {
    // Select datasets based on the view
    const filteredDatasets = datasets.length > 0 ? datasets.filter((dataset, index) => {
        return view === 'portfolioValue' ? index === 0 : index === 1;
    }) : [{
        data: [0], // Provide a default data point to prevent the chart from shrinking
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2,
        withDots: true,
    }];

    const data = {
        labels,
        datasets: filteredDatasets.map((dataset) => ({
            data: dataset.data,
            color: (opacity = 1) => dataset.color ? dataset.color(opacity) : `rgba(0, 0, 0, ${opacity})`,
            strokeWidth: 2, // Thinner line
            withDots: true,
        })),
    };

    const chartConfig = {
        backgroundGradientFrom: "#fff",
        backgroundGradientTo: "#fff",
        decimalPlaces: 2, // Optional, to show decimal places
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
            borderRadius: 16,
        },
        propsForDots: {
            r: "4", // Radius for data point circles
            strokeWidth: "2", // Stroke width for data point circles
            stroke: "#000", // Stroke color for data point circles
        },
        propsForLabels: {
            fontSize: 10, // Font size for labels
        }
    };

    return (
        <View style={styles.container}>
            <LineChart
                data={data}
                width={scaleToFit ? Dimensions.get('window').width : screenWidth * 0.9} // Width of the chart
                height={scaleToFit ? Dimensions.get('window').height * 0.4 : 220} // Height of the chart
                chartConfig={chartConfig}
                bezier // Smooth lines
                fromZero
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 10,
        flex: 1,
        backgroundColor: '#fff', // Optional, to ensure a white background
    },
});

export default LineChartDisplay;

