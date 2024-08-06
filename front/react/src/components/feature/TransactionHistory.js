import React from 'react';
import useSqlTransactionLog from '../../hooks/useSqlTransactionLog';
import SeparatorBlack from '../common/layout/SeparatorBlack';
import SeparatorGrey from '../common/layout/SeparatorGrey';
import ModalList from "../common/modal/ModalList";
import ModalListItem from "../common/modal/ModalListItem";
import BlackText from "../common/text/BlackText";
import ModalButton from "../common/modal/ModalButton";
import {Flex} from "@chakra-ui/react";

// todo: maybe rearrgange the text or something
// todo: better date format
const TransactionHistory = ({ type, portfolioType }) => {
    const { transactions, loadMoreTransactions, hasMore, loading } = useSqlTransactionLog(type, portfolioType);

    const formatTimestamp = (timestampArray) => {
        if (Array.isArray(timestampArray) && timestampArray.length >= 6) {
            const [year, month, day, hour, minute, second] = timestampArray;
            return new Date(year, month - 1, day, hour, minute, second).toLocaleString();
        }
        return "Invalid Date";
    };

    return (
        <>
            <SeparatorBlack />
            <ModalList>
                {transactions.map((transaction) => (
                    <ModalListItem key={transaction.id}>
                        <BlackText fontWeight="bold">
                            {transaction.transactionType} ${transaction.transactionAmount}
                        </BlackText>
                        <BlackText>Balance: ${transaction.totalAmount}</BlackText>
                        <BlackText>{formatTimestamp(transaction.timestamp)}</BlackText>
                        <SeparatorGrey />
                    </ModalListItem>
                ))}
            </ModalList>
            {loading && <BlackText>Loading more transactions...</BlackText>}
            {!loading && hasMore && (
                <Flex justifyContent="center" mt={4}>
                    <ModalButton onClick={loadMoreTransactions}>
                        Load More
                    </ModalButton>
                </Flex>
            )}
            {!hasMore && <BlackText>No more transactions to show</BlackText>}
        </>
    );
};

export default TransactionHistory;
