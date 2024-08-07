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

const WalletAction = ({ type, onActionComplete }) => {
    const [step, setStep] = useState(1);
    const [error, setError] = useState('');
    const [amount, setAmount] = useState('');
    const toast = useToast();
    const navigate = useNavigate();
    const { bankDetails, getBankDetails } = useBankDetails();
    const [paymentDetails, setPaymentDetails] = useState({
        bankName: '',
        accountNumber: '',
        accountHolderName: '',
    });

    const isDeposit = type === 'deposit';
    const modalTitle = isDeposit ? 'Deposit' : 'Withdraw';
    const actionText = isDeposit ? 'Deposit' : 'Withdraw';

    const handleModalOpen = async () => {
        await getBankDetails();
        if (bankDetails && bankDetails.bankName && bankDetails.accountNumber && bankDetails.accountHolderName) {
            setPaymentDetails({
                bankName: bankDetails.bankName,
                accountNumber: bankDetails.accountNumber,
                accountHolderName: bankDetails.accountHolderName,
            });
        } else {
            if (!toast.isActive('bankDetailsToast')) {
                toast({
                    id: 'bankDetailsToast',
                    title: "Incomplete Bank Details",
                    description: "Please complete your bank details to proceed. Redirecting...",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
                setTimeout(() => {
                    navigate('/profile/bankDetails');
                }, 5000);
            }
        }
    };

    const resetFields = () => {
        setStep(1);
        setAmount('');
        setError('');
    };

    const handleNextStep = () => {
        if (step === 1) {
            if (!amount || parseFloat(amount) <= 0) {
                setError('Please enter a valid amount.');
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

    const handleAction = async () => {
        try {
            const actionAmount = parseFloat(amount);
            if (actionAmount <= 0) {
                alert('Invalid amount');
                return;
            }

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
                setError(error.response.data.message);
            } else {
                console.error(`Error performing ${actionText.toLowerCase()}`, error);
                setError('An unexpected error occurred. Please try again.');
            }
        }
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
                            {error && <RedText mt={2}>{error}</RedText>}
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
                                    <BlackText fontSize="xl" mb={4}><b>Bank:</b> {paymentDetails.bankName}</BlackText>
                                    <BlackText fontSize="xl" mb={4}><b>Account Number:</b> {paymentDetails.accountNumber}</BlackText>
                                    <BlackText fontSize="xl" mb={2}><b>Full Name:</b> {paymentDetails.accountHolderName}</BlackText>
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
                            Successfully {isDeposit ? 'added' : 'withdrew'} ${amount} {isDeposit ? 'into' : 'from'} your wallet!
                        </Heading>
                    </Box>
                )}
            </VStack>
        </Modal>
    );
};

export default WalletAction;
