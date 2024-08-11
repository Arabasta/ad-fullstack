import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import TextInputWithHelper from '../../components/common/input/TextInputWithHelper';
import ButtonPrimary from '../../components/common/button/ButtonPrimary';
import ButtonCancel from '../../components/common/button/ButtonCancel';
import ErrorText from "../../components/common/text/ErrorText";
import useBankDetails from "../../hooks/useBankDetails";
import BankDetailsDisplay from "../settings/BankDetailsDisplay";

const BankDetailsForm = ({ onSubmit }) => {
    const { bankDetails, updateBankDetails } = useBankDetails();
    const [details, setDetails] = useState({
        bankName: '',
        accountNumber: '',
        accountHolderName: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (bankDetails) {
            setDetails({
                bankName: bankDetails.bankName || '',
                accountNumber: bankDetails.accountNumber || '',
                accountHolderName: bankDetails.accountHolderName || '',
            });
        }
    }, [bankDetails]);

    const handleInputChange = (name, value) => {
        setDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const validateFields = () => {
        const validationErrors = {};
        let valid = true;

        if (!details.bankName) {
            validationErrors.bankName = "Bank Name is required";
            valid = false;
        }
        if (!details.accountNumber) {
            validationErrors.accountNumber = "Account Number is required";
            valid = false;
        }
        if (!details.accountHolderName) {
            validationErrors.accountHolderName = "Full Name is required";
            valid = false;
        }

        setErrors(validationErrors);
        return valid;
    };

    const handleSave = async () => {
        setErrors("");

        if (!validateFields()) {
            return;
        }

        setLoading(true);
        try {
            await updateBankDetails(details);
            onSubmit && onSubmit();
            setIsEditing(false);
        } catch (error) {
            console.error("Error saving bank details:", error);
            setErrors({ save: "Failed to save bank details. Please try again." });
        } finally {
            setLoading(false);
        }
    };

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    return (
        <View style={styles.container}>
            {!isEditing ? (
                <>
                    <BankDetailsDisplay details={details} />

                    <ButtonPrimary style={styles.buttonSpacing} title="Edit" onPress={toggleEdit} />
                </>
            ) : (
                <>
                    <TextInputWithHelper
                        label="Bank"
                        value={details.bankName}
                        onChangeText={(value) => handleInputChange('bankName', value)}
                        error={errors.bankName}
                    />
                    <TextInputWithHelper
                        label="Account Number"
                        value={details.accountNumber}
                        onChangeText={(value) => handleInputChange('accountNumber', value)}
                        keyboardType="numeric"
                        error={errors.accountNumber}
                    />
                    <TextInputWithHelper
                        label="Full Name"
                        value={details.accountHolderName}
                        onChangeText={(value) => handleInputChange('accountHolderName', value)}
                        error={errors.accountHolderName}
                    />
                    {errors.save && (
                        <ErrorText style={styles.errorTextSpacing}>
                            {errors.save}
                        </ErrorText>
                    )}

                    <View style={styles.buttonContainer}>
                        <ButtonCancel style={styles.buttonSpacing} title="Cancel" onPress={toggleEdit} />
                        <ButtonPrimary style={styles.buttonSpacing} title="Save" onPress={handleSave} disabled={loading} />
                    </View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    textSpacing: {
        marginBottom: 20,
    },
    buttonSpacing: {
        marginBottom: 15,
    },
    errorTextSpacing: {
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default BankDetailsForm;
