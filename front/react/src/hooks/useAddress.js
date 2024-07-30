import { useState, useEffect } from 'react';
import AddressService from '../services/AddressService';

const useAddress = () => {
    // all the fields in AddressDTO

    /*
    const initialAddressValues = {
        street: '',
        city: '',
        postalCode: '',
        country: '',
        unitNo: ''
    };
    */

    const [address, setAddressValues] = useState(null);

    const getAddress = async () => {
        try {
            const response = await AddressService.getAddress();
            setAddressValues(
                response.data.data.street,
                response.data.data.city,
                response.data.data.postalCode,
                response.data.data.country,
                response.data.data.unitNo
            );
        } catch (error) {
            console.error('Error fetching address data', error);
        }
    };

    useEffect(() => {
        getAddress();
    }, []); // no dependencies, only run once after initial render

    return { address, getAddress };
};

export default useAddress();
