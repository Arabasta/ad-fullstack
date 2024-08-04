import React, {useEffect, useState} from 'react';
import RulesService from "../../services/RulesService";

const ResetStopLossTriggerByPortfolio = ({ rules, portfolioType}) => {
    const [stopLossTrigger, setStopLossTrigger] = useState({
        portfolioType: portfolioType,
        resetStopLossTrigger: false,
    });

    const [rulesValues, setRulesValues] = useState(rules);

    useEffect(() => {
        setRulesValues(rules);
    }, [rules]);

    const handleResetStopLossTrigger = async () => {
        try {
            if (!rulesValues) {
                alert('You have no stop loss rules to reset');
                return;
            }
            setStopLossTrigger({resetStopLossTrigger: true});
            await RulesService.resetStopLoss(stopLossTrigger);

        } catch (error) {
            console.error('Error updating rules', error);
        }
    };

    return (
        <div>
            <button onClick={handleResetStopLossTrigger}>Reset</button>
        </div>
    );
};

export default ResetStopLossTriggerByPortfolio;
