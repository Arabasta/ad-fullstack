import React from 'react';
import { Stack, FormControl, FormLabel, Input, Button, Heading, ButtonGroup, Select, Tooltip } from '@chakra-ui/react';

const RegisterStep3 = ({
                           street, setStreet, city, setCity, postalCode, setPostalCode,
                           country, setCountry, unitNo, setUnitNo, handlePrevious, handleNext
                       }) => {
    const countries = [
        "United States",
        "Canada",
        "United Kingdom",
        "Australia",
        "India",
        "Singapore",
        "Germany",
        "France",
        "China",
        "Japan",
        "South Korea",
        "Brazil",
        "South Africa",
        "Mexico",
        "Russia",
    ];

    return (
        <Stack spacing={6}>
            <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
                Address Details
            </Heading>
            <FormControl id="street" isRequired>
                <FormLabel>Street Address</FormLabel>
                <Tooltip label="Enter your block, street, building, etc." fontSize="md">
                    <Input
                        type="text"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        placeholder="123 Main St"
                        _placeholder={{ color: 'gray.400' }}
                    />
                </Tooltip>
            </FormControl>
            <FormControl id="city" isRequired>
                <FormLabel>City</FormLabel>
                <Tooltip label="Enter your city" fontSize="md">
                    <Input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="New York"
                        _placeholder={{ color: 'gray.400' }}
                    />
                </Tooltip>
            </FormControl>
            <FormControl id="postalCode" isRequired>
                <FormLabel>Postal Code</FormLabel>
                <Tooltip label="Enter your postal code" fontSize="md">
                    <Input
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        placeholder="123456"
                        _placeholder={{ color: 'gray.400' }}
                    />
                </Tooltip>
            </FormControl>
            <FormControl id="country" isRequired>
                <FormLabel>Country</FormLabel>
                <Tooltip label="Select your country" fontSize="md">
                    <Select
                        value={country || "Singapore"}
                        onChange={(e) => setCountry(e.target.value)}
                    >
                        {countries.map(country => (
                            <option key={country} value={country}>{country}</option>
                        ))}
                    </Select>
                </Tooltip>
            </FormControl>
            <FormControl id="unitNo" isRequired>
                <FormLabel>Unit Number</FormLabel>
                <Tooltip label="Enter your unit number" fontSize="md">
                    <Input
                        type="text"
                        value={unitNo}
                        onChange={(e) => setUnitNo(e.target.value)}
                        placeholder="Apt 4B"
                        _placeholder={{ color: 'gray.400' }}
                    />
                </Tooltip>
            </FormControl>
            <ButtonGroup mt="5%" w="100%">
                <Button onClick={handlePrevious} colorScheme="teal" variant="solid" w="7rem" mr="5%">
                    Back
                </Button>
                <Button onClick={handleNext} colorScheme="teal" variant="outline" w="7rem">
                    Next
                </Button>
            </ButtonGroup>
        </Stack>
    );
};

export default RegisterStep3;
