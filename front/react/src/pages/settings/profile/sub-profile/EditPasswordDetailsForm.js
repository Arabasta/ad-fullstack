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
    useToast, // Import useToast for displaying toast messages
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

    const [oldPasswordError, setOldPasswordError] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');
    const [confirmNewPasswordError, setConfirmNewPasswordError] = useState('');

    const toast = useToast();

    const handleUpdatePassword = async () => {
        let valid = true;

        // Validate Old Password
        if (!oldPassword) {
            setOldPasswordError('Old password is required');
            valid = false;
        } else if (oldPassword.length < 6) {
            setOldPasswordError('Old password must be at least 6 characters');
            valid = false;
        } else {
            setOldPasswordError('');
        }

        // Validate New Password
        if (!newPassword) {
            setNewPasswordError('New password is required');
            valid = false;
        } else if (newPassword.length < 6) {
            setNewPasswordError('New password must be at least 6 characters');
            valid = false;
        } else {
            setNewPasswordError('');
        }

        // Validate Confirm New Password
        if (!confirmNewPassword) {
            setConfirmNewPasswordError('Please confirm your new password');
            valid = false;
        } else if (confirmNewPassword.length < 6) {
            setConfirmNewPasswordError('Confirm password must be at least 6 characters');
            valid = false;
        } else if (newPassword !== confirmNewPassword) {
            setConfirmNewPasswordError('New passwords do not match');
            valid = false;
        } else {
            setConfirmNewPasswordError('');
        }

        if (!valid) return;

        try {
            await UserService.updatePassword({ oldPassword, newPassword });
            setOldPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
            if (updateUser) {
                updateUser({ ...user });
            }
            toast({
                title: "Password Updated",
                description: "Your password has been successfully updated.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Error updating password:', error);

            if (error.response && error.response.data) {
                if (error.response.data.message === 'Invalid password') {
                    setOldPasswordError('Old password is incorrect');
                } else {
                    setOldPasswordError(error.response.data.message || 'Error updating password');
                }
            } else {
                setOldPasswordError('Error updating password');
            }
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
                                Update your details
                            </Heading>
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
                                    <FormControl as={GridItem} colSpan={[3, 2]} isInvalid={!!oldPasswordError}>
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
                                                value={oldPassword}
                                                onChange={(e) => setOldPassword(e.target.value)}
                                                borderColor="brand.300"
                                                focusBorderColor="brand.400"
                                                rounded="md"
                                            />
                                        </InputGroup>
                                        {oldPasswordError && <Text mt={2} color="red.500">{oldPasswordError}</Text>}
                                    </FormControl>

                                    <FormControl as={GridItem} colSpan={[3, 2]} isInvalid={!!newPasswordError}>
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
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                borderColor="brand.300"
                                                focusBorderColor="brand.400"
                                                rounded="md"
                                            />
                                        </InputGroup>
                                        {newPasswordError && <Text mt={2} color="red.500">{newPasswordError}</Text>}
                                    </FormControl>

                                    <FormControl as={GridItem} colSpan={[3, 2]} isInvalid={!!confirmNewPasswordError}>
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
                                                value={confirmNewPassword}
                                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                                borderColor="brand.300"
                                                focusBorderColor="brand.400"
                                                rounded="md"
                                            />
                                        </InputGroup>
                                        {confirmNewPasswordError && <Text mt={2} color="red.500">{confirmNewPasswordError}</Text>}
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
                        </chakra.form>
                    </GridItem>
                </SimpleGrid>
            </Box>
        </Box>
    );
};

export default EditPasswordDetailsForm;
