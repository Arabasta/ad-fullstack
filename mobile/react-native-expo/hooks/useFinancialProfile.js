import { useState, useEffect } from 'react';
import UpdateFinancialProfileService from '../services/UpdateFinancialProfileService';

const useFinancialProfile = () => {
    const [financialProfile, setFinancialProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getFinancialProfile = async () => {
        try {
            const response = await UpdateFinancialProfileService.getFinancialProfile();
            setFinancialProfile(response);
            setError(null);
        } catch (error) {
            console.error('Error fetching financial profile data', error);
            setError('Error fetching financial profile data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
            getFinancialProfile();
        },
        []);

    return { financialProfile, loading, error, getFinancialProfile };
};

export default useFinancialProfile;