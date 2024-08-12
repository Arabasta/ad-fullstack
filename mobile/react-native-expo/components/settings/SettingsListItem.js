import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const SettingsListItem = ({ onPress, children }) => {
    return (
        <TouchableOpacity style={styles.item} onPress={onPress}>
            <Text style={styles.text}>{children}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    item: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#EFEFEF',
        borderRadius: 8,
        marginBottom: 10,
        elevation: 1,
    },
    text: {
        fontSize: 16,
        color: '#000000',
    },
});

export default SettingsListItem;
