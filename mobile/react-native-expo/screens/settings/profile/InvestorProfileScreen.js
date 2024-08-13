import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Container from "../../../components/common/container/Container";
import ButtonPrimary from '../../../components/common/button/ButtonPrimary';
import ButtonCancel from '../../../components/common/button/ButtonCancel';
import SmallDisplayCard from "../../../components/common/card/SmallDisplayCard";
import ErrorText from "../../../components/common/text/ErrorText";
import SuccessText from "../../../components/common/text/SuccessText";
import useInvestorProfile from "../../../hooks/useInvestorProfile";
import InvestorProfileService from "../../../services/InvestorProfileService";
import InvestorProfileForm from "../../../components/forms/InvestorProfileForm";
import { investmentDurationOptions, withdrawalSpendingPlanOptions, investmentKnowledgeOptions, riskRewardOptions,
    ownedInvestmentsOptions, investmentPersonalityOptions } from "../../../constants/InvestorProfileOptions";
import { getLabelFromValue } from "../../../utils/getLabelFromValue";
import { validateInvestorProfile } from "../../../utils/validation/validateInvestorProfile";
import Text from "../../../components/common/text/Text";

const InvestorProfileScreen = () => {
    const { investorProfile, recommendedPortfolioType, getInvestorProfile } = useInvestorProfile();
    const [localProfile, setLocalProfile] = useState({});
    const [error, setError] = useState({});
    const [success, setSuccess] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (investorProfile) {
            setLocalProfile(investorProfile);
        }
    }, [investorProfile]);

    const handleSave = async () => {
        setSuccess('');
        setError({});

        const { valid, validationErrors } = validateInvestorProfile(localProfile);
        if (!valid) {
            setError(validationErrors);
            return;
        }

        try {
            await InvestorProfileService.updateInvestorProfile(localProfile);
            setSuccess('Investor profile updated successfully.');
            setIsEditing(false);
            await getInvestorProfile();
        } catch (error) {
            console.error("Error saving investor profile:", error);
            setError({ save: "Failed to save investor profile. Please try again." });
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
                            label="Investment Duration"
                            value={getLabelFromValue(investmentDurationOptions, localProfile.investmentDurationScore)}
                        />
                        <SmallDisplayCard
                            label="Withdrawal Spending Plan"
                            value={getLabelFromValue(withdrawalSpendingPlanOptions, localProfile.withdrawalSpendingPlanScore)}
                        />
                        <SmallDisplayCard
                            label="Investment Knowledge"
                            value={getLabelFromValue(investmentKnowledgeOptions, localProfile.investmentKnowledgeScore)}
                        />
                        <SmallDisplayCard
                            label="Risk Reward"
                            value={getLabelFromValue(riskRewardOptions, localProfile.riskRewardScore)}
                        />
                        <SmallDisplayCard
                            label="Owned Investments"
                            value={getLabelFromValue(ownedInvestmentsOptions, localProfile.ownedInvestmentsScore)}
                        />
                        <SmallDisplayCard
                            label="Investment Personality"
                            value={getLabelFromValue(investmentPersonalityOptions, localProfile.investmentPersonalityScore)}
                        />
                        {success && (<SuccessText>{success}</SuccessText>)}

                        {recommendedPortfolioType && (
                            <>
                                <Text style={styles.portfolioLabel}>Recommended Portfolio Type:</Text>
                                <Text>{recommendedPortfolioType}</Text>
                            </>
                        )}
                        <ButtonPrimary style={styles.buttonSpacing} title="Edit" onPress={toggleEdit} />
                    </>
                ) : ( <Text>Loading...</Text> )
            ) : (
                <>
                    <InvestorProfileForm profile={localProfile} onChange={setLocalProfile} error={error} />

                    {Object.keys(error).length > 0 && (
                        <ErrorText style={styles.errorTextSpacing}>
                            {error.save || "Please fill in all required fields."}
                        </ErrorText>
                    )}
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
    errorTextSpacing: {
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    portfolioLabel: {
        marginTop: 20,
        fontWeight: 'bold',
    },
});

export default InvestorProfileScreen;
