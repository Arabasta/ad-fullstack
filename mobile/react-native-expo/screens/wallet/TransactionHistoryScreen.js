import React from 'react';
import Container from "../../components/common/container/Container";
import TransactionHistoryList from "../../components/shared/TransactionHistoryList";

const TransactionHistoryScreen = ({ route }) => {
    const { type, portfolioType } = route.params || {};

    return (
        <Container>
            <TransactionHistoryList type={type} portfolioType={portfolioType} />
        </Container>
    );
};

export default TransactionHistoryScreen;
