import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';
import TextInputWithHelper from '../../components/common/input/TextInputWithHelper';
import ButtonPrimary from '../../components/common/button/ButtonPrimary';
import Container from "../../components/common/container/Container";
import useBankDetails from "../../hooks/useBankDetails";
import WalletService from '../../services/WalletService';
import ErrorText from "../../components/common/text/ErrorText";
import SmallDisplayCard from "../../components/common/card/SmallDisplayCard";

const ConfirmBankDetailsScreen = ({ navigation, route }) => {
    const { nextScreen = 'Success', returnScreen = 'Wallet', amount, action, refreshWallet } = route.params || {};
    const { bankDetails } = useBankDetails();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleConfirm = async () => {
        setLoading(true);
        setError('');

        try {
            let successMessage = '';

            if (action === 'withdraw') {
                await WalletService.withdrawFunds(amount);
                successMessage = `Successfully withdrew $${amount} to wallet`;
            } else if (action === 'deposit') {
                await WalletService.addFunds(amount);
                successMessage = `Successfully deposited $${amount} to wallet`;
            }
            await refreshWallet();
            navigation.navigate(nextScreen, { message: successMessage, returnScreen });
        } catch (err) {
            setError('Failed to complete the transaction. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <SmallDisplayCard label="Bank" value={bankDetails?.bankName || ''} />
            <SmallDisplayCard label="Account Number" value={bankDetails?.accountNumber || ''} />
            <SmallDisplayCard label="Full Name" value={bankDetails?.accountHolderName || ''} />

            {error && <ErrorText>{error}</ErrorText>}

            <View style={styles.buttonContainer}>
                <ButtonPrimary
                    title="Back"
                    onPress={() => navigation.goBack()}
                    style={styles.button}
                    disabled={loading}
                />
                <ButtonPrimary
                    title="Confirm"
                    onPress={handleConfirm}
                    style={styles.button}
                    disabled={loading}
                />
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        width: '48%',
    },
});

export default ConfirmBankDetailsScreen;
