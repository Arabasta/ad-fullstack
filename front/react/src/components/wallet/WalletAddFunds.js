import React, { useState, useEffect } from 'react';
import WalletService from '../../services/WalletService';
import { Modal } from '../elements/modal/Modal';
import { VStack } from '@chakra-ui/react';
import ModalInput from "../elements/modal/ModalInput";
import ModalButton from "../elements/modal/ModalButton";
import BlackText from "../common/text/BlackText";
import useBankDetails from '../../hooks/useBankDetails';

// todo: edit bank details button, input text locked on step 2 by default
// todo: maybe add a loading spinner
// todo: add validation error message for invalid amoutn
// todo: add Green success exclaimation mark thing for payment success
const WalletAddFunds = ({ onAddFunds }) => {
    const [step, setStep] = useState(1);
    const [depositAmount, setDepositAmount] = useState('');
    const { bankDetails, getBankDetails } = useBankDetails();
    const [paymentDetails, setPaymentDetails] = useState({
        bankName: '',
        accountNumber: '',
        accountHolderName: '',
    });

    useEffect(() => {
        const loadBankDetails = async () => {
            await getBankDetails(); // Fetch bank details when the modal is opened
            if (bankDetails) {
                setPaymentDetails({
                    bankName: bankDetails.bankName || '',
                    accountNumber: bankDetails.accountNumber || '',
                    accountHolderName: bankDetails.accountHolderName || '',
                });
            }
        };
        loadBankDetails();
    }, [getBankDetails, bankDetails]);

    const resetFields = () => {
        setStep(1);
        setDepositAmount('');
        setPaymentDetails({
            bankName: '',
            accountNumber: '',
            accountHolderName: '',
        });
    };

    const handleNextStep = () => {
        if (step === 1 && depositAmount > 0) {
            setStep(step + 1);
        } else if (step === 2) {
            setStep(step + 1);
        }
    };

    const handlePreviousStep = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleDeposit = async () => {
        try {
            const amount = parseFloat(depositAmount);
            if (amount <= 0) {
                alert('Invalid amount');
                return;
            }

            // Simulate payment success and add funds to wallet
            await WalletService.addFunds(amount);
            onAddFunds(); // Update wallet balance
            handleNextStep(); // Move to confirmation step
        } catch (error) {
            console.error('Error depositing money', error);
        }
    };

    return (
        <Modal
            triggerText="Make Deposit"
            title="Deposit Funds"
            onClose={resetFields}
        >
            <VStack spacing={4} p={4}>
                {step === 1 && (
                    <>
                        <BlackText>Enter the amount you want to deposit:</BlackText>
                        <ModalInput
                            type="number"
                            value={depositAmount}
                            onChange={(e) => setDepositAmount(e.target.value)}
                        />
                        <ModalButton onClick={handleNextStep}>
                            Proceed to payment
                        </ModalButton>
                    </>
                )}

                {step === 2 && (
                    <>
                        <BlackText>Enter your payment details:</BlackText>
                        <ModalInput
                            type="text"
                            value={paymentDetails.bankName}
                            onChange={(e) => setPaymentDetails({ ...paymentDetails, bankName: e.target.value })}
                            placeholder="Bank Name"
                        />
                        <ModalInput
                            type="text"
                            value={paymentDetails.accountNumber}
                            onChange={(e) => setPaymentDetails({ ...paymentDetails, accountNumber: e.target.value })}
                            placeholder="Account Number"
                        />
                        <ModalInput
                            type="text"
                            value={paymentDetails.accountHolderName}
                            onChange={(e) => setPaymentDetails({ ...paymentDetails, accountHolderName: e.target.value })}
                            placeholder="Account Holder Name"
                        />
                        <ModalButton onClick={handleDeposit}>
                            Confirm Payment
                        </ModalButton>
                        <ModalButton onClick={handlePreviousStep}>
                            Back
                        </ModalButton>
                    </>
                )}

                {step === 3 && (
                    <>
                        <BlackText>Payment successful!</BlackText>
                    </>
                )}
            </VStack>
        </Modal>
    );
};

export default WalletAddFunds;
