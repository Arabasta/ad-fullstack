import { useState, useEffect } from 'react';
import BankDetailsService from '../services/BankDetailsService';

const useBankDetails = () => {
    const [bankDetails, setBankDetails] = useState(null);

    const getBankDetails = async () => {
        try {
            const response = await BankDetailsService.getBankDetails();
            setBankDetails(response.data.data);
        } catch (error) {
            console.error('Error fetching bank details', error);
        }
    };

    const updateBankDetails = async (updateBankDetailsDTO) => {
        try {
            const response = await BankDetailsService.updateBankDetails(updateBankDetailsDTO);
            setBankDetails(response.data.data);
        } catch (error) {
            console.error('Error updating bank details', error);
        }
    };

    useEffect(() => {
        getBankDetails();
    }, []);

    return { bankDetails, getBankDetails, updateBankDetails };
};

export default useBankDetails;