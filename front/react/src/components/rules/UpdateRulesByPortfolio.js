import React, { useState, useEffect } from 'react';
import BoxBorderGray from "../common/modal/Box-BorderGray";
import BlackText from "../common/text/BlackText";
import {Center, HStack, VStack} from "@chakra-ui/react";
import InputBoxWhite from "../common/inputFields/InputBoxWhite";
import { useToast } from "@chakra-ui/react";
import useWallet from "../../hooks/useWallet";
import {formatCurrency} from "../../utils/formatCurrency";
import ResetStopLossTriggerByPortfolio from "./ResetStopLossTriggerByPortfolio";
import Button from "../../components/common/buttons/Button";

const UpdateRulesByPortfolio = ({ onUpdate, rule, portfolioType, onReset }) => {
    const [formData, setFormData] = useState({});
    const [invalidForSubmission, setInvalidForSubmission] = useState(false);
    const toast = useToast();
    const { wallet, getWallet } = useWallet();

    useEffect(() => {
        if (rule) {
            setFormData(rule);
        }
    }, [rule]);

    useEffect(() => {
        getWallet()
    }, [rule, getWallet]);

    const handleChange = (e) => {
        let { name, value } = e.target;

        // Validation logic
        if (name === 'stopLoss') {
            if (value < 0) {
                toast({
                    title: "Manage Rules Error",
                    description: "Stop Loss percentage cannot be negative.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                });
                setInvalidForSubmission(true);
            } else if (value > 100) {
                toast({
                    title: "Manage Rules Error",
                    description: "Stop Loss percentage cannot be greater than 100%.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                });
                setInvalidForSubmission(true);
            }
        }
        if (name === 'recurringAllocationAmount') {
            if (value < 0) {
                toast({
                    title: "Manage Rules Error",
                    description: "Recurring Allocation Amount cannot be negative.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                });
                setInvalidForSubmission(true);
            } else if (value > wallet) {
                toast({
                    title: "Manage Rules Error",
                    description: `Recurring Allocation Amount cannot be more than wallet balance of ${formatCurrency(wallet)}.`,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                });
                setInvalidForSubmission(true);
            }
        }
        if (name === 'recurringAllocationDay') {
            if (value < 1 || value > 28) {
                toast({
                    title: "Manage Rules Error",
                    description: "Recurring Allocation Day must be within day of month.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                });
                setInvalidForSubmission(true);
            }
        }
        setInvalidForSubmission(false);
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (invalidForSubmission) {
            return; // Prevent form submission if invalid for submission
        }
        onUpdate(formData);
    };

    return (
        <BoxBorderGray>
            <VStack align="stretch" spacing={4} mb={4}>
                {/*Stop Loss*/}
                <HStack>
                    <BlackText fontSize="xl" mb={2} width="25rem">
                        Stop Loss (%):
                    </BlackText>
                    <InputBoxWhite
                        width="7rem"
                        type="number"
                        name="stopLoss"
                        value={formData.stopLoss || ''}
                        min="0"
                        max="100"
                        onChange={handleChange}
                    />
                </HStack>

                {/*Recurring Allocation Amount*/}
                <HStack>
                    <BlackText fontSize="xl" mb={2} width="25rem">
                        Recurring Allocation Amount ($):
                    </BlackText>
                    <InputBoxWhite
                        width="7rem"
                        type="number"
                        name="recurringAllocationAmount"
                        value={formData.recurringAllocationAmount || ''}
                        onChange={handleChange}
                    />
                </HStack>

                {/*Recurring Allocation Day of Month*/}
                <HStack>
                    <BlackText
                        fontSize="xl"
                        mb={2}
                        width="25rem"
                    >
                        Recurring Allocation Day of Month:
                    </BlackText>
                    <InputBoxWhite
                        width="7rem"
                        type="number"
                        name="recurringAllocationDay"
                        value={formData.recurringAllocationDay || ''}
                        onChange={handleChange}
                    />
                </HStack>
            </VStack>
            <Center>
                <Button
                    onClick={handleSubmit}
                    fontSize="lg"
                    mb="1rem"
                >
                    Update Rule
                </Button>
            </Center>
            <ResetStopLossTriggerByPortfolio
                portfolioType={portfolioType}
                onReset={onReset}
            />
        </BoxBorderGray>
    );
};

export default UpdateRulesByPortfolio;
