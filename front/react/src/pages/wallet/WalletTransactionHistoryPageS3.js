import React from 'react';
import useTransactionHistory from '../../hooks/useTransactionHistory';
import TransactionHistoryListView from "../../components/listView/TransactionHistoryListView";


const WalletTransactionHistoryPageS3 = () => {
    const { transactions, loadMoreTransactions, hasMore } = useTransactionHistory('wallet');

    return (
        <div>
            <h2>Wallet Transaction History</h2>
            <TransactionHistoryListView
                transactions={transactions}
                loadMoreTransactions={loadMoreTransactions}
                hasMore={hasMore}
            />
        </div>
    );
};

export default WalletTransactionHistoryPageS3;
