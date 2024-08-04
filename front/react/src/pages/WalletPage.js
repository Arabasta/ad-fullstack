import useWallet from "../hooks/useWallet";
import WalletAddFunds from "../components/wallet/WalletAddFunds";
import WalletWithdrawFunds from "../components/wallet/WalletWithdrawFunds";
import SimpleImageCard from "../components/elements/cards/SimpleImageCard";
import creditCardLogo from "../assets/images/card-visa-background.jpg"
import {formatCurrency} from "../utils/formatCurrency";

const WalletPage = () => {
    // use the useWallet custom hook to get the wallet state and getWallet function
    const { wallet, getWallet } = useWallet();

    return (
       <div>
           <SimpleImageCard
               image={creditCardLogo}
               title="Wallet Balance: "
               spanText={formatCurrency(wallet)}
               />
           {/* Pass the getWallet function to be called when handleDeposit is done */}
           {/* This will update the WalletBalance component */}
           {/* onAddFunds is a prop that is a function to be called when the deposit is done */}
           {/* It is optional, so if you have a page for adding funds only (that doesn't need to update the balance) */}
           {/* you can omit this prop */}
           <WalletAddFunds onAddFunds={getWallet}/>
           <WalletWithdrawFunds onWithdrawFunds={getWallet}/>

       </div>
    );
};

export default WalletPage;