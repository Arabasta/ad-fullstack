import React, { useEffect, useState } from 'react';
import {
    Box,
    SimpleGrid,
    GridItem,
    chakra,
    Stack,
    FormControl,
    FormLabel,
    InputGroup,
    Button,
    Select,
    Input,
    Flex,
    Text
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import useUser from "../../../../hooks/useUser";
import UserService from "../../../../services/UserService";
import useCustomer from "../../../../hooks/useCustomer";
import Heading from "../../../../components/common/text/Heading";
import CountryCodes from "../../../../components/customer/auth/CountryCodes";

const EditUserDetailsForm = () => {
    const { user, updateUser, loading } = useUser();
    const { customer, updateMobileNumber } = useCustomer();
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [countryCode, setCountryCode] = useState('');

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (user && user.email) setEmail(user.email);
        if (customer && customer.mobileNumber) {
            const code = extractCountryCode(customer.mobileNumber);
            setCountryCode(code);
            setMobileNumber(customer.mobileNumber.replace(code, ''));
        }
    }, [user, customer]);

    const extractCountryCode = (number) => {
        for (let { code } of CountryCodes) {
            if (number.startsWith(code)) {
                return code;
            }
        }
        return '';
    };

    const handleUpdateMobileNumber = async () => {
        try {
            await updateMobileNumber(`${countryCode}${mobileNumber}`);
            setSuccess('Mobile number updated successfully');
            setError('');
        } catch (error) {
            console.error('Error updating mobile number', error);
            setError('Error updating mobile number');
            setSuccess('');
        }
    };

    const handleUpdateEmail = async () => {
        try {
            await UserService.updateEmail({ email });
            setSuccess('Email updated successfully');
            setError('');

            if (updateUser) {
                updateUser({ ...user, email });
            }
        } catch (error) {
            console.error('Error updating email', error);
            setError('Error updating email');
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
                                            Email
                                        </FormLabel>

                                        <InputGroup size="sm">
                                            <Input
                                                type="email"
                                                value={email}
                                                placeholder="email"
                                                onChange={(e) => setEmail(e.target.value)}
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
                                            Mobile Phone
                                        </FormLabel>

                                        <InputGroup size="sm">
                                            <Select
                                                value={countryCode}
                                                onChange={(e) => setCountryCode(e.target.value)}
                                                placeholder="Select country code"
                                                borderColor="brand.300"
                                                focusBorderColor="brand.400"
                                                rounded="md"
                                                width="500px"
                                                mr={2}
                                            >
                                                {CountryCodes.map(({ code, label }) => (
                                                    <option key={code} value={code}>
                                                        {label}
                                                    </option>
                                                ))}
                                            </Select>

                                            <Input
                                                type="tel"
                                                value={mobileNumber}
                                                onChange={(e) => setMobileNumber(e.target.value)}
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
                                    onClick={handleUpdateEmail}
                                    colorScheme="brand"
                                    _focus={{ shadow: "" }}
                                    fontWeight="md"
                                >
                                    Update
                                </Button>
                            </Flex>

                            <Box
                                px={{ base: 4, sm: 6 }}
                                py={3}
                                bg="gray.50"
                                _dark={{ bg: "#121212" }}
                                textAlign="center"
                            >
                                {error && <Text color="red.500">{error}</Text>}
                                {success && <Text color="green.500">{success}</Text>}
                            </Box>
                        </chakra.form>

                    </GridItem>
                </SimpleGrid>
            </Box>
        </Box>
    );
};

export default EditUserDetailsForm;
