import React from 'react';
import BoxBorderGray from "../common/modal/Box-BorderGray";
import ButtonRed from "../common/buttons/ButtonRed";
import {Button, Center} from "@chakra-ui/react";

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
