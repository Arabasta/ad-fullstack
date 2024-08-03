import React from 'react';
import PropTypes from 'prop-types';

const SimpleCardComponent = ({ title, subtitle, description }) => {
    return (
        <div>
            <p>{title}</p>
            <p>{subtitle}</p>
            <p>{description}</p>
        </div>
    );
};

SimpleCardComponent.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    description: PropTypes.string.isRequired,
};

SimpleCardComponent.defaultProps = {
    subtitle: '',
};

export default SimpleCardComponent;
