import React from "react";
import useRulesByPortfolio from "../../../hooks/useRulesByPortfolio";
import UpdateRulesByPortfolio from "../../../components/rules/UpdateRulesByPortfolio";
import ResetStopLossTriggerByPortfolio from "../../../components/rules/ResetStopLossTriggerByPortfolio";

const RulesPage = (portfolioType) => {

    const { rulesByPortfolio, getRulesByPortfolio } = useRulesByPortfolio(portfolioType);

    return (
        <div>
            {portfolioType ? (
                <div>
                    <h2>Portfolio Rules</h2>
                    <UpdateRulesByPortfolio rules={rulesByPortfolio} OnUpdateRules={getRulesByPortfolio} />
                    <ResetStopLossTriggerByPortfolio rules={rulesByPortfolio} portfolioType={portfolioType}/>
                </div>
                ) : (
                    <p> No rules </p>
            )}
           >
        </div>
    );
};

export default RulesPage;
