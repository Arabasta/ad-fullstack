import useAddress from "../../hooks/useAddress";
import CustomerUpdateAddress from "../../components/customer/CustomerUpdateAddress";
import React from "react";

const AddressPage = () => {
    // use the useAddress custom hook to get the address state and getAddress function
    const { address, getAddress } = useAddress();

    return (
        <div>
            <h2>Address</h2>
            <CustomerUpdateAddress address={address} onUpdateAddress={getAddress} />
        </div>
    );
};

export default AddressPage;