import React from 'react';
import { View, StyleSheet } from 'react-native';

/**
 * Container - base parent container for all screens
 *
 * Usage:
 * <Container>
 *   <AllPageContent />
 * </Container>
 */
const Container = ({ children, style, ...props }) => {
    return (
        <View style={[styles.container, style]} {...props}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
});

export default Container;
