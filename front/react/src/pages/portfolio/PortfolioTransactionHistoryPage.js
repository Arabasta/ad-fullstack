import React from 'react';
import {Modal} from "../../components/common/modal/Modal";
import TransactionHistory from "../../components/feature/TransactionHistory";
import portfolioTypes from "../../components/portfolio/portfolioTypes";

const PortfolioTransactionHistoryPage = ({ portfolioType }) => {
    const selectedPortfolioType = portfolioTypes.find(pt => pt.type === portfolioType);

    return (
        <Modal triggerText="View History"
               title={`Transactions - ${selectedPortfolioType.title}`}>
            <TransactionHistory
                type="portfolio"
                portfolioType={selectedPortfolioType.type} />
        </Modal>
    );
};

export default PortfolioTransactionHistoryPage;
