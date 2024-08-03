import React from 'react';
import useTransactionHistory from '../../hooks/useTransactionHistory';
import TransactionHistoryListView from "../../components/listView/TransactionHistoryListView";
import TransactionTable from "../../components/layout/Table";
import {isInToday, isInYesterday} from "../../utils/helpers";

let testTransactions = [
    {
        title: "Newest",
        items: [
            {
                name: "Deposit",
                date: "27 March 2020, at 12:30 PM",
                amount: "- $2,500",
                type: "Deposit",
            }
        ],
    },
    {
        title: "Yesterday",
        items: [
            {
                name: "Withdrawal",
                date: "26 March 2020, at 13:45 PM",
                amount: "+ $750",
                type: "Withdrawal",
            },
            {
                name: "Pending",
                date: "26 March 2020, at 05:00 AM",
                amount: "Pending",
                type: "pending",
            },
        ],
    },
]

/* todo: find a way to read the s3 objects properly */
const WalletTransactionHistoryPage = () => {
    const { transactions, loadMoreTransactions, hasMore } = useTransactionHistory('wallet');

    let todayTransactions = {
        title: 'Newest',
        items: []
    };
    let yestTransactions = {
        title: 'Yesterday',
        items: []
    };
    let recentTransactions = [todayTransactions, yestTransactions];
    let txn = {
        name: '',
        date: '',
        amount: '',
        type: '',
    }
    /*
    public void logWalletTransaction(String username, BigDecimal transactionAmount, BigDecimal totalAmount, String transactionType) {
        String bucketName = dotenv.get("AWS_S3_TRANSACTION_BUCKET_NAME");
        String timestamp = LocalDateTime.now().format(DATE_TIME_FORMATTER);
        String fileName = String.format("transactions/%s/%s-%s.json", username, transactionType, timestamp);

        ObjectNode logEntry = objectMapper.createObjectNode();
        logEntry.put("timestamp", timestamp);
        logEntry.put("user", username);
        logEntry.put("transactionAmount", transactionAmount);
        logEntry.put("totalAmount", totalAmount);
        logEntry.put("type", transactionType);
        s3Logger.s3PutObject(bucketName, fileName, logEntry.toString());
    }
    * */


    recentTransactions = transactions.map(transaction => {
        txn['name'] = transaction.type;
        txn['date'] = transaction.timestamp;
        txn['amount'] = transaction.transactionAmount;
        txn['type'] = transaction.type;

        if (isInToday(new Date(transaction.timestamp))) {
            recentTransactions[0].items.push(txn)
        } else if (isInYesterday(new Date(transaction.timestamp))) {
            recentTransactions[1].items.push(txn)
        }
    });

    const currentDay = new Date();
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    return (
        <div>
            <TransactionTable
                title="Your Wallet Transactions"
                date1={sevenDaysAgo.toDateString()}
                date2={currentDay.toDateString()}
                transactions={testTransactions}
            />

            <h2>Wallet Transaction History</h2>

            <TransactionHistoryListView
                transactions={transactions}
                loadMoreTransactions={loadMoreTransactions}
                hasMore={hasMore}
            />
        </div>
    );
};

export default WalletTransactionHistoryPage;

