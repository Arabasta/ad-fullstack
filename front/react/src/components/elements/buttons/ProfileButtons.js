import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from "./Button";

const ProfileButtons = ({ to, label }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(to);
    };

    return (
        <div>
            <Button onClick={handleClick}>
                {label}
            </Button>
        </div>
    );
};

ProfileButtons.propTypes = {
    to: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
};

export default ProfileButtons;
