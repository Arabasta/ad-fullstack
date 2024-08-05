import React from 'react';
import usePortfolio from "../../hooks/usePortfolio";
import PortfolioDetails from "../../components/portfolio/PortfolioDetails";
import PortfolioAddFunds from "../../components/portfolio/PortfolioAddFunds";
import PortfolioWithdrawFunds from "../../components/portfolio/PortfolioWithdrawFunds";
import {useNavigate} from "react-router-dom";

const ModeratePage = () => {
    const { portfolio, addFunds, withdrawFunds } = usePortfolio('MODERATE');

    const navigate = useNavigate();

    const handleNavigateToRules = () => {
        navigate('/portfolio/rules', { state: { portfolioType: 'MODERATE' } });
    };

    return (
        <div>
            <h1>Moderate Portfolio</h1>
            <PortfolioDetails portfolio={portfolio}/>
            <PortfolioAddFunds addFunds={addFunds}/>
            <PortfolioWithdrawFunds withdrawFunds={withdrawFunds} currentBalance={portfolio.allocatedBalance}/>
            <button onClick={handleNavigateToRules}>Rules page</button>
        </div>
    );
};

export default ModeratePage;
