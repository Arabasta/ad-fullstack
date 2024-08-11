import React from 'react';
import { View, StyleSheet } from 'react-native';

/**
 * FormContainer - base parent container for all forms
 *
 * Usage:
 * <FormContainer>
 *   <AllFormContent />
 * </FormContainer>
 */
const FormContainer = ({ children, style, ...props }) => {
    return (
        <View style={[styles.formContainer, style]} {...props}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        width: '90%',
        alignItems: 'center',
    },
});

export default FormContainer;
