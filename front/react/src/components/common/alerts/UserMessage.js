import React from 'react';
import PropTypes from 'prop-types';
import BlackText from "../text/BlackText";

const UserMessage = ({ message }) => {
    return <BlackText variant="p">{message}</BlackText>;
};

UserMessage.propTypes = {
    message: PropTypes.string,
};

UserMessage.defaultProps = {
    message: '',
};

export default UserMessage;
