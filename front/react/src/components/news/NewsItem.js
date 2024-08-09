import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text, Link, Heading, Badge, Image } from '@chakra-ui/react';

const NewsItem = ({ title, url, author, description, imageUrl }) => {
    console.log("NewsItem props:", { title, url, author, description, imageUrl });

    return (
        <Box
            p={5}
            shadow="lg"
            borderWidth="1px"
            borderRadius="lg"
            bg="white"
            _hover={{ transform: "translateY(-5px)", shadow: "xl", bg: "blue.50" }}
            transition="all 0.3s ease-in-out"
        >
            {imageUrl && (
                <Image
                    src={imageUrl}
                    alt={title}
                    borderRadius="md"
                    mb={4}
                    objectFit="cover"
                    height="150px"
                    width="100%"
                />
            )}
            <Heading as="h3" size="md" mb={2} color="blue.600" fontWeight="bold">
                {title}
            </Heading>
            {author && (
                <Badge colorScheme="purple" mb={2} fontSize="sm">
                    Author: {author}
                </Badge>
            )}
            <Text noOfLines={3} color="gray.700" mb={4}>
                {description}
            </Text>
            <Link href={url} color="blue.500" isExternal fontWeight="bold" _hover={{ textDecoration: "underline" }}>
                Read full article
            </Link>
        </Box>
    );
};

NewsItem.propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    author: PropTypes.string,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
};

export default NewsItem;
