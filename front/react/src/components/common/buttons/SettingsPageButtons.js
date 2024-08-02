import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const SettingsButton = ({ to, label }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(to);
    };

    return (
            <button className="link" onClick={handleClick}>{label}</button>
    );
};

SettingsButton.propTypes = {
    to: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
};

export default SettingsButton;
