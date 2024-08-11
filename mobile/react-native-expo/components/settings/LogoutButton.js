import React from 'react';
import { StyleSheet } from 'react-native';
import useAuth from "../../hooks/useAuth";
import TouchableOpacity from "../common/button/TouchableOpacity";
import Text from "../common/text/Text";

const LogoutButton = ({ navigation, ...props }) => {
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigation.navigate('Login');
    };

    return (
        <TouchableOpacity style={styles.logout} onPress={handleLogout} {...props}>
            <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    logout: {
        marginTop: 30,
        alignItems: 'center',
        borderBottomWidth: 0,
    },
    logoutText: {
        color: 'red',
        fontSize: 16,
    },
});

export default LogoutButton;
