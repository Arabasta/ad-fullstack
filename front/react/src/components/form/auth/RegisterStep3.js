import React from 'react';
import { FormControl, FormLabel, Input, Button, Stack, Flex } from '@chakra-ui/react';

const RegisterStep3 = ({
                           street, setStreet, city, setCity, postalCode, setPostalCode,
                           country, setCountry, unitNo, setUnitNo, handlePrevious, handleNext
                       }) => {
    return (
        <Stack spacing={4}>
            <FormControl>
                <FormLabel>Street</FormLabel>
                <Input
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                />
            </FormControl>
            <FormControl>
                <FormLabel>City</FormLabel>
                <Input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
            </FormControl>
            <FormControl>
                <FormLabel>Postal Code</FormLabel>
                <Input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                />
            </FormControl>
            <FormControl>
                <FormLabel>Country</FormLabel>
                <Input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
            </FormControl>
            <FormControl>
                <FormLabel>Unit No</FormLabel>
                <Input
                    type="text"
                    value={unitNo}
                    onChange={(e) => setUnitNo(e.target.value)}
                />
            </FormControl>
            <Flex justify="space-between">
                <Button onClick={handlePrevious} colorScheme="teal" variant="outline">Previous</Button>
                <Button onClick={handleNext} colorScheme="teal" type="button">Next</Button>
            </Flex>
        </Stack>
    );
};

export default RegisterStep3;
