import React from "react";
import { Route } from "react-router-dom";
import PortfolioPage from "../pages/portfolio/PortfolioPage";
import PortfolioManager from "../components/portfolio/PortfolioManager";
import RulesPage from "../pages/portfolio/rules/RulesPage";
import RulesModal from "../components/rules/RulesModal";
import updateRulesByPortfolio from "../components/rules/UpdateRulesByPortfolio";

const portfolioRoutes = [
    <Route key="portfolio" path="/portfolio" element={<PortfolioPage />} />,
    <Route path="/portfolio/:portfolioType" element={<PortfolioManager />} />,
    <Route key="rule" path="/portfolio/rules" element={<RulesPage />} />,
    <Route path="/portfolio/:portfolioType" element={<RulesModal onActionComplete={updateRulesByPortfolio} />} />
];

export default portfolioRoutes;


