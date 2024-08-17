import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// mostly for settings menu
const ListItem = ({ title, subtitle, style, ...props }) => {
    return (
        <View style={[styles.listItem, style]} {...props}>
            <Text style={styles.title}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    listItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 14,
        color: '#777',
    },
});

export default ListItem;
