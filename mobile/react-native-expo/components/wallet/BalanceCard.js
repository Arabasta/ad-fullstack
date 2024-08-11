import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from "../../components/common/text/Text";

const BalanceCard = ({ balance }) => {
    return (
        <View style={styles.balanceCard}>
            <Text variant="titleMedium" style={styles.balanceLabel}>Balance</Text>
            <Text variant="displayLarge" style={styles.balanceAmount}>
                ${balance ? balance.toFixed(2) : 'Loading...'}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    balanceCard: {
        backgroundColor: '#262525',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        alignItems: 'center',
    },
    balanceLabel: {
        color: 'white',
        marginBottom: 10,
    },
    balanceAmount: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default BalanceCard;
