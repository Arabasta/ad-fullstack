import React from 'react';
import FreeFormField from "../inputFields/FreeFormField";
import {Button} from "@chakra-ui/react";

const RegisterStep3 = ({
                           street, setStreet, city, setCity, postalCode, setPostalCode,
                           country, setCountry, unitNo, setUnitNo, handlePrevious, handleNext
                       }) => {
    return (
        <form onSubmit={handleNext}>
            <FreeFormField
                label="Street"
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder="Enter your street"
                required
            />
            <FreeFormField
                label="City"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter your city"
                required
            />
            <FreeFormField
                label="Postal Code"
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="Enter your postal code"
                required
            />
            <FreeFormField
                label="Country"
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Enter your country"
                required
            />
            <FreeFormField
                label="Unit No"
                type="text"
                value={unitNo}
                onChange={(e) => setUnitNo(e.target.value)}
                placeholder="Enter your unit number"
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

export default RegisterStep3;