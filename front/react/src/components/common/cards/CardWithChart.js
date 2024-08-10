import React from 'react';
import { Flex, Box,chakra } from '@chakra-ui/react'; // Make sure you have Chakra UI installed
import PropTypes from 'prop-types';

const CardComponent = ({title, button, chart}) => {
    return (
        <Flex
            bg="brand.400"
            w="full"
            h={{lg: "90%"}}
            p={20}
            alignItems="center"
            justifyContent="center">
            <Box
                bg="brand.10"
                mx={{ lg: 8 }}
                display={{ lg: "flex"}}
                shadow={{lg: "lg"}}
                rounded={{lg: "lg"}}>
                {chart}

                <Box
                    py={12}
                    px={6}
                    w="full"
                    h={{lg: "30%"}}>
                    <chakra.h2
                        fontSize={{ base: "xl"}}
                        color="brand.600"
                        fontWeight="bold">
                        {title}{" "}
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
