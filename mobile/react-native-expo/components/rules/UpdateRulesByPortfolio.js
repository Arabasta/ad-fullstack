import React, { useState, useEffect } from "react";
import useWallet from "../../hooks/useWallet";
import TextInputWithHelper from "../common/input/TextInputWithHelper";
import ResetStopLossTriggerByPortfolio from "./ResetStopLossTriggerByPortfolio";
import ButtonPrimary from "../common/button/ButtonPrimary";
import Container from "../common/container/Container";
import useRule from "../../hooks/useRule";
import ErrorText from "../common/text/ErrorText";
import SuccessText from "../common/text/SuccessText";
import { View, StyleSheet } from "react-native";

const UpdateRulesByPortfolio = ({ portfolioType, rule, onReset }) => {
    const [formData, setFormData] = useState({});
    const [invalidForSubmission, setInvalidForSubmission] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [successText, setSuccessText] = useState("");
    const { wallet, getWallet } = useWallet();
    const { updateRule } = useRule(portfolioType);

    useEffect(() => {
        if (rule) {
            setFormData(rule);
        }
    }, [rule]);

    useEffect(() => {
        getWallet();
    }, [getWallet]);

    const handleChange = (name, value) => {
        if (name === 'stopLoss') {
            if (value < 0 || value > 100) {
                setErrorText("Stop Loss percentage must be between 0 and 100.");
                setInvalidForSubmission(true);
                return;
            }
        }

        if (name === 'recurringAllocationAmount') {
            if (value < 0 || value > wallet) {
                setErrorText(`Recurring Allocation Amount must be positive and less than wallet balance.`);
                setInvalidForSubmission(true);
                return;
            }
        }

        if (name === 'recurringAllocationDay') {
            if (value < 1 || value > 28) {
                setErrorText("Recurring Allocation Day must be within 1 and 28.");
                setInvalidForSubmission(true);
                return;
            }
        }

        setInvalidForSubmission(false);
        setErrorText("");  // Clear any previous errors
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        if (invalidForSubmission) return;

        try {
            await updateRule(formData);
            setSuccessText("Rules updated successfully.");
            setErrorText("");
        } catch (err) {
            setErrorText("Failed to update rules. Please try again later.");
            setSuccessText("");
        }
    };

    return (
        <Container>
            <TextInputWithHelper
                label="Stop Loss (%)"
                value={formData.stopLoss?.toString() || ''}
                onChangeText={(value) => handleChange('stopLoss', Number(value))}
                keyboardType="numeric"
            />
            <TextInputWithHelper
                label="Recurring Allocation Amount ($)"
                value={formData.recurringAllocationAmount?.toString() || ''}
                onChangeText={(value) => handleChange('recurringAllocationAmount', Number(value))}
                keyboardType="numeric"
            />
            <TextInputWithHelper
                label="Recurring Allocation Day of Month"
                value={formData.recurringAllocationDay?.toString() || ''}
                onChangeText={(value) => handleChange('recurringAllocationDay', Number(value))}
                keyboardType="numeric"
            />
            <View style={styles.messageContainer}>
                {errorText ? <ErrorText>{errorText}</ErrorText> : null}
                {successText ? <SuccessText>{successText}</SuccessText> : null}
            </View>
            <ButtonPrimary
                title="Update Rule"
                onPress={handleSubmit}
                style={styles.button}
            />
            <ResetStopLossTriggerByPortfolio onReset={onReset} />
        </Container>
    );
};

const styles = StyleSheet.create({
    button: {
        marginTop: 20,
    },
    messageContainer: {
        marginBottom: 10,
    },
});

export default UpdateRulesByPortfolio;
