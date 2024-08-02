import React from 'react';
import ShowCustomerDetails from '../components/customer/ShowCustomerDetails';
import useCustomer from "../hooks/useCustomer";

const CustomerDetailsPage = () => {
    const[customer] = useCustomer();

    return (
        <div>
            <h2>Customer Details</h2>
            {customer ? <ShowCustomerDetails customer={customer} /> : <p>Loading customer details...</p>}
        </div>
    );
};

export default CustomerDetailsPage;
