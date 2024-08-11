import React, {useEffect, useState} from 'react';
import UpdateRulesByPortfolio from './UpdateRulesByPortfolio';
import useRule from '../../hooks/useRule';
import { Modal } from '../common/modal/Modal';
import {Center, useToast, VStack} from "@chakra-ui/react";
import {formatCurrency} from "../../utils/formatCurrency";


const RulesModal = ({portfolioType, modalTitle}) => {
    // Get portfolio type from path
    const { rule, error, message, updateRule, resetStopLoss } = useRule(portfolioType);
    const actionText = 'Manage Rules';
    const toast = useToast();
    const [hasUpdated, setHasUpdated] = useState(false); // Track if a rule update occurred

    const handleUpdate = async (updatedRule) => {
        await updateRule(updatedRule);
        setHasUpdated(true);
    };

    const handleReset = async () => {
        await resetStopLoss();
        setHasUpdated(true);
    };

    useEffect(() => {
        if (hasUpdated) {
            if (error) {
                toast({
                    title: `${message}`,
                    description: "Please try again later or contact support.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                });
                setHasUpdated(false); // Reset update tracker
                return;
            }
            if (message) {
                toast({
                    title: `${message}`,
                    description: `Stop Loss: ${rule.stopLoss}%, 
                              Recurring Allocation Amount: ${formatCurrency(rule.recurringAllocationAmount)},
                              Recurring Allocation Day of Month: ${rule.recurringAllocationDay}`,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                });
                setHasUpdated(false); // Reset update tracker
            }
        }
    }, [toast, rule, message, error, hasUpdated]);

    return (
        <Center>
            <Modal
                triggerText={actionText}
                title={`Rules - ${modalTitle}`}
            >
                <VStack spacing={6} p={6}>
                    <UpdateRulesByPortfolio
                        onUpdate={handleUpdate}
                        rule={rule}
                        portfolioType={portfolioType}
                        onReset={handleReset}
                    />
                </VStack>
            </Modal>
        </Center>
    );

};

export default RulesModal;
