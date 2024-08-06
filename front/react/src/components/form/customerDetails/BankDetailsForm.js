import React, { useState, useEffect } from 'react';
import { VStack, HStack, Box, Text } from '@chakra-ui/react';
import useBankDetails from "../../../hooks/useBankDetails";
import ButtonRed from "../../common/buttons/ButtonRed";
import GrayBoxCard from "../../common/cards/GrayBoxCard";
import ButtonBlack from "../../common/buttons/ButtonBlack";
import InputBoxWhite from "../../common/inputFields/InputBoxWhite";

const BankDetailsForm = ({ onSave, initialDetails = null }) => {
    const { bankDetails, getBankDetails } = useBankDetails();
    const [details, setDetails] = useState({
        bankName: '',
        accountNumber: '',
        accountHolderName: '',
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const loadBankDetails = async () => {
            if (!initialDetails && !bankDetails) {
                await getBankDetails();
            }
        };

        loadBankDetails();
    }, [initialDetails, getBankDetails]);

    useEffect(() => {
        if (bankDetails) {
            setDetails({
                bankName: bankDetails.bankName || '',
                accountNumber: bankDetails.accountNumber || '',
                accountHolderName: bankDetails.accountHolderName || '',
            });
        } else if (initialDetails) {
            setDetails(initialDetails);
        }
    }, [initialDetails, bankDetails]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSave = () => {
        onSave(details);
        setIsEditing(false);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    return (
        <GrayBoxCard>
            <VStack spacing={6} align="stretch">
                {!isEditing ? (
                    <>
                        <Box>
                            <HStack justifyContent="space-between">
                                <Text flex="1">Bank Name:</Text>
                                <Text flex="2">{details.bankName}</Text>
                            </HStack>
                            <HStack justifyContent="space-between">
                                <Text flex="1">Account Number:</Text>
                                <Text flex="2">{details.accountNumber}</Text>
                            </HStack>
                            <HStack justifyContent="space-between">
                                <Text flex="1">Full Name:</Text>
                                <Text flex="2">{details.accountHolderName}</Text>
                            </HStack>
                        </Box>
                        <ButtonBlack w="full" onClick={handleEditClick}>Edit</ButtonBlack>
                    </>
                ) : (
                    <>
                        <VStack spacing={4} align="stretch">
                            <Box>
                                <Text>Bank Name</Text>
                                <InputBoxWhite
                                    name="bankName"
                                    value={details.bankName}
                                    onChange={handleInputChange}
                                    placeholder="Bank Name"
                                    p={4}
                                    fontSize="lg"
                                />
                            </Box>
                            <Box>
                                <Text>Account Number</Text>
                                <InputBoxWhite
                                    name="accountNumber"
                                    value={details.accountNumber}
                                    onChange={handleInputChange}
                                    placeholder="Account Number"
                                    p={4}
                                    fontSize="lg"
                                />
                            </Box>
                            <Box>
                                <Text>Account Holder Name</Text>
                                <InputBoxWhite
                                    name="accountHolderName"
                                    value={details.accountHolderName}
                                    onChange={handleInputChange}
                                    placeholder="Full Name"
                                    p={4}
                                    fontSize="lg"
                                />
                            </Box>
                        </VStack>
                        <HStack justify="space-between">
                            <ButtonRed onClick={handleCancelClick} flex="1" ml={2}>Cancel</ButtonRed>
                            <ButtonBlack onClick={handleSave} flex="1" mr={2}>Save</ButtonBlack>

                        </HStack>
                    </>
                )}
            </VStack>
        </GrayBoxCard>
    );
};

export default BankDetailsForm;
