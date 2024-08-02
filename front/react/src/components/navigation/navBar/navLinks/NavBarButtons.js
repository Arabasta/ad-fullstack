import { Link } from "react-router-dom";
import React from "react";
import PropTypes from 'prop-types';

const NavButton = ({ to, label }) => {
    return (
        <li className="nav-item">
            <Link className="nav-link" to={to}>{label}</Link>
        </li>
    );
};

NavButton.propTypes = {
    to: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
};

export default NavButton;
