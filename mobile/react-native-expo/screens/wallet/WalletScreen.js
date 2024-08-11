import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import ButtonPrimary from '../../components/common/button/ButtonPrimary';
import Container from "../../components/common/container/Container";
import useWallet from "../../hooks/useWallet";
import useBankDetails from "../../hooks/useBankDetails";
import BalanceCard from "../../components/wallet/BalanceCard";

const WalletScreen = ({ navigation }) => {
    const { wallet, getWallet } = useWallet();
    const { bankDetails, getBankDetails } = useBankDetails();

    const refreshWallet = async () => {
        await getWallet();
    };

    const handleAction = async (action) => {
        await getBankDetails();
        if (!bankDetails || !bankDetails.bankName || !bankDetails.accountNumber || !bankDetails.accountHolderName) {
            Alert.alert('Incomplete Bank Details', 'Please complete your bank details to proceed.');
            return;
        }
        navigation.navigate('AmountInput', { action, nextScreen: 'BankDetails', returnScreen: 'Wallet', refreshWallet });
    };

    return (
        <Container>
            <BalanceCard balance={wallet} />
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
                onPress={() => navigation.navigate('TransactionHistory', { type: 'wallet' })}
                style={styles.historyButton}
            />
        </Container>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    button: {
        width: '48%',
    },
    historyButton: {
        marginTop: 20,
    },
});

export default WalletScreen;
