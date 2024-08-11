import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '../text/Text';

// mostly used in the settings tab
const SmallDisplayCard = ({ label, value }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}:</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
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
    },
});

export default SmallDisplayCard;
