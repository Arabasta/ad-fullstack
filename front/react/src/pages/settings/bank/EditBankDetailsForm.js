import React, { useState, useEffect } from 'react';
import { VStack, HStack, Box, useToast } from '@chakra-ui/react';
import useBankDetails from "../../../hooks/useBankDetails";
import ButtonRed from "../../../components/common/buttons/ButtonRed";
import GrayBoxCard from "../../../components/common/cards/GrayBoxCard";
import ButtonBlack from "../../../components/common/buttons/ButtonBlack";
import InputBoxWhite from "../../../components/common/inputFields/InputBoxWhite";
import Text from "../../../components/common/text/Text";

// Add validation and auto-format for account number
const EditBankDetailsForm = ({ initialDetails = null }) => {
    const { bankDetails, getBankDetails, updateBankDetails } = useBankDetails();
    const toast = useToast();
    const [isEditing, setIsEditing] = useState(false);
    const [details, setDetails] = useState({
        bankName: '',
        accountNumber: '',
        accountHolderName: '',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const loadBankDetails = async () => {
            if (!initialDetails && !bankDetails) {
                await getBankDetails();
            }
        };

        loadBankDetails();
    }, [initialDetails, getBankDetails, bankDetails]);

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

    const formatAccountNumber = (value) => {
        // Auto-format the account number with hyphens, e.g., "1234-56789" or "12-3456-7890"
        return value
            .replace(/\D/g, '') // Remove all non-digit characters
            .replace(/(\d{4})(\d{1,4})(\d{1,3})?/, (match, p1, p2, p3) => {
                return [p1, p2, p3].filter(Boolean).join('-');
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'accountNumber') {
            setDetails((prevDetails) => ({
                ...prevDetails,
                [name]: formatAccountNumber(value),
            }));
        } else {
            setDetails((prevDetails) => ({
                ...prevDetails,
                [name]: value,
            }));
        }
    };

    const validate = () => {
        let errors = {};

        if (!details.bankName) {
            errors.bankName = "Bank name is required.";
        } else if (details.bankName.length > 20) {
            errors.bankName = "Bank name must not exceed 20 characters.";
        }

        if (!details.accountNumber) {
            errors.accountNumber = "Account number is required.";
        } else {
            const accountNumberDigits = details.accountNumber.replace(/\D/g, ''); // Remove hyphens and check digits only
            if (accountNumberDigits.length < 7 || accountNumberDigits.length > 11) {
                errors.accountNumber = "Account number must be between 7 and 11 digits.";
            } else if (!/^\d+$/.test(accountNumberDigits)) {
                errors.accountNumber = "Account number must contain only digits.";
            }
        }

        if (!details.accountHolderName) {
            errors.accountHolderName = "Account holder name is required.";
        } else if (details.accountHolderName.length > 50) {
            errors.accountHolderName = "Account holder name must not exceed 50 characters.";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSave = async () => {
        if (!validate()) {
            toast({
                title: "Please correct the errors before saving.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        await updateBankDetails(details);
        toast({
            title: "Bank Details Saved",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
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
                            <HStack p={5} justifyContent="space-between">
                                <Text flex="1">Bank Name:</Text>
                                <Text fontSize="lg" flex="2">{details.bankName}</Text>
                            </HStack>
                            <HStack p={5} justifyContent="space-between">
                                <Text flex="1">Account Number:</Text>
                                <Text fontSize="lg" flex="2">{details.accountNumber}</Text>
                            </HStack>
                            <HStack p={5} justifyContent="space-between">
                                <Text flex="1">Full Name:</Text>
                                <Text fontSize="lg" flex="2">{details.accountHolderName}</Text>
                            </HStack>
                        </Box>
                        <ButtonBlack w="full" onClick={handleEditClick}>Edit</ButtonBlack>
                    </>
                ) : (
                    <>
                        <VStack spacing={4} align="stretch">
                            <Text>Bank Name</Text>
                            <InputBoxWhite
                                name="bankName"
                                value={details.bankName}
                                onChange={handleInputChange}
                                placeholder="Bank Name"
                                p={4}
                                fontSize="lg"
                                isInvalid={!!errors.bankName}
                            />
                            {errors.bankName && <Text color="red.500">{errors.bankName}</Text>}

                            <Text>Account Number</Text>
                            <InputBoxWhite
                                name="accountNumber"
                                value={details.accountNumber}
                                onChange={handleInputChange}
                                placeholder="Account Number"
                                p={4}
                                fontSize="lg"
                                isInvalid={!!errors.accountNumber}
                            />
                            {errors.accountNumber && <Text color="red.500">{errors.accountNumber}</Text>}

                            <Text>Account Holder Name</Text>
                            <InputBoxWhite
                                name="accountHolderName"
                                value={details.accountHolderName}
                                onChange={handleInputChange}
                                placeholder="Full Name"
                                p={4}
                                fontSize="lg"
                                isInvalid={!!errors.accountHolderName}
                            />
                            {errors.accountHolderName && <Text color="red.500">{errors.accountHolderName}</Text>}
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

export default EditBankDetailsForm;
