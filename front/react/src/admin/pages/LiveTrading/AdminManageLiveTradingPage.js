import React from 'react';
import LiveTrading from '../../component/LiveTrading';
import Heading from "../../../components/common/text/Heading";

const AdminManageLiveTradingPage = () => {
    return (
        <div style={{ padding: '16px' }}>
            <Heading variant="h1">Admin Live Trade Page</Heading>
            <LiveTrading />
        </div>
    );
};

export default AdminManageLiveTradingPage;
