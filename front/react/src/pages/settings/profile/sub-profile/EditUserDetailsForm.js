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

    const handleMobileNumberChange = (e) => {
        const number = e.target.value.replace(/\D/g, ''); // just allow input numbers
        setMobileNumber(number);
    };

    const handleUpdateMobileNumber = async () => {
        // 清除之前的消息
        setError('');
        setSuccess('');

        const fullNumber = `${countryCode}${mobileNumber}`;
        if (fullNumber.length < 7 || fullNumber.length > 15) {
            setError('Mobile number length must be between 7 and 15 digits.');
            return;
        }

        try {
            await updateMobileNumber(fullNumber);
            setSuccess('Mobile number updated successfully');
        } catch (error) {
            console.error('Error updating mobile number', error);
            setError('Error updating mobile number');
        }
    };

    const handleUpdateEmail = async () => {
        // 清除之前的消息
        setError('');
        setSuccess('');

        try {
            await UserService.updateEmail({ email });
            setSuccess('Email updated successfully');

            if (updateUser) {
                updateUser({ ...user, email });
            }
        } catch (error) {
            console.error('Error updating email', error);
            setError('Error updating email');
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
                                        <Button
                                            type="button"
                                            onClick={handleUpdateEmail}
                                            colorScheme="brand"
                                            _focus={{ shadow: "" }}
                                            fontWeight="md"
                                            mt={4}
                                        >
                                            Update
                                        </Button>
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
                                                placeholder={"Enter numeric phone number"}
                                                value={mobileNumber}
                                                onChange={handleMobileNumberChange}
                                                borderColor="brand.300"
                                                focusBorderColor="brand.400"
                                                rounded="md"
                                            />
                                        </InputGroup>

                                        <Button
                                            type="button"
                                            onClick={handleUpdateMobileNumber}
                                            colorScheme="brand"
                                            _focus={{ shadow: "" }}
                                            fontWeight="md"
                                            mt={4}

                                        >
                                            Update
                                        </Button>

                                        {error && <Text color="red.500" mt={2}>{error}</Text>}
                                        {success && <Text color="green.500" mt={2}>{success}</Text>}
                                    </FormControl>
                                </SimpleGrid>
                            </Stack>
                            <Box
                                px={{ base: 4, sm: 6 }}
                                py={3}
                                bg="gray.50"
                                _dark={{ bg: "#121212" }}
                                textAlign="left"
                            >
                                <Link to="/settings/profile">
                                    <Button
                                        colorScheme="brand"
                                        _focus={{ shadow: "" }}
                                        fontWeight="md">
                                        Return
                                    </Button>
                                </Link>
                            </Box>
                        </chakra.form>
                    </GridItem>
                </SimpleGrid>
            </Box>
        </Box>
    );
};

export default EditUserDetailsForm;
