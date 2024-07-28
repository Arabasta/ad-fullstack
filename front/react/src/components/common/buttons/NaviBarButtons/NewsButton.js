import { Link } from "react-router-dom";
import React from "react";

export default function NewsButton() {
    return (
        <li className="nav-item">
            <Link className="nav-link" to="/news">NEWS</Link>
        </li>
    );
}
