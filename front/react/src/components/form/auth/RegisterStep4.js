import React from 'react';

const RegisterStep4 = ({
                           employmentStatus, setEmploymentStatus, annualIncome, setAnnualIncome, netWorth, setNetWorth,
                           sourceOfWealth, setSourceOfWealth, investmentObjective, setInvestmentObjective, investmentExperience,
                           setInvestmentExperience, handlePrevious, handleNext
                       }) => {
    return (
        <form onSubmit={handleNext}>
            <div>
                <label>Employment Status</label>
                <input
                    type="text"
                    value={employmentStatus}
                    onChange={(e) => setEmploymentStatus(e.target.value)}
                />
            </div>
            <div>
                <label>Annual Income</label>
                <input
                    type="number"
                    value={annualIncome}
                    onChange={(e) => setAnnualIncome(e.target.value)}
                />
            </div>
            <div>
                <label>Net Worth</label>
                <input
                    type="number"
                    value={netWorth}
                    onChange={(e) => setNetWorth(e.target.value)}
                />
            </div>
            <div>
                <label>Source of Wealth</label>
                <input
                    type="text"
                    value={sourceOfWealth}
                    onChange={(e) => setSourceOfWealth(e.target.value)}
                />
            </div>
            <div>
                <label>Investment Objective</label>
                <input
                    type="text"
                    value={investmentObjective}
                    onChange={(e) => setInvestmentObjective(e.target.value)}
                />
            </div>
            <div>
                <label>Investment Experience</label>
                <input
                    type="text"
                    value={investmentExperience}
                    onChange={(e) => setInvestmentExperience(e.target.value)}
                />
            </div>
            <button type="button" onClick={handlePrevious}>Previous</button>
            <button type="submit">Next</button>
        </form>
    );
};

export default RegisterStep4;
