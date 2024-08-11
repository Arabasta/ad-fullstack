import React from 'react';
import { View } from 'react-native';
import {employmentStatusOptions, incomeOptions, netWorthOptions, sourceOfWealthOptions,
    investmentObjectiveOptions, experienceOptions} from '../../constants/FinancialProfileOptions';
import DropdownInput from "../common/input/DropdownInput";

const FinancialProfileForm = ({ profile, onChange }) => {
    const handleInputChange = (name, value) => {
        onChange((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    return (
        <View>
            <DropdownInput
                label="Employment Status"
                value={profile.employmentStatus}
                setValue={(value) => handleInputChange('employmentStatus', value)}
                list={employmentStatusOptions}
            />
            <DropdownInput
                label="Annual Income"
                value={profile.annualIncome}
                setValue={(value) => handleInputChange('annualIncome', value)}
                list={incomeOptions}
            />
            <DropdownInput
                label="Net Worth"
                value={profile.netWorth}
                setValue={(value) => handleInputChange('netWorth', value)}
                list={netWorthOptions}
            />
            <DropdownInput
                label="Source of Wealth"
                value={profile.sourceOfWealth}
                setValue={(value) => handleInputChange('sourceOfWealth', value)}
                list={sourceOfWealthOptions}
            />
            <DropdownInput
                label="Investment Objective"
                value={profile.investmentObjective}
                setValue={(value) => handleInputChange('investmentObjective', value)}
                list={investmentObjectiveOptions}
            />
            <DropdownInput
                label="Investment Experience"
                value={profile.investmentExperience}
                setValue={(value) => handleInputChange('investmentExperience', value)}
                list={experienceOptions}
            />
        </View>
    );
};

export default FinancialProfileForm;
