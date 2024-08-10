import React from 'react';
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
} from '@chakra-ui/react';

import Heading from "../../common/text/Heading";
import Text from "../../common/text/Text";
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
    const handleMobileNumberChange = (e) => {
        const number = e.target.value.replace(/\D/g, ''); // only can input numbers
        setMobileNumber(number);
    };

    const handleCountryCodeChange = (e) => {
        const code = e.target.value;
        setCountryCode(code);

        setMobileNumber(prev => prev.replace(/^\+\d+/, ''));
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
                            <Text
                                mt={1}
                                fontSize="2xl"
                                color="gray.600"
                                _dark={{ color: "gray.400" }}
                            >
                                Let's start.
                            </Text>
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
                            <Box
                                px={{ base: 4, sm: 6 }}
                                py={3}
                                bg="gray.50"
                                _dark={{ bg: "#121212" }}
                                textAlign="right"
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

                            </Box>

                        </chakra.form>

                    </GridItem>
                </SimpleGrid>
            </Box>
        </Box>
    );
};

export default RegisterStep2Form;
