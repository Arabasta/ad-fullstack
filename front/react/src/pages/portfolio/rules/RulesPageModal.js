import React from 'react';
import { useLocation } from 'react-router-dom';
import UpdateRulesByPortfolio from '../../../components/rules/UpdateRulesByPortfolio';
import ResetStopLossTriggerByPortfolio from '../../../components/rules/ResetStopLossTriggerByPortfolio';
import useRule from '../../../hooks/useRule';
import { Modal } from '../../../components/common/modal/Modal';
import RulesPage from "./RulesPage";
import {HStack, VStack} from "@chakra-ui/react";
import BlackText from "../../../components/common/text/BlackText";
import InputBoxWhiteExtraLarge from "../../../components/common/inputFields/InputBoxWhiteExtraLarge";
import RedText from "../../../components/common/text/RedText";
import BoxBorderGray from "../../../components/common/modal/Box-BorderGray";


const RulesPageModal = ({portfolioType, modalTitle, onActionComplete}) => {
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
        <Modal
            triggerText={actionText}
            title={`Rules - ${modalTitle}`}
            onClose={resetFields}
            onOpen={handleModalOpen}
        >
            <VStack spacing={6} p={6}>
                <BoxBorderGray>
                    <UpdateRulesByPortfolio  onUpdate={handleUpdate} rule={rule} />
                </BoxBorderGray>

                <BoxBorderGray>
                    <ResetStopLossTriggerByPortfolio portfolioType={portfolioType} onReset={handleReset} />
                </BoxBorderGray>
                {message && <p>{message}</p>}
            </VStack>
        </Modal>
    );

};

export default RulesPageModal;
