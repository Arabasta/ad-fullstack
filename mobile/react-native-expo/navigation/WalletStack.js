import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WalletScreen from '../screens/wallet/WalletScreen';
import AmountInputScreen from "../screens/shared/AmountInputScreen";
import ConfirmBankDetailsScreen from "../screens/wallet/ConfirmBankDetailsScreen";
import SuccessScreen from "../screens/shared/SuccessScreen";
import TransactionHistoryScreen from "../screens/wallet/TransactionHistoryScreen";

const Stack = createNativeStackNavigator();

const WalletStack = () => {
    return (
        <Stack.Navigator initialRouteName="Wallet">
            <Stack.Screen
                name="Wallet"
                component={WalletScreen}
                options={{ headerTitle: 'Wallet' }}
            />
            <Stack.Screen
                name="AmountInput"
                component={AmountInputScreen}
                options={{ headerTitle: 'Amount' }}
            />
            <Stack.Screen
                name="BankDetails"
                component={ConfirmBankDetailsScreen}
                options={{ headerTitle: 'Bank Details' }}
            />
            <Stack.Screen
                name="Success"
                component={SuccessScreen}
                options={{ headerTitle: 'Success' }}
            />
            <Stack.Screen
                name="TransactionHistory"
                component={TransactionHistoryScreen}
                options={{ headerTitle: 'Wallet History' }}
            />
        </Stack.Navigator>
    );
};

export default WalletStack;
