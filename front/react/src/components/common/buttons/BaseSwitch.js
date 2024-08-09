import React from 'react';
import { Switch, Text, Flex } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const BaseSwitch = ({ isChecked, onChange, label, colorScheme, size, labelPosition, ...rest }) => {
    return (
        <Flex alignItems="center">
            {label && labelPosition === 'left' && (
                <Text mr={2} fontSize={size === 'lg' ? 'lg' : 'md'} fontWeight="medium">
                    {label}
                </Text>
            )}
            <Switch
                isChecked={isChecked}
                onChange={onChange}
                colorScheme={colorScheme || 'teal'}
                size={size || 'md'}
                {...rest}
            />
            {label && labelPosition === 'right' && (
                <Text ml={2} fontSize={size === 'lg' ? 'lg' : 'md'} fontWeight="medium">
                    {label}
                </Text>
            )}
        </Flex>
    );
};

BaseSwitch.propTypes = {
    isChecked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    colorScheme: PropTypes.string,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    labelPosition: PropTypes.oneOf(['left', 'right']),
};

BaseSwitch.defaultProps = {
    colorScheme: 'teal',
    size: 'md',
    labelPosition: 'right',
};

export default BaseSwitch;
