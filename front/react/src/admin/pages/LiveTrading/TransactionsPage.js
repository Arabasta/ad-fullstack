import React from 'react';
import {Flex, ListItem} from '@chakra-ui/react';
import UnorderedList from "../../../components/common/layout/list/UnorderedList";
import BlackText from "../../../components/common/text/BlackText";
import SeparatorGrey from "../../../components/common/layout/separator/SeparatorGrey";
import ButtonBlack from "../../../components/common/buttons/ButtonBlack";
import useSqlTransactionLog from "../../../hooks/useSqlTransactionLog";
import SeparatorBlack from "../../../components/common/layout/separator/SeparatorBlack";

const TransactionsPage = ({type}) => {
    // useSqlTransactionLog is a custom hook that fetches transaction logs from the backend
    const { transactions, loadMoreTransactions, hasMore, loading } = useSqlTransactionLog(type);
    const formatTimestamp = (timestampArray) => {
        if (Array.isArray(timestampArray) && timestampArray.length >= 6) {
            const [year, month, day, hour, minute, second, ms] = timestampArray;
            const dateString = new Date(year, month - 1, day, hour, minute, second);
            return dateString.toLocaleString('en-SG', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            });
        }
        return "Invalid Date";
    };

    return (
      <>
          <SeparatorBlack />
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

export default TransactionsPage;
