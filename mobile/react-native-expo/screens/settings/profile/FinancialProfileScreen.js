import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Container from "../../../components/common/container/Container";
import ButtonPrimary from '../../../components/common/button/ButtonPrimary';
import ButtonCancel from '../../../components/common/button/ButtonCancel';
import SmallDisplayCard from "../../../components/common/card/SmallDisplayCard";
import ErrorText from "../../../components/common/text/ErrorText";
import SuccessText from "../../../components/common/text/SuccessText";
import useFinancialProfile from "../../../hooks/useFinancialProfile";
import FinancialProfileService from "../../../services/FinancialProfileService";
import {employmentStatusOptions, experienceOptions, incomeOptions, investmentObjectiveOptions,
    netWorthOptions, sourceOfWealthOptions} from "../../../constants/FinancialProfileOptions";
import FinancialProfileForm from "../../../components/forms/FinancialProfileForm";
import {getLabelFromValue} from "../../../utils/getLabelFromValue";
import {validateFinancialProfile} from "../../../utils/validation/validateFinancialProfile";
import Text from "../../../components/common/text/Text";

const FinancialProfileScreen = () => {
    const { financialProfile, getFinancialProfile } = useFinancialProfile();
    const [localProfile, setLocalProfile] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (financialProfile) {
            setLocalProfile(financialProfile);
        }
    }, [financialProfile]);

    const handleSave = async () => {
        setSuccess('');
        setError('');

        const { valid, errorMessage } = validateFinancialProfile(localProfile);

        if (!valid) {
            setError(errorMessage);
            return;
        }

        const updatedProfile = {
            ...localProfile,
            annualIncome: parseFloat(localProfile.annualIncome),
            netWorth: parseFloat(localProfile.netWorth),
        };

        try {
            const response = await FinancialProfileService.updateFinancialProfile(updatedProfile);
            setSuccess('Financial profile updated successfully.');
            setIsEditing(false);
            await getFinancialProfile();
        } catch (error) {
            console.error("Error saving financial profile:", error);
            setError("Failed to save financial profile. Please try again.");
            setSuccess('');
        }
    };

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    return (
        <Container>
            {!isEditing ? (
                localProfile ? (
                    <>
                        <SmallDisplayCard
                            label="Employment Status"
                            value={getLabelFromValue(employmentStatusOptions, localProfile.employmentStatus)}
                        />
                        <SmallDisplayCard
                            label="Annual Income"
                            value={getLabelFromValue(incomeOptions, localProfile.annualIncome)}
                        />
                        <SmallDisplayCard
                            label="Net Worth"
                            value={getLabelFromValue(netWorthOptions, localProfile.netWorth)}
                        />
                        <SmallDisplayCard
                            label="Source of Wealth"
                            value={getLabelFromValue(sourceOfWealthOptions, localProfile.sourceOfWealth)}
                        />
                        <SmallDisplayCard
                            label="Investment Objective"
                            value={getLabelFromValue(investmentObjectiveOptions, localProfile.investmentObjective)}
                        />
                        <SmallDisplayCard
                            label="Investment Experience"
                            value={getLabelFromValue(experienceOptions, localProfile.investmentExperience)}
                        />

                        {success && (<SuccessText>{success}</SuccessText>)}

                        <ButtonPrimary style={styles.buttonSpacing} title="Edit" onPress={toggleEdit} />
                    </>
                ) : ( <Text>Loading...</Text> )
            ) : (
                <>
                    <FinancialProfileForm profile={localProfile} onChange={setLocalProfile} />

                    {error && (<ErrorText>{error}</ErrorText>)}

                    <View style={styles.buttonContainer}>
                        <ButtonCancel style={styles.buttonSpacing} title="Cancel" onPress={toggleEdit} />
                        <ButtonPrimary style={styles.buttonSpacing} title="Save" onPress={handleSave} />
                    </View>
                </>
            )}
        </Container>
    );
};

const styles = StyleSheet.create({
    buttonSpacing: {
        marginTop: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default FinancialProfileScreen;
