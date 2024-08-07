import React from 'react';
import FreeFormField from "../../../components/common/inputFields/FreeFormField";
import {Button} from "@chakra-ui/react";

const RegisterStep2 = ({
                           mobileNumber, setMobileNumber, firstName, setFirstName, lastName, setLastName,
                           nationality, setNationality, handlePrevious, handleNext
                       }) => {
    return (
        <form onSubmit={handleNext}>
            <FreeFormField
                label="Mobile Number"
                type="text"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
            />
            <FreeFormField
                label="First Name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
            />
            <FreeFormField
                label="Last Name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
            />
            <FreeFormField
                label="Nationality"
                type="text"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                required
            />
            <Button type="button" onClick={handlePrevious} variant="outline" colorScheme="gray" size="md" mr={4}>
                Previous
            </Button>
            <Button type="submit" variant="solid" colorScheme="blue" size="md">
                Next
            </Button>
        </form>
    );
};

export default RegisterStep2;
