import React, { useState, useEffect } from 'react';
import { VStack, HStack, Box, useToast } from '@chakra-ui/react';
import useBankDetails from "../../../hooks/useBankDetails";
import ButtonRed from "../../../components/common/buttons/ButtonRed";
import PurpleBoxCard from "../../../components/common/cards/PurpleBoxCard";
import ButtonBlack from "../../../components/common/buttons/ButtonBlack";
import InputBoxWhite from "../../../components/common/inputFields/InputBoxWhite";
import Text from "../../../components/common/text/Text";

import CallToActionSection from "../../../admin/component/sections/CallToActionSection";

const EditBankDetailsForm = ({ initialDetails = null }) => {
    const { bankDetails, getBankDetails, updateBankDetails } = useBankDetails();
    const toast = useToast();
    const [isEditing, setIsEditing] = useState(false);
    const [details, setDetails] = useState({
        bankName: '',
        accountNumber: '',
        accountHolderName: '',
    });

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSave = async () => {
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
            <CallToActionSection title="Bank Details" subtitle="Easy and fuss free transactions">>
                    <PurpleBoxCard align="stretch" maxW="800px" w="100%">
                        <VStack spacing={6} align="stretch">
                            {!isEditing ? (
                                <>
                                    <Box>
                                        <HStack p={5} justifyContent="space-between">
                                            <Text fontSize="xl" flex="1">Bank Name:</Text>
                                            <Text fontSize="xl" flex="2">{details.bankName}</Text>
                                        </HStack>
                                        <HStack p={5} justifyContent="space-between">
                                            <Text fontSize="xl" flex="1">Account Number:</Text>
                                            <Text fontSize="xl" flex="2">{details.accountNumber}</Text>
                                        </HStack>
                                        <HStack p={5} justifyContent="space-between">
                                            <Text fontSize="xl" flex="1">Full Name:</Text>
                                            <Text fontSize="xl" flex="2">{details.accountHolderName}</Text>
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
                                        />
                                        <Text>Account Number</Text>
                                        <InputBoxWhite
                                            name="accountNumber"
                                            value={details.accountNumber}
                                            onChange={handleInputChange}
                                            placeholder="Account Number"
                                            p={4}
                                            fontSize="lg"
                                        />
                                        <Text>Account Holder Name</Text>
                                        <InputBoxWhite
                                            name="accountHolderName"
                                            value={details.accountHolderName}
                                            onChange={handleInputChange}
                                            placeholder="Full Name"
                                            p={4}
                                            fontSize="lg"
                                        />
                                    </VStack>
                                    <HStack justify="space-between">
                                        <ButtonRed onClick={handleCancelClick} flex="1" ml={2}>Cancel</ButtonRed>
                                        <ButtonBlack onClick={handleSave} flex="1" mr={2}>Save</ButtonBlack>
                                    </HStack>
                                </>
                            )}
                        </VStack>
                    </PurpleBoxCard>
            </CallToActionSection>

    );
};

export default EditBankDetailsForm;
