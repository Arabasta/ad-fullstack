import React from 'react';
import EditFinancialProfileForm from "./EditFinancialProfileForm";

const FinancialProfilePage = () => {
    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <h1>Financial Profile</h1>
            <p>Please update your financial profile information below:</p>
            <EditFinancialProfileForm />
        </div>
    );
};

export default FinancialProfilePage;
