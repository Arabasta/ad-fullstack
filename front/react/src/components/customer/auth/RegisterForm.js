import React, { useState } from 'react';
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
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
            navigate('/recommended-portfolio-type');
        } catch (error) {
            setMessage('An error occurred, please try again.');
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