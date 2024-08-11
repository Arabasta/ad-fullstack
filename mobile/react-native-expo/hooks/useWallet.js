import { useState, useEffect } from 'react';
import WalletService from '../services/WalletService';

const useWallet = () => {
    const [wallet, setWallet] = useState(null);

    const getWallet = async () => {
        try {
            const response = await WalletService.getWallet();
            setWallet(response.data.data.totalBalance);
        } catch (error) {
            console.error('Error fetching wallet data', error);
        }
    };

    useEffect(() => {
        getWallet();
    }, []);

    return { wallet, getWallet };
};

export default useWallet;