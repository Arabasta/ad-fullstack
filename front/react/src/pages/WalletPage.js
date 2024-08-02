import useWallet from "../hooks/useWallet";
import WalletBalance from "../components/wallet/WalletBalance";
import WalletAddFunds from "../components/wallet/WalletAddFunds";
import LogoutButton from "../components/form/auth/LogoutButton";
import WalletWithdrawFunds from "../components/wallet/WalletWithdrawFunds";

const WalletPage = () => {
    // use the useWallet custom hook to get the wallet state and getWallet function
    const { wallet, getWallet } = useWallet();

    return (
        <div>
            <h2>Wallet</h2>

            {/* Pass the wallet state to the WalletBalance component */}
            {/* This will display the wallet balance */}
            <WalletBalance wallet={wallet} />

            {/* Pass the getWallet function to be called when handleDeposit is done */}
            {/* This will update the WalletBalance component */}
            {/* onAddFunds is a prop that is a function to be called when the deposit is done */}
            {/* It is optional, so if you have a page for adding funds only (that doesn't need to update the balance) */}
            {/* you can omit this prop */}
            <WalletAddFunds onAddFunds={getWallet}/>

            <WalletWithdrawFunds onWithdrawFunds={getWallet} wallet={wallet} />

            <LogoutButton />
        </div>
    );
};

export default WalletPage;
