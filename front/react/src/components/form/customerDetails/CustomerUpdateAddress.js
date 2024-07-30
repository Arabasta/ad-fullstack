import React, { useState } from 'react';
import AddressService from "../../../services/AddressService";

// this will update the address
// this is optional, so if you have a page for adding funds only (that doesn't need to update the balance)
const CustomerUpdateAddress = ({ onUpdateAddress }) => {

    const initialAddressValues = {
        street: '',
        city: '',
        postalCode: '',
        country: '',
        unitNo: ''
    };

    const [addressValues, setAddressValues] = useState(initialAddressValues);

    const handleAddress = async (e) => {
        try {
            const updatedAddressValues = addressValues;
            if (addressValues == null) {
                alert('You have no address to update.');
                return;
            }

            // call the updateAddress function from the AddressService
            // this will call the /address/update api endpoint
            await AddressService.updateAddress( updatedAddressValues );
            onUpdateAddress(); // call the prop function if it exists
            setAddressValues({
               ...oldAddressValues,
               [e.target.name]:e.target.value,
            })
        } catch (error) {
            console.error('Error updating address', error);
        }
    };

    return (
        <div>
            <div>
                <label>Street</label>
                <input
                    type="text"
                    value={street}
                    onChange={handleAddress}
                    placeholder="" // how do I get it to return the previous values?
                />
            </div>
            <div>
                <label>City</label>
                <input
                    type="text"
                    value={city}
                    onChange={handleAddress}
                />
            </div>
            <div>
                <label>Postal Code</label>
                <input
                    type="text"
                    value={postalCode}
                    onChange={handleAddress}
                />
            </div>
            <div>
                <label>Country</label>
                <input
                    type="text"
                    value={country}
                    onChange={handleAddress}
                />
            </div>
            <div>
                <label>Unit No</label>
                <input
                    type="text"
                    value={unitNo}
                    onChange={handleAddress}
                />
            </div>

            <button onClick={handleAddress}>Update</button>
        </div>
    );
};

export default CustomerUpdateAddress;
