import { useState, useEffect } from 'react';
import UserService from '../services/UserService';

const useUser = () => {
    const [user, updateUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const getUser = async () => {
        try {
            setLoading(true);
            const response = await UserService.getUserDetails();
            updateUser(response);
        } catch (error) {
            console.error('Error fetching user data', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    return { user, updateUser, loading };
};

export default useUser;
