import { useState, useEffect } from 'react';
import FinancialProfileService from '../services/FinancialProfileService';

const useFinancialProfile = () => {
    const [financialProfile, setFinancialProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getFinancialProfile = async () => {
        try {
            const response = await FinancialProfileService.getFinancialProfile();
            setFinancialProfile(response.data.data);
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