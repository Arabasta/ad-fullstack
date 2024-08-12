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
    Select,
    Flex,
    useToast,
    Text
} from '@chakra-ui/react';

import Heading from "../../common/text/Heading";
import Button from "../../common/buttons/Button";
import Nationalities from "./Nationalities";
import CountryCodes from './CountryCodes';

const RegisterStep2Form = ({
                               mobileNumber, setMobileNumber,
                               countryCode, setCountryCode,
                               firstName, setFirstName,
                               lastName, setLastName,
                               nationality, setNationality,
                               handlePrevious, handleNext,
                           }) => {
    const [mobileNumberError, setMobileNumberError] = useState('');
    const toast = useToast();

    const handleMobileNumberChange = (e) => {
        const number = e.target.value.replace(/\D/g, ''); // 仅允许输入数字
        setMobileNumber(number);
    };

    const handleMobileNumberBlur = () => {
        const fullNumber = `${countryCode}${mobileNumber}`;
        if (fullNumber.length < 7 || fullNumber.length > 15) {
            setMobileNumberError('Mobile number length must be between 7 and 15 digits.');
            toast({
                title: "Invalid Mobile Number",
                description: "Mobile number length must be between 7 and 15 digits.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
        } else {
            setMobileNumberError('');
        }
    };

    const handleCountryCodeChange = (e) => {
        const code = e.target.value;
        setCountryCode(code);

        setMobileNumber(prev => prev.replace(/^\+\d+/, ''));
    };

    const handleNextStep = (e) => {
        e.preventDefault(); // 确保 preventDefault() 调用成功
        if (mobileNumberError) {
            toast({
                title: "Invalid Mobile Number",
                description: "Please correct the mobile number before proceeding.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
            return;
        }
        const fullNumber = `${countryCode}${mobileNumber}`;
        if (fullNumber.length >= 7 && fullNumber.length <= 15) {
            handleNext();
        } else {
            toast({
                title: "Invalid Mobile Number",
                description: "Mobile number length must be between 7 and 15 digits.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
        }
    };

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
                                Register
                            </Heading>
                        </Box>
                    </GridItem>
                    <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
                        <chakra.form
                            onSubmit={(e) => handleNextStep(e)} // 确保事件对象被传递
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
                                            Mobile Number
                                        </FormLabel>

                                        <InputGroup size="sm">
                                            <Select
                                                value={countryCode}
                                                onChange={handleCountryCodeChange}
                                                focusBorderColor="brand.400"
                                                rounded="md"
                                                width="500px"
                                                mr={2}
                                                required
                                            >
                                                {CountryCodes.map((country) => (
                                                    <option key={country.code} value={country.code}>
                                                        {country.label}
                                                    </option>
                                                ))}
                                            </Select>
                                            <Input
                                                type="tel"
                                                value={mobileNumber}
                                                placeholder="Enter numeric phone number"
                                                onChange={handleMobileNumberChange}
                                                onBlur={handleMobileNumberBlur}
                                                focusBorderColor="brand.400"
                                                rounded="md"
                                                required
                                            />
                                        </InputGroup>
                                        {mobileNumberError && (
                                            <Text color="red.500" fontSize="sm" mt={2}>
                                                {mobileNumberError}
                                            </Text>
                                        )}
                                    </FormControl>

                                    <FormControl as={GridItem} colSpan={[3, 2]}>
                                        <FormLabel
                                            fontSize="md"
                                            fontWeight="md"
                                            color="gray.700"
                                            _dark={{ color: "gray.50" }}
                                        >
                                            First Name
                                        </FormLabel>

                                        <InputGroup size="sm">
                                            <Input
                                                type="text"
                                                value={firstName}
                                                placeholder="required"
                                                onChange={(e) => setFirstName(e.target.value)}
                                                focusBorderColor="brand.400"
                                                rounded="md"
                                                required
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
                                            Last Name
                                        </FormLabel>

                                        <InputGroup size="sm">
                                            <Input
                                                type="text"
                                                value={lastName}
                                                placeholder="required"
                                                onChange={(e) => setLastName(e.target.value)}
                                                focusBorderColor="brand.400"
                                                rounded="md"
                                                required
                                            />
                                        </InputGroup>
                                    </FormControl>

                                    <FormControl as={GridItem} colSpan={[3, 2]}>
                                        <FormLabel fontSize="md" fontWeight="md" color="gray.700" _dark={{ color: "gray.50" }}>
                                            Nationality
                                        </FormLabel>
                                        <Select
                                            value={nationality}
                                            onChange={(e) => setNationality(e.target.value)}
                                            placeholder="Select nationality"
                                            focusBorderColor="brand.400"
                                            rounded="md"
                                            required
                                        >
                                            {Nationalities.map((nation) => (
                                                <option key={nation} value={nation}>
                                                    {nation}
                                                </option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </SimpleGrid>
                            </Stack>
                            <Flex
                                px={{ base: 4, sm: 6 }}
                                py={3}
                                bg="gray.50"
                                _dark={{ bg: "#121212" }}
                                justifyContent="space-between"
                            >
                                <Button
                                    type="button"
                                    onClick={handlePrevious}
                                    colorScheme="brand"
                                    _focus={{ shadow: "" }}
                                    fontWeight="md"
                                >
                                    Back
                                </Button>
                                <Button
                                    type="submit"
                                    onClick={handleNext}
                                    colorScheme="brand"
                                    _focus={{ shadow: "" }}
                                    fontWeight="md"
                                >
                                    Next
                                </Button>
                            </Flex>
                        </chakra.form>
                    </GridItem>
                </SimpleGrid>
            </Box>
        </Box>
    );
};

export default RegisterStep2Form;
