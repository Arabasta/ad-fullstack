import React from 'react';
import { StyleSheet, View } from 'react-native';
import DropdownInput from '../common/input/DropdownInput';
import {investmentDurationOptions, withdrawalSpendingPlanOptions, investmentKnowledgeOptions, riskRewardOptions,
    ownedInvestmentsOptions, investmentPersonalityOptions,} from '../../constants/InvestorProfileOptions';

const InvestorProfileForm = ({ profile, onChange }) => {
    const handleInputChange = (name, value) => {
        onChange((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    return (
        <View>
            <DropdownInput
                label="Investment Duration"
                value={profile.investmentDurationScore}
                setValue={(value) => handleInputChange('investmentDurationScore', value)}
                list={investmentDurationOptions}
            />
            <DropdownInput
                label="Withdrawal Spending Plan"
                value={profile.withdrawalSpendingPlanScore}
                setValue={(value) => handleInputChange('withdrawalSpendingPlanScore', value)}
                list={withdrawalSpendingPlanOptions}
            />
            <DropdownInput
                label="Investment Knowledge"
                value={profile.investmentKnowledgeScore}
                setValue={(value) => handleInputChange('investmentKnowledgeScore', value)}
                list={investmentKnowledgeOptions}
            />
            <DropdownInput
                label="Risk Reward"
                value={profile.riskRewardScore}
                setValue={(value) => handleInputChange('riskRewardScore', value)}
                list={riskRewardOptions}
            />
            <DropdownInput
                label="Owned Investments"
                value={profile.ownedInvestmentsScore}
                setValue={(value) => handleInputChange('ownedInvestmentsScore', value)}
                list={ownedInvestmentsOptions}
            />
            <DropdownInput
                label="Investment Personality"
                value={profile.investmentPersonalityScore}
                setValue={(value) => handleInputChange('investmentPersonalityScore', value)}
                list={investmentPersonalityOptions}
            />
        </View>
    );
};

const styles = StyleSheet.create({});

export default InvestorProfileForm;
