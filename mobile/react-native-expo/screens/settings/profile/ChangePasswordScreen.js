import React, { useState } from 'react';
import TextInputWithHelper from '../../../components/common/input/TextInputWithHelper';
import ButtonPrimary from '../../../components/common/button/ButtonPrimary';
import Container from "../../../components/common/container/Container";
import ErrorText from "../../../components/common/text/ErrorText";
import SuccessText from "../../../components/common/text/SuccessText";
import UserService from '../../../services/UserService';
import {View} from "react-native";

const ChangePasswordScreen = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const validatePasswords = () => {
        if (!newPassword || !confirmPassword) {
            setError('Please fill out all fields.');
            return false;
        }
        if (newPassword.length < 8) {
            setError('New password must be at least 8 characters long.');
            return false;
        }
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return false;
        }
        setError('');
        return true;
    };

    const handleChangePassword = async () => {
        if (!validatePasswords()) return;

        try {
            await UserService.updatePassword({ oldPassword: currentPassword, newPassword });
            setSuccess('Password updated successfully.');
            setError('');
            setNewPassword('');
            setCurrentPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.error('Error updating password:', error);
            setError(error.response.data.message || 'Failed to update password.');
            setSuccess('');
        }
    };

    return (
        <Container>
            <TextInputWithHelper
                label="Current Password"
                secureTextEntry
                value={currentPassword}
                onChangeText={setCurrentPassword}
            />
            <TextInputWithHelper
                label="New Password"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
            />
            <TextInputWithHelper
                label="Confirm New Password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            <View style={{ marginBottom: 10, alignItems: 'center'}}>
                {error ? <ErrorText>{error}</ErrorText> : null}
                {success ? <SuccessText>{success}</SuccessText> : null}
            </View>
            <ButtonPrimary
                title="Change Password"
                onPress={handleChangePassword}
            />
        </Container>
    );
};

export default ChangePasswordScreen;
