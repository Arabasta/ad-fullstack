import React from 'react';
import { Flex, Box, chakra } from '@chakra-ui/react';

const SimpleImageCard = ({ image, title, spanText, subText}) => {
    return (
        <Flex
            bg="#edf3f8"
            _dark={{ bg: "#3e3e3e" }}
            p={50}
            w="full"
            alignItems="center"
            justifyContent="center"
        >
            <Flex
                direction="column"
                justifyContent="center"
                alignItems="center"
                w="sm"
                mx="auto"
            >
                <Box
                    bg="gray.300"
                    h={64}
                    w="full"
                    rounded="lg"
                    shadow="md"
                    bgSize="cover"
                    bgPos="center"
                    style={{ backgroundImage: `url(${image})` }}
                ></Box>

                <Box
                    w={{ base: 80, md: 64 }}
                    bg="white"
                    _dark={{ bg: "gray.800" }}
                    mt={-10}
                    shadow="lg"
                    rounded="lg"
                    overflow="hidden"
                >
                    <chakra.h3
                        py={2}
                        textAlign="center"
                        fontWeight="bold"
                        textTransform="uppercase"
                        color="gray.800"
                        _dark={{color: "white"}}
                        letterSpacing={1}
                    >
                        {title}
                        <chakra.span
                            fontWeight="bold"
                            color="gray.800"
                            _dark={{color: "gray.200"}}
                        >
                            {spanText}
                        </chakra.span>
                    </chakra.h3>
                </Box>
            </Flex>
        </Flex>
    );
};

export default SimpleImageCard;