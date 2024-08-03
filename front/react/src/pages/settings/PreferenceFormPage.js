import React, { useEffect, useState, useContext } from 'react';
import InvestorProfileService from "../../services/InvestorProfileService";
import InvestorProfileForm from "../../components/form/profileforms/InvestorProfileForm";
import { AuthContext } from '../../context/AuthContext';

const PreferenceFormPage = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const [profile, setProfile] = useState({
        investmentDurationScore: 1,
        withdrawalSpendingPlanScore: 1,
        investmentKnowledgeScore: 1,
        riskRewardScore: 1,
        ownedInvestmentsScore: 1,
        investmentPersonalityScore: 1,
    });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [recommendedPortfolioType, setRecommendedPortfolioType] = useState('');

    const optionsForQuestion1 = [
        { label: "Less than 3 years", value: 1 },
        { label: "3-5 years", value: 2 },
        { label: "6-10 years", value: 3 },
        { label: "11 years or more", value: 4 }
    ];
    const optionsForQuestion2 = [
        { label: "Less than 2 years", value: 1 },
        { label: "2-5 years", value: 2 },
        { label: "6-10 years", value: 3 },
        { label: "11 years or more", value: 4 }
    ];
    const optionsForQuestion3 = [
        { label: "None", value: 1 },
        { label: "Limited", value: 2 },
        { label: "Good", value: 3 },
        { label: "Extensive", value: 4 }
    ];
    const optionsForQuestion4 = [
        { label: "Take lower than average risks expecting to earn lower than average returns", value: 1 },
        { label: "Take average risks expecting to earn average returns", value: 2 },
        { label: "Take above average risks expecting to earn above average returns", value: 3 }
    ];
    const optionsForQuestion5 = [
        { label: "Bonds and/or bonds funds", value: 1 },
        { label: "Stocks and/or stocks funds", value: 2 },
        { label: "International securities and/or international funds", value: 3 }
    ];
    const optionsForQuestion6 = [
        { label: "Sell all my shares", value: 1 },
        { label: "Sell some of my shares", value: 2 },
        { label: "Do nothing", value: 3 },
        { label: "Buy more shares", value: 4 }
    ];

    useEffect(() => {
        if (!isAuthenticated) {
            setLoading(false); // 如果没有登录，停止加载并显示消息
        } else {
            const fetchProfile = async () => {
                try {
                    const response = await InvestorProfileService.getInvestorProfile();
                    setProfile(response.data.data); // 确保访问到正确的数据结构
                    setRecommendedPortfolioType(response.data.data.recommendedPortfolioType); // 设置之前的推荐投资组合
                    setLoading(false);
                } catch (error) {
                    setMessage('Error fetching investor profile');
                    setLoading(false);
                }
            };

            fetchProfile();
        }
    }, [isAuthenticated]);

    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            const response = await InvestorProfileService.updateInvestorProfile(profile);
            console.log("Updated profile:", profile);
            setMessage('Profile updated successfully');
            setProfile(response.data.data); // 确保访问到正确的数据结构
            setRecommendedPortfolioType(response.data.data.recommendedPortfolioType);
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage('Error updating profile');
        }
    };

    const handleChange = (field, value) => {
        setProfile({
            ...profile,
            [field]: value
        });
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!isAuthenticated) {
        return <p>Please log in to view this page.</p>;
    }

    return (
        <div>
            <h2>Investor Profile</h2>
            <InvestorProfileForm
                investmentDurationScore={profile.investmentDurationScore}
                setInvestmentDurationScore={(value) => handleChange('investmentDurationScore', value)}
                withdrawalSpendingPlanScore={profile.withdrawalSpendingPlanScore}
                setWithdrawalSpendingPlanScore={(value) => handleChange('withdrawalSpendingPlanScore', value)}
                investmentKnowledgeScore={profile.investmentKnowledgeScore}
                setInvestmentKnowledgeScore={(value) => handleChange('investmentKnowledgeScore', value)}
                riskRewardScore={profile.riskRewardScore}
                setRiskRewardScore={(value) => handleChange('riskRewardScore', value)}
                ownedInvestmentsScore={profile.ownedInvestmentsScore}
                setOwnedInvestmentsScore={(value) => handleChange('ownedInvestmentsScore', value)}
                investmentPersonalityScore={profile.investmentPersonalityScore}
                setInvestmentPersonalityScore={(value) => handleChange('investmentPersonalityScore', value)}
                handleSubmit={handleUpdate}
                buttonText="Update"
                message={message}
                optionsForQuestion1={optionsForQuestion1}
                optionsForQuestion2={optionsForQuestion2}
                optionsForQuestion3={optionsForQuestion3}
                optionsForQuestion4={optionsForQuestion4}
                optionsForQuestion5={optionsForQuestion5}
                optionsForQuestion6={optionsForQuestion6}
            />
            {recommendedPortfolioType && (
                <div>
                    <h3>Recommended Portfolio Type</h3>
                    <p>{recommendedPortfolioType}</p>
                </div>
            )}
        </div>
    );
};

export default PreferenceFormPage;
