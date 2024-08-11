import { useState, useEffect } from 'react';
import InvestorProfileService from '../services/InvestorProfileService';

const useInvestorProfile = () => {
    const [investorProfile, setInvestorProfile] = useState(null);
    const [recommendedPortfolioType, setRecommendedPortfolioType] = useState('');
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');

    const getInvestorProfile = async () => {
        try {
            const response = await InvestorProfileService.getInvestorProfile();
            const data = response.data.data;
            setInvestorProfile(data);
            setRecommendedPortfolioType(data.recommendedPortfolioType);
            setError(null);
        } catch (error) {
            console.error('Error fetching investor profile', error);
            setError('Error fetching investor profile');
        }
    };

    const updateInvestorProfile = async (profile) => {
        try {
            const response = await InvestorProfileService.updateInvestorProfile(profile);
            const updatedData = response.data.data;
            setInvestorProfile(updatedData);
            setRecommendedPortfolioType(updatedData.recommendedPortfolioType);
            setMessage('Profile updated successfully');
            setError(null);
        } catch (error) {
            console.error('Error updating profile', error);
            setError('Error updating profile');
            setMessage('');
        }
    };

    useEffect(() => {
        getInvestorProfile();
    }, []);

    return {
        investorProfile,
        recommendedPortfolioType,
        error,
        message,
        getInvestorProfile,
        updateInvestorProfile,
    };
};

export default useInvestorProfile;
