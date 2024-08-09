import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PortfolioAddFunds from "../../components/portfolio/PortfolioAddFunds";
import PortfolioWithdrawFunds from "../../components/portfolio/PortfolioWithdrawFunds";
import Heading from "../../components/common/text/Heading";
import usePortfolio from "../../hooks/usePortfolio";
import PortfolioDetails from "../../components/portfolio/PortfolioDetails";
import portfolioTypes from "./portfolioTypes";

const PortfolioManager = () => {
    const { portfolioType } = useParams();
    const { portfolio, addFunds, withdrawFunds } = usePortfolio(portfolioType.toUpperCase());
    //pass the portfolio type the hook, then the hook could handle different portfolio type
    const navigate = useNavigate();

    const handleNavigateToRules = () => {
        navigate('/portfolio/rules', { state: { portfolioType: portfolioType.toUpperCase() } });
    };

    const selectedPortfolioType = portfolioTypes.find(pt => pt.type.toLowerCase() === portfolioType);
    const title = selectedPortfolioType ? selectedPortfolioType.title : 'Portfolio';

    return (
        <div>
            <Heading>{title}</Heading>
            <PortfolioDetails portfolio={portfolio} />
            <PortfolioAddFunds addFunds={addFunds} />
            <PortfolioWithdrawFunds withdrawFunds={withdrawFunds} currentBalance={portfolio.allocatedBalance} />
            <button onClick={handleNavigateToRules}>Rules page</button>
        </div>
    );
};

export default PortfolioManager;
