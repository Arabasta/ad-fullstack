import {Alert, View} from "react-native";
import {useEffect, useState} from "react";
import useRule from "../../hooks/useRule";
import UpdateRulesByPortfolio from "../../components/rules/UpdateRulesByPortfolio";
import ButtonPrimary from "../../components/common/button/ButtonPrimary";

const ManageRulesScreen = ({ portfolioType, modalTitle }) => {
    const { rule, error, message, updateRule, resetStopLoss } = useRule(portfolioType);
    const [hasUpdated, setHasUpdated] = useState(false);

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
                Alert.alert("Error", `${message}\nPlease try again later or contact support.`);
                setHasUpdated(false);
                return;
            }
            if (message) {
                Alert.alert("Success", `Stop Loss: ${rule.stopLoss}%\nRecurring Allocation Amount: ${rule.recurringAllocationAmount}\nRecurring Allocation Day of Month: ${rule.recurringAllocationDay}`);
                setHasUpdated(false);
            }
        }
    }, [rule, message, error, hasUpdated]);

    return (
        <View>
            <UpdateRulesByPortfolio
                onUpdate={handleUpdate}
                rule={rule}
                portfolioType={portfolioType}
                onReset={handleReset}
            />
        </View>
    );
};

export default ManageRulesScreen;