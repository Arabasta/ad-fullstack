import React from 'react';
import UpdateRulesByPortfolio from './UpdateRulesByPortfolio';
import ResetStopLossTriggerByPortfolio from './ResetStopLossTriggerByPortfolio';
import useRule from '../../hooks/useRule';
import { Modal } from '../common/modal/Modal';
import {Center, VStack} from "@chakra-ui/react";


const RulesModal = ({portfolioType, modalTitle, onActionComplete}) => {
    // Set the modal title
    // const modalTitle = `Rules - ${portfolioType} Portfolio`;
    const actionText = 'Manage Rules';
    // Get portfolio type from path
    const { rule, loading, error, message, updateRule, resetStopLoss } = useRule(portfolioType);

    // passed into the Modal component as the onOpen prop (additional open logic)
    // for custom open behavior when the modal is opened
    const handleModalOpen = async () => {

    }

    const handleUpdate = async (updatedRule) => {
        await updateRule(updatedRule);
    };

    const handleReset = async () => {
        await resetStopLoss();
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    // passed into Modal to reset fields when modal is closed (additional close logic)
    const resetFields = () => {

    };

    return (
        <Center>
            <Modal
                triggerText={actionText}
                title={`Rules - ${modalTitle}`}
                onClose={resetFields}
                onOpen={handleModalOpen}
            >
                <VStack spacing={6} p={6}>
                    <UpdateRulesByPortfolio  onUpdate={handleUpdate} rule={rule} />
                    <ResetStopLossTriggerByPortfolio portfolioType={portfolioType} onReset={handleReset} />
                    {message && <p>{message}</p>}
                </VStack>
            </Modal>
        </Center>
    );

};

export default RulesModal;
