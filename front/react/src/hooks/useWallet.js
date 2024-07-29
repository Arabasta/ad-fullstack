import { useState, useEffect } from 'react';
import WalletService from '../services/WalletService';

const useWallet = () => {
    const [wallet, setWallet] = useState(null);

    const getWallet = async () => {
        try {
            // calls the getWallet function from WalletService
            const response = await WalletService.getWallet();
            // set's wallet using the json response according to the walletDTO in spring
            setWallet(response.data.data.totalBalance);
        } catch (error) {
            console.error('Error fetching wallet data', error);
        }
    };

    useEffect(() => {
        getWallet();
    }, []); // no dependencies, only run once after initial render

    return { wallet, getWallet };
};

export default useWallet;
