import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PortfolioScreen from '../screens/home/PortfolioScreen';
import AmountInputScreen from "../screens/shared/AmountInputScreen";
import SuccessScreen from "../screens/shared/SuccessScreen";
import TransactionHistoryScreen from "../screens/wallet/TransactionHistoryScreen";
import ManageRulesScreen from "../screens/home/ManageRulesScreen";

const Stack = createNativeStackNavigator();

const PortfolioStack = ({ route }) => {
    const { portfolio, chartData, labels, firstLabelFormatted, lastLabelFormatted, yAxisTitle } = route.params || {};

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Portfolio"
                component={PortfolioScreen}
                initialParams={{
                    portfolio: portfolio || {},
                    chartData: chartData || [],
                    labels: labels || [],
                    firstLabelFormatted: firstLabelFormatted || '',
                    lastLabelFormatted: lastLabelFormatted || '',
                    yAxisTitle: yAxisTitle || '' }}
                options={{ headerTitle: `${portfolio?.portfolioType || ''} Portfolio` }}
            />
            <Stack.Screen
                name={'ManageRules'}
                component={ManageRulesScreen}
                options={{ headerTitle: 'Portfolio Rules' }}
            />
            <Stack.Screen
                name="AmountInput"
                component={AmountInputScreen}
                options={{ headerTitle: 'Input Amount' }}
            />
            <Stack.Screen
                name="Success"
                component={SuccessScreen}
                options={{ headerTitle: 'Success' }}
            />
            <Stack.Screen
                name="TransactionHistory"
                component={TransactionHistoryScreen}
                options={{ headerTitle: 'Portfolio History' }}
            />
        </Stack.Navigator>
    );
};

export default PortfolioStack;
