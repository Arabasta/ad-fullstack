import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
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
            setErrorMessage('Invalid login credentials. Please try again.');
        }
    };

    const handleRegister = () => {
        navigation.navigate('Register');
    };

    return (
        <FormContainer>
            {errorMessage ? <ErrorText style={styles.error}>{errorMessage}</ErrorText> : null}

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
