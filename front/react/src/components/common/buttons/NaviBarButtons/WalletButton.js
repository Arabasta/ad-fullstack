import { Link } from "react-router-dom";
import React from "react";

export default function WalletButton() {
    return (
        <li className="nav-item">
            <Link className="nav-link" to="/wallet">WALLET</Link>
        </li>
    );
}
