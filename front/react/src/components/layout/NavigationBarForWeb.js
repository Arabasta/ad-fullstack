import { Link } from "react-router-dom";
import React from "react";

export default function NavigationBarForWeb() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/home">HOME</Link>
                </li>
                <li>
                    <Link to="/news">NEWS</Link>
                </li>
                <li>
                    <Link to="/wallet">WALLET</Link>
                </li>
                <li>
                    <Link to="/support">SUPPORT</Link>
                </li>
                <li>
                    <Link to="/settings">SETTINGS</Link>
                </li>
            </ul>
        </nav>
    );
}
