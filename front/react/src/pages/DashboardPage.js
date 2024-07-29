import React from 'react';
import WalletBalance from "../components/wallet/WalletBalance";
import LogoutButton from "../components/form/auth/LogoutButton";
import WalletAddFunds from "../components/wallet/WalletAddFunds";
import useWallet from "../hooks/useWallet";

const DashboardPage = () => {
    // use the useWallet custom hook to get the wallet state and getWallet function
    const { wallet, getWallet } = useWallet();

    return (
        <div>
            <h2>Dashboard</h2>

            {/* Pass the wallet state to the WalletBalance component */}
            {/* This will display the wallet balance */}
            <WalletBalance wallet={wallet} />

            {/* Pass the getWallet function to be called when handleDeposit is done */}
            {/* This will update the WalletBalance component */}
            {/* onAddFunds is a prop that is a function to be called when the deposit is done */}
            {/* It is optional, so if you have a page for adding funds only (that doesn't need to update the balance) */}
            {/* you can omit this prop */}
            <WalletAddFunds onAddFunds={getWallet}/>

            <LogoutButton />
        </div>
    );
};

export default DashboardPage;
