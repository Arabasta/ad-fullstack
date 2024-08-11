import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const Logo = () => {

    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/fourquant-logo.png')} style={styles.logo} resizeMode="contain" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 350,
        height: undefined,
        aspectRatio: 2,
    },
});

export default Logo;
