import React from 'react';
import { View } from 'react-native';
import TextInputWithHelper from '../common/input/TextInputWithHelper';
import { countryOptions } from "../../constants/CountryOptions";
import DropdownInput from "../common/input/DropdownInput";

const AddressForm = ({ addressValues, handleInputChange, error }) => {
    return (
        <View>
            <TextInputWithHelper
                label="Street"
                value={addressValues.street}
                onChangeText={(value) => handleInputChange('street', value)}
                error={error.street}
            />
            <TextInputWithHelper
                label="City"
                value={addressValues.city}
                onChangeText={(value) => handleInputChange('city', value)}
                error={error.city}
            />
            <TextInputWithHelper
                label="Postal Code"
                value={addressValues.postalCode}
                onChangeText={(value) => handleInputChange('postalCode', value)}
                keyboardType="numeric"
                error={error.postalCode}
            />

            <DropdownInput
                label="Country"
                value={addressValues.country}
                setValue={(value) => handleInputChange('country', value)}
                list={countryOptions}
                error={error.country}
            />

            <TextInputWithHelper
                label="Unit No"
                value={addressValues.unitNo}
                onChangeText={(value) => handleInputChange('unitNo', value)}
                error={error.unitNo}
            />
        </View>
    );
};

export default AddressForm;
