import React from "react";
import { useNavigate } from "react-router-dom";
import portfolioTypes from "../../components/portfolio/portfolioTypes";

export default function PortfolioPage() {
    const navigate = useNavigate();

    const handlePortfolioSelection = (type) => {
        navigate(`/portfolio/${type.toLowerCase()}`);
    };

    return (
        <div>
            {portfolioTypes.map((portfolio) => (
                <div key={portfolio.type}>
                    <button onClick={() => handlePortfolioSelection(portfolio.type)}>
                        {portfolio.title}
                    </button>
                </div>
            ))}
        </div>
    );
}
