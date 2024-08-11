import React from 'react';
import { Flex, Box,chakra } from '@chakra-ui/react'; // Make sure you have Chakra UI installed
import PropTypes from 'prop-types';

const CardComponent = ({title, subtitle, button, chart}) => {
    return (
        <Flex
            bg="brand.400"
            w="full"
            h={{ base: "auto", lg: "90%" }}
            p={{ base: 4, lg: 10 }} // Smaller padding on mobile
            alignItems="flex-start"
            justifyContent="space-between"
            direction={{ base: "column", lg: "row" }} // Column on mobile, row on larger screens
        >

            <Box
                bg="brand.10"
                mx={{ base: 2, lg: 8 }}
                display={{ base: "block", lg: "flex" }} // Stack elements on smaller screens
                shadow={{ base: "sm", lg: "lg" }} // Adjust shadow for mobile
                rounded={{ base: "md", lg: "lg" }}
                w="full"
                p={{ base: 4, lg: 8 }} // Padding around the content
                flexDirection={{ base: "column", lg: "row" }} // Column layout on mobile, row on larger screens
            >
                <Box
                    w={{ base: "80%", lg: "60%" }} // Take full width on mobile
                    minH="300px" // Minimum height to maintain chart integrity
                    p={{ base: 2, lg: 4 }} // Adjust padding for responsiveness
                    mb={{ base: 4, lg: 0 }} // Margin bottom on mobile
                    flexShrink={0} // Prevent shrinking when there are few data points
                >
                    {chart}
                </Box>
            </Box>
            <Box
                py={{ base: 4, lg: 6 }} // Padding on top and bottom
                px={{ base: 2, lg: 6 }} // Padding on left and right
                w={{ base: "100%", lg: "30%" }} // Full width on mobile, 30% on larger screens
                h="auto"
            >
                <chakra.h2
                    fontSize={{ base: "lg", lg: "xl" }} // Adjust font size for responsiveness
                    fontWeight="bold">
                    {title}{" "}
                </chakra.h2>

                {subtitle && (
                    <chakra.h3
                        fontSize={{ base: "sm", lg: "md" }} // Adjust font size for responsiveness
                        color="brand.100"
                        mt={2}>
                        {subtitle}
                    </chakra.h3>
                )}

                <Box mt={{ base: 4, lg: 8 }}>
                    {button}
                </Box>
            </Box>
        </Flex>
    );
};

CardComponent.propTypes = {
    title: PropTypes.object,
    subtitle: PropTypes.object,
    description: PropTypes.string,
    button: PropTypes.object,
    imageUrl: PropTypes.object,
};

export default CardComponent;
