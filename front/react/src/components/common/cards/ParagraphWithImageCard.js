import React from 'react';
import { Flex, Box,chakra, Link } from '@chakra-ui/react'; // Make sure you have Chakra UI installed
import PropTypes from 'prop-types';

const CardComponent = ({title, subtitle, description, buttonText, imageUrl}) => {
    return (
        <Flex
            bg="#edf3f8"
            p={50}
            w="full"
            alignItems="center"
            justifyContent="center">
            <Box
                bg="white"
                mx={{ lg: 8 }}
                display={{ lg: "flex"}}
                maxW={{lg: "5xl"}}
                shadow={{lg: "lg"}}
                rounded={{lg: "lg"}}>
                <Box w={{lg: "50%"}}>
                    <Box
                        h={{base: 64,lg: "full"}}
                        rounded={{lg: "lg",}}
                        bgSize="cover"
                        style={{backgroundImage:`url(${imageUrl})`}}/>
                </Box>

                <Box
                    py={12}
                    px={6}
                    maxW={{ base: "xl", lg: "5xl"}}
                    w={{lg: "50%"}}>
                    <chakra.h2
                        fontSize={{ base: "2xl", md: "3xl"}}
                        color="gray.800"
                        fontWeight="bold">
                        {title}{" "}
                        <chakra.span color="brand.600">
                            {subtitle}
                        </chakra.span>
                    </chakra.h2>
                    <chakra.p mt={4} color="gray.600">
                        {description}
                    </chakra.p>

                    <Box mt={8}>
                        <Link
                            bg="gray.900"
                            color="gray.100"
                            px={5}
                            py={3}
                            fontWeight="semibold"
                            rounded="lg"
                            _hover={{ bg: "gray.800"}}>
                            {buttonText}
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Flex>
    );
};

CardComponent.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    description: PropTypes.string,
    buttonText: PropTypes.string,
    imageUrl: PropTypes.string,
};

export default CardComponent;