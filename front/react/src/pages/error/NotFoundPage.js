import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { WarningIcon } from '@chakra-ui/icons';
import Text from "../../components/common/text/Text";

const NotFoundPage = () => {
    return (
        <Flex direction="column" align="center" justify="center" height="100vh" bg="gray.800">
            <Box mb={4}>
                <WarningIcon boxSize={12} color="red.500" />
            </Box>
            <Text variant="h1" fontSize="4xl" color="red.500" mb={4}>
                404 - Page Not Found
            </Text>
            <Text variant="p" fontSize="lg" color="white">
                The page you are looking for doesn't exist or has been moved.
            </Text>
        </Flex>
    );
};

export default NotFoundPage;
