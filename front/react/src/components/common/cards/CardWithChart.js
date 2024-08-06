import React from 'react';
import { Flex, Box,chakra } from '@chakra-ui/react'; // Make sure you have Chakra UI installed
import PropTypes from 'prop-types';

const CardComponent = ({title, subtitle, button, chart}) => {
    return (
        <Flex
            bg="brand.50"
            w="full"
            p={50}
            alignItems="center"
            justifyContent="center">
            <Box
                bg="brand.800"
                mx={{ lg: 8 }}
                display={{ lg: "flex"}}
                shadow={{lg: "lg"}}
                rounded={{lg: "lg"}}>
                {chart}

                <Box
                    py={12}
                    px={6}
                    maxW={{ base: "xl"}}
                    w={{lg: "50%"}}>
                    <chakra.h2
                        fontSize={{ base: "2xl", md: "3xl"}}
                        color="brand.100"
                        fontWeight="bold">
                        {title}{" "}
                        <chakra.span color="brand.600">
                            {subtitle}
                        </chakra.span>
                    </chakra.h2>

                    <Box mt={8}>
                        {button}
                    </Box>
                </Box>
            </Box>
        </Flex>
    );
};

CardComponent.propTypes = {
    title: PropTypes.object,
    subtitle: PropTypes.string,
    description: PropTypes.string,
    button: PropTypes.object,
    imageUrl: PropTypes.object,
};

export default CardComponent;
