import { useEffect, useState } from "react";
import UpdateRulesByPortfolio from "../../components/rules/UpdateRulesByPortfolio";
import Container from "../../components/common/container/Container";
import useRule from "../../hooks/useRule";
import ErrorText from "../../components/common/text/ErrorText";
import SuccessText from "../../components/common/text/SuccessText";

const ManageRulesScreen = ({ portfolioType, modalTitle }) => {
    const { rule, error, message, updateRule, resetStopLoss } = useRule(portfolioType);
    const [hasUpdated, setHasUpdated] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [successText, setSuccessText] = useState("");

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
                setErrorText(`${message}\nPlease try again later or contact support.`);
                setSuccessText("");  // Clear success text if error occurs
                setHasUpdated(false);
                return;
            }
            if (message) {
                setSuccessText(`Stop Loss: ${rule.stopLoss}%\nRecurring Allocation Amount: ${rule.recurringAllocationAmount}\nRecurring Allocation Day of Month: ${rule.recurringAllocationDay}`);
                setErrorText("");  // Clear error text on success
                setHasUpdated(false);
            }
        }
    }, [rule, message, error, hasUpdated]);

    return (
        <Container>
            {errorText ? <ErrorText>{errorText}</ErrorText> : null}
            {successText ? <SuccessText>{successText}</SuccessText> : null}
            <UpdateRulesByPortfolio
                onUpdate={handleUpdate}
                rule={rule}
                portfolioType={portfolioType}
                onReset={handleReset}
            />
        </Container>
    );
};

export default ManageRulesScreen;
