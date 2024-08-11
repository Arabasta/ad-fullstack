import React from 'react';
import { TouchableOpacity as CustomTouchableOpacity, StyleSheet } from 'react-native';

/**
 * TouchableOpacity - just a clickable view
 *
 * Usage:
 * <TouchableOpacity onPress={handlePress}>
 *   <Text>Your content here</Text>
 * </TouchableOpacity>
 */
const TouchableOpacity = ({ children, style, ...props }) => {
    return (
        <CustomTouchableOpacity style={style} {...props}>
            {children}
        </CustomTouchableOpacity>
    );
};

export default TouchableOpacity;
