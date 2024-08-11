import React from 'react';
import { View, StyleSheet } from 'react-native';
import ButtonPrimary from '../../components/common/button/ButtonPrimary';
import Container from "../../components/common/container/Container";
import Text from "../../components/common/text/Text";
import Dashboard from "../../components/home/Dashboard";
import usePortfolio from "../../hooks/usePortfolio";
import { FAB } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const PortfolioScreen = ({ route, navigation }) => {
    const { portfolio } = route.params;
    const { getPortfolio } = usePortfolio(portfolio.portfolioType);

    const refreshPortfolio = async () => {
        await getPortfolio();
    };

    const handleAction = async (action) => {
        navigation.navigate('AmountInput', {
            action,
            nextScreen: 'Success',
            returnScreen: 'Portfolio',
            portfolioType: portfolio.portfolioType,
            refreshPortfolio,
        });
    };

    return (
        <Container>
            <Text variant="headlineMedium">${portfolio.currentValue || 0.00}</Text>

            {/* Portfolio Dashboard */}
            <Dashboard portfolio={portfolio} />

            {/* Withdraw, Deposit and History Buttons */}
            <View style={styles.buttonContainer}>
                <ButtonPrimary
                    title="Withdraw"
                    onPress={() => handleAction('withdraw')}
                    style={styles.button}
                />
                <ButtonPrimary
                    title="Deposit"
                    onPress={() => handleAction('deposit')}
                    style={styles.button}
                />
            </View>

            <ButtonPrimary
                title="History"
                onPress={() => navigation.navigate('TransactionHistory', { type: 'portfolio', portfolioType: portfolio.portfolioType })}
                style={styles.historyButton}
            />

            {/* Manage Rules Floating Action Button */}
            <FAB
                style={styles.fab}
                icon={() => <Ionicons name="settings-outline" size={24} color="white" />}
                onPress={() => navigation.navigate('ManageRules', { portfolioType: portfolio.portfolioType })}
                label="Manage Rules"
                color="white"
            />
        </Container>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
    },
    button: {
        width: '48%',
    },
    historyButton: {
        marginTop: 10,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#6200EE',
    },
});

export default PortfolioScreen;
