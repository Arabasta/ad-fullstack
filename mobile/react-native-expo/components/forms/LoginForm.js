import React, { useState } from 'react';
import {Alert, StyleSheet} from 'react-native';
import TextInput from "../../components/common/input/TextInputWithHelper";
import ButtonPrimary from "../../components/common/button/ButtonPrimary";
import ButtonSecondary from "../common/button/ButtonSecondary";
import ErrorText from "../common/text/ErrorText";
import FormContainer from "../common/container/FormContainer";
import useAuth from "../../hooks/useAuth";

const LoginForm = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { login } = useAuth();

    const handleLogin = async () => {
        try {
            await login(username, password);
        } catch (error) {
            if (error.message.includes('admin')) {
                Alert.alert(
                    'Admin Access Restricted',
                    'Please visit the website to log in as an admin.',
                    [{ text: 'OK' }]
                );
            } else {
                setErrorMessage('Invalid login credentials. Please try again.');
            }
        }
    };

    const handleRegister = () => {
        navigation.navigate('Register');
    };

    return (
        <FormContainer>

            <TextInput
                label="Username"
                value={username}
                onChangeText={setUsername}
                error={errorMessage && !username ? 'Username is required' : ''}
                style={styles.input}
            />
            <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                error={errorMessage && !password ? 'Password is required' : ''}
                style={styles.input}
            />

            {errorMessage ? <ErrorText>{errorMessage}</ErrorText> : null}

            <ButtonPrimary title="Login" onPress={handleLogin} style={styles.buttonLogin} />

            <ButtonSecondary title="Register" onPress={handleRegister} style={styles.buttonRegister}/>

        </FormContainer>
    );
};

const styles = StyleSheet.create({
    input: {
        width: '100%',
    },
    buttonLogin: {
        width: '95%',
        marginVertical: 10,
    },
    buttonRegister: {
        width: '95%',
    },
});

export default LoginForm;
