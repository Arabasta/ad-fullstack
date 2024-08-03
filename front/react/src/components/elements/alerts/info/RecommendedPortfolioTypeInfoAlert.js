import React, { useEffect, useState } from 'react';
import { IoMdAlert } from "react-icons/io";
import InvestorProfileService from "../../../../services/InvestorProfileService";
import InfoAlert from "./InfoAlert";

const RecommendedPortfolioType = () => {
    const [recommendedPortfolioType, setRecommendedPortfolioType] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInvestorProfile = async () => {
            try {
                const response = await InvestorProfileService.getInvestorProfile();
                const profileData = response.data.data;
                setRecommendedPortfolioType(profileData.recommendedPortfolioType);
                setLoading(false);
            } catch (error) {
                setError('Error fetching investor profile');
                setLoading(false);
            }
        };
        fetchInvestorProfile();
    }, []);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div>Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <InfoAlert message={error} type="error">
                <IoMdAlert />
            </InfoAlert>
        );
    }

    return (
        <InfoAlert message={`Your recommended portfolio type is: ${recommendedPortfolioType}`} type="info">
            <IoMdAlert />
        </InfoAlert>
    );
};

export default RecommendedPortfolioType;
