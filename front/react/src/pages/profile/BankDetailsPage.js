import React from 'react';
import { Box } from '@chakra-ui/react';
import EditBankDetailsForm from "../settings/bank/EditBankDetailsForm";
import Heading from "../../components/common/text/Heading";

const BankDetailsPage = () => {
    return (
        <Box p={6}>
            <Heading variant="h2" color="white" textAlign="center" mb={4}>Bank Details</Heading>
            <EditBankDetailsForm />
        </Box>
    );
};

export default BankDetailsPage;
