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

const CustomerDetailsCard = ({ customer }) => {
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
                maxW="270px"
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

                <Box p={6}>
                    <Stack spacing={0} align="center" mb={5}>
                        <Heading fontSize="2xl" fontWeight={500} color="white">
                            {title}
                        </Heading>
                        <Text color="gray.300">{subtitle}</Text>
                    </Stack>

                    <Stack spacing={0} align="center">
                        <Text fontSize="sm" color="gray.300">
                            {description}
                        </Text>
                    </Stack>
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
};

export default CustomerDetailsCard;
