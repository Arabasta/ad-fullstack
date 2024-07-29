import React from "react";
import NavButton from "../../components/common/buttons/NavButtons";

export default function Navbar() {
    return (
        <ul className="navbar-nav">
            <NavButton to="/news" label="NEWS" />
            <NavButton to="/settings" label="SETTINGS" />
            <NavButton to="/support" label="SUPPORT" />
            <NavButton to="/wallet" label="WALLET" />
        </ul>
    );
}
