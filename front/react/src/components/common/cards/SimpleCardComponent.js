import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text, VStack } from '@chakra-ui/react';

const SimpleCardComponent = ({ title, subtitle, description }) => {
    return (
        <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            p={6}
            bg="gray.800"
            color="white"
        >
            <VStack spacing={4} align="stretch">
                <Text fontSize="lg" fontWeight="bold">
                    {title}
                </Text>
                {subtitle && (
                    <Text fontSize="md">
                        {subtitle}
                    </Text>
                )}
                <Text fontSize="sm">
                    {description}
                </Text>
            </VStack>
        </Box>
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
