import { useState, useEffect } from 'react';
import AddressService from '../services/AddressService';

const useAddress = () => {
    const [address, setAddress] = useState({
        street: '',
        city: '',
        postalCode: '',
        country: '',
        unitNo: ''
    });

    const getAddress = async () => {
        try {
            const response = await AddressService.getAddress();
            const data = response.data.data;
            setAddress({
                street: data.street,
                city: data.city,
                postalCode: data.postalCode,
                country: data.country,
                unitNo: data.unitNo
            });
        } catch (error) {
            console.error('Error fetching address data', error);
        }
    };

    useEffect(() => {
        getAddress();
    }, []); // no dependencies, only run once after initial render

    return { address, getAddress };
};

export default useAddress;
