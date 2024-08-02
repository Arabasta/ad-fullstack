import { useState, useEffect } from 'react';
import UserService from '../services/UserService';

const useUser = () => {
    const [user, setUser] = useState(null);

    const getUser = async()   =>{
    try {
        const response = await UserService.getUserDetails();
        setUser(response.data);
    } catch (error) {
        console.error('Error fetching wallet data', error);
    }
};

    useEffect(() => {
            getUser();
    }, []);

    return { user, getUser };
};

export default useUser;
