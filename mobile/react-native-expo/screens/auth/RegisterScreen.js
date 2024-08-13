import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Container from "../../components/common/container/Container";
import ButtonPrimary from '../../components/common/button/ButtonPrimary';
import ButtonCancel from '../../components/common/button/ButtonCancel';
import FinancialProfileForm from '../../components/forms/FinancialProfileForm';
import InvestorProfileForm from '../../components/forms/InvestorProfileForm';
import TextInput from "../../components/common/input/TextInput";
import Text from "../../components/common/text/Text";
import {validateAddress} from "../../utils/validation/validateAddress";
import AddressForm from "../../components/forms/AddressForm";
import {validateFinancialProfile} from "../../utils/validation/validateFinancialProfile";
import ErrorText from "../../components/common/text/ErrorText";
import DropdownInput from "../../components/common/input/DropdownInput";
import {nationalityOptions} from "../../constants/NationalityOptions";
import {validateInvestorProfile} from "../../utils/validation/validateInvestorProfile";
import { useNavigation } from '@react-navigation/native';
import useAuth from "../../hooks/useAuth";

const RegisterScreen = () => {
    const [step, setStep] = useState(1);
    const navigation = useNavigation();
    useAuth();
    const { register } = useAuth();
    const [profile, setProfile] = useState({
        email: '',
        username: '',
        password: '',
        mobileNumber: '',
        countryCode: '+65',
        firstName: '',
        lastName: '',
        nationality: '',
        street: '',
        city: '',
        postalCode: '',
        country: '',
        unitNo: '',
        employmentStatus: 'EMPLOYED',
        annualIncome: 20000,
        netWorth: 50000,
        sourceOfWealth: 'SALARY',
        investmentObjective: 'GROWTH',
        investmentExperience: 'NONE',
        investmentDurationScore: 1,
        withdrawalSpendingPlanScore: 1,
        investmentKnowledgeScore: 1,
        riskRewardScore: 1,
        ownedInvestmentsScore: 1,
        investmentPersonalityScore: 1,
    });
    const [error, setError] = useState({});

    const handleInputChange = (name, value) => {
        setProfile(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleNext = () => {
        const validationErrors = validateStep();
        if (Object.keys(validationErrors).length === 0) {
            setStep(step + 1);
            setError({});
        } else {
            setError(validationErrors);
        }
    };

    const handlePrevious = () => {
        setStep(step - 1);
    };

    const handleRegister = async () => {
        const registrationData = {
            userDetails: {
                username: profile.username,
                password: profile.password,
                email: profile.email,
            },
            customerDetails: {
                mobileNumber: `${profile.countryCode}${profile.mobileNumber}`,
                firstName: profile.firstName,
                lastName: profile.lastName,
                nationality: profile.nationality,
                address: {
                    street: profile.street,
                    city: profile.city,
                    postalCode: profile.postalCode,
                    country: profile.country,
                    unitNo: profile.unitNo,
                },
                financialProfile: {
                    employmentStatus: profile.employmentStatus,
                    annualIncome: profile.annualIncome,
                    netWorth: profile.netWorth,
                    sourceOfWealth: profile.sourceOfWealth,
                    investmentObjective: profile.investmentObjective,
                    investmentExperience: profile.investmentExperience,
                },
                investorProfile: {
                    investmentDurationScore: profile.investmentDurationScore,
                    withdrawalSpendingPlanScore: profile.withdrawalSpendingPlanScore,
                    investmentKnowledgeScore: profile.investmentKnowledgeScore,
                    riskRewardScore: profile.riskRewardScore,
                    ownedInvestmentsScore: profile.ownedInvestmentsScore,
                    investmentPersonalityScore: profile.investmentPersonalityScore,
                }
            }
        };

        try {
            await register(registrationData);
            navigation.navigate('Main');
        } catch (error) {
            console.error("Registration failed", error.response ? error.response.data : error.message);
            setError({ general: "Registration failed. Please try again." });
        }
    };


    const validateStep = () => {
        switch (step) {
            case 1:
                const step1Errors = {};
                if (!profile.email) step1Errors.email = "Email is required";
                if (!profile.username) step1Errors.username = "Username is required";
                if (!profile.password) step1Errors.password = "Password is required";
                return step1Errors;
            case 2:
                const step2Errors = {};
                if (!profile.mobileNumber) step2Errors.mobileNumber = "Mobile Number is required";
                if (!profile.firstName) step2Errors.firstName = "First Name is required";
                if (!profile.lastName) step2Errors.lastName = "Last Name is required";
                if (!profile.nationality) step2Errors.nationality = "Nationality is required";
                return step2Errors;
            case 3:
                const { valid: isAddressValid, validationErrors: addressErrors } = validateAddress(profile);
                return isAddressValid ? {} : addressErrors;
            case 4:
                const { valid: isFinancialValid, validationErrors: financialErrors } = validateFinancialProfile(profile);
                return isFinancialValid ? {} : financialErrors;
            case 5:
                const { valid: isInvestorValid, validationErrors: investorErrors } = validateInvestorProfile(profile);
                return isInvestorValid ? {} : investorErrors;
            default:
                return {};
        }
    };

    return (
        <Container>
            <Text variant="headlineMedium" style={styles.text}>Register</Text>
            {step === 1 && (
                <View>
                    <TextInput
                        label="Email"
                        value={profile.email}
                        onChangeText={(value) => setProfile({ ...profile, email: value })}
                    />
                    <TextInput
                        label="Username"
                        value={profile.username}
                        onChangeText={(value) => setProfile({ ...profile, username: value })}
                    />
                    <TextInput
                        label="Password"
                        value={profile.password}
                        onChangeText={(value) => setProfile({ ...profile, password: value })}
                        secureTextEntry
                    />
                </View>
            )}

            {step === 2 && (
                <View>
                    <TextInput
                        label="Mobile Number"
                        value={profile.mobileNumber}
                        onChangeText={(value) => setProfile({ ...profile, mobileNumber: value })}
                    />
                    <TextInput
                        label="First Name"
                        value={profile.firstName}
                        onChangeText={(value) => setProfile({ ...profile, firstName: value })}
                    />
                    <TextInput
                        label="Last Name"
                        value={profile.lastName}
                        onChangeText={(value) => setProfile({ ...profile, lastName: value })}
                    />
                    <DropdownInput
                        value={profile.nationality}
                        setValue={(value) => handleInputChange('nationality', value)}
                        list={nationalityOptions}
                        placeholder="Nationality"
                        error={error.nationality}
                    />
                </View>
            )}

            {step === 3 && (
                <AddressForm
                    addressValues={profile}
                    handleInputChange={handleInputChange}
                    error={error}
                />
            )}

            {step === 4 && (
                <FinancialProfileForm profile={profile} onChange={handleInputChange} error={error} />
            )}

            {step === 5 && (
                <InvestorProfileForm profile={profile} onChange={handleInputChange} error={error}/>
            )}

            {Object.keys(error).length > 0 && (
                <ErrorText>Please fill in all required fields.</ErrorText>
            )}
            <View style={styles.buttonContainer}>
                {step > 1 && <ButtonCancel title="Back" onPress={handlePrevious} />}
                {step < 5 && <ButtonPrimary title="Next" onPress={handleNext} />}
                {step === 5 && <ButtonPrimary title="Register" onPress={handleRegister} />}
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    text: {
        marginBottom: 10,
        marginTop: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
});

export default RegisterScreen;
