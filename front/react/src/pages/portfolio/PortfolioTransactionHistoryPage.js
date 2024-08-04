import React from 'react';
import {Modal} from "../../components/elements/modal/Modal";
import TransactionHistory from "../../components/feature/TransactionHistory";

const PortfolioTransactionHistoryPage = ({ portfolioType }) => {
    return (
        <Modal triggerText="View History" title="Portfolio History">
            <TransactionHistory type="portfolio" portfolioType={portfolioType} />
        </Modal>
    );
};

export default PortfolioTransactionHistoryPage;
