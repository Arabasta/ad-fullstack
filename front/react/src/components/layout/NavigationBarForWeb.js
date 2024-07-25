import { Link, useLocation } from "react-router-dom";
import React, { useState } from "react";
import Logo from '../../assets/images/logo.svg'; // Import the SVG file
import '../../assets/styles/NavigationBarForWeb.css';

export default function NavigationBarForWeb() {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="nav-wrapper">
            <div className="nav-container">
                <a href="#" className="brand-logo">
                    <img src={Logo} alt="Logo" className="logo" />
                </a>
                <button className="sidenav-trigger" onClick={toggleMenu}>
                    ☰
                </button>
                <ul className={`right ${isOpen ? "show" : ""}`}>
                    <li className={location.pathname === "/home" ? "active" : ""}>
                        <Link to="/home">HOME</Link>
                    </li>
                    <li className={location.pathname === "/news" ? "active" : ""}>
                        <Link to="/news">NEWS</Link>
                    </li>
                    <li className={location.pathname === "/wallet" ? "active" : ""}>
                        <Link to="/wallet">WALLET</Link>
                    </li>
                    <li className={location.pathname === "/support" ? "active" : ""}>
                        <Link to="/support">SUPPORT</Link>
                    </li>
                    <li className={location.pathname === "/settings" ? "active" : ""}>
                        <Link to="/settings">SETTINGS</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
