import React, { useEffect } from 'react';
import FormSelect from "../InvestProfile/FormSelect";
import {Button} from "@chakra-ui/react";

const RegisterStep4 = ({
                           employmentStatus, setEmploymentStatus, annualIncome, setAnnualIncome, netWorth, setNetWorth,
                           sourceOfWealth, setSourceOfWealth, investmentObjective, setInvestmentObjective, investmentExperience,
                           setInvestmentExperience, handlePrevious, handleNext
                       }) => {

    const incomeOptions = [
        { label: 'Below $20,000', value: 20000 },
        { label: '$20,000 - $50,000', value: 50000 },
        { label: '$50,001 - $100,000', value: 100000 },
        { label: '$100,001 - $200,000', value: 200000 },
        { label: 'Above $200,000', value: 200001 },
    ];

    const netWorthOptions = [
        { label: 'Below $50,000', value: 50000 },
        { label: '$50,000 - $100,000', value: 100000 },
        { label: '$100,001 - $500,000', value: 500000 },
        { label: '$500,001 - $1,000,000', value: 1000000 },
        { label: 'Above $1,000,000', value: 1000001 },
    ];

    useEffect(() => {
        // Ensure the values are set to valid defaults if not already set
        if (!employmentStatus) setEmploymentStatus('EMPLOYED');
        if (!sourceOfWealth) setSourceOfWealth('SALARY');
        if (!investmentObjective) setInvestmentObjective('GROWTH');
        if (!investmentExperience) setInvestmentExperience('NONE');
    }, [employmentStatus, sourceOfWealth, investmentObjective, investmentExperience]);

    return (
        <form onSubmit={handleNext} style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <FormSelect
                label="Employment Status"
                value={employmentStatus}
                onChange={(value) => setEmploymentStatus(value.toString())}
                options={[
                    { label: 'Employed', value: 1 },
                    { label: 'Self-Employed', value: 2 },
                    { label: 'Unemployed', value: 3 },
                    { label: 'Retired', value: 4 },
                    { label: 'Student', value: 5 },
                    { label: 'Other', value: 6 }
                ]}
                required
            />
            <FormSelect
                label="Annual Income"
                value={annualIncome}
                onChange={setAnnualIncome}
                options={incomeOptions}
                required
            />
            <FormSelect
                label="Net Worth"
                value={netWorth}
                onChange={setNetWorth}
                options={netWorthOptions}
                required
            />
            <FormSelect
                label="Source of Wealth"
                value={sourceOfWealth}
                onChange={(value) => setSourceOfWealth(value.toString())}
                options={[
                    { label: 'Salary', value: 1 },
                    { label: 'Business', value: 2 },
                    { label: 'Investments', value: 3 },
                    { label: 'Inheritance', value: 4 },
                    { label: 'Other', value: 5 }
                ]}
                required
            />
            <FormSelect
                label="Investment Objective"
                value={investmentObjective}
                onChange={(value) => setInvestmentObjective(value.toString())}
                options={[
                    { label: 'Growth', value: 1 },
                    { label: 'Income', value: 2 },
                    { label: 'Capital Preservation', value: 3 },
                    { label: 'Speculation', value: 4 },
                    { label: 'Other', value: 5 }
                ]}
                required
            />
            <FormSelect
                label="Investment Experience"
                value={investmentExperience}
                onChange={(value) => setInvestmentExperience(value.toString())}
                options={[
                    { label: 'None', value: 1 },
                    { label: 'Limited', value: 2 },
                    { label: 'Moderate', value: 3 },
                    { label: 'Extensive', value: 4 }
                ]}
                required
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                <Button type="button" onClick={handlePrevious} variant="outline" size="md">
                    Previous
                </Button>
                <Button type="submit" variant="solid" colorScheme="blue" size="md">
                    Next
                </Button>
            </div>
        </form>
    );
};

export default RegisterStep4;
