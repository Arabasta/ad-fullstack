import React from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import useNotificationPreferences from "../../hooks/useNotificationPreferences";
import Text from "../../components/common/text/Text";
import Divider from "../../components/common/layout/Divider";

const NotificationsScreen = () => {
    const { notificationPreferences, updateNotificationPreference } = useNotificationPreferences();

    const handleToggle = (preference, value) => {
        updateNotificationPreference(preference, value);
    };

    return (
        <View style={styles.container}>
            <Text variant="titleLarge">Email Notifications</Text>
            <Divider />
            <View style={styles.setting}>
                <Text>Password Change</Text>
                <Switch
                    value={notificationPreferences.passwordChangeNotification}
                    onValueChange={(value) => handleToggle('password-change', value)}
                />
            </View>
            <View style={styles.setting}>
                <Text>Stop-Loss Trigger</Text>
                <Switch
                    value={notificationPreferences.stopLossNotification}
                    onValueChange={(value) => handleToggle('stop-loss', value)}
                />
            </View>
            <View style={styles.setting}>
                <Text>Recurring Deposit</Text>
                <Switch
                    value={notificationPreferences.recurringDepositNotification}
                    onValueChange={(value) => handleToggle('recurring-deposit', value)}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    setting: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
});

export default NotificationsScreen;
