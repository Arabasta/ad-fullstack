import React from "react";
import Text from "./Text";
import { StyleSheet } from "react-native";

/**
 * ErrorText component to display error messages in red.
 *
 * Usage:
 * <ErrorText>Your error message here</ErrorText>
 */
const ErrorText = ({ children, ...props }) => {
    return (
        <Text style={styles.error} {...props}>
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    error: {
        color: 'red',
    },
});

export default ErrorText;
