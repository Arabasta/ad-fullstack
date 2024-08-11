import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Just a box for now
const Dashboard = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Dashboard</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 200,
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
