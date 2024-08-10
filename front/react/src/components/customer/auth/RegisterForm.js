import React, { useState } from 'react';
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import RegisterStep1New from "./RegisterStep1New";
import RegisterStep2New from "./RegisterStep2New";
import RegisterStep3New from "./RegisterStep3New";
import RegisterStep4New from "./RegisterStep4New";
import RegisterStep5New from "./RegisterStep5New";

const RegisterForm = () => {
    const [step, setStep] = useState(1);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [countryCode, setCountryCode] = useState('+65');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [nationality, setNationality] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [unitNo, setUnitNo] = useState('');
    const [employmentStatus, setEmploymentStatus] = useState('');
    const [annualIncome, setAnnualIncome] = useState(0);
    const [netWorth, setNetWorth] = useState(0);
    const [sourceOfWealth, setSourceOfWealth] = useState('');
    const [investmentObjective, setInvestmentObjective] = useState('');
    const [investmentExperience, setInvestmentExperience] = useState('');
    const [investmentDurationScore, setInvestmentDurationScore] = useState(1);
    const [withdrawalSpendingPlanScore, setWithdrawalSpendingPlanScore] = useState(1);
    const [investmentKnowledgeScore, setInvestmentKnowledgeScore] = useState(1);
    const [riskRewardScore, setRiskRewardScore] = useState(1);
    const [ownedInvestmentsScore, setOwnedInvestmentsScore] = useState(1);
    const [investmentPersonalityScore, setInvestmentPersonalityScore] = useState(1);
    const [message] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();
    const toast = useToast();

    const toastOptions = {
        title: "Missing Information",
        description: "Please fill in all required fields.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
    };

    const validateStep = () => {
        switch (step) {
            case 1:
                return email && username && password;
            case 2:
                return mobileNumber && firstName && lastName && nationality;
            case 3:
                return street && city && postalCode && country;
            case 4:
                return employmentStatus && annualIncome && netWorth && sourceOfWealth &&
                    investmentObjective && investmentExperience;
            case 5:
                return investmentDurationScore && withdrawalSpendingPlanScore &&
                    investmentKnowledgeScore && riskRewardScore && ownedInvestmentsScore &&
                    investmentPersonalityScore;
            default:
                return false;
        }
    };

    const handleNext = (e) => {
        e.preventDefault();
        if (!validateStep()) {
            toast(toastOptions);
            return;
        }

        setStep(step + 1);
    };

    const handlePrevious = (e) => {
        e.preventDefault();
        setStep(step - 1);
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!validateStep()) {
            toast(toastOptions);
            return;
        }

        try {
            await register({
                userDetails: { username, password, email },
                customerDetails: {
                    mobileNumber: `${countryCode}${mobileNumber}`, // 将国家代码与手机号组合
                    firstName, lastName, nationality,
                    address: { street, city, postalCode, country, unitNo },
                    financialProfile: { employmentStatus, annualIncome, netWorth,
                        sourceOfWealth, investmentObjective, investmentExperience },
                    investorProfile: { investmentDurationScore, withdrawalSpendingPlanScore,
                        investmentKnowledgeScore, riskRewardScore, ownedInvestmentsScore,
                        investmentPersonalityScore }
                }
            });
            toast({
                title: "Registration successful",
                description: "You have been successfully registered.",
                status: "success",
                duration: 2000,
                isClosable: true,
                position: "top",
            });
            navigate('/');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                const errorMessage = error.response.data.message;
                const errorDetails = error.response.data.details;
                if (errorDetails && errorDetails.includes("Duplicate entry") && errorDetails.includes("for key 'user.UK_sb8bbouer5wak8vyiiy4pf2bx'")) {
                    toast({
                        title: "Username already exists",
                        description: "The username is already taken. Please choose a different username.",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                        position: "top",
                    });
                } else {
                    toast({
                        title: "Registration failed",
                        description: errorMessage,
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                        position: "top",
                    });
                }
            } else {
                console.error('Error during registration', error);
                toast({
                    title: "An unexpected error occurred",
                    description: "Please try again.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top",  // Toast appears from the top
                });
            }
        }
    };


    return (
        <div>
            {step === 1 && (
                <RegisterStep1New
                    email={email}
                    setEmail={setEmail}
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword}
                    method={handleNext}
                />
            )}

            {step === 2 && (
                <RegisterStep2New
                    mobileNumber={mobileNumber}
                    setMobileNumber={setMobileNumber}
                    countryCode={countryCode}
                    setCountryCode={setCountryCode}
                    firstName={firstName}
                    setFirstName={setFirstName}
                    lastName={lastName}
                    setLastName={setLastName}
                    nationality={nationality}
                    setNationality={setNationality}
                    handlePrevious={handlePrevious}
                    handleNext={handleNext}
                />
            )}

            {step === 3 && (
                <RegisterStep3New
                    street={street}
                    setStreet={setStreet}
                    city={city}
                    setCity={setCity}
                    postalCode={postalCode}
                    setPostalCode={setPostalCode}
                    country={country}
                    setCountry={setCountry}
                    unitNo={unitNo}
                    setUnitNo={setUnitNo}
                    handlePrevious={handlePrevious}
                    handleNext={handleNext}
                />
            )}

            {step === 4 && (
                <RegisterStep4New
                    employmentStatus={employmentStatus}
                    setEmploymentStatus={setEmploymentStatus}
                    annualIncome={annualIncome}
                    setAnnualIncome={setAnnualIncome}
                    netWorth={netWorth}
                    setNetWorth={setNetWorth}
                    sourceOfWealth={sourceOfWealth}
                    setSourceOfWealth={setSourceOfWealth}
                    investmentObjective={investmentObjective}
                    setInvestmentObjective={setInvestmentObjective}
                    investmentExperience={investmentExperience}
                    setInvestmentExperience={setInvestmentExperience}
                    handlePrevious={handlePrevious}
                    handleNext={handleNext}
                />
            )}

            {step === 5 && (
                <RegisterStep5New
                    investmentDurationScore={investmentDurationScore}
                    setInvestmentDurationScore={setInvestmentDurationScore}
                    withdrawalSpendingPlanScore={withdrawalSpendingPlanScore}
                    setWithdrawalSpendingPlanScore={setWithdrawalSpendingPlanScore}
                    investmentKnowledgeScore={investmentKnowledgeScore}
                    setInvestmentKnowledgeScore={setInvestmentKnowledgeScore}
                    riskRewardScore={riskRewardScore}
                    setRiskRewardScore={setRiskRewardScore}
                    ownedInvestmentsScore={ownedInvestmentsScore}
                    setOwnedInvestmentsScore={setOwnedInvestmentsScore}
                    investmentPersonalityScore={investmentPersonalityScore}
                    setInvestmentPersonalityScore={setInvestmentPersonalityScore}
                    handlePrevious={handlePrevious}
                    handleRegister={handleRegister}
                    message={message}
                />
            )}
        </div>
    );
};

export default RegisterForm;
