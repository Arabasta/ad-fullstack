import React from "react";
import Text from "./Text";
import { StyleSheet } from "react-native";

/**
 * SuccessText component to display success messages in green.
 *
 * Usage:
 * <SuccessText>Your success message here</SuccessText>
 */
const SuccessText = ({ children, ...props }) => {
    return (
        <Text style={styles.success} {...props}>
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    success: {
        color: 'green',
    },
});

export default SuccessText;
