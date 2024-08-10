import React from 'react';
import useSqlTransactionLog from '../../hooks/useSqlTransactionLog';
import SeparatorBlack from '../common/layout/separator/SeparatorBlack';
import SeparatorGrey from '../common/layout/separator/SeparatorGrey';
import UnorderedList from "../common/layout/list/UnorderedList";
import ListItem from "../common/layout/list/ListItem";
import BlackText from "../common/text/BlackText";
import ButtonBlack from "../common/buttons/ButtonBlack";
import {Flex} from "@chakra-ui/react";

// todo: maybe rearrgange the text or something
// todo: better date format
const TransactionHistory = ({ type, portfolioType }) => {
    // useSqlTransactionLog is a custom hook that fetches transaction logs from the backend
    const { transactions, loadMoreTransactions, hasMore, loading } = useSqlTransactionLog(type, portfolioType);

    const formatTimestamp = (timestampArray) => {
        if (Array.isArray(timestampArray) && timestampArray.length >= 6) {
            const [year, month, day, hour, minute, second] = timestampArray;
            return new Date(year, month - 1, day, hour, minute, second).toLocaleString();
        }
        return "Invalid Date";
    };

    const customiseTransactionTypeText = (transactionType) => {
        if (transactionType === "Allocate") return "Allocated"
        if (transactionType === "Withdraw") return "Withdrawn"
    }

    return (
        <>
            <SeparatorBlack />
            <UnorderedList>
                {transactions.map((transaction) => (
                    <ListItem key={transaction.id}>
                        <BlackText fontWeight="bold">
                            {customiseTransactionTypeText(transaction.transactionType)}: ${transaction.transactionAmount}
                        </BlackText>
                        <BlackText>Balance: ${transaction.totalAmount}</BlackText>
                        <BlackText>{formatTimestamp(transaction.timestamp)}</BlackText>
                        <SeparatorGrey />
                    </ListItem>
                ))}
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
