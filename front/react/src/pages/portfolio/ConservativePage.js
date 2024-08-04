import React from 'react';
import usePortfolio from "../../hooks/usePortfolio";
import PortfolioDetails from "../../components/portfolio/PortfolioDetails";
import PortfolioAddFunds from "../../components/portfolio/PortfolioAddFunds";
import PortfolioWithdrawFunds from "../../components/portfolio/PortfolioWithdrawFunds";

const ConservativePage = () => {
    const { portfolio, addFunds, withdrawFunds } = usePortfolio('CONSERVATIVE');

    return (
        <div>
            <h1>Conservative Portfolio</h1>
            <PortfolioDetails portfolio={portfolio} />
            <PortfolioAddFunds addFunds={addFunds} />
            <PortfolioWithdrawFunds withdrawFunds={withdrawFunds}  currentBalance={portfolio.allocatedBalance}/>
        </div>
    );
};

export default ConservativePage;
