import React from 'react';
import {Flex, Box, chakra} from '@chakra-ui/react'; // Make sure you have Chakra UI installed
import PropTypes from 'prop-types';

const CardComponent = ({recommendedPortfolio, title, subtitle, description, button, imageUrl}) => {
    return (
        <Flex
            bg="brand.400"
            p={50}
            w="max-content"
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
                        {title}
                        <Box></Box> {/*spacer*/}
                        <chakra.span color="brand.600">
                            {subtitle}
                        </chakra.span>
                    </chakra.h2>
                    {recommendedPortfolio}
                    <chakra.p mt={4} color="gray.600">
                        {description}
                    </chakra.p>
                    <Box mt="1rem">
                        {button}
                    </Box>
                </Box>
            </Box>
        </Flex>
    );
};

CardComponent.propTypes = {
    recommendedPortfolio: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    description: PropTypes.string,
    buttonText: PropTypes.string,
    imageUrl: PropTypes.string,
};

export default CardComponent;