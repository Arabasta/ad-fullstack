import React from "react";
import { Route } from "react-router-dom";
import PortfolioPage from "../pages/portfolio/PortfolioPage";
import PortfolioManager from "../components/portfolio/PortfolioManager";

const portfolioRoutes = [
    <Route key="portfolio" path="/portfolio" element={<PortfolioPage />} />,
    <Route path="/portfolio/:portfolioType" element={<PortfolioManager />} />,
];

export default portfolioRoutes;


