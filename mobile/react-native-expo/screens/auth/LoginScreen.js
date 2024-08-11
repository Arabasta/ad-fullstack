import React from 'react';
import { StyleSheet } from 'react-native';
import LoginForm from "../../components/forms/LoginForm";
import Logo from "../../components/common/logo/Logo";
import Container from "../../components/common/container/Container";

const LoginScreen = ({ navigation }) => {

    return (
        <Container style={styles.container}>
            <Logo />
            <LoginForm navigation={navigation} />
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LoginScreen;
