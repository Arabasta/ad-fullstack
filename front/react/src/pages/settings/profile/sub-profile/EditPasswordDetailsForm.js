import React, {useState} from 'react';
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
} from '@chakra-ui/react';

import UserService from "../../../../services/UserService";
import Heading from "../../../../components/common/text/Heading";
import Text from "../../../../components/common/text/Text";
import Button from "../../../../components/common/buttons/Button";
import useUser from "../../../../hooks/useUser";


const EditPasswordDetailsForm = ({
                                 //password, setPassword,
                                 method}) => {
    const { user, updateUser, loading } = useUser();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleUpdatePassword = async () => {
        try {
            await UserService.updatePassword({ oldPassword, newPassword });
            setSuccess('Password updated successfully');
            setError('');
            setNewPassword('');
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
            bg="brand.600"
            _dark={{ bg: "#111" }}
            p={10}
        >
            <Box
                bg="brand.400"
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
                            <Heading color="brand.100" fontSize="5xl" fontWeight="md" lineHeight="10">
                                Update.
                            </Heading>
                            <Text
                                mt={1}
                                fontSize="2xl"
                                color="gray.600"
                                _dark={{ color: "gray.400" }}
                            >
                            </Text>
                        </Box>
                    </GridItem>
                    <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
                        <chakra.form
                            onSubmit={method}
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
                                                focusBorderColor="brand.400"
                                                rounded="md"
                                            />
                                        </InputGroup>
                                        <Button
                                            type="button"
                                            onClick={handleUpdatePassword}
                                            colorScheme="brand"
                                            _focus={{ shadow: "" }}
                                            fontWeight="md"
                                        >
                                            Update
                                        </Button>

                                        {/* change this to toast / alert */}
                                        {error && <p style={{ color: 'red' }}>{error}</p>}
                                        {success && <p style={{ color: 'green' }}>{success}</p>}
                                    </FormControl>


                                </SimpleGrid>
                            </Stack>
                            <Box
                                px={{ base: 4, sm: 6 }}
                                py={3}
                                bg="gray.50"
                                _dark={{ bg: "#121212" }}
                                textAlign="right"
                            >
                                <Button
                                    type="button"
                                    colorScheme="brand"
                                    _focus={{ shadow: "" }}
                                    fontWeight="md"
                                >
                                    Return
                                </Button>
                            </Box>
                        </chakra.form>

                    </GridItem>
                </SimpleGrid>
            </Box>
        </Box>
    );
};

export default EditPasswordDetailsForm;
