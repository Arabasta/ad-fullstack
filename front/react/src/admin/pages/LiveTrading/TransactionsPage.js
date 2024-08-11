import React, { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import useLiveTrading from "../../hooks/useLiveTrading";
import { ListItem } from '@chakra-ui/react';
import UnorderedList from "../../../components/common/layout/list/UnorderedList";
import BlackText from "../../../components/common/text/BlackText";
import SeparatorGrey from "../../../components/common/layout/separator/SeparatorGrey";

const TransactionsPage = () => {
    const location = useLocation();
    const { transactions, getLiveTradingTransactions, loading, message } = useLiveTrading();

    const queryParams = new URLSearchParams(location.search);
    const portfolioType = queryParams.get('portfolioType');

    const fetchTransactions = useCallback(() => {
        getLiveTradingTransactions(portfolioType);
    }, [portfolioType, getLiveTradingTransactions]);

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    const formatTimestamp = (timestampArray) => {
        if (Array.isArray(timestampArray) && timestampArray.length >= 6) {
            const [year, month, day, hour, minute, second, millisecond] = timestampArray;
            return new Date(year, month - 1, day, hour, minute, second, millisecond).toLocaleString();
        }
        return "Invalid Date";
    };

    return (
        <div>
            {loading ? (
                <BlackText>Loading transactions...</BlackText>
            ) : message ? (
                <BlackText>{message}</BlackText>
            ) : transactions.length > 0 ? (
                <UnorderedList>
                    {transactions.map((transaction) => (
                        <ListItem key={transaction.transactionId}>
                            <BlackText fontWeight="bold">
                                {transaction.action} ${transaction.transactionAmount}
                            </BlackText>
                            <BlackText>Ticker: {transaction.ticker}</BlackText>
                            <BlackText>Quantity: {transaction.transactionQuantity}</BlackText>
                            <BlackText>Price: ${transaction.transactionPrice}</BlackText>
                            <BlackText>Portfolio Type: {transaction.portfolioType}</BlackText>
                            <BlackText>{formatTimestamp(transaction.transactionDateTime)}</BlackText>
                            <SeparatorGrey />
                        </ListItem>
                    ))}
                </UnorderedList>
            ) : (
                <BlackText>No transactions available.</BlackText>
            )}
        </div>
    );
};

export default TransactionsPage;
