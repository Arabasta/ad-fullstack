import React from "react";
import { Route } from "react-router-dom";
import PortfolioPage from "../pages/portfolio/PortfolioPage";
import PortfolioManager from "../components/portfolio/PortfolioManager";
import RulesModal from "../components/rules/RulesModal";
import updateRulesByPortfolio from "../components/rules/UpdateRulesByPortfolio";
import PortfolioTransactionHistoryPage from "../pages/portfolio/PortfolioTransactionHistoryPage";

const portfolioRoutes = [
    <Route key="portfolio" path="/portfolio" element={<PortfolioPage />} />,
    <Route path="/portfolio/:portfolioType" element={<PortfolioManager />} />,
    <Route path="/portfolio/rules/:portfolioType" element={<RulesModal onActionComplete={updateRulesByPortfolio} />} />,
    <Route path="/portfolio/transaction-history/:portfolioType" element={<PortfolioTransactionHistoryPage />} />
];

export default portfolioRoutes;


