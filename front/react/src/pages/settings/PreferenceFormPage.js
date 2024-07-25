import React, { useState } from 'react';

const FinancialPage = () => {
    const [form, setForm] = useState({
        purpose: '',
        sourceOfFunds: '',
        netWorth: '',
        cryptoExperience: '',
        tradingVolume: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(form);
    };

    return (
        <div>
            <h2>Financial Profile</h2>
            <p>Tell us a little about your financial profile.</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="purpose">Purpose of account</label>
                    <select name="purpose" value={form.purpose} onChange={handleChange}>
                        <option value="">Select purpose of account</option>
                        <option value="investment">Investment</option>
                        <option value="savings">Savings</option>
                        <option value="trading">Trading</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="sourceOfFunds">Source of funds</label>
                    <select name="sourceOfFunds" value={form.sourceOfFunds} onChange={handleChange}>
                        <option value="">Select source of funds</option>
                        <option value="salary">Salary</option>
                        <option value="inheritance">Inheritance</option>
                        <option value="investment">Investment</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="netWorth">Net worth</label>
                    <select name="netWorth" value={form.netWorth} onChange={handleChange}>
                        <option value="">Select your net worth</option>
                        <option value="less_than_50k">Less than $50,000</option>
                        <option value="50k_to_100k">$50,000 to $100,000</option>
                        <option value="100k_to_500k">$100,000 to $500,000</option>
                        <option value="more_than_500k">More than $500,000</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="cryptoExperience">Crypto trading experience</label>
                    <select name="cryptoExperience" value={form.cryptoExperience} onChange={handleChange}>
                        <option value="">Select crypto trading experience</option>
                        <option value="none">None</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="tradingVolume">Monthly trading volume</label>
                    <select name="tradingVolume" value={form.tradingVolume} onChange={handleChange}>
                        <option value="">Select monthly trading volume</option>
                        <option value="less_than_1k">Less than $1,000</option>
                        <option value="1k_to_10k">$1,000 to $10,000</option>
                        <option value="10k_to_50k">$10,000 to $50,000</option>
                        <option value="more_than_50k">More than $50,000</option>
                    </select>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default FinancialPage;
