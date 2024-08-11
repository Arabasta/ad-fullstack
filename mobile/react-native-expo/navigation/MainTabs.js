import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

import HomeStack from './HomeStack';
import NewsScreen from '../screens/news/NewsScreen';
import WalletStack from './WalletStack';
import SupportScreen from '../screens/support/SupportScreen';
import SettingsStack from './SettingsStack';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName="HomeStack"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    switch (route.name) {
                        case 'HomeStack':
                            iconName = 'home';
                            break;
                        case 'News':
                            iconName = 'newspaper';
                            break;
                        case 'WalletStack':
                            iconName = 'wallet';
                            break;
                        case 'Support':
                            iconName = 'account-question';
                            break;
                        case 'SettingsStack':
                            iconName = 'cog';
                            break;
                        default:
                            iconName = 'circle';
                    }

                    return <MaterialCommunityIcons name={iconName} color={color} size={size} />;
                },
                tabBarLabelStyle: { fontSize: 12 },
                tabBarStyle: { paddingBottom: 5, paddingTop: 5, height: 60 },
                tabBarActiveTintColor: '#000',
                tabBarInactiveTintColor: '#888',
            })}
        >
            <Tab.Screen name="HomeStack" component={HomeStack} options={{ tabBarLabel: 'Home', headerShown: false }} />
            <Tab.Screen name="News" component={NewsScreen} options={{ tabBarLabel: 'News' }} />
            <Tab.Screen name="WalletStack" component={WalletStack} options={{ tabBarLabel: 'Wallet', headerShown: false }} />
            <Tab.Screen name="Support" component={SupportScreen} options={{ tabBarLabel: 'Support' }} />
            <Tab.Screen name="SettingsStack" component={SettingsStack} options={{ tabBarLabel: 'Settings', headerShown: false }} />
        </Tab.Navigator>
    );
};

export default MainTabs;
