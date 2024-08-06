import React, {useEffect, useState} from 'react';
import AddressService from "../../services/AddressService";

const CustomerUpdateAddress = ({ address, onUpdateAddress }) => {
    const [addressValues, setAddressValues] = useState(address);

    useEffect(() => {
        setAddressValues(address);
    }, [address]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAddressValues({ ...addressValues, [name]: value });
    };

    const handleAddressUpdate = async () => {
        try {
            // todo: add more robust validation
            if (!addressValues) {
                alert('You have no address to update.');
                return;
            }

            await AddressService.updateAddress(addressValues);
            onUpdateAddress();
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
                    name="street"
                    value={addressValues.street}
                    onChange={handleInputChange}
                    placeholder="Enter street"
                />
            </div>
            <div>
                <label>City</label>
                <input
                    type="text"
                    name="city"
                    value={addressValues.city}
                    onChange={handleInputChange}
                    placeholder="Enter city"
                />
            </div>
            <div>
                <label>Postal Code</label>
                <input
                    type="text"
                    name="postalCode"
                    value={addressValues.postalCode}
                    onChange={handleInputChange}
                    placeholder="Enter postal code"
                />
            </div>
            <div>
                <label>Country</label>
                <input
                    type="text"
                    name="country"
                    value={addressValues.country}
                    onChange={handleInputChange}
                    placeholder="Enter country"
                />
            </div>
            <div>
                <label>Unit No</label>
                <input
                    type="text"
                    name="unitNo"
                    value={addressValues.unitNo}
                    onChange={handleInputChange}
                    placeholder="Enter unit number"
                />
            </div>
            <button onClick={handleAddressUpdate}>Update</button>
        </div>
    );
};

export default CustomerUpdateAddress;
