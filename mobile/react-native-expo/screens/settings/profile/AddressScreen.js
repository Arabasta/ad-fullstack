import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import ButtonPrimary from '../../../components/common/button/ButtonPrimary';
import ButtonCancel from '../../../components/common/button/ButtonCancel';
import Container from "../../../components/common/container/Container";
import ErrorText from "../../../components/common/text/ErrorText";
import SuccessText from "../../../components/common/text/SuccessText";
import useAddress from '../../../hooks/useAddress';
import SmallDisplayCard from "../../../components/common/card/SmallDisplayCard";
import AddressService from "../../../services/AddressService";
import { validateAddress } from "../../../utils/validation/validateAddress";
import AddressForm from '../../../components/forms/AddressForm';

const AddressScreen = () => {
    const { address } = useAddress();
    const [addressValues, setAddressValues] = useState({street: '', city: '', postalCode: '', country: '', unitNo: '',});
    const [error, setError] = useState({});  // Initialize error as an empty object
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

    const handleSave = async () => {
        setSuccess('');
        const { valid, validationErrors } = validateAddress(addressValues);
        if (!valid) {
            setError(validationErrors);
            return;
        }

        setLoading(true);
        try {
            await AddressService.updateAddress(addressValues);
            setSuccess('Address updated successfully.');
            setError({});
            setIsEditing(false);
        } catch (error) {
            console.error("Error saving address:", error);
            setError({ save: 'Failed to save address. Please try again.' });
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
                    <SmallDisplayCard label="Street" value={addressValues.street} />
                    <SmallDisplayCard label="City" value={addressValues.city} />
                    <SmallDisplayCard label="Postal Code" value={addressValues.postalCode} />
                    <SmallDisplayCard label="Country" value={addressValues.country} />
                    <SmallDisplayCard label="Unit No" value={addressValues.unitNo} />

                    {success && (<SuccessText>{success}</SuccessText>)}
                    <ButtonPrimary style={styles.buttonSpacing} title="Edit" onPress={toggleEdit} />
                </>
            ) : (
                <>
                    <AddressForm addressValues={addressValues} handleInputChange={handleInputChange} error={error}/>

                    {error.save && (<ErrorText style={styles.errorTextSpacing}>{error.save}</ErrorText>)}

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
