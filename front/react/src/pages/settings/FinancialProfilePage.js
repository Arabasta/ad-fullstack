import React, { useState } from 'react';

const FinancialProfileForm = () => {
    const [form, setForm] = useState({
        nationality: '',
        employmentStatus: '',
        industry: '',
        annualIncome: ''
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

    const selectStyle = {
        width: '100%',
        padding: '10px',
        margin: '5px 0',
        borderRadius: '5px',
        border: '1px solid #ccc'
    };

    const buttonStyle = {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#000',
        color: '#fff',
        cursor: 'pointer'
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <h2>Complete your financial profile</h2>
            <p>Financial regulations require we ask these questions. Please select the closest option.</p>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="nationality">Nationality</label>
                    <select name="nationality" value={form.nationality} onChange={handleChange} style={selectStyle}>
                        <option value="">Select your nationality</option>
                        <option value="sg">Singaporean</option>
                        <option value="us">United States</option>
                        <option value="ca">Canada</option>
                        <option value="uk">United Kingdom</option>
                        {/* Add other options as needed */}
                    </select>
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="employmentStatus">Employment status</label>
                    <select name="employmentStatus" value={form.employmentStatus} onChange={handleChange} style={selectStyle}>
                        <option value="">Select your employment status</option>
                        <option value="fullTime">Full-time employment</option>
                        <option value="partTime">Part-time employment</option>
                        <option value="selfEmployed">Self-employed</option>
                        <option value="unemployed">Unemployed</option>
                        <option value="student">Student</option>
                        <option value="retired">Retired</option>
                        {/* Add other options as needed */}
                    </select>
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="industry">Industry</label>
                    <select name="industry" value={form.industry} onChange={handleChange} style={selectStyle}>
                        <option value="">Select your industry</option>
                        <option value="moneyService">Money Service Business</option>
                        <option value="tech">Technology</option>
                        <option value="finance">Finance</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="education">Education</option>
                        {/* Add other options as needed */}
                    </select>
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="annualIncome">Annual income</label>
                    <select name="annualIncome" value={form.annualIncome} onChange={handleChange} style={selectStyle}>
                        <option value="">Select your annual income</option>
                        <option value="under20k">S$20,000 - S$49,999</option>
                        <option value="50kTo100k">S$50,000 - S$99,999</option>
                        <option value="100kTo200k">S$100,000 - S$199,999</option>
                        <option value="200kPlus">S$200,000+</option>
                        {/* Add other options as needed */}
                    </select>
                </div>
                <button type="submit" style={buttonStyle}>Submit</button>
            </form>
        </div>
    );
};

const FinancialPage = () => {
    return (
        <div>
            <h2>Financial page</h2>
            <p>Welcome to the financial page! For Test Only</p>
            <p>todo: should put a financial form then submit</p>
            <FinancialProfileForm />
        </div>
    );
};

export default FinancialPage;
