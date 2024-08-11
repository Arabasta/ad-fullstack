import React from 'react';
import UpdateRulesByPortfolio from './UpdateRulesByPortfolio';
import ResetStopLossTriggerByPortfolio from './ResetStopLossTriggerByPortfolio';
import useRule from '../../hooks/useRule';
import { Modal } from '../common/modal/Modal';
import {Center, VStack} from "@chakra-ui/react";


const RulesModal = ({portfolioType, modalTitle}) => {
    const actionText = 'Manage Rules';
    // Get portfolio type from path
    const { rule, loading, error, message, updateRule, resetStopLoss } = useRule(portfolioType);

    const handleUpdate = async (updatedRule) => {
        await updateRule(updatedRule);
    };

    const handleReset = async () => {
        await resetStopLoss();
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <Center>
            <Modal
                triggerText={actionText}
                title={`Rules - ${modalTitle}`}
            >
                <VStack spacing={6} p={6}>
                    <UpdateRulesByPortfolio
                        onUpdate={handleUpdate}
                        rule={rule} />
                    <ResetStopLossTriggerByPortfolio
                        portfolioType={portfolioType}
                        onReset={handleReset} />
                    {message && <p>{message}</p>}
                </VStack>
            </Modal>
        </Center>
    );

};

export default RulesModal;
