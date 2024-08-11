import React from 'react';
import { HelperText } from 'react-native-paper';
import TextInput from "./TextInput";

/**
 * Same as normal input, but with helper text for error messages.
 * Mostly used for form validation.
 *
 * Usage:
 * <TextInputWithHelper
 *   label="Email"
 *   value={email}
 *   onChangeText={setEmail}
 *   error={emailError}
 *   keyboardType="email-address" />
 *
 *  <TextInputWithHelper
 *    label="Phone Number"
 *    value={phoneNumber}
 *    onChangeText={setPhoneNumber}
 *    error={phoneError}
 *    keyboardType="numeric" />
 *
 *  <TextInputWithHelper
 *    label="Username"
 *    value={username}
 *    onChangeText={setUsername}
 *    error={usernameError} />
 */
const TextInputWithHelper = ({ label, value, onChangeText, error, ...props }) => {
    return (
        <>
            <TextInput
                label={label}
                value={value}
                onChangeText={onChangeText}
                mode="outlined"
                error={!!error}
                {...props}
            />
            <HelperText type="error" visible={!!error}>
                {error}
            </HelperText>
        </>
    );
};

export default TextInputWithHelper;
