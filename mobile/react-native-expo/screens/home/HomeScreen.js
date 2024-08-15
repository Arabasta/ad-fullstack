import React, {useCallback, useMemo, useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Dashboard from '../../components/home/Dashboard';
import PortfolioButton from '../../components/home/PortfolioButton';
import Container from "../../components/common/container/Container";
import usePortfolio from '../../hooks/usePortfolio';
import LineChartDisplay from "../../components/common/chart/LineChartDisplay";
import {Text, View, StyleSheet} from 'react-native'
import TouchableOpacity from "../../components/common/button/TouchableOpacity";

const HomeScreen = ({ navigation }) => {
    const portfolioTypes = ['AGGRESSIVE', 'MODERATE', 'CONSERVATIVE'];
    const [view, setView] = useState('portfolioValue');

    const portfolios = portfolioTypes.map((type) => {
        const { portfolio, getPortfolio } = usePortfolio(type);
        return {
            type: portfolio.portfolioType,
            value: portfolio.currentValue || 0,
            portfolio: portfolio,
            refresh: getPortfolio,
            //data: portfolio.performanceChart
        };
    });

    // list out for easier debugging
    const conPortfolio = usePortfolio('CONSERVATIVE');
    const modPortfolio = usePortfolio('MODERATE');
    const aggPortfolio = usePortfolio('AGGRESSIVE');

    // Calculate the sum of currentValues from all portfolios
    const totalCurrentValue = useMemo(() => {
        const aggressiveValue = aggPortfolio.portfolio.currentValue || 0;
        const moderateValue = modPortfolio.portfolio.currentValue || 0;
        const conservativeValue = conPortfolio.portfolio.currentValue || 0;
        return parseFloat(aggressiveValue) + parseFloat(moderateValue) + parseFloat(conservativeValue);
    }, [
        aggPortfolio.portfolio.currentValue,
        modPortfolio.portfolio.currentValue,
        conPortfolio.portfolio.currentValue
    ]);

    const portfoliosData = [
        { type: 'CONSERVATIVE', data: conPortfolio.performanceChart },
        { type: 'MODERATE', data: modPortfolio.performanceChart },
        { type: 'AGGRESSIVE', data: aggPortfolio.performanceChart },
    ];

    const handleToggle = () => {
        setView(view === 'portfolioValue' ? 'performance' : 'portfolioValue');
    };

    function formatLabels(label) {
            const [year, month, day, hour, minute, second] = label;
            const date = new Date(year, month - 1, day, hour, minute, second);
            return date.toLocaleString('en-SG', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
            });
    }

    // Extract and format the labels
    const labels = portfoliosData[0]?.data?.labels || [];
    const firstLabelUnformatted = labels.length > 0 ? labels[0] : '';
    const lastLabelUnformatted = labels.length > 0 ? labels[labels.length - 1] : '';
    const firstLabelFormatted = firstLabelUnformatted
        ? formatLabels(firstLabelUnformatted)
        : '';
    const lastLabelFormatted = lastLabelUnformatted
        ? formatLabels(lastLabelUnformatted)
        : '';

    const combinedLabels = labels.map(label => formatLabels(label));

    // Prepare the combined data for all portfolios
    const combinedData = portfoliosData.map((portfolio, index) => {
        const datasetIndex = view === 'portfolioValue' ? 0 : 1;
        return {
            label: portfolio.type, // "AGGRESSIVE", "MODERATE", "CONSERVATIVE"
            data: portfolio.data?.datasets[datasetIndex]?.data || [],
            borderColor: index === 0 ? "#0000FF" : index === 1 ? "#FFA500" : "#FF0000",
            backgroundColor: index === 0 ? "#0000FF" : index === 1 ? "#FFA500" : "#FF0000",
            yAxisID: view === 'portfolioValue' ? 'y-axis-1' : 'y-axis-2',
        };
    });

    // To get the data for the respective portfolio types
    const getDataByType = (type) => {
        const portfolioData = portfoliosData.find(portfolio => portfolio.type === type);
        if (!portfolioData || !portfolioData.data || !portfolioData.data.datasets) {
            return { chartData: [], labels: [] };
        }

        const datasetIndex = view === 'portfolioValue' ? 0 : 1;

        const chartData = {
            label: portfolioData.type,
            data: portfolioData.data?.datasets[datasetIndex]?.data || [],
            borderColor: type === 'CONSERVATIVE' ? "#0000FF" : type === 'MODERATE' ? "#FFA500" : "#FF0000",
            backgroundColor: type === 'CONSERVATIVE' ? "#0000FF" : type === 'MODERATE' ? "#FFA500" : "#FF0000",
            yAxisID: view === 'portfolioValue' ? 'y-axis-1' : 'y-axis-2',
        };

        const labels = portfolioData.data?.labels?.map(label => formatLabels(label)) || [];

        return { chartData, labels };
    };

    // refresh portfolios on focus
    useFocusEffect(
        useCallback(() => {
            portfolios.forEach(p => p.refresh());
        }, [])
    );

    // Filter out datasets with undefined data
    const filteredDatasets = combinedData.filter(dataset => Array.isArray(dataset.data) && dataset.data.length > 0);

    return (
        <Container>
            <Dashboard
                header={totalCurrentValue}
                chart={filteredDatasets.length > 0 ? (
                    <LineChartDisplay
                        datasets={filteredDatasets}
                        labels={combinedLabels}
                        yAxisTitle={view === 'portfolioValue' ? "Portfolio Value ($)" : "Performance (%)"}
                        xAxisTitle={
                            <View style={styles.xAxisTitleContainer}>
                                <Text style={styles.labelText}>To {firstLabelFormatted}</Text>
                                <Text style={styles.xAxisTitle}>Time</Text>
                                <Text style={styles.labelText}>From {lastLabelFormatted}</Text>

                            </View>
                        }
                        view={view}
                    />
                ) : (<Text>No data available for the chart</Text>)}
            />

            <TouchableOpacity style={styles.toggleButton} onPress={handleToggle}>
                <Text style={styles.toggleButtonText}>
                    Switch to {view === 'portfolioValue' ? 'Performance' : 'Portfolio Value'}
                </Text>
            </TouchableOpacity>

            {portfolios.map((portfolio, index) => {
                const { chartData, labels } = getDataByType(portfolio.type);

                return (
                    <PortfolioButton
                        key={index}
                        title={portfolio.type}
                        value={portfolio.value}
                        onPress={() => navigation.navigate('PortfolioStack', {
                            portfolio: portfolio.portfolio,
                            chartData,
                            labels,
                            firstLabelFormatted,
                            lastLabelFormatted,
                            yAxisTitle: view === 'portfolioValue' ? "Portfolio Value ($)" : "Performance (%)", // Passing the title dynamically
                        })}
                    />
                );
            })}
        </Container>
    );
};

const styles = StyleSheet.create({
    xAxisTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    xAxisTitle: {
        fontSize: 12,
        color: '#000',
        marginHorizontal: 10,
    },

    labelText: {
        fontSize: 10, // Adjust the font size for the first and last labels
        color: '#000',
        fontWeight: "bold"
    },
    toggleButton: {
        backgroundColor: '#6200EE',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 20,
    },
    toggleButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default HomeScreen;
