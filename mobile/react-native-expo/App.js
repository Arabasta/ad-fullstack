import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext, AuthProvider } from './config/context/AuthContext';
import AuthStack from "./navigation/AuthStack";
import MainTabs from "./navigation/MainTabs";
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs(true);

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <Stack.Navigator>
            {isAuthenticated ? (
                <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
            ) : (
                <Stack.Screen name="Auth" component={AuthStack} options={{ headerShown: false }} />
            )}
        </Stack.Navigator>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <NavigationContainer>
                <AppNavigator />
            </NavigationContainer>
        </AuthProvider>
    );
};


export default App;
