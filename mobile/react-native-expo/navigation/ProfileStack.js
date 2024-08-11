import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/settings/ProfileScreen';
import ChangePasswordScreen from '../screens/settings/profile/ChangePasswordScreen';
import AddressScreen from '../screens/settings/profile/AddressScreen';
import FinancialProfileScreen from '../screens/settings/profile/FinancialProfileScreen';
import InvestorProfileScreen from '../screens/settings/profile/InvestorProfileScreen';
import EmailScreen from '../screens/settings/profile/EmailScreen';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
    return (
        <Stack.Navigator initialRouteName="Profile">
            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ headerTitle: 'Profile' }}
            />
            <Stack.Screen
                name="ChangePassword"
                component={ChangePasswordScreen}
                options={{ headerTitle: 'Change Password' }}
            />
            <Stack.Screen
                name="Email"
                component={EmailScreen}
                options={{ headerTitle: 'Update Email' }}
            />
            <Stack.Screen
                name="Address"
                component={AddressScreen}
                options={{ headerTitle: 'Update Address' }}
            />
            <Stack.Screen
                name="FinancialProfile"
                component={FinancialProfileScreen}
                options={{ headerTitle: 'Update Financial Profile' }}
            />
            <Stack.Screen
                name="InvestorProfile"
                component={InvestorProfileScreen}
                options={{ headerTitle: 'Update Investor Profile' }}
            />
        </Stack.Navigator>
    );
};

export default ProfileStack;
