import React from 'react';
import { TextInput as PaperTextInput } from 'react-native-paper';

/**
 * Usage
 * <TextInput label="Username" value={username} onChangeText={setUsername} />
 *
 * Can also override default outline color see docs
 */
const TextInput = ({ label, value, onChangeText, style, ...props }) => {
    return (
        <PaperTextInput
            label={label}
            value={value}
            onChangeText={onChangeText}
            style={style} // dont really need this
            mode="outlined"
            {...props}
        />
    );
};

export default TextInput;
