import React from 'react';
import { Button } from 'react-native-paper';

const ButtonSecondary = ({ title, onPress, style, ...props }) => {
    return (
        <Button
            mode="contained"
            onPress={onPress}
            style={[{ backgroundColor: '#333' }, style]}
            {...props}
        >
            {title}
        </Button>
    );
};

export default ButtonSecondary;
