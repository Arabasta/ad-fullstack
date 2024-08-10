import React, { useState, useEffect } from 'react';
import BoxBorderGray from "../common/modal/Box-BorderGray";
import BlackText from "../common/text/BlackText";
import {Button, Center, chakra, HStack} from "@chakra-ui/react";
import InputBoxWhite from "../common/inputFields/InputBoxWhite";

const UpdateRulesByPortfolio = ({ onUpdate, rule }) => {
    const [formData, setFormData] = useState({});
    const [validationMessage, setValidationMessage] = useState('');

    useEffect(() => {
        if (rule) {
            setFormData(rule);
        }
    }, [rule]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Validation logic
        if (name === 'stopLoss') {
            if (value < 0) {
                setValidationMessage('Stop Loss cannot be negative.');
                return;
            } else if (value > 100) {
                setValidationMessage('Stop Loss cannot be greater than 100.');
                return;
            } else {
                setValidationMessage('');
            }
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validationMessage) {
            return; // Prevent form submission if there's a validation message
        }
        onUpdate(formData);
    };

    return (
        <BoxBorderGray>
            <chakra.form
                onSubmit={handleSubmit}
                overflow={{lg: "hidden"}}
                color="brand.100"
            >
                {/*Stop Loss*/}
                <HStack align="center" spacing={0} mb={4}>
                    <BlackText fontSize="xl" mb={4}>
                        Stop Loss (%):
                    </BlackText>
                    <InputBoxWhite
                        type="number"
                        name="stopLoss"
                        value={formData.stopLoss || ''}
                        min="0"
                        max="100"
                        onChange={handleChange}
                    />
                </HStack>
                {/*todo: use toast for validation*/}
                {validationMessage && <p style={{color: 'red'}}>{validationMessage}</p>}

                {/*Recurring Amount*/}
                <HStack align="center" spacing={0} mb={4}>
                    <BlackText fontSize="xl" mb={4}>
                        Recurring Allocation Amount ($):
                    </BlackText>
                    <InputBoxWhite
                        type="number"
                        name="recurringAllocationAmount"
                        value={formData.recurringAllocationAmount || ''}
                        onChange={handleChange}
                    />
                </HStack>

                {/*Recurring Amount*/}
                <HStack align="center" spacing={0} mb={4}>
                    <BlackText fontSize="xl" mb={4}>
                        Recurring Allocation Day of Month:
                    </BlackText>
                    <InputBoxWhite
                        type="number"
                        name="recurringAllocationDay"
                        value={formData.recurringAllocationDay || ''}
                        onChange={handleChange}/>
                </HStack>
                {/*todo: button not submitting*/}
                <Center>
                    <Button type="submit">
                        Update Rule
                    </Button>
                </Center>
            </chakra.form>
        </BoxBorderGray>
    );
};

export default UpdateRulesByPortfolio;
