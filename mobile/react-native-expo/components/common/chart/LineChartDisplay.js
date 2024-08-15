import React, {useState} from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { Chart, VerticalAxis, HorizontalAxis, Line, Tooltip } from 'react-native-responsive-linechart';

// Get screen dimensions for responsive sizing
const screenWidth = Dimensions.get('window').width;

const LineChartDisplay = ({ labels=[], datasets=[], yAxisTitle, xAxisTitle,view }) => {
    const [tooltipIndex, setTooltipIndex] = useState(null);
    const [tooltipValue, setTooltipValue] = useState(null);
    const [viewport, setViewport] = useState({ size: { width: 200 } }); // Initial viewport showing 10 data points

    // Ensure datasets is an array of objects with valid data arrays
    const validatedDatasets = datasets.filter(dataset =>
        dataset && Array.isArray(dataset.data) && dataset.data.length > 0
    );

    if (validatedDatasets.length === 0) {
        return (
            <View style={styles.container}>
                <Text>No valid data available for this chart</Text>
            </View>
        );
    }

    // Prepare chart data for each dataset
    const chartData = validatedDatasets
        .filter(dataset => dataset && Array.isArray(dataset.data)) // Ensure dataset and data array are valid
        .map(dataset => ({
            data: dataset.data
                .map((value, index) => value !== undefined ? { x: index, y: value } : null)
                .filter(point => point !== null), // Filter out null points
            smoothing: 'cubic-spline',
            theme: {
                stroke: {
                    color: dataset.borderColor || '#000',
                    width: 2,
                },
            },
            yAxisID: dataset.yAxisID,
        }));

    // Calculate min and max for yDomain across all datasets
    const allYValues = datasets.flatMap(ds => ds.data).filter(value => value !== undefined && value !== null);
    const yMin = Math.min(...allYValues);
    const yMax = Math.max(...allYValues);
    const yRange = yMax - yMin;

    // Determine the height of the chart and scale yDomain dynamically
    const minChartHeight = 0.4; // Minimum 40% of the chart area
    const chartHeight = 450;
    const requiredRange = Math.max(yRange, yMin * (minChartHeight / (1 - minChartHeight)));

    const yDomain = {
        min: yMin - requiredRange * 0.05,  // Add some padding below
        max: yMax + requiredRange * 0.05,  // Add some padding above
    };

    // xDomain will automatically cover all labels from start to end
    const xDomain = { min: 0, max: labels.length - 1 };

    // Create tick values for x-axis showing only the first and last labels
    const xTicks = [
        { value: 0, label: labels[0] || '' },  // First label
        { value: labels.length - 1, label: labels[labels.length - 1] || '' }  // Last label
    ];

    const yTicksAxis1 = Array.from({ length: 6 }, (_, i) => {
        const value = Math.round(yDomain.min + (i * (yDomain.max - yDomain.min) / 5));
        const formattedValue = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0, // No decimal places
        }).format(value);
        return value === 0 ? null : { value, label: formattedValue };
    }).filter(tick => tick !== null);

    const yTicksAxis2 = Array.from({ length: 6 }, (_, i) => {
        const value = Math.round(yDomain.min + (i * (yDomain.max - yDomain.min) / 5));
        return { value, label: value.toString() };
    });

    const chartWidth = screenWidth * 0.9;  // Slightly reduced width for padding

    return (
        <View style={styles.container}>
            <Text style={styles.yAxisTitle}>{yAxisTitle}</Text>
            <View style={styles.chartContainer}>
                <Chart
                    style={{ height: chartHeight, width: chartWidth }}
                    xDomain={xDomain}
                    yDomain={yDomain}
                    padding={{ left: 80, top: 20, bottom: 80, right: 20 }}
                    viewport={viewport}
                    onViewportChange={setViewport} // Enable scrolling by updating viewport
                >
                    {view === 'portfolioValue' && (
                        <VerticalAxis
                            tickValues={yTicksAxis1.map(tick => tick.value)}
                            theme={{
                                labels: {
                                    label: {
                                        fontSize: 10,
                                        color: '#000',
                                    },
                                },
                            }}
                            tickLabelProps={(value) => ({
                                label: yTicksAxis1.find(tick => tick.value === value)?.label || value.toString(),
                            })}
                        />
                    )}
                    {view === 'performance' && (
                        <VerticalAxis
                            tickValues={yTicksAxis2.map(tick => tick.value)}
                            theme={{
                                labels: {
                                    label: {
                                        fontSize: 10,
                                        color: '#000',
                                    },
                                },
                            }}
                            tickLabelProps={(value) => ({
                                label: yTicksAxis2.find(tick => tick.value === value)?.label || value.toString(),
                            })}
                        />
                    )}
                    <HorizontalAxis
                        tickValues={xTicks.map(tick => tick.value)}
                        theme={{
                            labels: {
                                label: {
                                    fontSize: 10,
                                    color: '#000',
                                },
                            },
                        }}
                    />
                    {chartData.map((line, index) => (
                        <Line
                            key={index}
                            data={line.data}
                            smoothing={line.smoothing}
                            theme={line.theme}
                            tooltipComponent={
                                <Tooltip
                                    theme={{
                                        label: { fontSize: 6, color: "#FFF" },
                                        box: { fill: '#FFF', strokeWidth: 1, strokeColor: '#FFF' },
                                        shape: { r: 6, strokeWidth: 1, strokeColor: '#FFF' },
                                    }}
                                />
                            }
                            onPress={({ index: idx, value }) => {
                                setTooltipIndex(idx);
                                setTooltipValue(`${labels[idx]}: ${Math.round(value.y)}`); // Rounded tooltip value                            }}
                            }}
                        />
                    ))}

                    {tooltipIndex !== null && (
                        <Tooltip
                            position={chartData[0].data[tooltipIndex]}
                            value={tooltipValue}
                            theme={{
                                label: { fontSize: 12, color: "#000" },
                                box: { fill: '#FFF', strokeWidth: 1, strokeColor: '#000', width: 150, padding: 10 },
                                formatter: (value) => `${value.x}: ${value.y}`,
                            }}
                        />
                    )}
                </Chart>
            </View>
            <Text style={styles.xAxisTitle}>{xAxisTitle}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 10,
        flex: 1,
        backgroundColor: '#fff', // to ensure a white background
    },
    chartContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    yAxisTitle: {
        position: 'absolute',
        left: -7,
        top: '45%',
        transform: [{ rotate: '-90deg' }],
        fontSize: 12,
        color: '#000',
    },
    xAxisTitle: {
        position: 'absolute',
        left: 80,
        top: '100%',
        marginTop: 1,
        fontSize: 12,
        color: '#000',
    },
    axisTitle: {
        fontSize: 12, // Adjust font size as needed
        color: '#000000', // Axis title color
    },
});

export default LineChartDisplay;
