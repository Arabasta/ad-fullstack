import { useState, useEffect } from 'react';
import FinancialProfileService from '../services/FinancialProfileService';

const useFinancialProfile = () => {
    const [financialProfile, setFinancialProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchFinancialProfile = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await FinancialProfileService.getFinancialProfile();
            setFinancialProfile(response.data.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const updateFinancialProfile = async (profileData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await FinancialProfileService.updateFinancialProfile(profileData);
            setFinancialProfile(response.data.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFinancialProfile();
    }, []);

    return { financialProfile, loading, error, fetchFinancialProfile, updateFinancialProfile };
};

export default useFinancialProfile;
