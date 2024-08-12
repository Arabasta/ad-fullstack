import React from 'react';
import useSqlTransactionLog from '../../hooks/useSqlTransactionLog';
import SeparatorBlack from '../common/layout/separator/SeparatorBlack';
import SeparatorGrey from '../common/layout/separator/SeparatorGrey';
import UnorderedList from "../common/layout/list/UnorderedList";
import ListItem from "../common/layout/list/ListItem";
import BlackText from "../common/text/BlackText";
import ButtonBlack from "../common/buttons/ButtonBlack";
import {Flex} from "@chakra-ui/react";
import {formatCurrency} from "../../utils/formatCurrency";

// todo: maybe rearrgange the text or something
// todo: better date format
const TransactionHistory = ({ type, portfolioType }) => {
    // useSqlTransactionLog is a custom hook that fetches transaction logs from the backend
    const { transactions, loadMoreTransactions, hasMore, loading } = useSqlTransactionLog(type, portfolioType);

    const formatTimestamp = (timestampArray) => {
        if (Array.isArray(timestampArray) && timestampArray.length >= 6) {
            const [year, month, day, hour, minute, second] = timestampArray;
            return new Date(year, month - 1, day, hour, minute, second).toLocaleDateString('en-SG', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            });
        }
        return "Invalid Date";
    };

    const customiseTransactionTypeText = (transactionType) => {
        // portfolio transaction types
        if (transactionType === "Allocate") return "Allocated"
        if (transactionType === "Withdraw") return "Withdrawn"
        // wallet transaction types
        if (transactionType === "Deposit") return "Deposit to Wallet"
        if (transactionType === "Withdrawal") return "Withdraw from Wallet"
        return transactionType // allocate to portfolio
    }

    return (
        <>
            <SeparatorBlack />
            <UnorderedList>
                {transactions.map((transaction) => (
                    transaction.portfolioType === portfolioType && (
                        <ListItem key={transaction.id}>
                            <BlackText fontWeight="bold">
                                {customiseTransactionTypeText(transaction.transactionType)}: {formatCurrency(transaction.transactionAmount)}
                            </BlackText>
                            <BlackText>Balance: {formatCurrency(transaction.totalAmount)}</BlackText>
                            <BlackText>{formatTimestamp(transaction.timestamp)}</BlackText>
                            <SeparatorGrey />
                        </ListItem>
                )))}
            </UnorderedList>
            {loading && <BlackText>Loading more transactions...</BlackText>}
            {!loading && hasMore && (
              <Flex justifyContent="center" mt={4}>
                  <ButtonBlack onClick={loadMoreTransactions}>
                      Load More
                  </ButtonBlack>
              </Flex>
            )}
            {!hasMore && <BlackText>No more transactions to show</BlackText>}
        </>
    );
};

export default TransactionHistory;
