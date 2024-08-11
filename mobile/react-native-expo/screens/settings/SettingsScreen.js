import React from 'react';
import Text from "../../components/common/text/Text";
import Container from "../../components/common/container/Container";
import LogoutButton from "../../components/settings/LogoutButton";
import SettingsListItem from "../../components/settings/SettingsListItem";
import {View, StyleSheet} from "react-native";

// todo: change name and portfolio recommended type to dynamic
const SettingsScreen = ({ navigation }) => {
    return (
        <Container>
            <View style={ styles.container}>
                <Text variant="headlineMedium" style={styles.text}>Hello, Kei</Text>
                <Text variant="titleMedium" style={styles.text}>
                    Your recommended portfolio type is: Aggressive
                </Text>
            </View>

            <SettingsListItem onPress={() => navigation.navigate('ProfileStack')}>
                Profile
            </SettingsListItem>
            <SettingsListItem onPress={() => navigation.navigate('BankDetails')}>
                Bank Details
            </SettingsListItem>
            <SettingsListItem onPress={() => navigation.navigate('Notifications')}>
                Notifications
            </SettingsListItem>

            <LogoutButton navigation={navigation} />
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#262525',
        padding: 20,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 20,
    },
    text: {
        color: 'white',
    },
});

export default SettingsScreen;
