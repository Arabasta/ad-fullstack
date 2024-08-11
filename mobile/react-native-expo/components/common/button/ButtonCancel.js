import React from 'react';
import { Button } from 'react-native-paper';

const ButtonCancel = ({ title, onPress, style, ...props }) => {
    return (
        <Button
            mode="contained"
            onPress={onPress}
            style={[{ backgroundColor: '#d9534f' }, style]}
            {...props}
        >
            {title}
        </Button>
    );
};

export default ButtonCancel;
