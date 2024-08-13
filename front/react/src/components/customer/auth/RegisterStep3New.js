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
import TextComponent from "../../common/text/Text";
import Button from "../../common/buttons/Button";
import Countries from "./Countries";

const RegisterStep3Form = ({
                               street, setStreet, city, setCity, postalCode, setPostalCode,
                               country, setCountry, unitNo, setUnitNo, handlePrevious, handleNext
                           }) => {
    const [streetError, setStreetError] = useState('');
    const [cityError, setCityError] = useState('');
    const [postalCodeError, setPostalCodeError] = useState('');
    const [unitNoError, setUnitNoError] = useState('');
    const toast = useToast();

    const handleBlur = (value, setError, fieldName, maxLength) => {
        if (value.length > maxLength) {
            setError(`${fieldName} cannot exceed ${maxLength} characters.`);
            toast({
                title: `Invalid ${fieldName}`,
                description: `${fieldName} cannot exceed ${maxLength} characters.`,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
        } else {
            setError('');
        }
    };

    const handlePostalCodeChange = (e) => {
        const value = e.target.value;
        const numericValue = value.replace(/\D/g, '');
        setPostalCode(numericValue);
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
                            <TextComponent
                                mt={1}
                                fontSize="2xl"
                                color="gray.600"
                                _dark={{ color: "gray.400" }}
                            >
                                We're half way there.
                            </TextComponent>
                            <TextComponent
                                mt={1}
                                fontSize="xl"
                                color="gray.600"
                                _dark={{ color: "gray.400" }}
                            >
                                Welcome to our platform! To get started, please fill out the registration form. We value your privacy and ensure that your information is kept secure.
                            </TextComponent>
                        </Box>
                    </GridItem>
                    <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
                        <chakra.form
                            onSubmit={handleNext}
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
                                            City
                                        </FormLabel>

                                        <InputGroup size="sm">
                                            <Input
                                                type="text"
                                                value={city}
                                                placeholder="required"
                                                onChange={(e) => setCity(e.target.value)}
                                                onBlur={(e) => handleBlur(e.target.value, setCityError, 'City', 50)}
                                                focusBorderColor="brand.400"
                                                rounded="md"
                                                required
                                            />
                                        </InputGroup>
                                        {cityError && (
                                            <Text color="red.500" fontSize="sm" mt={2}>
                                                {cityError}
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
                                            Unit Number
                                        </FormLabel>

                                        <InputGroup size="sm">
                                            <Input
                                                type="text"
                                                value={unitNo}
                                                placeholder="required"
                                                onChange={(e) => setUnitNo(e.target.value)}
                                                onBlur={(e) => handleBlur(e.target.value, setUnitNoError, 'Unit Number', 10)}
                                                focusBorderColor="brand.400"
                                                rounded="md"
                                                required
                                            />
                                        </InputGroup>
                                        {unitNoError && (
                                            <Text color="red.500" fontSize="sm" mt={2}>
                                                {unitNoError}
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
                                            Street
                                        </FormLabel>

                                        <InputGroup size="sm">
                                            <Input
                                                type="text"
                                                value={street}
                                                placeholder="required"
                                                onChange={(e) => setStreet(e.target.value)}
                                                onBlur={(e) => handleBlur(e.target.value, setStreetError, 'Street', 50)}
                                                focusBorderColor="brand.400"
                                                rounded="md"
                                                required
                                            />
                                        </InputGroup>
                                        {streetError && (
                                            <Text color="red.500" fontSize="sm" mt={2}>
                                                {streetError}
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
                                            Postal Code
                                        </FormLabel>

                                        <InputGroup size="sm">
                                            <Input
                                                type="text"
                                                value={postalCode}
                                                placeholder="Enter numeric postal code"
                                                onChange={handlePostalCodeChange}
                                                onBlur={(e) => handleBlur(e.target.value, setPostalCodeError, 'Postal Code', 10)}
                                                focusBorderColor="brand.400"
                                                rounded="md"
                                                required
                                            />
                                        </InputGroup>
                                        {postalCodeError && (
                                            <Text color="red.500" fontSize="sm" mt={2}>
                                                {postalCodeError}
                                            </Text>
                                        )}
                                    </FormControl>

                                    <FormControl as={GridItem} colSpan={[3, 2]}>
                                        <FormLabel fontSize="md" fontWeight="md" color="gray.700" _dark={{ color: "gray.50" }}>
                                            Country
                                        </FormLabel>
                                        <Select
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}
                                            placeholder="Select country"
                                            focusBorderColor="brand.400"
                                            rounded="md"
                                            required
                                        >
                                            {Countries.map((country) => (
                                                <option key={country} value={country}>
                                                    {country}
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

export default RegisterStep3Form;
