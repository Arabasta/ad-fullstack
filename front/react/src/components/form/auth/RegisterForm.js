import React, { useState } from 'react';
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Box, Progress, useToast } from '@chakra-ui/react';
import RegisterStep1 from './RegisterStep1';
import RegisterStep2 from './RegisterStep2';
import RegisterStep3 from './RegisterStep3';
import RegisterStep4 from './RegisterStep4';
import RegisterStep5 from "./RegisterStep5";

const RegisterForm = () => {
    const [step, setStep] = useState(1);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
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
    const [message, setMessage] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();
    const toast = useToast();

    const handleNext = (e) => {
        e.preventDefault();
        setStep(step + 1);
    };

    const handlePrevious = (e) => {
        e.preventDefault();
        setStep(step - 1);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await register({
                userDetails: { username, password, email },
                customerDetails: {
                    mobileNumber, firstName, lastName, nationality,
                    address: { street, city, postalCode, country, unitNo },
                    financialProfile: { employmentStatus, annualIncome, netWorth,
                        sourceOfWealth, investmentObjective, investmentExperience },
                    investorProfile: { investmentDurationScore, withdrawalSpendingPlanScore,
                        investmentKnowledgeScore, riskRewardScore, ownedInvestmentsScore,
                        investmentPersonalityScore }
                }
            });
            toast({
                title: 'Account created.',
                description: "We've created your account for you.",
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            navigate('/recommended-portfolio-type');
        } catch (error) {
            setMessage('An error occurred, please try again.');
        }
    };

    return (
        <Box
            borderWidth="1px"
            rounded="lg"
            shadow="1px 1px 3px rgba(0,0,0,0.3)"
            maxWidth={800}
            p={6}
            m="10px auto"
            as="form">
            <Progress hasStripe value={step * 20} mb="5%" mx="5%" isAnimated></Progress>
            {step === 1 && (
                <RegisterStep1
                    email={email}
                    setEmail={setEmail}
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword}
                    handleNext={handleNext}
                />
            )}
            {step === 2 && (
                <RegisterStep2
                    mobileNumber={mobileNumber}
                    setMobileNumber={setMobileNumber}
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
                <RegisterStep3
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
                <RegisterStep4
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
                <RegisterStep5
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
        </Box>
    );
};

export default RegisterForm;
