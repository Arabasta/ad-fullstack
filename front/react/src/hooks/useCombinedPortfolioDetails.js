import usePortfolio from "./usePortfolio";
import {useMemo} from "react";


const useCombinedPortfolioDetails = () => {

    // Call usePortfolio for each portfolio type
    const conservativePortfolio = usePortfolio('CONSERVATIVE');
    const moderatePortfolio = usePortfolio('MODERATE');
    const aggressivePortfolio = usePortfolio('AGGRESSIVE');

    // Calculate the sum of currentValues from all portfolios
    const totalCurrentValue = useMemo(() => {
        const aggressiveValue = aggressivePortfolio.portfolio.currentValue || 0;
        const moderateValue = moderatePortfolio.portfolio.currentValue || 0;
        const conservativeValue = conservativePortfolio.portfolio.currentValue || 0;

        return parseFloat(aggressiveValue) + parseFloat(moderateValue) + parseFloat(conservativeValue);
    }, [
        aggressivePortfolio.portfolio.currentValue,
        moderatePortfolio.portfolio.currentValue,
        conservativePortfolio.portfolio.currentValue
    ]);

    return {conservativePortfolio, moderatePortfolio, aggressivePortfolio, totalCurrentValue};
}
export default useCombinedPortfolioDetails;