import React, {useEffect, useState} from 'react';
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
} from '@chakra-ui/react';

import useAddress from "../../../../hooks/useAddress";
import AddressService from "../../../../services/AddressService";
import Heading from "../../../../components/common/text/Heading";
import Text from "../../../../components/common/text/Text";
import Button from "../../../../components/common/buttons/Button";
import Autocomplete from "../../../../components/feature/Autocomplete";
import Countries from "../../../../components/customer/auth/Countries";

const EditAddressDetailsForm = () => {
    const { address, getAddress } = useAddress();
    const [addressValues, setAddressValues] = useState(address);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        setAddressValues(address);
    }, [address]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAddressValues({ ...addressValues, [name]: value });
    };

    const handleAddressUpdate = async () => {
        try {
            // todo: add more robust validation
            if (!addressValues) {
                alert('You have no address to update.');
                return;
            }

            await AddressService.updateAddress(addressValues);
            getAddress();
            setSuccess('Address updated successfully');
            setError('');
        } catch (error) {
            console.error('Error updating address', error);
            setError('Error updating mobile number');
            setSuccess('');
        }
    };

    return (
        <Box
            bg="brand.600"
            _dark={{ bg: "#111" }}
            p={10}
        >
            <Box
                bg="brand.400"
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
                            <Heading color="brand.100" fontSize="5xl" fontWeight="md" lineHeight="10">
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
                                            City
                                        </FormLabel>

                                        <InputGroup size="sm">
                                            <Input
                                                type="text"
                                                name="city"
                                                value={addressValues.city}
                                                placeholder="Enter city"
                                                onChange={handleInputChange}
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
                                            Unit Number
                                        </FormLabel>

                                        <InputGroup size="sm">
                                            <Input
                                                type="text"
                                                name="unitNo"
                                                value={addressValues.unitNo}
                                                placeholder="Enter unit number"
                                                onChange={handleInputChange}
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
                                            Street
                                        </FormLabel>

                                        <InputGroup size="sm">
                                            <Input
                                                type="text"
                                                name="street"
                                                value={addressValues.street}
                                                placeholder="required"
                                                onChange={handleInputChange}
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
                                            Postal Code
                                        </FormLabel>

                                        <InputGroup size="sm">
                                            <Input
                                                type="text"
                                                name="postalCode"
                                                value={addressValues.postalCode}
                                                placeholder="Enter your postal code"
                                                onChange={handleInputChange}
                                                focusBorderColor="brand.400"
                                                rounded="md"
                                                required
                                            />
                                        </InputGroup>
                                    </FormControl>

                                    <FormControl as={GridItem} colSpan={[3, 2]}>
                                        <FormLabel fontSize="md" fontWeight="md" color="gray.700" _dark={{ color: "gray.50" }}>
                                            Country
                                        </FormLabel>
                                        <Autocomplete
                                            name="country"
                                            value={addressValues.country}
                                            onChange={handleInputChange}
                                            category={Countries}
                                        />
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
                                    onClick={handleAddressUpdate}
                                    type="button"
                                    colorScheme="brand"
                                    _focus={{ shadow: "" }}
                                    fontWeight="md"
                                >
                                    Update
                                </Button>
                                {/* change this to toast / alert */}
                                {error && <p style={{ color: 'red' }}>{error}</p>}
                                {success && <p style={{ color: 'green' }}>{success}</p>}
                            </Box>
                        </chakra.form>
                    </GridItem>
                </SimpleGrid>
            </Box>
        </Box>
    );
};

export default EditAddressDetailsForm;