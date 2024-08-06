import React from 'react';
import PropTypes from 'prop-types';
import InputBoxWhite from "./InputBoxWhite";

const InputBoxWhiteExtraLarge = ({ placeholder, ...props }) => {
    return (
        <InputBoxWhite
            size="lg"
            fontSize="5xl"
            height="80px"
            placeholder={placeholder}
            {...props}
        />
    );
};

InputBoxWhiteExtraLarge.propTypes = {
    placeholder: PropTypes.string,
};

InputBoxWhiteExtraLarge.defaultProps = {
    placeholder: '',
};

export default InputBoxWhiteExtraLarge;
