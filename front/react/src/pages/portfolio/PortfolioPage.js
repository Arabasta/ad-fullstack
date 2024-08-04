import React from "react";
import { useNavigate } from "react-router-dom";

export default function PortfolioPage() {
    const navigate = useNavigate();

    const handlePortfolioSelection = (type) => {
        navigate(`/portfolio/${type.toLowerCase()}`);
    };

    return (
        <div>
            <div>
                <button onClick={() => handlePortfolioSelection('CONSERVATIVE')}>CONSERVATIVE</button>
            </div>
            <div>
                <button onClick={() => handlePortfolioSelection('MODERATE')}>MODERATE</button>
            </div>
            <div>
                <button onClick={() => handlePortfolioSelection('AGGRESSIVE')}>AGGRESSIVE</button>
            </div>
        </div>
    );
}
