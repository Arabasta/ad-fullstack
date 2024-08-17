import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const PortfolioButton = ({ title, value, onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.value}>${value.toLocaleString('en-SG')}</Text>
                <MaterialIcons name="chevron-right" size={24} color="#333" />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#f5f5f5',
        padding: 15,
        borderRadius: 15,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    titleContainer: {
        flexDirection: 'column',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    value: {
        fontSize: 16,
        fontWeight: '400',
        color: '#666',
        marginTop: 5,
    },
});


export default PortfolioButton;
