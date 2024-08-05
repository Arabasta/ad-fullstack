import React from 'react';
import usePortfolio from "../../hooks/usePortfolio";
import PortfolioDetails from "../../components/portfolio/PortfolioDetails";
import PortfolioAddFunds from "../../components/portfolio/PortfolioAddFunds";
import PortfolioWithdrawFunds from "../../components/portfolio/PortfolioWithdrawFunds";
import RulesPage from "./rules/RulesPage";

const AggressivePage = () => {
    const { portfolio, addFunds, withdrawFunds } = usePortfolio('AGGRESSIVE');

    return (
        <div>
            <h1>Aggressive Portfolio</h1>
            <PortfolioDetails portfolio={portfolio} />
            <PortfolioAddFunds addFunds={addFunds} />
            <PortfolioWithdrawFunds withdrawFunds={withdrawFunds}  currentBalance={portfolio.allocatedBalance}/>
            <RulesPage portfolio={portfolio.portfolioType}/>

        </div>
    );
};

export default AggressivePage;
