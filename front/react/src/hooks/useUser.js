import { useState, useEffect, useCallback } from 'react';
import UserService from '../services/UserService';

const useUser = () => {
    const [user, setUser] = useState(null);

    const getUserDetails = useCallback(async () => {
        try {
            const response = await UserService.getUserDetails();
            setUser(response);
        } catch (error) {
            console.error('Error fetching user details', error);
        }
    }, []);

    useEffect(() => {
            getUserDetails();
    }, [getUserDetails]);

    return { user, getUserDetails };
};

export default useUser;
