import useAddress from "../../hooks/useAddress";
import CustomerUpdateAddress from "../../components/form/customerDetails/CustomerUpdateAddress";
import React from "react";

const AddressPage = () => {
    // use the useAddress custom hook to get the address state and getAddress function
    const { address, getAddress } = useAddress();

    return (
        <div>
            <h2>Address</h2>
            <CustomerUpdateAddress onUpdateAddress={getAddress}/>
        </div>
    );
};

export default AddressPage;