import React, { useEffect, useState, useContext } from 'react';
import InvestorProfileService from "../../services/InvestorProfileService";
import InvestorProfileForm from "../../components/form/InvestorProfileForm";
import { AuthContext } from '../../context/AuthContext';

const InvestorProfilePage = () => {
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
            setMessage('Profile updated successfully');
            setProfile(response.data.data); // 确保访问到正确的数据结构
            setRecommendedPortfolioType(response.data.data.recommendedPortfolioType);
        } catch (error) {
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

export default InvestorProfilePage;
