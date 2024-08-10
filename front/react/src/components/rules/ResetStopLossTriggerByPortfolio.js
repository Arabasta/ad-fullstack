import React from 'react';
import ButtonRed from "../common/buttons/ButtonRed";
import {Center} from "@chakra-ui/react";

const ResetStopLossTriggerByPortfolio = ({ portfolioType, onReset }) => {
    return (
        <Center>
            <ButtonRed onClick={onReset}>
                Reset Stop Loss based on Current Value
            </ButtonRed>
        </Center>
    );
};

export default ResetStopLossTriggerByPortfolio;
