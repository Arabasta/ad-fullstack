import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import TextInputWithHelper from '../../components/common/input/TextInputWithHelper';
import ButtonPrimary from '../../components/common/button/ButtonPrimary';
import Container from "../../components/common/container/Container";
import Text from "../../components/common/text/Text";
import ErrorText from "../../components/common/text/ErrorText";
import PortfolioService from '../../services/PortfolioService';

const AmountInputScreen = ({ navigation, route }) => {
    const { action, nextScreen, returnScreen, refreshWallet, portfolioType, refreshPortfolio } = route.params;
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const validateAmount = () => {
        const parsedAmount = parseFloat(amount);

        if (!amount) {
            setError('Amount is required.');
            return false;
        } else if (isNaN(parsedAmount)) {
            setError('Please enter a valid number.');
            return false;
        } else if (parsedAmount <= 0) {
            setError('Please enter an amount greater than $0.');
            return false;
        }

        setError('');
        return true;
    };

    const handleConfirm = async () => {
        if (!validateAmount()) return;

        setLoading(true);
        setError('');
        try {
            let successMessage = '';

            if (portfolioType) {
                if (action === 'withdraw') {
                    await PortfolioService.withdrawFunds(portfolioType, amount);
                    successMessage = `Successfully withdrew $${amount} from ${portfolioType} portfolio`;
                } else if (action === 'deposit') {
                    await PortfolioService.addFunds(portfolioType, amount);
                    successMessage = `Successfully deposited $${amount} to ${portfolioType} portfolio`;
                }
                if (refreshPortfolio) {
                    await refreshPortfolio();
                }
            }
            navigation.navigate(nextScreen, { message: successMessage, returnScreen });
        } catch (err) {
            setError('Failed to complete the transaction. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleNext = () => {
        if (!validateAmount()) return;
        setError('');

        navigation.navigate(nextScreen, {
            action,
            amount,
            returnScreen,
            refreshWallet
        });
    };

    return (
        <Container>
            <Text variant="titleLarge">Amount</Text>

            <TextInputWithHelper
                placeholder="$0.00"
                keyboardType="numeric"
                value={amount}
                onChangeText={(value) => {
                    setAmount(value);
                    if (error) {
                        validateAmount();
                    }
                }}
            />

            {error ? <ErrorText>{error}</ErrorText> : null}

            <ButtonPrimary
                title={portfolioType ? "Confirm" : "Next"}
                onPress={portfolioType ? handleConfirm : handleNext}
                style={styles.button}
                disabled={loading}
            />
        </Container>
    );
};

const styles = StyleSheet.create({
    button: {
        marginTop: 20,
    },
});

export default AmountInputScreen;
