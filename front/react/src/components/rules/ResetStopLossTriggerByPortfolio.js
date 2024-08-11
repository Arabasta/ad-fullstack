import React from 'react';
import Button from "../../components/common/buttons/Button";
import {Center} from "@chakra-ui/react";

const ResetStopLossTriggerByPortfolio = ({ onReset }) => {
    return (
        <Center>
            <Button onClick={onReset} fontSize="lg">
                Apply Stop Loss (%) on current Portfolio Value
            </Button>
        </Center>
    );
};

export default ResetStopLossTriggerByPortfolio;
