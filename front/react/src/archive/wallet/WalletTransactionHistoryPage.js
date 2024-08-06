import React from 'react';
import TransactionHistory from '../../components/feature/TransactionHistory';
import {Modal} from "../../components/common/modal/Modal";

const WalletTransactionHistoryPage = () => {
    return (
        <Modal triggerText="View History" title="Wallet History">
            <TransactionHistory type="wallet" />
        </Modal>

    );
};

export default WalletTransactionHistoryPage;
