import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import TextInputWithHelper from '../../../components/common/input/TextInputWithHelper';
import ButtonPrimary from '../../../components/common/button/ButtonPrimary';
import ErrorText from "../../../components/common/text/ErrorText";
import SuccessText from "../../../components/common/text/SuccessText";
import Container from "../../../components/common/container/Container";
import UserService from '../../../services/UserService';

const EmailScreen = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            setError('Email is required.');
            return false;
        }
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address.');
            return false;
        }
        setError('');
        return true;
    };

    const handleSave = async () => {
        setSuccess('');
        setError('');
        if (!validateEmail()) return;

        try {
            await UserService.updateEmail({ email });
            setSuccess('Email updated successfully.');
            setError('');
        } catch (error) {
            console.error('Error updating email:', error);
            setError('Error updating email.');
            setSuccess('');
        }
    };

    return (
        <Container>
            <TextInputWithHelper
                label="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <View style={styles.messageContainer}>
                {error ? <ErrorText>{error}</ErrorText> : null}
                {success ? <SuccessText>{success}</SuccessText> : null}
            </View>
            <ButtonPrimary
                title="Save"
                onPress={handleSave}
                style={styles.button}
            />
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

export default EmailScreen;
