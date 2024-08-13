import TextInput from "../common/input/TextInput";
import {useEffect, useState} from "react";
import {Alert, View} from "react-native";
import useWallet from "../../hooks/useWallet";
import Text from "../common/text/Text";
import ResetStopLossTriggerByPortfolio from "./ResetStopLossTriggerByPortfolio";
import ButtonPrimary from "../common/button/ButtonPrimary";


const UpdateRulesByPortfolio = ({ onUpdate, rule, portfolioType, onReset }) => {
    const [formData, setFormData] = useState({});
    const [invalidForSubmission, setInvalidForSubmission] = useState(false);
    const { wallet, getWallet } = useWallet();

    useEffect(() => {
        if (rule) {
            setFormData(rule);
        }
    }, [rule]);

    useEffect(() => {
        getWallet();
    }, [getWallet]);

    const handleChange = (name, value) => {
        if (name === 'stopLoss') {
            if (value < 0 || value > 100) {
                Alert.alert("Error", "Stop Loss percentage must be between 0 and 100.");
                setInvalidForSubmission(true);
                return;
            }
        }

        if (name === 'recurringAllocationAmount') {
            if (value < 0 || value > wallet) {
                Alert.alert("Error", `Recurring Allocation Amount must be positive and less than wallet balance.`);
                setInvalidForSubmission(true);
                return;
            }
        }

        if (name === 'recurringAllocationDay') {
            if (value < 1 || value > 28) {
                Alert.alert("Error", "Recurring Allocation Day must be within 1 and 28.");
                setInvalidForSubmission(true);
                return;
            }
        }

        setInvalidForSubmission(false);
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        if (invalidForSubmission) return;
        onUpdate(formData);
    };

    return (
        <View>
            <Text>Stop Loss (%):</Text>
            <TextInput
                keyboardType="numeric"
                value={formData.stopLoss?.toString() || ''}
                onChangeText={(value) => handleChange('stopLoss', Number(value))}
            />

            <Text>Recurring Allocation Amount ($):</Text>
            <TextInput
                keyboardType="numeric"
                value={formData.recurringAllocationAmount?.toString() || ''}
                onChangeText={(value) => handleChange('recurringAllocationAmount', Number(value))}
            />

            <Text>Recurring Allocation Day of Month:</Text>
            <TextInput
                keyboardType="numeric"
                value={formData.recurringAllocationDay?.toString() || ''}
                onChangeText={(value) => handleChange('recurringAllocationDay', Number(value))}
            />

            <ButtonPrimary title="Update Rule" onPress={handleSubmit} />
            <ResetStopLossTriggerByPortfolio onReset={onReset} />
        </View>
    );
};

export default UpdateRulesByPortfolio;