import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const PortfolioButton = ({ title, value, onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.value}>${value.toFixed(2)}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#e0e0e0',
        padding: 15,
        borderRadius: 10,
        marginVertical: 5,
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    value: {
        fontSize: 16,
        color: '#333',
    },
});

export default PortfolioButton;
