import React, { useState } from 'react';
import WalletService from '../../services/WalletService';
import { Modal } from '../common/modal/Modal';
import { VStack, Box, HStack, useToast } from '@chakra-ui/react';
import ButtonBlack from "../common/buttons/ButtonBlack";
import BlackText from "../common/text/BlackText";
import useBankDetails from '../../hooks/useBankDetails';
import { CheckCircleIcon } from '@chakra-ui/icons';
import BoxBorderGray from "../common/modal/Box-BorderGray";
import RedText from "../common/text/RedText";
import InputBoxWhiteExtraLarge from "../common/inputFields/InputBoxWhiteExtraLarge";
import { useNavigate } from 'react-router-dom';
import Heading from "../common/text/Heading";

// Used to deposit or withdraw funds from the user's wallet
// Used in the WalletPage component
//   - uses the WalletService to perform the deposit or withdrawal
//   - uses the useBankDetails hook to get the user's bank details
//   - uses the useToast hook to display a toast message
//   - uses the useNavigate hook to navigate to the Bank Details Page if bank details are incomplete
//   - uses Chakra UI icon
const WalletAction = ({ type, onActionComplete }) => {
    const [step, setStep] = useState(1);
    const [error, setError] = useState(''); // Used to display error messages (from backend and frontend validation)
    const [amount, setAmount] = useState('');
    const toast = useToast(); // Used to display toast messages
    const navigate = useNavigate(); // Used to navigate to Bank Details Page if bank details are incomplete
    const { bankDetails, getBankDetails } = useBankDetails();

    // Used to set the modal title and action text based on the type (deposit or withdraw)
    const isDeposit = type === 'deposit';
    const modalTitle = isDeposit ? 'Deposit' : 'Withdraw';
    const actionText = isDeposit ? 'Deposit' : 'Withdraw';

    // passed into the Modal component as the onOpen prop (additional open logic)
    // for custom open behavior when the modal is opened
    const handleModalOpen = async () => {
        await getBankDetails();
        // If bank details incomplete, display toast if no current toast
        if (!bankDetails || !bankDetails.bankName || !bankDetails.accountNumber || !bankDetails.accountHolderName) {
            if (!toast.isActive('bankDetailsToast')) {
                toast({
                    id: 'bankDetailsToast', // only needed cause have redirection i think
                    title: "Incomplete Bank Details",
                    description: "Please complete your bank details to proceed. Redirecting...",
                    status: "error",
                    duration: 1000,
                    isClosable: true,
                });
                // Redirect to Bank Details Page after 1 seconds
                setTimeout(() => {
                    navigate('/settings/profile/bankDetails');
                }, 1000);
            }
        }
    };

    // passed into Modal to reset fields when modal is closed (additional close logic)
    const resetFields = () => {
        setStep(1);
        setAmount('');
        setError('');
    };

    const handleNextStep = () => {
        if (step === 1) {
            if (!amount || parseFloat(amount) <= 0 || parseFloat(amount) > 1000000000) { // client side validation
                setError('Please enter amount between $0 to $1,000,000,000.');
            } else {
                setError('');
                setStep(step + 1);
            }
        } else if (step === 2) {
            setStep(step + 1);
        }
    };

    const handlePreviousStep = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    // called when user confirms deposit or withdrawal
    // just calls wallet service and catches error response from GlobalExceptionHandler in Spring boot
    const handleAction = async () => {
        try {
            const actionAmount = parseFloat(amount);
            if (isDeposit) {
                await WalletService.addFunds(actionAmount);
            } else {
                await WalletService.withdrawFunds(actionAmount);
            }

            onActionComplete(); // Update wallet balance
            handleNextStep();
        } catch (error) {
            // catch error thrown from backend (see GlobalExceptionHandler)
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);  // set the error message
            } else {
                console.error(`Error performing ${actionText.toLowerCase()}`, error);
                setError('An unexpected error occurred. Please try again.'); // set the error message
            }
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    return (
        <Modal
            triggerText={actionText}
            title={modalTitle}
            onClose={resetFields}
            onOpen={handleModalOpen}
        >
            <VStack spacing={6} p={6}>
                {step === 1 && (
                    <>
                        <BoxBorderGray>
                            <BlackText fontWeight="bold" fontSize="3xl" mb={4}>Amount</BlackText>
                            <HStack align="center" spacing={0} mb={4}>
                                <BlackText fontSize="5xl" mr={2}>$</BlackText>
                                <InputBoxWhiteExtraLarge
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="0.00"
                                />
                            </HStack>
                            {error && <RedText mt={2}>{error}</RedText>} {/* Display error message if there is one */}
                        </BoxBorderGray>
                        <ButtonBlack w="30%" alignSelf="flex-end" onClick={handleNextStep} mt={4}>
                            Next >
                        </ButtonBlack>
                    </>
                )}

                {step === 2 && (
                    <>
                        <BoxBorderGray>
                            <BlackText fontWeight="bold" fontSize="3xl" mb={4}>Bank Details</BlackText>
                            <HStack align="center" spacing={0} mb={4}>
                                <Box w="full">
                                    <BlackText fontSize="xl" mb={4}><b>Bank:</b> {bankDetails.bankName}</BlackText>
                                    <BlackText fontSize="xl" mb={4}><b>Account Number:</b> {bankDetails.accountNumber}</BlackText>
                                    <BlackText fontSize="xl" mb={2}><b>Full Name:</b> {bankDetails.accountHolderName}</BlackText>
                                </Box>
                            </HStack>
                            {error && <RedText mt={2}>{error}</RedText>}
                        </BoxBorderGray>
                        <HStack w="full" justify="space-between" mt={4}>
                            <ButtonBlack w="30%" onClick={handlePreviousStep}>
                                &lt; Back
                            </ButtonBlack>
                            <ButtonBlack w="30%" onClick={handleAction} ml={4}>
                                Confirm
                            </ButtonBlack>
                        </HStack>
                    </>
                )}

                {step === 3 && (
                    <Box textAlign="center">
                        <CheckCircleIcon boxSize={20} color="green.500" />
                        <Heading color="black" size="lg" mt={4}>
                            Successfully {isDeposit ? 'added' : 'withdrew'} {formatCurrency(amount)} {isDeposit ? 'into' : 'from'} your wallet!
                        </Heading>
                    </Box>
                )}
            </VStack>
        </Modal>
    );
};

export default WalletAction;
