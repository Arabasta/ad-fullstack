import React from 'react';
import { Flex, Box, chakra } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const CardComponent = ({ title, subtitle, button, chart, scaleToFit }) => {
    return (
        <Flex
            bg="brand.400"
            w={scaleToFit ? "100%" : "full"} // Adjust width to fit parent if scaleToFit is true
            h={scaleToFit ? "100%" : { base: "auto", lg: "90%" }} // Adjust height to fit parent if scaleToFit is true
            p={{ base: 4, lg: 6 }} // Smaller padding
            alignItems="stretch"
            justifyContent="stretch"
            direction={{ base: "column", lg: "row" }} // Column on mobile, row on larger screens
        >
            <Box
                bg="brand.10"
                mx={{ base: 2, lg: 4 }}
                display={{ base: "block", lg: "flex" }} // Stack elements on smaller screens
                shadow={{ base: "sm", lg: "lg" }} // Adjust shadow for mobile
                rounded={{ base: "md", lg: "lg" }}
                w="full"
                p={{ base: 4, lg: 6 }} // Padding around the content
                flexDirection={{ base: "column", lg: "row" }} // Column layout on mobile, row on larger screens
                flexGrow={2} // Allows the chart to grow more
                flexShrink={1} // Allows the chart area to shrink when space is limited
                flexBasis="90%" // Ensures the chart takes up the majority of the space
            >
                <Box
                    w="100%"
                    minH="200px" // Minimum height to maintain chart integrity
                    maxH={scaleToFit ? "100%" : "60%"} // Adjust height if scaleToFit is true
                    p={{ base: 2, lg: 3 }} // Adjust padding for responsiveness
                    mb={{ base: 4, lg: 0 }} // Margin bottom on mobile
                    flexGrow={1} // Allows the chart area to grow more
                >
                    {chart}
                </Box>
            </Box>
            <Box
                py={{ base: 2, lg: 4 }} // Smaller padding on top and bottom
                px={{ base: 2, lg: 4 }} // Smaller padding on left and right
                w={{ base: "100%", lg: "auto" }} // Ensures the title and subtitle area takes up minimal space
                h="auto"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                flexGrow={1} // Allows the title and subtitle area to grow but only slightly
                flexShrink={1} // Ensures that the title and subtitle area shrinks as needed
                flexBasis="10%" // Ensures the title and subtitle take up minimal space
                maxW="100%" // Limits the width of the title and subtitle area
            >
                <chakra.h2
                    fontSize={{ base: "lg", lg: "md" }} // Adjust font size to be smaller
                    fontWeight="bold"
                    textAlign={{ base: "center", lg: "left" }} // Center text on mobile, left-align on larger screens
                    isTruncated // Ensures that long titles don't take up too much space
                >
                    {title}
                </chakra.h2>

                {subtitle && (
                    <chakra.h3
                        fontSize={{ base: "sm", lg: "sm" }} // Adjust font size to be smaller
                        color="brand.100"
                        mt={1}
                        textAlign={{ base: "center", lg: "left" }} // Center text on mobile, left-align on larger screens
                        isTruncated // Ensures that long subtitles don't take up too much space
                    >
                        {subtitle}
                    </chakra.h3>
                )}

                <Box mt={{ base: 2, lg: 4 }}>
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
    scaleToFit: PropTypes.bool, // Optional prop to control scaling
};

CardComponent.defaultProps = {
    scaleToFit: false,
};

export default CardComponent;
