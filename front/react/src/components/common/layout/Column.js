import React from 'react';
import { Box, chakra, Icon } from '@chakra-ui/react';
import PropTypes from "prop-types";

const Column = ({ title, icon, description }) => {
    return (
        <Box>
            <Icon
                boxSize={12}
                _light={{ color: "brand.700" }}
                mb={4}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
            >
                {icon}
            </Icon>
            <chakra.h3
                mb={3}
                fontSize="lg"
                lineHeight="shorter"
                fontWeight="bold"
                _light={{ color: "gray.900" }}
            >
                {title}
            </chakra.h3>
            <chakra.p
                lineHeight="tall"
                color="gray.600"
                _dark={{ color: "gray.400" }}
            >
                {description}
            </chakra.p>
        </Box>
    );
};

Column.propTypes = {
    icon: PropTypes.any,
    title: PropTypes.string,
    description: PropTypes.string,
};

export default Column;
