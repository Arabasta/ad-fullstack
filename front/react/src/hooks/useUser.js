import { useState, useEffect } from 'react';
import UserService from '../services/UserService';

const useUser = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const getUser = async () => {
        try {
            const response = await UserService.getUserDetails();
            setUser(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user data', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    return { user, loading, getUser };
};

export default useUser;
