import React, { useState } from 'react';
import DropDown from 'react-native-paper-dropdown';

/**
 * Usage
 * <Dropdown label="Country" value={country} setValue={setCountry} list={countries} />
 */
const DropdownInput = ({ label, value, setValue, list, ...props }) => {
    const [showDropDown, setShowDropDown] = useState(false);

    return (
        <DropDown
            label={label}
            value={value}
            setValue={setValue}
            list={list}
            visible={showDropDown}
            mode="outlined"
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
            {...props}
        />
    );
};

export default DropdownInput;
