import React from 'react';
import { FormControl, FormLabel, Input, Button, Stack, Flex } from '@chakra-ui/react';

const RegisterStep2 = ({
                           mobileNumber, setMobileNumber, firstName, setFirstName, lastName, setLastName,
                           nationality, setNationality, handlePrevious, handleNext
                       }) => {
    return (
        <Stack spacing={4}>
            <FormControl>
                <FormLabel>Mobile Number</FormLabel>
                <Input
                    type="text"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                />
            </FormControl>
            <FormControl>
                <FormLabel>First Name</FormLabel>
                <Input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </FormControl>
            <FormControl>
                <FormLabel>Last Name</FormLabel>
                <Input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </FormControl>
            <FormControl>
                <FormLabel>Nationality</FormLabel>
                <Input
                    type="text"
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                />
            </FormControl>
            <Flex justify="space-between">
                <Button onClick={handlePrevious} colorScheme="teal" variant="outline">Previous</Button>
                <Button onClick={handleNext} colorScheme="teal" type="button">Next</Button>
            </Flex>
        </Stack>
    );
};

export default RegisterStep2;
