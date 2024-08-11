import React from 'react';
import { View, StyleSheet } from 'react-native';
import SmallDisplayCard from '../common/card/SmallDisplayCard';

const BankDetailsDisplay = ({ details }) => {
    return (
        <View style={styles.container}>
            <SmallDisplayCard label="Bank" value={details.bankName} />
            <SmallDisplayCard label="Account Number" value={details.accountNumber} />
            <SmallDisplayCard label="Full Name" value={details.accountHolderName} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
});

export default BankDetailsDisplay;
