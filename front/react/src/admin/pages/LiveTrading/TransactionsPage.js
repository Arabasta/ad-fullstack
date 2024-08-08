import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ListItem } from '@chakra-ui/react';
import useLiveTrading from "../../hooks/useLiveTrading";
import SeparatorBlack from "../../../components/common/layout/separator/SeparatorBlack";
import SeparatorGrey from "../../../components/common/layout/separator/SeparatorGrey";
import UnorderedList from "../../../components/common/layout/list/UnorderedList";
import BlackText from "../../../components/common/text/BlackText";

const TransactionsPage = () => {
    const location = useLocation();
    const { transactions, getLiveTradingTransactions } = useLiveTrading();

    const queryParams = new URLSearchParams(location.search);
    const portfolioType = queryParams.get('portfolioType');

    useEffect(() => {
        getLiveTradingTransactions(portfolioType);
    }, [portfolioType, getLiveTradingTransactions]);

    const formatTimestamp = (timestampArray) => {
        if (Array.isArray(timestampArray) && timestampArray.length >= 6) {
            const [year, month, day, hour, minute, second, millisecond] = timestampArray;
            return new Date(year, month - 1, day, hour, minute, second, millisecond).toLocaleString();
        }
        return "Invalid Date";
    };

    return (
        <div>
            <h1>Transactions for {portfolioType}</h1>
            <SeparatorBlack />
            {transactions ? (
                <UnorderedList>
                    {transactions.map((transaction) => (
                        <ListItem key={transaction.transactionId} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
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
                <BlackText>Loading transactions...</BlackText>
            )}
        </div>
    );
};

export default TransactionsPage;
