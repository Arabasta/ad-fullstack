import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import useBankDetails from '../../hooks/useBankDetails';
import BankDetailsForm from "../../components/form/customerDetails/BankDetailsForm";

const BankDetailsPage = () => {
    const { updateBankDetails } = useBankDetails();

    const handleSaveBankDetails = async (details) => {
        await updateBankDetails(details);
        alert('Bank details updated successfully');
    };

    return (
        <Box p={6}>
            <Heading variant="h2" color="white" textAlign="center" mb={4}>Bank Details</Heading>
            <BankDetailsForm onSave={handleSaveBankDetails} />
        </Box>
    );
};

export default BankDetailsPage;
