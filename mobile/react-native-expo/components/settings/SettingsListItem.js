import React from "react";
import { StyleSheet } from "react-native";
import TouchableOpacity from "../common/button/TouchableOpacity";
import Text from "../common/text/Text";

const SettingsListItem = ({ onPress, children }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text variant="titleMedium">{children}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default SettingsListItem;
