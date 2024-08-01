import React, { useEffect, useState, useContext } from 'react';
import InvestorProfileService from "../../services/InvestorProfileService";
import FormInput from "../../components/common/inputs/FormInput_Register5";
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            const fetchProfile = async () => {
                try {
                    const response = await InvestorProfileService.getInvestorProfile();
                    console.log('Fetched profile data:', response.data); // 添加调试信息
                    setProfile(response.data.data); // 确保访问到正确的数据结构
                    setLoading(false);
                } catch (error) {
                    setMessage('Error fetching investor profile');
                    setLoading(false);
                }
            };

            fetchProfile();
        }
    }, [isAuthenticated, navigate]);

    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            const response = await InvestorProfileService.updateInvestorProfile(profile);
            setMessage('Profile updated successfully');
            console.log('Updated profile data:', response.data); // 添加调试信息
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

    if (!profile) {
        return <p>{message}</p>;
    }

    return (
        <div>
            <h2>Investor Profile</h2>
            <form onSubmit={handleUpdate}>
                <FormInput
                    label="Investment Duration Score"
                    value={profile.investmentDurationScore}
                    onChange={(value) => handleChange('investmentDurationScore', value)}
                    min="1"
                    max="4"
                    required
                />
                <FormInput
                    label="Withdrawal Spending Plan Score"
                    value={profile.withdrawalSpendingPlanScore}
                    onChange={(value) => handleChange('withdrawalSpendingPlanScore', value)}
                    min="1"
                    max="4"
                    required
                />
                <FormInput
                    label="Investment Knowledge Score"
                    value={profile.investmentKnowledgeScore}
                    onChange={(value) => handleChange('investmentKnowledgeScore', value)}
                    min="1"
                    max="4"
                    required
                />
                <FormInput
                    label="Risk Reward Score"
                    value={profile.riskRewardScore}
                    onChange={(value) => handleChange('riskRewardScore', value)}
                    min="1"
                    max="3"
                    required
                />
                <FormInput
                    label="Owned Investments Score"
                    value={profile.ownedInvestmentsScore}
                    onChange={(value) => handleChange('ownedInvestmentsScore', value)}
                    min="1"
                    max="3"
                    required
                />
                <FormInput
                    label="Investment Personality Score"
                    value={profile.investmentPersonalityScore}
                    onChange={(value) => handleChange('investmentPersonalityScore', value)}
                    min="1"
                    max="4"
                    required
                />
                <button type="submit">Update</button>
                {message && <p>{message}</p>}
            </form>
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