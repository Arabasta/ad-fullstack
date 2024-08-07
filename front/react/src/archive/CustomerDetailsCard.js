'use client';

import React from 'react';
import PropTypes from 'prop-types';
import {
    Heading,
    Avatar,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
} from '@chakra-ui/react';

const CustomerDetailsCard = ({ customer, alertMessage }) => {
    if (!customer) {
        return <p>Loading customer details...</p>;
    }

    const { firstName, lastName, nationality, mobileNumber } = customer;
    const title = `${firstName} ${lastName}`;
    const subtitle = nationality;
    const description = `Mobile Number: ${mobileNumber}`;
    const imageUrl = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'; // Placeholder image URL

    return (
        <Center py={6}>
            <Box
                maxW="320px"
                w="full"
                bg="gray.800"
                boxShadow="2xl"
                rounded="md"
                overflow="hidden"
            >
                <Image
                    h="120px"
                    w="full"
                    src="https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                    objectFit="cover"
                    alt="Background Image"
                />
                <Flex justify="center" mt={-12}>
                    <Avatar
                        size="xl"
                        src={imageUrl}
                        css={{
                            border: '2px solid white',
                        }}
                    />
                </Flex>

                <Box p={6} textAlign="center">
                    <Stack spacing={2} align="center" mb={5}>
                        <Heading fontSize="xl" fontWeight={500} color="white">
                            {title}
                        </Heading>
                        <Text color="gray.300">{subtitle}</Text>
                    </Stack>

                    <Text fontSize="sm" color="gray.300" mb={4}>
                        {description}
                    </Text>

                    {alertMessage && (
                        <Box mt={4} bg="gray.700" p={4} rounded="md">
                            <Text fontSize="sm" color="gray.300">
                                {alertMessage}
                            </Text>
                        </Box>
                    )}
                </Box>
            </Box>
        </Center>
    );
};

CustomerDetailsCard.propTypes = {
    customer: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        nationality: PropTypes.string.isRequired,
        mobileNumber: PropTypes.string.isRequired,
    }).isRequired,
    alertMessage: PropTypes.string,
};

export default CustomerDetailsCard;

/*
* Previous use

<ChakraProvider>
    <Box>
        <Flex direction="column" align="center" mt={4} mb={8}>
            <Heading as="h2" size="lg" mb={2}>Profile</Heading>
            <Text>Welcome to the Profile Page!</Text>
        </Flex>

        <Flex direction="row" align="center" justify="center" mt={4} mb={8} w="full" p={4}>
            <CustomerDetailsCard
                customer={customer}
                alertMessage={error ? error : `Your recommended portfolio type is: ${recommendedPortfolioType}`}
            />

            <VStack spacing={4} align="flex-start" ml={8}>
            </VStack>
        </Flex>

        <Divider mb={8} />

    </Box>
</ChakraProvider>
*
* */