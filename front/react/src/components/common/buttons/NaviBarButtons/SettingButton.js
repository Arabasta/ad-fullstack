import { Link } from "react-router-dom";
import React from "react";

export default function SettingsButton() {
    return (
        <li className="nav-item">
            <Link className="nav-link" to="/settings">SETTINGS</Link>
        </li>
    );
}
