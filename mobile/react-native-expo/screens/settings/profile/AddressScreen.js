import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import TextInputWithHelper from '../../../components/common/input/TextInputWithHelper';
import ButtonPrimary from '../../../components/common/button/ButtonPrimary';
import ButtonCancel from '../../../components/common/button/ButtonCancel';
import Container from "../../../components/common/container/Container";
import ErrorText from "../../../components/common/text/ErrorText";
import SuccessText from "../../../components/common/text/SuccessText";
import useAddress from '../../../hooks/useAddress';
import SmallDisplayCard from "../../../components/common/card/SmallDisplayCard";
import AddressService from "../../../services/AddressService";

const AddressScreen = () => {
    const { address } = useAddress();
    const [addressValues, setAddressValues] = useState({
        street: '',
        city: '',
        postalCode: '',
        country: '',
        unitNo: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (address) {
            setAddressValues({
                street: address.street || '',
                city: address.city || '',
                postalCode: address.postalCode || '',
                country: address.country || '',
                unitNo: address.unitNo || '',
            });
        }
    }, [address]);

    const handleInputChange = (name, value) => {
        setAddressValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const validateFields = () => {
        const validationErrors = {};
        let valid = true;

        if (!addressValues.street) {
            validationErrors.street = "Street is required";
            valid = false;
        } else if (addressValues.street.length > 50) {
            validationErrors.street = "Street cannot be more than 50 characters";
            valid = false;
        }
        if (!addressValues.city) {
            validationErrors.city = "City is required";
            valid = false;
        } else if (addressValues.city.length > 50) {
            validationErrors.city = "City cannot be more than 50 characters";
            valid = false;
        }
        if (!addressValues.postalCode) {
            validationErrors.postalCode = "Postal code is required";
            valid = false;
        } else if (addressValues.postalCode.length > 50) {
            validationErrors.postalCode = "Postal code cannot be more than 50 characters";
            valid = false;
        }
        if (!addressValues.country) {
            validationErrors.country = "Country is required";
            valid = false;
        } else if (addressValues.country.length > 50) {
            validationErrors.country = "Country cannot be more than 50 characters";
            valid = false;
        }
        if (!addressValues.unitNo) {
            validationErrors.unitNo = "Unit number is required";
            valid = false;
        } else if (addressValues.unitNo.length > 10) {
            validationErrors.unitNo = "Unit number cannot be more than 10 characters";
            valid = false;
        }

        setError(validationErrors);
        return valid;
    };

    const handleSave = async () => {
        setSuccess('');
        setError('');
        if (!validateFields()) {
            return;
        }

        setLoading(true);
        try {
            await AddressService.updateAddress(addressValues);
            setSuccess('Address updated successfully.');
            setError('');
            setIsEditing(false);
        } catch (error) {
            console.error("Error saving address:", error);
            setError("Failed to save address. Please try again.");
            setSuccess('');
        } finally {
            setLoading(false);
        }
    };

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    return (
        <Container>
            {!isEditing ? (
                <>
                    <>
                        <SmallDisplayCard label="Street" value={addressValues.street} />
                        <SmallDisplayCard label="City" value={addressValues.city} />
                        <SmallDisplayCard label="Postal Code" value={addressValues.postalCode} />
                        <SmallDisplayCard label="Country" value={addressValues.country} />
                        <SmallDisplayCard label="Unit No" value={addressValues.unitNo} />

                        {success && (<SuccessText>{success}</SuccessText>)}
                        <ButtonPrimary style={styles.buttonSpacing} title="Edit" onPress={toggleEdit} />
                    </>
                </>
            ) : (
                <>
                    <TextInputWithHelper
                        label="Street"
                        value={addressValues.street}
                        onChangeText={(value) => handleInputChange('street', value)}
                        error={error.street}
                    />
                    <TextInputWithHelper
                        label="City"
                        value={addressValues.city}
                        onChangeText={(value) => handleInputChange('city', value)}
                        error={error.city}
                    />
                    <TextInputWithHelper
                        label="Postal Code"
                        value={addressValues.postalCode}
                        onChangeText={(value) => handleInputChange('postalCode', value)}
                        keyboardType="numeric"
                        error={error.postalCode}
                    />
                    <TextInputWithHelper
                        label="Country"
                        value={addressValues.country}
                        onChangeText={(value) => handleInputChange('country', value)}
                        error={error.country}
                    />
                    <TextInputWithHelper
                        label="Unit No"
                        value={addressValues.unitNo}
                        onChangeText={(value) => handleInputChange('unitNo', value)}
                        error={error.unitNo}
                    />
                    {error.save && (
                        <ErrorText style={styles.errorTextSpacing}>
                            {error.save}
                        </ErrorText>
                    )}

                    <View style={styles.buttonContainer}>
                        <ButtonCancel style={styles.buttonSpacing} title="Cancel" onPress={toggleEdit} />
                        <ButtonPrimary style={styles.buttonSpacing} title="Save" onPress={handleSave} disabled={loading} />
                    </View>
                </>
            )}
        </Container>
    );
};

const styles = StyleSheet.create({
    addressContainer: {
        marginBottom: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    value: {
        fontSize: 18,
        color: '#333',
    },
    buttonSpacing: {
        marginTop: 20,
    },
    errorTextSpacing: {
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default AddressScreen;
