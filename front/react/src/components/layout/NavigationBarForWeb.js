import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";

export default function NavigationBarForWeb() {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="nav-wrapper">
            <div className="nav-container">
                <a href="https://www.google.com" className="brand-logo">
                    <img src={logo} alt="Logo" className="logo" />
                </a>
                <button className="sidenav-trigger" onClick={toggleMenu}>
                    ☰
                </button>
                <ul className={`right ${isOpen ? "show" : ""}`}>
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
