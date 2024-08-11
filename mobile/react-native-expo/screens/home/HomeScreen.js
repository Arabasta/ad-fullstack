import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Dashboard from '../../components/home/Dashboard';
import PortfolioButton from '../../components/home/PortfolioButton';
import Container from "../../components/common/container/Container";
import usePortfolio from '../../hooks/usePortfolio';

const HomeScreen = ({ navigation }) => {
    const portfolioTypes = ['AGGRESSIVE', 'MODERATE', 'CONSERVATIVE'];

    const portfolios = portfolioTypes.map((type) => {
        const { portfolio, getPortfolio } = usePortfolio(type);
        return {
            type: portfolio.portfolioType,
            value: portfolio.currentValue || 0,
            portfolio: portfolio,
            refresh: getPortfolio,
        };
    });

    // refresh portfolios on focus
    useFocusEffect(
        useCallback(() => {
            portfolios.forEach(p => p.refresh());
        }, [])
    );

    return (
        <Container>
            <Dashboard />

            {portfolios.map((portfolio, index) => (
                <PortfolioButton
                    key={index}
                    title={portfolio.type}
                    value={portfolio.value}
                    onPress={() => navigation.navigate('PortfolioStack', {
                        portfolio: portfolio.portfolio
                    })}
                />
            ))}
        </Container>
    );
};

export default HomeScreen;
