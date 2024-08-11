import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsScreen from '../screens/settings/SettingsScreen';
import ProfileStack from './ProfileStack';
import BankDetailsScreen from '../screens/settings/BankDetailsScreen';
import NotificationsScreen from '../screens/settings/NotificationsScreen';
import LoginScreen from "../screens/auth/LoginScreen";

const Stack = createNativeStackNavigator();

const SettingsStack = () => {
    return (
        <Stack.Navigator initialRouteName="Settings">
            <Stack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{ headerTitle: 'Settings' }}
            />
            <Stack.Screen
                name="ProfileStack"
                component={ProfileStack}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="BankDetails"
                component={BankDetailsScreen}
                options={{ headerTitle: 'Bank Details' }}
            />
            <Stack.Screen
                name="Notifications"
                component={NotificationsScreen}
                options={{ headerTitle: 'Notifications' }}
            />
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

export default SettingsStack;
