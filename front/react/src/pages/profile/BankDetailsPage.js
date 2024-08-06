import React from 'react';
import { Box } from '@chakra-ui/react';
import BankDetailsForm from "../../components/form/customerDetails/BankDetailsForm";
import Heading from "../../components/common/text/Heading";

const BankDetailsPage = () => {
    return (
        <Box p={6}>
            <Heading variant="h2" color="white" textAlign="center" mb={4}>Bank Details</Heading>
            <BankDetailsForm />
        </Box>
    );
};

export default BankDetailsPage;
