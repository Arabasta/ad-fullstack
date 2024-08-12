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
        paddingVertical: 15,
        paddingHorizontal: 30,
        backgroundColor: '#b61e04',
        borderRadius: 10,
        elevation: 3,
    },
    logoutText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default LogoutButton;
