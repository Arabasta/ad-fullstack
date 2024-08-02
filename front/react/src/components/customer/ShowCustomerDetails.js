import React from 'react';

const ShowCustomerDetails = ({ customer }) => {
    return (
        <div>
            {customer ? (
                <div>
                    <p>FirstName: {customer.firstName}</p>
                    <p>LastName: {customer.lastName}</p>
                    <p>Nationality: {customer.nationality}</p>
                    <p>Mobile Number: {customer.mobileNumber}</p>
                </div>
            ) : (
                <p>Loading customer details...</p>
            )}
        </div>
    );
};

export default ShowCustomerDetails;
