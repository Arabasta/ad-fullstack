import React from 'react';
import PropTypes from 'prop-types';

const SearchInput = ({ value, onChange, placeholder }) => {
    return (
        <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    );
};

SearchInput.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
};

SearchInput.defaultProps = {
    placeholder: 'Search...',
};

export default SearchInput;
