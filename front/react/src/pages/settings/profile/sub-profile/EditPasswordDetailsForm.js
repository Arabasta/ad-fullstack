import React, { useState } from 'react';
import {
    Box,
    SimpleGrid,
    GridItem,
    chakra,
    Stack,
    FormControl,
    FormLabel,
    InputGroup,
    Input,
    Flex,
    Text,
} from '@chakra-ui/react';

import UserService from "../../../../services/UserService";
import Heading from "../../../../components/common/text/Heading";
import Button from "../../../../components/common/buttons/Button";
import useUser from "../../../../hooks/useUser";
import { Link } from "react-router-dom";


const EditPasswordDetailsForm = () => {
    const { user, updateUser, loading } = useUser();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleUpdatePassword = async () => {
        if (newPassword !== confirmNewPassword) {
            setError('New passwords do not match');
            setSuccess('');
            return;
        }

        try {
            await UserService.updatePassword({ oldPassword, newPassword });
            setSuccess('Password updated successfully');
            setError('');
            setNewPassword('');
            setConfirmNewPassword('');
            setOldPassword('');
            if (updateUser) {
                updateUser({ ...user });
            }
        } catch (error) {
            console.error('Error updating password:', error);
            setError('Error updating password');
            setSuccess('');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <Box
            bg="brand.400"
            _dark={{ bg: "#111" }}
            p={10}
        >
            <Box
                bg="brand.100"
                _dark={{ bg: "#111" }}
                p={30}
            >
                <SimpleGrid
                    display={{ base: "initial", md: "grid" }}
                    columns={{ md: 3 }}
                    spacing={{ md: 6 }}
                >
                    <GridItem colSpan={{ md: 1 }}>
                        <Box px={[4, 0]}>
                            <Heading color="brand.600" fontSize="5xl" fontWeight="md" lineHeight="10">
                                Update
                            </Heading>
                            <Text
                                mt={1}
                                fontSize="2xl"
                                color="gray.600"
                                _dark={{ color: "gray.400" }}
                            >
                                your details.
                            </Text>
                        </Box>
                    </GridItem>
                    <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
                        <chakra.form
                            shadow="base"
                            rounded={[null, "md"]}
                            overflow={{ lg: "hidden" }}
                        >
                            <Stack
                                px={4}
                                py={8}
                                bg="white"
                                _dark={{ bg: "#141517" }}
                                spacing={6}
                                p={{ sm: 6 }}
                            >
                                <SimpleGrid columns={3} spacing={6}>
                                    <FormControl as={GridItem} colSpan={[3, 2]}>
                                        <FormLabel
                                            fontSize="md"
                                            fontWeight="md"
                                            color="gray.700"
                                            _dark={{ color: "gray.50" }}
                                        >
                                            Old Password
                                        </FormLabel>

                                        <InputGroup size="sm">
                                            <Input
                                                type="password"
                                                placeholder="old password"
                                                onChange={(e) => setOldPassword(e.target.value)}
                                                borderColor="brand.300"
                                                focusBorderColor="brand.400"
                                                rounded="md"
                                            />
                                        </InputGroup>
                                    </FormControl>

                                    <FormControl as={GridItem} colSpan={[3, 2]}>
                                        <FormLabel
                                            fontSize="md"
                                            fontWeight="md"
                                            color="gray.700"
                                            _dark={{ color: "gray.50" }}
                                        >
                                            New Password
                                        </FormLabel>

                                        <InputGroup size="sm">
                                            <Input
                                                type="password"
                                                placeholder="new password"
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                borderColor="brand.300"
                                                focusBorderColor="brand.400"
                                                rounded="md"
                                            />
                                        </InputGroup>
                                    </FormControl>

                                    <FormControl as={GridItem} colSpan={[3, 2]}>
                                        <FormLabel
                                            fontSize="md"
                                            fontWeight="md"
                                            color="gray.700"
                                            _dark={{ color: "gray.50" }}
                                        >
                                            Confirm New Password
                                        </FormLabel>

                                        <InputGroup size="sm">
                                            <Input
                                                type="password"
                                                placeholder="confirm new password"
                                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                                borderColor="brand.300"
                                                focusBorderColor="brand.400"
                                                rounded="md"
                                            />
                                        </InputGroup>
                                    </FormControl>
                                </SimpleGrid>
                            </Stack>

                            <Flex
                                px={{ base: 4, sm: 6 }}
                                py={3}
                                bg="gray.50"
                                _dark={{ bg: "#121212" }}
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Link to="/settings/profile">
                                    <Button
                                        type="button"
                                        colorScheme="brand"
                                        _focus={{ shadow: "" }}
                                        fontWeight="md"
                                    >
                                        Return
                                    </Button>
                                </Link>

                                <Button
                                    type="button"
                                    onClick={handleUpdatePassword}
                                    colorScheme="brand"
                                    _focus={{ shadow: "" }}
                                    fontWeight="md"
                                >
                                    Update
                                </Button>
                            </Flex>

                            {error && <Text mt={3} color="red.500" textAlign="center">{error}</Text>}
                            {success && <Text mt={3} color="green.500" textAlign="center">{success}</Text>}
                        </chakra.form>
                    </GridItem>
                </SimpleGrid>
            </Box>
        </Box>
    );
};

export default EditPasswordDetailsForm;
