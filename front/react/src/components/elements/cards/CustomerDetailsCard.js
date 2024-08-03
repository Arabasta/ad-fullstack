import React from 'react';
import PropTypes from 'prop-types';
import SimpleCardComponent from "./SimpleCardComponent";

const CustomerDetailsCard = ({ customer }) => {
    if (!customer) {
        return <p>Loading customer details...</p>;
    }

    const { firstName, lastName, nationality, mobileNumber } = customer;
    const title = `Name:${firstName} ${lastName}`;
    const subtitle = `Nationality: ${nationality};`
    const description = `Mobile Number: ${mobileNumber}`;

    return (
        <SimpleCardComponent
            title={title}
            subtitle={subtitle}
            description={description}
        />
    );
};

CustomerDetailsCard.propTypes = {
    customer: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        nationality: PropTypes.string.isRequired,
        mobileNumber: PropTypes.string.isRequired,
    }).isRequired,
};

export default CustomerDetailsCard;
