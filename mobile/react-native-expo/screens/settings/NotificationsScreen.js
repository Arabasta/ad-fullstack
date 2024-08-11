import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NotificationsScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Notification settings will go here.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default NotificationsScreen;
