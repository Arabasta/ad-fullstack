import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavLink = ({ to, label, exact, activeClassName, className, ...props }) => {
    return (
        <li className="nav-item">
            <RouterNavLink
                to={to}
                exact={exact}
                className={className}
                activeClassName={activeClassName}
                {...props}
            >
                {label}
            </RouterNavLink>
        </li>
    );
};

NavLink.propTypes = {
    to: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    exact: PropTypes.bool,
    activeClassName: PropTypes.string,
    className: PropTypes.string,
};

NavLink.defaultProps = {
    exact: false,
    activeClassName: 'active',
    className: 'nav-link',
};

export default NavLink;
