import { Link } from "react-router-dom";
import React from "react";

export default function SupportButton() {
    return (
        <li className="nav-item">
            <Link className="nav-link" to="/support">SUPPORT</Link>
        </li>
    );
}
