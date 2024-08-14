import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Just a box for now
const Dashboard = ({header, chart}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Total Portfolio Value: ${header.toLocaleString('en-SG')} </Text>
            {chart}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 450,
        width: '100%',
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    text: {
        fontSize: 18,
        color: '#333',
    },
});

export default Dashboard;
